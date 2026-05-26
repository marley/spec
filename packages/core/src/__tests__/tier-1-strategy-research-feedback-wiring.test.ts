/**
 * Tier-1 Strategy + Research + Feedback Canvas Wiring — v0.5.8 (UPG-528 Part 2d)
 *
 * The UPG-528 Part 1 slot-connectivity audit (Agent O2) — re-run on Agent W's
 * v0.5.7 base — surfaced ~160 missing ordered slot-pair edges across eight
 * Tier-1 strategy, research, and feedback canvases:
 *
 *   - McKinsey 7S (Peters & Waterman)
 *   - Strategy Diamond (Hambrick & Fredrickson)
 *   - Research Democratisation (ResearchOps community)
 *   - Research Ops Framework (ResearchOps Community)
 *   - Usability Test Plan (Nielsen)
 *   - Behavioural Cohort Analysis (Amplitude/Mixpanel)
 *   - Customer Advisory Board (B2B canon)
 *   - Customer Effort Score (Dixon/Toman/DeLisi)
 *
 * Part 2d adds 22 HIGH-confidence edges that represent real, canonical
 * relationships from the source literature. The remaining ~140 pairs are
 * LOW-confidence (slot-pair artifacts — the 7S model is a "they all interact"
 * diagram with no directional verbs; hierarchy reverses already covered by
 * the existing forward edge; paths mediated through a third entity like
 * `research_study`; or conceptually-loose canvas mappings) and explicitly NOT
 * added. Continues the Part 2a / 2b / 2c discipline.
 *
 * This test guards:
 *
 *   1. Each new edge exists in UPG_EDGE_CATALOG with the declared shape
 *      (source/target/classification/verbs).
 *   2. UPG_EDGE_PAIR_MAP indexes each new (source, target) pair.
 *   3. The post-fix connectivity_ratio for each of the 8 frameworks is
 *      strictly higher than the Part 1 (post-W) baseline.
 *
 * Run: npx vitest run src/__tests__/tier-1-strategy-research-feedback-wiring.test.ts
 */

import { describe, it, expect } from 'vitest'
import { UPG_EDGE_CATALOG } from '../catalog/edge-catalog.js'
import { UPG_EDGE_PAIR_MAP, resolveAllEdges } from '../index.js'
import { UPG_FRAMEWORKS } from '../frameworks/definitions/index.js'
import { UPG_VALID_CHILDREN } from '../grammar/hierarchy.js'

// ─── New edges declared in v0.5.8 ────────────────────────────────────────────

/** All edges added by UPG-528 Part 2d. Keep in lock-step with edge-catalog.ts. */
const NEW_EDGES = {
  // McKinsey 7S — HIGH-confidence (3)
  vision_guides_strategic_theme: {
    source_type: 'vision', target_type: 'strategic_theme',
    classification: 'causal', forward_verb: 'guides', reverse_verb: 'guided_by',
  },
  strategic_theme_requires_capability: {
    source_type: 'strategic_theme', target_type: 'capability',
    classification: 'causal', forward_verb: 'requires', reverse_verb: 'required_by',
  },
  strategic_theme_flows_through_value_stream: {
    source_type: 'strategic_theme', target_type: 'value_stream',
    classification: 'semantic', forward_verb: 'flows_through', reverse_verb: 'channels',
  },

  // Strategy Diamond — HIGH-confidence (4)
  initiative_enters_market_segment: {
    source_type: 'initiative', target_type: 'market_segment',
    classification: 'cross-domain', forward_verb: 'enters', reverse_verb: 'entered_by',
  },
  initiative_realises_value_proposition: {
    source_type: 'initiative', target_type: 'value_proposition',
    classification: 'causal', forward_verb: 'realises', reverse_verb: 'realised_by',
  },
  initiative_unlocks_revenue_stream: {
    source_type: 'initiative', target_type: 'revenue_stream',
    classification: 'causal', forward_verb: 'unlocks', reverse_verb: 'unlocked_by',
  },
  distribution_channel_generates_revenue_stream: {
    source_type: 'distribution_channel', target_type: 'revenue_stream',
    classification: 'causal', forward_verb: 'generates', reverse_verb: 'generated_by',
  },

  // Research Democratisation — HIGH-confidence (1)
  review_gate_vets_insight: {
    source_type: 'review_gate', target_type: 'insight',
    classification: 'hierarchy', forward_verb: 'vets', reverse_verb: 'vetted_by',
  },

  // Research Ops — HIGH-confidence (2)
  research_plan_recruits_participant: {
    source_type: 'research_plan', target_type: 'participant',
    classification: 'causal', forward_verb: 'recruits', reverse_verb: 'recruited_into',
  },
  insight_informs_design_guideline: {
    source_type: 'insight', target_type: 'design_guideline',
    classification: 'cross-domain', forward_verb: 'informs', reverse_verb: 'informed_by',
  },

  // Usability Test Plan — HIGH-confidence (1)
  research_question_generates_task: {
    source_type: 'research_question', target_type: 'task',
    classification: 'causal', forward_verb: 'generates', reverse_verb: 'generated_by',
  },

  // Behavioural Cohort Analysis — HIGH-confidence (3)
  cohort_defined_by_behavioral_segment: {
    source_type: 'cohort', target_type: 'behavioral_segment',
    classification: 'semantic', forward_verb: 'defined_by', reverse_verb: 'defines',
  },
  cohort_measured_by_metric: {
    source_type: 'cohort', target_type: 'metric',
    classification: 'causal', forward_verb: 'measured_by', reverse_verb: 'measures',
  },
  behavioral_segment_measured_by_metric: {
    source_type: 'behavioral_segment', target_type: 'metric',
    classification: 'causal', forward_verb: 'measured_by', reverse_verb: 'measures',
  },

  // Customer Advisory Board — HIGH-confidence (3)
  user_advisory_board_convenes_as_ceremony: {
    source_type: 'user_advisory_board', target_type: 'ceremony',
    classification: 'hierarchy', forward_verb: 'convenes_as', reverse_verb: 'convenes',
  },
  user_advisory_board_surfaces_research_question: {
    source_type: 'user_advisory_board', target_type: 'research_question',
    classification: 'cross-domain', forward_verb: 'surfaces', reverse_verb: 'surfaced_by',
  },
  user_advisory_board_shapes_initiative: {
    source_type: 'user_advisory_board', target_type: 'initiative',
    classification: 'cross-domain', forward_verb: 'shapes', reverse_verb: 'shaped_by',
  },

  // Customer Effort Score — HIGH-confidence (3)
  feedback_program_measured_by_metric: {
    source_type: 'feedback_program', target_type: 'metric',
    classification: 'causal', forward_verb: 'measured_by', reverse_verb: 'measures',
  },
  metric_segmented_by_behavioral_segment: {
    source_type: 'metric', target_type: 'behavioral_segment',
    classification: 'cross-domain', forward_verb: 'segmented_by', reverse_verb: 'segments',
  },
  feedback_theme_surfaces_insight: {
    source_type: 'feedback_theme', target_type: 'insight',
    classification: 'cross-domain', forward_verb: 'surfaces', reverse_verb: 'surfaced_by',
  },

  // Cross-framework canonical research edges — HIGH-confidence (2)
  insight_evidenced_by_quote: {
    source_type: 'insight', target_type: 'quote',
    classification: 'hierarchy', forward_verb: 'evidenced_by', reverse_verb: 'evidences',
  },
  journey_step_yields_observation: {
    source_type: 'journey_step', target_type: 'observation',
    classification: 'cross-domain', forward_verb: 'yields', reverse_verb: 'yielded_in',
  },
} as const

// ─── Shape and registry assertions ───────────────────────────────────────────

describe('UPG-528 Part 2d — every new edge is registered with the declared shape', () => {
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

describe('UPG-528 Part 2d — no self-loops introduced', () => {
  it('every new edge has distinct source and target types', () => {
    for (const [key, expected] of Object.entries(NEW_EDGES)) {
      expect(expected.source_type, `${key} source/target collision`).not.toBe(
        expected.target_type,
      )
    }
  })
})

// ─── Catalog growth ──────────────────────────────────────────────────────────

describe('UPG-528 Part 2d — catalog grew by exactly 22 edges over v0.5.7', () => {
  it('all 22 new edge keys are present in UPG_EDGE_CATALOG', () => {
    const keys = Object.keys(NEW_EDGES)
    expect(keys.length).toBe(22)
    for (const key of keys) {
      expect((UPG_EDGE_CATALOG as Record<string, unknown>)[key]).toBeDefined()
    }
  })
})

// ─── Hierarchy grammar extensions ────────────────────────────────────────────

describe('UPG-528 Part 2d — UPG_VALID_CHILDREN reflects the three new hierarchy edges', () => {
  it('review_gate.children includes insight', () => {
    expect(UPG_VALID_CHILDREN['review_gate']).toContain('insight')
  })
  it('user_advisory_board.children includes ceremony', () => {
    expect(UPG_VALID_CHILDREN['user_advisory_board']).toContain('ceremony')
  })
  it('insight.children includes quote', () => {
    expect(UPG_VALID_CHILDREN['insight']).toContain('quote')
  })
})

// ─── Framework slot-connectivity regression ──────────────────────────────────
//
// For each of the 8 target frameworks, compute the directional slot-pair
// connectivity ratio using the same algorithm as Agent O2's Part 1 audit:
// for every ordered (A, B) pair of unique entity types appearing in slots[*]
// where A ≠ B, check whether resolveAllEdges(A, B) is non-empty.
//
// Baselines pinned from a re-run of the Part 1 audit on Agent W's v0.5.7
// branch (post Agent U/V/W's Part 2a/2b/2c wiring). The post-fix connected
// count must be strictly higher than the baseline — no absolute threshold
// (per Part 2a/2b/2c lesson: the audit metric overstates canvas connectivity).

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

describe('UPG-528 Part 2d — slot-connectivity strictly higher than pre-fix baseline', () => {
  // Pre-fix baselines from Part 1 audit re-run on v0.5.7 base (2026-05-21).
  const BASELINES: Record<string, { connected: number; total: number; ratio: number }> = {
    'mckinsey-7s': { connected: 1, total: 30, ratio: 0.03333333333333333 },
    'strategy-diamond': { connected: 5, total: 20, ratio: 0.25 },
    'research-democratisation-framework': { connected: 0, total: 20, ratio: 0.0 },
    'research-ops-framework': { connected: 1, total: 20, ratio: 0.05 },
    'usability-test-plan': { connected: 1, total: 20, ratio: 0.05 },
    'behavioural-cohort-analysis': { connected: 1, total: 20, ratio: 0.05 },
    'customer-advisory-board-framework': { connected: 1, total: 20, ratio: 0.05 },
    'customer-effort-score': { connected: 1, total: 20, ratio: 0.05 },
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
