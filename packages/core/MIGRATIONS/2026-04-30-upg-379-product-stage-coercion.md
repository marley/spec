# Product stage coercion (v0.4.0 boundary)

**Date:** 2026-04-30
**Spec:** `@unified-product-graph/core` (additive utility + read-time guard)
**MCP server:** `@unified-product-graph/mcp-server` (write-side gate + load-time coercion)

## Why

Earlier validation surfaced that `create_product` silently accepted non-canonical `stage` values (`idea`, `discovery`, `mvp`, and others) and persisted them into `.upg` files. Existing production graphs already carry these values, so a pure strict-validation pass would break loading on every legacy graph.

## Strategy

**Soft-coerce on read, strict on write.**

- **Write path** (`create_product`, future `update_node` for product type) — strict canonical-only. Non-canonical values throw `InvalidProductStageError` with a message pointing at the canonical set plus any documented coercion target.
- **Read path** (`UPGFileStore.load()`) — coerces non-canonical values in-memory to the closest canonical equivalent via `UPG_PRODUCT_STAGE_COERCION_MAP` and emits a deprecation warning on stderr. The on-disk file is **not** mutated — operators can run an explicit migration sweep when ready.

Mirrors the earlier `properties.stage → status` lift, applied at the load boundary instead of as a one-shot migration so production graphs work without forcing a sweep.

## Coercion mapping

The mapping is documented in `src/intelligence/product-stage-coercion.ts` as `UPG_PRODUCT_STAGE_COERCION_MAP` (frozen). Coercion targets:

| Legacy value | Canonical UPGProductStage | Rationale |
|---|---|---|
| `idea` | `concept` | Pre-canonical alias from early product nodes; matches the prior `properties.stage` migration `value_map`. |
| `discovery` | `validation` | "Discovery" was used to mean the pre-build research / customer-discovery phase. UPGProductStage has no separate "discovery" phase; closest canonical equivalent is `validation` (testing demand, talking to users). |
| `mvp` | `build` | Minimum viable product == actively building v1. |
| `production` | `launch` | Generally available shipped product. |
| `draft` | `concept` | Mirrors the prior `lifecycle_status` migration. |
| `active` | `launch` | Mirrors the prior `lifecycle_status` migration. |
| `archived` | `sunset` | Winding down. |
| `retired` | `sunset` | Winding down. |
| `deprecated` | `sunset` | Winding down. |

Matching is case-insensitive at the call boundary (`Idea`, `MVP`, and similar all coerce).

## What you should do

- **Existing graphs**: nothing. The next time the MCP server loads them, the in-memory value is canonical. To persist the canonical value, run `migrate_properties` (or update via `update_node`).
- **Authoring tools and agents**: only ever pass canonical UPGProductStage values to `create_product`. The 9 canonical values are `concept | validation | build | beta | launch | growth | mature | maintenance | sunset`.
- **Importers**: the soft-coercion utility is exported from `@unified-product-graph/core` as `coerceProductStage(value)` for adapter layers that read external systems.

## API

```ts
import {
  // Strict guard — true for canonical only.
  isCanonicalProductStage,
  // Soft coercion — returns canonical | undefined + flags.
  coerceProductStage,
  // Write-side validator — null on success, error message on rejection.
  validateProductStageStrict,
  // Frozen mapping table (legacy lowercase → canonical).
  UPG_PRODUCT_STAGE_COERCION_MAP,
} from '@unified-product-graph/core'
```

## Tests

- `src/__tests__/product-stage-coercion.test.ts` — 17 tests pinning the documented mapping and the write-side validator.
- MCP server `workspace.test.ts` — write-side rejection of legacy / unknown stages and acceptance of all canonical values.
- MCP server `store.test.ts` — read-side coercion (`idea → concept`, `discovery → validation`), passthrough of canonical values, and on-disk preservation of unknown values.

---

_Reference:._
