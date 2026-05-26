/**
 * Methodology Removal Tests (ticket #6, updated).
 *
 * Locks the invariant that UPGMethodology and MethodologyStep are gone
 * from the public API. The replacement primitive at v0.3.0 is `UPGPlaybook`
 * (renamed from `UPGWorkflow`) with all `kind: 'framework'` steps for
 * methodology-of-frameworks use cases.
 */

import { describe, it, expect } from 'vitest'

import * as core from '../index.js'

describe('UPGMethodology removal — replacement primitive at v0.3.0', () => {
 it('UPGMethodology is no longer exported from @unified-product-graph/core', () => {
 expect('UPGMethodology' in core).toBe(false)
 })

 it('MethodologyStep is no longer exported from @unified-product-graph/core', () => {
 expect('MethodologyStep' in core).toBe(false)
 })

 it('UPGWorkflow is gone from the public API', () => {
 expect('UPGWorkflow' in core).toBe(false)
 expect('UPG_WORKFLOWS' in core).toBe(false)
 expect('UPG_DOMAIN_WORKFLOWS' in core).toBe(false)
 expect('UPG_LENS_WORKFLOWS' in core).toBe(false)
 })

 it('UPGPlaybook is the v0.3.0 replacement primitive', () => {
 // Type-only check: UPGPlaybook exists and has a `creation_sequence` field.
 const p: core.UPGPlaybook = {
 id: 'playbook:lean-product-discovery',
 name: 'Lean Product Discovery',
 version: '0.1.0',
 description: 'OST → RICE → Lean Canvas — a framework-driven discovery sequence.',
 region: 'discovery_research_validation',
 creation_sequence: [
 { kind: 'framework', order: 1, phase: 'Discover', framework_id: 'opportunity-solution-tree' },
 { kind: 'framework', order: 2, phase: 'Prioritise', framework_id: 'rice' },
 { kind: 'framework', order: 3, phase: 'Model', framework_id: 'lean-canvas' },
 ],
 }
 expect(p.creation_sequence.every((s) => s.kind === 'framework')).toBe(true)
 })
})
