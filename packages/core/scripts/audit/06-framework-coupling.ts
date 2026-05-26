/**
 * Invariant 6: Framework ↔ spec coupling
 *
 * - Every slot.entityTypeId in a framework is a valid UPGEntityType
 * - Every required_properties key references a valid entity type
 * - Report required_property `property` names absent from the entity's schema.
 *   Surfaced at INFO level — this is expected by design.
 *
 * Note: frameworks may declare `required_properties` keys that are
 * NOT in UPG_PROPERTY_SCHEMA for the target entity type. Those are
 * framework-introduced lens-scoped fields (e.g. RICE's `reach`, Kano's
 * `functional_response`). Consumers merge framework + canonical schema at
 * render time. See src/ARCHITECTURE.md — "Framework Properties —
 * Lens-Scoped Fields" and the JSDoc on FrameworkDataSpec.required_properties.
 */

import { UPG_FRAMEWORKS, UPG_TYPES, UPG_PROPERTY_SCHEMA } from '../../src/index.js'
import { Report } from './_lib.js'

const report = new Report('Invariant 6: Framework ↔ spec coupling')

const typeSet = new Set<string>(UPG_TYPES)

// Build property-name set per entity type from the generated schema
const schemaKeys: Record<string, Set<string>> = {}
for (const [t, schema] of Object.entries(UPG_PROPERTY_SCHEMA)) {
  schemaKeys[t] = new Set(Object.keys(schema))
}

const unknownSlotTypes = new Map<string, Set<string>>() // type -> frameworks
const unknownReqTypes = new Map<string, Set<string>>()
const missingProps = new Map<string, Set<string>>() // "type:prop" -> frameworks

for (const fw of UPG_FRAMEWORKS) {
  // 6a. slot.entityTypeId validity
  if (fw.slots) {
    for (const slot of fw.slots) {
      if (!typeSet.has(slot.entityTypeId)) {
        if (!unknownSlotTypes.has(slot.entityTypeId)) unknownSlotTypes.set(slot.entityTypeId, new Set())
        unknownSlotTypes.get(slot.entityTypeId)!.add(fw.id)
      }
    }
  }

  // 6b. data.required_properties keys and property names
  const reqProps = fw.data?.required_properties
  if (reqProps) {
    for (const [entityType, properties] of Object.entries(reqProps)) {
      if (!typeSet.has(entityType)) {
        if (!unknownReqTypes.has(entityType)) unknownReqTypes.set(entityType, new Set())
        unknownReqTypes.get(entityType)!.add(fw.id)
        continue
      }
      // Properties list on each entity type must each exist in schema
      const known = schemaKeys[entityType] ?? new Set()
      for (const prop of properties) {
        // Some frameworks define their own domain-specific properties that aren't in the generated
        // schema (e.g. "rice_score"). We skip anything starting with a known computed naming convention.
        // However, simple ones like "reach" / "impact" / "confidence" / "effort" are introduced by
        // the framework itself. To remain honest, emit this as INFO not ERROR.
        if (!known.has(prop.property)) {
          const key = `${entityType}.${prop.property}`
          if (!missingProps.has(key)) missingProps.set(key, new Set())
          missingProps.get(key)!.add(fw.id)
        }
      }
    }
  }

  // 6c. data.entity_types type field validity
  const ets = fw.data?.entity_types ?? []
  for (const et of ets) {
    if (!typeSet.has(et.type)) {
      if (!unknownReqTypes.has(et.type)) unknownReqTypes.set(et.type, new Set())
      unknownReqTypes.get(et.type)!.add(fw.id)
    }
  }
}

// Report slot type errors
if (unknownSlotTypes.size > 0) {
  for (const [t, frameworks] of [...unknownSlotTypes.entries()].sort()) {
    const fwList = [...frameworks].sort()
    report.error(
      `Framework slot references unknown entity type "${t}" (${fwList.length} framework(s)): ${fwList.slice(0, 5).join(', ')}${fwList.length > 5 ? ` +${fwList.length - 5}` : ''}`,
      'frameworks/definitions/',
    )
  }
}

// Report unknown entity type in data.required_properties / data.entity_types
if (unknownReqTypes.size > 0) {
  for (const [t, frameworks] of [...unknownReqTypes.entries()].sort()) {
    const fwList = [...frameworks].sort()
    report.error(
      `Framework data references unknown entity type "${t}" (${fwList.length} framework(s)): ${fwList.slice(0, 5).join(', ')}${fwList.length > 5 ? ` +${fwList.length - 5}` : ''}`,
      'frameworks/definitions/',
    )
  }
}

// Report missing property names (informational — frameworks may introduce fields)
if (missingProps.size > 0) {
  report.info(`Framework required_properties not found in UPG_PROPERTY_SCHEMA: ${missingProps.size} distinct keys across ${[...new Set([...missingProps.values()].flatMap((s) => [...s]))].length} frameworks`)
  // Show top 20
  const entries = [...missingProps.entries()].sort(([a], [b]) => a.localeCompare(b)).slice(0, 40)
  for (const [key, frameworks] of entries) {
    const fwList = [...frameworks].sort()
    report.info(`"${key}" required by ${fwList.length} framework(s): ${fwList.slice(0, 3).join(', ')}${fwList.length > 3 ? ` +${fwList.length - 3}` : ''}`)
  }
}

report.info(`Frameworks checked: ${UPG_FRAMEWORKS.length}`)

report.print()
if (report.errorCount > 0) process.exitCode = 1
