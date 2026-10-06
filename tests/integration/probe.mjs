#!/usr/bin/env node

// Developer probe: start the mock NGC / NVCF server, materialise the test
// registry (as run_integration_tests.mjs does) and run the SQL statements
// given on the command line, printing stackql's stdout/stderr and the wire
// calls the mock saw for each. Handy when a binding misbehaves.
//
// Usage: node tests/integration/probe.mjs "SELECT ..." "EXEC ..." [--env KEY=VALUE ...] [--unset KEY]

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { startMockServer, EXPECTED_TOKEN, ORG_A } from './mock_nvidia_server.mjs';
import { buildTestRegistry, findStackql } from './registry.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, '..', '..');

const args = process.argv.slice(2);
const sqls = [];
const envOverrides = {};
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--env') { const [k, ...v] = args[++i].split('='); envOverrides[k] = v.join('='); }
  else if (args[i] === '--unset') { envOverrides[args[++i]] = undefined; }
  else sqls.push(args[i]);
}

const { server, port, log } = await startMockServer();
const registry = buildTestRegistry(port);
const bin = findStackql();

function run(sql) {
  return new Promise((resolve) => {
    const env = { ...process.env, NGC_API_KEY: EXPECTED_TOKEN, NGC_ORG: ORG_A, ...envOverrides };
    for (const [k, v] of Object.entries(envOverrides)) if (v === undefined) delete env[k];
    const child = spawn(bin, [`--registry=${registry}`, 'exec', sql, '--output', 'json'], { cwd: repoRoot, env });
    let out = '', err = '';
    child.stdout.on('data', (d) => { out += d; });
    child.stderr.on('data', (d) => { err += d; });
    child.on('close', () => resolve({ out: out.trim(), err: err.trim() }));
  });
}

try {
  for (const sql of sqls) {
    const mark = log.length;
    const { out, err } = await run(sql);
    console.log(`\n=== ${sql}`);
    console.log(`stdout: ${out.slice(0, 1500)}`);
    if (err) console.log(`stderr: ${err.slice(0, 900)}`);
    for (const e of log.slice(mark)) console.log(`wire: ${e.method} ${e.path} query=${JSON.stringify(e.query)} auth=${e.authorization ? 'yes' : 'no'} ct=${e.contentType} body=${JSON.stringify(e.body)}`);
  }
} finally {
  server.close();
}
