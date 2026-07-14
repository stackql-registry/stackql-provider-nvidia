#!/usr/bin/env node

// Download the published NVCF OpenAPI spec into provider-dev/downloaded/ and
// record the source in download_manifest.json. Fails without writing if the
// payload is not an OpenAPI document.
//
// Canonical source: linked as "OpenAPI Spec" from the NVCF API documentation
// (https://docs.nvidia.com/nvcf/api), served by the NVCF API itself.
//
// Usage: node provider-dev/scripts/fetch_nvcf_spec.mjs

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const NVCF_SPEC_URL = 'https://api.nvcf.nvidia.com/v3/openapi';
const DOCS_PAGE = 'https://docs.nvidia.com/nvcf/api';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const downloadDir = path.join(repoRoot, 'provider-dev', 'downloaded');
const manifestPath = path.join(downloadDir, 'download_manifest.json');
const outFile = 'nvcf_openapi.json';

console.log(`Fetching NVCF OpenAPI spec: ${NVCF_SPEC_URL}`);
const res = await fetch(NVCF_SPEC_URL, { signal: AbortSignal.timeout(60000) });
if (!res.ok) {
  console.error(`Error: HTTP ${res.status} from ${NVCF_SPEC_URL} - nothing written`);
  process.exit(1);
}
const text = await res.text();

let spec;
try {
  spec = JSON.parse(text);
} catch {
  console.error('Error: NVCF payload is not JSON - nothing written');
  process.exit(1);
}
if (!spec.openapi || !spec.paths || !spec.info) {
  console.error('Error: NVCF payload is not an OpenAPI document - nothing written');
  process.exit(1);
}

fs.mkdirSync(downloadDir, { recursive: true });
fs.writeFileSync(path.join(downloadDir, outFile), text);

const manifest = fs.existsSync(manifestPath)
  ? JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
  : { files: {} };
manifest.files = manifest.files || {};
manifest.files[outFile] = {
  url: NVCF_SPEC_URL,
  info: {
    docsPage: DOCS_PAGE,
    openapi: spec.openapi,
    title: spec.info.title,
    specVersion: spec.info.version
  }
};
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');

const ops = Object.values(spec.paths).reduce(
  (n, p) => n + ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'].filter((v) => p[v]).length, 0);
console.log(`Wrote ${outFile}: openapi=${spec.openapi} title="${spec.info.title}" version=${spec.info.version} paths=${Object.keys(spec.paths).length} ops=${ops}`);
