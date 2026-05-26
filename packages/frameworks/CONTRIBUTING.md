# Contributing

Thanks for your interest in improving the UPG framework library. This
package is the canonical home for declarative product-management framework
definitions in the Unified Product Graph ecosystem.

## What belongs here

A framework belongs in this package if it is:

- A **named, recognisable** pattern in product practice (RICE, Kano,
  Opportunity Solution Tree, Wardley Map, JTBD, etc.).
- **Structural** — it imposes a shape (matrix, list, tree, board, canvas)
  on entities from the graph, not just a piece of advice.
- **Reusable across products** — one team's bespoke template is not a
  framework. A widely-cited public method is.

## Proposing a new framework

1. Open an issue with the framework's name, category, a one-paragraph
   description, and one or two reference links (book, paper, blog post).
2. Once the framework is accepted in principle, open a pull request that
   adds it to the right category file under
   `src/frameworks/definitions/<category>.ts`.

## Authoring conventions

Each framework record must:

- Have a stable kebab-case `id` (`rice`, `opportunity-solution-tree`).
- Have a semver `version` — start at `1.0.0`.
- Belong to exactly one `category` from `FrameworkCategory`.
- Pick a `structure` pattern from the canonical list in
  `src/frameworks/categories.ts`.
- Declare the entity types it consumes in `data.entity_types`.
- Declare any framework-introduced property keys in
  `data.properties_required` — these are property keys that live inside the
  framework lens rather than on the canonical entity.

## Dedup rule

If a concept already exists under another category, do **not** clone it.
Reference the canonical record instead, and document the routing in the
category file header (for example, Voice of Customer lives under
`feedback_voc`, not `customer_success`).

## Validation

Before opening a pull request:

```bash
npm run lint
npm run type-check
npm run test
npm run build
```

`validateFramework` is also exported from the package — run it against any
new record locally to catch shape errors.

## License

By contributing, you agree that your contributions will be licensed under
the project's [MIT License](./LICENSE).
