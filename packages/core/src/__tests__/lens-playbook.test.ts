/**
 * Lens → Playbook tests.
 *
 * Replaces `lens-workflow-migration.test.ts`. Locks the v0.3.0 invariant
 * that lens.playbook_id (when set) resolves in the canonical playbook
 * registry, and that the cross-region lenses (`product`, `full`) leave
 * the field unset per Q.A of the decision doc.
 */

import { describe, it, expect } from 'vitest'

import { UPG_LENSES, getLensPlaybook } from '../presentation/lenses.js'
import { getPlaybookById } from '../playbooks/index.js'

describe('Lens → playbook (rename)', () => {
 it('every lens with a playbook_id resolves in the playbook registry', () => {
 for (const lens of UPG_LENSES) {
 if (!lens.playbook_id) continue
 const p = getPlaybookById(lens.playbook_id)
 expect(
 p,
 `Lens "${lens.id}" points at missing playbook "${lens.playbook_id}"`,
 ).toBeDefined()
 }
 })

 it('getLensPlaybook returns the resolved playbook (or undefined)', () => {
 for (const lens of UPG_LENSES) {
 const p = getLensPlaybook(lens)
 if (lens.playbook_id) {
 expect(p?.id).toBe(lens.playbook_id)
 } else {
 expect(p).toBeUndefined()
 }
 }
 })

 it('cross-region lenses (product, full) leave playbook_id unset', () => {
 const byId = new Map(UPG_LENSES.map((l) => [l.id, l]))
 expect(byId.get('product')?.playbook_id).toBeUndefined()
 expect(byId.get('full')?.playbook_id).toBeUndefined()
 })

 it('region-anchored lenses set playbook_id to a canonical or specialised playbook id', () => {
 const expected: Record<string, string> = {
 ux_design: 'playbook:experience-design-brand',
 engineering: 'playbook:engineering-platform',
 growth: 'playbook:business-growth-metric-driven',
 business: 'playbook:business-gtm-growth',
 research: 'playbook:discovery-research-validation',
 marketing: 'playbook:business-marketing-audience-first',
 }
 const byId = new Map(UPG_LENSES.map((l) => [l.id, l]))
 for (const [lensId, playbookId] of Object.entries(expected)) {
 expect(byId.get(lensId)?.playbook_id).toBe(playbookId)
 }
 })
})
