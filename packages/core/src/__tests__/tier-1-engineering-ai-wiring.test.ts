/**
 * Tier-1 Engineering + AI Canvas Wiring — v0.5.7
 *
 * The slot-connectivity audit (Agent O2) — re-run on Agent V's
 * v0.5.6 base — surfaced 94 missing ordered slot-pair edges across four
 * Tier-1 engineering + AI canvases:
 *
 *   - Bounded Context Canvas (Nick Tune / DDD Crew)
 *   - LLM Evaluation Framework (NLP community)
 *   - API Design First (OpenAPI Initiative)
 *   - Multi-Agent Orchestration (AutoGen / CrewAI / LangGraph)
 *
 * Part 2c adds 11 HIGH-confidence edges that represent real, canonical
 * relationships from the source engineering / AI literature. The remaining 83
 * pairs are LOW-confidence (slot-pair artifacts, hierarchy reverses already
 * covered by reverse traversal of an existing forward edge, paths already
 * mediated through a third entity, or conceptually loose canvas mappings)
 * and explicitly NOT added. Continues the Part 2a / 2b discipline.
 *
 * This test guards:
 *
 *   1. Each new edge exists in UPG_EDGE_CATALOG with the declared shape
 *      (source/target/classification/verbs).
 *   2. UPG_EDGE_PAIR_MAP indexes each new (source, target) pair.
 *   3. The post-fix connectivity_ratio for each of the 4 frameworks is
 *      strictly higher than the Part 1 (post-V) baseline.
 *
 * Run: npx vitest run src/__tests__/tier-1-engineering-ai-wiring.test.ts
 */

import { describe, it, expect } from 'vitest'
import { UPG_EDGE_CATALOG } from '../catalog/edge-catalog.js'
import { UPG_EDGE_PAIR_MAP, resolveAllEdges } from '../index.js'
import { UPG_FRAMEWORKS } from '../frameworks/definitions/index.js'
import { UPG_VALID_CHILDREN } from '../grammar/hierarchy.js'

// ─── New edges declared in v0.5.7 ────────────────────────────────────────────

/** All edges added by. Keep in lock-step with edge-catalog.ts. */
const NEW_EDGES = {
  // Bounded Context Canvas — HIGH-confidence
  bounded_context_publishes_api_contract: {
    source_type: 'bounded_context', target_type: 'api_contract',
    classification: 'hierarchy', forward_verb: 'publishes', reverse_verb: 'published_by',
  },
  domain_event_triggers_command: {
    source_type: 'domain_event', target_type: 'command',
    classification: 'causal', forward_verb: 'triggers', reverse_verb: 'triggered_by',
  },

  // LLM Evaluation Framework — HIGH-confidence
  eval_run_produces_metric: {
    source_type: 'eval_run', target_type: 'metric',
    classification: 'causal', forward_verb: 'produces', reverse_verb: 'produced_by',
  },
  eval_benchmark_defines_metric: {
    source_type: 'eval_benchmark', target_type: 'metric',
    classification: 'hierarchy', forward_verb: 'defines', reverse_verb: 'defined_by',
  },

  // API Design First — HIGH-confidence
  api_endpoint_references_domain_entity: {
    source_type: 'api_endpoint', target_type: 'domain_entity',
    classification: 'semantic', forward_verb: 'references', reverse_verb: 'referenced_by',
  },
  api_contract_records_decision: {
    source_type: 'api_contract', target_type: 'decision',
    classification: 'cross-domain', forward_verb: 'records', reverse_verb: 'recorded_in',
  },
  data_flow_transports_domain_entity: {
    source_type: 'data_flow', target_type: 'domain_entity',
    classification: 'causal', forward_verb: 'transports', reverse_verb: 'transported_by',
  },
  api_endpoint_participates_in_data_flow: {
    source_type: 'api_endpoint', target_type: 'data_flow',
    classification: 'semantic', forward_verb: 'participates_in', reverse_verb: 'involves',
  },

  // Multi-Agent Orchestration — HIGH-confidence
  agent_definition_produces_workflow_artifact: {
    source_type: 'agent_definition', target_type: 'workflow_artifact',
    classification: 'causal', forward_verb: 'produces', reverse_verb: 'produced_by',
  },
  agent_hook_fires_during_workflow_run: {
    source_type: 'agent_hook', target_type: 'workflow_run',
    classification: 'causal', forward_verb: 'fires_during', reverse_verb: 'fires_via',
  },
  workflow_run_passes_through_review_gate: {
    source_type: 'workflow_run', target_type: 'review_gate',
    classification: 'causal', forward_verb: 'passes_through', reverse_verb: 'gates_run',
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

describe(' — catalog grew by exactly 11 edges over v0.5.6', () => {
  it('all 11 new edge keys are present in UPG_EDGE_CATALOG', () => {
    const keys = Object.keys(NEW_EDGES)
    expect(keys.length).toBe(11)
    for (const key of keys) {
      expect((UPG_EDGE_CATALOG as Record<string, unknown>)[key]).toBeDefined()
    }
  })
})

// ─── Hierarchy grammar extensions ────────────────────────────────────────────

describe(' — UPG_VALID_CHILDREN reflects the two new hierarchy edges', () => {
  it('bounded_context.children includes api_contract', () => {
    expect(UPG_VALID_CHILDREN['bounded_context']).toContain('api_contract')
  })
  it('eval_benchmark.children includes metric', () => {
    expect(UPG_VALID_CHILDREN['eval_benchmark']).toContain('metric')
  })
})

// ─── Framework slot-connectivity regression ──────────────────────────────────
//
// For each of the 4 target frameworks, compute the directional slot-pair
// connectivity ratio using the same algorithm as Agent O2's Part 1 audit:
// for every ordered (A, B) pair of unique entity types appearing in slots[*]
// where A ≠ B, check whether resolveAllEdges(A, B) is non-empty.
//
// Baselines pinned from a re-run of the Part 1 audit on Agent V's v0.5.6
// branch (post Agent S DDD/CQRS chain, post Agent K Wardley capability work,
// post Agent U/V Part 2a/2b wiring). The post-fix connected count must be
// strictly higher than the baseline — no absolute threshold (per Part 2a/2b
// lesson: the audit metric overstates canvas connectivity).

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
  // Pre-fix baselines from Part 1 audit re-run on v0.5.6 base (2026-05-21).
  const BASELINES: Record<string, { connected: number; total: number; ratio: number }> = {
    'bounded-context-canvas': { connected: 6, total: 30, ratio: 0.2 },
    'llm-evaluation-framework': { connected: 4, total: 30, ratio: 0.13333333333333333 },
    'api-design-first': { connected: 1, total: 20, ratio: 0.05 },
    'multi-agent-orchestration': { connected: 5, total: 30, ratio: 0.16666666666666666 },
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
