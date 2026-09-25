#!/usr/bin/env node

// Record or verify pins (URL, date, sha256) for every downloaded spec in
// provider-dev/config/spec_pin.json. Default mode records pins for the
// current downloads, preserving decision/evidence fields already present in
// the pin file. --check verifies the current downloads against the recorded
// hashes and fails without writing on any drift (CI drift job).
//
// Usage: node provider-dev/scripts/pin_specs.mjs [--check]

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const downloadDir = path.join(repoRoot, 'provider-dev', 'downloaded');
const pinPath = path.join(repoRoot, 'provider-dev', 'config', 'spec_pin.json');
const manifestPath = path.join(downloadDir, 'download_manifest.json');

const checkMode = process.argv.includes('--check');

if (!fs.existsSync(manifestPath)) {
  console.error(`Error: ${manifestPath} not found - run fetch-specs first (the fetchers record source URLs there)`);
  process.exit(1);
}
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

const pin = fs.existsSync(pinPath) ? JSON.parse(fs.readFileSync(pinPath, 'utf8')) : { sources: {} };
pin.sources = pin.sources || {};

const sha256 = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');

const errors = [];
const today = new Date().toISOString().slice(0, 10);

for (const [file, meta] of Object.entries(manifest.files || {})) {
  const abs = path.join(downloadDir, file);
  if (!fs.existsSync(abs)) {
    errors.push(`manifest lists ${file} but it is not in ${downloadDir}`);
    continue;
  }
  const hash = sha256(abs);
  const existing = pin.sources[file];
  if (checkMode) {
    if (!existing) {
      errors.push(`${file}: downloaded but has no recorded pin`);
    } else if (existing.sha256 !== hash) {
      errors.push(`${file}: sha256 drift (pinned ${existing.sha256.slice(0, 12)}..., current ${hash.slice(0, 12)}...)`);
    }
    continue;
  }
  pin.sources[file] = {
    ...existing,
    url: meta.url,
    fetched: today,
    sha256: hash,
    bytes: fs.statSync(abs).size,
    ...(meta.info || {})
  };
}

// the ngcsdk wheel (response schemas for the registry surface) is pinned by
// version + sha256 in harvest_ngc_sdk_schemas.mjs; the derived
// ngc_sdk_schemas.json is pinned here by content hash like the specs
if (manifest.ngcSdk) {
  const derived = path.join(downloadDir, manifest.ngcSdk.derived);
  if (!fs.existsSync(derived)) {
    errors.push(`${manifest.ngcSdk.derived}: listed in the manifest but not present`);
  } else {
    const hash = sha256(derived);
    const existing = pin.ngcSdk;
    if (checkMode) {
      if (!existing) errors.push(`${manifest.ngcSdk.derived}: derived but has no recorded pin`);
      else if (existing.derivedSha256 !== hash) errors.push(`${manifest.ngcSdk.derived}: sha256 drift (pinned ${existing.derivedSha256.slice(0, 12)}..., current ${hash.slice(0, 12)}...)`);
      else if (existing.sha256 !== manifest.ngcSdk.sha256 || existing.version !== manifest.ngcSdk.version) errors.push(`ngcsdk: pinned ${existing.version} (${existing.sha256.slice(0, 12)}...), harvested ${manifest.ngcSdk.version} (${manifest.ngcSdk.sha256.slice(0, 12)}...)`);
    } else {
      pin.ngcSdk = {
        ...(existing || {}),
        package: manifest.ngcSdk.package,
        version: manifest.ngcSdk.version,
        url: manifest.ngcSdk.url,
        sha256: manifest.ngcSdk.sha256,
        derived: manifest.ngcSdk.derived,
        derivedSha256: hash,
        classes: manifest.ngcSdk.classes,
        fetched: today
      };
    }
  }
}

if (checkMode) {
  for (const file of Object.keys(pin.sources)) {
    if (!(manifest.files || {})[file]) {
      errors.push(`${file}: pinned but not present in the current download manifest`);
    }
  }
  if (errors.length > 0) {
    console.error(`Pin check FAILED with ${errors.length} error(s):`);
    for (const e of errors) console.error(`  ${e}`);
    process.exit(1);
  }
  console.log(`Pin check passed: ${Object.keys(pin.sources).length} source(s) match the recorded pins`);
  process.exit(0);
}

if (errors.length > 0) {
  console.error(`Pinning FAILED with ${errors.length} error(s) - nothing written:`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}

fs.mkdirSync(path.dirname(pinPath), { recursive: true });
fs.writeFileSync(pinPath, JSON.stringify(pin, null, 2) + '\n');
console.log(`Recorded pins for ${Object.keys(manifest.files || {}).length} source(s) in ${pinPath}`);
