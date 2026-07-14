#!/usr/bin/env node

// Normalize and validate every downloaded spec, writing cleaned copies to
// provider-dev/downloaded/cleaned/ and a full fix report to
// provider-dev/config/clean_report.json.
//
// All repairs are deterministic rules keyed by source file - never hand
// edits. Validation is @apidevtools/swagger-parser; if any spec still fails
// validation after the rules run, the script reports every error and exits
// without writing anything.
//
// Usage: node provider-dev/scripts/clean_specs.mjs

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import SwaggerParser from '@apidevtools/swagger-parser';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const downloadDir = path.join(repoRoot, 'provider-dev', 'downloaded');
const cleanedDir = path.join(downloadDir, 'cleaned');
const manifestPath = path.join(downloadDir, 'download_manifest.json');
const reportPath = path.join(repoRoot, 'provider-dev', 'config', 'clean_report.json');

if (!fs.existsSync(manifestPath)) {
  console.error(`Error: ${manifestPath} not found - run fetch-specs first`);
  process.exit(1);
}
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

// ---------------------------------------------------------------------------
// Repair rules. Each rule: { name, applies(file, spec), fix(spec) -> note }.
// A rule that applies must return a human-readable note of what it changed.
// ---------------------------------------------------------------------------

const RULES = [
  {
    name: 'stamp-missing-version-field',
    applies: (file, spec) => !spec.info || !spec.info.version,
    fix: (spec) => {
      spec.info = spec.info || {};
      spec.info.version = '0.0.0';
      return 'info.version was absent (the explorer definition lacks a standard version field); stamped 0.0.0';
    }
  },
  {
    name: 'repair-relative-server',
    applies: (file, spec) => {
      const urls = (spec.servers || []).map((s) => s.url);
      return urls.length === 0 || urls.every((u) => !/^https?:\/\//.test(u));
    },
    fix: (spec, file) => {
      const host = SERVER_BY_SOURCE[file];
      if (!host) throw new Error(`no server repair mapping for ${file} - add one to SERVER_BY_SOURCE`);
      const before = JSON.stringify(spec.servers || []);
      spec.servers = [{ url: host }];
      return `servers ${before} is relative/absent; set to ${host} (the host the definition is served from)`;
    }
  }
];

// server assignment for definitions that declare no absolute server; the
// value is the public gateway the definition is served from
const SERVER_BY_SOURCE = {
  'ngc_kas.json': 'https://api.ngc.nvidia.com'
};

// ---------------------------------------------------------------------------
// Clean + validate every manifest file (in memory first; write only if all
// specs validate)
// ---------------------------------------------------------------------------

const report = { generated: new Date().toISOString().slice(0, 10), sources: {} };
const cleaned = new Map(); // file -> spec object
let hasErrors = false;

for (const file of Object.keys(manifest.files || {}).sort()) {
  const abs = path.join(downloadDir, file);
  if (!fs.existsSync(abs)) {
    console.error(`Error: manifest lists ${file} but it is not present`);
    hasErrors = true;
    continue;
  }
  const spec = JSON.parse(fs.readFileSync(abs, 'utf8'));
  const fixes = [];
  const notes = [];

  if (spec.info?.version && /SNAPSHOT/i.test(spec.info.version)) {
    notes.push(`info.version is a placeholder (${spec.info.version}); left as-is`);
  }

  for (const rule of RULES) {
    if (rule.applies(file, spec)) {
      fixes.push({ rule: rule.name, note: rule.fix(spec, file) });
    }
  }

  // validate a deep copy - swagger-parser dereferences in place
  const validationErrors = [];
  try {
    await SwaggerParser.validate(structuredClone(spec));
  } catch (e) {
    validationErrors.push(e.message);
  }

  report.sources[file] = {
    openapi: spec.openapi || spec.swagger,
    title: spec.info?.title ?? null,
    version: spec.info?.version ?? null,
    paths: Object.keys(spec.paths || {}).length,
    fixes,
    notes,
    validation: validationErrors.length === 0 ? 'clean' : validationErrors
  };

  if (validationErrors.length > 0) {
    console.error(`${file}: FAILS validation after repairs:`);
    for (const err of validationErrors) console.error(`  ${err.split('\n').slice(0, 8).join('\n  ')}`);
    hasErrors = true;
  } else {
    console.log(`${file}: valid (${fixes.length} fix(es), ${notes.length} note(s))`);
    cleaned.set(file, spec);
  }
}

if (hasErrors) {
  console.error('Clean FAILED - nothing written. Add deterministic repair rules for the errors above.');
  process.exit(1);
}

fs.mkdirSync(cleanedDir, { recursive: true });
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
for (const [file, spec] of cleaned) {
  fs.writeFileSync(path.join(cleanedDir, file), JSON.stringify(spec, null, 2) + '\n');
}
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2) + '\n');
console.log(`Cleaned ${cleaned.size} spec(s) -> ${cleanedDir}`);
console.log(`Fix report -> ${reportPath}`);
