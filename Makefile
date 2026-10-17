# StackQL nvidia (NVIDIA NGC + NVIDIA Cloud Functions) provider - build,
# test and docs pipeline.
#
# Every step is deterministic and re-runnable; manual mapping decisions live
# in provider-dev/scripts (classification rules and skip codes in
# build_inventory.mjs, response-class rules and fix classes in
# clean_specs.mjs, passes in pre_normalize.mjs, numbered rules in
# post_process.mjs), never in hand-edited artifacts. `make all` runs the
# full chain:
#   fetch/pin the three upstream inputs -> clean -> inventory -> split
#   service specs -> mappings -> pre-normalize -> normalize -> generate
#   (+ post-process, views, GraphQL merge) -> offline + integration +
#   meta-route tests -> docs -> website.
# `make all` never needs credentials and never bills; the live smoke targets
# (`make smoke*`) are separate and source .env when present. `make upgrade`
# is `all` with the upstream change ACCEPTED (re-pins the inputs - review
# the resulting diff).
#
# One deliberate difference from the template: `build` verifies the
# committed downloads against the pins offline (`pin-check`) instead of
# re-downloading, because the inputs are three documents plus a 2.4 MB PyPI
# wheel; `all` and CI run `fetch-spec` (network, fails on drift) first.
#
# Requirements: Node >= 22.19, GNU make + bash, a stackql binary ($STACKQL,
# ./stackql or on PATH - bin/start-server.sh downloads one if none is found),
# Python 3 (a venv with pystackql is created on demand for the smoke suite),
# yarn for the website. Runs on Linux, macOS or WSL (under WSL keep the venv
# off the DrvFs mount: `make smoke VENV=$HOME/.venvs/stackql-nvidia`).
#
# Live credentials for the smoke suite (never committed - .env is
# gitignored; the smoke targets source it if present; see .env.example):
#   NGC_API_KEY   NGC Personal API Key (bearer) - the Terraform provider variable
#   NGC_ORG       NGC organization name (x-stackQL-envVar target for org_name)
#   NGC_TEAM      optional team for the *_by_team registry methods

SHELL := bash
.DEFAULT_GOAL := help

PROVIDER := nvidia
VERSION := v00.00.00000
OPENAPI_DIR := provider-dev/openapi
SERVICES_DIR := $(OPENAPI_DIR)/src/$(PROVIDER)
PROVIDER_DIR := $(SERVICES_DIR)/$(VERSION)
SOURCE_DIR := provider-dev/source
CONFIG_DIR := provider-dev/config
GRAPHQL_DIR := provider-dev/source-graphql
# The repository docgen links from the Provider Summary on the docs landing
# page (the label is the URL's last path segment). Always this repository's
# URL; override on the command line for a fork hosted elsewhere.
SOURCE_PROJECT ?= https://github.com/stackql-registry/stackql-provider-$(PROVIDER)
PORT ?= 5444
VENV := .venv
PY := $(VENV)/bin/python
ENV_FILE := .env

.PHONY: help deps fetch-spec refresh-spec pin-check clean-specs inventory split mappings mappings-report pre-normalize normalize generate post-process graphql-merge build \
        test-offline test-integration test-meta test venv smoke smoke-live smoke-read-only smoke-nvcf smoke-cleanup \
        docs website website-start start-server stop-server server-status clean all upgrade

help: ## show this help
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-24s %s\n", $$1, $$2}'

deps: ## install node dependencies (latest @stackql/provider-utils, @stackql/pgwire-lite and swagger-parser per package.json ranges)
	npm install

# ---------------------------------------------------------------- pipeline

fetch-spec: ## download the NVCF spec, harvest the NGC definitions + ngcsdk schemas, and verify against the pins (fails on drift)
	npm run fetch-specs -- --check

refresh-spec: ## download everything and ACCEPT the upstream change (rewrites the pins - review the diff)
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
	rm -f $(CONFIG_DIR)/all_services.csv
	npm run generate-mappings -- --provider-name $(PROVIDER) --input-dir $(SOURCE_DIR) --output-dir $(CONFIG_DIR)
	npm run map-operations

mappings-report: ## print every derived mapping without writing (design the inventory rules)
	npm run map-operations -- --report

pre-normalize: ## nvidia-specific spec surgery on provider-dev/source before the generic normalize pass
	npm run pre-normalize

normalize: ## generic provider-utils normalize pass (allOf flatten, oneOf/anyOf lowering, opaque objects, bare-array wrap)
	npm run normalize -- --api-dir $(SOURCE_DIR)

# No --servers / --service-config: servers are per service (two hosts) and
# the org-scoped paths ride a path-level server template - both come from
# the endpoint inventory (split + post-process). Views under
# ./views/<service>/views.yaml are spliced automatically.
generate: ## generate the provider (bearer auth, snake_case aliases, naive request bodies, views), then post-process and GraphQL merge
	rm -rf $(OPENAPI_DIR)/*
	npm run generate-provider -- \
	  --provider-name $(PROVIDER) \
	  --input-dir $(SOURCE_DIR) \
	  --output-dir $(SERVICES_DIR) \
	  --config-path $(CONFIG_DIR)/all_services.csv \
	  --provider-config $(CONFIG_DIR)/provider_config.json \
	  --naive-req-body-translate \
	  --overwrite
	$(MAKE) post-process
	$(MAKE) graphql-merge

post-process: ## re-apply everything the generator cannot express (org server templates + NGC_ORG, casing, pagination, LIMIT pushdown, objectKeys, transforms)
	npm run post-process

graphql-merge: ## merge GraphQL-backed resources from provider-dev/source-graphql (no-op: NVIDIA publishes no GraphQL API)
	npm run graphql-merge -- --provider-dir $(PROVIDER_DIR) --source-dir $(GRAPHQL_DIR)

build: pin-check clean-specs inventory split mappings pre-normalize normalize generate ## full spec -> provider pipeline from the committed pins

# ------------------------------------------------------------------- tests

test-offline: ## offline validation against the local file registry (SHOW / DESCRIBE, NGC_ORG behaviour, views, no network)
	npm run test-offline

test-integration: ## row-level and wire-level assertions against the mock NGC + NVCF API (no account required)
	npm run test-integration

# The server is always torn down and the meta-route walk's exit status is
# preserved so a failure stops `make all`.
test-meta: ## meta-route walk (every service, resource, method) against a local stackql server
	bash bin/start-server.sh --provider $(PROVIDER) --registry "$(CURDIR)/$(OPENAPI_DIR)" --port $(PORT)
	node bin/test-meta-routes.cjs $(PROVIDER) --port $(PORT); status=$$?; bash bin/stop-server.sh --port $(PORT); exit $$status

test: test-offline test-integration test-meta ## all credential-free test layers

start-server: ## start a local stackql server on PORT (default 5444) over provider-dev/openapi
	bash bin/start-server.sh --provider $(PROVIDER) --registry "$(CURDIR)/$(OPENAPI_DIR)" --port $(PORT)

stop-server: ## stop the local stackql server
	bash bin/stop-server.sh --port $(PORT)

server-status: ## status of the local stackql server
	bash bin/server-status.sh --port $(PORT)

# ------------------------------------------------------------------- smoke

$(VENV)/bin/activate:
	python3 -m venv $(VENV)
	$(VENV)/bin/pip install --quiet --upgrade pip pystackql

venv: $(VENV)/bin/activate ## create the python venv with pystackql for the smoke suite

# The smoke targets source .env when present so a developer checkout works
# without exporting anything; CI sets the variables from secrets.
with_env = set -a; [ -f $(ENV_FILE) ] && source <(tr -d '\r' < $(ENV_FILE)); set +a;

smoke: venv ## live smoke suite with the locally generated provider - catalog + org/registry reads, cheap self-cleaning write lifecycles (needs .env)
	@$(with_env) $(PY) tests/smoke_test.py

smoke-live: venv ## live smoke suite against the PUBLISHED provider in the stackql registry (post-publish verification)
	@$(with_env) $(PY) tests/smoke_test.py --live

smoke-read-only: venv ## live read smokes only, no writes
	@$(with_env) $(PY) tests/smoke_test.py --read-only

smoke-nvcf: venv ## live suite INCLUDING the gated NVCF function deploy lifecycle (billable GPU minutes, smallest instance, always torn down)
	@$(with_env) $(PY) tests/smoke_test.py --with-nvcf-deploy

smoke-cleanup: venv ## sweep stackql-smoke-* breadcrumbs (registry models, NVCF functions and deployments) and exit
	@$(with_env) $(PY) tests/smoke_test.py --cleanup-only

# -------------------------------------------------------------------- docs

docs: ## generate the website docs (snake_case surface, source project link), then sanitize for MDX
	npm run generate-docs -- \
	  --provider-name $(PROVIDER) \
	  --provider-dir ./$(PROVIDER_DIR) \
	  --output-dir ./website \
	  --provider-data-dir ./provider-dev/docgen/provider-data \
	  --snake-case-aliases \
	  --source-project $(SOURCE_PROJECT)
	npm run sanitize-docs

website: ## build the docusaurus microsite (vendors the shared stackql config first)
	cd website && yarn install && yarn build

website-start: ## run the docusaurus dev server
	cd website && yarn install && yarn start

# ------------------------------------------------------------------- misc

clean: ## remove generated artifacts (provider output, docs, website build, test registry copy)
	rm -rf $(OPENAPI_DIR)/* website/build website/.docusaurus website/docs/services tests/integration/.registry-tmp stackql-server.log

all: deps fetch-spec build test docs website ## everything non-live: deps, upstream drift check, pipeline, tests, docs, site build

upgrade: deps refresh-spec build test docs website ## accept upstream changes (re-pin), then the full pipeline, tests, docs and site build
