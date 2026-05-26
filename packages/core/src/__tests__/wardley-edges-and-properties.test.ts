/**
 * Wardley edges and capability properties — v0.5.2 (UPG-528).
 *
 * Four canonical edges complete the Wardley value-chain spine
 * `need → capability → capability → feature` and let competitors map onto
 * the same vocabulary. Two `CapabilityProperties` fields drive the y-axis
 * (visibility) and x-axis (evolution_stage) of a Wardley map.
 *
 *  - need_fulfilled_by_capability        (cross-domain · hierarchy)
 *  - capability_depends_on_capability    (strategy · hierarchy · same-type)
 *  - capability_implemented_by_feature   (cross-domain · hierarchy)
 *  - competitor_offers_capability        (market_intelligence → strategy · cross-domain)
 *
 *  - CapabilityProperties.evolution_stage: 'genesis' | 'custom' | 'product' | 'commodity'
 *  - CapabilityProperties.visibility:      number in [0.0, 1.0]
 *
 * Run: npx vitest run src/__tests__/wardley-edges-and-properties.test.ts
 */

import { describe, it, expect } from 'vitest'
import { UPG_EDGE_CATALOG } from '../catalog/edge-catalog.js'
import {
  UPG_EDGE_PAIR_MAP,
  resolveContainmentEdge,
  resolveAllEdges,
  pickCanonicalEdge,
} from '../index.js'
import { UPG_VALID_CHILDREN } from '../grammar/hierarchy.js'
import { UPG_PROPERTY_SCHEMA } from '../properties/property-schema.js'
import type { CapabilityProperties } from '../properties/domains/strategy.js'

describe('UPG-528 — need → capability anchor', () => {
  it('need_fulfilled_by_capability exists with the right shape', () => {
    const def = UPG_EDGE_CATALOG.need_fulfilled_by_capability
    expect(def).toBeDefined()
    expect(def.source_type).toBe('need')
    expect(def.target_type).toBe('capability')
    expect(def.classification).toBe('hierarchy')
    expect(def.forward_verb).toBe('fulfilled_by')
    expect(def.reverse_verb).toBe('fulfils')
  })

  it('resolveContainmentEdge("need","capability") returns the canonical edge', () => {
    expect(resolveContainmentEdge('need', 'capability')).toBe(
      'need_fulfilled_by_capability',
    )
  })

  it('UPG_EDGE_PAIR_MAP indexes the need → capability pair', () => {
    expect(UPG_EDGE_PAIR_MAP['need:capability']).toContain(
      'need_fulfilled_by_capability',
    )
  })

  it('UPG_VALID_CHILDREN["need"] includes capability', () => {
    expect(UPG_VALID_CHILDREN['need']).toContain('capability')
  })
})

describe('UPG-528 — capability → capability value-chain spine', () => {
  it('capability_depends_on_capability exists with the right shape', () => {
    const def = UPG_EDGE_CATALOG.capability_depends_on_capability
    expect(def).toBeDefined()
    expect(def.source_type).toBe('capability')
    expect(def.target_type).toBe('capability')
    expect(def.classification).toBe('hierarchy')
    expect(def.forward_verb).toBe('depends_on')
    expect(def.reverse_verb).toBe('depended_on_by')
  })

  it('resolveContainmentEdge("capability","capability") returns the canonical edge', () => {
    expect(resolveContainmentEdge('capability', 'capability')).toBe(
      'capability_depends_on_capability',
    )
  })

  it('UPG_EDGE_PAIR_MAP indexes the capability → capability pair', () => {
    expect(UPG_EDGE_PAIR_MAP['capability:capability']).toContain(
      'capability_depends_on_capability',
    )
  })

  it('UPG_VALID_CHILDREN["capability"] permits capability (self-nesting)', () => {
    expect(UPG_VALID_CHILDREN['capability']).toContain('capability')
  })
})

describe('UPG-528 — capability → feature implementation', () => {
  it('capability_implemented_by_feature exists with the right shape', () => {
    const def = UPG_EDGE_CATALOG.capability_implemented_by_feature
    expect(def).toBeDefined()
    expect(def.source_type).toBe('capability')
    expect(def.target_type).toBe('feature')
    expect(def.classification).toBe('hierarchy')
    expect(def.forward_verb).toBe('implemented_by')
    expect(def.reverse_verb).toBe('implements')
  })

  it('resolveContainmentEdge("capability","feature") returns the canonical edge', () => {
    expect(resolveContainmentEdge('capability', 'feature')).toBe(
      'capability_implemented_by_feature',
    )
  })

  it('UPG_EDGE_PAIR_MAP indexes the capability → feature pair', () => {
    expect(UPG_EDGE_PAIR_MAP['capability:feature']).toContain(
      'capability_implemented_by_feature',
    )
  })

  it('UPG_VALID_CHILDREN["capability"] permits feature', () => {
    expect(UPG_VALID_CHILDREN['capability']).toContain('feature')
  })
})

describe('UPG-528 — competitor → capability cross-domain bridge', () => {
  it('competitor_offers_capability exists with the right shape', () => {
    const def = UPG_EDGE_CATALOG.competitor_offers_capability
    expect(def).toBeDefined()
    expect(def.source_type).toBe('competitor')
    expect(def.target_type).toBe('capability')
    expect(def.classification).toBe('cross-domain')
    expect(def.forward_verb).toBe('offers')
    expect(def.reverse_verb).toBe('offered_by')
  })

  it('UPG_EDGE_PAIR_MAP indexes the competitor → capability pair', () => {
    expect(UPG_EDGE_PAIR_MAP['competitor:capability']).toContain(
      'competitor_offers_capability',
    )
  })

  it('pickCanonicalEdge("competitor","capability") returns the new edge', () => {
    // No hierarchy edge for this pair — cross-domain is the only candidate.
    expect(pickCanonicalEdge('competitor', 'capability')).toBe(
      'competitor_offers_capability',
    )
  })

  it('resolveAllEdges("competitor","capability") includes the new edge', () => {
    expect(resolveAllEdges('competitor', 'capability')).toContain(
      'competitor_offers_capability',
    )
  })
})

describe('UPG-528 — capability gains Wardley axes', () => {
  it('CapabilityProperties accepts declared evolution_stage values', () => {
    const stages: Array<NonNullable<CapabilityProperties['evolution_stage']>> = [
      'genesis',
      'custom',
      'product',
      'commodity',
    ]
    for (const stage of stages) {
      const props: CapabilityProperties = { evolution_stage: stage }
      expect(props.evolution_stage).toBe(stage)
    }
  })

  it('CapabilityProperties accepts visibility as a number', () => {
    const props: CapabilityProperties = { visibility: 0.8 }
    expect(props.visibility).toBe(0.8)
  })

  it('UPG_PROPERTY_SCHEMA.capability declares evolution_stage with the right enum', () => {
    const schema = UPG_PROPERTY_SCHEMA.capability
    expect(schema.evolution_stage).toBeDefined()
    expect(schema.evolution_stage.type).toBe('string')
    expect(schema.evolution_stage.enum).toEqual([
      'genesis',
      'custom',
      'product',
      'commodity',
    ])
  })

  it('UPG_PROPERTY_SCHEMA.capability declares visibility as a number', () => {
    const schema = UPG_PROPERTY_SCHEMA.capability
    expect(schema.visibility).toBeDefined()
    expect(schema.visibility.type).toBe('number')
  })

  it('rejects an out-of-enum evolution_stage at the schema level', () => {
    const schema = UPG_PROPERTY_SCHEMA.capability
    expect(schema.evolution_stage.enum).not.toContain('utility')
    expect(schema.evolution_stage.enum).not.toContain('platform')
    expect(schema.evolution_stage.enum).not.toContain('legacy')
  })

  it('does not break the three legacy CapabilityProperties fields', () => {
    const schema = UPG_PROPERTY_SCHEMA.capability
    expect(schema.maturity_level).toBeDefined()
    expect(schema.target_maturity).toBeDefined()
    expect(schema.gap).toBeDefined()
  })
})

describe('UPG-528 — capability is no longer a structural near-terminal', () => {
  it('capability has at least three outgoing canonical edges', () => {
    const outgoing = Object.entries(UPG_EDGE_CATALOG)
      .filter(([, def]) => def.source_type === 'capability')
      .map(([key]) => key)
    expect(outgoing).toEqual(
      expect.arrayContaining([
        'capability_enables_value_stream',
        'capability_depends_on_capability',
        'capability_implemented_by_feature',
      ]),
    )
  })

  it('capability is a registered hierarchy parent', () => {
    expect(UPG_VALID_CHILDREN['capability']).toBeDefined()
    expect(UPG_VALID_CHILDREN['capability']).toEqual(
      expect.arrayContaining(['capability', 'feature']),
    )
  })
})
