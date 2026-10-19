// Shared access to the endpoint inventory (provider-dev/config/
// endpoint_inventory.csv - the single source of truth produced by
// build_inventory.mjs). Used by bin/split.mjs (service assignment, org
// rebase, per-service host), map_operations.mjs (resource / method / verb /
// objectKey) and post_process.mjs (path-level server templates, casing,
// pagination). Regenerate the inventory to change any of it; never edit the
// CSV by hand.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
export const inventoryPath = path.join(repoRoot, 'provider-dev', 'config', 'endpoint_inventory.csv');
export const serversPath = path.join(repoRoot, 'provider-dev', 'config', 'servers.json');

export function parseCsv(text) {
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

export const csvField = (v) => (/[",\n\r]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : String(v));

export function loadServers() {
  return JSON.parse(fs.readFileSync(serversPath, 'utf8'));
}

// Returns { rows, header, byOp, byServiceOp, hostByService }:
//   rows          every inventory row as an object
//   byOp          `${file}::${operationId}` -> row (every operation)
//   byServiceOp   `${service}::${operationId}` -> row (mapped operations)
//   hostByService service -> host (one per service, validated by the inventory)
export function loadInventory() {
  if (!fs.existsSync(inventoryPath)) {
    throw new Error(`${inventoryPath} not found - run build_inventory.mjs first`);
  }
  const table = parseCsv(fs.readFileSync(inventoryPath, 'utf8'));
  const header = table[0];
  const rows = table.slice(1).map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ''])));
  const byOp = new Map();
  const byServiceOp = new Map();
  const hostByService = new Map();
  for (const row of rows) {
    if (row.operation_id) {
      const key = `${row.file}::${row.operation_id}`;
      if (byOp.has(key)) throw new Error(`inventory has a duplicate operationId ${key}`);
      byOp.set(key, row);
    }
    if (row.service) {
      const key = `${row.service}::${row.operation_id}`;
      if (byServiceOp.has(key)) throw new Error(`inventory has a duplicate mapped operationId ${key}`);
      byServiceOp.set(key, row);
      const prev = hostByService.get(row.service);
      if (prev && prev !== row.host) throw new Error(`service ${row.service} spans hosts ${prev} and ${row.host}`);
      hostByService.set(row.service, row.host);
    }
  }
  return { rows, header, byOp, byServiceOp, hostByService };
}
