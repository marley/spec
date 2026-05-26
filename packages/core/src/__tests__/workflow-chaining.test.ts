/**
 * Playbook Chaining Tests (— was workflow-chaining.test.ts).
 *
 * Locks the invariant: when a step declares `next_sequence_on_gap`, the
 * referenced playbook (or future technique) must exist in the canonical
 * registry. Catches drift when a chain target is renamed or deleted.
 *
 * The field `next_workflow_on_gap` was renamed to `next_sequence_on_gap`
 * to drop "workflow" from the public surface entirely.
 *
 * Run: npx vitest run src/__tests__/workflow-chaining.test.ts
 */

import { describe, it, expect } from 'vitest'

import {
 UPG_PLAYBOOKS,
 getPlaybookById,
} from '../playbooks/index.js'

describe('Playbook chaining (next_sequence_on_gap)', () => {
 it('every chain target resolves to a canonical playbook', () => {
 for (const p of UPG_PLAYBOOKS) {
 for (const step of p.creation_sequence) {
 const target = (step as { next_sequence_on_gap?: string }).next_sequence_on_gap
 if (!target) continue
 expect(
 getPlaybookById(target),
 `Playbook "${p.id}" step ${step.order} chains to "${target}" which is missing from the registry`,
 ).toBeDefined()
 }
 }
 })

 it('no playbook chains to itself (cycle guard)', () => {
 for (const p of UPG_PLAYBOOKS) {
 for (const step of p.creation_sequence) {
 const target = (step as { next_sequence_on_gap?: string }).next_sequence_on_gap
 if (!target) continue
 expect(
 target,
 `Playbook "${p.id}" chains to itself — cycle forbidden`,
 ).not.toBe(p.id)
 }
 }
 })

 it.each([
 ['playbook:strategy-outcomes', 'playbook:discovery-validation-hypothesis-cycle'],
 ['playbook:business-model-bmc', 'playbook:business-pricing'],
 ['playbook:experience-content', 'playbook:business-growth-funnel'],
 ['playbook:product-feedback-synthesis', 'playbook:discovery-validation-hypothesis-cycle'],
 ['playbook:experience-design-system', 'playbook:experience-ux-domain-only'],
 ['playbook:business-marketing', 'playbook:experience-content'],
 ])('%s chains to %s', (sourceId, expectedTarget) => {
 const p = getPlaybookById(sourceId)
 expect(p, `playbook "${sourceId}" not found`).toBeDefined()
 const chained = p!.creation_sequence.find(
 (s) => (s as { next_sequence_on_gap?: string }).next_sequence_on_gap,
 )
 expect((chained as { next_sequence_on_gap?: string }).next_sequence_on_gap).toBe(expectedTarget)
 })
})
