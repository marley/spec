/**
 * New intra-domain edges — v0.5.1 ( batches C2 + C3)
 *
 * Three single-edge additions that fix documented domain-guide patterns
 * which were unwireable at one hop:
 *
 *  - api_contract_contains_api_endpoint  (engineering · hierarchy)
 *  - postmortem_identifies_root_cause    (devops · causal)
 *  - postmortem_produces_runbook         (devops · causal)
 *
 * (Batch C, sections C2 and C3) for the motivating audit.
 *
 * Run: npx vitest run src/__tests__/new-intra-domain-edges.test.ts
 */

import { describe, it, expect } from 'vitest'
import { UPG_EDGE_CATALOG } from '../catalog/edge-catalog.js'
import {
  UPG_EDGE_PAIR_MAP,
  resolveContainmentEdge,
  resolveAllEdges,
  pickCanonicalEdge,
} from '../index.js'

describe(' C2 — api_contract → api_endpoint', () => {
  it('api_contract_contains_api_endpoint exists in UPG_EDGE_CATALOG with the right shape', () => {
    const def = UPG_EDGE_CATALOG.api_contract_contains_api_endpoint
    expect(def).toBeDefined()
    expect(def.source_type).toBe('api_contract')
    expect(def.target_type).toBe('api_endpoint')
    expect(def.classification).toBe('hierarchy')
    expect(def.forward_verb).toBe('contains')
    expect(def.reverse_verb).toBe('belongs_to')
  })

  it('resolveContainmentEdge("api_contract","api_endpoint") returns the canonical edge', () => {
    expect(resolveContainmentEdge('api_contract', 'api_endpoint')).toBe(
      'api_contract_contains_api_endpoint',
    )
  })

  it('UPG_EDGE_PAIR_MAP indexes the new api_contract → api_endpoint pair', () => {
    expect(UPG_EDGE_PAIR_MAP['api_contract:api_endpoint']).toContain(
      'api_contract_contains_api_endpoint',
    )
  })
})

describe(' C3 — postmortem → root_cause', () => {
  it('postmortem_identifies_root_cause exists in UPG_EDGE_CATALOG with the right shape', () => {
    const def = UPG_EDGE_CATALOG.postmortem_identifies_root_cause
    expect(def).toBeDefined()
    expect(def.source_type).toBe('postmortem')
    expect(def.target_type).toBe('root_cause')
    expect(def.classification).toBe('causal')
    expect(def.forward_verb).toBe('identifies')
    expect(def.reverse_verb).toBe('identified_by')
  })

  it('UPG_EDGE_PAIR_MAP indexes the postmortem → root_cause pair', () => {
    expect(UPG_EDGE_PAIR_MAP['postmortem:root_cause']).toContain(
      'postmortem_identifies_root_cause',
    )
  })

  it('pickCanonicalEdge("postmortem","root_cause") returns the new causal edge', () => {
    // No hierarchy edge for this pair — causal wins under CLASSIFICATION_RANK.
    expect(pickCanonicalEdge('postmortem', 'root_cause')).toBe(
      'postmortem_identifies_root_cause',
    )
  })

  it('resolveAllEdges("postmortem","root_cause") includes the new edge', () => {
    expect(resolveAllEdges('postmortem', 'root_cause')).toContain(
      'postmortem_identifies_root_cause',
    )
  })
})

describe(' C3 — postmortem → runbook', () => {
  it('postmortem_produces_runbook exists in UPG_EDGE_CATALOG with the right shape', () => {
    const def = UPG_EDGE_CATALOG.postmortem_produces_runbook
    expect(def).toBeDefined()
    expect(def.source_type).toBe('postmortem')
    expect(def.target_type).toBe('runbook')
    expect(def.classification).toBe('causal')
    expect(def.forward_verb).toBe('produces')
    expect(def.reverse_verb).toBe('produced_by')
  })

  it('UPG_EDGE_PAIR_MAP indexes the postmortem → runbook pair', () => {
    expect(UPG_EDGE_PAIR_MAP['postmortem:runbook']).toContain(
      'postmortem_produces_runbook',
    )
  })

  it('pickCanonicalEdge("postmortem","runbook") returns the new causal edge', () => {
    expect(pickCanonicalEdge('postmortem', 'runbook')).toBe(
      'postmortem_produces_runbook',
    )
  })
})

describe(' — postmortem is no longer a pure terminal', () => {
  it('postmortem has at least two outgoing canonical edges', () => {
    const outgoing = Object.entries(UPG_EDGE_CATALOG)
      .filter(([, def]) => def.source_type === 'postmortem')
      .map(([key]) => key)
    expect(outgoing).toEqual(
      expect.arrayContaining([
        'postmortem_identifies_root_cause',
        'postmortem_produces_runbook',
      ]),
    )
  })
})
