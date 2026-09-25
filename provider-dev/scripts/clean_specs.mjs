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
// Rules (in order):
//   stamp-missing-version-field   info.version absent -> 0.0.0
//   repair-relative-server        relative/absent servers -> the public gateway
//   gateway-v2-path-prefix        ngc_models: /v1/... -> /v2/... on api.ngc.nvidia.com
//                                 (the public gateway serves the models
//                                 definition under /v2 - NOTES.md item 5)
//   snake-case-path-params        every {path-param} / {pathParam} token and
//                                 its parameter name -> snake_case, in every
//                                 source (the provider's user surface is
//                                 snake_case; provider-utils split converts
//                                 only the first hyphen per token)
//   repair-path-param-names       ngc_kas declares some path parameters with
//                                 a prose `name` ("user id or b64encoded
//                                 email") that does not match the template
//                                 token ({id}); rename to the token
//   drop-prose-query-params       ngc_kas declares query parameters whose
//                                 names are sentences ("Filter using org
//                                 name"); the wire names are unknown, so they
//                                 are dropped rather than exposed as
//                                 unusable columns
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

const HTTP_VERBS = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options', 'trace'];

// server assignment for definitions that declare no absolute server; the
// value is the public gateway the definition is served from
const SERVER_BY_SOURCE = {
  'ngc_kas.json': 'https://api.ngc.nvidia.com'
};

// the public gateway host + path prefix rewrite for definitions harvested
// from an internal host (NOTES.md item 5: models.ngc.nvidia.com/v1/... is
// served publicly as api.ngc.nvidia.com/v2/...)
const GATEWAY_REWRITE = {
  'ngc_models.json': { server: 'https://api.ngc.nvidia.com', from: '/v1/', to: '/v2/' }
};

export function snakeCase(name) {
  return String(name)
    .replace(/([a-z0-9])([A-Z][a-z]+)/g, '$1_$2')
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .toLowerCase()
    .replace(/[-. ]+/g, '_');
}

const pathTokens = (p) => (p.match(/\{[^}]+\}/g) || []).map((s) => s.slice(1, -1));

function forEachOperation(spec, fn) {
  for (const [pathKey, pathItem] of Object.entries(spec.paths || {})) {
    for (const verb of HTTP_VERBS) {
      if (pathItem[verb]) fn(pathKey, pathItem, verb, pathItem[verb]);
    }
  }
}

// ---------------------------------------------------------------------------
// Response injection for the models definition (rule inject-sdk-responses).
// The harvested definition declares no 2xx response on most operations; the
// ngcsdk data classes (provider-dev/downloaded/ngc_sdk_schemas.json, from
// harvest_ngc_sdk_schemas.mjs) supply the response shapes. The class for an
// operation is decided by its operationId (suffixes InOrg / InTeam /
// AsGuest / FromAnotherOrg / _N stripped), per the table below - the same
// wrappers registry/api/*.py in the SDK applies to those endpoints. Any
// operation not in the table receives the bare `Response` envelope
// (requestStatus only); build_inventory.mjs rejects a SELECT method left
// on that envelope, so a new read endpoint must be added here deliberately.
// ---------------------------------------------------------------------------

const SDK_SCHEMAS_PATH = path.join(downloadDir, 'ngc_sdk_schemas.json');
const SDK_RESPONSE_FILE = 'ngc_models.json';

const SDK_RESPONSE_CLASSES = {
  // models
  listModels: 'ModelListResponse', listPublicModels: 'ModelListResponse',
  listModelVersions: 'ModelVersionListResponse', listModelVersionsAssociatedByContainer: 'ModelVersionListResponse',
  listModelVersionsAssociatedByContainerTag: 'ModelVersionListResponse',
  listModeFiles: 'ModelVersionFileListResponse', listModelFiles: 'ModelVersionFileListResponse',
  getModel: 'ModelResponse', createModel: 'ModelCreateResponse', updateModel: 'ModelResponse',
  getModelVersion: 'ModelVersionResponse', createModelVersion: 'ModelVersionCreateResponse', updateModelVersion: 'ModelVersionResponse',
  // recipes and resources (the resources family reuses the recipe wrappers in the SDK)
  listRecipes: 'RecipeListResponse', listPublicRecipes: 'RecipeListResponse',
  getRecipe: 'RecipeResponse', createRecipe: 'RecipeResponse', updateRecipe: 'RecipeResponse',
  listRecipeVersions: 'RecipeVersionListResponse',
  getRecipeVersion: 'RecipeVersionResponse', createRecipeVersion: 'RecipeVersionResponse', updateRecipeVersion: 'RecipeVersionResponse',
  listRecipeFiles: 'RecipeVersionFileListResponse',
  // generic artifacts (containers, helm charts, ... by {artifact_type})
  listArtifacts: 'ArtifactListResponse', listPublicArtifacts: 'ArtifactListResponse', listCollectionArtifacts: 'ArtifactListResponse',
  getArtifact: 'ArtifactResponse', getChart: 'ArtifactResponse', createArtifact: 'ArtifactResponse', updateArtifact: 'ArtifactResponse', replaceArtifact: 'ArtifactResponse',
  listArtifactFiles: 'ArtifactVersionFileListResponse',
  listHelmChartVersions: 'ArtifactVersionListResponse', getHelmChartVersion: 'ArtifactVersionResponse', updateHelmChartVersion: 'ArtifactVersionResponse',
  getPublicFlags: 'ArtifactCatalogFlags',
  getOrgArtifactLicenseAcceptance: 'ConfiguredLicenseTerms',
  // collections
  listCollections: 'CollectionListResponse', listPublicCollections: 'CollectionListResponse', listArtifactCollections: 'CollectionListResponse',
  getCollection: 'CollectionResponse', createCollection: 'CollectionResponse', updateCollection: 'CollectionResponse', patchCollection: 'CollectionResponse',
  // cloud service providers and deployment parameters
  listCloudServiceProviders: 'CloudServiceProviderListResponse',
  getCloudServiceProviderDetails: 'CloudServiceProvider', createCloudServiceProvider: 'CloudServiceProvider', updateCloudServiceProvider: 'CloudServiceProvider',
  getCloudServiceProviderDeploymentParametersDetails: 'DeploymentParametersListResponse',
  createCloudServiceProviderDeploymentParameters: 'DeploymentParametersListResponse', updateCloudServiceProviderDeploymentParameters: 'DeploymentParametersListResponse',
  getCloudServiceProviderDeploymentParametersMetaDetails: 'DeploymentParametersMetaListResponse',
  createCloudServiceProviderDeploymentParametersMeta: 'DeploymentParametersMetaListResponse', updateCloudServiceProviderDeploymentParametersMeta: 'DeploymentParametersMetaListResponse',
  listArtifactDeploymentParameters: 'DeploymentParametersListResponse', listPublicArtifactDeploymentParameters: 'DeploymentParametersListResponse',
  getArtifactDeploymentParameters: 'DeploymentParametersListResponse', getPublicArtifactDeploymentParameters: 'DeploymentParametersListResponse',
  createArtifactDeploymentParameters: 'DeploymentParametersListResponse', updateArtifactDeploymentParameters: 'DeploymentParametersListResponse',
  createArtifactDeploymentUrl: 'DeploymentUrlResponse', createPublicArtifactDeploymentUrl: 'DeploymentUrlResponse',
  // GPU catalog (the collection read is a bare array, wire-proven 2026-07-14)
  getGpus: '[]GpuByPciResponse',
  getGpuByPciDeviceId: 'GpuByPciResponse', getGpuByPciDeviceIdVendorId: 'GpuByPciResponse', getGpuByPciDeviceIdVendorIdSubsystemDeviceId: 'GpuByPciResponse',
  createGpuByPciDeviceId: 'GpuByPciResponse', createGpuByPciFullKey: 'GpuByPciResponse', updateGpuByPciDeviceId: 'GpuByPciResponse', updateGpuByPciFullKey: 'GpuByPciResponse',
  // encryption keys and workflows
  listKeys: 'KeyListResponse', listArtifactsForKey: 'KeyArtifactListResponse',
  getWorkflowStatus: 'WorkflowStatusResponse',
  // health
  status: 'HealthResponse', statusDetails: 'HealthResponse'
};

function sdkResponseClass(operationId) {
  const base = String(operationId || '').replace(/(InOrg|InTeam|ForTeam|AsGuest|FromAnotherOrg|_\d+)+$/, '');
  return SDK_RESPONSE_CLASSES[base] || 'Response';
}

// ---------------------------------------------------------------------------
// Repair rules. Each rule: { name, applies(file, spec), fix(spec, file) -> note }.
// A rule that applies must return a human-readable note of what it changed.
// ---------------------------------------------------------------------------

const RULES = [
  {
    name: 'inject-sdk-responses',
    applies: (file) => file === SDK_RESPONSE_FILE,
    fix: (spec) => {
      if (!fs.existsSync(SDK_SCHEMAS_PATH)) throw new Error(`${SDK_SCHEMAS_PATH} not found - run harvest_ngc_sdk_schemas.mjs first`);
      const sdk = JSON.parse(fs.readFileSync(SDK_SCHEMAS_PATH, 'utf8'));
      spec.components = spec.components || {};
      spec.components.schemas = spec.components.schemas || {};
      let added = 0;
      for (const [name, schema] of Object.entries(sdk.schemas)) {
        if (spec.components.schemas[name]) continue; // the definition's own schema wins
        spec.components.schemas[name] = schema;
        added++;
      }
      const counts = {};
      let injected = 0, generic = 0, untyped = 0;
      // a 2xx whose schema resolves to nothing projectable (no properties,
      // no items, not a scalar or array) is as good as absent
      const resolve = (s) => {
        let cur = s;
        for (let i = 0; i < 10 && cur && cur.$ref; i++) cur = spec.components.schemas[cur.$ref.split('/').pop()];
        return cur;
      };
      const projectable = (op) => {
        const codes = Object.keys(op.responses || {}).filter((c) => c.startsWith('2')).sort();
        if (codes.length === 0) return false;
        const content = op.responses[codes[0]].content || {};
        const media = content['application/json'] || Object.values(content)[0];
        if (!media) return codes.length > 0 && Object.keys(content).length > 0; // non-json content is left alone
        const s = resolve(media.schema);
        if (!s) return false;
        if (s.properties || s.items || ['array', 'string', 'integer', 'number', 'boolean'].includes(s.type)) return true;
        return false;
      };
      forEachOperation(spec, (pathKey, item, verb, op) => {
        if (!HTTP_VERBS.slice(0, 5).includes(verb)) return;
        op.responses = op.responses || {};
        const had2xx = Object.keys(op.responses).some((c) => c.startsWith('2'));
        if (had2xx && projectable(op)) return;
        if (had2xx) {
          untyped++;
          for (const c of Object.keys(op.responses)) if (c.startsWith('2')) delete op.responses[c];
        }
        let cls = sdkResponseClass(op.operationId);
        let schema;
        if (cls.startsWith('[]')) {
          cls = cls.slice(2);
          schema = { type: 'array', items: { $ref: `#/components/schemas/${cls}` } };
        } else {
          schema = { $ref: `#/components/schemas/${cls}` };
        }
        if (!spec.components.schemas[cls]) throw new Error(`response class ${cls} for ${op.operationId} is not in the definition or the SDK harvest`);
        op.responses['200'] = {
          description: `OK (response schema from the ngcsdk ${sdk.version} data class ${cls})`,
          content: { 'application/json': { schema } }
        };
        counts[cls] = (counts[cls] || 0) + 1;
        injected++;
        if (cls === 'Response') generic++;
      });
      const top = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([k, v]) => `${k} x${v}`).join(', ');
      return `${added} SDK data classes added to components.schemas (ngcsdk ${sdk.version}); 200 responses injected on ${injected} response-less operations (${untyped} of them declared an untyped 2xx; ${generic} on the bare Response envelope): ${top}`;
    }
  },
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
  },
  {
    name: 'gateway-v2-path-prefix',
    applies: (file) => !!GATEWAY_REWRITE[file],
    fix: (spec, file) => {
      const { server, from, to } = GATEWAY_REWRITE[file];
      const before = JSON.stringify(spec.servers || []);
      const newPaths = {};
      let rewritten = 0;
      for (const [pathKey, item] of Object.entries(spec.paths || {})) {
        const newKey = pathKey.startsWith(from) ? to + pathKey.slice(from.length) : pathKey;
        if (newKey !== pathKey) rewritten++;
        if (newKey in newPaths) throw new Error(`gateway rewrite collision: ${pathKey} -> ${newKey}`);
        newPaths[newKey] = item;
      }
      spec.paths = newPaths;
      spec.servers = [{ url: server }];
      return `${rewritten} path(s) rewritten ${from} -> ${to}; servers ${before} -> ${server} (the public gateway serving the definition)`;
    }
  },
  {
    name: 'snake-case-path-params',
    applies: (file, spec) => Object.keys(spec.paths || {}).some((p) => pathTokens(p).some((t) => snakeCase(t) !== t)),
    fix: (spec) => {
      const newPaths = {};
      let keys = 0, params = 0;
      const renameParams = (list) => {
        for (const prm of list || []) {
          if (prm && prm.in === 'path' && prm.name && snakeCase(prm.name) !== prm.name) {
            prm.name = snakeCase(prm.name);
            params++;
          }
        }
      };
      for (const [pathKey, item] of Object.entries(spec.paths || {})) {
        const newKey = pathKey.replace(/\{([^}]+)\}/g, (m, t) => `{${snakeCase(t)}}`);
        if (newKey !== pathKey) keys++;
        if (newKey in newPaths) throw new Error(`snake-case collision: ${pathKey} -> ${newKey}`);
        newPaths[newKey] = item;
        renameParams(item.parameters);
        for (const verb of HTTP_VERBS) if (item[verb]) renameParams(item[verb].parameters);
      }
      spec.paths = newPaths;
      for (const prm of Object.values(spec.components?.parameters || {})) renameParams([prm]);
      return `${keys} path key(s) and ${params} path parameter name(s) converted to snake_case`;
    }
  },
  {
    name: 'repair-path-param-names',
    applies: (file, spec) => {
      let found = false;
      forEachOperation(spec, (pathKey, item, verb, op) => {
        const tokens = pathTokens(pathKey);
        for (const prm of [...(item.parameters || []), ...(op.parameters || [])]) {
          if (prm && prm.in === 'path' && prm.name && !tokens.includes(prm.name)) found = true;
        }
      });
      return found;
    },
    fix: (spec) => {
      const notes = [];
      let renamed = 0, dropped = 0;
      const repair = (pathKey, owner) => {
        const list = owner.parameters;
        if (!list) return;
        const tokens = pathTokens(pathKey);
        const declared = list.filter((p) => p && p.in === 'path').map((p) => p.name);
        const keep = [];
        for (const prm of list) {
          if (!prm || prm.in !== 'path' || tokens.includes(prm.name)) { keep.push(prm); continue; }
          const unmatched = tokens.filter((t) => !declared.includes(t));
          if (unmatched.length === 0) {
            // a stray path parameter with no template token at all
            notes.push(`${pathKey}: "${prm.name}" dropped (no template token)`);
            dropped++;
            continue;
          }
          if (unmatched.length > 1) {
            throw new Error(`cannot repair path parameter "${prm.name}" on ${pathKey}: ${unmatched.length} unmatched template tokens`);
          }
          notes.push(`${pathKey}: "${prm.name}" -> ${unmatched[0]}`);
          declared.push(unmatched[0]);
          prm.name = unmatched[0];
          renamed++;
          keep.push(prm);
        }
        owner.parameters = keep;
      };
      for (const [pathKey, item] of Object.entries(spec.paths || {})) {
        repair(pathKey, item);
        for (const verb of HTTP_VERBS) if (item[verb]) repair(pathKey, item[verb]);
      }
      const distinct = [...new Set(notes)];
      return `${renamed} path parameter name(s) renamed to their template token, ${dropped} stray path parameter(s) dropped (${distinct.slice(0, 4).join('; ')}${distinct.length > 4 ? `; +${distinct.length - 4} more` : ''})`;
    }
  },
  {
    name: 'drop-cookie-params',
    applies: (file, spec) => {
      let found = false;
      forEachOperation(spec, (pathKey, item, verb, op) => {
        for (const prm of [...(item.parameters || []), ...(op.parameters || [])]) {
          if (prm && prm.in === 'cookie') found = true;
        }
      });
      return found;
    },
    fix: (spec) => {
      const dropped = [];
      const prune = (pathKey, owner) => {
        if (!owner.parameters) return;
        owner.parameters = owner.parameters.filter((prm) => {
          const drop = prm && prm.in === 'cookie';
          if (drop) dropped.push(`${pathKey}: ${prm.name}`);
          return !drop;
        });
      };
      for (const [pathKey, item] of Object.entries(spec.paths || {})) {
        prune(pathKey, item);
        for (const verb of HTTP_VERBS) if (item[verb]) prune(pathKey, item[verb]);
      }
      return `${dropped.length} cookie parameter(s) dropped (any-sdk supports path, query, header and body parameters only): ${[...new Set(dropped)].slice(0, 6).join('; ')}${dropped.length > 6 ? '; ...' : ''}`;
    }
  },
  {
    name: 'drop-prose-query-params',
    applies: (file, spec) => {
      let found = false;
      forEachOperation(spec, (pathKey, item, verb, op) => {
        for (const prm of [...(item.parameters || []), ...(op.parameters || [])]) {
          if (prm && prm.in === 'query' && /\s/.test(prm.name || '')) found = true;
        }
      });
      return found;
    },
    fix: (spec) => {
      const dropped = [];
      const prune = (pathKey, owner) => {
        if (!owner.parameters) return;
        owner.parameters = owner.parameters.filter((prm) => {
          const drop = prm && prm.in === 'query' && /\s/.test(prm.name || '');
          if (drop) dropped.push(`${pathKey}: "${prm.name}"`);
          return !drop;
        });
      };
      for (const [pathKey, item] of Object.entries(spec.paths || {})) {
        prune(pathKey, item);
        for (const verb of HTTP_VERBS) if (item[verb]) prune(pathKey, item[verb]);
      }
      return `${dropped.length} query parameter(s) with prose names dropped (wire names unknown): ${[...new Set(dropped)].slice(0, 6).join('; ')}${dropped.length > 6 ? '; ...' : ''}`;
    }
  }
];

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
    servers: (spec.servers || []).map((s) => s.url),
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
    for (const f of fixes) console.log(`  - ${f.rule}: ${f.note}`);
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
