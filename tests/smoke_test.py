#!/usr/bin/env python3
"""pystackql smoke test for the nvidia (NVIDIA NGC + NVCF) stackql provider.

Exercises the salient resources against a real NGC organization, tiered by
what the credentials can reach:

  tier 1  public catalog reads (models, GPU catalog) - no org needed
  tier 2  organization and private registry reads (orgs, current user,
          users, teams, registry models, team-scoped twins when NGC_TEAM is
          set) and a cheap, self-cleaning registry model INSERT / UPDATE /
          DELETE lifecycle (metadata only - free)
  tier 3  NVCF reads (functions, function ids, cluster groups and GPUs)
          and a function INSERT / version get / authorization list / DELETE
          lifecycle (creating an undeployed function is free). The suite
          detects Cloud Functions enablement from the cluster-groups read and
          skips tier 3 with a notice when the org is not enabled or the key
          lacks the organization-level Cloud Functions scope.
  gated   --with-nvcf-deploy: deploy the smoke function on the smallest
          instance type of the first cluster group, wait for it to become
          ACTIVE, then delete the deployment. Billable GPU minutes (well
          under $1); needs NVCF_SMOKE_CONTAINER_IMAGE (an image in the org's
          private registry, e.g. nvcr.io/<org>/echo:latest). Always torn
          down, even on failure.

Everything created is named `stackql-smoke-<stamp>`; before running, the
script sweeps breadcrumbs with that prefix (registry models, NVCF
functions and their deployments) so each run starts from a clean slate.

Credentials and target org come from the environment, exactly as the
provider itself reads them (the NVIDIA Terraform provider's variables):

    export NGC_API_KEY=nvapi-...   # NGC Personal API Key (bearer)
    export NGC_ORG=0123456789ab    # the test org (x-stackQL-envVar)
    export NGC_TEAM=ml-platform    # optional: exercises the *_by_team methods

Never run this against a production organization.

Usage:
    pip install pystackql
    python tests/smoke_test.py                       # local provider-dev/openapi registry (default)
    python tests/smoke_test.py --live                # the published provider in the stackql registry
    python tests/smoke_test.py --read-only           # read smokes only, no writes
    python tests/smoke_test.py --with-nvcf-deploy    # also the gated NVCF deploy lifecycle
    python tests/smoke_test.py --cleanup-only        # just sweep breadcrumbs
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
import time
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[1]
SMOKE_PREFIX = "stackql-smoke-"
INTER_REQUEST_DELAY_S = 0.5
# x-stackQL-envVar server variable resolution landed in stackql v0.10.601;
# pystackql manages its own stackql binary, so the harness upgrades it when older.
MIN_STACKQL_VERSION = (0, 10, 601)

ERROR_RE = re.compile(
    r"http response status code: [45]|over HTTP error|error assembling|"
    r"cannot find matching operation|FindRoute|no matching operation|"
    r"cannot find any viable servers|parser error|panic|"
    r"no request body for operation|schema unsuitable|Unauthorized|Forbidden|UNAUTHORIZED",
    re.I,
)
RATE_LIMIT_RE = re.compile(r"status code: 429|Too Many Requests|rate limit", re.I)
NVCF_DISABLED_RE = re.compile(r"status code: 40[134]|not enabled|not authorized|UNAUTHORIZED|Forbidden", re.I)


class Smoke:
    def __init__(self, args: argparse.Namespace) -> None:
        self.args = args
        self.stamp = str(int(time.time()))[-6:]
        self.name = f"{SMOKE_PREFIX}{self.stamp}"
        self.results: list[tuple[str, str, str]] = []
        self.requests = 0
        self.nvcf_enabled: bool | None = None

        for var in ("NGC_API_KEY", "NGC_ORG"):
            if not os.environ.get(var):
                sys.exit(f"{var} is not set - see the module docstring")
        self.org = os.environ["NGC_ORG"]
        self.team = os.environ.get("NGC_TEAM") or ""

        from pystackql import StackQL

        if not args.live:
            reg_path = (BASE_DIR / "provider-dev" / "openapi").resolve()
            reg_url = "file://" + reg_path.as_posix()
            self.sq = StackQL(output="dict", custom_registry=reg_url)
            # pystackql only serialises {"url": ...}; a local file registry
            # additionally needs localDocRoot + nopVerify - patch the exec
            # params in place (compact JSON, shell-quoted).
            full = json.dumps(
                {"url": reg_url, "localDocRoot": reg_path.as_posix(), "verifyConfig": {"nopVerify": True}},
                separators=(",", ":"),
            )
            if sys.platform.startswith("win"):
                quoted = '"' + full.replace('"', '\\"') + '"'
            else:
                import shlex
                quoted = shlex.quote(full)
            params = getattr(getattr(self.sq, "local_query_executor", None), "params", None) or self.sq.params
            for i, p in enumerate(params):
                if p == "--registry":
                    params[i + 1] = quoted
                    break
        else:
            self.sq = StackQL(output="dict")
            self.sq.executeStmt("REGISTRY PULL nvidia")
        self.ensure_stackql_version()

    def ensure_stackql_version(self) -> None:
        def parse(v: str) -> tuple[int, ...]:
            return tuple(int(x) for x in re.findall(r"\d+", str(v))[:3])

        current = parse(getattr(self.sq, "version", "") or "")
        if current and current >= MIN_STACKQL_VERSION:
            return
        print(f"stackql {self.sq.version} is older than v{'.'.join(map(str, MIN_STACKQL_VERSION))} - upgrading pystackql's binary")
        self.sq.upgrade(showprogress=False)
        if parse(self.sq.version) < MIN_STACKQL_VERSION:
            sys.exit(f"stackql {self.sq.version} is still too old after upgrade")

    # ------------------------------------------------------------------ core
    def q(self, sql: str):
        if self.requests:
            time.sleep(INTER_REQUEST_DELAY_S)
        self.requests += 1
        try:
            if sql.lstrip().upper().startswith(("SELECT", "SHOW", "DESCRIBE")) or "RETURNING" in sql.upper():
                out = self.sq.execute(sql)
                # pystackql's execute() swallows an HTTP error on a SELECT into
                # an empty result set (3.8.4); executeStmt() surfaces it as
                # [{"error": ...}] - re-run an empty SELECT that way so a 403
                # can never pass as "no rows"
                if not out:
                    probe = self.sq.executeStmt(sql)
                    if isinstance(probe, list) and probe and isinstance(probe[0], dict) and "error" in probe[0]:
                        out = probe
            else:
                out = self.sq.executeStmt(sql)
        except Exception as exc:  # noqa: BLE001
            return [], str(exc)
        text = json.dumps(out, default=str)
        if RATE_LIMIT_RE.search(text):
            return out if isinstance(out, list) else [out], "RATE LIMITED (429) - harness pacing bug: " + text
        if ERROR_RE.search(text):
            return out if isinstance(out, list) else [out], text
        if isinstance(out, list) and out and isinstance(out[0], dict) and "error" in out[0]:
            return out, text
        return out if isinstance(out, list) else [out], None

    def step(self, name: str, sql: str, expect_rows: bool = False, contains: str | None = None):
        rows, err = self.q(sql)
        if err:
            self.results.append((name, "FAIL", err[:200]))
            print(f"  FAIL  {name}  [{err[:140]}]")
            return None
        blob = json.dumps(rows, default=str)
        if expect_rows and not rows:
            self.results.append((name, "FAIL", "expected rows, got none"))
            print(f"  FAIL  {name}  [no rows]")
            return None
        if contains and contains not in blob:
            self.results.append((name, "FAIL", f"'{contains}' not in result"))
            print(f"  FAIL  {name}  ['{contains}' not in {blob[:100]}]")
            return None
        self.results.append((name, "PASS", ""))
        print(f"  PASS  {name}")
        return rows

    def note(self, name: str, ok: bool, detail: str = "") -> None:
        self.results.append((name, "PASS" if ok else "FAIL", detail))
        print(f"  {'PASS' if ok else 'FAIL'}  {name}{('  [' + detail[:120] + ']') if detail and not ok else ''}")

    def skip(self, name: str, why: str) -> None:
        self.results.append((name, "SKIP", why))
        print(f"  SKIP  {name}  [{why[:120]}]")

    def wait_for(self, name: str, sql: str, pred, timeout: int = 600, interval: int = 15):
        start = time.time()
        last = None
        while time.time() - start < timeout:
            rows, err = self.q(sql)
            last = err or json.dumps(rows, default=str)[:160]
            if not err and pred(rows):
                self.results.append((name, "PASS", f"{int(time.time() - start)}s"))
                print(f"  PASS  {name}  ({int(time.time() - start)}s)")
                return True
            time.sleep(interval)
        self.results.append((name, "FAIL", f"timeout: {last}"))
        print(f"  FAIL  {name}  [timeout: {last}]")
        return False

    # ------------------------------------------------------- breadcrumb sweep
    def cleanup_breadcrumbs(self) -> None:
        print("== breadcrumb sweep ==")
        rows, err = self.q("SELECT name FROM nvidia.private_registry.models")
        if err:
            print(f"  WARN registry sweep list failed: {err[:120]}")
        else:
            for r in rows:
                if str(r.get("name", "")).startswith(SMOKE_PREFIX):
                    print(f"  sweeping registry model {r['name']}")
                    self.q(f"DELETE FROM nvidia.private_registry.models WHERE model_name = '{r['name']}'")
        rows, err = self.q("SELECT id, version_id, name, status FROM nvidia.nvcf_functions.functions")
        if err:
            print(f"  WARN nvcf sweep list failed (NVCF may not be enabled): {err[:120]}")
            return
        for r in rows:
            if str(r.get("name", "")).startswith(SMOKE_PREFIX):
                print(f"  sweeping nvcf function {r['name']} ({r['id']}/{r['version_id']}, {r.get('status')})")
                if str(r.get("status")) not in ("INACTIVE", ""):
                    self.q(f"DELETE FROM nvidia.nvcf_deployments.deployments WHERE function_id = '{r['id']}' AND function_version_id = '{r['version_id']}'")
                self.q(f"DELETE FROM nvidia.nvcf_functions.function_versions WHERE function_id = '{r['id']}' AND function_version_id = '{r['version_id']}'")

    # -------------------------------------------------------------- read path
    def read_smokes(self) -> None:
        print("== tier 1: public catalog ==")
        self.step("show services", "SHOW SERVICES IN nvidia", expect_rows=True, contains="nvcf_functions")
        models = self.step("catalog models (public, paginated, LIMIT pushdown)", "SELECT name, org_name, display_name FROM nvidia.catalog.models LIMIT 5", expect_rows=True)
        if models:
            first = models[0]
            self.step("catalog model get ($.model, by org_name + model_name)", f"SELECT name, display_name, latest_version_id_str FROM nvidia.catalog.models WHERE org_name = '{first['org_name']}' AND model_name = '{first['name']}'", expect_rows=True, contains=str(first["name"]))
            self.step("catalog model versions ($.modelVersions)", f"SELECT version_id, status FROM nvidia.catalog.model_versions WHERE org_name = '{first['org_name']}' AND model_name = '{first['name']}'")
        self.step("catalog GPU catalog (bare array)", "SELECT display_name, pci_device_id, memory_size_gb FROM nvidia.catalog.gpus", expect_rows=True)
        self.step("catalog collections", "SELECT name, org_name, display_name FROM nvidia.catalog.collections LIMIT 5")

        print(f"== tier 2: organization {self.org} ==")
        self.step("current user ($.user)", "SELECT email, name FROM nvidia.orgs.current_user", expect_rows=True)
        self.step("orgs the key can see", "SELECT name, display_name, type FROM nvidia.orgs.orgs", expect_rows=True, contains=self.org)
        self.step("org get (root path, WHERE org_name)", f"SELECT name, display_name FROM nvidia.orgs.orgs WHERE org_name = '{self.org}'", expect_rows=True)
        self.step("org users (NGC_ORG resolved, paginated)", "SELECT email, name, is_active FROM nvidia.orgs.users", expect_rows=True)
        self.step("org teams", "SELECT name, description FROM nvidia.orgs.teams")
        self.step("registry models (NGC_ORG resolved)", "SELECT name, framework, latest_version_id_str, updated_date FROM nvidia.private_registry.models")
        self.step("registry artifacts (helm-charts, generic resource)", "SELECT name, display_name, updated_date FROM nvidia.private_registry.artifacts WHERE artifact_type = 'helm-charts'")
        self.step("registry collections", "SELECT name, display_name FROM nvidia.private_registry.collections")
        if self.team:
            self.step("registry models by team (*_by_team twin)", f"SELECT name FROM nvidia.private_registry.models WHERE team_name = '{self.team}'")
            self.step("team members", f"SELECT email, name FROM nvidia.orgs.team_members WHERE team_name = '{self.team}'")
        else:
            self.skip("registry models by team", "NGC_TEAM not set")

        print("== tier 3: NVCF ==")
        rows, err = self.q("SELECT id, name FROM nvidia.nvcf_deployments.cluster_groups")
        if err and NVCF_DISABLED_RE.search(err):
            self.nvcf_enabled = False
            self.skip("cluster groups / GPU inventory", "Cloud Functions not enabled for this org or key lacks the org-level Cloud Functions scope: " + err[:80])
            return
        if err:
            self.nvcf_enabled = False
            self.note("cluster groups / GPU inventory", False, err)
            return
        self.nvcf_enabled = True
        self.note("cluster groups / GPU inventory (the GPU estate)", True)
        self.step("GPU types per cluster group (json_each over gpus)", "SELECT cg.name AS cluster_group, json_extract(g.value, '$.name') AS gpu FROM nvidia.nvcf_deployments.cluster_groups cg, json_each(cg.gpus) g")
        self.step("nvcf functions (fleet state)", "SELECT id, name, status, version_id FROM nvidia.nvcf_functions.functions")
        self.step("nvcf function ids (scalar list transform)", "SELECT function_id FROM nvidia.nvcf_functions.function_ids")
        self.step("nvcf telemetries", "SELECT telemetry_id, name, provider FROM nvidia.nvcf_deployments.telemetries")
        self.step("nvcf registry credentials", "SELECT name, registry_credential_id FROM nvidia.nvcf_deployments.registry_credentials")

    # ------------------------------------------------------------- write path
    def registry_model_lifecycle(self) -> None:
        name = self.name
        print(f"== registry model lifecycle ({name}) - metadata only, free ==")
        self.step("model INSERT", f"INSERT INTO nvidia.private_registry.models (name, display_name, framework, precision, application, short_description) SELECT '{name}', 'StackQL smoke', 'PyTorch', 'FP16', 'Other', 'created by the stackql smoke suite'")
        rows, err = self.q(f"SELECT name, display_name FROM nvidia.private_registry.models WHERE model_name = '{name}'")
        self.note("model visible after INSERT", not err and bool(rows) and rows[0].get("name") == name, err or "not found")
        self.step("model UPDATE (display_name)", f"UPDATE nvidia.private_registry.models SET display_name = 'StackQL smoke v2' WHERE model_name = '{name}'")
        self.step("model reflects UPDATE", f"SELECT display_name FROM nvidia.private_registry.models WHERE model_name = '{name}'", expect_rows=True, contains="v2")
        self.step("model versions (empty for a new model)", f"SELECT id, status FROM nvidia.private_registry.model_versions WHERE model_name = '{name}'")
        self.step("model DELETE", f"DELETE FROM nvidia.private_registry.models WHERE model_name = '{name}'")
        rows, err = self.q("SELECT name FROM nvidia.private_registry.models")
        self.note("model gone after DELETE", not err and all(r.get("name") != name for r in rows), err or "")

    def nvcf_function_lifecycle(self) -> None:
        name = self.name
        image = os.environ.get("NVCF_SMOKE_CONTAINER_IMAGE") or "nvcr.io/nvidia/nvcf/echo:latest"
        print(f"== nvcf function lifecycle ({name}) - undeployed function, free ==")
        self.step("function INSERT (function + first version)", f"INSERT INTO nvidia.nvcf_functions.functions (name, inference_url, container_image, api_body_format) SELECT '{name}', '/echo', '{image}', 'CUSTOM'")
        rows, err = self.q(f"SELECT id, version_id, status FROM nvidia.nvcf_functions.functions WHERE name = '{name}'")
        fn = next((r for r in rows or [] if r), None)
        self.note("function visible in the fleet list", bool(fn), err or "not found")
        if not fn:
            return
        fid, vid = fn["id"], fn["version_id"]
        try:
            self.step("function version get ($.function)", f"SELECT name, status, inference_url, container_image FROM nvidia.nvcf_functions.function_versions WHERE function_id = '{fid}' AND function_version_id = '{vid}'", expect_rows=True, contains=name)
            self.step("authorizations list (grants-as-data)", f"SELECT id, version_id, authorized_parties FROM nvidia.nvcf_functions.authorizations WHERE function_id = '{fid}'")
            self.step("queue details on api.nvcf.nvidia.com", f"SELECT function_version_id, function_status, queue_depth FROM nvidia.nvcf_queues.queues WHERE function_id = '{fid}'")
            if self.args.with_nvcf_deploy:
                self.nvcf_deploy_lifecycle(fid, vid)
        finally:
            self.step("function version DELETE", f"DELETE FROM nvidia.nvcf_functions.function_versions WHERE function_id = '{fid}' AND function_version_id = '{vid}'")
            rows, err = self.q("SELECT name FROM nvidia.nvcf_functions.functions")
            self.note("function gone after DELETE", not err and all(r.get("name") != name for r in rows), err or "")

    def nvcf_deploy_lifecycle(self, fid: str, vid: str) -> None:
        print("== gated: NVCF deploy lifecycle (smallest instance type, billable minutes) ==")
        if not os.environ.get("NVCF_SMOKE_CONTAINER_IMAGE"):
            self.skip("deployment INSERT", "NVCF_SMOKE_CONTAINER_IMAGE not set (an image in the org's private registry is required to deploy)")
            return
        rows, err = self.q("SELECT name, gpus FROM nvidia.nvcf_deployments.cluster_groups")
        if err or not rows:
            self.note("cluster group for the deployment", False, err or "no cluster groups")
            return
        cg = rows[0]
        gpus = cg["gpus"] if isinstance(cg["gpus"], list) else json.loads(cg["gpus"] or "[]")
        if not gpus or not gpus[0].get("instanceTypes"):
            self.note("cluster group has an instance type", False, json.dumps(cg, default=str)[:120])
            return
        gpu = gpus[0]["name"]
        itype = gpus[0]["instanceTypes"][0]["name"]
        spec = json.dumps([{"gpu": gpu, "backend": cg["name"], "instanceType": itype, "minInstances": 1, "maxInstances": 1}])
        try:
            self.step(f"deployment INSERT ({cg['name']} / {gpu} / {itype})", f"INSERT INTO nvidia.nvcf_deployments.deployments (function_id, function_version_id, deployment_specifications) SELECT '{fid}', '{vid}', '{spec}'")
            self.wait_for("function ACTIVE", f"SELECT function_status FROM nvidia.nvcf_deployments.deployments WHERE function_id = '{fid}' AND function_version_id = '{vid}'", lambda rows: rows and rows[0].get("function_status") == "ACTIVE", timeout=900, interval=20)
        finally:
            self.step("deployment DELETE (always)", f"DELETE FROM nvidia.nvcf_deployments.deployments WHERE function_id = '{fid}' AND function_version_id = '{vid}'")
            self.wait_for("function INACTIVE after undeploy", f"SELECT status FROM nvidia.nvcf_functions.function_versions WHERE function_id = '{fid}' AND function_version_id = '{vid}'", lambda rows: rows and rows[0].get("status") in ("INACTIVE", "ERROR"), timeout=300, interval=15)

    # ---------------------------------------------------------------- summary
    def summary(self) -> int:
        print("\n== summary ==")
        counts = {"PASS": 0, "FAIL": 0, "SKIP": 0}
        for name, status, note in self.results:
            counts[status] = counts.get(status, 0) + 1
            if status != "PASS":
                print(f"  {status:5s} {name}  [{note[:110]}]")
        print(f"  {counts['PASS']} passed, {counts['FAIL']} failed, {counts['SKIP']} skipped; {self.requests} statements "
              f"(registry: {'public' if self.args.live else 'local'}, org: {self.org}, nvcf: {self.nvcf_enabled})")
        return 1 if counts["FAIL"] else 0


def main() -> int:
    ap = argparse.ArgumentParser(description="nvidia provider smoke test")
    ap.add_argument("--live", action="store_true", help="run against the published provider in the stackql registry (default: the local provider-dev/openapi file registry)")
    ap.add_argument("--cleanup-only", action="store_true", help="sweep stackql-smoke-* breadcrumbs and exit")
    ap.add_argument("--read-only", action="store_true", help="read smokes only")
    ap.add_argument("--with-nvcf-deploy", action="store_true", help="also run the gated NVCF deploy lifecycle (billable GPU minutes; needs NVCF_SMOKE_CONTAINER_IMAGE)")
    args = ap.parse_args()

    smoke = Smoke(args)
    print(f"nvidia smoke test  registry={'public' if args.live else 'local'}  org={smoke.org}  team={smoke.team or '-'}  name={smoke.name}  stackql={smoke.sq.version}")
    smoke.cleanup_breadcrumbs()
    if args.cleanup_only:
        return 0
    smoke.read_smokes()
    if not args.read_only:
        smoke.registry_model_lifecycle()
        if smoke.nvcf_enabled:
            smoke.nvcf_function_lifecycle()
        else:
            smoke.skip("nvcf function lifecycle", "Cloud Functions not enabled for this org / key")
    return smoke.summary()


if __name__ == "__main__":
    sys.exit(main())
