/**
 * Invariant 3: Edge ↔ hierarchy coherence
 *
 * For every edge classified as `hierarchy`, the source→target parent-child
 * relationship should exist in UPG_VALID_CHILDREN.
 *
 * Edges classified `causal`, `semantic`, or `cross-domain` do NOT require
 * hierarchy backing — those are peer edges.
 *
 * Note: a hierarchy pair in UPG_VALID_CHILDREN does NOT require a
 * corresponding named edge in UPG_EDGE_CATALOG. The `parent_id` field on
 * UPGBaseNode is the first-class containment mechanism; edges are for verbs
 * that add meaning beyond containment (see src/ARCHITECTURE.md — "Hierarchy
 * vs Edges — The Two-Mechanism Rule"). Pairs without an edge are reported at
 * info level for discoverability, not as a correctness issue.
 */

import { UPG_EDGE_CATALOG, UPG_VALID_CHILDREN } from '../../src/index.js'
import { Report } from './_lib.js'

const report = new Report('Invariant 3: Edge ↔ hierarchy coherence')

let checked = 0
let orphans = 0
let hierarchyWithoutEdge = 0

// 3a. Every `hierarchy` edge source→target should be in UPG_VALID_CHILDREN
for (const [key, def] of Object.entries(UPG_EDGE_CATALOG)) {
  if (def.classification !== 'hierarchy') continue
  checked++
  const validChildren = UPG_VALID_CHILDREN[def.source_type] ?? []
  if (!validChildren.includes(def.target_type)) {
    orphans++
    report.warn(
      `Hierarchy edge "${key}" (${def.source_type}→${def.target_type}) has no entry in UPG_VALID_CHILDREN`,
      'catalog/edge-catalog.ts + grammar/hierarchy.ts',
    )
  }
}

// 3b. Every UPG_VALID_CHILDREN edge should have a corresponding hierarchy edge
// (This is weaker — the hierarchy is the canonical source, and UI affordances
// don't need a catalog verb. But it's worth flagging.)
for (const [parent, children] of Object.entries(UPG_VALID_CHILDREN)) {
  for (const child of children) {
    // Is there any hierarchy edge with this source/target?
    const hasHierarchyEdge = Object.values(UPG_EDGE_CATALOG).some(
      (def) => def.classification === 'hierarchy' && def.source_type === parent && def.target_type === child,
    )
    if (!hasHierarchyEdge) {
      // Also accept causal/semantic with matching source/target
      const hasAnyEdge = Object.values(UPG_EDGE_CATALOG).some(
        (def) => def.source_type === parent && def.target_type === child,
      )
      if (!hasAnyEdge) {
        hierarchyWithoutEdge++
        report.info(`Hierarchy "${parent}→${child}" has no edge in UPG_EDGE_CATALOG (no named verb)`, 'grammar/hierarchy.ts')
      }
    }
  }
}

report.info(`Checked ${checked} hierarchy-classified edges. Orphans (no hierarchy backing): ${orphans}.`)
report.info(`Hierarchy pairs with no named edge: ${hierarchyWithoutEdge}.`)

report.print()
if (report.errorCount > 0) process.exitCode = 1
