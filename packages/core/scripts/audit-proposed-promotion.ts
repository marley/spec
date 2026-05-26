/**
 * Proposed-Entity Promotion Rubric Audit
 *
 * Not a correctness invariant — a release-readiness check. Walks every
 * entity type with `maturity: 'proposed'` and reports whether it meets the
 * promotion rubric documented in `src/registry/entity-meta.ts`.
 *
 * Promotion criteria (ALL required):
 *   1. Referenced by ≥2 framework slots in UPG_FRAMEWORKS
 *   2. Carries ≥3 properties in UPG_PROPERTY_SCHEMA
 *   3. Has a lifecycle in UPG_LIFECYCLES OR is documented as lifecycle-free
 *   4. No rename / restructure ticket open (external — verify manually)
 *
 * Demotion trigger:
 *   - No framework references 2 minor versions after introduction
 *
 * Standalone by design — run before each minor release.
 * Not part of the invariant suite (`run-all.ts`).
 *
 * Usage: npx tsx scripts/audit-proposed-promotion.ts
 */

import { UPG_ENTITY_META, UPG_FRAMEWORKS, UPG_LIFECYCLES, UPG_PROPERTY_SCHEMA } from '../src/index.js'
import { Report } from './audit/_lib.js'

// Entity types that are intentionally lifecycle-free (static reference types
// like persona, metric, quote). Used to satisfy criterion 3 without a
// lifecycle entry.
const LIFECYCLE_FREE_BY_DESIGN = new Set<string>([
  // No current proposed types fall into this bucket; list kept for future
  // promotion candidates (e.g. a proposed static reference type).
])

interface PromotionEvaluation {
  name: string
  since: string
  frameworkRefs: number
  propertyCount: number
  hasLifecycle: boolean
  lifecycleFreeByDesign: boolean
  criteria: {
    frameworks: boolean  // ≥2 framework slots
    properties: boolean  // ≥3 properties
    lifecycle: boolean   // has lifecycle OR lifecycle-free by design
  }
  readyToPromote: boolean
}

function evaluate(entityName: string, since: string): PromotionEvaluation {
  let frameworkRefs = 0
  for (const fw of UPG_FRAMEWORKS) {
    if (fw.slots) {
      for (const slot of fw.slots) {
        if (slot.entityTypeId === entityName) frameworkRefs++
      }
    }
    const ets = fw.data?.entity_types ?? []
    for (const et of ets) {
      if (et.type === entityName) frameworkRefs++
    }
  }

  const schema = UPG_PROPERTY_SCHEMA[entityName]
  const propertyCount = schema ? Object.keys(schema).length : 0

  const hasLifecycle = UPG_LIFECYCLES.some((lc) => lc.entity_type === entityName)
  const lifecycleFreeByDesign = LIFECYCLE_FREE_BY_DESIGN.has(entityName)

  const criteria = {
    frameworks: frameworkRefs >= 2,
    properties: propertyCount >= 3,
    lifecycle: hasLifecycle || lifecycleFreeByDesign,
  }

  const readyToPromote = criteria.frameworks && criteria.properties && criteria.lifecycle

  return {
    name: entityName,
    since,
    frameworkRefs,
    propertyCount,
    hasLifecycle,
    lifecycleFreeByDesign,
    criteria,
    readyToPromote,
  }
}

const proposed = UPG_ENTITY_META.filter((m) => m.maturity === 'proposed')

const report = new Report(`Promotion rubric — ${proposed.length} proposed entities`)

const evaluations = proposed.map((m) => evaluate(m.name, m.since))
const ready = evaluations.filter((e) => e.readyToPromote)
const blocked = evaluations.filter((e) => !e.readyToPromote)

if (ready.length > 0) {
  report.info(`Ready to promote → stable: ${ready.length}`)
  for (const e of ready) {
    report.info(
      `  ✓ ${e.name} (since ${e.since}) — ${e.frameworkRefs} framework refs, ${e.propertyCount} props, lifecycle=${e.hasLifecycle ? 'yes' : e.lifecycleFreeByDesign ? 'by-design-free' : '—'}`,
      'registry/entity-meta.ts',
    )
  }
}

if (blocked.length > 0) {
  report.info(`Blocked from promotion: ${blocked.length}`)
  for (const e of blocked) {
    const missing: string[] = []
    if (!e.criteria.frameworks) missing.push(`frameworks=${e.frameworkRefs}/2`)
    if (!e.criteria.properties) missing.push(`properties=${e.propertyCount}/3`)
    if (!e.criteria.lifecycle) missing.push('no-lifecycle')
    report.info(
      `  ✗ ${e.name} (since ${e.since}) — needs: ${missing.join(', ')}`,
      'registry/entity-meta.ts',
    )
  }
}

report.info(`Total proposed: ${proposed.length}. Ready: ${ready.length}. Blocked: ${blocked.length}.`)

report.print()
// Informational audit — never fails the build. Release captain decides.
