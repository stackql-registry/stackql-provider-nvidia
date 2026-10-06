#!/usr/bin/env node

// Integration tests: run the generated nvidia provider (local file
// registry, test copy pointed at the mock) against the mock NGC + NVCF API
// and assert row-level results for each operation archetype:
//   - the bearer token (the mock 401s anything else)
//   - list envelopes unwrapped per resource ($.organizations, $.models,
//     $.functions, $.clusterGroups, $.queues), entity envelopes ($.user,
//     $.model, $.function, $.deployment), the bare-array GPU catalog
//   - page_number pagination over paginationInfo (three pages walked) and
//     LIMIT pushed down to page-size
//   - org_name resolved from NGC_ORG (x-stackQL-envVar on the path-level
//     server template), a WHERE value beating the environment, the
//     unset-env failure mode, and the *_by_team twin routing
//   - snake_case surface: kebab query parameters (resolve_labels ->
//     resolve-labels) and camelCase body properties (display_name ->
//     displayName) via request.nativeCasing
//   - the registry model INSERT / UPDATE / DELETE lifecycle
//   - the NVCF function INSERT (function + first version), version get,
//     authorization grants INSERT / SELECT / DELETE, deployment INSERT /
//     SELECT / DELETE, queue details on the second host, the polling
//     invocation EXEC (opaque JSON body) and the status SELECT
//   - a 404 surfaced
//
// Requires a stackql binary: $STACKQL, ./stackql, or `stackql` on PATH.
//
// Usage: node tests/integration/run_integration_tests.mjs [--verbose]

import { spawn } from 'child_process';
import { startMockServer, EXPECTED_TOKEN, ORG_A, ORG_B, TEAM, FUNCTION_ID, VERSION_ID, REQUEST_ID } from './mock_nvidia_server.mjs';
import { buildTestRegistry, findStackql, repoRoot } from './registry.mjs';

const verbose = process.argv.includes('--verbose');
const t0 = Date.now();
const stackqlBin = findStackql();

// IMPORTANT: must be async (spawn, not spawnSync) - the mock server runs on
// this process's event loop, so a synchronous wait for stackql deadlocks.
function makeRunSql(registry) {
  return function runSql(sql, envOverrides = {}) {
    return new Promise((resolve) => {
      const env = { ...process.env, NGC_API_KEY: EXPECTED_TOKEN, NGC_ORG: ORG_A, ...envOverrides };
      for (const [k, v] of Object.entries(envOverrides)) if (v === undefined) delete env[k];
      const child = spawn(stackqlBin, [`--registry=${registry}`, 'exec', sql, '--output', 'json'], { cwd: repoRoot, env });
      let stdout = '', stderr = '';
      child.stdout.on('data', (d) => { stdout += d; });
      child.stderr.on('data', (d) => { stderr += d; });
      const timer = setTimeout(() => child.kill(), 120000);
      child.on('error', (e) => { clearTimeout(timer); resolve({ rows: null, err: String(e) }); });
      child.on('close', () => {
        clearTimeout(timer);
        stdout = stdout.trim();
        stderr = stderr.trim();
        if (verbose) console.log(`    sql: ${sql}\n    out: ${stdout.slice(0, 400)}${stderr ? `\n    err: ${stderr.slice(0, 400)}` : ''}`);
        const errish = /http response status code: [45]|error|panic|FindRoute|no matching operation|cannot find matching operation|disallowed|cannot find any viable servers|not supported|required/i;
        if (errish.test(stderr)) return resolve({ rows: null, err: stderr });
        if (!stdout) return resolve({ rows: [], err: null });
        try {
          const val = (v) => (v === 'true' ? true : v === 'false' ? false : (typeof v === 'string' && /^-?\d+(\.\d+)?$/.test(v)) ? Number(v) : v);
          const parsed = JSON.parse(stdout);
          const rows = Array.isArray(parsed) ? parsed.map((r) => Object.fromEntries(Object.entries(r).map(([k, v]) => [k, val(v)]))) : parsed ?? [];
          resolve({ rows, err: null, text: stdout });
        } catch {
          resolve({ rows: [{ _text: stdout }], err: errish.test(stdout) ? stdout : null, text: stdout }); // DML status text
        }
      });
    });
  };
}

const results = [];
function check(name, cond, note = '') {
  results.push({ name, pass: !!cond, note });
  console.log(`  ${cond ? 'PASS' : 'FAIL'}  ${name}${!cond && note ? `  [${String(note).slice(0, 260)}]` : ''}`);
}

const { server, port, log, state } = await startMockServer();
const registry = buildTestRegistry(port);
const runSql = makeRunSql(registry);
console.log(`mock NGC + NVCF API on localhost:${port}, stackql: ${stackqlBin}`);

const calls = (mark, method, p) => log.slice(mark).filter((e) => e.method === method && e.path === p);
const has = (rows, key, value) => Array.isArray(rows) && rows.some((r) => r[key] === value);

try {
  // --- meta sanity
  let r = await runSql('SHOW SERVICES IN nvidia');
  check('show services (7)', r.rows && r.rows.length === 7, r.err || `got ${r.rows?.length}`);

  // --- bearer wiring: the mock 401s anything without the token
  r = await runSql('SELECT name FROM nvidia.orgs.orgs', { NGC_API_KEY: 'nvapi-wrong' });
  check('wrong NGC_API_KEY -> 401 surfaced', r.err && /401/.test(r.err), r.err || JSON.stringify(r.rows));
  let mark = log.length;
  r = await runSql('SELECT name, display_name FROM nvidia.orgs.orgs');
  check('orgs list unwraps $.organizations (5 rows over 3 pages of 2)', r.rows && r.rows.length === 5 && has(r.rows, 'name', ORG_A), r.err || JSON.stringify(r.rows));
  check('bearer token sent on every call', log.slice(mark).every((e) => e.authorization === `Bearer ${EXPECTED_TOKEN}`), JSON.stringify(log.slice(mark).map((e) => e.authorization)));
  const orgCalls = calls(mark, 'GET', '/v2/orgs');
  check('page_number pagination walked page-number 0,1,2 (+ the terminating out-of-range page)',
    orgCalls.length >= 3 && orgCalls.slice(1).every((c) => c.query['page-number'] !== undefined) && orgCalls.some((c) => c.query['page-number'] === '2'),
    JSON.stringify(orgCalls.map((c) => c.query)));
  check('snake_case aliases on the wire camelCase (display_name column)', r.rows && r.rows[0] && 'display_name' in r.rows[0], JSON.stringify(r.rows?.[0]));

  // --- LIMIT pushdown to page-size
  mark = log.length;
  r = await runSql('SELECT name FROM nvidia.orgs.orgs LIMIT 1');
  check('LIMIT 1 -> one row, page-size=1 on the wire', r.rows && r.rows.length === 1 && calls(mark, 'GET', '/v2/orgs')[0]?.query['page-size'] === '1', r.err || JSON.stringify(calls(mark, 'GET', '/v2/orgs').map((c) => c.query)));

  // --- entity envelope: current user ($.user)
  r = await runSql('SELECT email, name FROM nvidia.orgs.current_user');
  check('current_user get unwraps $.user (email column)', r.rows && r.rows.length === 1 && r.rows[0].email === 'alice@example.com', r.err || JSON.stringify(r.rows));
  r = await runSql(`SELECT name FROM nvidia.orgs.orgs WHERE org_name = '${ORG_B}'`);
  check('orgs get on the root path ($.organizations object) by org_name', r.rows && r.rows.length === 1 && r.rows[0].name === ORG_B, r.err || JSON.stringify(r.rows));

  // --- org_name from NGC_ORG via the path-level server template
  mark = log.length;
  r = await runSql('SELECT name, framework FROM nvidia.private_registry.models');
  check('models list with org_name from NGC_ORG (no WHERE) -> /v2/org/<NGC_ORG>/models, 2 rows via $.models', r.rows && r.rows.length === 2 && calls(mark, 'GET', `/v2/org/${ORG_A}/models`).length > 0, r.err || `rows ${r.rows?.length}; calls ${JSON.stringify(log.slice(mark).map((e) => e.path))}`);
  mark = log.length;
  r = await runSql(`SELECT name FROM nvidia.private_registry.models WHERE org_name = '${ORG_B}'`);
  check('WHERE org_name beats NGC_ORG (-> /v2/org/ORG_B/models, 1 row)', r.rows && r.rows.length === 1 && r.rows[0].name === 'whisper' && calls(mark, 'GET', `/v2/org/${ORG_B}/models`).length > 0, r.err || JSON.stringify(r.rows));
  r = await runSql('SELECT name FROM nvidia.private_registry.models', { NGC_ORG: undefined });
  check('NGC_ORG unset and no WHERE org_name -> error (no viable server: the org_name variable is unresolved)', r.err && /org_name|viable servers/.test(r.err), r.err || JSON.stringify(r.rows));
  mark = log.length;
  r = await runSql(`SELECT name, org_name FROM nvidia.private_registry.models WHERE team_name = '${TEAM}'`);
  check('team_name routes to the *_by_team twin (/v2/org/ORG_A/team/TEAM/models)', r.rows && r.rows.length === 1 && r.rows[0].name === 'team-model' && calls(mark, 'GET', `/v2/org/${ORG_A}/team/${TEAM}/models`).length > 0, r.err || JSON.stringify(log.slice(mark).map((e) => e.path)));
  mark = log.length;
  r = await runSql("SELECT name, display_name, latest_version_id_str FROM nvidia.private_registry.models WHERE model_name = 'resnet50'");
  check('models get unwraps $.model (WHERE model_name)', r.rows && r.rows.length === 1 && r.rows[0].display_name === 'Mock resnet50' && calls(mark, 'GET', `/v2/org/${ORG_A}/models/resnet50`).length > 0, r.err || JSON.stringify(r.rows));

  // --- kebab query parameters via nativeCasing (resolve_labels -> resolve-labels)
  mark = log.length;
  r = await runSql("SELECT name FROM nvidia.private_registry.models WHERE resolve_labels = 'true'");
  const rl = calls(mark, 'GET', `/v2/org/${ORG_A}/models`);
  check('snake WHERE key on a kebab wire param (resolve_labels -> resolve-labels=true)', r.rows && r.rows.length === 2 && rl.length > 0 && rl[0].query['resolve-labels'] === 'true', r.err || JSON.stringify(rl.map((c) => c.query)));

  // --- model versions ($.modelVersions list, $.modelVersion get)
  r = await runSql("SELECT id, version_id, status FROM nvidia.private_registry.model_versions WHERE model_name = 'resnet50'");
  check('model_versions list unwraps $.modelVersions (2 rows; numeric id, string version_id)', r.rows && r.rows.length === 2 && /"version_id":"1\.0"/.test(r.text || '') && /"version_id":"1\.1"/.test(r.text || '') && has(r.rows, 'id', 101), r.err || JSON.stringify(r.rows));
  r = await runSql("SELECT id, version_id, gpu_model FROM nvidia.private_registry.model_versions WHERE model_name = 'resnet50' AND version_id = '1.1'");
  check('model_versions get unwraps $.modelVersion (resource-named property wins over $.model)', r.rows && r.rows.length === 1 && /"version_id":"1\.1"/.test(r.text || '') && r.rows[0].id === 102 && r.rows[0].gpu_model === 'A100', r.err || JSON.stringify(r.rows));

  // --- registry model lifecycle: INSERT (camelCase body via nativeCasing), UPDATE, DELETE via artifacts
  mark = log.length;
  r = await runSql("INSERT INTO nvidia.private_registry.models (name, display_name, framework, precision, application, short_description) SELECT 'it-model', 'IT Model', 'PyTorch', 'FP16', 'Inference', 'created by the integration test'");
  const post = calls(mark, 'POST', `/v2/org/${ORG_A}/models`);
  check('model INSERT -> POST with camelCase body (displayName, shortDescription)', !r.err && post.length === 1 && post[0].body.displayName === 'IT Model' && post[0].body.shortDescription === 'created by the integration test' && post[0].body.framework === 'PyTorch', r.err || JSON.stringify(post.map((c) => c.body)));
  r = await runSql("SELECT name, display_name FROM nvidia.private_registry.models WHERE model_name = 'it-model'");
  check('model visible after INSERT', r.rows && r.rows.length === 1 && r.rows[0].display_name === 'IT Model', r.err || JSON.stringify(r.rows));
  mark = log.length;
  r = await runSql("UPDATE nvidia.private_registry.models SET display_name = 'IT Model v2' WHERE model_name = 'it-model'");
  const patch = calls(mark, 'PATCH', `/v2/org/${ORG_A}/models/it-model`);
  check('model UPDATE -> PATCH with {displayName}', !r.err && patch.length === 1 && patch[0].body.displayName === 'IT Model v2', r.err || JSON.stringify(patch.map((c) => c.body)));
  r = await runSql("SELECT display_name FROM nvidia.private_registry.models WHERE model_name = 'it-model'");
  check('model reflects UPDATE', r.rows && r.rows[0]?.display_name === 'IT Model v2', r.err || JSON.stringify(r.rows));
  mark = log.length;
  r = await runSql("DELETE FROM nvidia.private_registry.models WHERE model_name = 'it-model'");
  check('model DELETE (SDK-evidenced operation) -> DELETE /v2/org/ORG_A/models/it-model', !r.err && calls(mark, 'DELETE', `/v2/org/${ORG_A}/models/it-model`).length === 1, r.err || JSON.stringify(log.slice(mark).map((e) => `${e.method} ${e.path}`)));
  r = await runSql('SELECT name FROM nvidia.private_registry.models');
  check('model gone after DELETE', r.rows && !has(r.rows, 'name', 'it-model'), r.err || JSON.stringify(r.rows));

  // --- catalog: public reads (envelope + bare array)
  r = await runSql('SELECT name, org_name, can_guest_download FROM nvidia.catalog.models');
  check('catalog models list ($.models, no org scope)', r.rows && r.rows.length === 2 && has(r.rows, 'name', 'llama-3.1-8b-instruct'), r.err || JSON.stringify(r.rows));
  r = await runSql("SELECT name, display_name FROM nvidia.catalog.models WHERE org_name = 'nvidia' AND model_name = 'nemotron-4-340b'");
  check('catalog model get ($.model) by org_name + model_name path params', r.rows && r.rows.length === 1 && r.rows[0].display_name === 'Mock nemotron-4-340b', r.err || JSON.stringify(r.rows));
  r = await runSql('SELECT display_name, pci_device_id, memory_size_gb FROM nvidia.catalog.gpus');
  check('catalog gpus (bare array wrapped) -> 3 rows with display_name / memory_size_gb', r.rows && r.rows.length === 3 && has(r.rows, 'display_name', 'H100') && r.rows[0].memory_size_gb === 80, r.err || JSON.stringify(r.rows));

  // --- NVCF: functions, ids, cluster groups
  r = await runSql('SELECT id, name, status, version_id FROM nvidia.nvcf_functions.functions');
  check('nvcf functions list ($.functions)', r.rows && r.rows.length === 1 && r.rows[0].id === FUNCTION_ID && r.rows[0].status === 'ACTIVE', r.err || JSON.stringify(r.rows));
  r = await runSql('SELECT function_id FROM nvidia.nvcf_functions.function_ids');
  check('function_ids (scalar list transform -> function_id column)', r.rows && r.rows.length === 1 && r.rows[0].function_id === FUNCTION_ID, r.err || JSON.stringify(r.rows));
  r = await runSql("SELECT id, name, json_extract(gpus, '$[0].name') AS first_gpu FROM nvidia.nvcf_deployments.cluster_groups");
  check('cluster_groups ($.clusterGroups) with gpus as JSON (the GPU estate query)', r.rows && r.rows.length === 2 && has(r.rows, 'first_gpu', 'L40') && has(r.rows, 'first_gpu', 'H100'), r.err || JSON.stringify(r.rows));

  // --- NVCF function lifecycle: INSERT function, version get, authorization grants, deployment, delete
  mark = log.length;
  r = await runSql("INSERT INTO nvidia.nvcf_functions.functions (name, inference_url, container_image, api_body_format) SELECT 'it-echo', '/echo', 'nvcr.io/mock/echo:latest', 'CUSTOM'");
  const fnPost = calls(mark, 'POST', '/v2/nvcf/functions');
  check('function INSERT -> POST /v2/nvcf/functions with camelCase body (inferenceUrl, containerImage)', !r.err && fnPost.length === 1 && fnPost[0].body.inferenceUrl === '/echo' && fnPost[0].body.containerImage === 'nvcr.io/mock/echo:latest', r.err || JSON.stringify(fnPost.map((c) => c.body)));
  r = await runSql("SELECT id, version_id, name FROM nvidia.nvcf_functions.functions WHERE name = 'it-echo'");
  const created = r.rows?.find((x) => x.name === 'it-echo');
  check('created function visible in the fleet list', !!created, r.err || JSON.stringify(r.rows));
  if (created) {
    r = await runSql(`SELECT name, status, inference_url FROM nvidia.nvcf_functions.function_versions WHERE function_id = '${created.id}' AND function_version_id = '${created.version_id}'`);
    check('function_versions get ($.function) by function_id + function_version_id', r.rows && r.rows.length === 1 && r.rows[0].inference_url === '/echo', r.err || JSON.stringify(r.rows));

    // authorizations: grants-as-data
    mark = log.length;
    r = await runSql(`INSERT INTO nvidia.nvcf_functions.authorizations (function_id, authorized_party) SELECT '${created.id}', '{"ncaId": "nca-partner-0002"}'`);
    const addCall = calls(mark, 'PATCH', `/v2/nvcf/authorizations/functions/${created.id}/add`);
    check('authorization INSERT -> PATCH .../add with {authorizedParty: {ncaId}}', !r.err && addCall.length === 1 && addCall[0].body.authorizedParty?.ncaId === 'nca-partner-0002', r.err || JSON.stringify(addCall.map((c) => c.body)));
    r = await runSql(`SELECT id, json_extract(authorized_parties, '$[0].ncaId') AS party FROM nvidia.nvcf_functions.authorizations WHERE function_id = '${created.id}'`);
    check('authorizations list ($.functions) shows the grant', r.rows && r.rows.length === 1 && r.rows[0].party === 'nca-partner-0002', r.err || JSON.stringify(r.rows));
    mark = log.length;
    r = await runSql(`DELETE FROM nvidia.nvcf_functions.authorizations WHERE function_id = '${created.id}' AND authorized_party = '{"ncaId": "nca-partner-0002"}'`);
    check('authorization DELETE -> PATCH .../remove', !r.err && calls(mark, 'PATCH', `/v2/nvcf/authorizations/functions/${created.id}/remove`).length === 1, r.err || JSON.stringify(log.slice(mark).map((e) => `${e.method} ${e.path}`)));

    // deployment round trip (deployment specifications as a JSON blob)
    mark = log.length;
    r = await runSql(`INSERT INTO nvidia.nvcf_deployments.deployments (function_id, function_version_id, deployment_specifications) SELECT '${created.id}', '${created.version_id}', '[{"gpu": "L40", "backend": "GFN", "instanceType": "GCP.GPU.L40_1x", "minInstances": 1, "maxInstances": 1}]'`);
    const depPost = calls(mark, 'POST', `/v2/nvcf/deployments/functions/${created.id}/versions/${created.version_id}`);
    check('deployment INSERT -> POST with deploymentSpecifications array', !r.err && depPost.length === 1 && Array.isArray(depPost[0].body.deploymentSpecifications) && depPost[0].body.deploymentSpecifications[0].gpu === 'L40', r.err || JSON.stringify(depPost.map((c) => c.body)));
    r = await runSql(`SELECT deployment_id, function_status, json_extract(deployment_specifications, '$[0].gpu') AS gpu FROM nvidia.nvcf_deployments.deployments WHERE function_id = '${created.id}' AND function_version_id = '${created.version_id}'`);
    check('deployment get ($.deployment) with the spec blob', r.rows && r.rows.length === 1 && r.rows[0].gpu === 'L40' && r.rows[0].function_status === 'DEPLOYING', r.err || JSON.stringify(r.rows));
    r = await runSql(`DELETE FROM nvidia.nvcf_deployments.deployments WHERE function_id = '${created.id}' AND function_version_id = '${created.version_id}'`);
    check('deployment DELETE', !r.err, r.err);

    // queue details on the second host (api.nvcf.nvidia.com)
    mark = log.length;
    r = await runSql(`SELECT function_version_id, function_status, queue_depth FROM nvidia.nvcf_queues.queues WHERE function_id = '${created.id}'`);
    check('queues list ($.queues) on the nvcf host', r.rows && r.rows.length === 1 && r.rows[0].queue_depth === 0 && calls(mark, 'GET', `/v2/nvcf/queues/functions/${created.id}`).length === 1, r.err || JSON.stringify(r.rows));

    // polling invocation: EXEC with an opaque JSON body, then the status SELECT
    mark = log.length;
    r = await runSql(`EXEC nvidia.nvcf_invocation.invocations.invoke @function_id = '${created.id}', @body = '{"prompt": "hello"}'`);
    const inv = calls(mark, 'POST', `/v2/nvcf/pexec/functions/${created.id}`);
    check('invoke EXEC -> POST /v2/nvcf/pexec/functions/{id} with the body JSON verbatim', !r.err && inv.length === 1 && inv[0].body?.prompt === 'hello', r.err || JSON.stringify(inv.map((c) => c.body)));

    r = await runSql(`DELETE FROM nvidia.nvcf_functions.function_versions WHERE function_id = '${created.id}' AND function_version_id = '${created.version_id}'`);
    check('function version DELETE (204)', !r.err, r.err);
    r = await runSql('SELECT name FROM nvidia.nvcf_functions.functions');
    check('function gone after DELETE', r.rows && !has(r.rows, 'name', 'it-echo'), r.err || JSON.stringify(r.rows));
  }
  r = await runSql(`SELECT response FROM nvidia.nvcf_invocation.invocation_status WHERE request_id = '${REQUEST_ID}'`);
  check('invocation_status SELECT wraps the raw response body into a response column', r.rows && r.rows.length === 1 && /"result"/.test(String(r.rows[0].response)), r.err || JSON.stringify(r.rows));

  // --- 404 surfaced
  r = await runSql("SELECT name FROM nvidia.private_registry.models WHERE model_name = 'does-not-exist'");
  check('404 surfaced as an error', r.err && /404/.test(r.err), r.err || JSON.stringify(r.rows));
} finally {
  server.close();
}

const failed = results.filter((x) => !x.pass);
console.log(`\n${results.length - failed.length}/${results.length} passed in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
process.exit(failed.length ? 1 : 0);
