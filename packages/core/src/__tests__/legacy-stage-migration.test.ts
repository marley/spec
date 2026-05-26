/**
 * — Legacy product-stage migration.
 *
 * Validates the `LEGACY_PRODUCT_STAGES` map and the `migrateProductStage`
 * helper. Loaders apply this helper at the read boundary so existing
 * graphs that carry pre-canonical `stage: "idea"` values keep loading and
 * surface their stage canonically (`concept`).
 */

import { describe, it, expect } from 'vitest'
import {
  LEGACY_PRODUCT_STAGES,
  migrateProductStage,
  isLegacyProductStage,
} from '../catalog/legacy-product-stages.js'
import { UPG_PRODUCT_STAGES } from '../intelligence/benchmarks/types.js'

describe(' — migrateProductStage (idea → concept)', () => {
  it('migrates the canonical legacy alias `idea` to `concept`', () => {
    expect(migrateProductStage('idea')).toBe('concept')
  })

  it('is case-insensitive on legacy aliases', () => {
    expect(migrateProductStage('IDEA')).toBe('concept')
    expect(migrateProductStage('Idea')).toBe('concept')
  })

  it('every canonical UPGProductStage round-trips unchanged', () => {
    for (const stage of UPG_PRODUCT_STAGES) {
      expect(migrateProductStage(stage)).toBe(stage)
    }
  })

  it('passes through unknown stages verbatim (caller decides what to do)', () => {
    expect(migrateProductStage('xyz')).toBe('xyz')
    expect(migrateProductStage('mvp')).toBe('mvp')
  })

  it('returns undefined for undefined / null inputs', () => {
    expect(migrateProductStage(undefined)).toBeUndefined()
    expect(migrateProductStage(null)).toBeUndefined()
  })
})

describe(' — LEGACY_PRODUCT_STAGES map shape', () => {
  it('is frozen — append-only contract', () => {
    expect(Object.isFrozen(LEGACY_PRODUCT_STAGES)).toBe(true)
  })

  it('every value maps to a canonical UPGProductStage', () => {
    const canonicalSet = new Set(UPG_PRODUCT_STAGES)
    for (const [legacy, canonical] of Object.entries(LEGACY_PRODUCT_STAGES)) {
      expect(
        canonicalSet.has(canonical),
        `${legacy} → ${canonical} is not a canonical UPGProductStage`,
      ).toBe(true)
    }
  })

  it('contains the `idea → concept` mapping', () => {
    expect(LEGACY_PRODUCT_STAGES.idea).toBe('concept')
  })

  it('keys are lower-case', () => {
    for (const key of Object.keys(LEGACY_PRODUCT_STAGES)) {
      expect(key).toBe(key.toLowerCase())
    }
  })
})

describe(' — isLegacyProductStage guard', () => {
  it('returns true for known legacy aliases', () => {
    expect(isLegacyProductStage('idea')).toBe(true)
  })

  it('returns false for canonical stages', () => {
    for (const stage of UPG_PRODUCT_STAGES) {
      expect(isLegacyProductStage(stage)).toBe(false)
    }
  })

  it('returns false for unknown / non-string inputs', () => {
    expect(isLegacyProductStage('xyz')).toBe(false)
    expect(isLegacyProductStage(undefined)).toBe(false)
    expect(isLegacyProductStage(null)).toBe(false)
    expect(isLegacyProductStage(42)).toBe(false)
  })
})
