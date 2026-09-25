#!/usr/bin/env node

// Watch the NGC deprecated API reference (the build input behind the
// deprecated-schedule-2026-09-30 skip rule in build_inventory.mjs) for
// changes. Fetches the page, extracts the deprecated path patterns and
// dates it lists, and compares them with the snapshot in
// provider-dev/config/deprecation_schedule.json. Exit 1 (and print the
// diff) when the schedule moved; --update rewrites the snapshot.
//
// Usage: node provider-dev/scripts/check_deprecation_page.mjs [--update]

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const PAGE_URL = 'https://docs.nvidia.com/ngc/latest/ngc-deprecated-api.html';
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const snapshotPath = path.join(repoRoot, 'provider-dev', 'config', 'deprecation_schedule.json');
const update = process.argv.includes('--update');

const res = await fetch(PAGE_URL, { signal: AbortSignal.timeout(60000), headers: { 'User-Agent': 'stackql-provider-nvidia drift check' } });
if (!res.ok) {
  console.error(`Error: HTTP ${res.status} from ${PAGE_URL}`);
  process.exit(2);
}
const html = await res.text();
const text = html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ')
  .replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ');

const paths = [...new Set([...text.matchAll(/\/v\d\/[A-Za-z0-9_{}\-*/.]+/g)].map((m) => m[0].replace(/[.,;:)]+$/, '')))].sort();
const dates = [...new Set([...text.matchAll(/\b(January|February|March|April|May|June|July|August|September|October|November|December) \d{1,2}, \d{4}\b/g)].map((m) => m[0]))].sort();
const current = { url: PAGE_URL, paths, dates };

if (update || !fs.existsSync(snapshotPath)) {
  fs.writeFileSync(snapshotPath, JSON.stringify({ ...current, captured: new Date().toISOString().slice(0, 10) }, null, 2) + '\n');
  console.log(`${update ? 'Updated' : 'Created'} ${snapshotPath}: ${paths.length} path patterns, dates ${dates.join(', ')}`);
  process.exit(0);
}

const snapshot = JSON.parse(fs.readFileSync(snapshotPath, 'utf8'));
const added = paths.filter((p) => !snapshot.paths.includes(p));
const removed = snapshot.paths.filter((p) => !paths.includes(p));
const dateChange = JSON.stringify(dates) !== JSON.stringify(snapshot.dates);
if (added.length || removed.length || dateChange) {
  console.log(`Deprecation schedule CHANGED since ${snapshot.captured}:`);
  for (const p of added) console.log(`  + ${p}`);
  for (const p of removed) console.log(`  - ${p}`);
  if (dateChange) console.log(`  dates: ${snapshot.dates.join(', ')} -> ${dates.join(', ')}`);
  console.log('Review build_inventory.mjs SCHEDULED_DEPRECATIONS, then run with --update to accept the new snapshot.');
  process.exit(1);
}
console.log(`Deprecation schedule unchanged since ${snapshot.captured}: ${paths.length} path patterns, dates ${dates.join(', ')}`);
