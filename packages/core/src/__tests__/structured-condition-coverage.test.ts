/**
 * — every lens intelligence prompt must carry a structured_condition.
 *
 * Regression guard for the migration completed in 0.2.1. New prompts that
 * forget to populate the machine-evaluable form fail this test.
 *
 * Run: npx vitest run src/__tests__/structured-condition-coverage.test.ts
 */

import { describe, it, expect } from 'vitest'
import { UPG_LENSES } from '../presentation/lenses.js'

describe('Structured_condition coverage', () => {
  it('every lens intelligence prompt carries a structured_condition', () => {
    const offenders: { lens: string; condition: string }[] = []
    for (const lens of UPG_LENSES) {
      for (const prompt of lens.intelligence_prompts) {
        if (!prompt.structured_condition) {
          offenders.push({ lens: lens.id, condition: prompt.condition })
        }
      }
    }
    expect(
      offenders,
      `Lens prompts missing structured_condition:\n${offenders
        .map((o) => `  • ${o.lens} → ${o.condition}`)
        .join('\n')}`,
    ).toEqual([])
  })

  it('every structured_condition is well-formed (leaf check or compound)', () => {
    for (const lens of UPG_LENSES) {
      for (const prompt of lens.intelligence_prompts) {
        const sc = prompt.structured_condition
        const hasCheck = 'check' in sc
        const hasOperator = 'operator' in sc
        // Discriminated union — exactly one of the two shapes must be present.
        expect(
          hasCheck !== hasOperator,
          `Malformed structured_condition in ${lens.id}: ${prompt.condition}`,
        ).toBe(true)
        if (hasOperator) {
          expect(sc.checks.length).toBeGreaterThan(0)
        }
      }
    }
  })

  it('exercises all 8 lenses with at least one prompt', () => {
    for (const lens of UPG_LENSES) {
      expect(
        lens.intelligence_prompts.length,
        `Lens ${lens.id} has no intelligence_prompts`,
      ).toBeGreaterThan(0)
    }
  })
})
