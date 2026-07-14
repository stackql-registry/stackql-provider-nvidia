#!/usr/bin/env node

// Build the endpoint inventory across both spec sources into
// provider-dev/config/endpoint_inventory.csv. Every generator-relevant
// operation is classified by deterministic rules: host, org/team scoping,
// declared auth, wire-observed public reads, pagination idiom, response
// shape, invocation form, proposed service/resource/method/SQL verb, and a
// skip reason where applicable. The CSV is the single source of truth for
// the split rules (service_rules.mjs) and the mapping pass
// (map_operations.mjs). Fails without writing on any unclassified
// operation.
//
// Usage: node provider-dev/scripts/build_inventory.mjs

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const cleanedDir = path.join(repoRoot, 'provider-dev', 'downloaded', 'cleaned');
const outPath = path.join(repoRoot, 'provider-dev', 'config', 'endpoint_inventory.csv');

const HTTP_VERBS = ['get', 'post', 'put', 'patch', 'delete'];

const SOURCES = {
  'nvcf_openapi.json': 'nvcf',
  'ngc_kas.json': 'ngc-core',
  'ngc_models.json': 'ngc-core'
};

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

// Wire-proven unauthenticated reads (2026-07-14, see NOTES.md item 4).
// Keyed by `${file}::${path}::${verb}`; everything else is unprobed (blank)
// or observed auth-required ('n' entries below).
const OBSERVED_PUBLIC_READS = new Map([
  ['ngc_models.json::/v1/models::get', 'y'],
  ['ngc_models.json::/v1/models/{org-name}/{model-name}::get', 'y'],
  ['ngc_models.json::/v1/models/{org-name}/{model-name}/versions::get', 'y'],
  ['ngc_models.json::/v1/recipes::get', 'y'],
  ['ngc_models.json::/v1/resources::get', 'y'],
  ['ngc_models.json::/v1/collections::get', 'y'],
  ['ngc_models.json::/v1/gpus::get', 'y'],
  ['ngc_models.json::/v1/{artifact-type}::get', 'y'],
  ['ngc_models.json::/v1/csps::get', 'n'],
  ['ngc_kas.json::/v2/orgs::get', 'n'],
  ['ngc_kas.json::/v2/users/me::get', 'n'],
  ['nvcf_openapi.json::/v2/nvcf/functions::get', 'n'],
  ['nvcf_openapi.json::/v2/nvcf/clusterGroups::get', 'n']
]);

const TEAM_PARAM = /\{team-?name\}|\{teamName\}|\{team\}/i;

function pathParams(p) {
  return (p.match(/\{[^}]+\}/g) || []).map((s) => s.slice(1, -1));
}

// team-scoped twin: a team parameter used as a scope (resource segments
// continue after it). A path that terminates at the team itself (the teams
// resource, or a share-to-team grant target) is not a twin.
function isTeamScopedTwin(p) {
  const segs = p.split('/');
  for (let i = 0; i < segs.length; i++) {
    if (TEAM_PARAM.test(segs[i]) && !/\{target-team\}|\{artifact-team-name\}/.test(segs[i])) {
      if (i < segs.length - 1) return true;
    }
    // guest catalog team shape: /v1/models/{org-name}/{team-name}/{name}...
  }
  return false;
}

function isGuestTeamShape(p) {
  return /\{org-?name\}\/\{team-?name\}\//i.test(p) || /\{orgName\}\/\{teamName\}\//.test(p);
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

function responseShape(spec, op) {
  const resp = op.responses?.['200'] || op.responses?.['201'] || op.responses?.['202'];
  if (!resp) return { shape: 'none', objectKey: '' };
  const content = deref(spec, resp).content;
  const media = content?.['application/json'] || content?.['*/*'] || Object.values(content || {})[0];
  if (!media?.schema) return { shape: 'none', objectKey: '' };
  const schema = deref(spec, media.schema);
  if (schema.type === 'array' || (Array.isArray(schema.type) && schema.type.includes('array'))) {
    return { shape: 'array', objectKey: '' };
  }
  const props = schema.properties ? Object.keys(schema.properties) : [];
  const arrayProps = props.filter((k) => {
    const ps = deref(spec, schema.properties[k]);
    return ps.type === 'array' || (Array.isArray(ps.type) && ps.type.includes('array'));
  }).filter((k) => k !== 'requestStatus');
  return {
    shape: props.length ? `object{${props.slice(0, 6).join(';')}${props.length > 6 ? ';...' : ''}}` : 'object',
    objectKey: arrayProps.length === 1 ? `$.${arrayProps[0]}` : (arrayProps.length > 1 ? `$.${arrayProps[0]}?multi:${arrayProps.join('|')}` : '')
  };
}

function paginationParams(spec, op, pathItem) {
  const params = [...(pathItem.parameters || []), ...(op.parameters || [])].map((p) => deref(spec, p));
  return params
    .filter((p) => p.in === 'query' && /^(page|page-?size|pageSize|page-?number|cursor|offset|limit|next|token)$/i.test(p.name))
    .map((p) => p.name).join('+');
}

function authDeclared(spec, op) {
  const sec = op.security !== undefined ? op.security : spec.security;
  if (!sec || sec.length === 0) return 'none-declared';
  const names = sec.flatMap((s) => Object.keys(s));
  return names.join('+') || 'none-declared';
}

// ---------------------------------------------------------------------------
// classification rules per source
// ---------------------------------------------------------------------------

function classifyNvcf(p, verb, op) {
  const tag = (op.tags || [])[0] || '';
  if (p === '/health') return { skip: 'service-infra' };

  const T = {
    'Function Management': () => {
      if (p === '/v2/nvcf/functions' && verb === 'get') return r('nvcf_functions', 'functions', 'list', 'select');
      if (p === '/v2/nvcf/functions' && verb === 'post') return r('nvcf_functions', 'functions', 'create', 'insert');
      if (p === '/v2/nvcf/functions/ids') return r('nvcf_functions', 'function_ids', 'list', 'select', 'own resource: same empty path-param signature as functions.list');
      if (p === '/v2/nvcf/functions/{functionId}/versions' && verb === 'get') return r('nvcf_functions', 'function_versions', 'list', 'select');
      if (p === '/v2/nvcf/functions/{functionId}/versions' && verb === 'post') return r('nvcf_functions', 'function_versions', 'create', 'insert');
      if (p === '/v2/nvcf/functions/{functionId}/versions/{functionVersionId}') {
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
      if (p === '/v2/nvcf/deployments/{deploymentId}') return r('nvcf_deployments', 'deployments', 'get_by_id', 'select');
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
  res.host = NVCF_HOST_TAGS.has(tag) ? 'api.nvcf.nvidia.com' : 'api.ngc.nvidia.com';
  res.invocationForm = tag === 'Function Invocation' ? 'polling' : '';
  return res;
}

function classifyKas(p, verb, op) {
  if (/^\/(health|version|swagger-resources|public-keys)/.test(p)) return { skip: 'service-infra' };
  if (/^\/v[23]\/admin\//.test(p) || p === '/v2/admin' ) return { skip: 'internal-admin' };
  if (op.deprecated) return { skip: 'deprecated-inline' };
  if (isTeamScopedTwin(p)) return { skip: 'deprecated-team-scoped (NGC API deprecation schedule: team-scoped paths end 2026-09)' };

  if (p === '/roles') return r('orgs', 'roles', 'list', 'select');
  if (p === '/v2/orgs' && verb === 'get') return r('orgs', 'orgs', 'list', 'select');
  if (p === '/v2/orgs/{org-name}' && verb === 'get') return r('orgs', 'orgs', 'get', 'select');
  if (p === '/v2/orgs/{org-name}' && verb === 'patch') return r('orgs', 'orgs', 'update', 'update');
  if (p === '/v3/orgs' && verb === 'post') return r('orgs', 'orgs', 'create', 'insert');
  if (p === '/v3/orgs/proto-org') return r('orgs', 'proto_orgs', 'create', 'insert');
  if (p === '/v3/orgs/proto-org/validate') return r('orgs', 'proto_orgs', 'validate', 'select');

  if (p === '/v2/org/{org-name}/teams' && verb === 'get') return r('orgs', 'teams', 'list', 'select');
  if (p === '/v2/org/{org-name}/teams' && verb === 'post') return r('orgs', 'teams', 'create', 'insert');
  if (p === '/v2/org/{org-name}/teams/{team-name}') {
    if (verb === 'get') return r('orgs', 'teams', 'get', 'select');
    if (verb === 'patch') return r('orgs', 'teams', 'update', 'update');
    if (verb === 'delete') return r('orgs', 'teams', 'delete', 'delete');
  }

  if (p === '/v2/org/{org-name}/users' && verb === 'get') return r('orgs', 'users', 'list', 'select');
  if (p === '/v2/org/{org-name}/users' && verb === 'post') return r('orgs', 'users', 'create', 'insert');
  if (p === '/v2/org/{org-name}/users/{id}' && verb === 'get') return { skip: 'superseded-by-v3-twin (/v3/orgs/{org-name}/users/{user-email-or-id})' };
  if (p === '/v2/org/{org-name}/users/{id}' && verb === 'delete') return { skip: 'superseded-by-v3-twin (/v3/orgs/{org-name}/users/{id})' };
  if (p === '/v3/orgs/{org-name}/users/{user-email-or-id}' && verb === 'get') return r('orgs', 'users', 'get', 'select');
  if (p === '/v3/orgs/{org-name}/users/{id}' && verb === 'delete') return r('orgs', 'users', 'delete', 'delete');
  if (p === '/v2/org/{org-name}/starfleetIds/{starfleet-id}') return r('orgs', 'users', 'get_by_starfleet_id', 'select');
  if (p.endsWith('/add-role')) return r('orgs', 'user_roles', 'add', 'insert');
  if (p.endsWith('/remove-role')) return r('orgs', 'user_roles', 'remove', 'delete');
  if (p === '/v2/org/{org-name}/users/invitations') return r('orgs', 'user_invitations', 'list', 'select');
  if (p === '/v2/org/{org-name}/users/invitations/{id}' && verb === 'delete') return r('orgs', 'user_invitations', 'delete', 'delete');
  if (p.endsWith('/resend-invitation-email')) return r('orgs', 'user_invitations', 'resend_email', 'exec', 'non-idempotent GET (sends email) - action, not a read');
  if (p.endsWith('/users/nca-invitations')) return r('orgs', 'user_invitations', 'create_nca', 'insert');

  if (p === '/v2/users/me' && verb === 'get') return r('orgs', 'current_user', 'get', 'select');
  if (p === '/v2/users/me' && verb === 'patch') return r('orgs', 'current_user', 'update', 'update');
  if (p === '/v2/users/me/api-key') return r('orgs', 'current_user', 'create_api_key', 'exec', 'credential mint - action');

  return { error: `unclassified kas operation: ${verb} ${p}` };
}

function classifyModels(p, verb, op) {
  if (/^\/health/.test(p)) return { skip: 'service-infra' };
  if (op.deprecated) return { skip: 'deprecated-inline' };
  if (p === '/v1/malware-scan-notification') return { skip: 'inbound-webhook-not-client-api' };
  if (/\/files\/(multipart|clone|commit)|\/files\/\*\*|\/async-clone|\/zip(\/|$)|\{artifact-name\}\/files$|\{artifactName\}\/files$/.test(p) &&
      !/versions\/\{version-id\}\/files$|\{version\}\/files$/.test(p)) {
    return { skip: 'data-plane-file-transfer' };
  }
  if (isTeamScopedTwin(p) || isGuestTeamShape(p)) return { skip: 'deprecated-team-scoped (NGC API deprecation schedule: team-scoped paths end 2026-09)' };
  if (p.startsWith('/v1/deploy/')) return { skip: 'duplicate-endpoint-family (same operations as the /v1/csps/{artifact-type} family)' };

  // /v1/csps/{artifact-type}/org/... and /v1/{artifact-type}/org/... are
  // alternate path families for operations also present under
  // /v1/org/{org-name}/... - the org-scoped family is the one mapped
  if (p.startsWith('/v1/csps/{artifact-type}/org/')) return { skip: 'duplicate-endpoint-family (same operation under /v1/org/{org-name}/{artifact-type}/.../deployments)' };
  if (/^\/v1\/\{artifact-type\}\/org\//.test(p)) return { skip: 'duplicate-endpoint-family (same operation under /v1/org/{org-name}/{artifact-type}/{artifact-name}/collections)' };

  const org = p.includes('/org/{org') || /\/org\/\{orgName\}/.test(p);
  const svc = org ? 'registry' : 'catalog';

  // catalog (guest) families ------------------------------------------------
  if (!org) {
    if (p === '/v1/{artifact-type}') return r('catalog', 'artifacts', 'list', 'select');
    if (p === '/v1/{artifact-type}/{org-name}/{artifact-name}') return r('catalog', 'artifacts', 'get', 'select');
    if (/^\/v1\/\{artifact-type\}\/\{org-name\}\/\{artifact-name\}\/versions\/\{version-id\}\/files$/.test(p)) return r('catalog', 'artifact_files', 'list', 'select');
    if (p.endsWith('/signature')) return r('catalog', 'artifact_signatures', 'get', 'select');
    if (/^\/v1\/\{artifactType\}\/\{orgName\}\/\{artifactName\}\/spec$/.test(p)) return r('catalog', 'artifact_specs', 'get', 'select');
    if (/^\/v1\/\{artifact-type\}\/org\/\{org-name\}\/\{artifact-name\}\/collections$/.test(p)) return r('catalog', 'artifact_collections', 'list', 'select');
    if (p === '/v1/models') return r('catalog', 'models', 'list', 'select');
    if (p === '/v1/models/{org-name}/{model-name}') return r('catalog', 'models', 'get', 'select');
    if (p === '/v1/models/{org-name}/{model-name}/versions') return r('catalog', 'model_versions', 'list', 'select');
    if (p === '/v1/models/{org-name}/{model-name}/versions/{version-id}') return r('catalog', 'model_versions', 'get', 'select');
    if (p === '/v1/models/{org-name}/{model-name}/versions/{version-id}/files') return r('catalog', 'model_files', 'list', 'select');
    if (p === '/v1/recipes') return r('catalog', 'recipes', 'list', 'select');
    if (p === '/v1/recipes/{org-name}/{recipe-name}') return r('catalog', 'recipes', 'get', 'select');
    if (p === '/v1/recipes/{org-name}/{recipe-name}/versions') return r('catalog', 'recipe_versions', 'list', 'select');
    if (p === '/v1/recipes/{org-name}/{recipe-name}/versions/{version-id}') return r('catalog', 'recipe_versions', 'get', 'select');
    if (p === '/v1/recipes/{org-name}/{recipe-name}/versions/{version-id}/files') return r('catalog', 'recipe_files', 'list', 'select');
    if (p === '/v1/resources') return r('catalog', 'resources', 'list', 'select');
    if (p === '/v1/resources/{org-name}/{recipe-name}') return r('catalog', 'resources', 'get', 'select');
    if (p === '/v1/resources/{org-name}/{recipe-name}/versions') return r('catalog', 'resource_versions', 'list', 'select');
    if (p === '/v1/resources/{org-name}/{recipe-name}/versions/{version-id}') return r('catalog', 'resource_versions', 'get', 'select');
    if (p === '/v1/resources/{org-name}/{recipe-name}/versions/{version-id}/files') return r('catalog', 'resource_files', 'list', 'select');
    if (p === '/v1/helm-charts/{org-name}/{artifact-name}/versions') return r('catalog', 'helm_chart_versions', 'list', 'select');
    if (p === '/v1/helm-charts/{org-name}/{artifact-name}/versions/{version-id}') return r('catalog', 'helm_chart_versions', 'get', 'select');
    if (p === '/v1/collections') return r('catalog', 'collections', 'list', 'select');
    if (p === '/v1/collections/{org-name}/{collection-name}') return r('catalog', 'collections', 'get', 'select');
    if (/^\/v1\/collections\/\{org-name\}\/\{collection-name\}\/artifacts\/\{artifact-type\}$/.test(p)) return r('catalog', 'collection_artifacts', 'list', 'select');
    if (p === '/v1/gpus') return r('catalog', 'gpus', 'list', 'select');
    if (p.startsWith('/v1/gpus/pci-device-id')) {
      const m = p.includes('pci-subsystem-device-id') ? '_by_vendor_subsystem'
        : (p.includes('pci-vendor-id') ? '_by_vendor' : '');
      if (verb === 'get') return r('catalog', 'gpus', `get${m}`, 'select');
      if (verb === 'post') return r('catalog', 'gpus', `create${m}`, 'insert', 'publisher-privileged write, mapped as documented');
      if (verb === 'patch') return r('catalog', 'gpus', `update${m}`, 'update', 'publisher-privileged write');
      if (verb === 'delete') return r('catalog', 'gpus', `delete${m}`, 'delete', 'publisher-privileged write');
    }
    if (p === '/v1/csps' && verb === 'get') return r('catalog', 'csps', 'list', 'select');
    if (p === '/v1/csps' && verb === 'post') return r('catalog', 'csps', 'create', 'insert', 'publisher-privileged write');
    if (p === '/v1/csps/{csp-name}') {
      if (verb === 'get') return r('catalog', 'csps', 'get', 'select');
      if (verb === 'patch') return r('catalog', 'csps', 'update', 'update', 'publisher-privileged write');
      if (verb === 'delete') return r('catalog', 'csps', 'delete', 'delete', 'publisher-privileged write');
    }
    if (p.startsWith('/v1/csps/{csp-name}/deployments/params')) {
      const meta = p.endsWith('/meta') ? '_meta' : '';
      if (verb === 'get') return r('catalog', `csp_deployment_params${meta}`, 'get', 'select');
      if (verb === 'post') return r('catalog', `csp_deployment_params${meta}`, 'create', 'insert');
      if (verb === 'patch') return r('catalog', `csp_deployment_params${meta}`, 'update', 'update');
      if (verb === 'delete') return r('catalog', `csp_deployment_params${meta}`, 'delete', 'delete');
    }
    if (p.startsWith('/v1/csps/{artifact-type}/') && p.endsWith('/params')) {
      const byCsp = p.includes('{csp-name}');
      return r('catalog', 'artifact_deployment_params', byCsp ? 'get' : 'list', 'select');
    }
    if (p.startsWith('/v1/csps/{artifact-type}/org/')) {
      return r('catalog', 'artifact_deployments', p.includes('/files/') ? 'create_for_file' : 'create', 'insert', 'launches a CSP deployment for an artifact version');
    }
    return { error: `unclassified catalog operation: ${verb} ${p}` };
  }

  // registry (org-scoped) families -------------------------------------------
  const generic = /\{artifact-?type\}/i.test(p);
  if (p === '/v1/artifact-registry/org/{org-name}/encryption-keys') return r('registry', 'encryption_keys', 'list', 'select');
  if (p === '/v1/artifact-registry/org/{org-name}/encryption-keys/{key-id}') {
    if (verb === 'get') return r('registry', 'encryption_keys', 'get', 'select');
    if (verb === 'delete') return r('registry', 'encryption_keys', 'delete', 'delete');
  }
  if (p === '/v1/artifact-registry/org/{org}/workflows/{workflowId}') return r('registry', 'workflows', 'get', 'select');

  if (p === '/v1/org/{org-name}/collections' && verb === 'get') return r('registry', 'collections', 'list', 'select');
  if (p === '/v1/org/{org-name}/collections' && verb === 'post') return r('registry', 'collections', 'create', 'insert');
  if (p === '/v1/org/{org-name}/collections/{collection-name}') {
    if (verb === 'get') return r('registry', 'collections', 'get', 'select');
    if (verb === 'patch') return r('registry', 'collections', 'update', 'update');
    if (verb === 'delete') return r('registry', 'collections', 'delete', 'delete');
  }
  if (p.startsWith('/v1/org/{org-name}/collections/{collection-name}')) {
    if (p.includes('/share')) {
      // /share is the legacy org-wide share (its PUT is deprecated inline);
      // product shares get their own resource - same path-param signature
      // as the org-wide share otherwise
      if (p.endsWith('/share') && verb === 'delete') return { skip: 'legacy-twin (PUT counterpart deprecated inline; superseded by /shares/org)' };
      if (p.endsWith('/share/product')) {
        if (verb === 'put') return r('registry', 'collection_product_shares', 'add', 'insert', 'grants-as-data');
        if (verb === 'delete') return r('registry', 'collection_product_shares', 'remove', 'delete', 'grants-as-data');
      }
      const target = p.includes('/shares/org') ? '_org' : '_team';
      if (verb === 'put') return r('registry', 'collection_shares', `add${target}`, 'insert', 'grants-as-data');
      if (verb === 'delete') return r('registry', 'collection_shares', `remove${target}`, 'delete', 'grants-as-data');
    }
    if (/\/artifacts\/\{artifact-type\}$/.test(p)) return r('registry', 'collection_artifacts', 'list', 'select');
    if (/\/artifacts$/.test(p) && verb === 'patch') return r('registry', 'collection_artifacts', 'update_bulk', 'update', 'bulk membership update');
    if (p.includes('/artifacts/org/')) {
      if (p.includes('/team/{artifact-team-name}/')) return { skip: 'deprecated-team-scoped (references a team-scoped artifact; NGC API deprecation schedule: team-scoped paths end 2026-09)' };
      if (verb === 'put') return r('registry', 'collection_artifacts', 'add_cross_org', 'insert', 'grants-as-data membership');
      if (verb === 'delete') return r('registry', 'collection_artifacts', 'remove_cross_org', 'delete');
    }
    if (/\{artifact-type\}\/\{artifact-name\}$/.test(p)) {
      if (verb === 'put') return r('registry', 'collection_artifacts', 'add', 'insert', 'grants-as-data membership');
      if (verb === 'delete') return r('registry', 'collection_artifacts', 'remove', 'delete');
    }
  }

  if (p === '/v1/org/{org-name}/models' && verb === 'get') return r('registry', 'models', 'list', 'select');
  if (p === '/v1/org/{org-name}/models' && verb === 'post') return r('registry', 'models', 'create', 'insert');
  if (p === '/v1/org/{org-name}/models/{model-name}') {
    if (verb === 'get') return r('registry', 'models', 'get', 'select');
    if (verb === 'patch') return r('registry', 'models', 'update', 'update');
  }
  if (p === '/v1/org/{org-name}/models/{model-name}/encryption-key') return r('registry', 'model_encryption_keys', 'delete', 'delete');
  if (p.includes('/models/{model-name}/shares/')) {
    const target = p.endsWith('/shares/org') ? '_org' : '_team';
    if (verb === 'put') return r('registry', 'model_shares', `add${target}`, 'insert', 'grants-as-data');
    if (verb === 'delete') return r('registry', 'model_shares', `remove${target}`, 'delete', 'grants-as-data');
  }
  if (p === '/v1/org/{org-name}/models/{model-name}/versions' && verb === 'get') return r('registry', 'model_versions', 'list', 'select');
  if (p === '/v1/org/{org-name}/models/{model-name}/versions' && verb === 'post') return r('registry', 'model_versions', 'create', 'insert');
  if (p === '/v1/org/{org-name}/models/{model-name}/versions/{version-id}') {
    if (verb === 'get') return r('registry', 'model_versions', 'get', 'select');
    if (verb === 'patch') return r('registry', 'model_versions', 'update', 'update');
  }
  if (p === '/v1/org/{org-name}/models/{model-name}/versions/{version-id}/files') return r('registry', 'model_files', 'list', 'select');
  if (p === '/v1/org/{org-name}/models/{artifact-name}/versions/{version-id}/stash') return r('registry', 'model_versions', 'stash', 'exec', 'action on a version');

  for (const [seg, resBase] of [['recipes', 'recipe'], ['resources', 'resource']]) {
    const base = `/v1/org/{org-name}/${seg}`;
    if (p === base && verb === 'get') return r('registry', `${resBase}s`, 'list', 'select');
    if (p === base && verb === 'post') return r('registry', `${resBase}s`, 'create', 'insert');
    if (p === `${base}/{recipe-name}`) {
      if (verb === 'get') return r('registry', `${resBase}s`, 'get', 'select');
      if (verb === 'patch') return r('registry', `${resBase}s`, 'update', 'update');
    }
    if (p === `${base}/{recipe-name}/versions` && verb === 'get') return r('registry', `${resBase}_versions`, 'list', 'select');
    if (p === `${base}/{recipe-name}/versions` && verb === 'post') return r('registry', `${resBase}_versions`, 'create', 'insert');
    if (p === `${base}/{recipe-name}/versions/{version-id}`) {
      if (verb === 'get') return r('registry', `${resBase}_versions`, 'get', 'select');
      if (verb === 'patch') return r('registry', `${resBase}_versions`, 'update', 'update');
    }
    if (p === `${base}/{recipe-name}/versions/{version-id}/files`) return r('registry', `${resBase}_files`, 'list', 'select');
  }

  if (p === '/v1/org/{org-name}/helm-charts/{artifact-name}/versions') return r('registry', 'helm_chart_versions', 'list', 'select');
  if (p === '/v1/org/{org-name}/helm-charts/{artifact-name}/versions/{version-id}') {
    if (verb === 'get') return r('registry', 'helm_chart_versions', 'get', 'select');
    if (verb === 'patch') return r('registry', 'helm_chart_versions', 'update', 'update');
  }

  if (p.includes('/repositories/{container-name}/tags/')) return r('registry', 'repository_associated_models', 'list_by_tag', 'select');
  if (p.includes('/repositories/{container-name}/associated-models')) return r('registry', 'repository_associated_models', 'list', 'select');

  if (generic) {
    if (p === '/v1/org/{org-name}/{artifact-type}' && verb === 'get') return r('registry', 'artifacts', 'list', 'select');
    if (p === '/v1/org/{org-name}/{artifact-type}' && verb === 'post') return r('registry', 'artifacts', 'create', 'insert');
    if (p === '/v1/org/{org-name}/{artifact-type}/{artifact-name}') {
      if (verb === 'get') return r('registry', 'artifacts', 'get', 'select');
      if (verb === 'patch') return r('registry', 'artifacts', 'update', 'update');
      if (verb === 'put') return r('registry', 'artifacts', 'replace', 'replace', 'PUT with a PATCH twin - proposed replace, semantics unverified (keycloak rule)');
      if (verb === 'delete') return r('registry', 'artifacts', 'delete', 'delete');
    }
    if (p.endsWith('/catalog/flags')) return r('registry', 'artifact_catalog_flags', 'get', 'select');
    if (p.endsWith('/{artifact-name}/collections')) return r('registry', 'artifact_collections', 'list', 'select');
    if (p.endsWith('/sync-release-type-labels')) return r('registry', 'artifacts', 'sync_release_type_labels', 'exec', 'action');
    if (p.endsWith('/deployments/params') && verb === 'get') return r('registry', 'artifact_deployment_params', 'list', 'select');
    if (p.includes('/deployments/{csp-name}/params')) {
      if (verb === 'get') return r('registry', 'artifact_deployment_params', 'get', 'select');
      if (verb === 'post') return r('registry', 'artifact_deployment_params', 'create', 'insert');
      if (verb === 'patch') return r('registry', 'artifact_deployment_params', 'update', 'update');
      if (verb === 'delete') return r('registry', 'artifact_deployment_params', 'delete', 'delete');
    }
    if (p.endsWith('/license/acceptance')) {
      if (verb === 'get') return r('registry', 'license_acceptances', 'get', 'select');
      if (verb === 'post') return r('registry', 'license_acceptances', 'create', 'insert');
    }
    if (p.endsWith('/release-type')) return r('registry', 'artifacts', 'set_release_type', 'exec', 'single-field action endpoint');
    if (p.endsWith('/terms-of-service')) return r('registry', 'artifacts', 'set_terms_of_service', 'exec', 'single-field action endpoint');
    if (p.endsWith('/share/product')) {
      // own resource: same path-param signature as artifact_shares
      if (verb === 'put') return r('registry', 'artifact_product_shares', 'add', 'insert', 'grants-as-data');
      if (verb === 'delete') return r('registry', 'artifact_product_shares', 'remove', 'delete');
    }
    if (p.endsWith('/share')) {
      if (verb === 'put') return r('registry', 'artifact_shares', 'add', 'insert', 'grants-as-data');
      if (verb === 'delete') return r('registry', 'artifact_shares', 'remove', 'delete');
    }
    if (/\/versions\/\{version-id\}$/.test(p) && verb === 'delete') return r('registry', 'artifact_versions', 'delete', 'delete');
    if (p.endsWith('/versions/{version-id}/configs')) return r('registry', 'artifact_version_configs', 'update', 'update');
    if (p.includes('/versions/{version-id}/deployments/')) return r('registry', 'artifact_deployments', 'create', 'insert', 'launches a CSP deployment');
    if (/\/versions\/\{version-id\}\/files$/.test(p)) return r('registry', 'artifact_files', 'list', 'select');
    if (p.endsWith('/versions/{version-id}/signature') && verb === 'get') return r('registry', 'artifact_signatures', 'get', 'select');
    if (p.endsWith('/versions/{version-id}/signature') && verb === 'put') return r('registry', 'artifact_signatures', 'set', 'exec', 'write of a computed signature - action');
    if (p.endsWith('/malware-scan')) return r('registry', 'artifacts', 'malware_scan', 'exec', 'action');
    if (p.endsWith('/purge')) return r('registry', 'artifacts', 'purge', 'exec', 'kept off DELETE: same path-param signature as artifacts.delete');
    if (/\{artifactType\}\/\{artifactName\}\/spec$/.test(p)) {
      if (verb === 'get') return r('registry', 'artifact_specs', 'get', 'select');
      if (verb === 'put') return r('registry', 'artifact_specs', 'update', 'update', 'PUT semantics unverified');
      if (verb === 'delete') return r('registry', 'artifact_specs', 'delete', 'delete');
    }
    if (/\{artifactType\}\/spec$/.test(p) && verb === 'post') return r('registry', 'artifact_specs', 'create', 'insert');
  }

  // generic {type} file listings (duplicates of the /versions/{version-id}/files listings)
  if (/^\/v1\/org\/\{org\}\/\{type\}\/\{name\}\/\{version\}\/files$/.test(p)) return { skip: 'duplicate-endpoint-family (same listing as /versions/{version-id}/files)' };
  if (/^\/v1\/\{type\}\/org\/\{org\}\/\{name\}\/\{version\}\/files$/.test(p)) return { skip: 'duplicate-endpoint-family (typed/guest file listing twins)' };

  return { error: `unclassified registry operation: ${verb} ${p}` };
}

function r(service, resource, method, sqlVerb, note = '') {
  return { service, resource, method, sqlVerb, note };
}

// ---------------------------------------------------------------------------
// main
// ---------------------------------------------------------------------------

const rows = [];
const errors = [];
const stats = { bySource: {}, byService: {}, byVerb: {}, skips: {}, deprecatedTwins: 0, publicReads: 0 };

for (const [file, source] of Object.entries(SOURCES)) {
  const abs = path.join(cleanedDir, file);
  if (!fs.existsSync(abs)) {
    console.error(`Error: ${abs} not found - run fetch-specs + clean-specs first`);
    process.exit(1);
  }
  const spec = JSON.parse(fs.readFileSync(abs, 'utf8'));

  for (const [pathKey, pathItem] of Object.entries(spec.paths || {})) {
    for (const verb of HTTP_VERBS) {
      const op = pathItem[verb];
      if (!op) continue;

      let c;
      if (file === 'nvcf_openapi.json') c = classifyNvcf(pathKey, verb, op);
      else if (file === 'ngc_kas.json') c = classifyKas(pathKey, verb, op);
      else c = classifyModels(pathKey, verb, op);

      if (c.error) { errors.push(c.error); continue; }

      const host = c.host || 'api.ngc.nvidia.com';
      const { shape, objectKey } = responseShape(spec, op);
      const orgScoped = /\{org-?name\}|\{orgName\}|\{org\}/.test(pathKey) ? 'y' : 'n';
      const teamScoped = (isTeamScopedTwin(pathKey) || isGuestTeamShape(pathKey)) ? 'y' : 'n';
      const observed = OBSERVED_PUBLIC_READS.get(`${file}::${pathKey}::${verb}`) || '';

      const row = {
        source, file, host, verb, path: pathKey,
        operation_id: op.operationId || '',
        tags: (op.tags || []).join('|'),
        org_scoped: orgScoped,
        team_scoped: teamScoped,
        deprecated: op.deprecated ? 'y' : (teamScoped === 'y' ? 'y (schedule 2026-09)' : 'n'),
        auth_declared: authDeclared(spec, op),
        observed_public_read: observed,
        pagination_params: paginationParams(spec, op, pathItem),
        has_request_body: op.requestBody ? 'y' : 'n',
        response_shape: shape,
        object_key_candidate: objectKey,
        invocation_form: c.invocationForm || '',
        service: c.skip ? '' : c.service,
        resource: c.skip ? '' : c.resource,
        method: c.skip ? '' : c.method,
        sql_verb: c.skip ? '' : c.sqlVerb,
        skip_reason: c.skip || '',
        notes: c.note || ''
      };
      rows.push(row);

      stats.bySource[source] = (stats.bySource[source] || 0) + 1;
      if (c.skip) {
        const key = c.skip.split(' ')[0];
        stats.skips[key] = (stats.skips[key] || 0) + 1;
        if (c.skip.startsWith('deprecated-team-scoped')) stats.deprecatedTwins++;
      } else {
        stats.byService[c.service] = (stats.byService[c.service] || 0) + 1;
        stats.byVerb[c.sqlVerb] = (stats.byVerb[c.sqlVerb] || 0) + 1;
      }
      if (observed === 'y') stats.publicReads++;
    }
  }
}

if (errors.length > 0) {
  console.error(`Inventory FAILED with ${errors.length} unclassified operation(s) - nothing written:`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}

// method uniqueness per (service, resource)
const seen = new Map();
for (const row of rows) {
  if (!row.service) continue;
  const key = `${row.service}.${row.resource}.${row.method}`;
  if (seen.has(key)) {
    errors.push(`duplicate method ${key}: ${seen.get(key)} and ${row.verb} ${row.path}`);
  }
  seen.set(key, `${row.verb} ${row.path}`);
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
console.log(`Deprecated team-scoped twins: ${stats.deprecatedTwins}`);
console.log(`Wire-proven public reads: ${stats.publicReads}`);
console.log(`Total mapped: ${rows.filter((x) => x.service).length}, skipped: ${rows.filter((x) => x.skip_reason).length}`);
