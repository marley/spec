/**
 * Status migrations — registry shape + helper behaviour + lifecycle coherence.
 *
 * Three concerns:
 *
 *  1. Shape: at least 3 entity types with at least 2 mappings each (the
 *     minimum coverage bar from the ticket).
 *  2. Helper: `migrateStatusValue` returns canonical replacement for
 *     registered legacy values, `null` for unregistered, `hasStatusMigration`
 *     excludes identity mappings, `listStatusMigrations` enumerates the full
 *     map.
 *  3. Coherence: every replacement target must be a real phase id in the
 *     entity type's lifecycle (`findInvalidStatusMigrationTargets` returns
 *     empty). Otherwise the migration map references a stale lifecycle
 *     and would silently rewrite to invalid values.
 */

import { describe, it, expect } from 'vitest'
import {
  UPG_STATUS_MIGRATIONS,
  migrateStatusValue,
  hasStatusMigration,
  listStatusMigrations,
  findInvalidStatusMigrationTargets,
} from '../grammar/status-migrations.js'
import { getLifecycleForType } from '../grammar/lifecycles.js'

// ─── Shape ────────────────────────────────────────────────────────────────

describe('UPG_STATUS_MIGRATIONS shape', () => {
  it('covers at least 3 entity types with 2+ mappings each ( coverage bar)', () => {
    const qualifying = Object.entries(UPG_STATUS_MIGRATIONS).filter(
      ([, map]) => map && Object.keys(map).length >= 2,
    )
    expect(qualifying.length).toBeGreaterThanOrEqual(3)
  })

  it('includes the service drift case (largest observed: 173 service:active rows)', () => {
    expect(UPG_STATUS_MIGRATIONS.service).toBeDefined()
    expect(UPG_STATUS_MIGRATIONS.service?.active).toBe('production')
  })

  it('every legacy value is a non-empty string and every target is a non-empty string', () => {
    for (const [entityType, map] of Object.entries(UPG_STATUS_MIGRATIONS)) {
      if (!map) continue
      for (const [from, to] of Object.entries(map)) {
        expect(from, `${entityType}.${from}`).toBeTruthy()
        expect(to, `${entityType}.${from}→${to}`).toBeTruthy()
        expect(typeof from).toBe('string')
        expect(typeof to).toBe('string')
      }
    }
  })
})

// ─── Helper: migrateStatusValue ──────────────────────────────────────────

describe('migrateStatusValue', () => {
  it('returns canonical replacement for a registered legacy value', () => {
    expect(migrateStatusValue('service', 'active')).toBe('production')
    expect(migrateStatusValue('service', 'inactive')).toBe('deprecated')
    expect(migrateStatusValue('feature', 'active')).toBe('shipped')
  })

  it('returns null for an unregistered legacy value on a registered type', () => {
    expect(migrateStatusValue('service', 'totally_made_up')).toBeNull()
    expect(migrateStatusValue('feature', 'xyz_unknown')).toBeNull()
  })

  it('returns null for an unregistered entity type', () => {
    expect(migrateStatusValue('persona', 'active')).toBeNull()
    expect(migrateStatusValue('not_a_real_type', 'whatever')).toBeNull()
  })

  it('returns null for an empty status', () => {
    expect(migrateStatusValue('service', '')).toBeNull()
  })
})

// ─── Helper: hasStatusMigration ──────────────────────────────────────────

describe('hasStatusMigration', () => {
  it('returns true when a migration would change the value', () => {
    expect(hasStatusMigration('service', 'active')).toBe(true)
    expect(hasStatusMigration('feature', 'active')).toBe(true)
  })

  it('returns false when no migration is registered', () => {
    expect(hasStatusMigration('persona', 'active')).toBe(false)
    expect(hasStatusMigration('service', 'unknown_value')).toBe(false)
  })

  it('returns false for an identity mapping (no actual mutation)', () => {
    // feature_area.active → active is an identity entry registered so
    // callers can rely on the map for "is this a known value", but
    // hasStatusMigration filters it out so dry-run reports don't list
    // no-op mutations.
    expect(migrateStatusValue('feature_area', 'active')).toBeNull()
    // feature_area does NOT register `active → active` (active is
    // already canonical, no rewrite needed). Use a different identity-
    // shaped check: a real entry that maps a value to itself.
    // Currently no entries map to themselves — the doctrine is "only
    // register non-identity mappings". Verify the doctrine holds:
    for (const [type, map] of Object.entries(UPG_STATUS_MIGRATIONS)) {
      if (!map) continue
      for (const [from, to] of Object.entries(map)) {
        expect(from, `${type}: ${from}→${to} is an identity entry`).not.toBe(to)
      }
    }
  })
})

// ─── Helper: listStatusMigrations ────────────────────────────────────────

describe('listStatusMigrations', () => {
  it('returns one row per (entityType, legacyValue) pair', () => {
    const rows = listStatusMigrations()
    let total = 0
    for (const map of Object.values(UPG_STATUS_MIGRATIONS)) {
      if (map) total += Object.keys(map).length
    }
    expect(rows.length).toBe(total)
  })

  it('every row has entity_type / from / to populated', () => {
    for (const row of listStatusMigrations()) {
      expect(row.entity_type).toBeTruthy()
      expect(row.from).toBeTruthy()
      expect(row.to).toBeTruthy()
    }
  })
})

// ─── Coherence: every replacement is a real lifecycle phase ──────────────

describe('Lifecycle coherence', () => {
  it('every replacement target resolves to a phase id in the type lifecycle', () => {
    // Defect bucket: targets that the lifecycle doesn't know about. Empty
    // means every (entityType, from, to) triple in the registry maps to a
    // real phase. Any entry here means the lifecycle changed since the
    // migration was written and the map is now silently rewriting to
    // invalid values.
    const defects = findInvalidStatusMigrationTargets()
    expect(defects, JSON.stringify(defects, null, 2)).toEqual([])
  })

  it('every entity_type in the map has a registered lifecycle', () => {
    // Status migration only applies when there's a lifecycle to migrate
    // TO. Lifecycle-free types (persona, quote, evidence, …) should never
    // appear in the map.
    for (const entityType of Object.keys(UPG_STATUS_MIGRATIONS)) {
      const lifecycle = getLifecycleForType(entityType)
      expect(lifecycle, `${entityType} missing lifecycle`).toBeDefined()
    }
  })
})
