#!/usr/bin/env node

// Post-generation fixes for things the generator cannot express, driven by
// the endpoint inventory. Idempotent; re-run after every generate.
// Validates and fails without writing.
//
// 1. Org-scoped server templates. bin/split.mjs rebased every org-scoped
//    operation (leading /v2/org/{org_name}, /v3/orgs/{org_name},
//    /v2/artifact-registry/org/{org_name} prefix removed, org path parameter
//    dropped). Here each rebased path item gets a path-level `servers`
//    override carrying the prefix as a server template whose org_name
//    variable resolves from NGC_ORG via x-stackQL-envVar (the clickhouse /
//    supabase / godaddy precedent; any-sdk resolves servers operation ->
//    path item -> document). It is applied here because normalize strips
//    path-level servers from provider-dev/source. A WHERE org_name value
//    always beats the environment; with NGC_ORG unset, org_name is a
//    required parameter (visible in SHOW METHODS).
//
// 2. snake_case surface. `snake_case_aliases: true` on the provider config
//    presents camelCase wire properties as snake_case columns; pairing it
//    with `request.nativeCasing` on every method lets snake_case WHERE keys
//    and body columns resolve against the wire names. NVCF and the JSON
//    bodies are camelCase (`camel`); the NGC core query parameters are
//    kebab-case (page-size, resolve-labels) and get `kebab` on the methods
//    that carry them (inventory column native_casing).
//
// 3. Pagination and LIMIT pushdown. NGC core collections page with
//    page-number (zero-based) + page-size and echo paginationInfo
//    {index, totalPages, ...} in the envelope; any-sdk's page_number
//    algorithm follows index/totalPages. Configured per method from the
//    inventory (pagination_params); SQL LIMIT is pushed to page-size where
//    the operation declares it. NVCF collections are unpaginated.
//
// 4. Opaque JSON request bodies (NVCF pexec invoke): the normalize pass
//    lowers the free-form invocation payload to a string, which leaves the
//    naive body translator nothing to match. A wrapper schema {body} plus a
//    request transform sends the `body` argument verbatim as the JSON
//    payload (the vercel octet-stream precedent).
//
// 5. Scalar-list responses: /v2/nvcf/functions/ids returns {functionIds:
//    [string]}; a response transform re-shapes it into rows with a
//    function_id column.
//
// 6. DELETE methods with a request body get the naive body translation
//    (the generator emits it for POST/PUT/PATCH only).
//
// Usage: node provider-dev/scripts/post_process.mjs

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';
import { loadInventory, loadServers } from './lib/inventory.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const servicesDir = path.join(repoRoot, 'provider-dev', 'openapi', 'src', 'nvidia', 'v00.00.00000', 'services');
const HTTP_VERBS = ['get', 'post', 'put', 'patch', 'delete'];

if (!fs.existsSync(servicesDir)) {
  console.error(`Error: ${servicesDir} not found - run the generate step first`);
  process.exit(1);
}

const { byServiceOp, hostByService } = loadInventory();
const servers = loadServers();
const ORG_VAR = servers.orgVariable.name;
const ORG_ENV = servers.orgVariable['x-stackQL-envVar'];

function decodeOperationRef(ref) {
  const parts = ref.replace(/^#\/paths\//, '').split('/');
  const verb = parts.pop();
  return [parts.join('/').replace(/~1/g, '/').replace(/~0/g, '~'), verb];
}

const errors = [];
const docs = new Map();
const counts = { orgPaths: 0, rootPaths: 0, casing: { camel: 0, kebab: 0 }, pagination: 0, pushdown: 0, opaqueBodies: 0, scalarLists: 0, naiveDeletes: 0 };

for (const f of fs.readdirSync(servicesDir).filter((x) => x.endsWith('.yaml')).sort()) {
  const service = f.replace(/\.yaml$/, '');
  const doc = yaml.load(fs.readFileSync(path.join(servicesDir, f), 'utf8'));
  docs.set(f, doc);

  const host = hostByService.get(service);
  if (!host) { errors.push(`${f}: service ${service} is not in the inventory`); continue; }
  if (doc.servers?.[0]?.url !== host) errors.push(`${f}: root server is ${doc.servers?.[0]?.url}, inventory says ${host}`);

  // 1. path-level org server templates
  for (const [pathKey, item] of Object.entries(doc.paths || {})) {
    const prefixes = new Set();
    for (const verb of HTTP_VERBS) {
      const op = item[verb];
      if (!op) continue;
      const row = byServiceOp.get(`${service}::${op.operationId}`);
      if (!row) { errors.push(`${f}: ${verb} ${pathKey} (${op.operationId}) is not a mapped inventory operation`); continue; }
      if (row.rebased_path !== pathKey) errors.push(`${f}: ${op.operationId} is at ${pathKey} but the inventory rebased it to ${row.rebased_path}`);
      prefixes.add(row.org_prefix);
      if (row.org_prefix && (op.parameters || []).some((p) => p.in === 'path' && (p.name === ORG_VAR || p.name === 'org'))) {
        errors.push(`${f}: ${verb} ${pathKey} still declares the org path parameter after the rebase`);
      }
    }
    if (prefixes.size > 1) { errors.push(`${f}: path ${pathKey} mixes org prefixes ${[...prefixes].join(', ')}`); continue; }
    const prefix = [...prefixes][0];
    if (prefix) {
      item.servers = [{
        url: host + prefix,
        variables: {
          [ORG_VAR]: {
            description: servers.orgVariable.description,
            'x-stackQL-envVar': ORG_ENV
          }
        }
      }];
      counts.orgPaths++;
    } else {
      delete item.servers;
      counts.rootPaths++;
    }
  }

  // per-method fixes
  const resources = doc.components?.['x-stackQL-resources'] || {};
  if (Object.keys(resources).length === 0) errors.push(`${f}: no x-stackQL-resources`);
  for (const [resourceName, resource] of Object.entries(resources)) {
    for (const [methodName, method] of Object.entries(resource.methods || {})) {
      const ref = method.operation?.$ref;
      if (!ref) { errors.push(`${f}: ${resourceName}.${methodName} has no operation ref`); continue; }
      const [pathKey, verb] = decodeOperationRef(ref);
      const op = doc.paths?.[pathKey]?.[verb];
      if (!op) { errors.push(`${f}: ${resourceName}.${methodName} references a missing operation ${verb} ${pathKey}`); continue; }
      const row = byServiceOp.get(`${service}::${op.operationId}`);
      if (!row) { errors.push(`${f}: ${resourceName}.${methodName} (${op.operationId}) is not in the inventory`); continue; }
      if (row.resource !== resourceName || row.method !== methodName) {
        errors.push(`${f}: ${resourceName}.${methodName} is mapped from ${op.operationId} but the inventory says ${row.resource}.${row.method}`);
      }

      // 2a. response media type: a few registry operations declare their
      // JSON response under `*/*` (accept anything); stackql projects rows
      // from JSON responses only, so rebind the content and the method to
      // application/json (the k8s cbor precedent)
      for (const code of Object.keys(op.responses || {})) {
        const content = op.responses[code]?.content;
        if (content && content['*/*'] && !content['application/json']) {
          content['application/json'] = content['*/*'];
          delete content['*/*'];
          counts.responseMedia = (counts.responseMedia || 0) + 1;
        }
      }
      if (method.response?.mediaType === '*/*') method.response.mediaType = 'application/json';

      // 2. casing
      const casing = row.native_casing === 'kebab' ? 'kebab' : 'camel';
      method.request = { ...(method.request || {}), nativeCasing: casing };
      counts.casing[casing]++;

      // 3. pagination + LIMIT pushdown on collection reads
      const pageParams = row.pagination_params.split('+').filter(Boolean);
      if (verb === 'get' && pageParams.includes('page-number')) {
        method.config = {
          ...(method.config || {}),
          pagination: {
            algorithm: 'page_number',
            requestToken: { key: 'page-number', location: 'query' },
            responseToken: { key: '$.paginationInfo.index', location: 'body' },
            responseTerminator: { key: '$.paginationInfo.totalPages', location: 'body' }
          }
        };
        counts.pagination++;
        if (pageParams.includes('page-size')) {
          method.config.queryParamPushdown = { top: { paramName: 'page-size' } };
          counts.pushdown++;
        }
      }

      // 4. opaque JSON request bodies: the operation's body schema becomes
      // the {body} wrapper (so `body` is a declared, required parameter of
      // the method) and the request transform unwraps it on the wire
      const bodyContent = op.requestBody?.content?.['application/json'];
      const bodySchema = bodyContent?.schema;
      if (bodySchema && ((bodySchema.type === 'string' && /opaque/i.test(bodySchema.description || '')) || bodySchema.$ref === '#/components/schemas/StackqlJsonBody')) {
        doc.components.schemas = doc.components.schemas || {};
        doc.components.schemas.StackqlJsonBody = {
          type: 'object',
          description: 'A free-form JSON request body, supplied as a JSON string in the body argument',
          properties: { body: { type: 'string', description: 'The request payload as a JSON string (the function input)' } },
          required: ['body']
        };
        bodyContent.schema = { $ref: '#/components/schemas/StackqlJsonBody' };
        method.request = {
          ...method.request,
          mediaType: 'application/json',
          // stackql hands a JSON-looking string argument to the template as a
          // parsed value, and a plain string as-is (the godaddy records precedent)
          transform: { type: 'golang_template_json_v0.3.0', body: '{{ if eq (kindOf .body) "string" }}{{ .body }}{{ else }}{{ toJson .body }}{{ end }}' }
        };
        counts.opaqueBodies++;
      }

      // 6. DELETE with a body
      if (verb === 'delete' && op.requestBody && !method.config?.requestBodyTranslate) {
        method.config = { ...(method.config || {}), requestBodyTranslate: { algorithm: 'naive' } };
        counts.naiveDeletes++;
      }
    }
  }
}

// 5. scalar-list responses: a collection read whose rows are scalars
// ({functionIds: [string]} on /v2/nvcf/functions/ids, a bare array of
// registry names on /v2/nvcf/recognized-registries) projects nothing; a
// response transform re-shapes it into rows with one column named after
// the singular of the array key (function_ids -> function_id, registries
// -> registry). Bare arrays arrive already wrapped by normalize (a text
// template over the raw body); that wrap is replaced by a json template
// ranging over the parsed array.
const snake = (s) => s.replace(/([a-z0-9])([A-Z])/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
const singularOf = (s) => s.replace(/ies$/, 'y').replace(/ses$/, 's').replace(/s$/, '');
for (const [f, doc] of docs) {
  const schemas = doc.components?.schemas || {};
  const resolve = (s) => { let cur = s; for (let i = 0; i < 10 && cur?.$ref; i++) cur = schemas[cur.$ref.split('/').pop()]; return cur; };
  for (const [resourceName, resource] of Object.entries(doc.components?.['x-stackQL-resources'] || {})) {
    for (const [methodName, method] of Object.entries(resource.methods || {})) {
      if (!/^list/.test(methodName) || !method.response?.objectKey) continue;
      const [pathKey, verb] = decodeOperationRef(method.operation.$ref);
      const op = doc.paths?.[pathKey]?.[verb];
      const content = op?.responses?.[method.response.openAPIDocKey]?.content?.['application/json'];
      const top = resolve(method.response.schema_override || content?.schema);
      const key = method.response.objectKey.replace(/^\$\./, '');
      const arr = resolve(top?.properties?.[key]);
      const items = arr?.type === 'array' ? resolve(arr.items) : null;
      if (!items || !['string', 'integer', 'number', 'boolean'].includes(items.type)) continue;
      const wrappedBareArray = !!method.response.transform; // normalize's bare-array wrap
      const rowsKey = snake(key);
      const col = singularOf(rowsKey);
      const wrapperName = `Stackql${resourceName.replace(/(^|_)([a-z])/g, (m, p, c) => c.toUpperCase())}Rows`;
      schemas[wrapperName] = {
        type: 'object',
        properties: { [rowsKey]: { type: 'array', items: { type: 'object', properties: { [col]: { type: items.type, description: items.description || arr.description || `${col} value` } } } } }
      };
      const source = wrappedBareArray ? '.' : `.${key}`;
      method.response = {
        mediaType: 'application/json',
        openAPIDocKey: method.response.openAPIDocKey,
        overrideMediaType: 'application/json',
        schema_override: { $ref: `#/components/schemas/${wrapperName}` },
        objectKey: `$.${rowsKey}`,
        transform: {
          type: 'golang_template_json_v0.3.0',
          body: `{"${rowsKey}":[{{ range $i, $v := ${source} }}{{ if $i }},{{ end }}{"${col}":{{ toJson $v }}}{{ end }}]}`
        }
      };
      counts.scalarLists++;
    }
  }
}

// 7. invocation status: GET /v2/nvcf/pexec/status/{request_id} returns the
// function's own response body (arbitrary JSON, 200 when complete, 202
// while pending; NVCF-STATUS / NVCF-REQID headers carry the state). The spec
// types it as a byte buffer, which projects as nonsense columns. Wrap the
// raw body into one row with a `response` column (the k8s pods_log
// precedent: text template, wrapper schema, objectKey).
const invDoc = docs.get('nvcf_invocation.yaml');
const invStatus = invDoc?.components?.['x-stackQL-resources']?.invocation_status?.methods?.get;
if (!invStatus) {
  errors.push('nvcf_invocation.yaml: expected method invocation_status.get is missing');
} else {
  invDoc.components.schemas.StackqlInvocationResult = {
    type: 'object',
    properties: {
      results: {
        type: 'array',
        items: { type: 'object', properties: { response: { type: 'string', description: 'The invocation response body as returned by the function (JSON text); empty while the request is still pending (HTTP 202)' } } }
      }
    }
  };
  invStatus.response = {
    mediaType: 'application/json',
    openAPIDocKey: '200',
    overrideMediaType: 'application/json',
    schema_override: { $ref: '#/components/schemas/StackqlInvocationResult' },
    objectKey: '$.results',
    transform: { type: 'golang_template_text_v0.3.0', body: '{"results": [{"response": {{ toJson . }}}]}' }
  };
  counts.scalarLists++;
}

if (errors.length > 0) {
  console.error(`FAILED with ${errors.length} error(s), nothing written:`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}
for (const [f, d] of docs) fs.writeFileSync(path.join(servicesDir, f), yaml.dump(d, { lineWidth: -1, noRefs: true }));
console.log(`post_process: ${counts.orgPaths} org-scoped path items on server templates (${ORG_VAR} via ${ORG_ENV}), ${counts.rootPaths} root path items across ${docs.size} services`);
console.log(`post_process: request.nativeCasing camel x${counts.casing.camel}, kebab x${counts.casing.kebab}; page_number pagination on ${counts.pagination} methods (LIMIT -> page-size on ${counts.pushdown}); ${counts.opaqueBodies} opaque JSON body wrapper(s); ${counts.scalarLists} scalar-list transform(s); naive body translation on ${counts.naiveDeletes} DELETE method(s)`);
