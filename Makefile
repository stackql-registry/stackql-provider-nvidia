# StackQL nvidia (NVIDIA NGC + NVIDIA Cloud Functions) provider build pipeline.
#
# Every step is deterministic and re-runnable; manual mapping decisions live
# in provider-dev/scripts, never in hand-edited artifacts. `make all` runs
# the full chain: fetch upstream specs (fails on drift against the pin) ->
# clean -> inventory -> split -> mappings -> pre-normalize -> normalize ->
# generate -> post-process -> offline + integration + meta-route tests ->
# docs -> website build. `make upgrade` is the same chain but accepts
# upstream changes (re-pins the specs) - review the resulting diff.
# `make smoke*` (live, needs credentials) is separate so `all` never
# touches a real account.
#
# Requirements: Node >= 20, GNU make, a stackql binary ($STACKQL, ./stackql
# or on PATH), Python 3 (a venv with pystackql is created on demand for the
# smoke suite), yarn for the website. Runs under Linux / WSL / macOS.
#
# Live credentials for the smoke suite (never committed - .env is
# gitignored; the smoke targets source it if present; see .env.example):
#   NGC_API_KEY   NGC Personal API Key (bearer) - the Terraform provider variable
#   NGC_ORG       NGC organization name (x-stackQL-envVar target for org_name)
#   NGC_TEAM      optional team for the *_by_team registry methods

SHELL := bash
.DEFAULT_GOAL := help

PROVIDER := nvidia
SERVICES_DIR := provider-dev/openapi/src/$(PROVIDER)
# Bearer auth from NGC_API_KEY; snake_case_aliases presents the camelCase
# wire properties (displayName, createdDate, ...) as snake_case columns,
# paired with request.nativeCasing (camel / kebab per method, set in
# post_process) so snake_case WHERE keys and body columns resolve.
PROVIDER_CONFIG := {"auth": {"type": "bearer", "credentialsenvvar": "NGC_API_KEY"}, "snake_case_aliases": true}
# NOTE: servers are per service (two hosts) and org-scoped paths ride a
# path-level server template - both come from the endpoint inventory (split
# + post_process), so no --servers / --service-config is passed here.
VENV := .venv
PY := $(VENV)/bin/python
ENV_FILE := .env

.PHONY: help deps fetch-specs refresh-specs pin-check clean-specs inventory split mappings pre-normalize normalize generate post-process build \
        test-offline test-integration test-meta test venv smoke smoke-live smoke-read-only smoke-nvcf smoke-cleanup \
        docs website website-start clean all upgrade

help: ## show this help
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-18s %s\n", $$1, $$2}'

deps: ## install node dependencies (latest @stackql/provider-utils + @stackql/pgwire-lite per package.json ranges)
	npm install

# ---------------------------------------------------------------- pipeline

fetch-specs: ## download the NVCF spec, harvest the NGC definitions + ngcsdk schemas, and verify against the pins (fails on drift)
	npm run fetch-specs -- --check

refresh-specs: ## download everything and ACCEPT the upstream change (rewrites the pins - review the diff)
	npm run fetch-specs

pin-check: ## verify the committed downloads against provider-dev/config/spec_pin.json (no network)
	npm run pin-specs -- --check

clean-specs: ## deterministic spec repairs (v2 gateway prefix, snake_case path params, SDK response injection) + swagger-parser validation
	npm run clean-specs

inventory: ## build provider-dev/config/endpoint_inventory.csv from the cleaned specs (every operation classified or skip-coded)
	npm run build-inventory

split: ## split the cleaned specs into per-service specs on their hosts, org-scoped paths rebased (provider-dev/source)
	npm run split -- --provider-name $(PROVIDER) --overwrite

mappings: ## regenerate all_services.csv from scratch and apply the inventory mappings (fails on unmapped ops; prints the mapping diff)
	rm -f provider-dev/config/all_services.csv
	npm run generate-mappings -- --provider-name $(PROVIDER) --input-dir provider-dev/source --output-dir provider-dev/config
	npm run map-operations

pre-normalize: ## nvidia-specific spec adjustments before the generic normalize pass
	npm run pre-normalize

normalize: ## generic provider-utils normalize pass (allOf flatten, opaque objects, param lifting, bare-array wrap)
	npm run normalize -- --api-dir provider-dev/source

generate: ## generate the provider (bearer auth, snake_case aliases, naive request body translate)
	rm -rf provider-dev/openapi/*
	npm run generate-provider -- \
	  --provider-name $(PROVIDER) \
	  --input-dir provider-dev/source \
	  --output-dir $(SERVICES_DIR) \
	  --config-path provider-dev/config/all_services.csv \
	  --provider-config '$(PROVIDER_CONFIG)' \
	  --naive-req-body-translate \
	  --overwrite
	$(MAKE) post-process

post-process: ## re-apply generated-provider fixes (org server templates + NGC_ORG, casing, pagination, LIMIT pushdown, objectKeys)
	npm run post-process

build: pin-check clean-specs inventory split mappings pre-normalize normalize generate ## full spec -> provider pipeline from the committed pins

# ------------------------------------------------------------------- tests

test-offline: ## quick offline validation against the local file registry (SHOW / DESCRIBE, NGC_ORG behaviour)
	npm run test-offline

test-integration: ## row-level integration tests against the mock NGC + NVCF servers (no account required)
	npm run test-integration

test-meta: ## meta-route suite against a local stackql server (walks every service/resource/method)
	npm run start-server -- --provider $(PROVIDER) --registry "$$(pwd)/provider-dev/openapi"
	npm run test-meta-routes -- $(PROVIDER) || (npm run stop-server; exit 1)
	npm run stop-server

test: test-offline test-integration test-meta ## all non-live test layers

$(VENV)/bin/activate:
	python3 -m venv $(VENV)
	$(VENV)/bin/pip install --quiet --upgrade pip pystackql

venv: $(VENV)/bin/activate ## create the python venv with pystackql for the smoke suite

# smoke targets source .env when present so a developer checkout works
# without exporting anything; CI sets variables from secrets.
with_env = set -a; [ -f $(ENV_FILE) ] && source <(tr -d '\r' < $(ENV_FILE)); set +a;

smoke: venv ## live smoke suite with the locally generated provider - catalog + org/registry reads, cheap write lifecycles (needs NGC_API_KEY, NGC_ORG)
	@$(with_env) $(PY) tests/smoke_test.py

smoke-live: venv ## live smoke suite against the PUBLISHED provider in the stackql registry (post-publish verification)
	@$(with_env) $(PY) tests/smoke_test.py --live

smoke-read-only: venv ## live read smokes only, no writes
	@$(with_env) $(PY) tests/smoke_test.py --read-only

smoke-nvcf: venv ## live suite INCLUDING the gated NVCF function deploy lifecycle (billable GPU minutes, smallest instance, always torn down)
	@$(with_env) $(PY) tests/smoke_test.py --with-nvcf-deploy

smoke-cleanup: venv ## sweep stackql-smoke-* breadcrumbs (functions, registry artifacts) and exit
	@$(with_env) $(PY) tests/smoke_test.py --cleanup-only

# -------------------------------------------------------------------- docs

docs: ## generate the website docs (snake_case surface), then sanitize for MDX v3
	npm run generate-docs -- \
	  --provider-name $(PROVIDER) \
	  --provider-dir ./$(SERVICES_DIR)/v00.00.00000 \
	  --output-dir ./website \
	  --provider-data-dir ./provider-dev/docgen/provider-data \
	  --snake-case-aliases
	npm run sanitize-docs

website: ## build the docusaurus microsite (vendors shared config first)
	cd website && yarn install && yarn build

website-start: ## run the docusaurus dev server
	cd website && yarn install && yarn start

clean: ## remove regenerable artifacts (provider output, docs, website build, test registry copy)
	rm -rf provider-dev/openapi/* website/build website/.docusaurus website/docs tests/integration/.registry-tmp

all: deps fetch-specs build test docs website ## everything non-live: deps, upstream drift check, pipeline, tests, docs, site build

upgrade: deps refresh-specs build test docs website ## accept upstream spec changes (re-pin), then the full pipeline, tests, docs and site build
