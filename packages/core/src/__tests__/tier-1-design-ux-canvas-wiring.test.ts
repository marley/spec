/**
 * Tier-1 Design/UX Canvas Wiring — v0.5.6
 *
 * The slot-connectivity audit (Agent O2) enumerated 75
 * missing ordered slot-pair edges across three Tier-1 design/UX canvases:
 *
 *   - Lean UX Canvas (Gothelf)
 *   - Persona Canvas (Cooper/Pichler)
 *   - Design Sprint (Knapp/GV)
 *
 * Part 2b adds 15 edges (13 high-confidence + 2 medium-confidence) that
 * represent real, canonical relationships from the source literature. The
 * remaining 60 pairs are LOW-confidence (slot-pair artifacts, hierarchy
 * reverses already covered by reverse traversal, mediated paths) and
 * explicitly NOT added. Continues the Part 2a discipline.
 *
 * This test guards:
 *
 *   1. Each new edge exists in UPG_EDGE_CATALOG with the declared shape
 *      (source/target/classification/verbs).
 *   2. UPG_EDGE_PAIR_MAP indexes each new (source, target) pair.
 *   3. The post-fix connectivity_ratio for each of the 3 frameworks is
 *      strictly higher than the Part 1 baseline.
 *
 * Run: npx vitest run src/__tests__/tier-1-design-ux-canvas-wiring.test.ts
 */

import { describe, it, expect } from 'vitest'
import { UPG_EDGE_CATALOG } from '../catalog/edge-catalog.js'
import { UPG_EDGE_PAIR_MAP, resolveAllEdges } from '../index.js'
import { UPG_FRAMEWORKS } from '../frameworks/definitions/index.js'

// ─── New edges declared in v0.5.6 ────────────────────────────────────────────

/** All edges added by. Keep in lock-step with edge-catalog.ts. */
const NEW_EDGES = {
  // Lean UX Canvas — HIGH-confidence (Gothelf hypothesis template)
  hypothesis_targets_outcome: {
    source_type: 'hypothesis', target_type: 'outcome',
    classification: 'causal', forward_verb: 'targets', reverse_verb: 'targeted_by',
  },
  hypothesis_concerns_persona: {
    source_type: 'hypothesis', target_type: 'persona',
    classification: 'semantic', forward_verb: 'concerns', reverse_verb: 'has_hypothesis',
  },
  feature_addresses_need: {
    source_type: 'feature', target_type: 'need',
    classification: 'cross-domain', forward_verb: 'addresses', reverse_verb: 'addressed_by',
  },
  experiment_run_measures_outcome: {
    source_type: 'experiment_run', target_type: 'outcome',
    classification: 'cross-domain', forward_verb: 'measures', reverse_verb: 'measured_by',
  },
  persona_pursues_outcome: {
    source_type: 'persona', target_type: 'outcome',
    classification: 'semantic', forward_verb: 'pursues', reverse_verb: 'pursued_by',
  },
  // Lean UX Canvas — MEDIUM-confidence (assumption-subject pattern completion)
  assumption_concerns_outcome: {
    source_type: 'assumption', target_type: 'outcome',
    classification: 'semantic', forward_verb: 'concerns', reverse_verb: 'has_assumption',
  },
  assumption_concerns_feature: {
    source_type: 'assumption', target_type: 'feature',
    classification: 'semantic', forward_verb: 'concerns', reverse_verb: 'has_assumption',
  },

  // Persona Canvas — HIGH-confidence
  quote_voices_persona: {
    source_type: 'quote', target_type: 'persona',
    classification: 'cross-domain', forward_verb: 'voices', reverse_verb: 'voiced_by',
  },
  need_measured_by_desired_outcome: {
    source_type: 'need', target_type: 'desired_outcome',
    classification: 'causal', forward_verb: 'measured_by', reverse_verb: 'measures',
  },
  observation_reveals_job: {
    source_type: 'observation', target_type: 'job',
    classification: 'cross-domain', forward_verb: 'reveals', reverse_verb: 'revealed_by',
  },

  // Design Sprint — HIGH-confidence
  design_question_resolved_by_decision: {
    source_type: 'design_question', target_type: 'decision',
    classification: 'causal', forward_verb: 'resolved_by', reverse_verb: 'resolves',
  },
  decision_selects_design_concept: {
    source_type: 'decision', target_type: 'design_concept',
    classification: 'causal', forward_verb: 'selects', reverse_verb: 'selected_by',
  },
  user_flow_validated_by_observation: {
    source_type: 'user_flow', target_type: 'observation',
    classification: 'causal', forward_verb: 'validated_by', reverse_verb: 'validates',
  },
  // Design Sprint — MEDIUM-confidence
  design_concept_realised_as_user_flow: {
    source_type: 'design_concept', target_type: 'user_flow',
    classification: 'causal', forward_verb: 'realised_as', reverse_verb: 'realises',
  },
  observation_informs_decision: {
    source_type: 'observation', target_type: 'decision',
    classification: 'cross-domain', forward_verb: 'informs', reverse_verb: 'informed_by',
  },
} as const

// ─── Shape and registry assertions ───────────────────────────────────────────

describe(' — every new edge is registered with the declared shape', () => {
  for (const [key, expected] of Object.entries(NEW_EDGES)) {
    it(`${key}: catalog entry matches declared shape`, () => {
      const def = (UPG_EDGE_CATALOG as Record<string, unknown>)[key] as
        | { source_type: string; target_type: string; classification: string; forward_verb: string; reverse_verb: string }
        | undefined
      expect(def).toBeDefined()
      expect(def!.source_type).toBe(expected.source_type)
      expect(def!.target_type).toBe(expected.target_type)
      expect(def!.classification).toBe(expected.classification)
      expect(def!.forward_verb).toBe(expected.forward_verb)
      expect(def!.reverse_verb).toBe(expected.reverse_verb)
    })

    it(`${key}: UPG_EDGE_PAIR_MAP indexes (${expected.source_type}, ${expected.target_type})`, () => {
      const pairKey = `${expected.source_type}:${expected.target_type}`
      expect(UPG_EDGE_PAIR_MAP[pairKey]).toContain(key)
    })
  }
})

// ─── Self-loop guard ─────────────────────────────────────────────────────────

describe(' — no self-loops introduced', () => {
  it('every new edge has distinct source and target types', () => {
    for (const [key, expected] of Object.entries(NEW_EDGES)) {
      expect(expected.source_type, `${key} source/target collision`).not.toBe(
        expected.target_type,
      )
    }
  })
})

// ─── Catalog growth ──────────────────────────────────────────────────────────

describe(' — catalog grew by exactly 15 edges over v0.5.5', () => {
  it('all 15 new edge keys are present in UPG_EDGE_CATALOG', () => {
    const keys = Object.keys(NEW_EDGES)
    expect(keys.length).toBe(15)
    for (const key of keys) {
      expect((UPG_EDGE_CATALOG as Record<string, unknown>)[key]).toBeDefined()
    }
  })
})

// ─── Framework slot-connectivity regression ──────────────────────────────────
//
// For each of the 3 target frameworks, compute the directional slot-pair
// connectivity ratio using the same algorithm as Agent O2's Part 1 audit:
// for every ordered (A, B) pair of unique entity types appearing in slots[*]
// where A ≠ B, check whether resolveAllEdges(A, B) is non-empty.
//
// The pre-fix baselines are pinned from the Part 1 audit JSON
// (packages/upg-spec/scripts/output/framework-slot-connectivity.json).
// The post-fix connected count must be strictly higher than the baseline —
// no absolute threshold (per Part 2a's lesson: the audit's
// "every directional pair must resolve" metric overstates how connected
// these canvases actually are, since most slot pairs are not canonical
// relationships).

interface ConnectivitySnapshot {
  connected: number
  total: number
  ratio: number
}

function computeSlotConnectivity(frameworkId: string): ConnectivitySnapshot {
  const fw = UPG_FRAMEWORKS.find((f) => f.id === frameworkId)
  if (!fw) throw new Error(`framework ${frameworkId} not found`)
  if (!fw.slots) throw new Error(`framework ${frameworkId} has no slots`)
  const uniqueTypes = Array.from(
    new Set(fw.slots.map((s) => s.entityTypeId)),
  ).filter((t): t is string => typeof t === 'string')
  let connected = 0
  let total = 0
  for (const a of uniqueTypes) {
    for (const b of uniqueTypes) {
      if (a === b) continue
      total += 1
      if (resolveAllEdges(a, b).length > 0) connected += 1
    }
  }
  return { connected, total, ratio: total === 0 ? 0 : connected / total }
}

describe(' — slot-connectivity strictly higher than pre-fix baseline', () => {
  // Pre-fix baselines from Part 1 audit JSON (2026-05-21).
  const BASELINES: Record<string, { connected: number; total: number; ratio: number }> = {
    'lean-ux-canvas': { connected: 6, total: 42, ratio: 0.14285714285714285 },
    'persona-canvas': { connected: 10, total: 30, ratio: 0.3333333333333333 },
    'design-sprint': { connected: 1, total: 20, ratio: 0.05 },
  }

  for (const frameworkId of Object.keys(BASELINES)) {
    it(`${frameworkId}: post-fix connected count is strictly higher than baseline`, () => {
      const snap = computeSlotConnectivity(frameworkId)
      const baseline = BASELINES[frameworkId]!

      // 1. Total slot-pair count is unchanged (we did not touch the framework).
      expect(snap.total).toBe(baseline.total)

      // 2. Post-fix connected count is strictly higher than baseline.
      expect(snap.connected).toBeGreaterThan(baseline.connected)

      // 3. Post-fix ratio is strictly higher than baseline.
      expect(snap.ratio).toBeGreaterThan(baseline.ratio)
    })
  }
})
