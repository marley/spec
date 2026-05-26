/**
 * — UPGProductStage validation + soft-coercion.
 *
 * Captures the documented mapping (idea → concept, discovery → validation,
 * mvp → build, etc.) so a future spec change cannot silently shift the
 * coercion target.
 */

import { describe, it, expect } from 'vitest'
import {
  UPG_PRODUCT_STAGE_COERCION_MAP,
  coerceProductStage,
  isCanonicalProductStage,
  validateProductStageStrict,
} from '../intelligence/product-stage-coercion.js'
import { UPG_PRODUCT_STAGES } from '../intelligence/benchmarks/types.js'

describe('IsCanonicalProductStage', () => {
  it('returns true for every canonical UPGProductStage value', () => {
    for (const stage of UPG_PRODUCT_STAGES) {
      expect(isCanonicalProductStage(stage)).toBe(true)
    }
  })

  it('returns false for known legacy values', () => {
    expect(isCanonicalProductStage('idea')).toBe(false)
    expect(isCanonicalProductStage('discovery')).toBe(false)
    expect(isCanonicalProductStage('mvp')).toBe(false)
  })

  it('returns false for non-string input', () => {
    expect(isCanonicalProductStage(undefined)).toBe(false)
    expect(isCanonicalProductStage(null)).toBe(false)
    expect(isCanonicalProductStage(42)).toBe(false)
    expect(isCanonicalProductStage({})).toBe(false)
  })
})

describe('CoerceProductStage — documented mapping', () => {
  // Pin the exact mapping — these are the values production graphs are
  // most likely to surface, so the coercion target for each must not
  // drift silently.
  it('coerces "idea" → "concept" (matches v0.2.13 properties.stage migration)', () => {
    const r = coerceProductStage('idea')
    expect(r).toEqual({
      canonical: 'concept',
      originalValue: 'idea',
      wasCoerced: true,
      wasUnknown: false,
    })
  })

  it('coerces "discovery" → "validation"', () => {
    const r = coerceProductStage('discovery')
    expect(r.canonical).toBe('validation')
    expect(r.wasCoerced).toBe(true)
  })

  it('coerces "mvp" → "build"', () => {
    expect(coerceProductStage('mvp').canonical).toBe('build')
  })

  it('coerces "production" → "launch"', () => {
    expect(coerceProductStage('production').canonical).toBe('launch')
  })

  it('coerces "draft" → "concept" (mirrors v0.2.13 lifecycle_status migration)', () => {
    expect(coerceProductStage('draft').canonical).toBe('concept')
  })

  it('coerces "active" → "launch" (mirrors v0.2.13 lifecycle_status migration)', () => {
    expect(coerceProductStage('active').canonical).toBe('launch')
  })

  it('coerces "archived" / "retired" / "deprecated" → "sunset"', () => {
    expect(coerceProductStage('archived').canonical).toBe('sunset')
    expect(coerceProductStage('retired').canonical).toBe('sunset')
    expect(coerceProductStage('deprecated').canonical).toBe('sunset')
  })

  it('matches case-insensitively for legacy aliases', () => {
    expect(coerceProductStage('Idea').canonical).toBe('concept')
    expect(coerceProductStage('MVP').canonical).toBe('build')
  })
})

describe('CoerceProductStage — pass-through and unknown', () => {
  it('passes canonical values through unchanged', () => {
    for (const stage of UPG_PRODUCT_STAGES) {
      const r = coerceProductStage(stage)
      expect(r.canonical).toBe(stage)
      expect(r.wasCoerced).toBe(false)
      expect(r.wasUnknown).toBe(false)
    }
  })

  it('flags truly unknown values as wasUnknown without a canonical target', () => {
    const r = coerceProductStage('xyz')
    expect(r.canonical).toBeUndefined()
    expect(r.wasCoerced).toBe(false)
    expect(r.wasUnknown).toBe(true)
  })

  it('treats undefined / null as no-op (not unknown)', () => {
    expect(coerceProductStage(undefined)).toEqual({
      canonical: undefined,
      originalValue: undefined,
      wasCoerced: false,
      wasUnknown: false,
    })
    expect(coerceProductStage(null).wasUnknown).toBe(false)
  })

  it('treats non-string types as unknown', () => {
    expect(coerceProductStage(42).wasUnknown).toBe(true)
    expect(coerceProductStage({}).wasUnknown).toBe(true)
  })
})

describe('ValidateProductStageStrict — write-side gate', () => {
  it('returns null for canonical values', () => {
    for (const stage of UPG_PRODUCT_STAGES) {
      expect(validateProductStageStrict(stage)).toBeNull()
    }
  })

  it('returns null for undefined/null (stage is optional)', () => {
    expect(validateProductStageStrict(undefined)).toBeNull()
    expect(validateProductStageStrict(null)).toBeNull()
  })

  it('returns a helpful error for known legacy values that points at the canonical target', () => {
    const err = validateProductStageStrict('idea')
    expect(err).not.toBeNull()
    expect(err).toMatch(/legacy/i)
    expect(err).toContain('"concept"')
    expect(err).toContain('concept')
  })

  it('returns an error listing all canonical values for unknown input', () => {
    const err = validateProductStageStrict('xyz')
    expect(err).not.toBeNull()
    for (const stage of UPG_PRODUCT_STAGES) {
      expect(err).toContain(stage)
    }
  })
})

describe('Coercion map structure', () => {
  it('every coercion target is a canonical UPGProductStage', () => {
    for (const [legacy, target] of Object.entries(UPG_PRODUCT_STAGE_COERCION_MAP)) {
      expect(
        UPG_PRODUCT_STAGES,
        `${legacy} → ${target} — target is not in UPG_PRODUCT_STAGES`,
      ).toContain(target)
    }
  })

  it('coercion map is frozen (cannot drift at runtime)', () => {
    expect(Object.isFrozen(UPG_PRODUCT_STAGE_COERCION_MAP)).toBe(true)
  })
})
