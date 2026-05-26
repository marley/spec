# @unified-product-graph/frameworks

The **UPG Framework Library** — 216 declarative product-management framework
definitions, organised into 30 categories, as plain TypeScript data.

Frameworks are config-driven lenses that structure entities from the
[Unified Product Graph](https://unifiedproductgraph.org) into well-known
patterns (RICE, Lean Canvas, Opportunity Solution Tree, Kano, Wardley Map,
JTBD, and many more). Each framework is pure JSON-shaped data — no code —
describing four layers:

- **data** — which entity types and properties participate
- **structure** — the framework's shape (matrix, list, tree, board, canvas)
- **presentation** — slots, columns, axes, scoring rules
- **education** — when to use it, when not to, references, examples

This package is the canonical source for these definitions. Consumers
include the UPG site, CLI, MCP servers, and any tool that wants to render
or score a UPG product graph through a named framework.

## Install

```bash
npm install @unified-product-graph/frameworks @unified-product-graph/core
```

`@unified-product-graph/core` is a peer dependency — the framework records
reference entity types and property keys defined there.

## Usage

```ts
import {
  FRAMEWORKS,
  FRAMEWORKS_BY_CATEGORY,
  FRAMEWORK_CATEGORIES,
  getFramework,
  validateFramework,
  type UPGFramework,
} from '@unified-product-graph/frameworks'

// All 216 frameworks
console.log(FRAMEWORKS.length) // 216

// One framework by id
const rice = getFramework('rice')
console.log(rice?.name)       // 'RICE'
console.log(rice?.category)   // 'prioritization'

// All frameworks in a category
const discovery = FRAMEWORKS_BY_CATEGORY.discovery
console.log(discovery.length) // 11

// All category metadata (label, description, structure pattern)
for (const cat of FRAMEWORK_CATEGORIES) {
  console.log(cat.id, cat.label)
}
```

### Shape

Each framework is a `UPGFramework` record:

```ts
interface UPGFramework {
  id: string                       // stable kebab-case id, e.g. 'rice'
  name: string                     // human label, e.g. 'RICE'
  version: string                  // semver of the framework record
  description: string              // one-paragraph summary
  category: FrameworkCategory      // one of 30 categories
  structure: FrameworkStructure    // matrix | list | tree | board | canvas | ...
  data: FrameworkDataSpec          // entity types + property keys it consumes
  presentation: FrameworkPresentation
  education?: FrameworkEducation   // when-to-use, when-not-to, references
  approach_ids?: string[]          // related UPGApproach ids
  tags?: string[]
}
```

See `src/frameworks/types.ts` for the full type surface.

### Categories

30 categories cover the full product-management surface area:

```
accessibility · agentic · ai-ml · business-model · competitive ·
customer-success · data-analytics · design · devops · discovery ·
engineering · feedback-voc · go-to-market · growth · marketing ·
metrics · partnerships · planning · portfolio · pricing ·
prioritization · program-mgmt · research · sales · strategy ·
team-process · user-understanding · ux-research · validation
```

## Versioning

This package follows the same semver line as `@unified-product-graph/core`.
Breaking changes to the `UPGFramework` shape are major bumps. Adding a new
framework definition, or refining an existing one, is a minor bump. Pure
copy fixes are patches.

## Contributing

Pull requests welcome — see [CONTRIBUTING.md](./CONTRIBUTING.md) for the
conventions (id format, required fields, dedup rules, validation pass).

## License

MIT — see [LICENSE](./LICENSE).
