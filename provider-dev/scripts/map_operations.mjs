#!/usr/bin/env node

// Populates stackql_resource_name, stackql_method_name, stackql_verb and
// stackql_object_key in provider-dev/config/all_services.csv from the
// endpoint inventory (provider-dev/config/endpoint_inventory.csv - the
// single source of truth produced by build_inventory.mjs). Deterministic
// and re-runnable; regenerate the inventory to change mappings, never edit
// either CSV by hand.
//
// all_services.csv is committed as the durable record of every
// operation -> resource.method mapping: a diff there on a regeneration is a
// breaking-change review (a method moving resource, a resource renamed),
// not noise. This script prints that diff against the committed CSV before
// overwriting it.
//
// Validates before writing:
//   - every all_services.csv row resolves to a mapped inventory operation
//     (by service + operationId) on the same rebased path and verb
//   - every mapped inventory operation appears in all_services.csv
//   - method names are unique per (service, resource)
//   - overloaded SQL verbs have unique required path-param signatures per
//     (service, resource, verb), exec excluded
// Fails without writing on any violation.
//
// Usage: node provider-dev/scripts/map_operations.mjs [--out PATH]

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { loadInventory, parseCsv, csvField } from './lib/inventory.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const csvPath = path.join(repoRoot, 'provider-dev', 'config', 'all_services.csv');

const pathParams = (p) => (p.match(/\{[^}]+\}/g) || []).map((s) => s.slice(1, -1)).sort().join(',');

const { byServiceOp } = loadInventory();

const rows = parseCsv(fs.readFileSync(csvPath, 'utf8'));
const header = rows[0];
const col = Object.fromEntries(header.map((h, i) => [h, i]));
for (const required of ['filename', 'path', 'verb', 'operationId', 'stackql_resource_name', 'stackql_method_name', 'stackql_verb', 'stackql_object_key']) {
  if (!(required in col)) {
    console.error(`Missing expected CSV column: ${required}`);
    process.exit(1);
  }
}

const errors = [];
const matched = new Set();

for (const row of rows.slice(1)) {
  const service = row[col.filename].replace(/\.yaml$/, '');
  const opId = row[col.operationId];
  const entry = byServiceOp.get(`${service}::${opId}`);
  if (!entry) {
    errors.push(`no inventory mapping for ${row[col.filename]} ${row[col.verb]} ${row[col.path]} (${opId || 'no operationId'})`);
    continue;
  }
  if (entry.rebased_path !== row[col.path] || entry.verb !== row[col.verb]) {
    errors.push(`path/verb mismatch for ${service} ${opId}: split has ${row[col.verb]} ${row[col.path]}, inventory has ${entry.verb} ${entry.rebased_path}`);
    continue;
  }
  matched.add(`${service}::${opId}`);
  row[col.stackql_resource_name] = entry.resource;
  row[col.stackql_method_name] = entry.method;
  row[col.stackql_verb] = entry.sql_verb;
  // multi-array-prop candidates stay empty pending a wire check
  row[col.stackql_object_key] = /^\$\.[A-Za-z_]+$/.test(entry.object_key_candidate) ? entry.object_key_candidate : '';
}

for (const [key, entry] of byServiceOp) {
  if (!matched.has(key)) {
    errors.push(`in inventory but not in all_services.csv: ${entry.verb} ${entry.rebased_path} (${entry.service}.${entry.resource}.${entry.method})`);
  }
}

// ---------------------------------------------------------------------------
// Consistency checks
// ---------------------------------------------------------------------------

const methodSeen = new Map();
const sigSeen = new Map();
for (const row of rows.slice(1)) {
  const resource = row[col.stackql_resource_name];
  if (!resource) continue;
  const service = row[col.filename].replace(/\.yaml$/, '');
  const methodKey = `${service}.${resource}.${row[col.stackql_method_name]}`;
  if (methodSeen.has(methodKey)) {
    errors.push(`duplicate method ${methodKey} (${methodSeen.get(methodKey)} and ${row[col.path]}:${row[col.verb]})`);
  }
  methodSeen.set(methodKey, `${row[col.path]}:${row[col.verb]}`);

  const sqlVerb = row[col.stackql_verb];
  if (sqlVerb === 'exec') continue;
  const sigKey = `${service}.${resource}.${sqlVerb}::${pathParams(row[col.path])}`;
  if (sigSeen.has(sigKey)) {
    errors.push(`signature clash on ${sigKey} (${sigSeen.get(sigKey)} and ${row[col.stackql_method_name]})`);
  }
  sigSeen.set(sigKey, row[col.stackql_method_name]);
}

if (errors.length > 0) {
  console.error(`FAILED with ${errors.length} error(s) - nothing written:`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Mapping diff against the committed CSV (review aid; the CI drift gate is
// the enforcement)
// ---------------------------------------------------------------------------

function committedMappings() {
  try {
    const text = execSync('git show HEAD:provider-dev/config/all_services.csv', { cwd: repoRoot, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
    const t = parseCsv(text);
    const c = Object.fromEntries(t[0].map((h, i) => [h, i]));
    const m = new Map();
    for (const r of t.slice(1)) {
      if (!r[c.stackql_resource_name]) continue;
      m.set(`${r[c.filename].replace(/\.yaml$/, '')}::${r[c.operationId]}`, `${r[c.stackql_resource_name]}.${r[c.stackql_method_name]} [${r[c.stackql_verb]}]`);
    }
    return m;
  } catch {
    return null;
  }
}

const previous = committedMappings();
if (previous) {
  const current = new Map();
  for (const row of rows.slice(1)) {
    if (!row[col.stackql_resource_name]) continue;
    current.set(`${row[col.filename].replace(/\.yaml$/, '')}::${row[col.operationId]}`, `${row[col.stackql_resource_name]}.${row[col.stackql_method_name]} [${row[col.stackql_verb]}]`);
  }
  const added = [...current.keys()].filter((k) => !previous.has(k));
  const removed = [...previous.keys()].filter((k) => !current.has(k));
  const changed = [...current.keys()].filter((k) => previous.has(k) && previous.get(k) !== current.get(k));
  if (added.length || removed.length || changed.length) {
    console.log(`Mapping diff vs the committed all_services.csv: +${added.length} added, -${removed.length} removed, ${changed.length} changed (review before commit - these are the provider's user-facing contract):`);
    for (const k of changed.slice(0, 40)) console.log(`  changed ${k}: ${previous.get(k)} -> ${current.get(k)}`);
    for (const k of removed.slice(0, 40)) console.log(`  removed ${k}: ${previous.get(k)}`);
    for (const k of added.slice(0, 40)) console.log(`  added   ${k}: ${current.get(k)}`);
    if (added.length + removed.length + changed.length > 120) console.log('  ...');
  } else {
    console.log('Mapping diff vs the committed all_services.csv: none');
  }
}

const outArgIdx = process.argv.indexOf('--out');
const outPath = outArgIdx !== -1 ? path.resolve(process.argv[outArgIdx + 1]) : csvPath;
fs.writeFileSync(outPath, rows.map((r) => r.map(csvField).join(',')).join('\n') + '\n');

// summary
const stats = { verbs: {}, resourcesByService: new Map() };
for (const row of rows.slice(1)) {
  const resource = row[col.stackql_resource_name];
  if (!resource) continue;
  const service = row[col.filename].replace(/\.yaml$/, '');
  stats.verbs[row[col.stackql_verb]] = (stats.verbs[row[col.stackql_verb]] || 0) + 1;
  if (!stats.resourcesByService.has(service)) stats.resourcesByService.set(service, new Set());
  stats.resourcesByService.get(service).add(resource);
}
console.log(`Mapped ${rows.length - 1} operations: ${JSON.stringify(stats.verbs)}`);
console.log('Resources per service:');
for (const [service, resources] of [...stats.resourcesByService.entries()].sort()) {
  console.log(`  ${service}: ${resources.size}`);
}
console.log(`Total resources: ${[...stats.resourcesByService.values()].reduce((n, s) => n + s.size, 0)}`);
