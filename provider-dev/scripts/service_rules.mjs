// Service assignment rules for bin/split.mjs, driven by the generated
// endpoint inventory (provider-dev/config/endpoint_inventory.csv - the
// single source of truth produced by build_inventory.mjs; regenerate the
// inventory to change assignments, never edit the CSV).
//
// serviceFor(sourceName, pathKey, operationId, tags, ctx) returns the
// service name for an operation, or null to skip it (skip-reason-coded
// operations in the inventory). Throws on any operation the inventory does
// not know - split must never silently pass an unclassified operation.

import { loadInventory } from './lib/inventory.mjs';

const { byOp } = loadInventory();

export function serviceFor(sourceName, pathKey, operationId, tags, ctx) {
  const file = `${sourceName}.json`;
  if (!operationId) {
    throw new Error(`operation without operationId cannot be assigned: ${file} ${pathKey}`);
  }
  const row = byOp.get(`${file}::${operationId}`);
  if (!row) {
    throw new Error(`operation not in the endpoint inventory: ${file} ${pathKey} (${operationId}) - regenerate the inventory`);
  }
  if (row.path !== pathKey) {
    throw new Error(`inventory path mismatch for ${file} ${operationId}: spec has ${pathKey}, inventory has ${row.path} - regenerate the inventory`);
  }
  return row.service || null;
}
