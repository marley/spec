/**
 * Skills + Workflows canon correctness.
 *
 * Walks every surviving SKILL.md prompt under packages/upg-mcp-server/skills/ and
 * every UPGWorkflow definition, then cross-checks token references against the
 * canonical registries exported from @upg/core:
 *
 *   - UPG_TYPES                — entity types
 *   - UPG_EDGE_TYPES           — edge types
 *   - UPG_PROPERTY_SCHEMA      — per-entity property keys
 *   - UPG_DOMAINS              — domain ids
 *
 * Findings are classified into three buckets:
 *
 *   - structural  — property should be an entity+edge, not an inline array
 *   - rename      — concept is right, name drifted (mechanical fix)
 *   - deletion    — token doesn't exist anywhere in the registries
 *
 * The script exits non-zero when the *aspirational* (deletion) bucket is
 * non-empty against the curated allow-list. Rename / structural / deprecated
 * findings are surfaced as warnings (informational), so the gate stays green
 * once Phase 2 PRs land but still surfaces drift the moment a new instance
 * sneaks in.
 *
 * Layout:
 *   1. Token extraction (regex, deliberately conservative)
 *   2. Classification (allow-lists for known good non-canon tokens)
 *   3. Reporter
 *
 * Run:   npx tsx packages/upg-spec/scripts/audit/skills-canon-correctness.ts
 * CI:    invoked from `npm run audit:skills` (added to package.json)
 */

import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

import {
  UPG_TYPES,
  UPG_EDGE_TYPES,
  UPG_PROPERTY_SCHEMA,
  UPG_DOMAINS,
  UPG_DEPRECATED_TYPES,
} from '../../src/index.js'
import { Report } from './_lib.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const REPO_ROOT = path.resolve(__dirname, '..', '..', '..', '..')
const SKILLS_DIR = path.join(REPO_ROOT, 'packages', 'upg-mcp-server', 'skills')
const WORKFLOWS_DIR = path.join(
  REPO_ROOT,
  'packages',
  'upg-spec',
  'src',
  'workflows',
  'definitions',
)

// ─── Canonical sets ──────────────────────────────────────────────────────────

const TYPES = new Set<string>(UPG_TYPES)
const DEPRECATED_TYPES = new Set<string>(UPG_DEPRECATED_TYPES)
const EDGES = new Set<string>(UPG_EDGE_TYPES)
const DOMAIN_IDS = new Set<string>(UPG_DOMAINS.map((d) => d.id))

const ALL_PROPERTIES = new Set<string>()
for (const schema of Object.values(UPG_PROPERTY_SCHEMA)) {
  for (const key of Object.keys(schema)) ALL_PROPERTIES.add(key)
}

// ─── Allow-lists ─────────────────────────────────────────────────────────────
//
// SKILL.md and workflow prose legitimately contains tokens that *look* like
// types/edges/properties but aren't claims about the canon:
//
//   - Words inside example prose ("the metric you track")
//   - Cross-cutting verbs ("contains", "has")
//   - Migration notes pointing at retired names
//
// We allow-list specific tokens here so the gate can stay strict on the rest.

/** Tokens that look like entity types but are deliberately referenced
 *  for educational/migration framing. They are NOT claims that the
 *  type exists today. */
const ALLOWED_NON_CANON_TYPES = new Set<string>([
  // Generic prose nouns that match snake_case but are not entity claims
  'low',
  'medium',
  'high',
  'functional',
  'investigation',
  // Deprecated-but-mentioned for migration guidance (call-out, not creation)
  'pain_point',
  // Common sub-shape literals that appear in property enum docs
  'onboarding',
  // Placeholder tokens used inside MCP-tool example call signatures
  // (e.g. `list_nodes({ type: 'likely_type' })` in upg-verify SKILL.md
  // — meant as a literal "<replace with the real type>" hint, not a claim)
  'likely_type',
])

/** Property names that are correct in the canonical TS interfaces but
 *  missing from the auto-generated UPG_PROPERTY_SCHEMA. Each entry has
 *  a known root cause. */
const ALLOWED_PROPERTY_SPEC_GAPS = new Set<string>([
  // Allow-list cleared — `job_type` now present in UPG_PROPERTY_SCHEMA.job.
])

/** Tokens that look like edges but are deliberately referenced for
 *  framing or migration. */
const ALLOWED_NON_CANON_EDGES = new Set<string>([
  // Generic verbs we use in prose, never as canonical edge keys
  'differentiates_from',
  'expresses',
  'fuels',
  'launches',
])

/**
 * Files with known baseline drift — exempt from gate failure but kept in
 * the audit output as warnings.
 *
 * These are premium SKILL-DETAIL surfaces authored against an aspirational
 * entity model that pre-dates the v0.2 canon. The `MENTAL-MODEL.md` FAQ
 * explicitly notes premium skills "historically embedded framework refs …
 * premium skills get a pass for hand-tuning." Bringing them to canon is a
 * structural redesign, not a token rename. The gate stays strict for every
 * other surface.
 */
const BASELINE_DRIFT_FILES = new Set<string>([
  'packages/upg-mcp-server/skills/upg-launch/SKILL-DETAIL.md',
])

// ─── Findings model ──────────────────────────────────────────────────────────

interface Finding {
  bucket: 'structural' | 'rename' | 'deletion' | 'spec_gap'
  kind: 'entity_type' | 'edge_type' | 'property' | 'domain_id'
  token: string
  file: string
  context?: string
  note?: string
}

const findings: Finding[] = []

function add(f: Finding): void {
  findings.push(f)
}

// ─── Extraction ──────────────────────────────────────────────────────────────

interface Source {
  file: string
  content: string
}

function loadSources(): Source[] {
  const out: Source[] = []
  // SKILL.md + SKILL-DETAIL.md files (every markdown file under each skill dir)
  if (fs.existsSync(SKILLS_DIR)) {
    for (const entry of fs.readdirSync(SKILLS_DIR)) {
      const dir = path.join(SKILLS_DIR, entry)
      if (!fs.statSync(dir).isDirectory()) continue
      for (const f of fs.readdirSync(dir)) {
        if (f.endsWith('.md')) {
          const fp = path.join(dir, f)
          out.push({
            file: path.relative(REPO_ROOT, fp),
            content: fs.readFileSync(fp, 'utf8'),
          })
        }
      }
    }
  }
  // Workflow definitions (TypeScript source)
  if (fs.existsSync(WORKFLOWS_DIR)) {
    for (const entry of fs.readdirSync(WORKFLOWS_DIR)) {
      if (entry.endsWith('-workflows.ts')) {
        const wfFile = path.join(WORKFLOWS_DIR, entry)
        out.push({
          file: path.relative(REPO_ROOT, wfFile),
          content: fs.readFileSync(wfFile, 'utf8'),
        })
      }
    }
  }
  return out
}

/**
 * Extract candidate entity-type tokens from a source.
 *
 * Strategy:
 *   - `type: "<token>"` and `type: '<token>'` in code blocks (covers
 *     create_node / create_edge — we then disambiguate against EDGES)
 *   - `entity_types: [...]` arrays in workflow ts files
 *   - back-tick wrapped `` `<token>` `` words that match snake_case AND
 *     appear in a sentence flagged as canonical (e.g. "create a `persona`
 *     entity"). To avoid false positives we ONLY collect back-tick tokens
 *     that already match a canonical entity name; that's enough to flag
 *     misspellings (e.g. `personas` would not match anything; we'd skip
 *     it — that is acceptable, the structural and code-block scans cover
 *     the high-signal cases).
 */
function extractEntityTypeRefs(content: string): { token: string; context: string }[] {
  const out: { token: string; context: string }[] = []

  // type: "..." / type: '...'
  const typeRe = /\btype\s*:\s*["']([a-z][a-z0-9_]*)["']/g
  let m: RegExpExecArray | null
  while ((m = typeRe.exec(content)) !== null) {
    out.push({ token: m[1]!, context: lineAt(content, m.index) })
  }

  // entity_types: [ ... ] arrays
  const arrRe = /entity_types\s*:\s*\[([^\]]+)\]/g
  while ((m = arrRe.exec(content)) !== null) {
    const inner = m[1]!
    const itemRe = /["']([a-z][a-z0-9_]*)["']/g
    let im: RegExpExecArray | null
    while ((im = itemRe.exec(inner)) !== null) {
      out.push({ token: im[1]!, context: 'entity_types: [...]' })
    }
  }

  return out
}

function extractEdgeTypeRefs(content: string): { token: string; context: string }[] {
  const out: { token: string; context: string }[] = []
  // create_edge({ ... type: "..." }) — but the same regex applies, distinguishing
  // happens at classification time (any token matching EDGES set is treated as an edge).
  const typeRe = /\btype\s*:\s*["']([a-z][a-z0-9_]*)["']/g
  let m: RegExpExecArray | null
  while ((m = typeRe.exec(content)) !== null) {
    out.push({ token: m[1]!, context: lineAt(content, m.index) })
  }
  return out
}

function extractPropertyRefs(content: string): { token: string; entityHint?: string; context: string }[] {
  const out: { token: string; entityHint?: string; context: string }[] = []
  // properties: { foo: ..., bar: ... }
  const propRe = /properties\s*:\s*\{([\s\S]*?)\}/g
  let m: RegExpExecArray | null
  while ((m = propRe.exec(content)) !== null) {
    const inner = m[1]!
    // Strip nested object literals — only top-level keys
    const cleaned = inner.replace(/\{[^{}]*\}/g, '')
    const keyRe = /(^|[\s,{])([a-z][a-z0-9_]*)\s*:/g
    let km: RegExpExecArray | null
    while ((km = keyRe.exec(cleaned)) !== null) {
      out.push({ token: km[2]!, context: 'properties: {...}' })
    }
  }
  return out
}

function extractDomainIdRefs(content: string): { token: string; context: string }[] {
  const out: { token: string; context: string }[] = []
  const re = /\bdomain_id\s*:\s*["']([a-z][a-z0-9_]*)["']/g
  let m: RegExpExecArray | null
  while ((m = re.exec(content)) !== null) {
    out.push({ token: m[1]!, context: lineAt(content, m.index) })
  }
  return out
}

function lineAt(content: string, idx: number): string {
  const start = content.lastIndexOf('\n', idx) + 1
  const end = content.indexOf('\n', idx)
  return content.slice(start, end === -1 ? undefined : end).trim().slice(0, 160)
}

// ─── Classification ──────────────────────────────────────────────────────────

const KNOWN_PROPERTY_NAMES = ALL_PROPERTIES

function looksLikeEdge(token: string): boolean {
  // Edge types are usually structured as `<type>_<verb>_<type>` — a heuristic
  // that catches workflow-definition references that happen to use `type:`
  // as a key (unlikely in our data, but kept as belt-and-braces).
  return token.includes('_') && /_(has|contains|owns|drives|maps|targets|aspires_to|experiences|pursues|surfaces|motivates|decomposes_into|reveals|explores_via|tests|validates|informs|blocks|depends_on|consumes|emits|delivers|tracks|measures|implements|addresses|references|covers|relates_to|incurs|differentiates_from)_/.test(
    `_${token}_`,
  )
}

function classifyEntityToken(t: { token: string; context: string }, file: string): void {
  if (DEPRECATED_TYPES.has(t.token)) {
    // Deprecated types must be migrated to their canonical replacement.
    add({
      bucket: 'structural',
      kind: 'entity_type',
      token: t.token,
      file,
      context: t.context,
      note: 'deprecated — migrate to canonical replacement',
    })
    return
  }
  if (TYPES.has(t.token)) return // canonical, active
  if (EDGES.has(t.token)) return // it's an edge passed through `type:` — fine
  if (ALLOWED_NON_CANON_TYPES.has(t.token)) return
  if (looksLikeEdge(t.token)) return // already covered by edge classifier
  // Bucket: deletion (token not anywhere in canon)
  add({
    bucket: 'deletion',
    kind: 'entity_type',
    token: t.token,
    file,
    context: t.context,
  })
}

function classifyEdgeToken(t: { token: string; context: string }, file: string): void {
  if (!looksLikeEdge(t.token)) return // not actually an edge ref
  if (EDGES.has(t.token)) return // canonical
  if (ALLOWED_NON_CANON_EDGES.has(t.token)) return
  add({
    bucket: 'deletion',
    kind: 'edge_type',
    token: t.token,
    file,
    context: t.context,
  })
}

function classifyPropertyToken(
  t: { token: string; context: string },
  file: string,
): void {
  // We don't know the exact entity context cheaply; flag only properties that
  // are nowhere in any schema. (This keeps false positives down.)
  if (KNOWN_PROPERTY_NAMES.has(t.token)) return
  if (ALLOWED_PROPERTY_SPEC_GAPS.has(t.token)) return
  // Skip super-common JSON keys
  if (
    [
      'id',
      'parent_id',
      'type',
      'title',
      'description',
      'status',
      'tags',
      'name',
      'value',
      'unit',
      'metadata',
      'source_id',
      'target_id',
      'source',
      'target',
      'order',
      'phase',
      'kind',
      'note',
      'notes',
    ].includes(t.token)
  ) {
    return
  }
  add({
    bucket: 'deletion',
    kind: 'property',
    token: t.token,
    file,
    context: t.context,
  })
}

function classifyDomainToken(
  t: { token: string; context: string },
  file: string,
): void {
  if (DOMAIN_IDS.has(t.token)) return
  add({
    bucket: 'deletion',
    kind: 'domain_id',
    token: t.token,
    file,
    context: t.context,
  })
}

// ─── Run ─────────────────────────────────────────────────────────────────────

const sources = loadSources()

for (const src of sources) {
  for (const t of extractEntityTypeRefs(src.content)) {
    classifyEntityToken(t, src.file)
  }
  for (const t of extractEdgeTypeRefs(src.content)) {
    classifyEdgeToken(t, src.file)
  }
  for (const t of extractPropertyRefs(src.content)) {
    classifyPropertyToken(t, src.file)
  }
  for (const t of extractDomainIdRefs(src.content)) {
    classifyDomainToken(t, src.file)
  }
}

// ─── Report ──────────────────────────────────────────────────────────────────

const report = new Report('Skills + Workflows canon correctness')

const byBucket = new Map<string, Finding[]>()
for (const f of findings) {
  const k = `${f.bucket}/${f.kind}`
  if (!byBucket.has(k)) byBucket.set(k, [])
  byBucket.get(k)!.push(f)
}

// Split findings into "gated" (strict) and "baseline" (warning-only).
const gatedFindings: Finding[] = []
const baselineFindings: Finding[] = []
for (const f of findings) {
  if (BASELINE_DRIFT_FILES.has(f.file)) baselineFindings.push(f)
  else gatedFindings.push(f)
}

function emitBucketed(list: Finding[], emit: (msg: string) => void): void {
  const byKey = new Map<string, Finding[]>()
  for (const f of list) {
    const k = `${f.bucket}/${f.kind}`
    if (!byKey.has(k)) byKey.set(k, [])
    byKey.get(k)!.push(f)
  }
  for (const k of [...byKey.keys()].sort()) {
    const sub = byKey.get(k)!
    const byToken = new Map<string, Finding[]>()
    for (const f of sub) {
      if (!byToken.has(f.token)) byToken.set(f.token, [])
      byToken.get(f.token)!.push(f)
    }
    for (const [token, occ] of [...byToken.entries()].sort(([a], [b]) => a.localeCompare(b))) {
      const fileSet = new Set(occ.map((o) => o.file))
      const sample = [...fileSet].slice(0, 3).join(', ')
      const more = fileSet.size > 3 ? ` +${fileSet.size - 3}` : ''
      emit(
        `[${k}] "${token}" — ${occ.length} occurrence(s) across ${fileSet.size} file(s): ${sample}${more}`,
      )
    }
  }
}

emitBucketed(gatedFindings, (m) => report.error(m))
emitBucketed(baselineFindings, (m) => report.warn(`(baseline) ${m}`))

report.info(`Sources scanned: ${sources.length}`)
report.info(`Canonical entity types: ${TYPES.size}`)
report.info(`Canonical edge types: ${EDGES.size}`)
report.info(`Canonical domain ids: ${DOMAIN_IDS.size}`)
report.info(`Property keys (union across schemas): ${ALL_PROPERTIES.size}`)

report.print()

if (report.errorCount > 0) process.exitCode = 1
