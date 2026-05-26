/**
 * Invariant 9: JSDoc coverage (advisory)
 *
 * Audits @unified-product-graph/core TypeScript source for documentation completeness:
 *
 * - File hero: every `.ts` under `src/` opens with a top-of-file JSDoc block
 * - Export JSDoc: every `export interface|type|const|function|class` has a
 *   preceding JSDoc
 * - Field JSDoc: every field of an exported interface has a `/** ... *​/`
 *   comment
 * - @example on helpers: every exported `function` in `catalog/`, `registry/`,
 *   `grammar/`, `properties/`, `presentation/`, `intelligence/`, `frameworks/`
 *   carries at least one `@example`
 * - @example on interfaces (selective): every in-scope "consumer
 *   contract" interface carries at least one `@example`. In scope:
 *     · every `export interface *Properties` in `properties/domains/*.ts`
 *     · registry / catalog contracts — EntityTypeMeta, UPGDomain,
 *       UPGEdgeDefinition, UPGLens
 *     · document shapes — UPGSource, UPGProduct, UPGProductArea,
 *       UPGPortfolio, UPGOrganization, UPGIntegrity, UPGBaseNode
 *     · workflow types — FrameworkWorkflowStep, EntitySequenceStep,
 *       SubWorkflowStep, WorkflowFilter, StepOutput, WorkflowRun,
 *       WorkflowRuntime
 *     · intelligence types — UPGLensIntelligencePrompt, IntelligenceCondition
 *     · framework types — FrameworkDataSpec, UPGFramework
 *   Out of scope (intentionally skipped): trivial type aliases (Priority,
 *   HealthStatus, Confidence, ISODate, ISODateTime), string-literal unions,
 *   internal / utility types, and any interface not enumerated above.
 * - Universal coverage extension:
 *     · Primitive-exemption: a file whose hero comment contains
 *       `Format conventions:` documents its primitive aliases and
 *       string-literal unions file-wide — no per-type `@example` required.
 *     · Discriminated-union multi-@example: exported `type X = A | B | C`
 *       unions listed in `DISCRIMINATED_UNION_NAMES` must carry at least
 *       one `@example` per variant (detected by counting `@example` tags).
 *     · Generic purpose-prose: exported `export (type|function) NAME<…>`
 *       declarations must carry a non-empty prose description in addition
 *       to `@example` — heuristic: at least one non-tag line above the
 *       first `@` tag.
 *     · Structural-anchor exemption: *Properties interfaces whose entity
 *       type is a pure structural anchor (mostly inherited fields + one
 *       decorative property) are exempt — see STRUCTURAL_ANCHOR_EXEMPTIONS.
 * - No `@todo` or `@deprecated` tags in runtime types (deprecated types belong
 *   in `DeprecatedUPGEntityType` — see `grammar/migrations.ts`)
 *
 * Enforcing — this script sets `process.exitCode = 1` when any of the
 * gated counters are non-zero. The baseline is 0-missing across every
 * gate; this makes regressions immediately visible when the audit is
 * run locally or in CI.
 *
 * Method: regex-based walk, not a TypeScript AST parse. This is deliberate —
 * the audit's job is to surface a coverage baseline, not to be the final word
 * on every edge case. Known limitations:
 *   - Only `export function NAME` is checked for `@example`; arrow-function
 *     helpers declared as `export const NAME = (...) => ...` are not flagged
 *     individually (Phase 4 authors review helper dirs by hand anyway)
 *   - Fields declared inside nested type literals within an interface are not
 *     counted toward the field-JSDoc tally — only top-level fields of the
 *     exported interface body
 *
 * Skips:
 *   - `src/__tests__/` — test files are out of scope
 *   - `src/properties/property-schema.ts` — auto-generated; JSDoc flows from
 *     the interface source files in `properties/domains/*.ts`
 *
 * https://unifiedproductgraph.org/spec | MIT
 */

import * as fs from 'node:fs'
import * as path from 'node:path'
import { Report, SRC } from './_lib.js'

// ─── Config ──────────────────────────────────────────────────────────────────

const EXAMPLE_REQUIRED_DIRS = new Set([
  'catalog',
  'registry',
  'grammar',
  'properties',
  'presentation',
  'intelligence',
  'frameworks',
])

const SKIP_FILES = new Set<string>([
  'properties/property-schema.ts',
])

// In-scope "consumer contract" interfaces that must carry an
// interface-level @example. Two shapes of rule:
//   - Any `export interface *Properties` under `properties/domains/*.ts`
//   - A fixed, hand-listed set of named contract interfaces outside that dir
//
// Keep this list small and deliberate. Every entry here should be a shape
// that adapter authors or downstream consumers instantiate by hand —
// string-literal unions, trivial aliases, and internal helpers do NOT
// belong here (an example on a `type Priority = 'low' | ...` would be noise,
// not signal).
const INTERFACE_EXAMPLE_CONTRACT_NAMES = new Set<string>([
  // Registry / catalog contracts
  'EntityTypeMeta',
  'UPGDomain',
  'UPGEdgeDefinition',
  'UPGLens',
  // Document shapes
  'UPGSource',
  'UPGProduct',
  'UPGProductArea',
  'UPGPortfolio',
  'UPGOrganization',
  'UPGIntegrity',
  'UPGBaseNode',
  // Workflow types (step-kind variants + runtime contract)
  'FrameworkWorkflowStep',
  'EntitySequenceStep',
  'SubWorkflowStep',
  'WorkflowFilter',
  'StepOutput',
  'WorkflowRun',
  'WorkflowRuntime',
  // Intelligence types
  'UPGLensIntelligencePrompt',
  // Framework types
  'FrameworkDataSpec',
  'UPGFramework',
])

// Type-level unions (not interfaces) that also need an @example because
// they are instantiated by consumers — tracked separately so the audit
// can scan `export type NAME = ...` rather than `export interface NAME`.
const TYPE_EXAMPLE_CONTRACT_NAMES = new Set<string>([
  'IntelligenceCondition',
])

// Exported discriminated unions that must carry one `@example`
// per variant. Detected by counting `@example` tags in the JSDoc block
// and comparing against this declared variant count.
//
// A "variant" is a distinct shape in the union. For `type X = A | B | C`
// where A/B/C are nominal interfaces with their own @example, the union
// alias itself still wants at least one inline example per variant so
// that hover on the alias reveals the shape of each member at a glance.
const DISCRIMINATED_UNION_VARIANT_COUNT: Record<string, number> = {
  IntelligenceCondition: 2,  // leaf check | compound and/or
  UPGBenchmarkSource: 4,     // book | practitioner | industry_practice | fundamental
  FrameworkLayout: 8,        // tree | table | matrix | funnel | kanban | quadrant | grid | flow
  WorkflowStep: 4,           // domain_guide | framework | entity_sequence | sub_workflow
}

// Exported generics that must carry purpose-of-T prose + at
// least one `@example`. Detected by `<` in the declaration head and
// heuristic prose presence in the JSDoc body.
//
// Keyed by declaration name; the audit matches any export kind
// (`type`, `interface`, `function`) carrying generic parameters.
const GENERIC_EXPORT_NAMES = new Set<string>([
  'UPGNode',       // type alias
  'migrateNode',   // function
  'migrateEdge',   // function
])

// Structural-anchor entities whose *Properties interface is essentially
// UPGBaseNode + a decorative field or two. Full examples would be
// near-identical to UPGBaseNode's own example and hurt signal-to-noise
// on IDE hover-scanning. Exempt from the interface-@example requirement.
//
// Each entry lists the entity type name the interface documents — the
// audit matches `${TitleCase}Properties` against this list. Keep this
// list small and deliberate; every entry should be a pure structural
// anchor (i.e. its `*Properties` is mostly inherited base fields).
const STRUCTURAL_ANCHOR_EXEMPTIONS = new Set<string>([
  // Branding / identity anchors — mostly title + one media property
  'GlossaryTermProperties',
  'BrandLogoProperties',
  'PositioningProperties',
  // Pure taxonomy / directory anchors — title + parent + flat list
  'DataDomainProperties',
  'ServiceLevelAgreementProperties',
])

/**
 * Whether this interface is in scope for the interface-@example check.
 * Matches:
 *   - any `export interface *Properties` in `properties/domains/*.ts`
 *   - any interface whose name is in `INTERFACE_EXAMPLE_CONTRACT_NAMES`
 *
 * Exemption: interfaces named in `STRUCTURAL_ANCHOR_EXEMPTIONS` are
 * considered documented even without an `@example`, because their
 * examples would be near-identical to UPGBaseNode's own.
 */
function isInterfaceExampleRequired(rel: string, name: string): boolean {
  if (STRUCTURAL_ANCHOR_EXEMPTIONS.has(name)) return false
  if (INTERFACE_EXAMPLE_CONTRACT_NAMES.has(name)) return true
  if (
    rel.startsWith('properties/domains/') &&
    rel.endsWith('.ts') &&
    name.endsWith('Properties')
  ) {
    return true
  }
  return false
}

/**
 * Detect a file-level "Format conventions:" hero block. When
 * present, primitive aliases and string-literal unions declared in that
 * file are considered documented without per-type `@example`.
 */
function hasFormatConventionsHero(src: string): boolean {
  const heroMatch = src.match(/^\s*\/\*\*[\s\S]*?\*\//)
  if (!heroMatch) return false
  return /Format conventions\s*:/i.test(heroMatch[0])
}

/**
 * Count `@example` tags in a JSDoc block.
 */
function countExampleTags(doc: string | null): number {
  if (!doc) return 0
  const matches = doc.match(/@example\b/g)
  return matches ? matches.length : 0
}

/**
 * Heuristic prose-presence check for generics. Returns true when
 * the JSDoc body carries at least one non-empty content line ABOVE the
 * first `@`-tag (indicating a purpose-of-T paragraph, not just tags).
 */
function hasPurposeProse(doc: string | null): boolean {
  if (!doc) return false
  // Strip the opening `/**` and trailing `*/`
  const inner = doc.replace(/^\/\*\*/, '').replace(/\*\/$/, '')
  const lines = inner.split('\n').map((l) => l.replace(/^\s*\*?\s?/, '').trimEnd())
  for (const line of lines) {
    if (!line) continue
    if (line.startsWith('@')) return false
    // Any non-empty, non-tag content line counts as prose
    return true
  }
  return false
}

// ─── Counters ────────────────────────────────────────────────────────────────

interface Counters {
  filesScanned: number
  filesMissingHero: number
  filesWithFormatConventions: number
  exportsTotal: number
  exportsMissingJSDoc: number
  interfacesScanned: number
  interfaceFieldsTotal: number
  interfaceFieldsMissingJSDoc: number
  examplesRequired: number
  examplesMissing: number
  interfaceExamplesRequired: number
  interfaceExamplesMissing: number
  typeExamplesRequired: number
  typeExamplesMissing: number
  structuralAnchorExemptions: number
  unionVariantsRequired: number
  unionVariantsMissing: number
  genericsRequired: number
  genericsMissingProse: number
  genericsMissingExample: number
  todoTags: number
  deprecatedTags: number
}

const counts: Counters = {
  filesScanned: 0,
  filesMissingHero: 0,
  filesWithFormatConventions: 0,
  exportsTotal: 0,
  exportsMissingJSDoc: 0,
  interfacesScanned: 0,
  interfaceFieldsTotal: 0,
  interfaceFieldsMissingJSDoc: 0,
  examplesRequired: 0,
  examplesMissing: 0,
  interfaceExamplesRequired: 0,
  interfaceExamplesMissing: 0,
  typeExamplesRequired: 0,
  typeExamplesMissing: 0,
  structuralAnchorExemptions: 0,
  unionVariantsRequired: 0,
  unionVariantsMissing: 0,
  genericsRequired: 0,
  genericsMissingProse: 0,
  genericsMissingExample: 0,
  todoTags: 0,
  deprecatedTags: 0,
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function walk(dir: string): string[] {
  const out: string[] = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === '__tests__') continue
      out.push(...walk(full))
    } else if (entry.name.endsWith('.ts')) {
      out.push(full)
    }
  }
  return out
}

function relFromSrc(full: string): string {
  return path.relative(SRC, full).replace(/\\/g, '/')
}

function topLevelDir(rel: string): string {
  const idx = rel.indexOf('/')
  return idx === -1 ? '' : rel.slice(0, idx)
}

function hasHeroComment(src: string): boolean {
  return /^\s*\/\*\*[\s\S]*?\*\//.test(src)
}

function lineOf(src: string, pos: number): number {
  return src.slice(0, pos).split('\n').length
}

/**
 * Return the JSDoc block text that immediately precedes `pos`, or null.
 *
 * Scans backward from pos, skipping whitespace. Requires the preceding token
 * to be the close of a `/** ... *​/` block, with no intervening non-whitespace
 * content.
 */
function jsDocBefore(src: string, pos: number): string | null {
  let i = pos - 1
  while (i > 0 && /\s/.test(src[i])) i--
  if (i < 1) return null
  if (src[i] !== '/' || src[i - 1] !== '*') return null
  const closeAt = i - 1
  const before = src.slice(0, closeAt)
  const openAt = before.lastIndexOf('/**')
  if (openAt === -1) return null
  const mid = src.slice(openAt + 3, closeAt)
  if (mid.includes('*/')) return null
  return src.slice(openAt, closeAt + 2)
}

/**
 * Count interface fields and how many are missing JSDoc. Parses the `{ ... }`
 * body that follows the interface declaration, finding property declarations
 * at depth 0 of that body.
 */
function auditInterfaceFields(src: string, declStart: number): { total: number; missing: number } {
  const result = { total: 0, missing: 0 }
  const openBrace = src.indexOf('{', declStart)
  if (openBrace === -1) return result

  // Find matching close brace.
  let depth = 0
  let end = -1
  for (let i = openBrace; i < src.length; i++) {
    const ch = src[i]
    if (ch === '{') depth++
    else if (ch === '}') {
      depth--
      if (depth === 0) { end = i; break }
    }
  }
  if (end === -1) return result

  // Walk the body line-by-line. Track bracket depth so nested type literals,
  // function signatures, and generic parameters do not get counted as fields.
  let i = openBrace + 1
  let bracketDepth = 0
  let atLineStart = true

  while (i <= end - 1) {
    const ch = src[i]

    if (atLineStart && /\s/.test(ch) && ch !== '\n') { i++; continue }
    if (ch === '\n') { atLineStart = true; i++; continue }

    if (atLineStart && bracketDepth === 0) {
      // Attempt to match a field declaration head.
      const rest = src.slice(i, end)
      const m = rest.match(/^(?:readonly\s+)?(?:[A-Za-z_$][A-Za-z0-9_$]*|'[^']+'|"[^"]+"|\[[^\]]+\])\??\s*[:(]/)
      if (m) {
        result.total++
        if (!jsDocBefore(src, i)) result.missing++
        // Advance past this declaration — to the first `;` or newline at
        // depth 0, whichever comes first.
        let k = i + m[0].length - 1 // last matched char (`:` or `(`)
        // If the last matched char opened a call signature `(`, treat it as bracket open.
        if (m[0].endsWith('(')) bracketDepth++
        k++
        while (k < end) {
          const c = src[k]
          if (c === '{' || c === '(' || c === '<' || c === '[') bracketDepth++
          else if (c === '}' || c === ')' || c === '>' || c === ']') {
            bracketDepth--
            if (bracketDepth < 0) break // defensive
          } else if (bracketDepth === 0 && (c === ';' || c === ',' || c === '\n')) {
            break
          }
          k++
        }
        i = k
        atLineStart = true
        continue
      }
    }

    if (ch === '{' || ch === '(' || ch === '<' || ch === '[') bracketDepth++
    else if (ch === '}' || ch === ')' || ch === '>' || ch === ']') bracketDepth--

    atLineStart = false
    i++
  }

  return result
}

// ─── Audit ───────────────────────────────────────────────────────────────────

const report = new Report('Invariant 9: JSDoc coverage (enforcing)')

const files = walk(SRC).sort()

for (const full of files) {
  const rel = relFromSrc(full)
  if (SKIP_FILES.has(rel)) continue
  counts.filesScanned++

  const src = fs.readFileSync(full, 'utf8')
  const topDir = topLevelDir(rel)

  if (!hasHeroComment(src)) {
    counts.filesMissingHero++
    report.info(`${rel}: missing file hero comment`)
  }

  // Files declaring primitives or string-literal unions document
  // them once via a `Format conventions:` hero block. Track how many
  // files carry one so we can see coverage grow over time.
  const fileDocumentsPrimitivesFileWide = hasFormatConventionsHero(src)
  if (fileDocumentsPrimitivesFileWide) {
    counts.filesWithFormatConventions++
  }

  const todoMatches = src.match(/@todo\b/gi)
  if (todoMatches) {
    counts.todoTags += todoMatches.length
    report.info(`${rel}: ${todoMatches.length} @todo tag(s) — ban in runtime types`)
  }
  const deprecatedMatches = src.match(/@deprecated\b/g)
  if (deprecatedMatches) {
    counts.deprecatedTags += deprecatedMatches.length
    report.info(`${rel}: ${deprecatedMatches.length} @deprecated tag(s) — ban in runtime types`)
  }

  // Note: the capture stops at the identifier name; look past it below to
  // detect a generic parameter list (`<T>`) when generic checks fire.
  const exportRe = /^export\s+(interface|type|const|function|class)\s+([A-Za-z_$][A-Za-z0-9_$]*)/gm
  let m: RegExpExecArray | null
  while ((m = exportRe.exec(src)) !== null) {
    counts.exportsTotal++
    const kind = m[1]
    const name = m[2]
    const pos = m.index
    const afterName = src.slice(pos + m[0].length, pos + m[0].length + 1)
    const isGenericDeclaration = afterName === '<'

    const doc = jsDocBefore(src, pos)
    if (!doc) {
      counts.exportsMissingJSDoc++
      report.info(`${rel}:${lineOf(src, pos)} export ${kind} ${name} — missing JSDoc`)
    }

    if (kind === 'function' && EXAMPLE_REQUIRED_DIRS.has(topDir)) {
      counts.examplesRequired++
      if (!doc || !doc.includes('@example')) {
        counts.examplesMissing++
        report.info(`${rel}:${lineOf(src, pos)} export function ${name} — missing @example`)
      }
    }

    if (kind === 'interface') {
      counts.interfacesScanned++
      const declEnd = pos + m[0].length
      const res = auditInterfaceFields(src, declEnd)
      counts.interfaceFieldsTotal += res.total
      counts.interfaceFieldsMissingJSDoc += res.missing
      if (res.missing > 0) {
        report.info(`${rel} interface ${name}: ${res.missing}/${res.total} fields missing JSDoc`)
      }

      // Require interface-level @example on consumer-contract
      // interfaces (properties/domains/*.ts *Properties + named contracts).
      if (isInterfaceExampleRequired(rel, name)) {
        counts.interfaceExamplesRequired++
        if (!doc || !doc.includes('@example')) {
          counts.interfaceExamplesMissing++
          report.info(`${rel}:${lineOf(src, pos)} export interface ${name} — missing @example`)
        }
      }
    }

    // Type-level @example for unions that consumers instantiate
    // (e.g. IntelligenceCondition). Kept separate from the interface
    // scan because these are `export type NAME = ...` declarations.
    if (kind === 'type' && TYPE_EXAMPLE_CONTRACT_NAMES.has(name)) {
      counts.typeExamplesRequired++
      if (!doc || !doc.includes('@example')) {
        counts.typeExamplesMissing++
        report.info(`${rel}:${lineOf(src, pos)} export type ${name} — missing @example`)
      }
    }

    // Discriminated-union multi-@example requirement. For unions
    // listed in DISCRIMINATED_UNION_VARIANT_COUNT, require at least one
    // @example per declared variant.
    if (kind === 'type' && name in DISCRIMINATED_UNION_VARIANT_COUNT) {
      const required = DISCRIMINATED_UNION_VARIANT_COUNT[name]
      counts.unionVariantsRequired += required
      const have = countExampleTags(doc)
      if (have < required) {
        counts.unionVariantsMissing += (required - have)
        report.info(
          `${rel}:${lineOf(src, pos)} export type ${name} — ${have}/${required} @example tag(s) (one per variant)`,
        )
      }
    }

    // Generic purpose-prose + @example requirement.
    if (isGenericDeclaration && GENERIC_EXPORT_NAMES.has(name)) {
      counts.genericsRequired++
      if (!hasPurposeProse(doc)) {
        counts.genericsMissingProse++
        report.info(
          `${rel}:${lineOf(src, pos)} export ${kind} ${name}<…> — missing purpose-of-T prose`,
        )
      }
      if (!doc || !doc.includes('@example')) {
        counts.genericsMissingExample++
        report.info(
          `${rel}:${lineOf(src, pos)} export ${kind} ${name}<…> — missing @example`,
        )
      }
    }
  }

  // Count structural-anchor exemptions as reported "freebies" —
  // gives visibility into how many Properties interfaces we waive on
  // purpose, not how many we missed documenting.
  const anchorRe = /^export\s+interface\s+([A-Za-z_$][A-Za-z0-9_$]*Properties)\b/gm
  let am: RegExpExecArray | null
  while ((am = anchorRe.exec(src)) !== null) {
    if (STRUCTURAL_ANCHOR_EXEMPTIONS.has(am[1])) {
      counts.structuralAnchorExemptions++
    }
  }
}

// ─── Summary ─────────────────────────────────────────────────────────────────

function pct(missing: number, total: number): string {
  if (total === 0) return 'n/a'
  return `${((missing / total) * 100).toFixed(1)}%`
}

console.log('\n--- JSDoc coverage baseline ---')
console.log(`Files scanned:                      ${counts.filesScanned}`)
console.log(`  missing hero comment:             ${counts.filesMissingHero} (${pct(counts.filesMissingHero, counts.filesScanned)})`)
console.log(`Exports scanned:                    ${counts.exportsTotal}`)
console.log(`  missing JSDoc:                    ${counts.exportsMissingJSDoc} (${pct(counts.exportsMissingJSDoc, counts.exportsTotal)})`)
console.log(`Interfaces scanned:                 ${counts.interfacesScanned}`)
console.log(`Interface fields scanned:           ${counts.interfaceFieldsTotal}`)
console.log(`  missing JSDoc:                    ${counts.interfaceFieldsMissingJSDoc} (${pct(counts.interfaceFieldsMissingJSDoc, counts.interfaceFieldsTotal)})`)
console.log(`Exported helpers requiring @example: ${counts.examplesRequired}`)
console.log(`  missing @example:                 ${counts.examplesMissing} (${pct(counts.examplesMissing, counts.examplesRequired)})`)
console.log(`In-scope interfaces requiring @example: ${counts.interfaceExamplesRequired}`)
console.log(`  missing @example:                 ${counts.interfaceExamplesMissing} (${pct(counts.interfaceExamplesMissing, counts.interfaceExamplesRequired)})`)
console.log(`In-scope types requiring @example:      ${counts.typeExamplesRequired}`)
console.log(`  missing @example:                 ${counts.typeExamplesMissing} (${pct(counts.typeExamplesMissing, counts.typeExamplesRequired)})`)
console.log(`Files with "Format conventions:" hero: ${counts.filesWithFormatConventions}`)
console.log(`Discriminated-union variant @examples required: ${counts.unionVariantsRequired}`)
console.log(`  missing:                          ${counts.unionVariantsMissing} (${pct(counts.unionVariantsMissing, counts.unionVariantsRequired)})`)
console.log(`Exported generics requiring prose + @example: ${counts.genericsRequired}`)
console.log(`  missing prose:                    ${counts.genericsMissingProse} (${pct(counts.genericsMissingProse, counts.genericsRequired)})`)
console.log(`  missing @example:                 ${counts.genericsMissingExample} (${pct(counts.genericsMissingExample, counts.genericsRequired)})`)
console.log(`Structural-anchor exemptions: ${counts.structuralAnchorExemptions}`)
console.log(`@todo tags (runtime):               ${counts.todoTags}`)
console.log(`@deprecated tags (runtime):         ${counts.deprecatedTags}`)

report.print()

// Enforcing. Set a non-zero exit code when any gated counter is non-zero.
// The gated counters are the eight surfaces above; the generic
// `exportsMissingJSDoc` tally (which includes const data blocks and
// workflow definition objects) is advisory-only and is NOT included in
// the gate — it remains visible in the summary above.
//
// CI is currently paused (`.github/workflows/ci.yml` trigger commented out
// per CLAUDE.md). These checks have LOCAL teeth only: running this script
// manually or via `npx tsx packages/upg-spec/scripts/audit/run-all.ts` will
// surface failures. When CI re-enables post-Entopo-refactor, this gate
// automatically becomes a merge blocker.
const hasFailures =
  counts.filesMissingHero > 0 ||
  counts.examplesMissing > 0 ||
  counts.interfaceExamplesMissing > 0 ||
  counts.typeExamplesMissing > 0 ||
  counts.interfaceFieldsMissingJSDoc > 0 ||
  counts.deprecatedTags > 0 ||
  counts.todoTags > 0

if (hasFailures) {
  process.exitCode = 1
}
