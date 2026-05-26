/**
 * Invariant 5: Edge source/target type validity
 *
 * - Every source_type and target_type in UPG_EDGE_CATALOG is a valid
 *   UPGEntityType, OR the sanctioned wildcard `'node'`.
 * - Flag edges referencing deprecated types (should be migrated).
 * - Count polymorphic edges and verify they are all registered in
 *   UPG_POLYMORPHIC_EDGE_KEYS. Unregistered polymorphic edges are errors
 *   (accidental wildcard — see src/ARCHITECTURE.md "Polymorphic Edges").
 */

import {
  UPG_EDGE_CATALOG,
  UPG_TYPES,
  UPG_DEPRECATED_TYPES,
  UPG_POLYMORPHIC_EDGE_KEYS,
  UPG_WILDCARD_ENDPOINT,
} from '../../src/index.js'
import { Report } from './_lib.js'

const report = new Report('Invariant 5: Edge source/target validity')

const typeSet = new Set<string>(UPG_TYPES)
const deprecatedSet = new Set<string>(UPG_DEPRECATED_TYPES)
const polymorphicAllowed = new Set<string>(UPG_POLYMORPHIC_EDGE_KEYS)

let polymorphicCount = 0
let unregisteredPolymorphic = 0
for (const [key, def] of Object.entries(UPG_EDGE_CATALOG)) {
  // Deprecated type references
  if (deprecatedSet.has(def.source_type)) {
    report.error(`Edge "${key}" source_type "${def.source_type}" is deprecated`, 'catalog/edge-catalog.ts')
  }
  if (deprecatedSet.has(def.target_type)) {
    report.error(`Edge "${key}" target_type "${def.target_type}" is deprecated`, 'catalog/edge-catalog.ts')
  }

  const srcIsWildcard = def.source_type === UPG_WILDCARD_ENDPOINT
  const tgtIsWildcard = def.target_type === UPG_WILDCARD_ENDPOINT
  if (srcIsWildcard || tgtIsWildcard) {
    polymorphicCount++
    if (!polymorphicAllowed.has(key)) {
      unregisteredPolymorphic++
      report.error(
        `Edge "${key}" uses polymorphic '${UPG_WILDCARD_ENDPOINT}' endpoint but is not registered in UPG_POLYMORPHIC_EDGE_KEYS — add it to the allow-list or replace the wildcard with a concrete UPGEntityType`,
        'catalog/edge-catalog.ts',
      )
    }
  }

  // Concrete (non-wildcard) endpoints must be in UPG_TYPES
  if (!srcIsWildcard && !typeSet.has(def.source_type) && !deprecatedSet.has(def.source_type)) {
    report.error(`Edge "${key}" source_type "${def.source_type}" is unknown`, 'catalog/edge-catalog.ts')
  }
  if (!tgtIsWildcard && !typeSet.has(def.target_type) && !deprecatedSet.has(def.target_type)) {
    report.error(`Edge "${key}" target_type "${def.target_type}" is unknown`, 'catalog/edge-catalog.ts')
  }
}

report.info(`Polymorphic endpoint occurrences: ${polymorphicCount}. Registered allow-list: ${UPG_POLYMORPHIC_EDGE_KEYS.length}. Unregistered: ${unregisteredPolymorphic}.`)

report.print()
if (report.errorCount > 0) process.exitCode = 1
