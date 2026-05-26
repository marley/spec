# Changelog

All notable changes to `@unified-product-graph/frameworks` will be documented
in this file. This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.0] — 2026-05-19

Initial public release.

### Added
- 216 curated framework definitions across 30 categories (the Gold List).
- `UPGFramework` type surface in `src/frameworks/types.ts`.
- Category metadata and structure-pattern taxonomy in
  `src/frameworks/categories.ts`.
- `validateFramework` helper for shape validation against the type contract.
- Aggregated exports: `FRAMEWORKS`, `FRAMEWORKS_BY_CATEGORY`,
  `FRAMEWORK_CATEGORIES`, `getFramework`.

### Notes
- Pinned to `@unified-product-graph/core` `^0.4.0` as a peer dependency.
- ESM-only. Requires Node.js 18+.
