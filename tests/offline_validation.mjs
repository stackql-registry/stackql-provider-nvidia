#!/usr/bin/env node

// Quick offline validation of the generated provider against the local file
// registry - no network, no server. Runs SHOW SERVICES / SHOW RESOURCES /
// SHOW METHODS and DESCRIBE EXTENDED over representative resources and
// asserts expected counts and mappings, including the x-stackQL-envVar
// behaviour of the org_name server variable (NGC_ORG). Exit 1 on any
// failure.
//
// Usage: node tests/offline_validation.mjs
// Binary resolution: $STACKQL, ./stackql(.exe), then PATH.

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const regPath = path.join(repoRoot, 'provider-dev', 'openapi').replace(/\\/g, '/');
const registry = JSON.stringify({ url: `file://${regPath}`, localDocRoot: regPath, verifyConfig: { nopVerify: true } });

function findBinary() {
  if (process.env.STACKQL && fs.existsSync(process.env.STACKQL)) return process.env.STACKQL;
  for (const name of ['stackql', 'stackql.exe']) {
    const local = path.join(repoRoot, name);
    if (fs.existsSync(local)) return local;
  }
  return 'stackql'; // PATH
}
const bin = findBinary();

function runSql(sql, envOverrides = {}) {
  return new Promise((resolve) => {
    const env = { ...process.env, ...envOverrides };
    for (const [k, v] of Object.entries(envOverrides)) if (v === undefined) delete env[k];
    const child = spawn(bin, [`--registry=${registry}`, 'exec', sql, '--output', 'json'], { cwd: repoRoot, env });
    let stdout = '', stderr = '';
    child.stdout.on('data', (d) => (stdout += d));
    child.stderr.on('data', (d) => (stderr += d));
    child.on('close', (code) => {
      let rows = [];
      try { rows = JSON.parse(stdout) ?? []; } catch { rows = []; }
      resolve({ code, rows, stdout, stderr });
    });
    child.on('error', (err) => resolve({ code: -1, rows: [], stdout: '', stderr: String(err) }));
  });
}

const results = [];
function check(name, cond, note = '') {
  results.push({ name, pass: !!cond, note });
  console.log(`  ${cond ? 'PASS' : 'FAIL'}  ${name}${cond ? '' : `  [${String(note).slice(0, 220)}]`}`);
}
const names = (rows) => rows.map((x) => x.name).sort();
const cols = (rows) => rows.map((c) => c.name);

const EXPECTED_SERVICES = ['catalog', 'nvcf_deployments', 'nvcf_functions', 'nvcf_invocation', 'nvcf_queues', 'orgs', 'private_registry'];
const EXPECTED_RESOURCES = {
  catalog: ['artifact_deployment_params', 'artifact_files', 'artifact_specs', 'artifacts', 'collection_artifacts', 'collections', 'csp_deployment_params', 'csp_deployment_params_meta', 'csps', 'gpus', 'helm_chart_versions', 'model_files', 'model_versions', 'models', 'nim_metadata', 'recipe_files', 'recipe_versions', 'recipes', 'resource_files', 'resource_versions', 'resources'],
  nvcf_deployments: ['cluster_groups', 'deployment_gpu_specs', 'deployments', 'recognized_registries', 'registry_credentials', 'telemetries', 'telemetry_secrets'],
  nvcf_functions: ['authorizations', 'function_ids', 'function_metadata', 'function_ratelimits', 'function_secrets', 'function_versions', 'functions'],
  nvcf_invocation: ['assets', 'invocation_status', 'invocations', 'tokens'],
  nvcf_queues: ['queue_positions', 'queues'],
  orgs: ['current_user', 'orgs', 'proto_orgs', 'roles', 'team_invitations', 'team_member_roles', 'team_members', 'teams', 'user_invitations', 'user_roles', 'users'],
  private_registry: ['artifact_catalog_flags', 'artifact_collections', 'artifact_deployment_params', 'artifact_deployments', 'artifact_files', 'artifact_product_shares', 'artifact_shares', 'artifact_signatures', 'artifact_specs', 'artifact_version_configs', 'artifact_versions', 'artifacts', 'collection_artifacts', 'collection_product_shares', 'collections', 'encryption_keys', 'helm_chart_versions', 'license_acceptances', 'model_encryption_keys', 'model_files', 'model_shares', 'model_versions', 'models', 'recipe_files', 'recipe_versions', 'recipes', 'repository_associated_models', 'resource_files', 'resource_versions', 'resources', 'workflows']
};
const NO_ENV = { NGC_ORG: undefined };
const WITH_ENV = { NGC_ORG: 'mock-org' };

console.log(`stackql: ${bin}`);
let r = await runSql('SHOW SERVICES IN nvidia');
check('SHOW SERVICES (7)', r.rows.length === 7 && JSON.stringify(names(r.rows)) === JSON.stringify(EXPECTED_SERVICES), r.stderr || JSON.stringify(names(r.rows)));

let resourceTotal = 0;
for (const [svc, expected] of Object.entries(EXPECTED_RESOURCES)) {
  r = await runSql(`SHOW RESOURCES IN nvidia.${svc}`);
  resourceTotal += r.rows.length;
  check(`SHOW RESOURCES IN nvidia.${svc} (${expected.length})`, JSON.stringify(names(r.rows)) === JSON.stringify(expected), r.stderr || JSON.stringify(names(r.rows)));
}
check('83 resources in total', resourceTotal === 83, String(resourceTotal));

// org_name server variable: required only when NGC_ORG is unset
r = await runSql('SHOW METHODS IN nvidia.private_registry.models', NO_ENV);
let m = Object.fromEntries(r.rows.map((x) => [x.MethodName, x]));
check('private_registry.models methods (8: list/get/create/update + _by_team twins)', r.rows.length === 8 && ['list', 'get', 'create', 'update', 'list_by_team', 'get_by_team', 'create_by_team', 'update_by_team'].every((k) => m[k]), JSON.stringify(Object.keys(m)));
check('models.list requires org_name when NGC_ORG is unset; get requires model_name + org_name; list_by_team adds team_name',
  m.list?.RequiredParams === 'org_name' && /model_name/.test(m.get?.RequiredParams) && /org_name/.test(m.get?.RequiredParams) && /team_name/.test(m.list_by_team?.RequiredParams) && /org_name/.test(m.list_by_team?.RequiredParams), JSON.stringify([m.list, m.get, m.list_by_team]));
check('models verbs (list/get SELECT, create INSERT, update UPDATE)', m.list?.SQLVerb === 'SELECT' && m.get?.SQLVerb === 'SELECT' && m.create?.SQLVerb === 'INSERT' && m.update?.SQLVerb === 'UPDATE', JSON.stringify(m));
check('models.create requires the body fields framework, name, precision (naive body translate)', ['framework', 'name', 'precision'].every((p) => String(m.create?.RequiredParams || '').includes(p)), JSON.stringify(m.create));
r = await runSql('SHOW METHODS IN nvidia.private_registry.models', WITH_ENV);
m = Object.fromEntries(r.rows.map((x) => [x.MethodName, x]));
check('models: org_name is optional when NGC_ORG is set (x-stackQL-envVar on the path-level server template)', !String(m.list?.RequiredParams || '').trim() && m.get?.RequiredParams === 'model_name' && m.list_by_team?.RequiredParams === 'team_name', JSON.stringify([m.list, m.get, m.list_by_team]));

// orgs: root paths keep org_name as a path parameter; the current user needs nothing
r = await runSql('SHOW METHODS IN nvidia.orgs.orgs', WITH_ENV);
m = Object.fromEntries(r.rows.map((x) => [x.MethodName, x]));
check('orgs.orgs: list (no params), get (org_name, a root path), create INSERT, update UPDATE', !String(m.list?.RequiredParams || '').trim() && m.get?.RequiredParams === 'org_name' && m.create?.SQLVerb === 'INSERT' && m.update?.SQLVerb === 'UPDATE', JSON.stringify(r.rows));
r = await runSql('SHOW METHODS IN nvidia.orgs.users', WITH_ENV);
m = Object.fromEntries(r.rows.map((x) => [x.MethodName, x]));
check('orgs.users: list/get/get_by_starfleet_id SELECT, create INSERT (email), delete DELETE (id)', m.list?.SQLVerb === 'SELECT' && m.get?.RequiredParams === 'user_email_or_id' && /email/.test(m.create?.RequiredParams) && m.delete?.RequiredParams === 'id', JSON.stringify(r.rows));
r = await runSql('SHOW METHODS IN nvidia.orgs.team_members', WITH_ENV);
m = Object.fromEntries(r.rows.map((x) => [x.MethodName, x]));
check('orgs.team_members: list/get by team_name, add INSERT, remove DELETE (Private Registry team scoping, exempt from the 2026-09 schedule)', m.list?.RequiredParams === 'team_name' && m.add?.SQLVerb === 'INSERT' && m.remove?.SQLVerb === 'DELETE', JSON.stringify(r.rows));

// NVCF: no org scope (the personal key implies the org); two hosts by service
r = await runSql('SHOW METHODS IN nvidia.nvcf_functions.functions');
m = Object.fromEntries(r.rows.map((x) => [x.MethodName, x]));
check('nvcf_functions.functions: list (no params) SELECT, create INSERT requiring inference_url + name', !String(m.list?.RequiredParams || '').trim() && /inference_url/.test(m.create?.RequiredParams) && /name/.test(m.create?.RequiredParams), JSON.stringify(r.rows));
r = await runSql('SHOW METHODS IN nvidia.nvcf_functions.function_versions');
m = Object.fromEntries(r.rows.map((x) => [x.MethodName, x]));
check('function_versions: list (function_id), get (function_id + function_version_id), create INSERT, update UPDATE, delete DELETE', m.list?.RequiredParams === 'function_id' && /function_version_id/.test(m.get?.RequiredParams) && m.create?.SQLVerb === 'INSERT' && m.update?.SQLVerb === 'UPDATE' && m.delete?.SQLVerb === 'DELETE', JSON.stringify(r.rows));
r = await runSql('SHOW METHODS IN nvidia.nvcf_functions.authorizations');
m = Object.fromEntries(r.rows.map((x) => [x.MethodName, x]));
check('authorizations (grants-as-data): list SELECT, add INSERT, remove DELETE, set REPLACE, delete_all EXEC', m.list?.SQLVerb === 'SELECT' && m.add?.SQLVerb === 'INSERT' && m.remove?.SQLVerb === 'DELETE' && m.set?.SQLVerb === 'REPLACE' && m.delete_all?.SQLVerb === 'EXEC', JSON.stringify(r.rows));
r = await runSql('SHOW METHODS IN nvidia.nvcf_deployments.deployments');
m = Object.fromEntries(r.rows.map((x) => [x.MethodName, x]));
check('deployments: get/get_by_id SELECT, create INSERT (deployment_specifications), update UPDATE, delete DELETE', m.get?.SQLVerb === 'SELECT' && m.get_by_id?.RequiredParams === 'deployment_id' && /deployment_specifications/.test(m.create?.RequiredParams) && m.update?.SQLVerb === 'UPDATE' && m.delete?.SQLVerb === 'DELETE', JSON.stringify(r.rows));
r = await runSql('SHOW METHODS IN nvidia.nvcf_invocation.invocations');
m = Object.fromEntries(r.rows.map((x) => [x.MethodName, x]));
check('invocations: invoke / invoke_version are EXEC taking function_id and body (opaque JSON body wrapper)', m.invoke?.SQLVerb === 'EXEC' && /function_id/.test(m.invoke?.RequiredParams) && /body/.test(m.invoke?.RequiredParams) && m.invoke_version?.SQLVerb === 'EXEC', JSON.stringify(r.rows));

// DESCRIBE EXTENDED on the representative resources (snake_case aliases of the camelCase wire)
r = await runSql('DESCRIBE EXTENDED nvidia.private_registry.models');
check('DESCRIBE private_registry.models projects the Model entity (name, display_name, framework, latest_version_id_str, updated_date)', ['name', 'display_name', 'framework', 'latest_version_id_str', 'updated_date'].every((c) => cols(r.rows).includes(c)) && !cols(r.rows).includes('request_status'), r.stderr || JSON.stringify(cols(r.rows)));
r = await runSql('DESCRIBE EXTENDED nvidia.nvcf_functions.functions');
check('DESCRIBE nvcf_functions.functions (id, name, status, version_id, container_image, inference_url)', ['id', 'name', 'status', 'version_id', 'container_image', 'inference_url'].every((c) => cols(r.rows).includes(c)), r.stderr || JSON.stringify(cols(r.rows)));
r = await runSql('DESCRIBE EXTENDED nvidia.nvcf_deployments.cluster_groups');
check('DESCRIBE cluster_groups (id, name, gpus, clusters, nca_id - the GPU estate)', ['id', 'name', 'gpus', 'clusters', 'nca_id'].every((c) => cols(r.rows).includes(c)), r.stderr || JSON.stringify(cols(r.rows)));
r = await runSql('DESCRIBE EXTENDED nvidia.catalog.gpus');
check('DESCRIBE catalog.gpus projects the GPU catalog rows (display_name, pci_device_id, memory_size_gb)', ['display_name', 'pci_device_id', 'memory_size_gb'].every((c) => cols(r.rows).includes(c)) && !cols(r.rows).includes('column_anon'), r.stderr || JSON.stringify(cols(r.rows)));
r = await runSql('DESCRIBE EXTENDED nvidia.nvcf_functions.function_ids');
check('DESCRIBE function_ids (scalar list re-shaped to a function_id column)', JSON.stringify(cols(r.rows)) === JSON.stringify(['function_id']), r.stderr || JSON.stringify(cols(r.rows)));
r = await runSql('DESCRIBE EXTENDED nvidia.orgs.users');
check('DESCRIBE orgs.users (email, name, roles)', ['email', 'name', 'roles'].every((c) => cols(r.rows).includes(c)), r.stderr || JSON.stringify(cols(r.rows)));
r = await runSql('DESCRIBE EXTENDED nvidia.orgs.orgs');
check('DESCRIBE orgs.orgs (name, display_name, id, type)', ['name', 'display_name', 'id', 'type'].every((c) => cols(r.rows).includes(c)), r.stderr || JSON.stringify(cols(r.rows)));
r = await runSql('DESCRIBE EXTENDED nvidia.nvcf_invocation.invocations');
check('DESCRIBE invocations is not selectable (EXEC is the surface)', /not supported/i.test(r.stdout + r.stderr), r.stdout);

const failed = results.filter((x) => !x.pass);
console.log(`\n${results.length - failed.length}/${results.length} passed`);
if (failed.length) process.exit(1);
