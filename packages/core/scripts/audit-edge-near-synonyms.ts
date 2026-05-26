#!/usr/bin/env tsx
/**
 * audit-edge-near-synonyms.ts — UPG-510
 *
 * Groups all edges in UPG_EDGE_CATALOG by (source_type, target_type) pair,
 * then classifies multi-edge pairs as:
 *   NEAR_SYNONYM        — verbs share root meaning (candidates for consolidation)
 *   EXACT_DUPLICATE     — identical forward_verb on same (source, target) pair
 *   DIFFERENT_RELATION  — verbs express genuinely different relationships
 *   MIXED               — pair has some near/exact duplicates AND some different relations
 *   UNCLEAR             — needs human review
 *
 * Outputs:
 *   - packages/upg-spec/scripts/output/edge-consolidation-audit.json
 *   - TPC-context/upg/02-spec/analysis/2026-05-21-edge-consolidation-audit.md
 */

import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import { UPG_EDGE_CATALOG } from '../src/catalog/edge-catalog.js'

// ─── Paths ────────────────────────────────────────────────────────────────────

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..', '..', '..')
const OUTPUT_DIR = path.join(__dirname, 'output')
const ANALYSIS_DIR = path.join(ROOT, 'TPC-context', 'upg', '02-spec', 'analysis')
const OUTPUT_JSON = path.join(OUTPUT_DIR, 'edge-consolidation-audit.json')
const OUTPUT_MD = path.join(ANALYSIS_DIR, '2026-05-21-edge-consolidation-audit.md')

fs.mkdirSync(OUTPUT_DIR, { recursive: true })
fs.mkdirSync(ANALYSIS_DIR, { recursive: true })

// ─── Semantic verb families (for NEAR_SYNONYM detection) ─────────────────────

/**
 * Each entry maps a set of verb stems to a canonical verb.
 * If two verbs in the same group appear on the same (source, target) pair,
 * they're NEAR_SYNONYM candidates.
 */
interface VerbFamily {
  stems: string[]      // verb root stems to match (start-of-normalised-verb)
  canonical: string    // the preferred canonical verb
  label: string        // human-readable family name
}

const VERB_FAMILIES: VerbFamily[] = [
  // NOTE: 'measured_by' and 'measures' are active/passive forms — handled by
  // isActivePassivePair(). Here we only group passive measurement verbs that
  // are near-synonyms of each other: measured_by / tracked_by / quantified_by.
  // The normaliser strips the '_by' suffix, so stems are: 'measur', 'track', 'quantif'.
  {
    stems: ['measur', 'track', 'quantif'],
    canonical: 'measured_by',
    label: 'passive measurement family (measured_by / tracked_by / quantified_by)',
  },
  {
    stems: ['produc', 'yield', 'generat', 'spawn'],
    canonical: 'produces',
    label: 'causal output family (produces / yields / generates / spawns)',
  },
  {
    stems: ['reveal', 'surfac', 'expos', 'uncover'],
    canonical: 'surfaces',
    label: 'surface/reveal family (reveals / surfaces / exposes)',
  },
  {
    stems: ['inform', 'suggest', 'impl'],
    canonical: 'informs',
    label: 'informs/suggests family (informs / suggests / implies)',
  },
  {
    stems: ['validat', 'verif', 'confirm'],
    canonical: 'validates',
    label: 'validation family (validates / verifies / confirms)',
  },
  {
    stems: ['driv', 'power', 'fuel'],
    canonical: 'drives',
    label: 'drives/powers family',
  },
  {
    stems: ['address', 'serv', 'satisf', 'fulfil', 'solv'],
    canonical: 'addresses',
    label: 'addresses/serves/satisfies family',
  },
  {
    stems: ['decompos', 'decomposes'],
    canonical: 'decomposes_into',
    label: 'decompose family',
  },
]

/**
 * Normalise a verb for family matching: lowercase, strip trailing _to/_for etc.
 */
function normaliseVerb(verb: string): string {
  return verb
    .toLowerCase()
    .replace(/_(to|for|as|via|into|with|from|by|in|of|on|at)$/, '')
    .replace(/_+/g, '_')
    .trim()
}

/**
 * Find which family a verb belongs to, returning the family or null.
 */
function findVerbFamily(verb: string): VerbFamily | null {
  const n = normaliseVerb(verb)
  for (const family of VERB_FAMILIES) {
    for (const stem of family.stems) {
      if (n.startsWith(stem) || n === stem) return family
    }
  }
  return null
}

/**
 * Check if two verbs are near-synonyms.
 * Returns the canonical verb if they are, null otherwise.
 */
function areNearSynonyms(verbA: string, verbB: string): string | null {
  if (verbA === verbB) return null  // exact duplicates handled separately
  const fA = findVerbFamily(verbA)
  const fB = findVerbFamily(verbB)
  if (fA && fB && fA === fB) return fA.canonical
  return null
}

// ─── Active/passive verb pairs — same edge, direction inverted ────────────────
// When the same (source, target) pair has BOTH an active and passive form of
// the same verb, this is an internal directional variant — the edge should
// only appear once with one consistent direction. These are stronger
// consolidation targets than near-synonyms.
const ACTIVE_PASSIVE_PAIRS: Array<[string, string, string]> = [
  // [active, passive, base_verb]
  ['measures', 'measured_by', 'measure'],
  ['tracks', 'tracked_by', 'track'],
  ['validates', 'validated_by', 'validate'],
  ['produces', 'produced_by', 'produce'],
  ['drives', 'driven_by', 'drive'],
  ['contains', 'contained_by', 'contain'],
  ['targets', 'targeted_by', 'target'],
  ['governs', 'governed_by', 'govern'],
  ['influences', 'influenced_by', 'influence'],
]

function isActivePassivePair(verbA: string, verbB: string): string | null {
  for (const [active, passive, base] of ACTIVE_PASSIVE_PAIRS) {
    if ((verbA === active && verbB === passive) || (verbA === passive && verbB === active)) {
      return `active/passive pair of "${base}" — same relationship, inverted perspective`
    }
  }
  return null
}

// ─── Known DIFFERENT_RELATION verb pairs (explicit overrides) ─────────────────
// These verb pairs on the same (source, target) are confirmed DIFFERENT.
// Format: [verbA, verbB] — order doesn't matter.
const CONFIRMED_DIFFERENT_VERB_PAIRS: Array<[string, string, string]> = [
  // [verbA, verbB, reason]
  ['updates', 'refines', 'updates replaces the hypothesis; refines narrows it — distinct temporal semantics'],
  ['gates', 'triggers', 'gates blocks until done; triggers fires when complete — opposite temporality'],
  ['analysed_in', 'triggers', 'postmortem is analysis container; triggers means fires event — unrelated'],
  ['references', 'superseded_by', 'references is lateral; superseded_by is causal succession'],
  ['references', 'informs', 'references is weak citation; informs is active influence'],
  ['becomes', 'tests_via', 'becomes is transformation; tests_via is experimental vehicle'],
  ['blocks', 'depends_on', 'blocks = prevents progress; depends_on = structural prerequisite'],
  ['ships_with', 'announces', 'ships_with = co-ships; announces = communication act'],
  ['documented_in', 'records_in', 'documented_in = placed in doc; records_in = captures data — subtle'],
  ['reaches_via', 'distributes_via', 'reaches_via = channel to customer; distributes_via = delivery mechanism'],
  ['maps_to', 'targets', 'maps_to = conceptual mapping; targets = intent/goal'],
  ['navigated_via', 'onboards_via', 'navigation vs onboarding — different user intents'],
  ['navigated_via', 'enables_flow', 'navigation vs structural enablement'],
  ['consumes', 'specifies_for', 'consumes = uses; specifies_for = defines contract'],
  ['sourced_from', 'feeds', 'sourced_from = upstream origin; feeds = active supply'],
  ['reads_from', 'writes_to', 'read vs write — opposite directions'],
]

function isConfirmedDifferent(verbA: string, verbB: string): string | null {
  for (const [a, b, reason] of CONFIRMED_DIFFERENT_VERB_PAIRS) {
    if ((verbA === a && verbB === b) || (verbA === b && verbB === a)) {
      return reason
    }
  }
  return null
}

// ─── Live graph usage counting ───────────────────────────────────────────────

const UPG_FILES = {
  entopo: path.join(ROOT, '.upg', 'entopo.upg'),
  inkling: path.join(ROOT, '.upg', 'inkling.upg'),
  sanity: path.join(ROOT, '.upg', 'sanity.upg'),
  'maximum-minimum': path.join(ROOT, '.upg', 'maximum-minimum.upg'),
  'notion-saturated': path.join(ROOT, '.upg', 'notion-saturated.upg'),
}

type GraphName = keyof typeof UPG_FILES

interface PerFileUsage {
  entopo: number
  inkling: number
  sanity: number
  'maximum-minimum': number
  'notion-saturated': number
  total: number
}

function emptyUsage(): PerFileUsage {
  return { entopo: 0, inkling: 0, sanity: 0, 'maximum-minimum': 0, 'notion-saturated': 0, total: 0 }
}

function loadGraphUsage(): Record<string, PerFileUsage> {
  const usage: Record<string, PerFileUsage> = {}

  for (const [graphName, filePath] of Object.entries(UPG_FILES)) {
    if (!fs.existsSync(filePath)) {
      continue
    }

    let data: { edges?: Array<{ type: string }> }
    try {
      data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    } catch {
      console.warn(`Warning: could not parse ${filePath}`)
      continue
    }

    for (const edge of data.edges ?? []) {
      if (!edge.type) continue
      if (!usage[edge.type]) usage[edge.type] = emptyUsage()
      const gn = graphName as GraphName
      usage[edge.type][gn]++
      usage[edge.type].total++
    }
  }

  return usage
}

const graphUsage = loadGraphUsage()

function getUsage(edgeKey: string): PerFileUsage {
  return graphUsage[edgeKey] ?? emptyUsage()
}

// ─── Edge data ───────────────────────────────────────────────────────────────

interface EdgeEntry {
  key: string
  forward_verb: string
  reverse_verb: string
  classification: string
  source_type: string
  target_type: string
}

// ─── Group classification ─────────────────────────────────────────────────────

type GroupClassification =
  | 'EXACT_DUPLICATE'
  | 'NEAR_SYNONYM'
  | 'DIFFERENT_RELATION'
  | 'MIXED'
  | 'UNCLEAR'

interface ConsolidationCandidate {
  edgeKey: string
  verb: string
  reason: string
}

interface GroupResult {
  pairKey: string
  source_type: string
  target_type: string
  edges: EdgeEntry[]
  classification: GroupClassification
  /** Sub-groups within the pair that are near-synonyms/duplicates */
  consolidationCandidates: ConsolidationCandidate[][]
  proposedCanonicals: string[]  // one per consolidation sub-group
  notes: string
  liveUsage: Record<string, PerFileUsage>
  totalLiveEdges: number
}

function classifyGroup(edges: EdgeEntry[]): {
  classification: GroupClassification
  consolidationCandidates: ConsolidationCandidate[][]
  proposedCanonicals: string[]
  notes: string
} {
  const notes: string[] = []
  const subGroups: ConsolidationCandidate[][] = []  // near-synonym/dup sub-groups
  const proposedCanonicals: string[] = []

  // Find exact duplicates (same forward_verb)
  const byVerb = new Map<string, EdgeEntry[]>()
  for (const e of edges) {
    if (!byVerb.has(e.forward_verb)) byVerb.set(e.forward_verb, [])
    byVerb.get(e.forward_verb)!.push(e)
  }

  let hasDuplicates = false
  for (const [verb, grp] of byVerb.entries()) {
    if (grp.length > 1) {
      hasDuplicates = true
      const candidates: ConsolidationCandidate[] = grp.map(e => ({
        edgeKey: e.key,
        verb: e.forward_verb,
        reason: `exact duplicate verb "${verb}"`,
      }))
      subGroups.push(candidates)
      // Choose canonical as most-used or first-in-catalog
      const sorted = [...grp].sort((a, b) => (getUsage(b.key).total - getUsage(a.key).total))
      proposedCanonicals.push(sorted[0].key)
      notes.push(`exact duplicate verb: "${verb}" — ${grp.map(e => e.key).join(' ≡ ')}`)
    }
  }

  // Find near-synonym pairs among distinct verbs
  const distinctVerbEdges = edges.filter(e => (byVerb.get(e.forward_verb)?.length ?? 0) === 1)

  // Build near-synonym clusters using union-find
  const synonymClusters: Map<string, Set<string>> = new Map()  // verb → cluster members
  const verbClusterLeader: Map<string, string> = new Map()

  function findLeader(verb: string): string {
    if (!verbClusterLeader.has(verb)) return verb
    const leader = findLeader(verbClusterLeader.get(verb)!)
    verbClusterLeader.set(verb, leader)
    return leader
  }

  function union(verbA: string, verbB: string): void {
    const lA = findLeader(verbA)
    const lB = findLeader(verbB)
    if (lA !== lB) verbClusterLeader.set(lB, lA)
  }

  let hasNearSynonym = false
  const nearSynonymReasons: string[] = []
  let overallCanonical = ''

  const activePasiveNotes: string[] = []

  for (let i = 0; i < distinctVerbEdges.length; i++) {
    for (let j = i + 1; j < distinctVerbEdges.length; j++) {
      const eA = distinctVerbEdges[i]
      const eB = distinctVerbEdges[j]

      // Check active/passive first — these are a special kind of near-synonym
      const apReason = isActivePassivePair(eA.forward_verb, eB.forward_verb)
      if (apReason) {
        hasNearSynonym = true
        union(eA.forward_verb, eB.forward_verb)
        activePasiveNotes.push(`"${eA.forward_verb}" / "${eB.forward_verb}" — ${apReason}`)
        // Prefer active form as canonical (the one that reads forward naturally)
        const activeVerb = ACTIVE_PASSIVE_PAIRS.find(
          ([a, p]) => (eA.forward_verb === a && eB.forward_verb === p) ||
                     (eA.forward_verb === p && eB.forward_verb === a)
        )?.[0]
        const activeEdge = [eA, eB].find(e => e.forward_verb === activeVerb) ?? eA
        if (!overallCanonical) overallCanonical = activeEdge.forward_verb
        continue
      }

      const canonical = areNearSynonyms(eA.forward_verb, eB.forward_verb)
      if (canonical) {
        hasNearSynonym = true
        union(eA.forward_verb, eB.forward_verb)
        nearSynonymReasons.push(`"${eA.forward_verb}" ≈ "${eB.forward_verb}" (${findVerbFamily(eA.forward_verb)?.label ?? 'shared family'})`)
        if (!overallCanonical) overallCanonical = canonical
      }
    }
  }

  if (activePasiveNotes.length > 0) {
    nearSynonymReasons.push(...activePasiveNotes.map(n => `active/passive: ${n}`))
  }

  // Materialize near-synonym clusters
  if (hasNearSynonym) {
    const clusterMap = new Map<string, EdgeEntry[]>()
    for (const e of distinctVerbEdges) {
      const leader = findLeader(e.forward_verb)
      if (!clusterMap.has(leader)) clusterMap.set(leader, [])
      clusterMap.get(leader)!.push(e)
    }
    for (const [, cluster] of clusterMap.entries()) {
      if (cluster.length > 1) {
        const candidates: ConsolidationCandidate[] = cluster.map(e => ({
          edgeKey: e.key,
          verb: e.forward_verb,
          reason: `near-synonym: ${nearSynonymReasons.filter(r => r.includes(e.forward_verb)).join('; ')}`,
        }))
        subGroups.push(candidates)

        // Canonical selection priority:
        // 1. Active form over passive (measures > measured_by on same pair)
        // 2. Edge with family's canonical verb
        // 3. Most-used edge
        const activeVerbForms = ACTIVE_PASSIVE_PAIRS.map(([a]) => a)
        const activeEdge = cluster.find(e => activeVerbForms.includes(e.forward_verb))
        const canonicalVerbEdge = !activeEdge ? cluster.find(e => {
          const family = findVerbFamily(e.forward_verb)
          return family && (e.forward_verb === family.canonical || normaliseVerb(e.forward_verb).startsWith(normaliseVerb(family.canonical)))
        }) : undefined
        const sorted = [...cluster].sort((a, b) => getUsage(b.key).total - getUsage(a.key).total)

        // For active/passive pairs: the NOTE in the cluster says whether it's active/passive
        const isActivePasCluster = activePasiveNotes.some(n =>
          cluster.some(e => n.includes(`"${e.forward_verb}"`))
        )
        let chosenCanonical: EdgeEntry
        if (isActivePasCluster && activeEdge) {
          chosenCanonical = activeEdge
        } else if (canonicalVerbEdge) {
          chosenCanonical = canonicalVerbEdge
        } else {
          chosenCanonical = sorted[0]
        }

        proposedCanonicals.push(chosenCanonical.key)
        const hasActivePas = isActivePasCluster
        notes.push(`${hasActivePas ? 'active/passive pair' : 'near-synonym cluster'}: ${candidates.map(c => c.verb).join(' ≈ ')}`)
      }
    }
  }

  // Determine remaining distinct-verb edges that are NOT near-synonyms
  const handledVerbs = new Set(subGroups.flatMap(sg => sg.map(c => c.verb)))
  const unhandledEdges = distinctVerbEdges.filter(e => !handledVerbs.has(e.forward_verb))

  // Classify the overall group
  const hasConsolidationCandidates = subGroups.length > 0
  const hasDifferentRelation = unhandledEdges.length > 0 || (!hasConsolidationCandidates && edges.length > 1)

  let classification: GroupClassification
  if (hasDuplicates && !hasNearSynonym && !hasDifferentRelation) {
    classification = 'EXACT_DUPLICATE'
  } else if (hasDuplicates && !hasNearSynonym && hasDifferentRelation) {
    classification = 'MIXED'
    notes.push(`${unhandledEdges.length} genuinely different edge(s) in same pair: ${unhandledEdges.map(e => e.key).join(', ')}`)
  } else if (!hasDuplicates && hasNearSynonym && !hasDifferentRelation) {
    classification = 'NEAR_SYNONYM'
  } else if (hasNearSynonym && hasDifferentRelation) {
    classification = 'MIXED'
    notes.push(`also has ${unhandledEdges.length} genuinely different edge(s): ${unhandledEdges.map(e => e.key).join(', ')}`)
  } else if (!hasDuplicates && !hasNearSynonym) {
    // All distinct verbs, not near-synonyms — check if DIFFERENT_RELATION
    const verbPairs: string[] = []
    let allDifferent = true
    for (let i = 0; i < edges.length; i++) {
      for (let j = i + 1; j < edges.length; j++) {
        const reason = isConfirmedDifferent(edges[i].forward_verb, edges[j].forward_verb)
        if (reason) {
          verbPairs.push(`"${edges[i].forward_verb}" vs "${edges[j].forward_verb}": ${reason}`)
        } else {
          // Not explicitly confirmed different — check if families differ
          const fA = findVerbFamily(edges[i].forward_verb)
          const fB = findVerbFamily(edges[j].forward_verb)
          if (fA || fB) {
            // At least one has a family — check they're different families
            if (fA !== fB) {
              // Different families or one has no family — likely genuinely different
            } else {
              allDifferent = false  // same family but not caught as near-synonym? unclear
            }
          }
        }
      }
    }
    if (verbPairs.length > 0) {
      notes.push(...verbPairs)
    }
    classification = allDifferent ? 'DIFFERENT_RELATION' : 'UNCLEAR'
  } else {
    classification = 'UNCLEAR'
  }

  return { classification, consolidationCandidates: subGroups, proposedCanonicals, notes: notes.join('; ') }
}

// ─── Build pair map ───────────────────────────────────────────────────────────

const pairMap = new Map<string, EdgeEntry[]>()

for (const [key, def] of Object.entries(UPG_EDGE_CATALOG)) {
  const pairKey = `${def.source_type}→${def.target_type}`
  if (!pairMap.has(pairKey)) pairMap.set(pairKey, [])
  pairMap.get(pairKey)!.push({
    key,
    forward_verb: def.forward_verb,
    reverse_verb: def.reverse_verb,
    classification: def.classification,
    source_type: def.source_type,
    target_type: def.target_type,
  })
}

// ─── Process groups ───────────────────────────────────────────────────────────

const groups: GroupResult[] = []

for (const [pairKey, edges] of pairMap.entries()) {
  if (edges.length < 2) continue

  const [source_type, target_type] = pairKey.split('→')

  const liveUsage: Record<string, PerFileUsage> = {}
  let totalLiveEdges = 0
  for (const e of edges) {
    const u = getUsage(e.key)
    liveUsage[e.key] = u
    totalLiveEdges += u.total
  }

  const { classification, consolidationCandidates, proposedCanonicals, notes } = classifyGroup(edges)

  groups.push({
    pairKey,
    source_type,
    target_type,
    edges,
    classification,
    consolidationCandidates,
    proposedCanonicals,
    notes,
    liveUsage,
    totalLiveEdges,
  })
}

// ─── Summary ─────────────────────────────────────────────────────────────────

// Consolidation candidates = NEAR_SYNONYM + EXACT_DUPLICATE + MIXED
const consolidationGroups = groups.filter(g =>
  g.classification === 'NEAR_SYNONYM' ||
  g.classification === 'EXACT_DUPLICATE' ||
  g.classification === 'MIXED'
)

// Pure near-synonyms (no duplicates, no different edges mixed in)
const nearSynonymOnlyGroups = groups.filter(g => g.classification === 'NEAR_SYNONYM')
// Pure exact duplicates
const exactDuplicateGroups = groups.filter(g => g.classification === 'EXACT_DUPLICATE')
// Mixed
const mixedGroups = groups.filter(g => g.classification === 'MIXED')
// Genuinely different
const differentGroups = groups.filter(g => g.classification === 'DIFFERENT_RELATION')
// Unclear
const unclearGroups = groups.filter(g => g.classification === 'UNCLEAR')

// All consolidation sub-groups across all groups
const allSubGroups = consolidationGroups.flatMap(g => g.consolidationCandidates)
const totalEdgesFlaggedForConsolidation = allSubGroups.reduce(
  (acc, sg) => acc + sg.length, 0
)

// Live edges in flagged variants
const liveEdgesInFlaggedVariants = consolidationGroups.reduce(
  (acc, g) => {
    // Count live edges for non-canonical edges in each sub-group
    for (let i = 0; i < g.consolidationCandidates.length; i++) {
      const sg = g.consolidationCandidates[i]
      const canonical = g.proposedCanonicals[i]
      for (const c of sg) {
        if (c.edgeKey !== canonical) {
          acc += g.liveUsage[c.edgeKey]?.total ?? 0
        }
      }
    }
    return acc
  },
  0
)

// Migration scope
const migrationsNeeded = allSubGroups.reduce((acc, sg) => acc + sg.length - 1, 0)
const liveEdgesAffectedByMigration = liveEdgesInFlaggedVariants
const catalogReduction = migrationsNeeded

// Sort consolidation groups by live-graph impact
const sortedConsolidationGroups = [...consolidationGroups].sort(
  (a, b) => b.totalLiveEdges - a.totalLiveEdges
)

// ─── JSON output ─────────────────────────────────────────────────────────────

const jsonOutput = {
  meta: {
    generated_at: new Date().toISOString(),
    ticket: 'UPG-510',
    catalog_total_edges: Object.keys(UPG_EDGE_CATALOG).length,
  },
  summary: {
    pairs_with_2_plus_edges: groups.length,
    near_synonym_groups: nearSynonymOnlyGroups.length,
    exact_duplicate_groups: exactDuplicateGroups.length,
    mixed_groups: mixedGroups.length,
    different_relation_groups: differentGroups.length,
    unclear_groups: unclearGroups.length,
    total_edges_flagged_for_consolidation: totalEdgesFlaggedForConsolidation,
    live_edges_in_flagged_variants: liveEdgesInFlaggedVariants,
  },
  migration_scope: {
    new_edge_migrations_needed: migrationsNeeded,
    live_graph_edges_affected: liveEdgesAffectedByMigration,
    catalog_edge_count_reduction: catalogReduction,
  },
  consolidation_groups: sortedConsolidationGroups.map(g => ({
    pair: g.pairKey,
    source_type: g.source_type,
    target_type: g.target_type,
    classification: g.classification,
    total_edges_in_pair: g.edges.length,
    total_live_edges: g.totalLiveEdges,
    all_edges: g.edges.map(e => ({
      key: e.key,
      forward_verb: e.forward_verb,
      reverse_verb: e.reverse_verb,
      catalog_classification: e.classification,
      live_usage: g.liveUsage[e.key],
    })),
    consolidation_sub_groups: g.consolidationCandidates.map((sg, i) => ({
      candidates: sg.map(c => ({ key: c.edgeKey, verb: c.verb, reason: c.reason })),
      proposed_canonical: g.proposedCanonicals[i],
    })),
    notes: g.notes,
  })),
  different_relation_groups: differentGroups.map(g => ({
    pair: g.pairKey,
    edges: g.edges.map(e => ({ key: e.key, forward_verb: e.forward_verb })),
    notes: g.notes,
  })),
  unclear_groups: unclearGroups.map(g => ({
    pair: g.pairKey,
    edges: g.edges.map(e => ({
      key: e.key,
      forward_verb: e.forward_verb,
      live_usage: g.liveUsage[e.key],
    })),
    notes: g.notes,
  })),
}

fs.writeFileSync(OUTPUT_JSON, JSON.stringify(jsonOutput, null, 2))

// ─── Markdown output ─────────────────────────────────────────────────────────

function fmtUsage(u: PerFileUsage): string {
  const parts: string[] = []
  if (u.entopo > 0) parts.push(`entopo ${u.entopo}x`)
  if (u.inkling > 0) parts.push(`inkling ${u.inkling}x`)
  if (u.sanity > 0) parts.push(`sanity ${u.sanity}x`)
  if (u['maximum-minimum'] > 0) parts.push(`maximum-minimum ${u['maximum-minimum']}x`)
  if (u['notion-saturated'] > 0) parts.push(`notion-saturated ${u['notion-saturated']}x`)
  return parts.length > 0 ? parts.join(', ') : '0x across all graphs'
}

function classLabel(c: GroupClassification): string {
  const labels: Record<GroupClassification, string> = {
    EXACT_DUPLICATE: '🔴 EXACT_DUPLICATE',
    NEAR_SYNONYM: '🟠 NEAR_SYNONYM',
    MIXED: '🟡 MIXED',
    DIFFERENT_RELATION: '🟢 DIFFERENT_RELATION',
    UNCLEAR: '⚪ UNCLEAR',
  }
  return labels[c]
}

const top5 = sortedConsolidationGroups.slice(0, 5)

const mdLines: string[] = []

mdLines.push(`# Edge consolidation audit — UPG-510`)
mdLines.push(``)
mdLines.push(`*2026-05-21*`)
mdLines.push(``)
mdLines.push(`## Summary`)
mdLines.push(`- Catalog total edges: ${Object.keys(UPG_EDGE_CATALOG).length}`)
mdLines.push(`- Pairs with 2+ edges: **${groups.length}**`)
mdLines.push(`- 🔴 EXACT_DUPLICATE groups: **${exactDuplicateGroups.length}** (same verb, same pair — clear consolidation targets)`)
mdLines.push(`- 🟠 NEAR_SYNONYM groups: **${nearSynonymOnlyGroups.length}** (different verb, same meaning — consolidation candidates)`)
mdLines.push(`- 🟡 MIXED groups: **${mixedGroups.length}** (has both consolidation candidates AND genuinely different edges)`)
mdLines.push(`- 🟢 DIFFERENT_RELATION groups: ${differentGroups.length} (genuinely distinct — keep)`)
mdLines.push(`- ⚪ UNCLEAR groups: ${unclearGroups.length} (need human review)`)
mdLines.push(`- Total edges flagged for consolidation: **${totalEdgesFlaggedForConsolidation}** (across ${consolidationGroups.length} groups)`)
mdLines.push(`- Live-graph edges in flagged non-canonical variants: **${liveEdgesInFlaggedVariants}**`)
mdLines.push(``)
mdLines.push(`---`)
mdLines.push(``)
mdLines.push(`## Consolidation groups (sorted by live-graph impact)`)
mdLines.push(``)
mdLines.push(`Includes EXACT_DUPLICATE, NEAR_SYNONYM, and MIXED groups. These are the consolidation candidates.`)
mdLines.push(``)

for (let gi = 0; gi < sortedConsolidationGroups.length; gi++) {
  const g = sortedConsolidationGroups[gi]
  mdLines.push(`### Group ${gi + 1}: \`${g.source_type}\` → \`${g.target_type}\` — ${classLabel(g.classification)}`)
  mdLines.push(``)
  mdLines.push(`**All edges in this pair:**`)
  for (const e of g.edges) {
    const u = g.liveUsage[e.key]
    mdLines.push(`- \`${e.key}\` (verb: \`${e.forward_verb}\`) — live: ${fmtUsage(u)}`)
  }
  mdLines.push(``)

  if (g.consolidationCandidates.length > 0) {
    mdLines.push(`**Consolidation sub-group(s):**`)
    for (let i = 0; i < g.consolidationCandidates.length; i++) {
      const sg = g.consolidationCandidates[i]
      const canonical = g.proposedCanonicals[i]
      const nonCanonical = sg.filter(c => c.edgeKey !== canonical)
      mdLines.push(`- Sub-group ${i + 1}: ${sg.map(c => `\`${c.edgeKey}\``).join(' + ')}`)
      mdLines.push(`  - Proposed canonical: \`${canonical}\``)
      if (nonCanonical.length > 0) {
        mdLines.push(`  - Recommended action: MIGRATE ${nonCanonical.map(c => `\`${c.edgeKey}\``).join(' + ')} → \`${canonical}\``)
      }
    }
    mdLines.push(``)
  }

  mdLines.push(`**Notes:** ${g.notes}`)
  mdLines.push(`**Total live-graph edges in pair:** ${g.totalLiveEdges}`)
  mdLines.push(``)
}

mdLines.push(`---`)
mdLines.push(``)
mdLines.push(`## DIFFERENT_RELATION groups (kept distinct — no action)`)
mdLines.push(``)
mdLines.push(`These pairs have multiple edges because the verbs express genuinely different things.`)
mdLines.push(``)

for (const g of differentGroups) {
  mdLines.push(`### \`${g.source_type}\` → \`${g.target_type}\``)
  mdLines.push(`- Edges: ${g.edges.map(e => `\`${e.key}\` (\`${e.forward_verb}\`)`).join(', ')}`)
  if (g.notes) mdLines.push(`- Notes: ${g.notes}`)
  mdLines.push(``)
}

if (unclearGroups.length > 0) {
  mdLines.push(`---`)
  mdLines.push(``)
  mdLines.push(`## UNCLEAR groups (need human review)`)
  mdLines.push(``)

  for (let gi = 0; gi < unclearGroups.length; gi++) {
    const g = unclearGroups[gi]
    mdLines.push(`### Group ${gi + 1}: \`${g.source_type}\` → \`${g.target_type}\``)
    for (const e of g.edges) {
      mdLines.push(`- \`${e.key}\` (verb: \`${e.forward_verb}\`) — live: ${fmtUsage(g.liveUsage[e.key])}`)
    }
    if (g.notes) mdLines.push(`- Notes: ${g.notes}`)
    mdLines.push(``)
  }
}

mdLines.push(`---`)
mdLines.push(``)
mdLines.push(`## Migration scope`)
mdLines.push(``)
mdLines.push(`If all consolidation targets (EXACT_DUPLICATE + NEAR_SYNONYM sub-groups in MIXED) ship:`)
mdLines.push(`- New \`UPG_EDGE_MIGRATIONS\` entries needed: **${migrationsNeeded}**`)
mdLines.push(`- Live-graph edges affected: **${liveEdgesAffectedByMigration}**`)
mdLines.push(`- Catalog edge count reduction: **${catalogReduction}**`)
mdLines.push(``)
mdLines.push(`---`)
mdLines.push(``)
mdLines.push(`## Top 5 highest-impact consolidations`)
mdLines.push(``)

for (let i = 0; i < top5.length; i++) {
  const g = top5[i]
  const candidates = g.consolidationCandidates.flatMap((sg, si) => {
    const canonical = g.proposedCanonicals[si]
    return sg.filter(c => c.edgeKey !== canonical)
  })
  mdLines.push(`${i + 1}. **\`${g.source_type}\` → \`${g.target_type}\`** (${g.classification})`)
  mdLines.push(`   - ${g.totalLiveEdges} live edges, ${g.edges.length} catalog entries`)
  mdLines.push(`   - Consolidate: ${candidates.map(c => `\`${c.edgeKey}\``).join(', ')} → \`${g.proposedCanonicals[0] ?? '?'}\``)
  mdLines.push(``)
}

mdLines.push(`---`)
mdLines.push(``)
mdLines.push(`*Generated by \`packages/upg-spec/scripts/audit-edge-near-synonyms.ts\` — REPORT ONLY, no catalog changes made.*`)

fs.writeFileSync(OUTPUT_MD, mdLines.join('\n'))

// ─── Console summary ─────────────────────────────────────────────────────────

console.log('\n=== UPG-510 Edge Consolidation Audit ===')
console.log(`Catalog total: ${Object.keys(UPG_EDGE_CATALOG).length} edges`)
console.log(`Multi-edge pairs: ${groups.length}`)
console.log(`  🔴 EXACT_DUPLICATE: ${exactDuplicateGroups.length}`)
console.log(`  🟠 NEAR_SYNONYM:    ${nearSynonymOnlyGroups.length}`)
console.log(`  🟡 MIXED:           ${mixedGroups.length}`)
console.log(`  🟢 DIFFERENT:       ${differentGroups.length}`)
console.log(`  ⚪ UNCLEAR:         ${unclearGroups.length}`)
console.log(``)
console.log(`Consolidation candidates: ${consolidationGroups.length} groups`)
console.log(`  Edges flagged: ${totalEdgesFlaggedForConsolidation}`)
console.log(`  Live edges in non-canonical variants: ${liveEdgesInFlaggedVariants}`)
console.log(``)
console.log(`Migration scope (if all consolidated):`)
console.log(`  Migrations needed: ${migrationsNeeded}`)
console.log(`  Live edges affected: ${liveEdgesAffectedByMigration}`)
console.log(`  Catalog reduction: ${catalogReduction}`)
console.log(``)
console.log(`Top 5 highest-impact (by live-graph count):`)
for (const g of top5) {
  console.log(`  ${g.pairKey}: ${g.totalLiveEdges} live edges (${g.classification})`)
}
console.log(``)
console.log(`JSON: ${OUTPUT_JSON}`)
console.log(`MD:   ${OUTPUT_MD}`)
