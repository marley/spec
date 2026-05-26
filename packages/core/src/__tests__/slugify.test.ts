import { describe, it, expect } from 'vitest'
import {
  generateSlug,
  resolveSlugCollision,
  collectSlugsForType,
  backfillSlug,
  rotateSlug,
} from '../grammar/slugify.js'

describe('generateSlug', () => {
  it('lowercases and hyphenates ordinary titles', () => {
    expect(generateSlug('Tree navigation outcome')).toBe('tree-navigation-outcome')
  })

  it('strips accents via NFKD normalisation', () => {
    expect(generateSlug('Café résumé')).toBe('cafe-resume')
  })

  it('collapses runs of whitespace and underscores', () => {
    expect(generateSlug('  hello___world  ')).toBe('hello-world')
  })

  it('removes punctuation and emoji', () => {
    expect(generateSlug("Alice's Adventures!")).toBe('alices-adventures')
    expect(generateSlug('Launch 🚀 day')).toBe('launch-day')
  })

  it('collapses repeated dashes', () => {
    expect(generateSlug('foo -- bar')).toBe('foo-bar')
  })

  it('falls back to "untitled" for empty / unsluggable input', () => {
    expect(generateSlug('')).toBe('untitled')
    expect(generateSlug('🎉🎉')).toBe('untitled')
    expect(generateSlug('   ')).toBe('untitled')
  })
})

describe('resolveSlugCollision', () => {
  it('returns the base slug when no collision', () => {
    expect(resolveSlugCollision('foo', new Set())).toBe('foo')
  })

  it('appends -2 on first collision', () => {
    expect(resolveSlugCollision('foo', new Set(['foo']))).toBe('foo-2')
  })

  it('walks past taken numeric suffixes', () => {
    expect(resolveSlugCollision('foo', new Set(['foo', 'foo-2', 'foo-3']))).toBe('foo-4')
  })
})

describe('collectSlugsForType', () => {
  it('includes both slugs and aliases for the matching type', () => {
    const nodes: Array<{ type: 'persona' | 'outcome'; slug?: string; aliases?: string[] }> = [
      { type: 'persona', slug: 'alex', aliases: ['old-alex'] },
      { type: 'persona', slug: 'jamie' },
      { type: 'outcome', slug: 'should-not-appear' },
    ]
    const set = collectSlugsForType(nodes, 'persona')
    expect(set).toEqual(new Set(['alex', 'old-alex', 'jamie']))
  })

  it('returns empty set when no matching nodes', () => {
    expect(collectSlugsForType([], 'persona')).toEqual(new Set())
  })
})

describe('backfillSlug', () => {
  it('assigns a generated slug when missing and updates the existing set', () => {
    const node: { title: string; type: 'outcome'; slug?: string; aliases?: string[] } = {
      title: 'Tree navigation',
      type: 'outcome',
    }
    const existing = new Set<string>()
    const out = backfillSlug(node, existing)
    expect(out.slug).toBe('tree-navigation')
    expect(existing.has('tree-navigation')).toBe(true)
  })

  it('resolves collisions against the existing set', () => {
    const node: { title: string; type: 'outcome'; slug?: string; aliases?: string[] } = {
      title: 'Tree navigation',
      type: 'outcome',
    }
    const existing = new Set(['tree-navigation'])
    backfillSlug(node, existing)
    expect(node.slug).toBe('tree-navigation-2')
  })

  it('is idempotent when slug already set', () => {
    const node: { title: string; type: 'outcome'; slug?: string; aliases?: string[] } = {
      title: 'X',
      type: 'outcome',
      slug: 'custom-slug',
    }
    const existing = new Set<string>()
    backfillSlug(node, existing)
    expect(node.slug).toBe('custom-slug')
    expect(existing.size).toBe(0) // not touched
  })
})

describe('rotateSlug', () => {
  it('moves old slug into aliases[] and sets new', () => {
    const node: { slug?: string; aliases?: string[] } = { slug: 'old-name' }
    rotateSlug(node, 'new-name')
    expect(node.slug).toBe('new-name')
    expect(node.aliases).toEqual(['old-name'])
  })

  it('preserves prior aliases', () => {
    const node: { slug?: string; aliases?: string[] } = {
      slug: 'middle-name',
      aliases: ['original-name'],
    }
    rotateSlug(node, 'final-name')
    expect(node.slug).toBe('final-name')
    expect(node.aliases).toEqual(['original-name', 'middle-name'])
  })

  it('does not duplicate alias entries on repeated rotation', () => {
    const node: { slug?: string; aliases?: string[] } = { slug: 'a', aliases: ['a'] }
    rotateSlug(node, 'b')
    expect(node.aliases).toEqual(['a'])
  })

  it('no-ops when next equals current', () => {
    const node = { slug: 'same', aliases: ['old'] }
    rotateSlug(node, 'same')
    expect(node.slug).toBe('same')
    expect(node.aliases).toEqual(['old'])
  })
})
