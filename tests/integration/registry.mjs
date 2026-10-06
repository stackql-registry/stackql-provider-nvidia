// Shared helpers for the integration runner and the probe: stackql binary
// resolution and the TEST COPY of the generated provider whose servers
// point at the mock.
//
// The vendor hosts are https-only and cannot address the mock, so the
// generated provider (provider-dev/openapi) is copied to
// tests/integration/.registry-tmp (gitignored, recreated each run) with
// every server URL rewritten to http://localhost:<port>: the two root hosts
// (api.ngc.nvidia.com, api.nvcf.nvidia.com - both land on the one mock,
// which routes by path) and the path-level org templates, whose org_name
// variable and x-stackQL-envVar are preserved. provider-dev/** is never
// modified.

import { existsSync, rmSync, cpSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const here = path.dirname(fileURLToPath(import.meta.url));
export const repoRoot = path.resolve(here, '..', '..');
export const NGC_HOST = 'https://api.ngc.nvidia.com';
export const NVCF_HOST = 'https://api.nvcf.nvidia.com';

export function findStackql() {
  if (process.env.STACKQL) return process.env.STACKQL;
  const local = path.join(repoRoot, process.platform === 'win32' ? 'stackql.exe' : 'stackql');
  if (existsSync(local)) return local;
  return 'stackql'; // PATH
}

export function buildTestRegistry(port) {
  const srcDir = path.join(repoRoot, 'provider-dev', 'openapi');
  const tmpDir = path.join(here, '.registry-tmp');
  rmSync(tmpDir, { recursive: true, force: true });
  cpSync(srcDir, tmpDir, { recursive: true });
  const servicesDir = path.join(tmpDir, 'src', 'nvidia', 'v00.00.00000', 'services');
  const base = `http://localhost:${port}`;
  const rewrite = (url) => url.replace(NGC_HOST, base).replace(NVCF_HOST, base);
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
      const v = item.servers[0].variables?.org_name;
      if (!v || v['x-stackQL-envVar'] !== 'NGC_ORG') throw new Error(`${f}: path ${p} lost its org_name server variable / x-stackQL-envVar in the copy`);
      orgTemplates++;
    }
    writeFileSync(fp, yaml.dump(doc, { lineWidth: -1, noRefs: true }));
  }
  if (orgTemplates === 0) throw new Error('no path-level org server templates found - was post_process run?');
  const regPath = tmpDir.split(path.sep).join('/');
  return JSON.stringify({ url: `file://${regPath}`, localDocRoot: regPath, verifyConfig: { nopVerify: true } });
}
