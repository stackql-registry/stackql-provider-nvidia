#!/usr/bin/env node

// Split the cleaned upstream specs (provider-dev/downloaded/cleaned) into
// per-service specs in provider-dev/source. Service assignment is a
// deterministic rule set in provider-dev/scripts/service_rules.mjs - one
// rule module for every source spec, never hand-edits to the outputs.
//
// Usage: node bin/split.mjs --provider-name nvidia [--input-dir DIR] [--output-dir DIR] [--overwrite] [--verbose]

import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
import { providerdev } from '@stackql/provider-utils';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

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
  if (!fs.existsSync(rulesPath)) {
    console.error(`Error: Service rules module not found: ${rulesPath}`);
    process.exit(1);
  }
  const { serviceFor } = await import(`file://${rulesPath}`);

  const specFiles = fs.readdirSync(inputDir).filter((f) => f.endsWith('.json')).sort();
  if (specFiles.length === 0) {
    console.error(`Error: No cleaned specs found in ${inputDir}`);
    process.exit(1);
  }

  // Prepare the output directory, preserving non-spec files (e.g. .gitkeep)
  fs.mkdirSync(outputDir, { recursive: true });
  const existing = fs.readdirSync(outputDir).filter((f) => /\.(yaml|yml|json)$/.test(f));
  if (existing.length > 0) {
    if (!overwrite) {
      console.error(`Error: Output directory ${outputDir} is not empty. Use --overwrite to replace existing service specs.`);
      process.exit(1);
    }
    for (const f of existing) {
      fs.rmSync(path.join(outputDir, f));
    }
  }

  const written = new Map(); // service spec file -> source spec that produced it

  for (const specFile of specFiles) {
    const sourceName = specFile.replace(/\.json$/, '');
    console.log(`Splitting ${specFile} (source: ${sourceName})`);

    // provider-utils split() cleans its output dir on every call, so split
    // each source spec into a temp dir and collect the service specs from there
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'stackql-split-'));
    try {
      const result = await providerdev.split({
        apiDoc: path.join(inputDir, specFile),
        providerName,
        outputDir: tmpDir,
        svcDiscriminator: 'function',
        svcDiscriminatorFn: (pathKey, operationId, tags, ctx) =>
          serviceFor(sourceName, pathKey, operationId, tags, ctx),
        overwrite: true,
        verbose,
        svcNameOverrides: {}
      });
      if (!result) {
        console.error(`Error: Split failed for ${specFile}`);
        process.exit(1);
      }

      for (const outFile of fs.readdirSync(tmpDir)) {
        const dest = path.join(outputDir, outFile);
        if (written.has(outFile)) {
          console.error(`Error: Service spec ${outFile} produced by both ${written.get(outFile)} and ${specFile} - service names must not collide across sources`);
          process.exit(1);
        }
        fs.copyFileSync(path.join(tmpDir, outFile), dest);
        written.set(outFile, specFile);
      }
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  }

  console.log(`Split operation completed successfully: ${written.size} service specs written to ${outputDir}`);
  for (const f of [...written.keys()].sort()) {
    console.log(`  ${f}`);
  }
}

main().catch((err) => {
  console.error('Error splitting OpenAPI doc(s):', err);
  process.exit(1);
});
