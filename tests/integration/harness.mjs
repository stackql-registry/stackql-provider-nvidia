// Shared plumbing for the integration runner and the probe: locate the
// stackql binary, materialise the test registry pointed at the mock, and run
// SQL asynchronously against it. No side effects on import.
//
// The vendor hosts are https-only and cannot address the mock, so the
// generated provider (provider-dev/openapi) is copied to
// tests/integration/.registry-tmp (gitignored, recreated each run) with
// every server URL rewritten to http://localhost:<port>: the two root hosts
// (api.ngc.nvidia.com, api.nvcf.nvidia.com - both land on the one mock,
// which routes by path) and the path-level org templates, whose org_name
// variable and x-stackQL-envVar are preserved. provider-dev/** is never
// modified.

import { spawn } from 'child_process';
import { existsSync, rmSync, cpSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';
import { PROVIDER_NAME, HOSTS, SCOPE_PARAM, SCOPE_ENV_VAR } from '../../provider-dev/scripts/lib/spec_helpers.mjs';

export const here = path.dirname(fileURLToPath(import.meta.url));
export const repoRoot = path.resolve(here, '..', '..');

export function findStackql() {
  if (process.env.STACKQL) return process.env.STACKQL;
  const local = path.join(repoRoot, process.platform === 'win32' ? 'stackql.exe' : 'stackql');
  if (existsSync(local)) return local;
  return 'stackql'; // PATH
}

// Copy the generated provider docs into tests/integration/.registry-tmp and
// point every server - document-level and path-level - at the mock,
// preserving server variables and x-stackQL-envVar. Returns the registry
// directory; registryArg() turns it into the --registry JSON.
export function buildTestRegistry(port) {
  const srcDir = path.join(repoRoot, 'provider-dev', 'openapi');
  const tmpDir = path.join(here, '.registry-tmp');
  rmSync(tmpDir, { recursive: true, force: true });
  cpSync(srcDir, tmpDir, { recursive: true });
  const servicesDir = path.join(tmpDir, 'src', PROVIDER_NAME, 'v00.00.00000', 'services');
  const base = `http://localhost:${port}`;
  const rewrite = (url) => HOSTS.reduce((u, host) => u.replace(host, base), url);
  let orgTemplates = 0;
  for (const f of readdirSync(servicesDir)) {
    if (!f.endsWith('.yaml')) continue;
    const fp = path.join(servicesDir, f);
    const doc = yaml.load(readFileSync(fp, 'utf8'));
    if (!doc.servers?.[0]?.url) throw new Error(`no top-level servers block found in ${f}`);
    doc.servers = doc.servers.map((s) => ({ ...s, url: rewrite(s.url) }));
    for (const [p, item] of Object.entries(doc.paths || {})) {
      if (!item.servers) continue;
      item.servers = item.servers.map((s) => ({ ...s, url: rewrite(s.url) }));
      const v = item.servers[0].variables?.[SCOPE_PARAM];
      if (!v || v['x-stackQL-envVar'] !== SCOPE_ENV_VAR) throw new Error(`${f}: path ${p} lost its ${SCOPE_PARAM} server variable / x-stackQL-envVar in the copy`);
      orgTemplates++;
    }
    writeFileSync(fp, yaml.dump(doc, { lineWidth: -1, noRefs: true }));
  }
  if (orgTemplates === 0) throw new Error('no path-level org server templates found - was post_process run?');
  return tmpDir;
}

export function registryArg(tmpDir) {
  const regPath = tmpDir.split(path.sep).join('/');
  return JSON.stringify({ url: `file://${regPath}`, localDocRoot: regPath, verifyConfig: { nopVerify: true } });
}

// `--output json` renders every scalar as a string; the row-level
// assertions compare typed values, so booleans and numbers are restored.
const typed = (v) => (v === 'true' ? true : v === 'false' ? false : (typeof v === 'string' && /^-?\d+(\.\d+)?$/.test(v)) ? Number(v) : v);

// IMPORTANT: async (spawn, not spawnSync) - the mock server runs on this
// process's event loop, so a synchronous wait for stackql deadlocks.
// Returns { rows, err, text }: rows is the parsed JSON (an empty array for
// zero rows, [{ _text }] for DML status text), err the stderr when it looks
// like an error.
export function makeRunSql(registry, baseEnv, { verbose = false, bin = findStackql() } = {}) {
  return function runSql(sql, envOverrides = {}) {
    return new Promise((resolve) => {
      const env = { ...process.env, ...baseEnv, ...envOverrides };
      for (const [k, v] of Object.entries(envOverrides)) if (v === undefined) delete env[k];
      const child = spawn(bin, [`--registry=${registry}`, 'exec', sql, '--output', 'json'], { cwd: repoRoot, env });
      let stdout = '', stderr = '';
      child.stdout.on('data', (d) => { stdout += d; });
      child.stderr.on('data', (d) => { stderr += d; });
      const timer = setTimeout(() => child.kill(), 120000);
      child.on('error', (e) => { clearTimeout(timer); resolve({ rows: null, err: String(e), text: '', stdout: '', stderr: String(e) }); });
      child.on('close', () => {
        clearTimeout(timer);
        stdout = stdout.trim();
        stderr = stderr.trim();
        if (verbose) console.log(`    sql: ${sql}\n    out: ${stdout.slice(0, 400)}${stderr ? `\n    err: ${stderr.slice(0, 400)}` : ''}`);
        const errish = /http response status code: [45]|error|panic|FindRoute|no matching operation|cannot find matching operation|disallowed|cannot find any viable servers|not supported|required/i;
        if (errish.test(stderr)) return resolve({ rows: null, err: stderr, text: stdout, stdout, stderr });
        if (!stdout) return resolve({ rows: [], err: null, text: stdout, stdout, stderr });
        try {
          const parsed = JSON.parse(stdout); // literal null for zero rows
          const rows = Array.isArray(parsed) ? parsed.map((r) => Object.fromEntries(Object.entries(r).map(([k, v]) => [k, typed(v)]))) : parsed ?? [];
          resolve({ rows, err: null, text: stdout, stdout, stderr });
        } catch {
          resolve({ rows: [{ _text: stdout }], err: errish.test(stdout) ? stdout : null, text: stdout, stdout, stderr }); // DML status text
        }
      });
    });
  };
}
