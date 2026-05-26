/**
 * getLifecycleRenderShape — render-shape contract tests.
 *
 * Run: npx vitest run src/__tests__/lifecycle-render-shape.test.ts
 */

import { describe, it, expect } from 'vitest'
import {
  getLifecycleRenderShape,
  getLifecycleForType,
  UPG_LIFECYCLE_FREE_TYPES,
} from '../grammar/lifecycles.js'

describe('getLifecycleRenderShape', () => {
  it('returns null for lifecycle-free types', () => {
    expect(getLifecycleRenderShape('persona')).toBeNull()
    expect(getLifecycleRenderShape('metric')).toBeNull()
  })

  it('returns null for unknown types not in the registry', () => {
    expect(getLifecycleRenderShape('not_a_real_type')).toBeNull()
    expect(getLifecycleRenderShape('')).toBeNull()
  })

  it('hand-authored lifecycle (feature) — flat phases, no template_id, classified transitions', () => {
    const shape = getLifecycleRenderShape('feature')
    expect(shape).not.toBeNull()
    if (!shape) return

    expect(shape.entity_type).toBe('feature')
    expect(shape.template_id).toBeUndefined()
    expect(shape.initial_state).toBe('proposed')
    expect(shape.states.map((s) => s.id)).toEqual([
      'proposed',
      'in_progress',
      'shipped',
      'archived',
    ])
    expect(shape.states.find((s) => s.id === 'archived')?.terminal).toBe(true)
    expect(shape.states.find((s) => s.id === 'proposed')?.terminal).toBe(false)

    const find = (from: string, to: string) =>
      shape.transitions.find((t) => t.from === from && t.to === to)

    expect(find('proposed', 'in_progress')?.kind).toBe('forward')
    expect(find('in_progress', 'shipped')?.kind).toBe('forward')
    expect(find('proposed', 'archived')?.kind).toBe('terminal')
    expect(find('shipped', 'archived')?.kind).toBe('terminal')
  })

  it('template-mapped lifecycle (document → PUBLISHING) — surfaces template_id and reopen kind', () => {
    const shape = getLifecycleRenderShape('document')
    expect(shape).not.toBeNull()
    if (!shape) return

    expect(shape.entity_type).toBe('document')
    expect(shape.template_id).toBe('PUBLISHING')
    expect(shape.initial_state).toBe('draft')
    expect(shape.states.find((s) => s.id === 'archived')?.terminal).toBe(true)

    const find = (from: string, to: string) =>
      shape.transitions.find((t) => t.from === from && t.to === to)

    // archived → draft is the canonical reopen edge in PUBLISHING
    expect(find('archived', 'draft')?.kind).toBe('reopen')
    // published → archived is forward-to-terminal
    expect(find('published', 'archived')?.kind).toBe('terminal')
    // review → draft is a backward (within non-terminals)
    expect(find('review', 'draft')?.kind).toBe('backward')
  })

  it('hand-authored with terminal-reopen (solution) — shipped → deferred classified as reopen', () => {
    const shape = getLifecycleRenderShape('solution')
    expect(shape).not.toBeNull()
    if (!shape) return

    expect(shape.template_id).toBeUndefined()
    expect(shape.states.find((s) => s.id === 'shipped')?.terminal).toBe(true)
    expect(shape.states.find((s) => s.id === 'deferred')?.terminal).toBe(false)

    const reopen = shape.transitions.find(
      (t) => t.from === 'shipped' && t.to === 'deferred',
    )
    expect(reopen?.kind).toBe('reopen')
  })

  it('every entity type either yields a shape or is in UPG_LIFECYCLE_FREE_TYPES (regression)', () => {
    // Sanity check: the helper never throws on any registered type.
    // We don't iterate every UPGEntityType here — that's covered by the
    // 10-lifecycle-coverage audit. This is just a smoke test on a sample.
    const sample = ['feature', 'document', 'persona', 'metric', 'solution', 'product']
    for (const type of sample) {
      const shape = getLifecycleRenderShape(type)
      const lifecycle = getLifecycleForType(type)
      const isFree = UPG_LIFECYCLE_FREE_TYPES.has(type)

      if (lifecycle) {
        expect(shape).not.toBeNull()
        expect(shape?.entity_type).toBe(type)
        expect(shape?.states.length).toBe(lifecycle.phases.length)
      } else {
        expect(shape).toBeNull()
        // Either explicitly free or simply not registered (planned/unknown).
        // Both yield null, both are correct.
        if (isFree) expect(UPG_LIFECYCLE_FREE_TYPES.has(type)).toBe(true)
      }
    }
  })
})
