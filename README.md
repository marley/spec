# Unified Product Graph — Spec

> 🧪 **Public beta.** UPG v0.6 is an early public beta — the spec, APIs, and these packages may still change. Not broadly announced yet; issues and feedback are very welcome.

The **open standard**: the `.upg` file format, the entity & edge ontology, lifecycles, scales, regions, and the framework catalog. This is what implementations build against.

> **Read-only mirror.** Synced one-way from the canonical TPC monorepo. UPG is currently developed upstream; this repo exists for source transparency and the npm `repository` link. Issues are welcome. PRs are accepted by being ported upstream — we're migrating toward develop-in-the-open.

## Packages
| Dir | npm | Role |
|---|---|---|
| `packages/core` | [`@unified-product-graph/core`](https://www.npmjs.com/package/@unified-product-graph/core) | Format, ontology, entity/edge catalog, validators |
| `packages/frameworks` | *(internal)* | Framework catalog (BMC, Lean Canvas, OST…) — bundled into the tooling, not published separately |
| `packages/templates` | *(internal)* | Entity templates |

## Spec version
**v0.6.0** (`UPG_VERSION`). The `.upg` document format version is `0.4.0` (`UPG_FORMAT_VERSION`), which evolves independently.

## Building
Standalone build is **not yet wired** — packages reference the upstream monorepo's shared TypeScript/lint config. The canonical build & test run in the monorepo. (Develop-in-the-open migration will make this self-contained.)

## Links
- Site & docs: https://unifiedproductgraph.org
- Reference tooling: [`unified-product-graph/tools`](https://github.com/unified-product-graph/tools)
