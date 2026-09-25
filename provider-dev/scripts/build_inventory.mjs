#!/usr/bin/env node

// Build the endpoint inventory across the cleaned spec sources into
// provider-dev/config/endpoint_inventory.csv. Every generator-relevant
// operation is classified by deterministic rules: host, org/team scoping,
// the org-scope rebase (org_prefix / rebased_path / server_url - the org
// path parameter becomes a path-level server variable resolved from
// NGC_ORG), declared auth, wire-observed public reads, pagination idiom,
// response shape, casing of the wire parameters, invocation form, proposed
// service/resource/method/SQL verb, and a skip reason where applicable.
// The CSV is the single source of truth for the split (service_rules.mjs),
// the mapping pass (map_operations.mjs) and post-processing
// (post_process.mjs). Fails without writing on any unclassified operation
// or consistency error.
//
// Deprecation schedule (a build input): NVIDIA's NGC deprecated API
// reference (https://docs.nvidia.com/ngc/latest/ngc-deprecated-api.html)
// ends team-scoped (/teams/{team}) paths for NVCF, NVCT, FNDS, Skyway, SIS,
// SI, PYM, Infinity Manager and GDN on 2026-09-30; "products other than
// NVIDIA Private Registry and NVIDIA Data Services do not support
// team-level resource scoping". Paths in those families are skipped with
// reason deprecated-schedule-2026-09-30. Private Registry team-scoped paths
// are exempt and are mapped as *_by_team methods on the same resources
// (they add team_name to the required-parameter signature).
//
// Usage: node provider-dev/scripts/build_inventory.mjs

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const cleanedDir = path.join(repoRoot, 'provider-dev', 'downloaded', 'cleaned');
const outPath = path.join(repoRoot, 'provider-dev', 'config', 'endpoint_inventory.csv');
const serversPath = path.join(repoRoot, 'provider-dev', 'config', 'servers.json');

const HTTP_VERBS = ['get', 'post', 'put', 'patch', 'delete'];
const NON_GENERATOR_VERBS = ['head', 'options', 'trace'];

const SOURCES = {
  'nvcf_openapi.json': 'nvcf',
  'ngc_kas.json': 'ngc-core',
  'ngc_models.json': 'ngc-core'
};

const servers = JSON.parse(fs.readFileSync(serversPath, 'utf8'));
const NGC_HOST = servers.hosts.ngc;
const NVCF_HOST = servers.hosts.nvcf;
const ORG_VAR = servers.orgVariable.name; // org_name

// NVCF host assignment per tag: the NVCF docs state management is served
// from api.ngc.nvidia.com and invocation/queue details from
// api.nvcf.nvidia.com; /v2/nvcf/assets is empirically nvcf-host-only
// (404 on the ngc gateway, 2026-07-14), and assertion tokens are part of
// the invocation flow.
const NVCF_HOST_TAGS = new Set([
  'Function Invocation',
  'Queue Details',
  'Asset Management',
  'Function Invocation Assertion Token'
]);

// Wire-proven unauthenticated reads (2026-07-14, see NOTES.md item 4),
// keyed by `${file}::${path}::${verb}` on the cleaned (snake_case, /v2)
// path form; everything else is unprobed (blank) or observed
// auth-required ('n').
const OBSERVED_PUBLIC_READS = new Map([
  ['ngc_models.json::/v2/models::get', 'y'],
  ['ngc_models.json::/v2/models/{org_name}/{model_name}::get', 'y'],
  ['ngc_models.json::/v2/models/{org_name}/{model_name}/versions::get', 'y'],
  ['ngc_models.json::/v2/recipes::get', 'y'],
  ['ngc_models.json::/v2/resources::get', 'y'],
  ['ngc_models.json::/v2/collections::get', 'y'],
  ['ngc_models.json::/v2/gpus::get', 'y'],
  ['ngc_models.json::/v2/{artifact_type}::get', 'y'],
  ['ngc_models.json::/v2/csps::get', 'n'],
  ['ngc_kas.json::/v2/orgs::get', 'n'],
  ['ngc_kas.json::/v2/users/me::get', 'n'],
  ['nvcf_openapi.json::/v2/nvcf/functions::get', 'n'],
  ['nvcf_openapi.json::/v2/nvcf/clusterGroups::get', 'n']
]);

// The published deprecation schedule, as path-family rules. Matched
// against every source; a hit is a skip (reason deprecated-schedule-2026-09-30).
const SCHEDULED_DEPRECATIONS = [
  /^\/v2\/orgs\/\{[^}]+\}\/teams\/\{[^}]+\}\/(nvcf|nvct|fnds|skyway|sis|si|pym|gdn|gdncs|ngc\/nvcf)(\/|$)/,
  /^\/v3\/orgs\/\{[^}]+\}\/teams\/\{[^}]+\}\/(fnds|ngc\/nvcf)(\/|$)/,
  /^\/v3\/ngc\/nvcf\/orgs\/\{[^}]+\}\/teams\/\{[^}]+\}\/keys(\/|$)/,
  /^\/v2\/org\/\{[^}]+\}\/team\/\{[^}]+\}\/infinity-manager(\/|$)/,
  /^\/v1\/orgs\/\{[^}]+\}\/teams\/\{[^}]+\}\/(gdn|gdncs)(\/|$)/
];

// Org-scope rebase: a leading org prefix becomes a path-level server
// template carrying the org as a server variable (x-stackQL-envVar NGC_ORG,
// stamped by post_process.mjs); the remainder is the operation path. Only
// leading prefixes with a non-empty remainder are rebased; org parameters
// elsewhere in the path stay ordinary path parameters.
const ORG_PREFIXES = [
  { re: /^\/v2\/org\/\{(org_name|org)\}(?=\/.)/, template: '/v2/org/{org_name}' },
  { re: /^\/v3\/orgs\/\{(org_name|org)\}(?=\/.)/, template: '/v3/orgs/{org_name}' },
  { re: /^\/v2\/orgs\/\{(org_name|org)\}(?=\/.)/, template: '/v2/orgs/{org_name}' },
  { re: /^\/v2\/artifact-registry\/org\/\{(org_name|org)\}(?=\/.)/, template: '/v2/artifact-registry/org/{org_name}' }
];

function pathParams(p) {
  return (p.match(/\{[^}]+\}/g) || []).map((s) => s.slice(1, -1));
}

// Private Registry team scope: the team segment right after the org
// segment (org-scoped form) or the guest {org}/{team}/{name} form. The
// cross-org collection references ({artifact_team_name}) and share targets
// ({target_team}) are not scopes and are left alone.
function stripTeamScope(p) {
  let out = p.replace(/\/team\/\{team(_name)?\}(?=\/|$)/, '');
  out = out.replace(/^(\/v2\/(?:\{artifact_type\}|models|recipes|resources|helm-charts|collections|csps\/\{artifact_type\}|deploy\/csps\/\{artifact_type\})\/\{org_name\})\/\{team_name\}(?=\/)/, '$1');
  return { stripped: out, team: out !== p };
}

// ---------------------------------------------------------------------------
// response shape helpers
// ---------------------------------------------------------------------------

function deref(spec, node) {
  if (node && node.$ref) {
    const parts = node.$ref.replace(/^#\//, '').split('/');
    let cur = spec;
    for (const part of parts) cur = cur?.[part];
    return cur || {};
  }
  return node || {};
}

const ENVELOPE_KEYS = new Set(['requestStatus', 'paginationInfo']);

function responseShape(spec, op) {
  const none = { shape: 'none', arrayProps: [], objectProps: [], dataProps: [], envelopeOnly: false };
  const resp = op.responses?.['200'] || op.responses?.['201'] || op.responses?.['202'];
  if (!resp) return none;
  const content = deref(spec, resp).content;
  const media = content?.['application/json'] || content?.['*/*'] || Object.values(content || {})[0];
  if (!media?.schema) return none;
  const schema = deref(spec, media.schema);
  if (schema.type === 'array' || (Array.isArray(schema.type) && schema.type.includes('array'))) {
    return { ...none, shape: 'array' };
  }
  const props = schema.properties ? Object.keys(schema.properties) : [];
  const arrayProps = props.filter((k) => {
    const ps = deref(spec, schema.properties[k]);
    return ps.type === 'array' || (Array.isArray(ps.type) && ps.type.includes('array'));
  }).filter((k) => !ENVELOPE_KEYS.has(k));
  const dataProps = props.filter((k) => !ENVELOPE_KEYS.has(k));
  // an object property is an unwrap candidate only when it declares
  // properties of its own; a map (additionalProperties, no properties -
  // RecognizedRegistriesResponse.recognizedRegistries) is a value, projected
  // as a JSON column
  const objectProps = dataProps.filter((k) => {
    const ps = deref(spec, schema.properties[k]);
    if (ps.type === 'array' || (Array.isArray(ps.type) && ps.type.includes('array'))) return false;
    return !!ps.properties && Object.keys(ps.properties).length > 0;
  });
  return {
    shape: props.length ? `object{${props.slice(0, 6).join(';')}${props.length > 6 ? ';...' : ''}}` : 'object',
    arrayProps,
    objectProps,
    dataProps,
    envelopeOnly: props.length > 0 && dataProps.length === 0
  };
}

const camel = (s) => s.replace(/_([a-z0-9])/g, (m, c) => c.toUpperCase());
const singular = (s) => s.replace(/ies$/, 'y').replace(/sses$/, 'ss').replace(/s$/, '');

// objectKey per method kind: a collection read (list*) unwraps the array
// property of its envelope ({models: [...], paginationInfo, requestStatus});
// an entity read unwraps the object property of an entity envelope ({model:
// {...}, requestStatus}) and never an array field of the entity itself
// (GpuByPciResponse.gpuCounts is data, not a list). When an envelope carries
// several candidates ({model, modelVersion, requestStatus}) the property
// named after the resource wins (model_versions -> modelVersion); with no
// such match the key is left blank for a wire check.
function objectKeyFor(resource, method, { arrayProps, objectProps, dataProps }) {
  const isList = /^list/.test(method);
  // a collection read unwraps its array property; a "list" that returns a
  // single object (authorizations.list_version) falls through to the entity
  // rules; an entity read whose only data property is an array
  // (encryption_keys.get -> {artifacts: [...]}) unwraps that array
  if (isList && arrayProps.length === 1) return `$.${arrayProps[0]}`;
  if (isList && arrayProps.length > 1) return pick(arrayProps, camel(resource));
  if (!isList && objectProps.length === 0 && arrayProps.length === 1 && dataProps.length === 1) return `$.${arrayProps[0]}`;
  // entity envelope: exactly one data property, or one named after the
  // resource; an entity with several properties of its own (a nested
  // object among scalars - WorkflowStatusResponse.cloneStatus) stays flat
  if (objectProps.length === 0) return '';
  if (dataProps.length === 1) return `$.${objectProps[0]}`;
  return pick(objectProps, camel(singular(resource)), true);
}

function pick(candidates, wanted, entity = false) {
  const exact = candidates.find((c) => c.toLowerCase() === wanted.toLowerCase());
  if (exact) return `$.${exact}`;
  // the resources family reuses the recipe wrappers and helm charts the
  // generic artifact wrappers: match on the trailing segment of the
  // resource name (resource_versions -> ...Version, ...Versions)
  const suffix = wanted.replace(/^.*?([A-Z][a-z]+)$/, '$1').toLowerCase();
  const bySuffix = candidates.filter((c) => c.toLowerCase().endsWith(suffix));
  if (bySuffix.length === 1) return `$.${bySuffix[0]}`;
  return entity ? '' : `$.${candidates[0]}?multi:${candidates.join('|')}`;
}

function paginationParams(spec, op, pathItem) {
  const params = [...(pathItem.parameters || []), ...(op.parameters || [])].map((p) => deref(spec, p));
  return params
    .filter((p) => p.in === 'query' && /^(page|page-?size|pageSize|page-?number|cursor|offset|limit|next|token)$/i.test(p.name))
    .map((p) => p.name).join('+');
}

// casing of the non-path wire parameters: kebab (page-size) or camel
// (includeSecrets); the provider's user surface is snake_case, and
// request.nativeCasing tells any-sdk how to reverse it per method
function nativeCasing(spec, op, pathItem) {
  const params = [...(pathItem.parameters || []), ...(op.parameters || [])].map((p) => deref(spec, p))
    .filter((p) => p.in === 'query' || p.in === 'header');
  if (params.some((p) => p.name.includes('-'))) return 'kebab';
  return 'camel';
}

function authDeclared(spec, op) {
  const sec = op.security !== undefined ? op.security : spec.security;
  if (!sec || sec.length === 0) return 'none-declared';
  const names = sec.flatMap((s) => Object.keys(s));
  return names.join('+') || 'none-declared';
}

// ---------------------------------------------------------------------------
// classification rules per source (paths are the cleaned form: snake_case
// path parameters, /v2 gateway prefix for the models definition)
// ---------------------------------------------------------------------------

function classifyNvcf(p, verb, op) {
  const tag = (op.tags || [])[0] || '';
  if (p === '/health' || p === '/info') return { skip: 'service-infra' };

  const T = {
    'Function Management': () => {
      if (p === '/v2/nvcf/functions' && verb === 'get') return r('nvcf_functions', 'functions', 'list', 'select');
      if (p === '/v2/nvcf/functions' && verb === 'post') return r('nvcf_functions', 'functions', 'create', 'insert');
      if (p === '/v2/nvcf/functions/ids') return r('nvcf_functions', 'function_ids', 'list', 'select', 'own resource: same empty path-param signature as functions.list');
      if (p === '/v2/nvcf/functions/{function_id}/versions' && verb === 'get') return r('nvcf_functions', 'function_versions', 'list', 'select');
      if (p === '/v2/nvcf/functions/{function_id}/versions' && verb === 'post') return r('nvcf_functions', 'function_versions', 'create', 'insert');
      if (p === '/v2/nvcf/functions/{function_id}/versions/{function_version_id}') {
        if (verb === 'get') return r('nvcf_functions', 'function_versions', 'get', 'select');
        if (verb === 'put') return r('nvcf_functions', 'function_versions', 'update', 'update', 'PUT semantics unverified (keycloak rule): update until field-drop evidence');
        if (verb === 'delete') return r('nvcf_functions', 'function_versions', 'delete', 'delete');
      }
      if (p.startsWith('/v2/nvcf/metadata/')) return r('nvcf_functions', 'function_metadata', 'update', 'update', 'PUT semantics unverified');
    },
    'Function Sharing': () => {
      const versioned = p.includes('/versions/');
      const res = 'authorizations';
      const m = versioned ? '_version' : '';
      if (verb === 'get') return r('nvcf_functions', res, `list${m}`, 'select');
      if (verb === 'post') return r('nvcf_functions', res, `set${m}`, 'replace', 'POST replaces the full authorized-party list - grants-as-data set operation');
      if (p.endsWith('/add')) return r('nvcf_functions', res, `add${m}`, 'insert');
      if (p.endsWith('/remove')) return r('nvcf_functions', res, `remove${m}`, 'delete');
      if (verb === 'delete') return r('nvcf_functions', res, `delete_all${m}`, 'exec', 'delete-all kept off the DELETE verb: same path-param signature as the granular remove');
    },
    'Function Deployment': () => {
      if (p === '/v2/nvcf/deployments/{deployment_id}') return r('nvcf_deployments', 'deployments', 'get_by_id', 'select');
      if (p.includes('/gpu-specifications/')) return r('nvcf_deployments', 'deployment_gpu_specs', 'update', 'update');
      if (verb === 'get') return r('nvcf_deployments', 'deployments', 'get', 'select');
      if (verb === 'post') return r('nvcf_deployments', 'deployments', 'create', 'insert');
      if (verb === 'put') return r('nvcf_deployments', 'deployments', 'update', 'update', 'PUT semantics unverified');
      if (verb === 'delete') return r('nvcf_deployments', 'deployments', 'delete', 'delete');
    },
    'Cluster Groups and GPUs': () => r('nvcf_deployments', 'cluster_groups', 'list', 'select'),
    'Registry Credential Management': () => {
      if (p === '/v2/nvcf/recognized-registries') return r('nvcf_deployments', 'recognized_registries', 'list', 'select');
      if (verb === 'get' && p.endsWith('registry-credentials')) return r('nvcf_deployments', 'registry_credentials', 'list', 'select');
      if (verb === 'get') return r('nvcf_deployments', 'registry_credentials', 'get', 'select');
      if (verb === 'post') return r('nvcf_deployments', 'registry_credentials', 'create', 'insert');
      if (verb === 'patch') return r('nvcf_deployments', 'registry_credentials', 'update', 'update');
      if (verb === 'delete') return r('nvcf_deployments', 'registry_credentials', 'delete', 'delete');
    },
    'Telemetry Management': () => {
      if (verb === 'get' && p.endsWith('telemetries')) return r('nvcf_deployments', 'telemetries', 'list', 'select');
      if (verb === 'get') return r('nvcf_deployments', 'telemetries', 'get', 'select');
      if (verb === 'post') return r('nvcf_deployments', 'telemetries', 'create', 'insert');
      if (verb === 'delete') return r('nvcf_deployments', 'telemetries', 'delete', 'delete');
    },
    'User Secret Management': () => {
      if (p.includes('/secrets/functions/')) return r('nvcf_functions', 'function_secrets', 'update', 'update', 'PUT semantics unverified');
      if (p.includes('/secrets/telemetries/')) return r('nvcf_deployments', 'telemetry_secrets', 'update', 'update', 'PUT semantics unverified');
    },
    'User Ratelimit Management': () => {
      if (verb === 'put') return r('nvcf_functions', 'function_ratelimits', 'update', 'update', 'PUT semantics unverified');
      if (verb === 'delete') return r('nvcf_functions', 'function_ratelimits', 'delete', 'delete');
    },
    'Queue Details': () => {
      if (p.includes('/position')) return r('nvcf_queues', 'queue_positions', 'get', 'select');
      if (p.includes('/versions/')) return r('nvcf_queues', 'queues', 'list_version', 'select');
      return r('nvcf_queues', 'queues', 'list', 'select');
    },
    'Function Invocation': () => {
      if (p.startsWith('/v2/nvcf/pexec/status/')) return r('nvcf_invocation', 'invocation_status', 'get', 'select', 'polling form: EXEC returns 202 + requestId, status polled here (proxmox precedent)');
      if (p.includes('/versions/')) return r('nvcf_invocation', 'invocations', 'invoke_version', 'exec', 'polling invocation, scoped in');
      return r('nvcf_invocation', 'invocations', 'invoke', 'exec', 'polling invocation, scoped in');
    },
    'Function Invocation Assertion Token': () => {
      if (p === '/v2/nvcf/tokens/functions') return r('nvcf_invocation', 'tokens', 'create_for_functions', 'exec', 'ephemeral credential mint - action, nothing queryable persisted');
      if (p.includes('/versions/')) return r('nvcf_invocation', 'tokens', 'create_for_version', 'exec');
      return r('nvcf_invocation', 'tokens', 'create_for_function', 'exec');
    },
    'Asset Management': () => {
      if (verb === 'get' && p === '/v2/nvcf/assets') return r('nvcf_invocation', 'assets', 'list', 'select');
      if (verb === 'get') return r('nvcf_invocation', 'assets', 'get', 'select');
      if (verb === 'post') return r('nvcf_invocation', 'assets', 'create', 'insert');
      if (verb === 'delete') return r('nvcf_invocation', 'assets', 'delete', 'delete');
    }
  };

  const fn = T[tag];
  const res = fn ? fn() : null;
  if (!res) return { error: `unclassified nvcf operation: ${verb} ${p} [${tag}]` };
  res.host = NVCF_HOST_TAGS.has(tag) ? NVCF_HOST : NGC_HOST;
  res.invocationForm = tag === 'Function Invocation' ? 'polling' : '';
  return res;
}

function classifyKas(p, verb, op) {
  if (/^\/(health|version|swagger-resources|public-keys)/.test(p) || p === '/v2/ping') return { skip: 'service-infra' };
  if (/^\/v[23]\/admin\//.test(p) || p === '/v2/admin') return { skip: 'internal-admin' };
  if (op.deprecated) return { skip: 'deprecated-inline' };

  // team-scoped organization paths (Private Registry teams - exempt from
  // the 2026-09 schedule): team membership, member roles and invitations
  const team = p.match(/^\/v2\/org\/\{org_name\}\/team\/\{team_name\}(\/.*)?$/) || p.match(/^\/v3\/orgs\/\{org_name\}\/teams\/\{team_name\}(\/.*)?$/);
  if (team) {
    const rest = team[1] || '';
    const v3 = p.startsWith('/v3/');
    if (rest === '/users' && verb === 'get') return r('orgs', 'team_members', 'list', 'select');
    if (rest === '/users' && verb === 'post') return r('orgs', 'team_members', 'create', 'insert', 'creates (invites) a user directly into the team');
    if (rest === '/users/{id}' && verb === 'post') return r('orgs', 'team_members', 'add', 'insert', 'adds an existing org user to the team - grants-as-data');
    if (rest === '/users/{id}' && verb === 'get') return { skip: 'superseded-by-v3-twin (/v3/orgs/{org_name}/teams/{team_name}/users/{user_email_or_id})' };
    if (rest === '/users/{id}' && verb === 'delete') return v3 ? r('orgs', 'team_members', 'remove', 'delete') : { skip: 'superseded-by-v3-twin (/v3/orgs/{org_name}/teams/{team_name}/users/{id})' };
    if (rest === '/users/{user_email_or_id}' && verb === 'get') return r('orgs', 'team_members', 'get', 'select');
    if (rest.endsWith('/add-role')) return r('orgs', 'team_member_roles', 'add', 'insert', 'grants-as-data');
    if (rest.endsWith('/remove-role')) return r('orgs', 'team_member_roles', 'remove', 'delete', 'grants-as-data');
    if (rest === '/users/invitations' && verb === 'get') return r('orgs', 'team_invitations', 'list', 'select');
    if (rest === '/users/invitations/{id}' && verb === 'delete') return r('orgs', 'team_invitations', 'delete', 'delete');
    if (rest.endsWith('/resend-invitation-email')) return r('orgs', 'team_invitations', 'resend_email', 'exec', 'non-idempotent GET (sends email) - action, not a read');
    if (rest === '/users/nca-invitations') return r('orgs', 'team_invitations', 'create_nca', 'insert');
    if (rest === '/starfleetIds/{starfleet_id}') return r('orgs', 'team_members', 'get_by_starfleet_id', 'select');
    return { error: `unclassified kas team operation: ${verb} ${p}` };
  }

  if (p === '/roles') return r('orgs', 'roles', 'list', 'select');
  if (p === '/v2/orgs' && verb === 'get') return r('orgs', 'orgs', 'list', 'select');
  if (p === '/v2/orgs/{org_name}' && verb === 'get') return r('orgs', 'orgs', 'get', 'select');
  if (p === '/v2/orgs/{org_name}' && verb === 'patch') return r('orgs', 'orgs', 'update', 'update');
  if (p === '/v3/orgs' && verb === 'post') return r('orgs', 'orgs', 'create', 'insert');
  if (p === '/v3/orgs/proto-org') return r('orgs', 'proto_orgs', 'create', 'insert');
  if (p === '/v3/orgs/proto-org/validate') return r('orgs', 'proto_orgs', 'validate', 'select');

  if (p === '/v2/org/{org_name}/teams' && verb === 'get') return r('orgs', 'teams', 'list', 'select');
  if (p === '/v2/org/{org_name}/teams' && verb === 'post') return r('orgs', 'teams', 'create', 'insert');
  if (p === '/v2/org/{org_name}/teams/{team_name}') {
    if (verb === 'get') return r('orgs', 'teams', 'get', 'select');
    if (verb === 'patch') return r('orgs', 'teams', 'update', 'update');
    if (verb === 'delete') return r('orgs', 'teams', 'delete', 'delete');
  }

  if (p === '/v2/org/{org_name}/users' && verb === 'get') return r('orgs', 'users', 'list', 'select');
  if (p === '/v2/org/{org_name}/users' && verb === 'post') return r('orgs', 'users', 'create', 'insert');
  if (p === '/v2/org/{org_name}/users/{id}' && verb === 'get') return { skip: 'superseded-by-v3-twin (/v3/orgs/{org_name}/users/{user_email_or_id})' };
  if (p === '/v2/org/{org_name}/users/{id}' && verb === 'delete') return { skip: 'superseded-by-v3-twin (/v3/orgs/{org_name}/users/{id})' };
  if (p === '/v3/orgs/{org_name}/users/{user_email_or_id}' && verb === 'get') return r('orgs', 'users', 'get', 'select');
  if (p === '/v3/orgs/{org_name}/users/{id}' && verb === 'delete') return r('orgs', 'users', 'delete', 'delete');
  if (p === '/v2/org/{org_name}/starfleetIds/{starfleet_id}') return r('orgs', 'users', 'get_by_starfleet_id', 'select');
  if (p.endsWith('/add-role')) return r('orgs', 'user_roles', 'add', 'insert', 'grants-as-data');
  if (p.endsWith('/remove-role')) return r('orgs', 'user_roles', 'remove', 'delete', 'grants-as-data');
  if (p === '/v2/org/{org_name}/users/invitations') return r('orgs', 'user_invitations', 'list', 'select');
  if (p === '/v2/org/{org_name}/users/invitations/{id}' && verb === 'delete') return r('orgs', 'user_invitations', 'delete', 'delete');
  if (p.endsWith('/resend-invitation-email')) return r('orgs', 'user_invitations', 'resend_email', 'exec', 'non-idempotent GET (sends email) - action, not a read');
  if (p.endsWith('/users/nca-invitations')) return r('orgs', 'user_invitations', 'create_nca', 'insert');

  if (p === '/v2/users/me' && verb === 'get') return r('orgs', 'current_user', 'get', 'select');
  if (p === '/v2/users/me' && verb === 'patch') return r('orgs', 'current_user', 'update', 'update');
  if (p === '/v2/users/me/api-key') return r('orgs', 'current_user', 'create_api_key', 'exec', 'credential mint - action');

  return { error: `unclassified kas operation: ${verb} ${p}` };
}

// Guest (catalog) and org-scoped (registry) artifact metadata; the rules
// see the team scope stripped (classifyModels strips it and suffixes the
// method with _by_team).
function classifyModelsCore(p, verb, op) {
  if (/^\/health/.test(p)) return { skip: 'service-infra' };
  if (p === '/v2/malware-scan-notification') return { skip: 'inbound-webhook-not-client-api' };
  if (/\/files\/(multipart|clone|commit)|\/files\/\*\*|\/async-clone|\/zip(\/|$)|\{artifact_name\}\/files$/.test(p) &&
      !/versions\/\{version_id\}\/files$|\{version\}\/files$/.test(p)) {
    return { skip: 'data-plane-file-transfer' };
  }
  if (p.startsWith('/v2/deploy/')) return { skip: 'duplicate-endpoint-family (same operations as the /v2/csps/{artifact_type} family)' };
  // NIM catalog metadata publishing (added upstream 2026-09; a team-owned
  // NIM addressed without an org segment - publisher-privileged write)
  if (p === '/v2/nim/{team}/{nim_name}/{tag}/metadata' && verb === 'post') return r('catalog', 'nim_metadata', 'create', 'insert', 'publisher-privileged write, mapped as documented');

  // /v2/csps/{artifact_type}/org/... and /v2/{artifact_type}/org/... are
  // alternate path families for operations also present under
  // /v2/org/{org_name}/... - the org-scoped family is the one mapped
  if (p.startsWith('/v2/csps/{artifact_type}/org/')) return { skip: 'duplicate-endpoint-family (same operation under /v2/org/{org_name}/{artifact_type}/.../deployments)' };
  if (/^\/v2\/\{artifact_type\}\/org\//.test(p)) return { skip: 'duplicate-endpoint-family (same operation under /v2/org/{org_name}/{artifact_type}/{artifact_name}/collections)' };

  const org = p.includes('/org/{org');

  // catalog (guest) families ------------------------------------------------
  if (!org) {
    if (p === '/v2/{artifact_type}') return r('catalog', 'artifacts', 'list', 'select');
    if (p === '/v2/{artifact_type}/{org_name}/{artifact_name}') return r('catalog', 'artifacts', 'get', 'select');
    if (/^\/v2\/\{artifact_type\}\/\{org_name\}\/\{artifact_name\}\/versions\/\{version_id\}\/files$/.test(p)) return r('catalog', 'artifact_files', 'list', 'select');
    if (p.endsWith('/signature')) return { skip: 'non-json-response (signature bytes / redirect)' };
    if (/^\/v2\/\{artifact_type\}\/\{org_name\}\/\{artifact_name\}\/spec$/.test(p)) return r('catalog', 'artifact_specs', 'get', 'select');
    if (p === '/v2/models') return r('catalog', 'models', 'list', 'select');
    if (p === '/v2/models/{org_name}/{model_name}') return r('catalog', 'models', 'get', 'select');
    if (p === '/v2/models/{org_name}/{model_name}/versions') return r('catalog', 'model_versions', 'list', 'select');
    if (p === '/v2/models/{org_name}/{model_name}/versions/{version_id}') return r('catalog', 'model_versions', 'get', 'select');
    if (p === '/v2/models/{org_name}/{model_name}/versions/{version_id}/files') return r('catalog', 'model_files', 'list', 'select');
    if (p === '/v2/recipes') return r('catalog', 'recipes', 'list', 'select');
    if (p === '/v2/recipes/{org_name}/{recipe_name}') return r('catalog', 'recipes', 'get', 'select');
    if (p === '/v2/recipes/{org_name}/{recipe_name}/versions') return r('catalog', 'recipe_versions', 'list', 'select');
    if (p === '/v2/recipes/{org_name}/{recipe_name}/versions/{version_id}') return r('catalog', 'recipe_versions', 'get', 'select');
    if (p === '/v2/recipes/{org_name}/{recipe_name}/versions/{version_id}/files') return r('catalog', 'recipe_files', 'list', 'select');
    if (p === '/v2/resources') return r('catalog', 'resources', 'list', 'select');
    if (p === '/v2/resources/{org_name}/{recipe_name}') return r('catalog', 'resources', 'get', 'select');
    if (p === '/v2/resources/{org_name}/{recipe_name}/versions') return r('catalog', 'resource_versions', 'list', 'select');
    if (p === '/v2/resources/{org_name}/{recipe_name}/versions/{version_id}') return r('catalog', 'resource_versions', 'get', 'select');
    if (p === '/v2/resources/{org_name}/{recipe_name}/versions/{version_id}/files') return r('catalog', 'resource_files', 'list', 'select');
    if (p === '/v2/helm-charts/{org_name}/{artifact_name}/versions') return r('catalog', 'helm_chart_versions', 'list', 'select');
    if (p === '/v2/helm-charts/{org_name}/{artifact_name}/versions/{version_id}') return r('catalog', 'helm_chart_versions', 'get', 'select');
    if (p === '/v2/collections') return r('catalog', 'collections', 'list', 'select');
    if (p === '/v2/collections/{org_name}/{collection_name}') return r('catalog', 'collections', 'get', 'select');
    if (/^\/v2\/collections\/\{org_name\}\/\{collection_name\}\/artifacts\/\{artifact_type\}$/.test(p)) return r('catalog', 'collection_artifacts', 'list', 'select');
    if (p === '/v2/gpus') return r('catalog', 'gpus', 'list', 'select');
    if (p.startsWith('/v2/gpus/pci-device-id')) {
      const m = p.includes('pci-subsystem-device-id') ? '_by_vendor_subsystem'
        : (p.includes('pci-vendor-id') ? '_by_vendor' : '');
      if (verb === 'get') return r('catalog', 'gpus', `get${m}`, 'select');
      if (verb === 'post') return r('catalog', 'gpus', `create${m}`, 'insert', 'publisher-privileged write, mapped as documented');
      if (verb === 'patch') return r('catalog', 'gpus', `update${m}`, 'update', 'publisher-privileged write');
      if (verb === 'delete') return r('catalog', 'gpus', `delete${m}`, 'delete', 'publisher-privileged write');
    }
    if (p === '/v2/csps' && verb === 'get') return r('catalog', 'csps', 'list', 'select');
    if (p === '/v2/csps' && verb === 'post') return r('catalog', 'csps', 'create', 'insert', 'publisher-privileged write');
    if (p === '/v2/csps/{csp_name}') {
      if (verb === 'get') return r('catalog', 'csps', 'get', 'select');
      if (verb === 'patch') return r('catalog', 'csps', 'update', 'update', 'publisher-privileged write');
      if (verb === 'delete') return r('catalog', 'csps', 'delete', 'delete', 'publisher-privileged write');
    }
    if (p.startsWith('/v2/csps/{csp_name}/deployments/params')) {
      const meta = p.endsWith('/meta') ? '_meta' : '';
      if (verb === 'get') return r('catalog', `csp_deployment_params${meta}`, 'get', 'select');
      if (verb === 'post') return r('catalog', `csp_deployment_params${meta}`, 'create', 'insert');
      if (verb === 'patch') return r('catalog', `csp_deployment_params${meta}`, 'update', 'update');
      if (verb === 'delete') return r('catalog', `csp_deployment_params${meta}`, 'delete', 'delete');
    }
    if (p.startsWith('/v2/csps/{artifact_type}/') && p.endsWith('/params')) {
      const byCsp = p.includes('{csp_name}');
      return r('catalog', 'artifact_deployment_params', byCsp ? 'get' : 'list', 'select');
    }
    return { error: `unclassified catalog operation: ${verb} ${p}` };
  }

  // registry (org-scoped) families -------------------------------------------
  const generic = /\{artifact_type\}/.test(p);
  if (p === '/v2/artifact-registry/org/{org_name}/encryption-keys') return r('private_registry', 'encryption_keys', 'list', 'select');
  if (p === '/v2/artifact-registry/org/{org_name}/encryption-keys/{key_id}') {
    if (verb === 'get') return r('private_registry', 'encryption_keys', 'get', 'select');
    if (verb === 'delete') return r('private_registry', 'encryption_keys', 'delete', 'delete');
  }
  if (p === '/v2/artifact-registry/org/{org}/workflows/{workflow_id}') return r('private_registry', 'workflows', 'get', 'select');

  if (p === '/v2/org/{org_name}/collections' && verb === 'get') return r('private_registry', 'collections', 'list', 'select');
  if (p === '/v2/org/{org_name}/collections' && verb === 'post') return r('private_registry', 'collections', 'create', 'insert');
  if (p === '/v2/org/{org_name}/collections/{collection_name}') {
    if (verb === 'get') return r('private_registry', 'collections', 'get', 'select');
    if (verb === 'patch') return r('private_registry', 'collections', 'update', 'update');
    if (verb === 'delete') return r('private_registry', 'collections', 'delete', 'delete');
  }
  if (p.startsWith('/v2/org/{org_name}/collections/{collection_name}')) {
    if (p.includes('/share')) {
      // /share is the legacy org-wide share (its PUT is deprecated inline);
      // product shares get their own resource - same path-param signature
      // as the org-wide share otherwise
      if (p.endsWith('/share') && verb === 'delete') return { skip: 'legacy-twin (PUT counterpart deprecated inline; superseded by /shares/org)' };
      if (p.endsWith('/share') && verb === 'put') return { skip: 'legacy-twin (superseded by /shares/org)' };
      if (p.endsWith('/share/product')) {
        if (verb === 'put') return r('private_registry', 'collection_product_shares', 'add', 'insert', 'grants-as-data');
        if (verb === 'delete') return r('private_registry', 'collection_product_shares', 'remove', 'delete', 'grants-as-data');
      }
      const target = p.includes('/shares/org') ? '_org' : '_team';
      if (verb === 'put') return r('private_registry', 'collection_shares', `add${target}`, 'insert', 'grants-as-data');
      if (verb === 'delete') return r('private_registry', 'collection_shares', `remove${target}`, 'delete', 'grants-as-data');
    }
    if (/\/artifacts\/\{artifact_type\}$/.test(p)) return r('private_registry', 'collection_artifacts', 'list', 'select');
    if (/\/artifacts$/.test(p) && verb === 'patch') return r('private_registry', 'collection_artifacts', 'update_bulk', 'update', 'bulk membership update');
    if (p.includes('/artifacts/org/')) {
      const teamArtifact = p.includes('/team/{artifact_team_name}/') ? '_team' : '';
      if (verb === 'put') return r('private_registry', 'collection_artifacts', `add_cross_org${teamArtifact}`, 'insert', 'grants-as-data membership');
      if (verb === 'delete') return r('private_registry', 'collection_artifacts', `remove_cross_org${teamArtifact}`, 'delete');
    }
    if (/\{artifact_type\}\/\{artifact_name\}$/.test(p)) {
      if (verb === 'put') return r('private_registry', 'collection_artifacts', 'add', 'insert', 'grants-as-data membership');
      if (verb === 'delete') return r('private_registry', 'collection_artifacts', 'remove', 'delete');
    }
  }

  if (p === '/v2/org/{org_name}/models' && verb === 'get') return r('private_registry', 'models', 'list', 'select');
  if (p === '/v2/org/{org_name}/models' && verb === 'post') return r('private_registry', 'models', 'create', 'insert');
  if (p === '/v2/org/{org_name}/models/{model_name}') {
    if (verb === 'get') return r('private_registry', 'models', 'get', 'select');
    if (verb === 'patch') return r('private_registry', 'models', 'update', 'update');
    if (verb === 'delete') return r('private_registry', 'models', 'delete', 'delete', 'injected from SDK evidence (clean_specs inject-sdk-operations)');
  }
  if (p === '/v2/org/{org_name}/models/{model_name}/encryption-key') return r('private_registry', 'model_encryption_keys', 'delete', 'delete');
  if (p.includes('/models/{model_name}/shares/')) {
    const target = p.endsWith('/shares/org') ? '_org' : '_team';
    if (verb === 'put') return r('private_registry', 'model_shares', `add${target}`, 'insert', 'grants-as-data');
    if (verb === 'delete') return r('private_registry', 'model_shares', `remove${target}`, 'delete', 'grants-as-data');
  }
  if (p === '/v2/org/{org_name}/models/{model_name}/versions' && verb === 'get') return r('private_registry', 'model_versions', 'list', 'select');
  if (p === '/v2/org/{org_name}/models/{model_name}/versions' && verb === 'post') return r('private_registry', 'model_versions', 'create', 'insert');
  if (p === '/v2/org/{org_name}/models/{model_name}/versions/{version_id}') {
    if (verb === 'get') return r('private_registry', 'model_versions', 'get', 'select');
    if (verb === 'patch') return r('private_registry', 'model_versions', 'update', 'update');
  }
  if (p === '/v2/org/{org_name}/models/{model_name}/versions/{version_id}/files') return r('private_registry', 'model_files', 'list', 'select');
  if (p === '/v2/org/{org_name}/models/{artifact_name}/versions/{version_id}/stash') return r('private_registry', 'model_versions', 'stash', 'exec', 'action on a version');

  for (const [seg, resBase] of [['recipes', 'recipe'], ['resources', 'resource']]) {
    const base = `/v2/org/{org_name}/${seg}`;
    if (p === base && verb === 'get') return r('private_registry', `${resBase}s`, 'list', 'select');
    if (p === base && verb === 'post') return r('private_registry', `${resBase}s`, 'create', 'insert');
    if (p === `${base}/{recipe_name}`) {
      if (verb === 'get') return r('private_registry', `${resBase}s`, 'get', 'select');
      if (verb === 'patch') return r('private_registry', `${resBase}s`, 'update', 'update');
      if (verb === 'delete') return r('private_registry', `${resBase}s`, 'delete', 'delete', 'injected from SDK evidence (clean_specs inject-sdk-operations)');
    }
    if (p === `${base}/{recipe_name}/versions` && verb === 'get') return r('private_registry', `${resBase}_versions`, 'list', 'select');
    if (p === `${base}/{recipe_name}/versions` && verb === 'post') return r('private_registry', `${resBase}_versions`, 'create', 'insert');
    if (p === `${base}/{recipe_name}/versions/{version_id}`) {
      if (verb === 'get') return r('private_registry', `${resBase}_versions`, 'get', 'select');
      if (verb === 'patch') return r('private_registry', `${resBase}_versions`, 'update', 'update');
    }
    if (p === `${base}/{recipe_name}/versions/{version_id}/files`) return r('private_registry', `${resBase}_files`, 'list', 'select');
  }

  if (p === '/v2/org/{org_name}/helm-charts/{artifact_name}/versions') return r('private_registry', 'helm_chart_versions', 'list', 'select');
  if (p === '/v2/org/{org_name}/helm-charts/{artifact_name}/versions/{version_id}') {
    if (verb === 'get') return r('private_registry', 'helm_chart_versions', 'get', 'select');
    if (verb === 'patch') return r('private_registry', 'helm_chart_versions', 'update', 'update');
  }

  if (p.includes('/repositories/{container_name}/tags/')) return r('private_registry', 'repository_associated_models', 'list_by_tag', 'select');
  if (p.includes('/repositories/{container_name}/associated-models')) return r('private_registry', 'repository_associated_models', 'list', 'select');

  if (generic) {
    if (p === '/v2/org/{org_name}/{artifact_type}' && verb === 'get') return r('private_registry', 'artifacts', 'list', 'select');
    if (p === '/v2/org/{org_name}/{artifact_type}' && verb === 'post') return r('private_registry', 'artifacts', 'create', 'insert');
    if (p === '/v2/org/{org_name}/{artifact_type}/{artifact_name}') {
      if (verb === 'get') return r('private_registry', 'artifacts', 'get', 'select');
      if (verb === 'patch') return r('private_registry', 'artifacts', 'update', 'update');
      if (verb === 'put') return r('private_registry', 'artifacts', 'replace', 'replace', 'PUT with a PATCH twin - proposed replace, semantics unverified (keycloak rule)');
      if (verb === 'delete') return r('private_registry', 'artifacts', 'delete', 'delete');
    }
    if (p.endsWith('/catalog/flags')) return r('private_registry', 'artifact_catalog_flags', 'get', 'select');
    if (p.endsWith('/{artifact_name}/collections')) return r('private_registry', 'artifact_collections', 'list', 'select');
    if (p.endsWith('/sync-release-type-labels')) return r('private_registry', 'artifacts', 'sync_release_type_labels', 'exec', 'action');
    if (p.endsWith('/deployments/params') && verb === 'get') return r('private_registry', 'artifact_deployment_params', 'list', 'select');
    if (p.includes('/deployments/{csp_name}/params')) {
      if (verb === 'get') return r('private_registry', 'artifact_deployment_params', 'get', 'select');
      if (verb === 'post') return r('private_registry', 'artifact_deployment_params', 'create', 'insert');
      if (verb === 'patch') return r('private_registry', 'artifact_deployment_params', 'update', 'update');
      if (verb === 'delete') return r('private_registry', 'artifact_deployment_params', 'delete', 'delete');
    }
    if (p.endsWith('/deployments/{csp_name}/parameters')) return { skip: 'duplicate-endpoint-family (same operation as /deployments/{csp_name}/params)' };
    if (p.endsWith('/license/acceptance')) {
      // the GET answers with the requestStatus envelope only (the vendor's
      // own response schema) - nothing to project
      if (verb === 'get') return { skip: 'non-projectable-response (requestStatus-only envelope)' };
      if (verb === 'post') return r('private_registry', 'license_acceptances', 'create', 'insert');
    }
    if (p.endsWith('/release-type')) return r('private_registry', 'artifacts', 'set_release_type', 'exec', 'single-field action endpoint');
    if (p.endsWith('/terms-of-service')) return r('private_registry', 'artifacts', 'set_terms_of_service', 'exec', 'single-field action endpoint');
    if (p.endsWith('/share/product')) {
      // own resource: same path-param signature as artifact_shares
      if (verb === 'put') return r('private_registry', 'artifact_product_shares', 'add', 'insert', 'grants-as-data');
      if (verb === 'delete') return r('private_registry', 'artifact_product_shares', 'remove', 'delete');
    }
    if (p.endsWith('/share')) {
      if (verb === 'put') return r('private_registry', 'artifact_shares', 'add', 'insert', 'grants-as-data');
      if (verb === 'delete') return r('private_registry', 'artifact_shares', 'remove', 'delete');
    }
    if (/\/versions\/\{version_id\}$/.test(p) && verb === 'delete') return r('private_registry', 'artifact_versions', 'delete', 'delete');
    if (p.endsWith('/versions/{version_id}/configs')) return r('private_registry', 'artifact_version_configs', 'update', 'update');
    if (p.includes('/versions/{version_id}/deployments/')) return r('private_registry', 'artifact_deployments', 'create', 'insert', 'launches a CSP deployment');
    if (/\/versions\/\{version_id\}\/files$/.test(p)) return r('private_registry', 'artifact_files', 'list', 'select');
    if (p.endsWith('/versions/{version_id}/signature') && verb === 'get') return { skip: 'non-json-response (signature bytes / redirect)' };
    if (p.endsWith('/versions/{version_id}/signature') && verb === 'put') return r('private_registry', 'artifact_signatures', 'set', 'exec', 'write of a computed signature - action');
    if (p.endsWith('/malware-scan')) return r('private_registry', 'artifacts', 'malware_scan', 'exec', 'action');
    if (p.endsWith('/purge')) return r('private_registry', 'artifacts', 'purge', 'exec', 'kept off DELETE: same path-param signature as artifacts.delete');
    if (/\{artifact_type\}\/\{artifact_name\}\/spec$/.test(p)) {
      if (verb === 'get') return r('private_registry', 'artifact_specs', 'get', 'select');
      if (verb === 'put') return r('private_registry', 'artifact_specs', 'update', 'update', 'PUT semantics unverified');
      if (verb === 'delete') return r('private_registry', 'artifact_specs', 'delete', 'delete');
    }
    if (/\{artifact_type\}\/spec$/.test(p) && verb === 'post') return r('private_registry', 'artifact_specs', 'create', 'insert');
    if (p.endsWith('/files') && verb === 'post') return { skip: 'data-plane-file-transfer (checksum existence check for uploads)' };
  }

  // generic {type} file listings (duplicates of the /versions/{version_id}/files listings)
  if (/^\/v2\/org\/\{org\}\/\{type\}\/\{name\}\/\{version\}\/files$/.test(p)) return { skip: 'duplicate-endpoint-family (same listing as /versions/{version_id}/files)' };
  if (/^\/v2\/\{type\}\/org\/\{org\}\/\{name\}\/\{version\}\/files$/.test(p)) return { skip: 'duplicate-endpoint-family (typed/guest file listing twins)' };

  return { error: `unclassified registry operation: ${verb} ${p}` };
}

function classifyModels(p, verb, op) {
  if (op.deprecated) return { skip: 'deprecated-inline' };
  const { stripped, team } = stripTeamScope(p);
  const c = classifyModelsCore(stripped, verb, op);
  if (!team || c.error || c.skip) return c;
  return { ...c, method: `${c.method}_by_team`, note: `${c.note ? c.note + '; ' : ''}team-scoped twin of ${stripped} (Private Registry team scoping is exempt from the 2026-09-30 schedule)` };
}

function r(service, resource, method, sqlVerb, note = '') {
  return { service, resource, method, sqlVerb, note };
}

// ---------------------------------------------------------------------------
// org-scope rebase
// ---------------------------------------------------------------------------

function rebase(p, host) {
  for (const { re, template } of ORG_PREFIXES) {
    const m = p.match(re);
    if (m) {
      return { orgPrefix: template, rebasedPath: p.slice(m[0].length), serverUrl: host + template, orgParam: m[1] };
    }
  }
  return { orgPrefix: '', rebasedPath: p, serverUrl: host, orgParam: '' };
}

// ---------------------------------------------------------------------------
// main
// ---------------------------------------------------------------------------

const rows = [];
const errors = [];
const stats = { bySource: {}, byService: {}, byVerb: {}, skips: {}, teamTwins: 0, scheduled: 0, publicReads: 0, rebased: 0 };

for (const [file, source] of Object.entries(SOURCES)) {
  const abs = path.join(cleanedDir, file);
  if (!fs.existsSync(abs)) {
    console.error(`Error: ${abs} not found - run fetch-specs + clean-specs first`);
    process.exit(1);
  }
  const spec = JSON.parse(fs.readFileSync(abs, 'utf8'));

  for (const [pathKey, pathItem] of Object.entries(spec.paths || {})) {
    for (const verb of [...HTTP_VERBS, ...NON_GENERATOR_VERBS]) {
      const op = pathItem[verb];
      if (!op) continue;

      let c;
      const scheduled = SCHEDULED_DEPRECATIONS.some((re) => re.test(pathKey));
      if (NON_GENERATOR_VERBS.includes(verb)) c = { skip: 'non-generator-http-verb' };
      else if (scheduled) c = { skip: 'deprecated-schedule-2026-09-30 (NGC deprecated API reference: team-scoped paths for NVCF and sibling services end 2026-09-30)' };
      else if (file === 'nvcf_openapi.json') c = classifyNvcf(pathKey, verb, op);
      else if (file === 'ngc_kas.json') c = classifyKas(pathKey, verb, op);
      else c = classifyModels(pathKey, verb, op);

      if (c.error) { errors.push(c.error); continue; }

      const host = c.host || NGC_HOST;
      const shapeInfo = responseShape(spec, op);
      const { shape, envelopeOnly } = shapeInfo;
      const objectKey = c.skip ? '' : objectKeyFor(c.resource, c.method, shapeInfo);
      const orgScoped = /\{org(_name)?\}/.test(pathKey) ? 'y' : 'n';
      const teamScoped = (stripTeamScope(pathKey).team || /\/teams?\/\{team(_name)?\}/.test(pathKey)) ? 'y' : 'n';
      const observed = OBSERVED_PUBLIC_READS.get(`${file}::${pathKey}::${verb}`) || '';
      const mapped = !c.skip;
      const rb = mapped ? rebase(pathKey, host) : { orgPrefix: '', rebasedPath: pathKey, serverUrl: host };

      if (mapped && c.sqlVerb === 'select' && (shape === 'none' || envelopeOnly)) {
        errors.push(`select method ${c.service}.${c.resource}.${c.method} (${verb} ${pathKey}) has no projectable response schema (${shape}) - extend the response rules in clean_specs.mjs`);
      }

      const row = {
        source, file, host, verb, path: pathKey,
        operation_id: op.operationId || '',
        tags: (op.tags || []).join('|'),
        org_scoped: orgScoped,
        team_scoped: teamScoped,
        deprecated: op.deprecated ? 'y' : (scheduled ? 'y (schedule 2026-09-30)' : 'n'),
        auth_declared: authDeclared(spec, op),
        observed_public_read: observed,
        pagination_params: paginationParams(spec, op, pathItem),
        native_casing: nativeCasing(spec, op, pathItem),
        has_request_body: op.requestBody ? 'y' : 'n',
        response_shape: shape,
        object_key_candidate: objectKey,
        invocation_form: c.invocationForm || '',
        org_prefix: rb.orgPrefix,
        rebased_path: rb.rebasedPath,
        server_url: rb.serverUrl,
        service: mapped ? c.service : '',
        resource: mapped ? c.resource : '',
        method: mapped ? c.method : '',
        sql_verb: mapped ? c.sqlVerb : '',
        skip_reason: c.skip || '',
        notes: c.note || ''
      };
      rows.push(row);

      stats.bySource[source] = (stats.bySource[source] || 0) + 1;
      if (c.skip) {
        const key = c.skip.split(' ')[0];
        stats.skips[key] = (stats.skips[key] || 0) + 1;
        if (scheduled) stats.scheduled++;
      } else {
        stats.byService[c.service] = (stats.byService[c.service] || 0) + 1;
        stats.byVerb[c.sqlVerb] = (stats.byVerb[c.sqlVerb] || 0) + 1;
        if (c.method.endsWith('_by_team') || c.resource.startsWith('team_')) stats.teamTwins++;
        if (rb.orgPrefix) stats.rebased++;
      }
      if (observed === 'y') stats.publicReads++;
    }
  }
}

if (errors.length > 0) {
  console.error(`Inventory FAILED with ${errors.length} error(s) - nothing written:`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}

// method uniqueness per (service, resource); rebased-path uniqueness per
// (service, rebased_path, verb); one host per service
const seen = new Map();
const seenPath = new Map();
const hostsByService = new Map();
for (const row of rows) {
  if (!row.service) continue;
  const key = `${row.service}.${row.resource}.${row.method}`;
  if (seen.has(key)) errors.push(`duplicate method ${key}: ${seen.get(key)} and ${row.verb} ${row.path}`);
  seen.set(key, `${row.verb} ${row.path}`);
  const pKey = `${row.service}::${row.rebased_path}::${row.verb}`;
  if (seenPath.has(pKey)) errors.push(`rebase collision in ${row.service}: ${seenPath.get(pKey)} and ${row.path} both become ${row.verb} ${row.rebased_path}`);
  seenPath.set(pKey, row.path);
  if (!hostsByService.has(row.service)) hostsByService.set(row.service, new Set());
  hostsByService.get(row.service).add(row.host);
}
for (const [service, hosts] of hostsByService) {
  if (hosts.size > 1) errors.push(`service ${service} spans hosts ${[...hosts].join(', ')} - one host per service is required`);
}
if (errors.length > 0) {
  console.error(`Inventory FAILED with ${errors.length} consistency error(s) - nothing written:`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}

const header = Object.keys(rows[0]);
const csvField = (v) => (/[",\n\r]/.test(v) ? `"${String(v).replace(/"/g, '""')}"` : String(v));
const csv = [header.join(','), ...rows.map((row) => header.map((h) => csvField(row[h] ?? '')).join(','))].join('\n') + '\n';
fs.writeFileSync(outPath, csv);

console.log(`Wrote ${rows.length} operations to ${outPath}`);
console.log('By source:', JSON.stringify(stats.bySource));
console.log('Mapped by service:', JSON.stringify(stats.byService, null, 2));
console.log('Mapped by SQL verb:', JSON.stringify(stats.byVerb));
console.log('Skips by reason:', JSON.stringify(stats.skips, null, 2));
console.log(`Team-scoped twins mapped (Private Registry, exempt from the schedule): ${stats.teamTwins}`);
console.log(`Scheduled deprecations skipped (2026-09-30 families): ${stats.scheduled}`);
console.log(`Org-scoped operations rebased onto the ${ORG_VAR} server template: ${stats.rebased}`);
console.log(`Wire-proven public reads: ${stats.publicReads}`);
console.log(`Total mapped: ${rows.filter((x) => x.service).length}, skipped: ${rows.filter((x) => x.skip_reason).length}`);
