# UPG Spec Invariants Audit

Cross-cutting coherence checks between catalog, shapes, registry, grammar, properties, and presentation layers. Each invariant is a single-purpose script that reads the spec source and reports demonstrable inconsistencies.

Run any script from the `packages/upg-spec` directory:

```bash
cd packages/upg-spec
npx tsx scripts/audit/<script-name>.ts
```

Or run the full suite:

```bash
npx tsx scripts/audit/run-all.ts
```

## Scripts

| Script | Invariant checked |
|--------|-------------------|
| `01-naming-conventions.ts` | Entity types, edge keys, property keys, exported constants follow spec naming |
| `02-property-ownership.ts` | Every property name lives in exactly one domain file (or a shared base) |
| `03-edge-hierarchy.ts` | Edges without hierarchy backing are either cross-domain or orphans |
| `04-entity-coverage.ts` | Every entity type has lifecycle + property schema + entity-meta entry (where expected) |
| `05-edge-validity.ts` | Edge source/target types exist in UPG_TYPES |
| `06-framework-coupling.ts` | Framework slots reference real entity types and real property keys |
| `07-docs-drift.ts` | README / ARCHITECTURE / CHANGELOG counts match current code |
| `08-intelligence-integrity.ts` | Benchmarks and domain guides reference canonical entities and lifecycle phases |

All scripts are idempotent — they only read spec source and print a structured report to stdout.
