/**
 * Invariant 4: Entity ↔ property ↔ lifecycle coherence
 *
 * - Every entity type in UPG_TYPES has an entry in UPG_ENTITY_META
 * - Every entity type in UPG_TYPES that has typed properties appears in
 *   UPG_PROPERTY_SCHEMA (generated) OR is intentionally schema-less
 * - Every entity type with a lifecycle exists in UPG_TYPES
 * - Report entity types in UPG_TYPES that have NO properties and NO lifecycle
 *   (candidate for review, may be intentional)
 *
 * Note: terminal phases MAY declare `transitions_to` entries — these
 * represent late-state / reopen / revive paths rather than forward progression,
 * per UPGLifecycle.terminal_phases JSDoc. The general transitions_to sanity
 * check (target exists in this lifecycle's phase ids) still applies.
 */

import { UPG_TYPES, UPG_ENTITY_META_BY_NAME, UPG_LIFECYCLES, UPG_PROPERTY_SCHEMA } from '../../src/index.js'
import { Report } from './_lib.js'

const report = new Report('Invariant 4: Entity ↔ property ↔ lifecycle coherence')

// 4a. Every UPG_TYPES entry must have entity-meta
const missingMeta: string[] = []
for (const t of UPG_TYPES) {
  if (!UPG_ENTITY_META_BY_NAME.has(t)) missingMeta.push(t)
}
if (missingMeta.length > 0) {
  for (const t of missingMeta) {
    report.error(`Active type "${t}" has no entry in UPG_ENTITY_META`, 'registry/entity-meta.ts')
  }
}

// 4b. Lifecycle entity_type must be in UPG_TYPES
for (const lc of UPG_LIFECYCLES) {
  if (!UPG_TYPES.includes(lc.entity_type)) {
    report.error(
      `Lifecycle for "${lc.entity_type}" references non-existent entity type`,
      'grammar/lifecycles.ts',
    )
  }
}

// 4c. Structural invariants on lifecycle phases.
//     Terminal phases may declare `transitions_to` — those represent reopen /
//     late-state paths rather than forward progression (see UPGLifecycle JSDoc).
//     We only enforce structural rules below.
for (const lc of UPG_LIFECYCLES) {
  // terminal_phases must be phase ids that exist in phases[]
  const phaseIds = new Set(lc.phases.map((p) => p.id))
  for (const tp of lc.terminal_phases) {
    if (!phaseIds.has(tp)) {
      report.error(
        `Lifecycle "${lc.entity_type}" declares terminal_phase "${tp}" that is not a phase`,
        'grammar/lifecycles.ts',
      )
    }
  }
  // initial_phase must exist
  if (!phaseIds.has(lc.initial_phase)) {
    report.error(
      `Lifecycle "${lc.entity_type}" declares initial_phase "${lc.initial_phase}" that is not a phase`,
      'grammar/lifecycles.ts',
    )
  }
  // All transitions_to values must exist in phase ids
  for (const phase of lc.phases) {
    for (const dest of phase.transitions_to) {
      if (!phaseIds.has(dest)) {
        report.error(
          `Lifecycle "${lc.entity_type}" phase "${phase.id}" transitions_to unknown phase "${dest}"`,
          'grammar/lifecycles.ts',
        )
      }
    }
    // Every non-terminal phase should have at least one transition
    if (!lc.terminal_phases.includes(phase.id) && phase.transitions_to.length === 0) {
      report.warn(
        `Lifecycle "${lc.entity_type}" non-terminal phase "${phase.id}" has no transitions`,
        'grammar/lifecycles.ts',
      )
    }
  }
}

// 4d. Property schema keys should match UPG_TYPES (or be a deprecated name)
for (const entityType of Object.keys(UPG_PROPERTY_SCHEMA)) {
  if (!UPG_TYPES.includes(entityType) && !UPG_ENTITY_META_BY_NAME.has(entityType)) {
    report.error(
      `UPG_PROPERTY_SCHEMA key "${entityType}" is not in UPG_TYPES or UPG_ENTITY_META`,
      'properties/property-schema.ts',
    )
  }
}

// 4e. Entities in UPG_TYPES with NO properties and NO lifecycle (informational)
const typesWithLifecycle = new Set(UPG_LIFECYCLES.map((lc) => lc.entity_type))
const typesWithProperties = new Set(Object.keys(UPG_PROPERTY_SCHEMA))
const barren: string[] = []
for (const t of UPG_TYPES) {
  if (!typesWithLifecycle.has(t) && !typesWithProperties.has(t)) {
    barren.push(t)
  }
}
if (barren.length > 0) {
  report.info(`Entity types with neither lifecycle nor property schema (may be intentional): ${barren.length}`)
  for (const t of barren) report.info(`  barren: ${t}`)
}

report.info(`Lifecycles checked: ${UPG_LIFECYCLES.length}. Property-schema entity types: ${typesWithProperties.size}. UPG_TYPES: ${UPG_TYPES.length}.`)

report.print()
if (report.errorCount > 0) process.exitCode = 1
