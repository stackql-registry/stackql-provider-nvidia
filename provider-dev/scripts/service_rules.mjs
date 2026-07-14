// Service assignment rules for bin/split.mjs, driven by the generated
// endpoint inventory (provider-dev/config/endpoint_inventory.csv - the
// single source of truth produced by build_inventory.mjs; regenerate the
// inventory to change assignments, never edit the CSV).
//
// serviceFor(sourceName, pathKey, operationId, tags, ctx) returns the
// service name for an operation, or null to skip it (skip-reason-coded
// operations in the inventory). Throws on any operation the inventory does
// not know - split must never silently pass an unclassified operation.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const csvPath = path.join(repoRoot, 'provider-dev', 'config', 'endpoint_inventory.csv');

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

const rows = parseCsv(fs.readFileSync(csvPath, 'utf8'));
const header = rows[0];
const col = Object.fromEntries(header.map((h, i) => [h, i]));

// (file, operationId) -> service|null; fall back to path-level consensus for
// operations without an operationId
const byOpId = new Map();
const byPath = new Map();
for (const row of rows.slice(1)) {
  const file = row[col.file];
  const service = row[col.service] || null;
  const opId = row[col.operation_id];
  if (opId) {
    const key = `${file}::${opId}`;
    if (byOpId.has(key) && byOpId.get(key) !== service) {
      throw new Error(`inventory has conflicting services for duplicate operationId ${key}`);
    }
    byOpId.set(key, service);
  }
  const pKey = `${file}::${row[col.path]}`;
  if (!byPath.has(pKey)) byPath.set(pKey, new Set());
  if (service) byPath.get(pKey).add(service);
}

export function serviceFor(sourceName, pathKey, operationId, tags, ctx) {
  const file = `${sourceName}.json`;
  if (operationId && byOpId.has(`${file}::${operationId}`)) {
    return byOpId.get(`${file}::${operationId}`);
  }
  const services = byPath.get(`${file}::${pathKey}`);
  if (services === undefined) {
    throw new Error(`operation not in the endpoint inventory: ${file} ${pathKey} (${operationId || 'no operationId'}) - regenerate the inventory`);
  }
  if (services.size > 1) {
    throw new Error(`path ${pathKey} maps to multiple services (${[...services].join(', ')}) and the operation has no operationId to disambiguate`);
  }
  return services.size === 1 ? [...services][0] : null;
}
