/**
 * UPG slug generation + collision handling.
 *
 * `slug` is the human-readable handle used in inline `[[type:slug]]` chips
 * inside `.upg.md` documents (v0.2.2). Each node carries an
 * optional `slug` plus an `aliases[]` array of past slugs.
 *
 * Rules:
 * - Lowercase ASCII only; accents stripped via NFKD; emojis and non-ASCII
 *   word chars dropped.
 * - Whitespace + underscores collapse to single `-`.
 * - Punctuation removed; runs of `-` collapsed to one.
 * - Leading / trailing `-` trimmed.
 * - Empty result (e.g. emoji-only title) → fallback to `untitled`.
 * - Uniqueness is scoped `(product_id, type)`; resolveSlugCollision appends
 *   `-2`, `-3`, … against an existing-slug set.
 *
 * The set used for collision detection MUST include both current `slug`
 * values AND every `aliases[]` value within the same `(product_id, type)`,
 * so a renamed slug never collides with a still-resolvable alias.
 */

import type { UPGBaseNode } from '../shapes/base-node.js'

const FALLBACK = 'untitled'

/**
 * Generate a slug from a title. Pure function, no collision check.
 *
 * @example
 * generateSlug('Tree navigation outcome') // => 'tree-navigation-outcome'
 * generateSlug('Café résumé') // => 'cafe-resume'
 * generateSlug('  hello___world  ') // => 'hello-world'
 * generateSlug('🎉') // => 'untitled'
 */
export function generateSlug(title: string): string {
  if (!title) return FALLBACK
  const normalised = title
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '') // strip combining diacritics
    .toLowerCase()
    .replace(/[_\s]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
  return normalised || FALLBACK
}

/**
 * Resolve a base slug against an existing-slug set, appending `-2`, `-3`,
 * etc. as needed. Returns the original slug if it does not collide.
 *
 * The `existing` set MUST cover both current `slug` values and every
 * `aliases[]` value within the same `(product_id, type)`.
 *
 * @example
 * resolveSlugCollision('foo', new Set()) // => 'foo'
 * resolveSlugCollision('foo', new Set(['foo'])) // => 'foo-2'
 * resolveSlugCollision('foo', new Set(['foo', 'foo-2'])) // => 'foo-3'
 */
export function resolveSlugCollision(base: string, existing: ReadonlySet<string>): string {
  if (!existing.has(base)) return base
  let n = 2
  while (existing.has(`${base}-${n}`)) n++
  return `${base}-${n}`
}

/**
 * Build the existing-slug set for a `(type)` cohort within a single product.
 * Pass the nodes of one product; the helper picks the ones with the given
 * type and accumulates their `slug` and `aliases` values.
 */
export function collectSlugsForType(
  nodes: readonly Pick<UPGBaseNode, 'type' | 'slug' | 'aliases'>[],
  type: string,
): Set<string> {
  const out = new Set<string>()
  for (const n of nodes) {
    if (n.type !== type) continue
    if (n.slug) out.add(n.slug)
    if (n.aliases) for (const a of n.aliases) out.add(a)
  }
  return out
}

/**
 * Backfill `slug` on a node if it's missing. Mutates and returns the node.
 * Pass the existing-slug set for the node's type so collisions resolve.
 *
 * Idempotent: if `node.slug` is already set, returns the node unchanged
 * and does not touch `existing`.
 */
export function backfillSlug<T extends Pick<UPGBaseNode, 'title' | 'type' | 'slug' | 'aliases'>>(
  node: T,
  existing: Set<string>,
): T {
  if (node.slug) return node
  const base = generateSlug(node.title)
  const resolved = resolveSlugCollision(base, existing)
  node.slug = resolved
  existing.add(resolved)
  return node
}

/**
 * Rotate a slug rename: push the old slug into `aliases[]` (deduped) and
 * set the new slug. No-op if `next` equals the current slug.
 */
export function rotateSlug<T extends Pick<UPGBaseNode, 'slug' | 'aliases'>>(
  node: T,
  next: string,
): T {
  const current = node.slug
  if (current === next) return node
  if (current) {
    const aliases = node.aliases ?? []
    if (!aliases.includes(current)) aliases.push(current)
    node.aliases = aliases
  }
  node.slug = next
  return node
}
