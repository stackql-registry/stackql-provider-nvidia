// The single source of provider constants shared by the pipeline scripts
// (graphql_merge.mjs) and the test harnesses (tests/integration/harness.mjs,
// probe.mjs), plus the generic helpers for walking a generated provider.
//
// The nvidia build is a three-input hybrid (the published NVCF OpenAPI
// document, the harvested NGC definitions and the ngcsdk response classes),
// so the fetch / clean / inventory steps live in their own scripts
// (fetch_nvcf_spec, harvest_ngc_spec, harvest_ngc_sdk_schemas, pin_specs,
// clean_specs, build_inventory) and the per-operation classification is the
// endpoint inventory (lib/inventory.mjs), not a rule table here. Everything
// that is constant across those scripts is defined once below.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

// ---------------------------------------------------------------------------
// Provider constants
// ---------------------------------------------------------------------------

export const PROVIDER_NAME = 'nvidia';
export const PROVIDER_TITLE = 'NVIDIA NGC';

// The two fixed hosts. Management, registry, catalog and organization
// operations are served from the NGC gateway; queue details and the
// HTTP-polling invocation from the NVCF host (carried per service by the
// inventory). API_BASE_URL is the primary host, the name the template's
// harness uses.
export const NGC_HOST = 'https://api.ngc.nvidia.com';
export const NVCF_HOST = 'https://api.nvcf.nvidia.com';
export const API_BASE_URL = NGC_HOST;
export const HOSTS = [NGC_HOST, NVCF_HOST];

// The scoping server variable (org-scoped registry and organization paths
// ride a path-level server template carrying it) and the environment
// variable it resolves from - the NVIDIA Terraform provider's name.
export const SCOPE_PARAM = 'org_name';
export const SCOPE_ENV_VAR = 'NGC_ORG';

// The credential the provider reads (bearer), the Terraform provider's name.
export const AUTH_ENV_VAR = 'NGC_API_KEY';

export const HTTP_VERBS = ['get', 'post', 'put', 'patch', 'delete'];

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
export const REPO_ROOT = repoRoot;
export const PROVIDER_DIR = path.join(repoRoot, 'provider-dev', 'openapi', 'src', PROVIDER_NAME, 'v00.00.00000');
export const SERVICES_DIR = path.join(PROVIDER_DIR, 'services');

// ---------------------------------------------------------------------------
// Generic utilities
// ---------------------------------------------------------------------------

export function camelToSnake(s) {
  return String(s)
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
    .replace(/[-. ]/g, '_')
    .toLowerCase();
}

export function pathParams(pathKey) {
  return (pathKey.match(/\{[^}]+\}/g) || []).map((s) => s.slice(1, -1));
}

export function loadSpec(file) {
  const text = fs.readFileSync(file, 'utf8');
  return /\.ya?ml$/i.test(file) ? yaml.load(text) : JSON.parse(text);
}

export function dumpYaml(doc) {
  return yaml.dump(doc, { lineWidth: -1, noRefs: true });
}

// ---------------------------------------------------------------------------
// Generated-provider helpers (graphql_merge.mjs, tests)
// ---------------------------------------------------------------------------

export function listServiceFiles(dir = SERVICES_DIR) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.yaml')).sort();
}

// Iterate every method of every resource in a generated service document:
// fn(method, {resource, resourceName, methodName, verb, pathKey, operation})
export function forEachMethod(doc, fn) {
  const resources = doc.components?.['x-stackQL-resources'] || {};
  for (const [resourceName, resource] of Object.entries(resources)) {
    for (const [methodName, method] of Object.entries(resource.methods || {})) {
      const ref = method.operation?.$ref || '';
      const m = ref.match(/^#\/paths\/(.+)\/(get|post|put|patch|delete)$/);
      const pathKey = m ? m[1].replace(/~1/g, '/').replace(/~0/g, '~') : null;
      const verb = m ? m[2] : null;
      const operation = pathKey ? doc.paths?.[pathKey]?.[verb] : null;
      fn(method, { resource, resourceName, methodName, verb, pathKey, operation });
    }
  }
}

// The SQL verb a method is bound to (EXEC when absent from every sqlVerbs list)
export function sqlVerbOf(resource, resourceName, methodName) {
  const ref = `#/components/x-stackQL-resources/${resourceName}/methods/${methodName}`;
  for (const [verb, list] of Object.entries(resource.sqlVerbs || {})) {
    if ((list || []).some((x) => x.$ref === ref)) return verb;
  }
  return 'exec';
}
