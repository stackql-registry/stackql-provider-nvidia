#!/usr/bin/env node

// Mock NGC + NVCF API for integration-testing the generated nvidia provider
// without an account. One HTTP server plays both hosts (api.ngc.nvidia.com
// and api.nvcf.nvidia.com - the test registry points both at it; routing
// is by path) and serves canned JSON in the wire shapes the definitions and
// the ngcsdk data classes declare:
//
//   NGC core   {<entities>: [...], paginationInfo: {index, size, totalPages,
//              totalResults}, requestStatus} list envelopes with zero-based
//              page-number / page-size paging; {<entity>: {...},
//              requestStatus} entity envelopes; {requestStatus} for writes
//              without a body; camelCase properties; kebab-case query
//              parameters
//   catalog    the same envelopes without auth for public artifacts; a bare
//              JSON array for /v2/gpus (wire-proven 2026-07-14)
//   NVCF       {functions: [...]} / {function: {...}} envelopes on
//              api.ngc.nvidia.com; queues, assets and the HTTP-polling
//              invocation (202 + NVCF-REQID, then the function's own
//              response body on the status poll) on api.nvcf.nvidia.com
//
// Every request outside the public catalog must carry
// `Authorization: Bearer <EXPECTED_TOKEN>` or it is rejected 401 (the NGC
// error envelope; an empty body on the NVCF host) - this proves the
// provider's bearer wiring (NGC_API_KEY).
//
// Two organizations are served: ORG_A (what NGC_ORG resolves to in the
// tests) and ORG_B (to prove a WHERE org_name value beats the environment);
// any other org is 404. Mutable in-memory stores make the registry model,
// NVCF function/version, authorization and deployment lifecycles
// round-trip realistically.
//
// Exports startMockServer() for the test runner; also runnable standalone:
//   node tests/integration/mock_nvidia_server.mjs [port]

import http from 'http';
import { URL } from 'url';

export const EXPECTED_TOKEN = 'nvapi-mock0123456789abcdefghijklmnopqrstuvwxyz0123456789ABCDEF';
export const ORG_A = 'mockorg0001';
export const ORG_B = 'mockorg0002';
export const TEAM = 'mockteam';
export const FUNCTION_ID = 'f1a2b3c4-0000-4000-8000-000000000001';
export const VERSION_ID = 'a1b2c3d4-0000-4000-8000-000000000001';
export const REQUEST_ID = 'r1a2b3c4-0000-4000-8000-000000000001';
export const NCA_ID = 'nca-mock-0001';

const ts = '2026-08-01T02:03:04.000Z';
let counter = 0;
const newId = (prefix) => `${prefix}${String(++counter).padStart(4, '0')}-0000-4000-8000-000000000000`.slice(0, 36);

function requestStatus() {
  return { statusCode: 'SUCCESS', statusDescription: 'Request successful', requestId: newId('req'), serverId: 'mock' };
}

// ---------------------------------------------------------------------------
// fixtures
// ---------------------------------------------------------------------------

function orgObj(name, i) {
  return { id: 1000 + i, name, displayName: `Mock Org ${i}`, description: 'mock organization', type: 'ENTERPRISE', country: 'AU', isInternal: false, isDatasetServiceEnabled: false, orgOwner: { email: 'owner@example.com', fullName: 'Mock Owner' } };
}
const ORGS = [ORG_A, ORG_B, 'mockorg0003', 'mockorg0004', 'mockorg0005'].map((n, i) => orgObj(n, i + 1));

function userObj(id, email, name, roles = ['REGISTRY_READ']) {
  return { id, email, name, isActive: true, createdDate: ts, updatedDate: ts, starfleetId: `sf-${id}`, roles: [{ org: { name: ORG_A }, orgRoles: roles }] };
}
const USERS = [userObj(1, 'alice@example.com', 'Alice'), userObj(2, 'bob@example.com', 'Bob', ['REGISTRY_READ', 'REGISTRY_USER'])];

function teamObj(name, i) {
  return { id: 200 + i, name, description: `mock team ${i}`, isDeleted: false };
}
const TEAMS = [teamObj(TEAM, 1), teamObj('mockteam2', 2)];

function modelObj(org, name, extra = {}) {
  return {
    name, displayName: `Mock ${name}`, orgName: org, application: 'Inference', framework: 'PyTorch', precision: 'FP16',
    shortDescription: 'mock model', description: 'a mock model', createdDate: ts, updatedDate: ts, latestVersionIdStr: '1.0',
    latestVersionSizeInBytes: 1024, isPublic: false, canGuestDownload: false, labels: ['mock'], ...extra
  };
}
// the wire carries a numeric id and the string versionId ("1.0"); the SDK
// documents versionId as the one to use
function modelVersionObj(versionId, id) {
  return { id, versionId, createdDate: ts, updatedDate: ts, status: 'UPLOAD_COMPLETE', totalFileCount: 1, totalSizeInBytes: 1024, description: 'mock version', gpuModel: 'A100', framework: 'PyTorch' };
}

function functionObj(id, versionId, name, extra = {}) {
  return {
    id, ncaId: NCA_ID, versionId, name, status: 'INACTIVE', inferenceUrl: '/v1/infer', inferencePort: 8000, healthUri: '/health',
    containerImage: 'nvcr.io/mock/echo:latest', apiBodyFormat: 'CUSTOM', functionType: 'DEFAULT', createdAt: ts, activeInstances: [],
    tags: ['mock'], ...extra
  };
}
function clusterGroupObj(id, name, gpus) {
  return {
    id, name, ncaId: NCA_ID, authorizedNcaIds: [NCA_ID],
    gpus: gpus.map((g) => ({ name: g, instanceTypes: [{ name: `GCP.GPU.${g}_1x`, description: `1x ${g}`, default: true }] })),
    clusters: [{ id: `${id}-c1`, name: `${name}-cluster-1`, k8sVersion: '1.30' }]
  };
}
const CLUSTER_GROUPS = [clusterGroupObj('cg-0001', 'GFN', ['L40', 'L40S']), clusterGroupObj('cg-0002', 'GCP', ['H100', 'A100'])];

function gpuObj(displayName, pciDeviceId, memory) {
  return { displayName, pciDeviceId, pciVendorId: '10DE', pciSubsystemDeviceId: '0000', memorySizeGb: memory, formFactor: 'SXM', cudaMajorVersion: '12', cudaMinorVersion: '4', gpuCounts: ['1', '2', '4', '8'], labelName: displayName.toLowerCase(), createdAt: ts, updatedAt: ts };
}
const GPUS = [gpuObj('A100', '20B2', 80), gpuObj('H100', '2330', 80), gpuObj('L40S', '26B9', 48)];

const CATALOG_MODELS = [modelObj('nvidia', 'llama-3.1-8b-instruct', { isPublic: true, canGuestDownload: true }), modelObj('nvidia', 'nemotron-4-340b', { isPublic: true, canGuestDownload: true })];

// mutable stores
const state = {
  models: new Map([[ORG_A, new Map([['resnet50', modelObj(ORG_A, 'resnet50')], ['bert-base', modelObj(ORG_A, 'bert-base')]])], [ORG_B, new Map([['whisper', modelObj(ORG_B, 'whisper')]])]]),
  teamModels: new Map([[`${ORG_A}/${TEAM}`, new Map([['team-model', modelObj(ORG_A, 'team-model', { teamName: TEAM })]])]]),
  functions: new Map([[FUNCTION_ID, new Map([[VERSION_ID, functionObj(FUNCTION_ID, VERSION_ID, 'mock-echo', { status: 'ACTIVE' })]])]]),
  authorizations: new Map([[FUNCTION_ID, [{ ncaId: 'nca-partner-0001' }]]]),
  deployments: new Map(),
  pollStatus: new Map()
};

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------

function send(res, code, body, headers = {}) {
  const payload = body === undefined ? '' : (typeof body === 'string' ? body : JSON.stringify(body));
  res.writeHead(code, { 'Content-Type': 'application/json', ...headers });
  res.end(payload);
}
function ngcError(res, code, statusCode, message) {
  send(res, code, { requestStatus: { statusCode, statusDescription: message, requestId: newId('req') } });
}
function readBody(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (c) => { data += c; });
    req.on('end', () => {
      if (!data) return resolve({});
      try { resolve(JSON.parse(data)); } catch { resolve({ _raw: data }); }
    });
  });
}

// zero-based page-number / page-size paging with the NGC paginationInfo
// envelope; defaultPageSize simulates the server-side page cap so
// pagination-aware clients must walk index/totalPages
function page(items, url, defaultPageSize = 2) {
  const size = parseInt(url.searchParams.get('page-size') || '0', 10) || defaultPageSize;
  const index = parseInt(url.searchParams.get('page-number') || '0', 10) || 0;
  const totalPages = Math.max(1, Math.ceil(items.length / size));
  return { items: items.slice(index * size, index * size + size), paginationInfo: { index, size, totalPages, totalResults: items.length } };
}
function listEnvelope(key, items, url) {
  const { items: pageItems, paginationInfo } = page(items, url);
  return { [key]: pageItems, paginationInfo, requestStatus: requestStatus() };
}

function isPublicPath(p) {
  return /^\/v2\/(models|resources|recipes|collections|gpus|helm-charts|containers)(\/|$)/.test(p);
}

// ---------------------------------------------------------------------------
// routes
// ---------------------------------------------------------------------------

async function handle(req, res, log) {
  const url = new URL(req.url, 'http://localhost');
  const p = url.pathname;
  const m = req.method;
  const body = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(m) ? await readBody(req) : null;
  log.push({ method: m, path: p, query: Object.fromEntries(url.searchParams), authorization: req.headers['authorization'] || '', contentType: req.headers['content-type'] || '', body });

  const auth = req.headers['authorization'] || '';
  const authed = auth === `Bearer ${EXPECTED_TOKEN}`;
  if (!authed && !isPublicPath(p)) {
    if (p.startsWith('/v2/nvcf/')) return send(res, 401, undefined);
    return ngcError(res, 401, 'UNAUTHORIZED', 'Authentication required');
  }

  let x;

  // ----------------------------------------------------------- orgs (kas)
  if (m === 'GET' && p === '/v2/orgs') return send(res, 200, listEnvelope('organizations', ORGS, url));
  if ((x = p.match(/^\/v2\/orgs\/([^/]+)$/)) && m === 'GET') {
    const org = ORGS.find((o) => o.name === x[1]);
    return org ? send(res, 200, { organizations: org, requestStatus: requestStatus() }) : ngcError(res, 404, 'NOT_FOUND', `org ${x[1]} not found`);
  }
  if (m === 'GET' && p === '/v2/users/me') return send(res, 200, { user: USERS[0], userRoles: [{ org: { name: ORG_A }, orgRoles: ['REGISTRY_READ'] }], ncaRole: 'MEMBER', requestStatus: requestStatus() });
  if ((x = p.match(/^\/v2\/org\/([^/]+)\/users$/)) && m === 'GET') {
    if (![ORG_A, ORG_B].includes(x[1])) return ngcError(res, 404, 'NOT_FOUND', `org ${x[1]} not found`);
    return send(res, 200, listEnvelope('users', USERS, url));
  }
  if ((x = p.match(/^\/v3\/orgs\/([^/]+)\/users\/([^/]+)$/)) && m === 'GET') {
    const u = USERS.find((u) => u.email === x[2] || String(u.id) === x[2]);
    return u ? send(res, 200, { user: u, requestStatus: requestStatus() }) : ngcError(res, 404, 'NOT_FOUND', 'user not found');
  }
  if ((x = p.match(/^\/v2\/org\/([^/]+)\/teams$/)) && m === 'GET') return send(res, 200, listEnvelope('teams', TEAMS, url));
  if ((x = p.match(/^\/v2\/org\/([^/]+)\/teams\/([^/]+)$/)) && m === 'GET') {
    const t = TEAMS.find((t) => t.name === x[2]);
    return t ? send(res, 200, { team: t, requestStatus: requestStatus() }) : ngcError(res, 404, 'NOT_FOUND', 'team not found');
  }
  if ((x = p.match(/^\/v2\/org\/([^/]+)\/team\/([^/]+)\/users$/)) && m === 'GET') return send(res, 200, listEnvelope('users', USERS.slice(0, 1), url));

  // --------------------------------------------------- private registry
  if ((x = p.match(/^\/v2\/org\/([^/]+)\/team\/([^/]+)\/models$/)) && m === 'GET') {
    const store = state.teamModels.get(`${x[1]}/${x[2]}`) || new Map();
    return send(res, 200, listEnvelope('models', [...store.values()], url));
  }
  if ((x = p.match(/^\/v2\/org\/([^/]+)\/models$/))) {
    const store = state.models.get(x[1]);
    if (!store) return ngcError(res, 404, 'NOT_FOUND', `org ${x[1]} not found`);
    if (m === 'GET') return send(res, 200, listEnvelope('models', [...store.values()], url));
    if (m === 'POST') {
      const name = body?.name;
      if (!name || !body.framework || !body.precision) return ngcError(res, 400, 'BAD_REQUEST', 'name, framework and precision are required');
      const model = modelObj(x[1], name, { displayName: body.displayName || name, framework: body.framework, precision: body.precision, shortDescription: body.shortDescription || '', application: body.application || '' });
      store.set(name, model);
      return send(res, 200, { model, requestStatus: requestStatus() });
    }
  }
  if ((x = p.match(/^\/v2\/org\/([^/]+)\/models\/([^/]+)$/))) {
    const store = state.models.get(x[1]);
    const model = store?.get(x[2]);
    if (!model) return ngcError(res, 404, 'NOT_FOUND', `model ${x[2]} not found`);
    if (m === 'GET') return send(res, 200, { model, requestStatus: requestStatus() });
    if (m === 'PATCH') {
      Object.assign(model, body, { updatedDate: '2026-08-02T00:00:00.000Z' });
      return send(res, 200, { model, requestStatus: requestStatus() });
    }
  }
  if ((x = p.match(/^\/v2\/org\/([^/]+)\/models\/([^/]+)\/versions$/)) && m === 'GET') {
    const model = state.models.get(x[1])?.get(x[2]);
    if (!model) return ngcError(res, 404, 'NOT_FOUND', 'model not found');
    const { items, paginationInfo } = page([modelVersionObj('1.0', 101), modelVersionObj('1.1', 102)], url);
    return send(res, 200, { model, modelVersions: items, paginationInfo, requestStatus: requestStatus() });
  }
  if ((x = p.match(/^\/v2\/org\/([^/]+)\/models\/([^/]+)\/versions\/([^/]+)$/)) && m === 'GET') {
    const model = state.models.get(x[1])?.get(x[2]);
    if (!model) return ngcError(res, 404, 'NOT_FOUND', 'model not found');
    return send(res, 200, { model, modelVersion: modelVersionObj(x[3], x[3] === '1.1' ? 102 : 101), requestStatus: requestStatus() });
  }
  // generic artifact delete (typed models have no DELETE - deletion rides
  // /v2/org/{org}/{artifact_type}/{artifact_name})
  if ((x = p.match(/^\/v2\/org\/([^/]+)\/([^/]+)\/([^/]+)$/)) && m === 'DELETE' && x[2] === 'models') {
    const store = state.models.get(x[1]);
    if (!store?.has(x[3])) return ngcError(res, 404, 'NOT_FOUND', `model ${x[3]} not found`);
    store.delete(x[3]);
    return send(res, 200, { requestStatus: requestStatus() });
  }

  // ------------------------------------------------------------- catalog
  if (m === 'GET' && p === '/v2/models') return send(res, 200, listEnvelope('models', CATALOG_MODELS, url));
  if ((x = p.match(/^\/v2\/models\/([^/]+)\/([^/]+)$/)) && m === 'GET') {
    const model = CATALOG_MODELS.find((mm) => mm.orgName === x[1] && mm.name === x[2]);
    return model ? send(res, 200, { model, requestStatus: requestStatus() }) : ngcError(res, 404, 'NOT_FOUND', 'model not found');
  }
  if (m === 'GET' && p === '/v2/gpus') return send(res, 200, GPUS);
  if (m === 'GET' && p === '/v2/collections') return send(res, 200, listEnvelope('collections', [{ name: 'nemo', orgName: 'nvidia', displayName: 'NeMo', category: 'Framework', createdDate: ts }], url));

  // --------------------------------------------- NVCF management (ngc host)
  if (m === 'GET' && p === '/v2/nvcf/functions') {
    const all = [...state.functions.values()].flatMap((versions) => [...versions.values()]);
    return send(res, 200, { functions: all });
  }
  if (m === 'GET' && p === '/v2/nvcf/functions/ids') return send(res, 200, { functionIds: [...state.functions.keys()] });
  if (m === 'POST' && p === '/v2/nvcf/functions') {
    if (!body?.name || !body?.inferenceUrl) return send(res, 400, { type: 'about:blank', title: 'Bad Request', detail: 'name and inferenceUrl are required' });
    const id = newId('fn');
    const versionId = newId('ver');
    const fn = functionObj(id, versionId, body.name, { inferenceUrl: body.inferenceUrl, containerImage: body.containerImage || null, helmChart: body.helmChart || null, apiBodyFormat: body.apiBodyFormat || 'PREDICT_V2', status: 'INACTIVE' });
    state.functions.set(id, new Map([[versionId, fn]]));
    return send(res, 200, { function: fn });
  }
  if ((x = p.match(/^\/v2\/nvcf\/functions\/([^/]+)\/versions$/))) {
    const versions = state.functions.get(x[1]);
    if (!versions) return send(res, 404, { type: 'about:blank', title: 'Not Found', detail: `function ${x[1]} not found` });
    if (m === 'GET') return send(res, 200, { functions: [...versions.values()] });
    if (m === 'POST') {
      const versionId = newId('ver');
      const first = [...versions.values()][0];
      const fn = functionObj(x[1], versionId, first.name, { inferenceUrl: body?.inferenceUrl || first.inferenceUrl, containerImage: body?.containerImage || first.containerImage });
      versions.set(versionId, fn);
      return send(res, 200, { function: fn });
    }
  }
  if ((x = p.match(/^\/v2\/nvcf\/functions\/([^/]+)\/versions\/([^/]+)$/))) {
    const fn = state.functions.get(x[1])?.get(x[2]);
    if (!fn) return send(res, 404, { type: 'about:blank', title: 'Not Found', detail: 'function version not found' });
    if (m === 'GET') return send(res, 200, { function: fn });
    if (m === 'PUT') { Object.assign(fn, body || {}); return send(res, 200, { function: fn }); }
    if (m === 'DELETE') {
      state.functions.get(x[1]).delete(x[2]);
      if (state.functions.get(x[1]).size === 0) state.functions.delete(x[1]);
      return send(res, 204, undefined);
    }
  }
  if ((x = p.match(/^\/v2\/nvcf\/authorizations\/functions\/([^/]+)(\/versions\/([^/]+))?(\/add|\/remove)?$/))) {
    if (!state.functions.has(x[1])) return send(res, 404, { type: 'about:blank', title: 'Not Found', detail: 'function not found' });
    const parties = state.authorizations.get(x[1]) || [];
    const dto = () => ({ id: x[1], ncaId: NCA_ID, versionId: x[3] || VERSION_ID, authorizedParties: state.authorizations.get(x[1]) || [] });
    if (m === 'GET' && !x[2]) return send(res, 200, { functions: [dto()] });
    if (m === 'GET') return send(res, 200, { function: dto() });
    if (m === 'PATCH' && x[4] === '/add') { state.authorizations.set(x[1], [...parties, body.authorizedParty]); return send(res, 200, { function: dto() }); }
    if (m === 'PATCH' && x[4] === '/remove') { state.authorizations.set(x[1], parties.filter((a) => a.ncaId !== body.authorizedParty?.ncaId)); return send(res, 200, { function: dto() }); }
    if (m === 'POST') { state.authorizations.set(x[1], body.authorizedParties || []); return send(res, 200, { function: dto() }); }
    if (m === 'DELETE') { state.authorizations.set(x[1], []); return send(res, 200, { function: dto() }); }
  }
  if (m === 'GET' && p === '/v2/nvcf/clusterGroups') return send(res, 200, { clusterGroups: CLUSTER_GROUPS });
  if ((x = p.match(/^\/v2\/nvcf\/deployments\/functions\/([^/]+)\/versions\/([^/]+)$/))) {
    const fn = state.functions.get(x[1])?.get(x[2]);
    if (!fn) return send(res, 404, { type: 'about:blank', title: 'Not Found', detail: 'function version not found' });
    const key = `${x[1]}/${x[2]}`;
    if (m === 'POST') {
      const dep = { deploymentId: newId('dep'), functionId: x[1], functionVersionId: x[2], functionName: fn.name, functionStatus: 'DEPLOYING', ncaId: NCA_ID, deploymentSpecifications: body?.deploymentSpecifications || [], createdAt: ts, lastUpdatedAt: ts };
      state.deployments.set(key, dep);
      fn.status = 'DEPLOYING';
      return send(res, 200, { deployment: dep });
    }
    const dep = state.deployments.get(key);
    if (!dep) return send(res, 404, { type: 'about:blank', title: 'Not Found', detail: 'no deployment for this function version' });
    if (m === 'GET') return send(res, 200, { deployment: dep });
    if (m === 'PUT') { dep.deploymentSpecifications = body?.deploymentSpecifications || dep.deploymentSpecifications; dep.lastUpdatedAt = '2026-08-02T00:00:00.000Z'; return send(res, 200, { deployment: dep }); }
    if (m === 'DELETE') { state.deployments.delete(key); fn.status = 'INACTIVE'; return send(res, 200, { function: fn }); }
  }
  if ((x = p.match(/^\/v2\/nvcf\/deployments\/([^/]+)$/)) && m === 'GET') {
    const dep = [...state.deployments.values()].find((d) => d.deploymentId === x[1]);
    return dep ? send(res, 200, { deployment: dep }) : send(res, 404, { type: 'about:blank', title: 'Not Found', detail: 'deployment not found' });
  }

  // ------------------------------------------ NVCF queues / invocation (nvcf host)
  if ((x = p.match(/^\/v2\/nvcf\/queues\/functions\/([^/]+)$/)) && m === 'GET') {
    const versions = state.functions.get(x[1]);
    if (!versions) return send(res, 404, undefined);
    return send(res, 200, { functionId: x[1], queues: [...versions.values()].map((fn) => ({ functionVersionId: fn.versionId, functionName: fn.name, functionStatus: fn.status, queueDepth: 0 })) });
  }
  if ((x = p.match(/^\/v2\/nvcf\/queues\/([^/]+)\/position$/)) && m === 'GET') return send(res, 200, { functionId: FUNCTION_ID, functionVersionId: VERSION_ID, positionInQueue: 0 });
  if ((x = p.match(/^\/v2\/nvcf\/pexec\/functions\/([^/]+)(\/versions\/([^/]+))?$/)) && m === 'POST') {
    if (!state.functions.has(x[1])) return send(res, 404, undefined);
    const reqId = newId('inv');
    state.pollStatus.set(reqId, { input: body, done: false });
    return send(res, 202, {}, { 'NVCF-REQID': reqId, 'NVCF-STATUS': 'pending-evaluation' });
  }
  if ((x = p.match(/^\/v2\/nvcf\/pexec\/status\/([^/]+)$/)) && m === 'GET') {
    const st = state.pollStatus.get(x[1]) || (x[1] === REQUEST_ID ? { input: { prompt: 'hi' }, done: true } : null);
    if (!st) return send(res, 404, undefined);
    return send(res, 200, { echo: st.input, result: 'ok' }, { 'NVCF-REQID': x[1], 'NVCF-STATUS': 'fulfilled' });
  }
  if (m === 'GET' && p === '/v2/nvcf/assets') return send(res, 200, { assets: [{ assetId: 'asset-0001', description: 'mock asset', contentType: 'image/png', size: 1024, createdAt: ts }] });

  if (p.startsWith('/v2/nvcf/')) return send(res, 404, { type: 'about:blank', title: 'Not Found', detail: `no mock route for ${m} ${p}` });
  return ngcError(res, 404, 'NOT_FOUND', `no mock route for ${m} ${p}`);
}

export function startMockServer(port = 0) {
  const log = [];
  const server = http.createServer((req, res) => {
    handle(req, res, log).catch((err) => send(res, 500, { error: err.message }));
  });
  return new Promise((resolve) => {
    server.listen(port, '127.0.0.1', () => resolve({ server, port: server.address().port, log, state }));
  });
}

// standalone mode
if (process.argv[1]?.endsWith('mock_nvidia_server.mjs')) {
  const { port } = await startMockServer(parseInt(process.argv[2] || '18081', 10));
  console.log(`mock NGC + NVCF API listening on http://127.0.0.1:${port}`);
  console.log(`expects: Authorization: Bearer ${EXPECTED_TOKEN}; orgs ${ORG_A}, ${ORG_B}; team ${TEAM}; function ${FUNCTION_ID} / version ${VERSION_ID}`);
}
