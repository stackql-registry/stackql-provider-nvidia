// The only site-local identity the microsite needs. Everything else comes
// from the shared stackql/docusaurus-config, vendored to .shared-config/ at
// build time (see package.json vendor-config).
export const providerName = 'nvidia';
export const providerTitle = 'NVIDIA NGC';

// The scoping server variable and its environment variable
// (x-stackQL-envVar), read by scripts/sanitize-docs.mjs to annotate
// generated examples "required unless <env var> is set". Deliberately null
// here: the org_name scope rides path-level server templates, which docgen
// does not render into the examples of the scoped (private_registry, orgs)
// pages at all, while the org_name that does appear in examples - the
// public catalog's /v2/models/{org_name}/... and the root path
// /v2/orgs/{org_name} - is a plain path parameter that NGC_ORG never
// resolves. Annotating would mark the wrong pages (NOTES.md 22).
export const scopeVariable = null;
export const scopeEnvVar = null;
