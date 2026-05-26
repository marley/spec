#!/usr/bin/env npx tsx
/**
 * Convert JSON-style syntax to TypeScript syntax
 *
 * Converts all 35 framework definition files from:
 *   "key": "value"  →  key: 'value'
 *   "key": 123      →  key: 123
 *   "key": true     →  key: true
 *
 * Also converts string values in arrays: ["a", "b"] → ['a', 'b']
 *
 * Run:  npx tsx packages/upg-spec/scripts/convert-json-to-ts-syntax.ts
 */

import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const DEFS_DIR = join(import.meta.dirname, '../src/display/frameworks/definitions')

const files = readdirSync(DEFS_DIR)
  .filter((f) => f.endsWith('.ts') && f !== 'index.ts')
  .sort()

let totalFiles = 0
let totalChanges = 0

for (const file of files) {
  const filePath = join(DEFS_DIR, file)
  const original = readFileSync(filePath, 'utf-8')
  let content = original

  // 1. Convert double-quoted keys to unquoted keys
  //    Match: "keyName": (where keyName is a valid JS identifier)
  //    Replace with: keyName:
  content = content.replace(/^(\s*)"([a-zA-Z_$][a-zA-Z0-9_$]*)"\s*:/gm, '$1$2:')

  // 2. Convert double-quoted string values to single-quoted
  //    This needs to handle:
  //    - key: "value"        → key: 'value'
  //    - "value" in arrays   → 'value'
  //    But NOT touch:
  //    - strings containing single quotes (apostrophes)
  //    - import statements
  //    - comments
  //    - the export const line
  //
  //    Strategy: Replace remaining "..." with '...' but escape internal single quotes

  // Process line by line to skip imports, comments, and the export line
  const lines = content.split('\n')
  const converted = lines.map((line) => {
    // Skip import lines, comments, and export const
    if (line.trimStart().startsWith('import ')) return line
    if (line.trimStart().startsWith('export const')) return line
    if (line.trimStart().startsWith('//')) return line
    if (line.trimStart().startsWith('/*')) return line
    if (line.trimStart().startsWith('*')) return line

    // Replace double-quoted strings with single-quoted
    // Match: "..." where the content doesn't span multiple lines
    return line.replace(/"([^"\\]*(?:\\.[^"\\]*)*)"/g, (_match, inner: string) => {
      // If the inner string contains a single quote, escape it
      const escaped = inner.replace(/'/g, "\\'")
      return `'${escaped}'`
    })
  })

  content = converted.join('\n')

  if (content !== original) {
    writeFileSync(filePath, content)
    totalFiles++
    // Count approximate changes
    const changeCount = original.split('"').length - content.split('"').length
    totalChanges += Math.floor(changeCount / 2)
    console.log(`  ✓ ${file} — converted`)
  } else {
    console.log(`  · ${file} — no changes needed`)
  }
}

console.log()
console.log(`Done: ${totalFiles} files converted, ~${totalChanges} quote pairs replaced`)
