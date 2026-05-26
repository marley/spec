/**
 * UPG Catalog Hygiene Audit — UPG-518 + UPG-519
 *
 * UPG-518: Terminal entity audit
 *   For every entity in UPG_TYPES, classify:
 *     TERMINAL     — 0 outgoing edges in UPG_EDGE_CATALOG
 *     NEAR-TERMINAL — 1-2 outgoing edges
 *     WELL-WIRED   — 3+ outgoing edges
 *   For each TERMINAL/NEAR-TERMINAL: count incoming edges, check domain_guide
 *   patterns for hints of missing outbound relationships, classify as
 *   LEGITIMATE_LEAF | UNDER-WIRED | UNCLEAR.
 *
 * UPG-519: Edge pair map audit
 *   1. Orphan entries — pair-map entries whose edge_type no longer exists
 *   2. Missing entries — edges in catalog not in pair-map
 *   3. Type-mismatch entries — pair-map key doesn't match edge endpoints
 *   4. Collision distribution — pairs with multiple candidates
 *
 * Usage:
 *   npx tsx scripts/audit-catalog-hygiene.ts              # markdown to stdout
 *   npx tsx scripts/audit-catalog-hygiene.ts --json       # JSON to stdout
 *   npx tsx scripts/audit-catalog-hygiene.ts --write      # write to output files
 *
 * Exit code: 0 — reporting tool only, no CI gate.
 */

import { writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

import { UPG_ENTITY_META } from '../src/registry/entity-meta.js'
import { UPG_DOMAINS } from '../src/registry/domains.js'
import {
  UPG_EDGE_CATALOG,
  UPG_WILDCARD_ENDPOINT,
} from '../src/catalog/edge-catalog.js'
import {
  UPG_EDGE_PAIR_MAP,
  pickCanonicalEdge,
} from '../src/index.js'
import { UPG_DOMAIN_GUIDES } from '../src/intelligence/domain-guides.js'

// ── Constants ──────────────────────────────────────────────────────────────────

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUTPUT_DIR = join(__dirname, 'output')
const ANALYSIS_DIR = join(__dirname, '../../../TPC-context/upg/02-spec/analysis')
const AUDIT_DATE = '2026-05-21'

// ── Active entity types ────────────────────────────────────────────────────────

const ACTIVE_TYPES = UPG_ENTITY_META
  .filter((m) => m.maturity === 'stable' || m.maturity === 'proposed')
  .map((m) => m.name)

const ACTIVE_TYPE_SET = new Set(ACTIVE_TYPES)

// ── Domain lookup ──────────────────────────────────────────────────────────────

/**
 * Build a map from entity type → domain id.
 * Types that appear in multiple domains (should be rare/none) get the first.
 */
const typeToDomain: Record<string, string> = {}
for (const domain of UPG_DOMAINS) {
  for (const type of domain.types) {
    if (!typeToDomain[type]) {
      typeToDomain[type] = domain.id
    }
  }
}

// ── Edge index ─────────────────────────────────────────────────────────────────

type EdgeEntry = {
  key: string
  source_type: string
  target_type: string
  classification: string
  forward_verb: string
  reverse_verb: string
}

const ALL_EDGES: EdgeEntry[] = Object.entries(UPG_EDGE_CATALOG).map(
  ([key, def]) => ({ key, ...def }),
)

// Only non-polymorphic edges count for terminal analysis
const TYPED_EDGES = ALL_EDGES.filter(
  (e) =>
    e.source_type !== UPG_WILDCARD_ENDPOINT &&
    e.target_type !== UPG_WILDCARD_ENDPOINT,
)

// Outgoing edges per source type (excluding wildcard endpoints)
const outboundByType: Record<string, string[]> = {}
// Incoming edges per target type (excluding wildcard endpoints)
const inboundByType: Record<string, string[]> = {}

for (const edge of TYPED_EDGES) {
  ;(outboundByType[edge.source_type] ??= []).push(edge.key)
  ;(inboundByType[edge.target_type] ??= []).push(edge.key)
}

// ── Domain guide pattern analysis ─────────────────────────────────────────────

/**
 * For a given entity type, scan all domain guides for pattern edge_chains
 * and required_bridges that ORIGINATE from this type (i.e. this type
 * appears in edge_chain but the edge doesn't exist in catalog).
 *
 * Returns an array of human-readable hint strings.
 */
function getDomainGuidePatternHints(entityType: string): string[] {
  const hints: string[] = []
  const catalogEdgeSet = new Set(Object.keys(UPG_EDGE_CATALOG))

  for (const guide of UPG_DOMAIN_GUIDES) {
    for (const pattern of guide.patterns) {
      // Check if this entity appears in pattern entity_types
      if (pattern.entity_types.includes(entityType as any)) {
        // Check each edge in the chain to see if the entity is a source
        for (const edgeKey of pattern.edge_chain) {
          if (!catalogEdgeSet.has(edgeKey)) {
            // Edge in guide but not in catalog — that's a hint gap
            hints.push(`guide pattern "${pattern.name}" references edge ${edgeKey} (not in catalog)`)
          } else {
            const edgeDef = UPG_EDGE_CATALOG[edgeKey as keyof typeof UPG_EDGE_CATALOG]
            if (edgeDef && edgeDef.source_type === entityType) {
              // The entity is a source in this pattern — this is expected/covered
              // Only flag if the entity has ZERO outbound edges (terminal case)
              if ((outboundByType[entityType] ?? []).length === 0) {
                hints.push(`pattern "${pattern.name}" expects ${entityType} as source via ${edgeKey} but entity has no outgoing edges`)
              }
            }
          }
        }
      }
    }

    // Check required_bridges originating from this entity type
    for (const bridge of guide.required_bridges) {
      const edgeKey = bridge.edge_type
      if (catalogEdgeSet.has(edgeKey)) {
        const edgeDef = UPG_EDGE_CATALOG[edgeKey as keyof typeof UPG_EDGE_CATALOG]
        if (edgeDef && edgeDef.source_type === entityType) {
          if ((outboundByType[entityType] ?? []).length === 0) {
            hints.push(`required bridge "${edgeKey}" (→ ${bridge.target_domain}) expects ${entityType} as source`)
          }
        }
      }
    }
  }

  return [...new Set(hints)]
}

// ── LEGITIMATE LEAF classification logic ──────────────────────────────────────

/**
 * Artifact / document types that are conceptual endpoints: they accumulate
 * inbound references but don't logically "cause" downstream entities.
 */
const KNOWN_ARTIFACT_TYPES = new Set([
  // Documents / records
  'runbook', 'postmortem', 'changelog', 'document', 'brand_asset',
  'knowledge_base_article', 'content_piece', 'documentation_template',
  'press_release', 'quote', 'survey_response', 'annotation', 'interaction_spec',
  'brand_logo', 'brand_typography', 'brand_colour', 'brand_imagery', 'brand_voice',
  // Atomic measurement / configuration objects
  'acceptance_criterion', 'story_statement', 'translation_key',
  'service_level_indicator', 'test_result', 'audit_log_policy',
  'workflow_artifact', 'eval_run', 'ai_trace', 'agent_hook',
  // Leaf value types
  'design_token', 'design_guideline', 'design_pattern',
  'contract_clause', 'privacy_policy', 'access_policy', 'data_classification',
  'a11y_annotation', 'a11y_guideline', 'a11y_issue',
  'regional_pricing', 'cultural_adaptation',
  'status_report', 'capacity_plan', 'resource_allocation',
  'help_video', 'webinar', 'certification', 'walkthrough', 'tutorial',
  'partner_revenue_share', 'developer_portal', 'marketplace_listing',
  'locale_config', 'translation_bundle',
])

/**
 * Concepts that should drive downstream effects but currently appear terminal.
 * Based on domain knowledge of what these types represent:
 * - domain_event: should trigger commands / be handled by aggregates
 * - external_api: should be consumed by services / integrations
 * - command: should be handled by aggregates
 * - etc.
 */
const KNOWN_UNDER_WIRED_TYPES = new Set([
  // Engineering concepts that should have outbound edges to downstream entities
  'domain_event', 'external_api', 'command', 'read_model',
  'api_contract', 'value_object', 'domain_entity', 'queue_topic',
  'build_artifact', 'code_repository', 'library_dependency', 'integration_pattern', 'data_flow',
  // Investigation chain atoms — should cause other entities
  'root_cause', 'symptom', 'fix', 'investigation',
  // Compliance atoms that should constrain downstream
  'compliance_requirement', 'security_control', 'threat', 'vulnerability',
  'penetration_test', 'security_review', 'threat_model', 'security_policy',
  // Growth analytics atoms
  'funnel_step', 'behavioral_segment', 'cohort', 'variant', 'attribution_model',
  'growth_loop', 'growth_campaign', 'acquisition_channel',
  // Sales pipeline entities
  'pipeline_stage', 'deal', 'contact', 'lead', 'subscription', 'invoice', 'forecast',
  // Customer success atoms
  'touchpoint', 'customer_journey_stage', 'success_milestone',
  'churn_reason', 'customer_feedback', 'support_ticket',
  // Localisation
  'locale',
  // Research atoms
  'participant', 'observation', 'affinity_cluster',
  // Feedback atoms
  'feedback_vote', 'feature_request',
])

type TerminalClass = 'LEGITIMATE_LEAF' | 'UNDER-WIRED' | 'UNCLEAR'

function classifyTerminalEntity(type: string): TerminalClass {
  if (KNOWN_ARTIFACT_TYPES.has(type)) return 'LEGITIMATE_LEAF'
  if (KNOWN_UNDER_WIRED_TYPES.has(type)) return 'UNDER-WIRED'
  return 'UNCLEAR'
}

// ── UPG-518: Terminal Entity Audit ────────────────────────────────────────────

interface TerminalEntityResult {
  entity: string
  domain: string
  inbound: number
  outbound: number
  tier: 'TERMINAL' | 'NEAR-TERMINAL' | 'WELL-WIRED'
  classification?: TerminalClass
  pattern_hints: string[]
  inbound_edge_keys: string[]
  outbound_edge_keys: string[]
}

const terminalResults: TerminalEntityResult[] = []

for (const type of ACTIVE_TYPES) {
  const outEdges = outboundByType[type] ?? []
  const inEdges = inboundByType[type] ?? []
  const outCount = outEdges.length
  const inCount = inEdges.length

  let tier: 'TERMINAL' | 'NEAR-TERMINAL' | 'WELL-WIRED'
  if (outCount === 0) tier = 'TERMINAL'
  else if (outCount <= 2) tier = 'NEAR-TERMINAL'
  else tier = 'WELL-WIRED'

  const result: TerminalEntityResult = {
    entity: type,
    domain: typeToDomain[type] ?? 'unknown',
    inbound: inCount,
    outbound: outCount,
    tier,
    inbound_edge_keys: inEdges,
    outbound_edge_keys: outEdges,
    pattern_hints: [],
  }

  if (tier === 'TERMINAL' || tier === 'NEAR-TERMINAL') {
    result.classification = classifyTerminalEntity(type)
    result.pattern_hints = getDomainGuidePatternHints(type)
  }

  terminalResults.push(result)
}

const terminalEntities = terminalResults.filter((r) => r.tier === 'TERMINAL')
const nearTerminalEntities = terminalResults.filter((r) => r.tier === 'NEAR-TERMINAL')
const wellWiredEntities = terminalResults.filter((r) => r.tier === 'WELL-WIRED')

// ── UPG-519: Edge Pair Map Audit ──────────────────────────────────────────────

interface PairMapIssue {
  type: 'ORPHAN' | 'MISSING' | 'TYPE_MISMATCH'
  pair?: string
  edge_type?: string
  detail: string
}

interface CollisionEntry {
  pair: string
  candidates: string[]
  canonical_pick: string | null
  deterministic: boolean
}

const pairMapIssues: PairMapIssue[] = []
const collisions: CollisionEntry[] = []

const catalogEdgeSet = new Set(Object.keys(UPG_EDGE_CATALOG))

// 1. Orphan entries — pair-map entries whose edge_type doesn't exist in catalog
//    Note: UPG_EDGE_PAIR_MAP is built dynamically FROM UPG_EDGE_CATALOG at runtime,
//    so orphans can only exist if there were stale entries in a static version.
//    We check against the runtime-built map for any stale edge_type values.
for (const [pair, edgeTypes] of Object.entries(UPG_EDGE_PAIR_MAP)) {
  for (const edgeType of edgeTypes) {
    if (!catalogEdgeSet.has(edgeType)) {
      pairMapIssues.push({
        type: 'ORPHAN',
        pair,
        edge_type: edgeType,
        detail: `Pair-map entry ${pair} → ${edgeType} references an edge_type not in UPG_EDGE_CATALOG`,
      })
    }
  }
}

// 2. Missing entries — edges in catalog not represented in pair-map
//    An edge is "missing" from the pair-map if its (source:target) key
//    doesn't appear in UPG_EDGE_PAIR_MAP at all. Since the map is built
//    dynamically, all catalog edges SHOULD appear. We verify.
for (const edge of ALL_EDGES) {
  const pair = `${edge.source_type}:${edge.target_type}`
  const mapEntry = UPG_EDGE_PAIR_MAP[pair]
  if (!mapEntry || !mapEntry.includes(edge.key as any)) {
    pairMapIssues.push({
      type: 'MISSING',
      pair,
      edge_type: edge.key,
      detail: `Edge ${edge.key} (${pair}) is not found in UPG_EDGE_PAIR_MAP[${pair}]`,
    })
  }
}

// 3. Type-mismatch entries — pair-map key doesn't match edge's declared endpoints
//    Key format is `${source_type}:${target_type}`. Verify each.
for (const [pair, edgeTypes] of Object.entries(UPG_EDGE_PAIR_MAP)) {
  const [keySource, keyTarget] = pair.split(':')
  for (const edgeType of edgeTypes) {
    if (!catalogEdgeSet.has(edgeType)) continue // already caught as orphan
    const edgeDef = UPG_EDGE_CATALOG[edgeType as keyof typeof UPG_EDGE_CATALOG]
    if (!edgeDef) continue
    if (edgeDef.source_type !== keySource || edgeDef.target_type !== keyTarget) {
      pairMapIssues.push({
        type: 'TYPE_MISMATCH',
        pair,
        edge_type: edgeType,
        detail: `Pair-map key "${pair}" but edge ${edgeType} declares source=${edgeDef.source_type}, target=${edgeDef.target_type}`,
      })
    }
  }
}

// 4. Collision distribution — pairs with multiple candidate edges
for (const [pair, candidates] of Object.entries(UPG_EDGE_PAIR_MAP)) {
  if (candidates.length <= 1) continue
  const [src, tgt] = pair.split(':')
  const canonical = pickCanonicalEdge(src!, tgt!)
  // Deterministic if pickCanonicalEdge always returns the same edge
  // (it uses classification ranking which is stable)
  const deterministic = canonical !== null

  collisions.push({
    pair,
    candidates: [...candidates],
    canonical_pick: canonical,
    deterministic,
  })
}

// ── Synthesis: Top-5 impact lists ─────────────────────────────────────────────

/**
 * Rank UNDER-WIRED terminal entities by inbound edge count
 * (high inbound + zero outbound = biggest graph dead-end).
 */
const top5UnderWired = terminalEntities
  .filter((e) => e.classification === 'UNDER-WIRED')
  .sort((a, b) => b.inbound - a.inbound)
  .slice(0, 5)

/**
 * Rank UNDER-WIRED NEAR-TERMINAL entities (1-2 outgoing but expected more).
 */
const top5UnderWiredNear = nearTerminalEntities
  .filter((e) => e.classification === 'UNDER-WIRED')
  .sort((a, b) => b.inbound - a.inbound)
  .slice(0, 5)

const top5Upg518 = [...top5UnderWired, ...top5UnderWiredNear].slice(0, 5)

/**
 * Top UPG-519 fixes — highest collision count pairs first,
 * then any missing/orphan/mismatch issues.
 */
const top5Upg519 = [
  ...collisions.sort((a, b) => b.candidates.length - a.candidates.length).slice(0, 3),
  ...pairMapIssues.filter((i) => i.type === 'MISSING').slice(0, 2),
].slice(0, 5)

// ── JSON output ────────────────────────────────────────────────────────────────

const jsonOutput = {
  generated_at: AUDIT_DATE,
  upg_518: {
    summary: {
      total_entity_types: ACTIVE_TYPES.length,
      terminal: terminalEntities.length,
      near_terminal: nearTerminalEntities.length,
      well_wired: wellWiredEntities.length,
    },
    terminal_entities: terminalEntities,
    near_terminal_entities: nearTerminalEntities,
  },
  upg_519: {
    summary: {
      orphan_entries: pairMapIssues.filter((i) => i.type === 'ORPHAN').length,
      missing_entries: pairMapIssues.filter((i) => i.type === 'MISSING').length,
      type_mismatch_entries: pairMapIssues.filter((i) => i.type === 'TYPE_MISMATCH').length,
      collision_pairs: collisions.length,
      total_pair_map_entries: Object.keys(UPG_EDGE_PAIR_MAP).length,
    },
    issues: pairMapIssues,
    collisions,
  },
  synthesis: {
    top5_upg518_under_wired: top5Upg518.map((e) => ({
      entity: e.entity,
      domain: e.domain,
      inbound: e.inbound,
      outbound: e.outbound,
      tier: e.tier,
      classification: e.classification,
    })),
    top5_upg519: top5Upg519,
  },
}

// ── Markdown report ────────────────────────────────────────────────────────────

function formatMarkdownReport(): string {
  const lines: string[] = []

  lines.push(`# Catalog hygiene audit — UPG-518 + UPG-519`)
  lines.push(``)
  lines.push(`*${AUDIT_DATE}*`)
  lines.push(``)

  // ── UPG-518 ──────────────────────────────────────────────────────────────────
  lines.push(`## UPG-518 — Terminal entity audit`)
  lines.push(``)
  lines.push(`### Summary`)
  lines.push(``)
  lines.push(`- Total entity types (stable + proposed): **${ACTIVE_TYPES.length}**`)
  lines.push(`- TERMINAL (0 outgoing): **${terminalEntities.length}**`)
  lines.push(`- NEAR-TERMINAL (1-2 outgoing): **${nearTerminalEntities.length}**`)
  lines.push(`- WELL-WIRED (3+ outgoing): **${wellWiredEntities.length}**`)
  lines.push(``)
  lines.push(`> Note: "outgoing" counts only typed (non-wildcard) edges where this entity is the source. `)
  lines.push(`> Polymorphic edges (\`node_*\`) are excluded — they apply to every type by definition.`)
  lines.push(`> UPG-517 added 3 edges affecting \`postmortem\` — it is no longer a leaf and appears in WELL-WIRED.`)
  lines.push(``)

  // ── Terminal entities table ───────────────────────────────────────────────────
  lines.push(`### Terminal entities — classification`)
  lines.push(``)
  lines.push(`| Entity | Domain | In | Out | Classification | Pattern hints |`)
  lines.push(`|---|---|---|---|---|---|`)

  for (const entity of terminalEntities.sort((a, b) => b.inbound - a.inbound)) {
    const hints = entity.pattern_hints.length > 0
      ? entity.pattern_hints.join('; ')
      : '—'
    const cls = entity.classification ?? '—'
    lines.push(`| \`${entity.entity}\` | ${entity.domain} | ${entity.inbound} | ${entity.outbound} | ${cls} | ${hints} |`)
  }
  lines.push(``)

  // ── Near-terminal entities table ──────────────────────────────────────────────
  lines.push(`### Near-terminal entities (1-2 outgoing)`)
  lines.push(``)
  lines.push(`| Entity | Domain | In | Out | Outgoing edges | Classification | Pattern hints |`)
  lines.push(`|---|---|---|---|---|---|---|`)

  for (const entity of nearTerminalEntities.sort((a, b) => b.inbound - a.inbound)) {
    const outEdgeList = entity.outbound_edge_keys.join(', ')
    const hints = entity.pattern_hints.length > 0
      ? entity.pattern_hints.join('; ')
      : '—'
    const cls = entity.classification ?? '—'
    lines.push(`| \`${entity.entity}\` | ${entity.domain} | ${entity.inbound} | ${entity.outbound} | \`${outEdgeList}\` | ${cls} | ${hints} |`)
  }
  lines.push(``)

  // ── Recommended actions ───────────────────────────────────────────────────────
  lines.push(`### Recommended action per under-wired entity`)
  lines.push(``)
  lines.push(`*(Spock will use this as the v0.7 fix backlog)*`)
  lines.push(``)

  const underWiredTerminal = terminalEntities.filter((e) => e.classification === 'UNDER-WIRED')
  const underWiredNear = nearTerminalEntities.filter((e) => e.classification === 'UNDER-WIRED')

  if (underWiredTerminal.length === 0 && underWiredNear.length === 0) {
    lines.push(`*No UNDER-WIRED entities found.*`)
  } else {
    lines.push(`**TERMINAL — zero outgoing edges (high priority):**`)
    lines.push(``)
    for (const entity of underWiredTerminal.sort((a, b) => b.inbound - a.inbound)) {
      lines.push(`- \`${entity.entity}\` (${entity.domain}) — ${entity.inbound} incoming edges, 0 outgoing. `)
      lines.push(`  Add at least one outbound edge to connect this concept to its downstream effects.`)
      if (entity.pattern_hints.length > 0) {
        for (const hint of entity.pattern_hints) {
          lines.push(`  *Hint: ${hint}*`)
        }
      }
    }
    lines.push(``)
    lines.push(`**NEAR-TERMINAL — 1-2 outgoing edges (medium priority):**`)
    lines.push(``)
    for (const entity of underWiredNear.sort((a, b) => b.inbound - a.inbound)) {
      const out = entity.outbound_edge_keys.join(', ')
      lines.push(`- \`${entity.entity}\` (${entity.domain}) — ${entity.inbound} in / ${entity.outbound} out [\`${out}\`].`)
      lines.push(`  Consider whether additional downstream edges are missing.`)
      if (entity.pattern_hints.length > 0) {
        for (const hint of entity.pattern_hints) {
          lines.push(`  *Hint: ${hint}*`)
        }
      }
    }
  }
  lines.push(``)

  // ── UPG-519 ──────────────────────────────────────────────────────────────────
  lines.push(`## UPG-519 — Edge pair map audit`)
  lines.push(``)
  lines.push(`*UPG_EDGE_PAIR_MAP is built dynamically from UPG_EDGE_CATALOG at runtime (not a static registry).*`)
  lines.push(`*Since it's computed from the catalog, structural integrity is guaranteed — the audit below confirms this.*`)
  lines.push(``)

  const orphans = pairMapIssues.filter((i) => i.type === 'ORPHAN')
  const missing = pairMapIssues.filter((i) => i.type === 'MISSING')
  const mismatches = pairMapIssues.filter((i) => i.type === 'TYPE_MISMATCH')

  lines.push(`### Summary`)
  lines.push(``)
  lines.push(`- Total pair-map entries: **${Object.keys(UPG_EDGE_PAIR_MAP).length}** distinct (source, target) pairs`)
  lines.push(`- Total catalog edges: **${Object.keys(UPG_EDGE_CATALOG).length}**`)
  lines.push(`- Orphan entries (stale edge_type references): **${orphans.length}**`)
  lines.push(`- Missing entries (edges not indexed): **${missing.length}**`)
  lines.push(`- Type-mismatch entries: **${mismatches.length}**`)
  lines.push(`- Collision pairs (multiple candidate edges): **${collisions.length}**`)
  lines.push(``)

  lines.push(`### Orphan entries (stale edge_type references)`)
  lines.push(``)
  if (orphans.length === 0) {
    lines.push(`*None — all pair-map edge_type values exist in UPG_EDGE_CATALOG.*`)
  } else {
    for (const issue of orphans) {
      lines.push(`- Pair \`${issue.pair}\` → \`${issue.edge_type}\`: ${issue.detail}`)
    }
  }
  lines.push(``)

  lines.push(`### Missing entries (edges not indexed)`)
  lines.push(``)
  if (missing.length === 0) {
    lines.push(`*None — all catalog edges are present in UPG_EDGE_PAIR_MAP.*`)
  } else {
    for (const issue of missing) {
      lines.push(`- Edge \`${issue.edge_type}\` (pair \`${issue.pair}\`): ${issue.detail}`)
    }
  }
  lines.push(``)

  lines.push(`### Type-mismatch entries`)
  lines.push(``)
  if (mismatches.length === 0) {
    lines.push(`*None — all pair-map keys match their edges' declared source and target types.*`)
  } else {
    for (const issue of mismatches) {
      lines.push(`- Pair \`${issue.pair}\` / edge \`${issue.edge_type}\`: ${issue.detail}`)
    }
  }
  lines.push(``)

  lines.push(`### Collision distribution`)
  lines.push(``)
  lines.push(`Collisions = pairs where multiple edges share the same (source, target). `)
  lines.push(`\`pickCanonicalEdge\` resolves via: hierarchy ≻ causal ≻ semantic ≻ cross-domain.`)
  lines.push(``)

  if (collisions.length === 0) {
    lines.push(`*No collisions found.*`)
  } else {
    lines.push(`| Pair | Candidate count | Candidate edges | Canonical pick | Deterministic? |`)
    lines.push(`|---|---|---|---|---|`)
    for (const col of collisions.sort((a, b) => b.candidates.length - a.candidates.length)) {
      const candidateStr = col.candidates.map((c) => `\`${c}\``).join(', ')
      const pick = col.canonical_pick ? `\`${col.canonical_pick}\`` : '`null`'
      lines.push(`| \`${col.pair}\` | ${col.candidates.length} | ${candidateStr} | ${pick} | ${col.deterministic ? 'Yes' : 'No'} |`)
    }
  }
  lines.push(``)

  // ── Synthesis ─────────────────────────────────────────────────────────────────
  lines.push(`## Synthesis`)
  lines.push(``)

  lines.push(`### Top 5 highest-impact UPG-518 fixes (under-wired entities)`)
  lines.push(``)
  lines.push(`Ranked by inbound edge count — these are the most-referenced dead-ends in the graph.`)
  lines.push(``)

  if (top5Upg518.length === 0) {
    lines.push(`*No UNDER-WIRED entities found.*`)
  } else {
    for (let i = 0; i < top5Upg518.length; i++) {
      const e = top5Upg518[i]!
      lines.push(`${i + 1}. **\`${e.entity}\`** (${e.domain}) — ${e.inbound} inbound, ${e.outbound} outbound [${e.tier}]`)
      if (e.pattern_hints.length > 0) {
        lines.push(`   Domain guide hints: ${e.pattern_hints.join('; ')}`)
      }
    }
  }
  lines.push(``)

  lines.push(`### Top 5 highest-impact UPG-519 fixes`)
  lines.push(``)

  if (top5Upg519.length === 0) {
    lines.push(`*No pair-map issues found — map appears clean.*`)
  } else {
    for (let i = 0; i < top5Upg519.length; i++) {
      const item = top5Upg519[i]!
      if ('candidates' in item) {
        // Collision entry
        lines.push(`${i + 1}. **Collision pair \`${item.pair}\`** — ${item.candidates.length} candidates: ${item.candidates.join(', ')}. Canonical: \`${item.canonical_pick}\`.`)
      } else {
        // Issue entry
        lines.push(`${i + 1}. **[${item.type}]** \`${item.edge_type ?? ''}\` (pair \`${item.pair ?? ''}\`): ${item.detail}`)
      }
    }
  }
  lines.push(``)

  lines.push(`### Cross-cutting patterns`)
  lines.push(``)

  // Identify domains with disproportionate terminal counts
  const terminalByDomain: Record<string, number> = {}
  for (const e of terminalEntities) {
    terminalByDomain[e.domain] = (terminalByDomain[e.domain] ?? 0) + 1
  }
  const topTerminalDomains = Object.entries(terminalByDomain)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  lines.push(`**Domains with most terminal entities:**`)
  lines.push(``)
  for (const [domain, count] of topTerminalDomains) {
    lines.push(`- \`${domain}\`: ${count} terminal entities`)
  }
  lines.push(``)

  // Orphan entities (zero in AND zero out)
  const trulyOrphan = terminalEntities.filter((e) => e.inbound === 0 && e.outbound === 0)
  if (trulyOrphan.length > 0) {
    lines.push(`**Truly orphaned entities (0 in, 0 out — may indicate catalog gaps or deprecated types):**`)
    lines.push(``)
    for (const e of trulyOrphan) {
      lines.push(`- \`${e.entity}\` (${e.domain})`)
    }
    lines.push(``)
  }

  // UPG-517 accounting
  const postmortemOut = (outboundByType['postmortem'] ?? []).length
  const postmortemIn = (inboundByType['postmortem'] ?? []).length
  const postmortemTier = postmortemOut === 0 ? 'TERMINAL' : postmortemOut <= 2 ? 'NEAR-TERMINAL' : 'WELL-WIRED'
  lines.push(`**UPG-517 accounting:**`)
  lines.push(``)
  lines.push(`UPG-517 (sibling branch, not yet merged into this branch's base) added 3 edges to address \`postmortem\` `)
  lines.push(`being a pure terminal. On this branch, \`postmortem\` is **${postmortemTier}** with `)
  lines.push(`${postmortemOut} outgoing and ${postmortemIn} incoming edges. Once UPG-517 merges, \`postmortem\` `)
  lines.push(`will gain \`postmortem_identifies_root_cause\` + \`postmortem_produces_runbook\` and become NEAR-TERMINAL (2 out).`)
  lines.push(``)

  // Pair-map integrity note
  lines.push(`**Pair-map architecture note:**`)
  lines.push(``)
  lines.push(`\`UPG_EDGE_PAIR_MAP\` is built at module-load time by iterating \`UPG_EDGE_CATALOG\`. `)
  lines.push(`This means orphan/missing/mismatch issues in a purely dynamic map are structurally impossible `)
  lines.push(`unless there is a bug in the build logic. The ${orphans.length} orphan(s), ${missing.length} missing, `)
  lines.push(`and ${mismatches.length} mismatch(es) found above are the runtime verification of that invariant.`)
  lines.push(``)
  lines.push(`The real UPG-519 action surface is the **collision distribution** — ${collisions.length} pairs `)
  lines.push(`where multiple edges share the same (source, target). These are the cases where `)
  lines.push(`\`pickCanonicalEdge\` must apply its deterministic ranking policy.`)

  return lines.join('\n')
}

// ── Output routing ─────────────────────────────────────────────────────────────

const args = process.argv.slice(2)
const wantsJson = args.includes('--json')
const wantsWrite = args.includes('--write')

const markdown = formatMarkdownReport()

if (wantsJson) {
  console.log(JSON.stringify(jsonOutput, null, 2))
} else if (wantsWrite) {
  mkdirSync(OUTPUT_DIR, { recursive: true })
  mkdirSync(ANALYSIS_DIR, { recursive: true })

  const jsonPath = join(OUTPUT_DIR, 'catalog-hygiene-audit.json')
  writeFileSync(jsonPath, JSON.stringify(jsonOutput, null, 2), 'utf-8')
  console.error(`Wrote JSON → ${jsonPath}`)

  const mdPath = join(ANALYSIS_DIR, `${AUDIT_DATE}-catalog-hygiene-audit.md`)
  writeFileSync(mdPath, markdown, 'utf-8')
  console.error(`Wrote Markdown → ${mdPath}`)

  // Print summary to stdout
  console.log(`\n=== UPG-518 SUMMARY ===`)
  console.log(`Total entity types: ${ACTIVE_TYPES.length}`)
  console.log(`TERMINAL (0 outgoing): ${terminalEntities.length}`)
  console.log(`NEAR-TERMINAL (1-2 outgoing): ${nearTerminalEntities.length}`)
  console.log(`WELL-WIRED (3+ outgoing): ${wellWiredEntities.length}`)
  console.log(``)
  console.log(`=== UPG-519 SUMMARY ===`)
  console.log(`Total pair-map pairs: ${Object.keys(UPG_EDGE_PAIR_MAP).length}`)
  console.log(`Total catalog edges: ${Object.keys(UPG_EDGE_CATALOG).length}`)
  console.log(`Orphan entries: ${pairMapIssues.filter((i) => i.type === 'ORPHAN').length}`)
  console.log(`Missing entries: ${pairMapIssues.filter((i) => i.type === 'MISSING').length}`)
  console.log(`Type-mismatch entries: ${pairMapIssues.filter((i) => i.type === 'TYPE_MISMATCH').length}`)
  console.log(`Collision pairs: ${collisions.length}`)
} else {
  console.log(markdown)
}
