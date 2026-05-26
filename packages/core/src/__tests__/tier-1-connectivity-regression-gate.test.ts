/**
 * Tier-1 Framework Slot-Connectivity Regression Gate — UPG-528 Part 2e.
 *
 * Pins the v0.5.8 (post-Tier-1-sweep) slot-pair connectivity ratio for each of
 * the 20 Tier-1 famous frameworks as a **strict minimum floor**. If any
 * framework's ratio drops below its floor, CI fails.
 *
 * This is a pure test-infrastructure addition — no catalog changes, no edges
 * added, no version bump. It guards against silent regression of the 77
 * canonical Tier-1 edges shipped across UPG-528 Batches 1-4:
 *
 *   - Batch 1 (UPG-528): Wardley edges + capability properties (v0.5.2)
 *   - Batch 2a (Part 2a, v0.5.5): Business / GTM canvas wiring (29 edges)
 *   - Batch 2b (Part 2b, v0.5.6): Design / UX canvas wiring (15 edges)
 *   - Batch 2c (Part 2c, v0.5.7): Engineering / AI canvas wiring (11 edges)
 *   - Batch 2d (Part 2d, v0.5.8): Strategy / research / feedback wiring (22 edges)
 *
 * # Connectivity algorithm
 *
 * For each framework, take the set of unique entity types referenced by
 * `slots[*]` (stable, first-seen order). For every ordered pair (A, B) where
 * A ≠ B, ask `resolveContainmentEdge(A, B)` whether a canonical edge exists.
 * `connected / total` is the framework's connectivity ratio.
 *
 * This is the **same algorithm** as the UPG-528 Part 1 audit
 * (`scripts/audit-framework-slot-connectivity.ts`) — the gate pins the live
 * audit metric directly so every CI run is a re-audit of the Tier-1 frameworks.
 *
 * # Why integer pinning, not float pinning
 *
 * The floor is encoded as `min_connected` / `total` (integers), not as a float
 * ratio. Two reasons:
 *
 *   1. **No floating-point margin needed.** `connected >= min_connected` is an
 *      integer comparison — exact, no tolerance, no rounding surprises.
 *   2. **One-pair regression sensitivity.** If any single canonical edge is
 *      removed, `connected` drops by at least one, and the test fires. Float
 *      pinning of `ratio` would need a tiny `0.001` margin and could mask very
 *      small reductions in larger frameworks.
 *
 * # If the gate fires
 *
 * The failure message lists:
 *
 *   - Which framework regressed
 *   - The pinned floor (connected / total) and what was achieved
 *   - The remediation: either restore the missing edge(s), OR — if the
 *     reduction is intentional (e.g., edge consolidation in UPG-510 or a
 *     ratified deprecation) — update the floor in this file AND document the
 *     change in CHANGELOG.md.
 *
 * The floor is a contract. Lowering it requires explicit ratification
 * (Captain + Spock), not a silent edit.
 *
 * Run: npx vitest run src/__tests__/tier-1-connectivity-regression-gate.test.ts
 */

import { describe, it, expect } from 'vitest'
import { UPG_FRAMEWORKS } from '../frameworks/definitions/index.js'
import { resolveContainmentEdge } from '../index.js'

// ─── Floor table ──────────────────────────────────────────────────────────────
//
// Pinned at the v0.5.8 baseline (2026-05-21) after UPG-528 Tier-1 sweep
// Batches 1-4. Each `min_connected` is the achieved canonical-edge count for
// the framework's ordered slot pairs at that baseline. `total` is the total
// ordered slot-pair count (N * (N-1) where N is the number of unique slot
// entity types) — invariant unless the framework definition itself changes.
//
// **Lowering any value here requires explicit ratification by Captain + Spock,
// and must be documented in CHANGELOG.md.**

interface ConnectivityFloor {
  framework_id: string
  /** Minimum number of canonical edges across ordered slot pairs. */
  min_connected: number
  /** Total ordered slot pairs (invariant under framework definition). */
  total: number
}

const TIER_1_CONNECTIVITY_FLOORS: readonly ConnectivityFloor[] = [
  // Business / GTM canvases (Part 2a — v0.5.5)
  { framework_id: 'business-model-canvas', min_connected: 17, total: 72 },
  { framework_id: 'lean-canvas', min_connected: 20, total: 110 },
  { framework_id: 'gtm-playbook', min_connected: 10, total: 30 },
  { framework_id: 'opportunity-canvas', min_connected: 9, total: 30 },
  { framework_id: 'test-card-learning-card', min_connected: 10, total: 30 },

  // Design / UX canvases (Part 2b — v0.5.6)
  { framework_id: 'lean-ux-canvas', min_connected: 15, total: 42 },
  { framework_id: 'persona-canvas', min_connected: 13, total: 30 },
  { framework_id: 'design-sprint', min_connected: 6, total: 20 },

  // Engineering / AI canvases (Part 2c — v0.5.7)
  { framework_id: 'bounded-context-canvas', min_connected: 8, total: 30 },
  { framework_id: 'llm-evaluation-framework', min_connected: 6, total: 30 },
  { framework_id: 'api-design-first', min_connected: 5, total: 20 },
  { framework_id: 'multi-agent-orchestration', min_connected: 8, total: 30 },

  // Strategy / research / feedback canvases (Part 2d — v0.5.8)
  { framework_id: 'mckinsey-7s', min_connected: 4, total: 30 },
  { framework_id: 'strategy-diamond', min_connected: 9, total: 20 },
  { framework_id: 'research-democratisation-framework', min_connected: 2, total: 20 },
  { framework_id: 'research-ops-framework', min_connected: 3, total: 20 },
  { framework_id: 'usability-test-plan', min_connected: 2, total: 20 },
  { framework_id: 'behavioural-cohort-analysis', min_connected: 5, total: 20 },
  { framework_id: 'customer-advisory-board-framework', min_connected: 4, total: 20 },
  { framework_id: 'customer-effort-score', min_connected: 5, total: 20 },
] as const

// ─── Connectivity computation ────────────────────────────────────────────────

interface ConnectivitySnapshot {
  connected: number
  total: number
  ratio: number
}

/**
 * Compute the framework's slot-pair canonical-edge connectivity using the same
 * algorithm as `scripts/audit-framework-slot-connectivity.ts`:
 *
 *   1. Unique entity types across `slots[*]` (stable, first-seen order).
 *   2. For every ordered pair (A, B) with A ≠ B, `resolveContainmentEdge(A, B)`.
 *   3. `connected = count of pairs with a non-null canonical edge`.
 *   4. `ratio = connected / total` (or 1 if total === 0 — vacuously CLEAN).
 */
function computeSlotConnectivity(frameworkId: string): ConnectivitySnapshot {
  const fw = UPG_FRAMEWORKS.find((f) => f.id === frameworkId)
  if (!fw) {
    throw new Error(`Framework not found: ${frameworkId}`)
  }
  const slots = fw.slots ?? []
  if (slots.length < 2) {
    return { connected: 0, total: 0, ratio: 1 }
  }

  // Stable first-seen order — matches the audit script.
  const seen = new Set<string>()
  const uniqueTypes: string[] = []
  for (const slot of slots) {
    const t = slot.entityTypeId
    if (typeof t === 'string' && !seen.has(t)) {
      seen.add(t)
      uniqueTypes.push(t)
    }
  }

  if (uniqueTypes.length < 2) {
    return { connected: 0, total: 0, ratio: 1 }
  }

  let connected = 0
  let total = 0
  for (const a of uniqueTypes) {
    for (const b of uniqueTypes) {
      if (a === b) continue
      total += 1
      if (resolveContainmentEdge(a, b) !== null) connected += 1
    }
  }

  return { connected, total, ratio: total === 0 ? 1 : connected / total }
}

// ─── The gate ────────────────────────────────────────────────────────────────

describe('UPG-528 Part 2e — Tier-1 framework connectivity regression gate', () => {
  it('floor table has exactly 20 Tier-1 frameworks', () => {
    expect(TIER_1_CONNECTIVITY_FLOORS).toHaveLength(20)
  })

  it('floor table has no duplicate framework_ids', () => {
    const ids = TIER_1_CONNECTIVITY_FLOORS.map((f) => f.framework_id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  for (const floor of TIER_1_CONNECTIVITY_FLOORS) {
    it(`${floor.framework_id}: canonical-edge connectivity must be ≥ ${floor.min_connected}/${floor.total}`, () => {
      const snap = computeSlotConnectivity(floor.framework_id)

      // The total slot-pair count is invariant unless the framework definition
      // itself changed. If this fails, the framework was edited — either update
      // the floor's `total` (if intentional) or revert the framework change.
      expect(
        snap.total,
        `${floor.framework_id}: total slot-pair count drifted from pinned baseline ` +
          `(${snap.total} vs ${floor.total}). The framework definition changed; ` +
          `either restore the slots or update the pinned total in ` +
          `tier-1-connectivity-regression-gate.test.ts and document the change ` +
          `in CHANGELOG.md.`,
      ).toBe(floor.total)

      // The strict regression check. `connected` is an integer — exact compare.
      const floorRatio = floor.min_connected / floor.total
      const actualRatio = snap.ratio
      expect(
        snap.connected,
        `\nEXPECTED: ${floor.framework_id} canonical-edge connectivity ≥ ` +
          `${floor.min_connected}/${floor.total} (${(floorRatio * 100).toFixed(1)}%)\n` +
          `ACTUAL:   ${snap.connected}/${snap.total} (${(actualRatio * 100).toFixed(1)}%) — REGRESSION\n\n` +
          `This means at least one canonical edge that was connecting ` +
          `${floor.framework_id} slots has been removed, renamed, or refactored ` +
          `out of resolution. Either:\n` +
          `  1. Restore the missing edge(s) to the catalog, OR\n` +
          `  2. If the reduction is intentional (e.g., edge consolidation in ` +
          `UPG-510, a ratified deprecation, or catalog evolution), update the ` +
          `floor in src/__tests__/tier-1-connectivity-regression-gate.test.ts ` +
          `to the new achievable count, AND document the change in CHANGELOG.md.\n\n` +
          `The floor is a contract — lowering it requires explicit ratification.\n`,
      ).toBeGreaterThanOrEqual(floor.min_connected)
    })
  }
})
