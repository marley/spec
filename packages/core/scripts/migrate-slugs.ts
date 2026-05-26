#!/usr/bin/env tsx
/**
 * Backfill `slug` on every node in one or more `.upg` files.
 *
 *   npx tsx packages/upg-spec/scripts/migrate-slugs.ts <file-or-glob>...
 *   # or, pass `--dry-run` to print what would change without writing.
 *
 * Idempotent — nodes that already have a `slug` are left alone.
 *
 * Collision scope is `(product_id, type)` per file. Each `.upg` file is
 * one product, so the script walks each file independently. Scopes per
 * type so cross-type slug collisions are allowed (a `feature` and an
 * `outcome` may share the slug `tree-navigation`).
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { backfillSlug, collectSlugsForType, generateSlug } from '../src/grammar/slugify.js'

interface UPGFileShape {
  nodes?: Array<{
    id: string
    type: string
    title?: string
    slug?: string
    aliases?: string[]
    [k: string]: unknown
  }>
  [k: string]: unknown
}

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const files = args.filter((a) => a !== '--dry-run')

if (files.length === 0) {
  console.error('usage: migrate-slugs.ts [--dry-run] <file.upg>...')
  process.exit(2)
}

let totalAdded = 0
let totalNodes = 0
let totalFiles = 0

for (const fileArg of files) {
  const path = resolve(fileArg)
  let raw: string
  try {
    raw = readFileSync(path, 'utf-8')
  } catch (e) {
    console.error(`× ${fileArg}: cannot read (${(e as Error).message})`)
    continue
  }

  let doc: UPGFileShape
  try {
    doc = JSON.parse(raw)
  } catch (e) {
    console.error(`× ${fileArg}: invalid JSON (${(e as Error).message})`)
    continue
  }

  const nodes = doc.nodes ?? []
  if (nodes.length === 0) {
    console.log(`· ${fileArg}: no nodes`)
    continue
  }

  // Per-type slug sets, prepopulated with whatever's already present.
  const byType = new Map<string, Set<string>>()
  for (const n of nodes) {
    if (!byType.has(n.type)) byType.set(n.type, new Set())
    const set = byType.get(n.type)!
    if (n.slug) set.add(n.slug)
    if (n.aliases) for (const a of n.aliases) set.add(a)
  }

  let added = 0
  for (const n of nodes) {
    if (n.slug) continue
    if (!n.title) {
      console.warn(`  ! ${fileArg} :: ${n.type}:${n.id} has no title — skipping`)
      continue
    }
    const set = byType.get(n.type)!
    backfillSlug(n as Parameters<typeof backfillSlug>[0], set)
    added++
  }

  totalNodes += nodes.length
  totalAdded += added
  totalFiles++

  if (added === 0) {
    console.log(`✓ ${fileArg}: nothing to do (${nodes.length} nodes already slugged)`)
    continue
  }

  if (dryRun) {
    console.log(`◌ ${fileArg}: would add ${added} slug(s) to ${nodes.length} nodes (dry-run)`)
  } else {
    // Preserve trailing newline if present in source.
    const trailing = raw.endsWith('\n') ? '\n' : ''
    writeFileSync(path, JSON.stringify(doc, null, 2) + trailing)
    console.log(`✓ ${fileArg}: added ${added} slug(s) to ${nodes.length} nodes`)
  }
}

console.log(
  `\n${dryRun ? 'DRY-RUN ' : ''}done: ${totalFiles} file(s), ${totalAdded} slug(s) added, ${totalNodes} node(s) total`,
)

// Also export pieces so the script can be imported as a library if needed.
export { generateSlug, backfillSlug, collectSlugsForType }
