#!/usr/bin/env node

// Split the cleaned upstream specs (provider-dev/downloaded/cleaned) into
// per-service specs in provider-dev/source. Service assignment is the
// endpoint inventory (provider-dev/scripts/service_rules.mjs reads it) -
// one deterministic classification for every operation, never hand-edits
// to the outputs.
//
// After the split, every service spec is rewritten from the inventory:
//   - root `servers` is the service's host (api.ngc.nvidia.com for the NGC
//     core and NVCF management services, api.nvcf.nvidia.com for queue
//     details and invocation)
//   - org-scoped operations are rebased: the leading org prefix
//     (/v2/org/{org_name}, /v3/orgs/{org_name}, /v2/artifact-registry/org/
//     {org_name}) is removed from the path key and the org path parameter
//     is dropped; post_process.mjs re-attaches it as a path-level server
//     template whose org_name variable resolves from NGC_ORG via
//     x-stackQL-envVar (the clickhouse / supabase precedent). It is done
//     here, before the mappings, so all_services.csv keys carry the
//     rebased paths.
//
// Usage: node bin/split.mjs --provider-name nvidia [--input-dir DIR] [--output-dir DIR] [--overwrite] [--verbose]

import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';
import { providerdev } from '@stackql/provider-utils';
import { loadInventory } from '../provider-dev/scripts/lib/inventory.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const HTTP_VERBS = ['get', 'post', 'put', 'patch', 'delete'];

async function main() {
  const args = process.argv.slice(2);
  const getArg = (flag) => {
    const index = args.indexOf(flag);
    return index !== -1 ? args[index + 1] : null;
  };

  const providerName = getArg('--provider-name');
  const inputDir = getArg('--input-dir') || path.join(repoRoot, 'provider-dev', 'downloaded', 'cleaned');
  const outputDir = getArg('--output-dir') || path.join(repoRoot, 'provider-dev', 'source');
  const overwrite = args.includes('--overwrite');
  const verbose = args.includes('--verbose');

  if (!providerName) {
    console.error('Error: Missing required arguments');
    console.error('Usage: node bin/split.mjs --provider-name NAME [--input-dir DIR] [--output-dir DIR] [--overwrite] [--verbose]');
    process.exit(1);
  }

  const rulesPath = path.join(repoRoot, 'provider-dev', 'scripts', 'service_rules.mjs');
  const { serviceFor } = await import(`file://${rulesPath}`);
  const { byOp, hostByService } = loadInventory();
  const serviceNames = JSON.parse(fs.readFileSync(path.join(repoRoot, 'provider-dev', 'config', 'service_names.json'), 'utf8'));

  const specFiles = fs.readdirSync(inputDir).filter((f) => f.endsWith('.json')).sort();
  if (specFiles.length === 0) {
    console.error(`Error: No cleaned specs found in ${inputDir}`);
    process.exit(1);
  }

  fs.mkdirSync(outputDir, { recursive: true });
  const existing = fs.readdirSync(outputDir).filter((f) => /\.(yaml|yml|json)$/.test(f));
  if (existing.length > 0 && !overwrite) {
    console.error(`Error: Output directory ${outputDir} is not empty. Use --overwrite to replace existing service specs.`);
    process.exit(1);
  }

  // service file -> { doc, sourceFile }
  const produced = new Map();

  for (const specFile of specFiles) {
    const sourceName = specFile.replace(/\.json$/, '');
    console.log(`Splitting ${specFile} (source: ${sourceName})`);
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'stackql-split-'));
    try {
      const result = await providerdev.split({
        apiDoc: path.join(inputDir, specFile),
        providerName,
        outputDir: tmpDir,
        svcDiscriminator: 'function',
        svcDiscriminatorFn: (pathKey, operationId, tags, ctx) => serviceFor(sourceName, pathKey, operationId, tags, ctx),
        overwrite: true,
        verbose,
        svcNameOverrides: {}
      });
      if (!result) {
        console.error(`Error: Split failed for ${specFile}`);
        process.exit(1);
      }
      for (const outFile of fs.readdirSync(tmpDir)) {
        if (produced.has(outFile)) {
          console.error(`Error: Service spec ${outFile} produced by both ${produced.get(outFile).sourceFile} and ${specFile} - service names must not collide across sources`);
          process.exit(1);
        }
        produced.set(outFile, { doc: yaml.load(fs.readFileSync(path.join(tmpDir, outFile), 'utf8')), sourceFile: specFile });
      }
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  }

  // rewrite from the inventory: host, org rebase
  const summary = [];
  for (const [outFile, { doc, sourceFile }] of produced) {
    const service = outFile.replace(/\.(yaml|yml|json)$/, '');
    const host = hostByService.get(service);
    if (!host) {
      console.error(`Error: no host recorded for service ${service} in the inventory`);
      process.exit(1);
    }
    doc.servers = [{ url: host }];
    const names = serviceNames[service];
    if (!names) {
      console.error(`Error: service ${service} has no entry in provider-dev/config/service_names.json`);
      process.exit(1);
    }
    doc.info = { ...(doc.info || {}), title: names.title, description: names.description };

    const newPaths = {};
    let rebased = 0, kept = 0;
    for (const [pathKey, item] of Object.entries(doc.paths || {})) {
      for (const verb of HTTP_VERBS) {
        const op = item[verb];
        if (!op) continue;
        const row = byOp.get(`${sourceFile}::${op.operationId}`);
        if (!row) {
          console.error(`Error: ${sourceFile} ${verb} ${pathKey} (${op.operationId}) is not in the inventory`);
          process.exit(1);
        }
        if (row.service !== service) {
          console.error(`Error: ${sourceFile} ${op.operationId} landed in ${service} but the inventory says ${row.service}`);
          process.exit(1);
        }
        const target = row.rebased_path;
        const dropOrg = row.org_prefix !== '';
        const orgParamNames = new Set(['org_name', 'org']);
        const prune = (params) => (params || []).filter((p) => !(p && p.in === 'path' && orgParamNames.has(p.name)));
        if (!newPaths[target]) newPaths[target] = {};
        if (newPaths[target][verb]) {
          console.error(`Error: rebase collision in ${service}: ${verb} ${target} produced twice (${pathKey})`);
          process.exit(1);
        }
        // path-item level parameters are lifted onto each operation so the
        // rebased path item stays self-contained
        const inherited = (item.parameters || []).filter((p) => !(op.parameters || []).some((q) => q && p && q.name === p.name && q.in === p.in));
        const params = [...inherited, ...(op.parameters || [])];
        op.parameters = dropOrg ? prune(params) : params;
        newPaths[target][verb] = op;
        if (dropOrg) rebased++; else kept++;
      }
    }
    doc.paths = newPaths;
    summary.push(`${outFile}: ${Object.keys(newPaths).length} paths on ${host} (${rebased} org-scoped operations rebased, ${kept} kept as root paths)`);
  }

  for (const f of existing) fs.rmSync(path.join(outputDir, f));
  for (const [outFile, { doc }] of produced) {
    fs.writeFileSync(path.join(outputDir, outFile), yaml.dump(doc, { lineWidth: -1, noRefs: true }));
  }

  console.log(`Split operation completed successfully: ${produced.size} service specs written to ${outputDir}`);
  for (const line of summary.sort()) console.log(`  ${line}`);
}

main().catch((err) => {
  console.error('Error splitting OpenAPI doc(s):', err);
  process.exit(1);
});
