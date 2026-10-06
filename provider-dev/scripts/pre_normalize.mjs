#!/usr/bin/env node

// nvidia-specific spec adjustments applied to provider-dev/source (the
// split service specs) before the generic `npm run normalize` pass.
// Idempotent, deterministic; fails without writing on any rule error.
//
// Rules:
//   lower-type-arrays        OpenAPI 3.1 `type: [T, "null"]` -> `type: T` +
//                            `nullable: true` (the NVCF and models definitions
//                            are 3.1; the normalize flatten and the
//                            relational analyzer expect a single type -
//                            clickhouse precedent)
//   lower-exclusive-bounds   3.1 numeric `exclusiveMinimum: N` /
//                            `exclusiveMaximum: N` -> the 3.0 boolean form
//   strip-ssa-scopes         drop the `security` / `x-ssa-scopes` blocks the
//                            models definition carries per operation
//                            (internal scope hints; the provider's bearer
//                            auth is configured at the provider level and
//                            the analyzer must not treat them as a scheme)
//
// Usage: node provider-dev/scripts/pre_normalize.mjs [--dry-run]

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const sourceDir = path.join(repoRoot, 'provider-dev', 'source');
const dryRun = process.argv.includes('--dry-run');

function walk(node, fn, depth = 0) {
  if (!node || typeof node !== 'object' || depth > 200) return;
  fn(node);
  for (const v of Object.values(node)) walk(v, fn, depth + 1);
}

const RULES = [
  {
    name: 'lower-type-arrays',
    apply(doc) {
      let n = 0;
      walk(doc, (node) => {
        if (Array.isArray(node.type)) {
          const hadNull = node.type.includes('null');
          const types = node.type.filter((t) => t !== 'null');
          if (types.length === 0) throw new Error(`type array ${JSON.stringify(node.type)} has no non-null member`);
          // a value that may be a JSON string or a structured value
          // (["string", "object"] on configuration blobs) is carried as a
          // string column - the JSON text serves both (k8s IntOrString rule)
          node.type = types.includes('string') ? 'string' : types[0];
          if (types.length > 1 && !types.includes('string')) node.description = `${node.description ? node.description + ' ' : ''}(one of ${types.join(' | ')})`;
          if (hadNull) node.nullable = true;
          n++;
        }
      });
      return n;
    }
  },
  {
    name: 'lower-exclusive-bounds',
    apply(doc) {
      let n = 0;
      walk(doc, (node) => {
        for (const [key, min] of [['exclusiveMinimum', 'minimum'], ['exclusiveMaximum', 'maximum']]) {
          if (typeof node[key] === 'number') {
            node[min] = node[key];
            node[key] = true;
            n++;
          }
        }
      });
      return n;
    }
  },
  {
    name: 'strip-ssa-scopes',
    apply(doc) {
      let n = 0;
      for (const item of Object.values(doc.paths || {})) {
        for (const op of Object.values(item)) {
          if (!op || typeof op !== 'object') continue;
          if (op['x-ssa-scopes'] !== undefined) { delete op['x-ssa-scopes']; n++; }
          if (Array.isArray(op.security) && op.security.some((s) => s && Object.keys(s).includes('ssa'))) { delete op.security; n++; }
        }
      }
      return n;
    }
  }
];

const files = fs.readdirSync(sourceDir).filter((f) => f.endsWith('.yaml')).sort();
if (files.length === 0) {
  console.error(`Error: no service specs in ${sourceDir} - run the split first`);
  process.exit(1);
}
const results = new Map();
for (const f of files) {
  const doc = yaml.load(fs.readFileSync(path.join(sourceDir, f), 'utf8'));
  const counts = {};
  for (const rule of RULES) counts[rule.name] = rule.apply(doc);
  results.set(f, { doc, counts });
}
for (const [f, { doc, counts }] of results) {
  const touched = Object.values(counts).some((c) => c > 0);
  if (touched && !dryRun) fs.writeFileSync(path.join(sourceDir, f), yaml.dump(doc, { lineWidth: -1, noRefs: true }));
  console.log(`${f}: ${Object.entries(counts).map(([k, v]) => `${k}=${v}`).join(', ')}${touched ? (dryRun ? ' (dry run)' : ' (written)') : ''}`);
}
console.log(`pre_normalize: ${files.length} service spec(s) processed`);
