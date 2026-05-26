/**
 * UPG-516 — `creation_sequence` ↔ entity registry drift audit.
 *
 * For every domain, compare the navigation `creation_sequence` (from
 * `UPG_DOMAIN_GUIDES`) against the entity registry (`UPG_DOMAINS[].types`,
 * indexed by `UPG_ENTITY_TO_DOMAIN`). Surface three kinds of drift:
 *
 *   1. **Missing-from-sequence** — entities registered in the domain but
 *      absent from the `creation_sequence` navigation order. A first-time
 *      author walking the sequence to learn the domain will never see them.
 *
 *   2. **Sequence-references-foreign-entity** — entities in the
 *      `creation_sequence` that belong to a different domain (per the
 *      registry). The domain guide is implicitly claiming an entity it
 *      doesn't own.
 *
 *   3. **Duplicates-in-sequence** — defensive check; a creation_sequence
 *      that lists the same entity twice is a typo, not a navigation choice.
 *
 * Run: `npx tsx scripts/audit-creation-sequence.ts`
 *
 * Exits 0 on no drift, 1 on any drift surfaced. CI-friendly.
 */

import { UPG_DOMAINS, UPG_ENTITY_TO_DOMAIN } from '../src/registry/domains.js'
import { UPG_DOMAIN_GUIDES } from '../src/intelligence/domain-guides.js'

interface DomainDrift {
  domain_id: string
  registered_types: readonly string[]
  sequence_types: readonly string[]
  missing_from_sequence: string[]
  sequence_references_foreign_entity: Array<{
    entity: string
    actual_domain: string
  }>
  duplicates_in_sequence: string[]
}

function auditDomain(domainId: string): DomainDrift {
  const domain = UPG_DOMAINS.find((d) => d.id === domainId)
  const guide = UPG_DOMAIN_GUIDES.find((g) => g.domain_id === domainId)
  const registered_types = domain ? domain.types : []
  const sequence_types = guide ? guide.creation_sequence : []
  const registered_set = new Set(registered_types)

  // 1. Missing from sequence: registered but not in creation_sequence.
  const missing_from_sequence = registered_types.filter(
    (t) => !sequence_types.includes(t),
  )

  // 2. Foreign entities in sequence: in creation_sequence but registered elsewhere.
  const sequence_references_foreign_entity: Array<{
    entity: string
    actual_domain: string
  }> = []
  for (const t of sequence_types) {
    if (registered_set.has(t)) continue
    const actual = UPG_ENTITY_TO_DOMAIN[t as keyof typeof UPG_ENTITY_TO_DOMAIN]
    sequence_references_foreign_entity.push({
      entity: t,
      actual_domain: actual ?? '<unregistered>',
    })
  }

  // 3. Duplicates within the sequence.
  const seen = new Set<string>()
  const duplicates_in_sequence: string[] = []
  for (const t of sequence_types) {
    if (seen.has(t) && !duplicates_in_sequence.includes(t)) {
      duplicates_in_sequence.push(t)
    }
    seen.add(t)
  }

  return {
    domain_id: domainId,
    registered_types,
    sequence_types,
    missing_from_sequence,
    sequence_references_foreign_entity,
    duplicates_in_sequence,
  }
}

const allDomains = UPG_DOMAINS.map((d) => d.id)
const reports = allDomains.map((id) => auditDomain(id))

let totalMissing = 0
let totalForeign = 0
let totalDup = 0
const dirtyReports: DomainDrift[] = []

for (const r of reports) {
  const dirty =
    r.missing_from_sequence.length > 0 ||
    r.sequence_references_foreign_entity.length > 0 ||
    r.duplicates_in_sequence.length > 0
  if (dirty) {
    dirtyReports.push(r)
    totalMissing += r.missing_from_sequence.length
    totalForeign += r.sequence_references_foreign_entity.length
    totalDup += r.duplicates_in_sequence.length
  }
}

if (dirtyReports.length === 0) {
  console.log('✓ No creation_sequence drift across', allDomains.length, 'domains.')
  process.exit(0)
}

console.log('Domain drift report — UPG-516')
console.log('=============================')
console.log(
  `${dirtyReports.length} of ${allDomains.length} domains have drift.`,
)
console.log(
  `Total: ${totalMissing} missing-from-sequence, ${totalForeign} foreign-in-sequence, ${totalDup} duplicates.\n`,
)

for (const r of dirtyReports) {
  console.log(`Domain: ${r.domain_id}`)
  console.log(
    `  Registered: ${r.registered_types.length}  Sequence: ${r.sequence_types.length}`,
  )
  if (r.missing_from_sequence.length > 0) {
    console.log(
      `  Missing from sequence (${r.missing_from_sequence.length}): ${r.missing_from_sequence.join(', ')}`,
    )
  }
  if (r.sequence_references_foreign_entity.length > 0) {
    console.log(
      `  Foreign entities in sequence (${r.sequence_references_foreign_entity.length}):`,
    )
    for (const f of r.sequence_references_foreign_entity) {
      console.log(`    - ${f.entity} (registered in ${f.actual_domain})`)
    }
  }
  if (r.duplicates_in_sequence.length > 0) {
    console.log(
      `  Duplicates in sequence (${r.duplicates_in_sequence.length}): ${r.duplicates_in_sequence.join(', ')}`,
    )
  }
  console.log('')
}

process.exit(1)
