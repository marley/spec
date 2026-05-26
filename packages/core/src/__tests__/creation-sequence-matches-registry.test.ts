/**
 * UPG-516 — `creation_sequence` ↔ entity registry invariant.
 *
 * Every domain's navigation `creation_sequence` (from `UPG_DOMAIN_GUIDES`)
 * must cover every entity registered to that domain in `UPG_DOMAINS[].types`,
 * and must not reference any entity registered to a different domain. This
 * test prevents the drift surfaced by the 2026-05-20 domain-wiring audit
 * (engineering: 5 missing; devops: 3 missing + 3 foreign; …) from
 * re-accumulating.
 *
 * Cross-domain references that the catalog teaches (e.g. devops's
 * "Incident Response Chain" walking into engineering for `root_cause`)
 * live in `patterns[*]` and `required_bridges[*]` — NOT in
 * `creation_sequence`. The sequence is the canonical "what entities does
 * this domain own?" navigation order; bridges are the cross-domain hops
 * the author is taught to make.
 */

import { describe, it, expect } from 'vitest'
import { UPG_DOMAINS, UPG_ENTITY_TO_DOMAIN } from '../registry/domains.js'
import { UPG_DOMAIN_GUIDES } from '../intelligence/domain-guides.js'

describe('UPG-516 — creation_sequence ↔ registry invariant', () => {
  it('every domain has a usage guide', () => {
    for (const domain of UPG_DOMAINS) {
      const guide = UPG_DOMAIN_GUIDES.find((g) => g.domain_id === domain.id)
      expect(guide, `missing usage guide for domain ${domain.id}`).toBeDefined()
    }
  })

  it('every entity registered to a domain appears in its creation_sequence', () => {
    const failures: string[] = []
    for (const domain of UPG_DOMAINS) {
      const guide = UPG_DOMAIN_GUIDES.find((g) => g.domain_id === domain.id)
      if (!guide) continue
      const seqSet = new Set(guide.creation_sequence)
      for (const t of domain.types) {
        if (!seqSet.has(t)) {
          failures.push(
            `${domain.id}: entity '${t}' is registered but missing from creation_sequence`,
          )
        }
      }
    }
    expect(failures, failures.join('\n')).toEqual([])
  })

  it('creation_sequence never references an entity registered to a different domain', () => {
    const failures: string[] = []
    for (const guide of UPG_DOMAIN_GUIDES) {
      const domain = UPG_DOMAINS.find((d) => d.id === guide.domain_id)
      if (!domain) continue
      const registered = new Set<string>(domain.types)
      for (const t of guide.creation_sequence) {
        if (registered.has(t)) continue
        const actual = (UPG_ENTITY_TO_DOMAIN as Record<string, string | undefined>)[t]
        failures.push(
          `${guide.domain_id}: creation_sequence lists '${t}', but it is registered to '${actual ?? '<unregistered>'}'`,
        )
      }
    }
    expect(failures, failures.join('\n')).toEqual([])
  })

  it('creation_sequence has no duplicates', () => {
    const failures: string[] = []
    for (const guide of UPG_DOMAIN_GUIDES) {
      const seen = new Set<string>()
      for (const t of guide.creation_sequence) {
        if (seen.has(t)) {
          failures.push(`${guide.domain_id}: '${t}' appears twice in creation_sequence`)
        }
        seen.add(t)
      }
    }
    expect(failures, failures.join('\n')).toEqual([])
  })

  it('engineering domain owns the RCA quartet (investigation, root_cause, symptom, fix)', () => {
    // Documents the 2026-05-20 boundary decision: the RCA artefacts stay
    // anchored to engineering (where they were placed at v0.2.0 — entity_meta
    // ent_315..ent_318). Devops references them cross-domain in its
    // Incident Response Chain pattern, but the canonical domain is
    // engineering.
    const engGuide = UPG_DOMAIN_GUIDES.find((g) => g.domain_id === 'engineering')
    expect(engGuide).toBeDefined()
    const entityToDomain = UPG_ENTITY_TO_DOMAIN as Record<string, string | undefined>
    for (const t of ['investigation', 'root_cause', 'symptom', 'fix']) {
      expect(entityToDomain[t]).toBe('engineering')
      expect(engGuide!.creation_sequence as readonly string[]).toContain(t)
    }
  })

  it('devops creation_sequence does not own engineering-domain RCA entities', () => {
    // Counterpart to the engineering ownership: devops's sequence stays
    // clean of cross-domain entities. The Incident Response Chain pattern
    // still references them — that's the right place to teach the
    // cross-domain hop.
    const devopsGuide = UPG_DOMAIN_GUIDES.find((g) => g.domain_id === 'devops')
    expect(devopsGuide).toBeDefined()
    for (const t of ['root_cause', 'symptom', 'deployment', 'fix', 'investigation']) {
      expect(devopsGuide!.creation_sequence as readonly string[]).not.toContain(t)
    }
  })
})
