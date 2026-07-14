#!/usr/bin/env node

// Harvest the NGC API definitions behind the API explorer at
// https://docs.ngc.nvidia.com/api/.
//
// The explorer is a swagger-ui bundle over a hardcoded list of per-service
// OpenAPI definition URLs. This script:
//   1. fetches the explorer HTML and locates the main JS bundle
//   2. extracts the {url, name} definition list from the bundle
//   3. fetches every in-scope definition and writes it to
//      provider-dev/downloaded/ngc_<key>.json
//   4. records every entry (fetched / unreachable / out-of-scope) with
//      evidence in download_manifest.json
//
// Fails without writing if the explorer page, the bundle, the definition
// list, or any REQUIRED in-scope definition cannot be retrieved. In-scope
// definitions marked optional: true are services whose hosts are not
// publicly routable (recorded as unreachable evidence for the
// harvest-vs-fallback decision rather than failing the build).
//
// Usage: node provider-dev/scripts/harvest_ngc_spec.mjs

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const EXPLORER_URL = 'https://docs.ngc.nvidia.com/api/';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const downloadDir = path.join(repoRoot, 'provider-dev', 'downloaded');
const manifestPath = path.join(downloadDir, 'download_manifest.json');

// Scope decision per explorer entry (keyed by the display name in the
// bundle). Out-of-scope reasons follow the sibling scope notes in CLAUDE.md.
const SCOPE = {
  'Private Artifacts (Models) API': { key: 'models', inScope: true, note: 'registry artifact metadata (models, resources, containers, helm charts)' },
  'KASv1 API (Deprecated)': { key: 'kas', inScope: true, note: 'the NGC API Documentation definition (orgs, teams, users) - explorer labels it KASv1 (Deprecated); deprecation is handled per path in mapping' },
  'Org Mgmt Service API': { key: 'oms', inScope: true, optional: true, note: 'organization management' },
  'User IAM Sevice API': { key: 'uis', inScope: true, optional: true, note: 'user identity and access management (name spelled sic in the explorer)' },
  'Search API': { key: 'search', inScope: true, optional: true, note: 'catalog/registry search' },
  'Metadata API': { key: 'meta', inScope: true, optional: true, note: 'artifact metadata' },
  'Publishing API': { key: 'publishing', inScope: true, optional: true, note: 'artifact publishing' },
  'Fleet Command API': { key: 'ecm', inScope: false, note: 'Fleet Command is its own product surface, out of scope' },
  'Batch API': { key: 'batch', inScope: false, note: 'Base Command batch jobs, out of scope' },
  'Subscription Service API': { key: 'subscription', inScope: false, note: 'subscription/billing surface - candidate usage service, host not publicly routable; revisit if reachable' },
  'Notification Service API': { key: 'notification', inScope: false, note: 'notification delivery, out of scope' }
};

async function fetchText(url, timeoutMs = 60000) {
  const res = await fetch(url, { signal: AbortSignal.timeout(timeoutMs) });
  if (!res.ok) throw new Error(`HTTP ${res.status} from ${url}`);
  return res.text();
}

// 1. explorer HTML -> bundle path
const html = await fetchText(EXPLORER_URL);
const bundleMatch = html.match(/src="(\.\/static\/js\/main\.[0-9a-f]+\.js)"/);
if (!bundleMatch) {
  console.error('Error: could not locate the main JS bundle in the explorer HTML - nothing written');
  process.exit(1);
}
const bundleUrl = new URL(bundleMatch[1], EXPLORER_URL).href;
console.log(`Explorer bundle: ${bundleUrl}`);

// 2. bundle -> definition list
const bundle = await fetchText(bundleUrl);
const entries = [...bundle.matchAll(/\{url:"(https:\/\/[^"]+)",name:"([^"]+)"\}/g)]
  .map((m) => ({ url: m[1], name: m[2] }));
// the bundle also declares definitions it then filters out of the explorer
// display (QuickStart/PYM and Secrets Manager at the time of pinning); only
// entries present in the SCOPE map (the displayed set) are considered
if (entries.length === 0) {
  console.error('Error: no {url,name} definition entries found in the explorer bundle - nothing written');
  process.exit(1);
}
console.log(`Found ${entries.length} definition entries in the bundle`);

// 3. fetch in-scope definitions
const results = {};
const outputs = new Map(); // file name -> body
let failures = 0;

for (const { url, name } of entries) {
  const scope = SCOPE[name];
  if (!scope) {
    results[name] = { url, status: 'ignored', note: 'declared in the bundle but not displayed by the explorer' };
    console.log(`ignored     ${name}`);
    continue;
  }
  if (!scope.inScope) {
    results[name] = { url, status: 'out-of-scope', note: scope.note };
    console.log(`out-of-scope ${name} (${scope.note})`);
    continue;
  }
  try {
    const text = await fetchText(url);
    const spec = JSON.parse(text);
    if (!(spec.openapi || spec.swagger) || !spec.paths) throw new Error('payload is not an OpenAPI document');
    const file = `ngc_${scope.key}.json`;
    outputs.set(file, { text, url, name, spec });
    results[name] = { url, status: 'fetched', file, note: scope.note };
    console.log(`fetched     ${name} -> ${file} (openapi=${spec.openapi || spec.swagger}, paths=${Object.keys(spec.paths).length})`);
  } catch (e) {
    results[name] = { url, status: 'unreachable', error: e.message, note: scope.note };
    if (scope.optional) {
      console.log(`unreachable ${name} (optional): ${e.message}`);
    } else {
      console.error(`FAILED      ${name} (required): ${e.message}`);
      failures++;
    }
  }
}

if (failures > 0) {
  console.error(`Error: ${failures} required definition(s) could not be harvested - nothing written`);
  process.exit(1);
}

// 4. write outputs + manifest
fs.mkdirSync(downloadDir, { recursive: true });
const manifest = fs.existsSync(manifestPath)
  ? JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
  : { files: {} };
manifest.files = manifest.files || {};

for (const [file, { text, url, name, spec }] of outputs) {
  fs.writeFileSync(path.join(downloadDir, file), text);
  manifest.files[file] = {
    url,
    info: {
      explorer: EXPLORER_URL,
      explorerName: name,
      openapi: spec.openapi || spec.swagger,
      title: spec.info?.title ?? null,
      specVersion: spec.info?.version ?? null
    }
  };
}
manifest.ngcHarvest = {
  explorer: EXPLORER_URL,
  bundle: bundleUrl,
  entries: results
};
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');

console.log(`Harvest complete: ${outputs.size} definition(s) written to ${downloadDir}`);
