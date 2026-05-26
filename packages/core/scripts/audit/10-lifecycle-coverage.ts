/**
 * Invariant 10: Lifecycle coverage
 *
 * Every active entity type must be accounted for — either it has a
 * lifecycle in UPG_LIFECYCLES, or it is explicitly listed in
 * UPG_LIFECYCLE_FREE_TYPES. No entity type may be silently absent from
 * both — that is a triage gap, not a legitimate state.
 *
 * Subsequent phases migrate individual types out of the allow-list as
 * they gain lifecycles.
 */

import {
  UPG_ENTITY_META,
  UPG_LIFECYCLES,
  UPG_LIFECYCLE_FREE_TYPES,
  UPG_LIFECYCLE_PLANNED_TYPES,
} from '../../src/index.js'
import { Report } from './_lib.js'

const report = new Report('Invariant 10: Lifecycle coverage')

const withLifecycle = new Set(UPG_LIFECYCLES.map((l) => l.entity_type))
const lifecycleFree = new Set(UPG_LIFECYCLE_FREE_TYPES)
const lifecyclePlanned = new Set(UPG_LIFECYCLE_PLANNED_TYPES)

const allNames = new Set(UPG_ENTITY_META.map((m) => m.name))
const activeNames = new Set(
  UPG_ENTITY_META
    .filter((m) => m.maturity === 'stable' || m.maturity === 'proposed')
    .map((m) => m.name),
)

// 10a. Allow-lists must only name active (stable / proposed) entity types.
for (const [setName, set] of [
  ['UPG_LIFECYCLE_FREE_TYPES', lifecycleFree],
  ['UPG_LIFECYCLE_PLANNED_TYPES', lifecyclePlanned],
] as const) {
  for (const t of set) {
    if (!allNames.has(t)) {
      report.error(
        `${setName} lists "${t}" which does not exist in UPG_ENTITY_META`,
        'grammar/lifecycles.ts',
      )
    } else if (!activeNames.has(t)) {
      report.error(
        `${setName} lists "${t}" which is not active — remove it from the allow-list`,
        'grammar/lifecycles.ts',
      )
    }
  }
}

// 10b. No type may appear in more than one of the three coverage sets.
for (const t of activeNames) {
  const memberships: string[] = []
  if (withLifecycle.has(t)) memberships.push('UPG_LIFECYCLES')
  if (lifecycleFree.has(t)) memberships.push('UPG_LIFECYCLE_FREE_TYPES')
  if (lifecyclePlanned.has(t)) memberships.push('UPG_LIFECYCLE_PLANNED_TYPES')
  if (memberships.length > 1) {
    report.error(
      `"${t}" appears in multiple coverage sets (${memberships.join(', ')}) — must be in exactly one`,
      'grammar/lifecycles.ts',
    )
  }
}

// 10c. Every active entity must be covered by exactly one coverage set.
const uncovered: string[] = []
for (const name of activeNames) {
  if (!withLifecycle.has(name) && !lifecycleFree.has(name) && !lifecyclePlanned.has(name)) {
    uncovered.push(name)
  }
}
if (uncovered.length > 0) {
  for (const t of uncovered) {
    report.error(
      `Active entity type "${t}" is untriaged — add to UPG_LIFECYCLE_FREE_TYPES, UPG_LIFECYCLE_PLANNED_TYPES, or ship a lifecycle`,
      'grammar/lifecycles.ts',
    )
  }
}

report.info(
  `Active types: ${activeNames.size}. With lifecycle: ${withLifecycle.size}. ` +
  `Lifecycle-free: ${lifecycleFree.size}. Planned (deferred): ${lifecyclePlanned.size}. ` +
  `Untriaged: ${uncovered.length}.`,
)
if (lifecyclePlanned.size > 0) {
  report.info(
    `Phase B/C/D closure trajectory: ${lifecyclePlanned.size} types waiting for lifecycle enrichment.`,
  )
}

report.print()
if (report.errorCount > 0) process.exitCode = 1
