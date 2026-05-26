/**
 * Approach tests.
 *
 * Five approaches: Plan / Inspect / Prioritise / Trace / Reflect. Records
 * ship as definition lookups (id, label, description with cartographic
 * framing, question_answered, signature_hint, framework_id_examples).
 * The five-record contract is the stable shape; adding a sixth approach
 * is a breaking change.
 */

import { describe, it, expect } from 'vitest'
import {
  UPG_APPROACHES,
  UPG_APPROACHES_BY_ID,
  REFLECT_MODES,
  type UPGApproachId,
} from '../approaches/index.js'
// Approach test asserts wiring against the full research catalog, not the
// public canonical surface — same pattern as the tier-1 wiring tests.
import { UPG_FRAMEWORKS_BY_ID } from '../frameworks/definitions/index.js'

describe('UPG_APPROACHES — five canonical approaches at v0.3.0', () => {
  it('exposes exactly 5 approaches', () => {
    expect(UPG_APPROACHES).toBeDefined()
    expect(Array.isArray(UPG_APPROACHES)).toBe(true)
    expect(UPG_APPROACHES).toHaveLength(5)
  })

  it('the five canonical ids are present in order', () => {
    const expected: UPGApproachId[] = [
      'plan',
      'inspect',
      'prioritise',
      'trace',
      'reflect',
    ]
    expect(UPG_APPROACHES.map((a) => a.id)).toEqual(expected)
  })

  it('every approach carries id, label, description, question_answered, signature_hint', () => {
    for (const a of UPG_APPROACHES) {
      expect(a.id).toBeTypeOf('string')
      expect(a.label).toBeTypeOf('string')
      expect(a.description.length).toBeGreaterThan(40)
      expect(a.question_answered.length).toBeGreaterThan(0)
      expect(a.signature_hint).toMatch(/→/)
    }
  })

  it('every framework_id_example resolves to an entry in UPG_FRAMEWORKS', () => {
    for (const a of UPG_APPROACHES) {
      for (const fwId of a.framework_id_examples ?? []) {
        expect(
          UPG_FRAMEWORKS_BY_ID[fwId],
          `approach ${a.id} references missing framework_id ${fwId}`,
        ).toBeDefined()
      }
    }
  })

  it('cartographic framing — descriptions reference "path of arrival"', () => {
    // Lock the cartographic framing — every approach description must invoke
    // the cartographic sense, not the strategy-meeting sense. See
    // approaches/types.ts for the full framing rationale.
    for (const a of UPG_APPROACHES) {
      expect(
        a.description.toLowerCase(),
        `approach ${a.id} description missing cartographic framing`,
      ).toMatch(/path of arrival|cartographic sense/)
    }
  })

  it('UPG_APPROACHES_BY_ID is a complete O(1) lookup', () => {
    expect(Object.keys(UPG_APPROACHES_BY_ID).sort()).toEqual([
      'inspect',
      'plan',
      'prioritise',
      'reflect',
      'trace',
    ])
    for (const a of UPG_APPROACHES) {
      expect(UPG_APPROACHES_BY_ID[a.id]).toBe(a)
    }
  })

  it('REFLECT_MODES exposes the four canonical nouns (no `open` literal)', () => {
    expect(REFLECT_MODES).toEqual([
      'assumptions',
      'alternatives',
      'blind-spots',
      'load-bearing',
    ])
  })
})

describe('UPGFramework.approach_ids — partial tagging coverage', () => {
  it('every tagged approach_id is a valid UPGApproachId', () => {
    const validIds = new Set<string>(['plan', 'inspect', 'prioritise', 'trace', 'reflect'])
    for (const fw of Object.values(UPG_FRAMEWORKS_BY_ID)) {
      if (!fw.approach_ids) continue
      for (const id of fw.approach_ids) {
        expect(
          validIds.has(id),
          `framework ${fw.id} carries invalid approach_id ${id}`,
        ).toBe(true)
      }
    }
  })

  it('partial coverage — at least 50 frameworks tagged at v0.3.0', () => {
    const tagged = Object.values(UPG_FRAMEWORKS_BY_ID).filter(
      (fw) => fw.approach_ids && fw.approach_ids.length > 0,
    )
    // Authoring target: ~110 obvious mappings. Floor at 50 so a regression
    // that nukes tagging is caught without a brittle exact-count assertion.
    expect(tagged.length).toBeGreaterThanOrEqual(50)
  })

  it('canonical prioritisation frameworks are tagged', () => {
    for (const id of ['rice-scoring', 'ice-scoring', 'kano-model', 'cost-of-delay']) {
      const fw = UPG_FRAMEWORKS_BY_ID[id]
      expect(fw, `framework ${id} not in catalog`).toBeDefined()
      expect(fw.approach_ids, `${id} missing approach_ids`).toContain('prioritise')
    }
  })

  it('canonical planning frameworks are tagged', () => {
    for (const id of ['now-next-later', 'wardley-map', 'okr-framework']) {
      const fw = UPG_FRAMEWORKS_BY_ID[id]
      expect(fw, `framework ${id} not in catalog`).toBeDefined()
      expect(fw.approach_ids, `${id} missing approach_ids`).toContain('plan')
    }
  })

  // ── Reflection classics ────────────────────────────────────────
  // Five canonical reflect frameworks: Five Whys, Pre-mortem, Red Team,
  // Devil's Advocate, Second-order Thinking. All live under team_process
  // and carry approach_ids anchored on 'reflect'. Retained by Gold
  // List decision — these are thinking-mode frameworks, not specialist tools.

  it('canonical reflection frameworks are present and tagged', () => {
    for (const id of [
      'five-whys',
      'pre-mortem',
      'red-team',
      'devils-advocate',
      'second-order-thinking',
    ]) {
      const fw = UPG_FRAMEWORKS_BY_ID[id]
      expect(fw, `framework ${id} not in catalog`).toBeDefined()
      expect(fw.approach_ids, `${id} missing approach_ids`).toBeDefined()
      expect(fw.approach_ids, `${id} not tagged with reflect`).toContain('reflect')
    }
  })

  it('Reflect.framework_id_examples surfaces all five reflection classics', () => {
    const reflect = UPG_APPROACHES_BY_ID['reflect']
    expect(reflect).toBeDefined()
    const examples = reflect.framework_id_examples ?? []
    for (const id of [
      'five-whys',
      'pre-mortem',
      'red-team',
      'devils-advocate',
      'second-order-thinking',
    ]) {
      expect(
        examples,
        `Reflect.framework_id_examples missing canonical reflection classic ${id}`,
      ).toContain(id)
    }
  })
})
