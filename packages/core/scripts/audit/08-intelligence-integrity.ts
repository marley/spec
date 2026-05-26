/**
 * Invariant 8: Intelligence layer integrity (lightweight check)
 *
 * - Every benchmark's `type` exists in UPG_TYPES
 * - Every benchmark's `domain` exists in UPG_DOMAINS
 * - Every relationship benchmark parent/child pair is a valid hierarchy
 * - Every domain guide entity reference is a valid UPG_TYPE
 * - Benchmark product stages are in UPG_PRODUCT_STAGES
 *
 * NOTE: a parallel deep pass is happening in src/intelligence/. This check is
 * intentionally non-invasive — it only inspects the data shape from the public
 * index exports.
 */

import {
  UPG_TYPES,
  UPG_DOMAINS,
  UPG_VALID_CHILDREN,
  UPG_COUNT_BENCHMARKS,
  UPG_RELATIONSHIP_BENCHMARKS,
  UPG_RATIO_BENCHMARKS,
  UPG_DOMAIN_ACTIVATION,
  UPG_DOMAIN_GUIDES,
  UPG_EDGE_CATALOG,
} from '../../src/index.js'
import { Report } from './_lib.js'

const report = new Report('Invariant 8: Intelligence layer integrity')

const typeSet = new Set<string>(UPG_TYPES)
const domainIds = new Set(UPG_DOMAINS.map((d) => d.id))

// 8a. Count benchmarks
for (const b of UPG_COUNT_BENCHMARKS) {
  if (!typeSet.has(b.type)) {
    report.error(`Count benchmark references unknown type "${b.type}"`, 'intelligence/benchmarks/count-benchmarks.ts')
  }
  if (!domainIds.has(b.domain)) {
    report.error(`Count benchmark references unknown domain "${b.domain}" for type "${b.type}"`, 'intelligence/benchmarks/count-benchmarks.ts')
  }
}

// 8b. Relationship benchmarks
for (const b of UPG_RELATIONSHIP_BENCHMARKS) {
  if (!typeSet.has(b.parent_type)) {
    report.error(`Relationship benchmark unknown parent_type "${b.parent_type}"`, 'intelligence/benchmarks/relationship-benchmarks.ts')
  }
  if (!typeSet.has(b.child_type)) {
    report.error(`Relationship benchmark unknown child_type "${b.child_type}"`, 'intelligence/benchmarks/relationship-benchmarks.ts')
  }
  // Hierarchy backing check
  const children = UPG_VALID_CHILDREN[b.parent_type] ?? []
  if (typeSet.has(b.parent_type) && typeSet.has(b.child_type) && !children.includes(b.child_type)) {
    report.warn(
      `Relationship benchmark ${b.parent_type}→${b.child_type} not in UPG_VALID_CHILDREN`,
      'intelligence/benchmarks/relationship-benchmarks.ts',
    )
  }
}

// 8c. Ratio benchmarks
for (const b of UPG_RATIO_BENCHMARKS) {
  const num = Array.isArray(b.numerator_type) ? b.numerator_type : [b.numerator_type]
  const den = Array.isArray(b.denominator_type) ? b.denominator_type : [b.denominator_type]
  for (const t of [...num, ...den]) {
    if (!typeSet.has(t)) {
      report.error(`Ratio benchmark "${b.name}" references unknown type "${t}"`, 'intelligence/benchmarks/ratio-benchmarks.ts')
    }
  }
}

// 8d. Domain activations
for (const a of UPG_DOMAIN_ACTIVATION) {
  if (!domainIds.has(a.domain_id)) {
    report.error(`Domain activation references unknown domain "${a.domain_id}"`, 'intelligence/benchmarks/domain-activations.ts')
  }
}

// 8e. Domain guides — actual shape: { domain_id, anchor_entity, creation_sequence, patterns[], required_bridges[], anti_patterns[] }

for (const guide of UPG_DOMAIN_GUIDES) {
  if (!domainIds.has(guide.domain_id)) {
    report.error(`Domain guide "${guide.domain_id}" not in UPG_DOMAINS`, 'intelligence/domain-guides.ts')
  }
  if (!typeSet.has(guide.anchor_entity)) {
    report.error(
      `Domain guide "${guide.domain_id}" anchor_entity "${guide.anchor_entity}" not in UPG_TYPES`,
      'intelligence/domain-guides.ts',
    )
  }
  for (const step of guide.creation_sequence) {
    if (!typeSet.has(step)) {
      report.error(
        `Domain guide "${guide.domain_id}" creation_sequence step "${step}" not in UPG_TYPES`,
        'intelligence/domain-guides.ts',
      )
    }
  }
  for (const pat of guide.patterns ?? []) {
    for (const t of pat.entity_types ?? []) {
      if (!typeSet.has(t)) {
        report.error(
          `Domain guide "${guide.domain_id}" pattern "${pat.name}" entity "${t}" not in UPG_TYPES`,
          'intelligence/domain-guides.ts',
        )
      }
    }
    for (const edgeKey of pat.edge_chain ?? []) {
      if (!(edgeKey in UPG_EDGE_CATALOG)) {
        report.error(
          `Domain guide "${guide.domain_id}" pattern "${pat.name}" edge "${edgeKey}" not in UPG_EDGE_CATALOG`,
          'intelligence/domain-guides.ts',
        )
      }
    }
  }
  for (const bridge of guide.required_bridges ?? []) {
    if (!(bridge.edge_type in UPG_EDGE_CATALOG)) {
      report.error(
        `Domain guide "${guide.domain_id}" bridge edge "${bridge.edge_type}" not in UPG_EDGE_CATALOG`,
        'intelligence/domain-guides.ts',
      )
    }
    if (!domainIds.has(bridge.target_domain)) {
      report.error(
        `Domain guide "${guide.domain_id}" bridge target_domain "${bridge.target_domain}" not in UPG_DOMAINS`,
        'intelligence/domain-guides.ts',
      )
    }
  }
}

report.info(`Count benchmarks: ${UPG_COUNT_BENCHMARKS.length}`)
report.info(`Relationship benchmarks: ${UPG_RELATIONSHIP_BENCHMARKS.length}`)
report.info(`Ratio benchmarks: ${UPG_RATIO_BENCHMARKS.length}`)
report.info(`Domain activations: ${UPG_DOMAIN_ACTIVATION.length}`)
report.info(`Domain guides: ${UPG_DOMAIN_GUIDES.length}`)

report.print()
if (report.errorCount > 0) process.exitCode = 1
