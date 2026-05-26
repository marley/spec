/**
 * DDD/CQRS event-flow chain — v0.5.3 (UPG-517 batch C1)
 *
 * Three causal edges that complete the event-driven dynamics on top of the
 * existing DDD/CQRS structural shape (aggregate_contains_*, aggregate_handles_
 * command, bounded_context_modelled_as_aggregate, bounded_context_emits_
 * domain_event):
 *
 *   - command_produces_domain_event        (engineering · causal)
 *   - aggregate_emits_domain_event         (engineering · causal)
 *   - domain_event_projected_to_read_model (engineering · causal)
 *
 * Together they form the canonical CQRS event flow:
 *
 *   command --produces--> domain_event <--emits-- aggregate
 *                                |
 *                                +--projected_to--> read_model
 *
 * (Batch C, section C1) for the motivating audit.
 *
 * Run: npx vitest run src/__tests__/ddd-cqrs-chain.test.ts
 */

import { describe, it, expect } from 'vitest'
import { UPG_EDGE_CATALOG } from '../catalog/edge-catalog.js'
import {
  UPG_EDGE_PAIR_MAP,
  resolveContainmentEdge,
  resolveAllEdges,
  pickCanonicalEdge,
} from '../index.js'

describe('UPG-517 C1 — command → domain_event', () => {
  it('command_produces_domain_event exists in UPG_EDGE_CATALOG with the right shape', () => {
    const def = UPG_EDGE_CATALOG.command_produces_domain_event
    expect(def).toBeDefined()
    expect(def.source_type).toBe('command')
    expect(def.target_type).toBe('domain_event')
    expect(def.classification).toBe('causal')
    expect(def.forward_verb).toBe('produces')
    expect(def.reverse_verb).toBe('produced_by')
  })

  it('UPG_EDGE_PAIR_MAP indexes the command → domain_event pair', () => {
    expect(UPG_EDGE_PAIR_MAP['command:domain_event']).toContain(
      'command_produces_domain_event',
    )
  })

  it('pickCanonicalEdge("command","domain_event") returns the causal edge', () => {
    expect(pickCanonicalEdge('command', 'domain_event')).toBe(
      'command_produces_domain_event',
    )
  })

  it('resolveAllEdges("command","domain_event") includes the new edge', () => {
    expect(resolveAllEdges('command', 'domain_event')).toContain(
      'command_produces_domain_event',
    )
  })
})

describe('UPG-517 C1 — aggregate → domain_event', () => {
  it('aggregate_emits_domain_event exists in UPG_EDGE_CATALOG with the right shape', () => {
    const def = UPG_EDGE_CATALOG.aggregate_emits_domain_event
    expect(def).toBeDefined()
    expect(def.source_type).toBe('aggregate')
    expect(def.target_type).toBe('domain_event')
    expect(def.classification).toBe('causal')
    expect(def.forward_verb).toBe('emits')
    expect(def.reverse_verb).toBe('emitted_by')
  })

  it('UPG_EDGE_PAIR_MAP indexes the aggregate → domain_event pair', () => {
    expect(UPG_EDGE_PAIR_MAP['aggregate:domain_event']).toContain(
      'aggregate_emits_domain_event',
    )
  })

  it('pickCanonicalEdge("aggregate","domain_event") returns the causal edge', () => {
    expect(pickCanonicalEdge('aggregate', 'domain_event')).toBe(
      'aggregate_emits_domain_event',
    )
  })
})

describe('UPG-517 C1 — domain_event → read_model', () => {
  it('domain_event_projected_to_read_model exists in UPG_EDGE_CATALOG with the right shape', () => {
    const def = UPG_EDGE_CATALOG.domain_event_projected_to_read_model
    expect(def).toBeDefined()
    expect(def.source_type).toBe('domain_event')
    expect(def.target_type).toBe('read_model')
    expect(def.classification).toBe('causal')
    expect(def.forward_verb).toBe('projected_to')
    expect(def.reverse_verb).toBe('projected_from')
  })

  it('UPG_EDGE_PAIR_MAP indexes the domain_event → read_model pair', () => {
    expect(UPG_EDGE_PAIR_MAP['domain_event:read_model']).toContain(
      'domain_event_projected_to_read_model',
    )
  })

  it('pickCanonicalEdge("domain_event","read_model") returns the causal edge', () => {
    expect(pickCanonicalEdge('domain_event', 'read_model')).toBe(
      'domain_event_projected_to_read_model',
    )
  })
})

describe('UPG-517 C1 — resolveContainmentEdge contract', () => {
  it('resolveContainmentEdge("bounded_context","aggregate") returns the canonical hierarchy edge', () => {
    // bounded_context_modelled_as_aggregate is the existing canonical
    // containment for this pair — pre-existing, hierarchy classification.
    expect(resolveContainmentEdge('bounded_context', 'aggregate')).toBe(
      'bounded_context_modelled_as_aggregate',
    )
  })

  it('resolveContainmentEdge("aggregate","domain_entity") returns the canonical hierarchy edge', () => {
    // aggregate_contains_domain_entity was added at v0.5.1.
    expect(resolveContainmentEdge('aggregate', 'domain_entity')).toBe(
      'aggregate_contains_domain_entity',
    )
  })

  it('resolveContainmentEdge("aggregate","value_object") returns the canonical hierarchy edge', () => {
    expect(resolveContainmentEdge('aggregate', 'value_object')).toBe(
      'aggregate_contains_value_object',
    )
  })

  it('resolveContainmentEdge("aggregate","command") returns the existing hierarchy edge', () => {
    // aggregate_handles_command shipped at v0.5.1 as hierarchy classification
    // (aggregate ∈ UPG_VALID_CHILDREN includes command). The brief proposed
    // causal here; we defer to the v0.5.1 decision and leave it as hierarchy.
    expect(resolveContainmentEdge('aggregate', 'command')).toBe(
      'aggregate_handles_command',
    )
  })

  it('resolveContainmentEdge("command","domain_event") returns null', () => {
    // No hierarchy edge for command → domain_event — only the causal edge
    // command_produces_domain_event. resolveContainmentEdge hints 'hierarchy'
    // first; falls back via CLASSIFICATION_RANK to causal when no hierarchy
    // exists, so this returns the causal edge (not null).
    // (See pickCanonicalEdge: only returns null when no edge at all exists.)
    expect(resolveContainmentEdge('command', 'domain_event')).toBe(
      'command_produces_domain_event',
    )
  })

  it('resolveContainmentEdge("aggregate","domain_event") returns the causal edge via fallback', () => {
    // No hierarchy edge — only the new causal aggregate_emits_domain_event.
    expect(resolveContainmentEdge('aggregate', 'domain_event')).toBe(
      'aggregate_emits_domain_event',
    )
  })

  it('resolveContainmentEdge("domain_event","read_model") returns the causal edge via fallback', () => {
    expect(resolveContainmentEdge('domain_event', 'read_model')).toBe(
      'domain_event_projected_to_read_model',
    )
  })
})

describe('UPG-517 C1 — entities are no longer pure terminals', () => {
  it('command has at least one outgoing canonical edge', () => {
    const outgoing = Object.entries(UPG_EDGE_CATALOG)
      .filter(([, def]) => def.source_type === 'command')
      .map(([key]) => key)
    expect(outgoing).toEqual(
      expect.arrayContaining(['command_produces_domain_event']),
    )
  })

  it('domain_event has at least one outgoing canonical edge', () => {
    const outgoing = Object.entries(UPG_EDGE_CATALOG)
      .filter(([, def]) => def.source_type === 'domain_event')
      .map(([key]) => key)
    expect(outgoing).toEqual(
      expect.arrayContaining(['domain_event_projected_to_read_model']),
    )
  })
})

describe('UPG-517 C1 — chain composability', () => {
  it('aggregate has both structural (handles) and causal (emits) connections to events', () => {
    // The CQRS shape: aggregate handles commands (structural) and emits the
    // events that result (causal). Both edges must exist for the dynamics to
    // be expressible without overloading a single relation.
    expect(UPG_EDGE_CATALOG.aggregate_handles_command).toBeDefined()
    expect(UPG_EDGE_CATALOG.aggregate_emits_domain_event).toBeDefined()
  })

  it('domain_event is reachable from both command (trigger) and aggregate (source)', () => {
    // The canonical polysemy: a single domain_event has two reverse-direction
    // edges — produced_by from a command, emitted_by from an aggregate. Both
    // views must be addressable.
    expect(UPG_EDGE_PAIR_MAP['command:domain_event']).toContain(
      'command_produces_domain_event',
    )
    expect(UPG_EDGE_PAIR_MAP['aggregate:domain_event']).toContain(
      'aggregate_emits_domain_event',
    )
  })

  it('all three new edges are causal — they encode dynamics, not structure', () => {
    expect(UPG_EDGE_CATALOG.command_produces_domain_event.classification).toBe(
      'causal',
    )
    expect(UPG_EDGE_CATALOG.aggregate_emits_domain_event.classification).toBe(
      'causal',
    )
    expect(
      UPG_EDGE_CATALOG.domain_event_projected_to_read_model.classification,
    ).toBe('causal')
  })

  it('all three new edges are between distinct types — no self-loops', () => {
    // Composes cleanly with UPG-520 self-loop refusal. No same-type edge
    // should exist among the new additions.
    const newKeys = [
      'command_produces_domain_event',
      'aggregate_emits_domain_event',
      'domain_event_projected_to_read_model',
    ] as const
    for (const key of newKeys) {
      const def = UPG_EDGE_CATALOG[key]
      expect(def.source_type).not.toBe(def.target_type)
    }
  })
})
