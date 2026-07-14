#!/usr/bin/env node

// Populates stackql_resource_name, stackql_method_name, stackql_verb and
// stackql_object_key in provider-dev/config/all_services.csv from the
// endpoint inventory (provider-dev/config/endpoint_inventory.csv - the
// single source of truth produced by build_inventory.mjs). Deterministic
// and re-runnable; regenerate the inventory to change mappings, never edit
// either CSV by hand.
//
// Validates before writing:
//   - every all_services.csv row resolves to a mapped inventory operation
//   - every mapped inventory operation appears in all_services.csv
//   - method names are unique per (service, resource)
//   - overloaded SQL verbs have unique required path-param signatures per
//     (service, resource, verb), exec excluded
// Fails without writing on any violation.
//
// Usage: node provider-dev/scripts/map_operations.mjs [--out PATH]

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const inventoryPath = path.join(repoRoot, 'provider-dev', 'config', 'endpoint_inventory.csv');
const csvPath = path.join(repoRoot, 'provider-dev', 'config', 'all_services.csv');

// ---------------------------------------------------------------------------
// CSV helpers (RFC 4180, preserves column order)
// ---------------------------------------------------------------------------

function parseCsv(text) {
  const rows = [];
  let row = [], field = '', inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; } else { inQuotes = false; }
      } else { field += c; }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(field); field = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field); field = '';
      if (row.length > 1 || row[0] !== '') rows.push(row);
      row = [];
    } else { field += c; }
  }
  if (field !== '' || row.length > 0) { row.push(field); rows.push(row); }
  return rows;
}

const csvField = (v) => (/[",\n\r]/.test(v) ? `"${String(v).replace(/"/g, '""')}"` : String(v));

// split rewrites path-param names to snake_case ({org-name} -> {org_name});
// canonicalize both sides for the join
const canonPath = (p) => p.replace(/\{[^}]+\}/g, (m) => m.replace(/-/g, '_'));
const pathParams = (p) => (p.match(/\{[^}]+\}/g) || []).map((s) => s.slice(1, -1)).sort().join(',');

// ---------------------------------------------------------------------------
// Load the inventory: mapped rows keyed by operationId and by (path, verb)
// ---------------------------------------------------------------------------

const inv = parseCsv(fs.readFileSync(inventoryPath, 'utf8'));
const invCol = Object.fromEntries(inv[0].map((h, i) => [h, i]));

const byOpId = new Map();
const dupOpIds = new Set();
const byPathVerb = new Map();
const mappedInventory = [];

for (const row of inv.slice(1)) {
  if (!row[invCol.service]) continue; // skipped operation
  const entry = {
    service: row[invCol.service],
    resource: row[invCol.resource],
    method: row[invCol.method],
    sqlVerb: row[invCol.sql_verb],
    objectKey: row[invCol.object_key_candidate],
    path: row[invCol.path],
    verb: row[invCol.verb]
  };
  mappedInventory.push(entry);
  const opId = row[invCol.operation_id];
  if (opId) {
    if (byOpId.has(opId)) dupOpIds.add(opId);
    byOpId.set(opId, entry);
  }
  byPathVerb.set(`${canonPath(entry.path)}::${entry.verb}`, entry);
}
for (const opId of dupOpIds) byOpId.delete(opId); // ambiguous - fall back to path+verb

// ---------------------------------------------------------------------------
// Fill all_services.csv
// ---------------------------------------------------------------------------

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
  const opId = row[col.operationId];
  const entry = (opId && byOpId.get(opId)) || byPathVerb.get(`${canonPath(row[col.path])}::${row[col.verb]}`);
  if (!entry) {
    errors.push(`no inventory mapping for ${row[col.filename]} ${row[col.verb]} ${row[col.path]} (${opId || 'no operationId'})`);
    continue;
  }
  const service = row[col.filename].replace(/\.yaml$/, '');
  if (service !== entry.service) {
    errors.push(`service mismatch for ${row[col.verb]} ${row[col.path]}: split put it in ${service}, inventory says ${entry.service}`);
    continue;
  }
  matched.add(`${canonPath(entry.path)}::${entry.verb}`);
  row[col.stackql_resource_name] = entry.resource;
  row[col.stackql_method_name] = entry.method;
  row[col.stackql_verb] = entry.sqlVerb;
  // multi-array-prop candidates stay empty pending a wire check
  row[col.stackql_object_key] = /^\$\.[A-Za-z_]+$/.test(entry.objectKey) ? entry.objectKey : '';
}

for (const entry of mappedInventory) {
  if (!matched.has(`${canonPath(entry.path)}::${entry.verb}`)) {
    errors.push(`in inventory but not in all_services.csv: ${entry.verb} ${entry.path} (${entry.service}.${entry.resource}.${entry.method})`);
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
  const sigKey = `${service}.${resource}.${sqlVerb}::${pathParams(canonPath(row[col.path]))}`;
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
