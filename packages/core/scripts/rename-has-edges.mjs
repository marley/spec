#!/usr/bin/env node
/**
 * Rename _has_ edge keys to match their forward_verb.
 *
 * Convention: key = {source_type}_{forward_verb}_{target_type}
 *
 * This script:
 * 1. Reads edge-registry.ts
 * 2. For each edge where the key doesn't match the convention, renames it
 * 3. Generates migration entries for all renames
 * 4. Also fixes stale key names (finding_*, learning_validates_pain_point, etc.)
 */

import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REGISTRY_PATH = join(__dirname, '../src/vocabulary/edge-registry.ts')
const MIGRATIONS_PATH = join(__dirname, '../src/grammar/migrations.ts')

// ── Step 1: Parse the registry ──────────────────────────────────────────────

const registrySource = readFileSync(REGISTRY_PATH, 'utf-8')

// Match lines like:   key_name: { forward_verb: 'verb', reverse_verb: 'rev', classification: 'cls', source_type: 'src', target_type: 'tgt' },
const EDGE_RE = /^  (\w+): \{ forward_verb: '([^']+)', reverse_verb: '([^']+)', classification: '([^']+)', source_type: '([^']+)', target_type: '([^']+)' \},?$/gm

const edges = []
let match
while ((match = EDGE_RE.exec(registrySource)) !== null) {
  edges.push({
    key: match[1],
    forward_verb: match[2],
    reverse_verb: match[3],
    classification: match[4],
    source_type: match[5],
    target_type: match[6],
    line: match[0],
  })
}

console.log(`Found ${edges.length} edge definitions`)

// ── Step 2: Compute new keys ────────────────────────────────────────────────

const renames = []
const newKeys = new Set()

for (const edge of edges) {
  const canonical = `${edge.source_type}_${edge.forward_verb}_${edge.target_type}`

  if (edge.key === canonical) {
    newKeys.add(edge.key)
    continue // Already correct
  }

  // Check for collision
  let finalKey = canonical
  if (newKeys.has(canonical)) {
    // Collision — append classification suffix
    finalKey = `${canonical}_${edge.classification.replace('-', '_')}`
    console.warn(`  Collision: ${edge.key} → ${canonical} (already exists), using ${finalKey}`)
  }

  newKeys.add(finalKey)
  renames.push({
    from: edge.key,
    to: finalKey,
    edge,
  })
}

console.log(`\nRenames needed: ${renames.length}`)
console.log(`Already correct: ${edges.length - renames.length}`)

// ── Step 3: Apply renames to registry file ──────────────────────────────────

let newRegistrySource = registrySource

for (const rename of renames) {
  const oldPattern = `  ${rename.from}: {`
  const newPattern = `  ${rename.to}: {`

  if (!newRegistrySource.includes(oldPattern)) {
    console.error(`ERROR: Could not find key "${rename.from}" in registry`)
    continue
  }

  newRegistrySource = newRegistrySource.replace(oldPattern, newPattern)
}

writeFileSync(REGISTRY_PATH, newRegistrySource, 'utf-8')
console.log(`\nWrote updated registry to ${REGISTRY_PATH}`)

// ── Step 4: Generate migration entries ──────────────────────────────────────

const migrationEntries = renames.map(r =>
  `    {\n      from: '${r.from}',\n      to: '${r.to}',\n      reason: 'Key renamed to match forward_verb convention: {source}_{verb}_{target}.',\n    },`
).join('\n')

// Write migrations to a temp file for manual insertion
const MIGRATIONS_OUTPUT = join(__dirname, '../scripts/has-edge-migrations.txt')
writeFileSync(MIGRATIONS_OUTPUT, `// ── _has_ verb key renames ────────────────────────────────────────\n${migrationEntries}\n`, 'utf-8')
console.log(`\nWrote ${renames.length} migration entries to ${MIGRATIONS_OUTPUT}`)

// ── Step 5: Report collisions and special cases ─────────────────────────────

// Check for the specific stale names
const staleNames = [
  'finding_inspires_concept',
  'learning_validates_pain_point',
  'learning_validates_jtbd',
]

for (const name of staleNames) {
  const found = renames.find(r => r.from === name)
  if (found) {
    console.log(`\nStale name fixed: ${name} → ${found.to}`)
  } else if (edges.find(e => e.key === name)) {
    console.log(`\nWARNING: ${name} exists but was not renamed (key already matches convention?)`)
  } else {
    console.log(`\nINFO: ${name} not found in registry (may have been renamed in prior cleanup)`)
  }
}

console.log('\nDone. Next steps:')
console.log('1. Insert migration entries from has-edge-migrations.txt into migrations.ts')
console.log('2. Run: npx tsc --noEmit -p packages/upg-spec/tsconfig.json')
console.log('3. Run: npm run build && npx vitest run')
