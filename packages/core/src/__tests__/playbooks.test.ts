/**
 * Playbook tests.
 *
 * Locks the W1 (restated) invariant on `UPG_PLAYBOOKS`:
 * 1. Coverage — every region has at least one playbook.
 * 2. Canonical uniqueness — exactly one canonical playbook per region.
 * 3. Region validity — every `playbook.region` resolves in `UPG_REGIONS`.
 * 4. Framework reference validity — every `framework_id` resolves in `UPG_FRAMEWORKS`.
 * 5. ID uniqueness — every `playbook.id` is unique.
 *
 * Replaces the v0.2.x `domain-workflows.test.ts` + `workflow-types.test.ts`.
 */

import { describe, it, expect } from 'vitest'
import {
  UPG_PLAYBOOKS,
  UPG_REGIONS,
  getPlaybookById,
  getCanonicalPlaybookForRegion,
  getPlaybooksForRegion,
} from '../index.js'
import { UPG_FRAMEWORKS_BY_ID } from '../frameworks/index.js'

describe('UPG_PLAYBOOKS — W1 (restated) invariant', () => {
  it('ships 23 playbooks at v0.3.0', () => {
    expect(UPG_PLAYBOOKS).toHaveLength(23)
  })

  it('every region has at least one playbook (coverage)', () => {
    for (const region of UPG_REGIONS) {
      const matches = UPG_PLAYBOOKS.filter((p) => p.region === region.id)
      expect(
        matches.length,
        `Region "${region.id}" has no playbook — W1 (restated) coverage violation`,
      ).toBeGreaterThan(0)
    }
  })

  it('every region has exactly one canonical playbook (canonical uniqueness)', () => {
    for (const region of UPG_REGIONS) {
      const canonicals = UPG_PLAYBOOKS.filter(
        (p) => p.region === region.id && p.is_canonical === true,
      )
      expect(
        canonicals.length,
        `Region "${region.id}" has ${canonicals.length} canonical playbooks — must be exactly 1`,
      ).toBe(1)
    }
  })

  it('every playbook.region resolves to a real region', () => {
    const regionIds = new Set(UPG_REGIONS.map((r) => r.id))
    for (const p of UPG_PLAYBOOKS) {
      expect(
        regionIds.has(p.region),
        `Playbook "${p.id}" references unknown region "${p.region}"`,
      ).toBe(true)
    }
  })

  it('every playbook.framework_id resolves in UPG_FRAMEWORKS', () => {
    for (const p of UPG_PLAYBOOKS) {
      if (!p.framework_id) continue
      expect(
        UPG_FRAMEWORKS_BY_ID[p.framework_id],
        `Playbook "${p.id}" references unknown framework "${p.framework_id}"`,
      ).toBeDefined()
    }
  })

  it('every playbook id is unique', () => {
    const seen = new Set<string>()
    for (const p of UPG_PLAYBOOKS) {
      expect(seen.has(p.id), `Duplicate playbook id: "${p.id}"`).toBe(false)
      seen.add(p.id)
    }
  })

  it('every playbook id is namespace-prefixed (`playbook:*`)', () => {
    for (const p of UPG_PLAYBOOKS) {
      expect(p.id.startsWith('playbook:'), `Playbook "${p.id}" missing 'playbook:' prefix`).toBe(true)
    }
  })

  it('every playbook has at least one step', () => {
    for (const p of UPG_PLAYBOOKS) {
      expect(p.creation_sequence.length, `Playbook "${p.id}" has empty creation_sequence`).toBeGreaterThan(0)
    }
  })
})

describe('UPG_PLAYBOOKS — counts (settled per §3.7 / §6.6)', () => {
  it('10 canonical playbooks (one per region)', () => {
    const canonicals = UPG_PLAYBOOKS.filter((p) => p.is_canonical === true)
    expect(canonicals).toHaveLength(10)
  })

  it('13 specialised playbooks', () => {
    const specialised = UPG_PLAYBOOKS.filter((p) => p.is_canonical !== true)
    expect(specialised).toHaveLength(13)
  })

  it('3 playbooks carry a framework_id (BMC, AARRR, build-measure-learn)', () => {
    const anchored = UPG_PLAYBOOKS.filter((p) => p.framework_id)
    expect(anchored).toHaveLength(3)
    const ids = anchored.map((p) => p.framework_id).sort()
    expect(ids).toEqual(
      ['build-measure-learn', 'business-model-canvas', 'pirate-metrics-aarrr'].sort(),
    )
  })
})

describe('Playbook accessors', () => {
  it('getPlaybookById returns the canonical record', () => {
    const p = getPlaybookById('playbook:strategy-outcomes')
    expect(p).toBeDefined()
    expect(p?.region).toBe('strategy_outcomes')
    expect(p?.is_canonical).toBe(true)
  })

  it('getPlaybookById returns undefined for an unknown id', () => {
    expect(getPlaybookById('playbook:does-not-exist')).toBeUndefined()
  })

  it('getCanonicalPlaybookForRegion returns the canonical playbook', () => {
    const p = getCanonicalPlaybookForRegion('users_needs')
    expect(p?.id).toBe('playbook:users-needs')
    expect(p?.is_canonical).toBe(true)
  })

  it('getPlaybooksForRegion returns canonical + specialised', () => {
    const list = getPlaybooksForRegion('business_gtm_growth')
    // Region 8 ships 7 playbooks per the audit (1 canonical + 6 specialised).
    expect(list).toHaveLength(7)
    const canonical = list.filter((p) => p.is_canonical === true)
    expect(canonical).toHaveLength(1)
  })
})
