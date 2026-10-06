// Canonical JSON for the pinned downloads. NVIDIA's definition servers
// serialise Java maps in a non-deterministic key order (the models
// definition's securitySchemes scopes map changes order between two fetches
// seconds apart) - byte-for-byte pins would drift on every download. The
// fetchers write every definition with object keys sorted recursively
// (array order untouched), so the committed file and its sha256 are stable
// for identical content and a pin drift means real upstream change.

export function sortKeysDeep(value) {
  if (Array.isArray(value)) return value.map(sortKeysDeep);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((k) => [k, sortKeysDeep(value[k])]));
  }
  return value;
}

export function canonicalJson(value) {
  return JSON.stringify(sortKeysDeep(value), null, 2) + '\n';
}
