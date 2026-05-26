#!/usr/bin/env npx tsx
/**
 * Align data.entity_types with slot entityTypeIds.
 *
 * For each framework: collect all entityTypeIds from slots, check which
 * are missing from data.entity_types, and add them with role: 'item'.
 * Also removes data.entity_types entries that no slot references.
 *
 * Run:  npx tsx packages/upg-spec/scripts/align-data-entity-types.ts
 */

import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const DEFS_DIR = join(import.meta.dirname, '../src/display/frameworks/definitions')

const files = readdirSync(DEFS_DIR)
  .filter((f) => f.endsWith('.ts') && f !== 'index.ts')
  .sort()

let totalAdded = 0
let totalRemoved = 0
let filesChanged = 0

for (const file of files) {
  const filePath = join(DEFS_DIR, file)
  let content = readFileSync(filePath, 'utf-8')
  const original = content

  // Find each framework's slots and data.entity_types blocks
  // Strategy: for each framework, extract slot entityTypeIds and data.entity_types,
  // then rewrite the entity_types array to include all slot types.

  // Match framework blocks by finding id: 'xxx' then processing slots and data
  const fwPattern = /id: '([^']+)'/g
  let match: RegExpExecArray | null

  // Collect all framework positions
  const frameworks: { id: string; start: number }[] = []
  while ((match = fwPattern.exec(content)) !== null) {
    frameworks.push({ id: match[1], start: match.index })
  }

  for (let i = 0; i < frameworks.length; i++) {
    const fw = frameworks[i]
    const fwStart = fw.start
    const fwEnd = i + 1 < frameworks.length ? frameworks[i + 1].start : content.length

    const fwBlock = content.substring(fwStart, fwEnd)

    // Extract slot entityTypeIds
    const slotTypePattern = /slots:\s*\[[\s\S]*?\]/
    const slotsMatch = fwBlock.match(slotTypePattern)
    if (!slotsMatch) continue

    const slotEntityTypes: string[] = []
    const slotTypeIdPattern = /entityTypeId: '([^']+)'/g
    let stMatch: RegExpExecArray | null
    while ((stMatch = slotTypeIdPattern.exec(slotsMatch[0])) !== null) {
      if (!slotEntityTypes.includes(stMatch[1])) {
        slotEntityTypes.push(stMatch[1])
      }
    }

    if (slotEntityTypes.length === 0) continue

    // Extract current data.entity_types
    const dataPattern = /entity_types:\s*\[([\s\S]*?)\]/
    // Find entity_types that comes AFTER slots in this framework block
    const dataSection = fwBlock.match(/data:\s*\{[\s\S]*?entity_types:\s*\[([\s\S]*?)\]/)
    if (!dataSection) continue

    const currentTypes: { type: string; role: string }[] = []
    const typeEntryPattern = /type: '([^']+)'[\s\S]*?role: '([^']+)'/g
    let teMatch: RegExpExecArray | null
    while ((teMatch = typeEntryPattern.exec(dataSection[1])) !== null) {
      currentTypes.push({ type: teMatch[1], role: teMatch[2] })
    }

    const currentTypeNames = currentTypes.map((t) => t.type)

    // Find types to add (in slots but not in data.entity_types)
    const toAdd = slotEntityTypes.filter((t) => !currentTypeNames.includes(t))

    // Find types to remove (in data.entity_types but not in any slot)
    // Be conservative — only remove if the type has role 'item' (don't remove root/scored_item/bucket)
    const toRemove = currentTypes.filter(
      (t) => !slotEntityTypes.includes(t.type) && t.role === 'item',
    )

    if (toAdd.length === 0 && toRemove.length === 0) continue

    // Build new entity_types array
    const keepTypes = currentTypes.filter((t) => !toRemove.some((r) => r.type === t.type))
    const newTypes = [
      ...keepTypes,
      ...toAdd.map((t) => ({ type: t, role: 'item' })),
    ]

    // Build the replacement string
    const newEntityTypesStr = newTypes
      .map((t) => `\n          {\n            type: '${t.type}',\n            role: '${t.role}'\n          }`)
      .join(',')

    // Replace the entity_types array in the framework block
    const oldEntityTypesBlock = dataSection[0]
    const newEntityTypesBlock = oldEntityTypesBlock.replace(
      /entity_types:\s*\[[\s\S]*?\]/,
      `entity_types: [${newEntityTypesStr}\n        ]`,
    )

    content = content.replace(oldEntityTypesBlock, newEntityTypesBlock)

    if (toAdd.length > 0) {
      totalAdded += toAdd.length
    }
    if (toRemove.length > 0) {
      totalRemoved += toRemove.length
    }
  }

  if (content !== original) {
    writeFileSync(filePath, content)
    filesChanged++
    console.log(`  ✓ ${file}`)
  }
}

console.log()
console.log(`Done: ${filesChanged} files changed, ${totalAdded} types added, ${totalRemoved} orphan types removed`)
