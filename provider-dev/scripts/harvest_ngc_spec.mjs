#!/usr/bin/env node

// Harvest the NGC API definitions behind the NGC API explorer
// (https://docs.ngc.nvidia.com/api/).
//
// Provenance: the explorer was a swagger-ui bundle over a hardcoded list of
// per-service OpenAPI definition URLs, and the phase-1 harvest (2026-07-14)
// extracted that list from the bundle. The explorer has since moved to a
// hosted documentation platform (ReadMe) whose pages no longer carry the
// definition list, but the definitions themselves are still served from
// the URLs the bundle declared - and the NGC API definition (orgs, teams,
// users) is also served by the public gateway. The list below is that
// pinned catalogue: every entry the explorer displayed, with its URL and
// the scope decision (sibling scope notes in CLAUDE.md). This script
// fetches every in-scope definition, writes it to
// provider-dev/downloaded/ngc_<key>.json, and records every entry
// (fetched / unreachable / out-of-scope) with evidence in
// download_manifest.json.
//
// Fails without writing if any REQUIRED in-scope definition cannot be
// retrieved. In-scope definitions marked optional: true are services whose
// hosts were not publicly routable at pin time (recorded as unreachable
// evidence for the harvest-vs-fallback decision rather than failing the
// build); the day one of them answers, its definition lands in
// provider-dev/downloaded/ and the inventory build will flag its
// operations as unclassified.
//
// Usage: node provider-dev/scripts/harvest_ngc_spec.mjs

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { canonicalJson } from './lib/canonical.mjs';

const EXPLORER_URL = 'https://docs.ngc.nvidia.com/api/';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const downloadDir = path.join(repoRoot, 'provider-dev', 'downloaded');
const manifestPath = path.join(downloadDir, 'download_manifest.json');

// The explorer's definition catalogue (display name, URL) with the scope
// decision per entry. `urls` are tried in order; the first that answers
// with an OpenAPI document wins.
const CATALOGUE = [
  { name: 'KASv1 API (Deprecated)', key: 'kas', inScope: true,
    urls: ['https://api.ngc.nvidia.com/v3/api-docs', 'https://api-internal.ngc.nvidia.com/v3/api-docs'],
    note: 'the NGC API Documentation definition (orgs, teams, users) - the explorer labelled it KASv1 (Deprecated); deprecation is handled per path in mapping; served by the public gateway' },
  { name: 'Private Artifacts (Models) API', key: 'models', inScope: true,
    urls: ['https://models.ngc.nvidia.com/v3/openapi'],
    note: 'registry artifact metadata (models, resources, containers, helm charts); declared on /v1 paths that the public gateway serves under /v2 (clean_specs gateway-v2-path-prefix)' },
  { name: 'Org Mgmt Service API', key: 'oms', inScope: true, optional: true, urls: ['https://oms.ngc.nvidia.com/v3/openapi'], note: 'organization management' },
  { name: 'User IAM Sevice API', key: 'uis', inScope: true, optional: true, urls: ['https://uis.ngc.nvidia.com/v3/openapi'], note: 'user identity and access management (name spelled sic in the explorer)' },
  { name: 'Search API', key: 'search', inScope: true, optional: true, urls: ['https://search.ngc.nvidia.com/v3/api-docs', 'https://api.ngc.nvidia.com/v3/search/api-docs'], note: 'catalog/registry search' },
  { name: 'Metadata API', key: 'meta', inScope: true, optional: true, urls: ['https://meta.ngc.nvidia.com/v3/api-docs', 'https://api.ngc.nvidia.com/v3/meta/api-docs'], note: 'artifact metadata' },
  { name: 'Publishing API', key: 'publishing', inScope: true, optional: true, urls: ['https://publishing.ngc.nvidia.com/v3/api-docs'], note: 'artifact publishing' },
  { name: 'Fleet Command API', key: 'ecm', inScope: false, urls: ['https://api.ngc.nvidia.com/v3/ecm/openapi'], note: 'Fleet Command is its own product surface, out of scope' },
  { name: 'Batch API', key: 'batch', inScope: false, urls: ['https://batch.ngc.nvidia.com/v3/openapi'], note: 'Base Command batch jobs, out of scope' },
  { name: 'Subscription Service API', key: 'subscription', inScope: false, urls: ['https://subscription.ngc.nvidia.com/v3/openapi'], note: 'subscription/billing surface - candidate usage service, host not publicly routable; revisit if reachable' },
  { name: 'Notification Service API', key: 'notification', inScope: false, urls: ['https://notification.ngc.nvidia.com/v3/openapi'], note: 'notification delivery, out of scope' }
];

async function fetchDefinition(url, timeoutMs = 60000) {
  const res = await fetch(url, { signal: AbortSignal.timeout(timeoutMs), headers: { 'User-Agent': 'stackql-provider-nvidia harvest' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const text = await res.text();
  const spec = JSON.parse(text);
  if (!(spec.openapi || spec.swagger) || !spec.paths) throw new Error('payload is not an OpenAPI document');
  return { text, spec };
}

const results = {};
const outputs = new Map(); // file name -> { text, url, name, spec }
let failures = 0;

for (const entry of CATALOGUE) {
  if (!entry.inScope) {
    results[entry.name] = { url: entry.urls[0], status: 'out-of-scope', note: entry.note };
    console.log(`out-of-scope ${entry.name} (${entry.note})`);
    continue;
  }
  let fetched = null;
  const errors = [];
  for (const url of entry.urls) {
    try {
      const { text, spec } = await fetchDefinition(url);
      fetched = { text, spec, url };
      break;
    } catch (e) {
      errors.push(`${url}: ${e.message}`);
    }
  }
  if (fetched) {
    const file = `ngc_${entry.key}.json`;
    outputs.set(file, { ...fetched, name: entry.name });
    results[entry.name] = { url: fetched.url, status: 'fetched', file, note: entry.note };
    console.log(`fetched     ${entry.name} -> ${file} (openapi=${fetched.spec.openapi || fetched.spec.swagger}, version=${fetched.spec.info?.version}, paths=${Object.keys(fetched.spec.paths).length}) from ${fetched.url}`);
  } else {
    results[entry.name] = { url: entry.urls[0], status: 'unreachable', error: errors.join('; '), note: entry.note };
    if (entry.optional) {
      console.log(`unreachable ${entry.name} (optional): ${errors.join('; ')}`);
    } else {
      console.error(`FAILED      ${entry.name} (required): ${errors.join('; ')}`);
      failures++;
    }
  }
}

if (failures > 0) {
  console.error(`Error: ${failures} required definition(s) could not be harvested - nothing written`);
  process.exit(1);
}

fs.mkdirSync(downloadDir, { recursive: true });
const manifest = fs.existsSync(manifestPath)
  ? JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
  : { files: {} };
manifest.files = manifest.files || {};

for (const [file, { text, url, name, spec }] of outputs) {
  // written as canonical JSON (sorted keys): the definition servers
  // serialise maps in a non-deterministic order between fetches
  fs.writeFileSync(path.join(downloadDir, file), canonicalJson(spec));
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
  catalogue: 'pinned in harvest_ngc_spec.mjs (the explorer moved to a hosted documentation platform after 2026-07-14 and no longer publishes its definition list; the definition URLs it declared still serve)',
  entries: results
};
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');

console.log(`Harvest complete: ${outputs.size} definition(s) written to ${downloadDir}`);
