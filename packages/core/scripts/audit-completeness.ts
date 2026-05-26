/**
 * UPG Spec Completeness Audit
 *
 * For every active entity type registered in UPG_ENTITY_META, check that it has:
 *   - A property interface in `properties/domains/` (proxied via UPG_PROPERTY_SCHEMA).
 *   - At least one entry in UPG_VALID_CHILDREN as parent OR as child.
 *   - At least one outbound or inbound edge in UPG_EDGE_CATALOG
 *     (or be one of the small list of intentionally lateral reference types).
 *
 * Cross-checks:
 *   - For every (parent, child) in UPG_VALID_CHILDREN, ensure a hierarchy edge
 *     exists in UPG_EDGE_CATALOG.
 *   - For every edge in UPG_EDGE_CATALOG, ensure both source_type and
 *     target_type are present in UPG_ENTITY_META (wildcards excepted).
 *
 * Findings are categorised G1..G4.
 *
 * Usage:
 *   npx tsx scripts/audit-completeness.ts            # markdown to stdout
 *   npx tsx scripts/audit-completeness.ts --json     # JSON to stdout
 *   npx tsx scripts/audit-completeness.ts --summary  # short counts only
 *
 * Exit code is 0 regardless of findings — this is a reporting tool.
 * The matching Vitest gate lives in
 * `src/__tests__/audit-completeness.test.ts` and is what fails CI.
 */

import { UPG_ENTITY_META } from '../src/registry/entity-meta.js'
import { UPG_VALID_CHILDREN } from '../src/grammar/hierarchy.js'
import {
  UPG_EDGE_CATALOG,
  UPG_WILDCARD_ENDPOINT,
} from '../src/catalog/edge-catalog.js'
import { UPG_PROPERTY_SCHEMA } from '../src/properties/property-schema.js'

// ── Types ──────────────────────────────────────────────────────────────────

interface Finding {
  category: 'G1' | 'G2' | 'G3' | 'G4' | 'G5'
  type?: string
  parent?: string
  child?: string
  edge?: string
  pair?: string
  edges?: string[]
  detail: string
}

// ── Active types (exclude deprecated/removed) ───────────────────────────────

const ACTIVE_TYPES = new Set(
  UPG_ENTITY_META
    .filter((m) => m.maturity === 'stable' || m.maturity === 'proposed')
    .map((m) => m.name),
)

const ALL_META_TYPES = new Set(UPG_ENTITY_META.map((m) => m.name))

// ── Build indexes from catalog ──────────────────────────────────────────────

const outboundEdgesByType: Record<string, string[]> = {}
const inboundEdgesByType: Record<string, string[]> = {}
const edgePairs = new Set<string>() // `${source}::${target}` for hierarchy lookups

const CATALOG_ENTRIES = Object.entries(UPG_EDGE_CATALOG) as Array<
  [
    string,
    {
      forward_verb: string
      reverse_verb: string
      classification: string
      source_type: string
      target_type: string
    },
  ]
>

for (const [key, edge] of CATALOG_ENTRIES) {
  const s = edge.source_type
  const t = edge.target_type
  ;(outboundEdgesByType[s] ??= []).push(key)
  ;(inboundEdgesByType[t] ??= []).push(key)
  edgePairs.add(`${s}::${t}`)
}

// ── Hierarchy index (parent -> children, child -> parents) ──────────────────

const childrenByParent: Record<string, readonly string[]> = UPG_VALID_CHILDREN
const parentsOfChild: Record<string, string[]> = {}
for (const [parent, children] of Object.entries(UPG_VALID_CHILDREN)) {
  for (const c of children) {
    ;(parentsOfChild[c] ??= []).push(parent)
  }
}

// ── Allowlist of types that legitimately have no edges/hierarchy ────────────
//
// Reasoning: some types are intentionally "leaf reference types" or are
// rarely-used annotations whose edges live entirely as polymorphic
// `tagged_with` or `references_artifact` patterns. We do NOT default-allow
// anything here today — every entry should carry a rationale comment when
// added during triage in step 2.

const INTENTIONAL_ORPHAN_TYPES = new Set<string>([
  // (none yet — fill during triage)
])

// ── Categorised findings ────────────────────────────────────────────────────

const findings: Finding[] = []

// G1 — Hierarchy gaps: types that are not in UPG_VALID_CHILDREN at all
for (const type of ACTIVE_TYPES) {
  const isParent = type in childrenByParent
  const isChild = type in parentsOfChild
  if (!isParent && !isChild && !INTENTIONAL_ORPHAN_TYPES.has(type)) {
    findings.push({
      category: 'G1',
      type,
      detail: 'Type appears in entity-meta but is not present in UPG_VALID_CHILDREN as parent or child.',
    })
  }
}

// G2 — Edge gaps: types with zero inbound AND zero outbound edges
for (const type of ACTIVE_TYPES) {
  const hasOut = (outboundEdgesByType[type] ?? []).length > 0
  const hasIn = (inboundEdgesByType[type] ?? []).length > 0
  if (!hasOut && !hasIn && !INTENTIONAL_ORPHAN_TYPES.has(type)) {
    findings.push({
      category: 'G2',
      type,
      detail: 'Type has neither outbound nor inbound edges in UPG_EDGE_CATALOG.',
    })
  }
}

// G2b — Hierarchy declared but no matching hierarchy edge in catalog
for (const [parent, children] of Object.entries(UPG_VALID_CHILDREN)) {
  for (const child of children) {
    if (!edgePairs.has(`${parent}::${child}`)) {
      findings.push({
        category: 'G2',
        parent,
        child,
        detail: `UPG_VALID_CHILDREN declares ${parent} -> ${child} but no edge in UPG_EDGE_CATALOG has that (source, target) pair.`,
      })
    }
  }
}

// G3 — Property schema gaps: active types with no UPG_PROPERTY_SCHEMA entry
const propertyTypes = new Set(Object.keys(UPG_PROPERTY_SCHEMA))
for (const type of ACTIVE_TYPES) {
  if (!propertyTypes.has(type)) {
    findings.push({
      category: 'G3',
      type,
      detail: 'Active type has no entry in UPG_PROPERTY_SCHEMA (no typed properties registered).',
    })
  }
}

// G4 — Catalog/registry desync: edges referencing unknown types
for (const [key, edge] of CATALOG_ENTRIES) {
  for (const endpoint of ['source_type', 'target_type'] as const) {
    const t = edge[endpoint]
    if (t === UPG_WILDCARD_ENDPOINT) continue
    if (!ALL_META_TYPES.has(t)) {
      findings.push({
        category: 'G4',
        edge: key,
        detail: `Edge ${key} references unknown type "${t}" at ${endpoint} (not in UPG_ENTITY_META).`,
      })
    }
  }
}

// G5 — Resolver pair collisions: multiple edges share the same source:target.
//
// As of v0.4.1, `UPG_EDGE_PAIR_MAP` accumulates a list per pair and
// `pickCanonicalEdge` / `resolveContainmentEdge` apply a deterministic
// classification-ranked policy (hierarchy ≻ causal ≻ semantic ≻ cross-domain).
// Collisions are no longer silently last-wins — the audit continues to report
// every collision so spec authors can audit which classification will win.
const pairToKeys: Record<string, string[]> = {}
for (const [key, edge] of CATALOG_ENTRIES) {
  const pair = `${edge.source_type}:${edge.target_type}`
  ;(pairToKeys[pair] ??= []).push(key)
}
for (const [pair, keys] of Object.entries(pairToKeys)) {
  if (keys.length <= 1) continue
  findings.push({
    category: 'G5',
    pair,
    edges: keys,
    detail: `Pair ${pair} has ${keys.length} edges in UPG_EDGE_CATALOG; resolveContainmentEdge picks one deterministically via pickCanonicalEdge (hierarchy ≻ causal ≻ semantic ≻ cross-domain).`,
  })
}

// ── Output ──────────────────────────────────────────────────────────────────

const flag = process.argv[2]

const summary = {
  total_active_types: ACTIVE_TYPES.size,
  total_edges: CATALOG_ENTRIES.length,
  G1_hierarchy_orphans: findings.filter((f) => f.category === 'G1').length,
  G2_edge_gaps: findings.filter((f) => f.category === 'G2').length,
  G3_property_gaps: findings.filter((f) => f.category === 'G3').length,
  G4_desync: findings.filter((f) => f.category === 'G4').length,
  G5_resolver_pair_collisions: findings.filter((f) => f.category === 'G5').length,
}

export interface AuditResult {
  summary: typeof summary
  findings: Finding[]
}

export function runAudit(): AuditResult {
  return { summary, findings }
}

if (flag === '--json') {
  console.log(JSON.stringify({ summary, findings }, null, 2))
} else if (flag === '--summary') {
  console.log(JSON.stringify(summary, null, 2))
} else {
  // Markdown report
  const lines: string[] = []
  lines.push('# UPG Spec Completeness Audit')
  lines.push('')
  lines.push(`Generated: ${new Date().toISOString()}`)
  lines.push('')
  lines.push('## Summary')
  lines.push('')
  lines.push(`- Active types: **${summary.total_active_types}**`)
  lines.push(`- Catalog edges: **${summary.total_edges}**`)
  lines.push(`- G1 hierarchy orphans: **${summary.G1_hierarchy_orphans}**`)
  lines.push(`- G2 edge gaps: **${summary.G2_edge_gaps}**`)
  lines.push(`- G3 property-schema gaps: **${summary.G3_property_gaps}**`)
  lines.push(`- G4 catalog/registry desync: **${summary.G4_desync}**`)
  lines.push(`- G5 resolver pair collisions: **${summary.G5_resolver_pair_collisions}**`)
  lines.push('')

  const byCat: Record<string, Finding[]> = {}
  for (const f of findings) (byCat[f.category] ??= []).push(f)

  for (const cat of ['G1', 'G2', 'G3', 'G4', 'G5'] as const) {
    const rows = byCat[cat] ?? []
    if (rows.length === 0) continue
    lines.push(`## ${cat} — ${rows.length} findings`)
    lines.push('')
    for (const f of rows) {
      const id = f.type ?? f.edge ?? f.pair ?? `${f.parent} -> ${f.child}`
      const extra = f.edges ? ` — candidates: ${f.edges.join(', ')}` : ''
      lines.push(`- \`${id}\` — ${f.detail}${extra}`)
    }
    lines.push('')
  }

  console.log(lines.join('\n'))
}
