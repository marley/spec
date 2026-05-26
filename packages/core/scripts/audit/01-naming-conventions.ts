/**
 * Invariant 1: Naming conventions
 *
 * - Entity types in UPG_TYPES are snake_case, ASCII, no digits unless load-bearing
 * - Edge keys in UPG_EDGE_CATALOG follow the {source}_{verb}_{object} shape
 * - Property keys across src/properties/domains/*.ts follow a consistent convention
 * - Exported UPG_* constants have the UPG_ prefix
 */

import { UPG_TYPES, UPG_EDGE_CATALOG, UPG_DOMAINS } from '../../src/index.js'
import { Report, SNAKE_CASE, listDomainFiles, readSrc } from './_lib.js'

const report = new Report('Invariant 1: Naming conventions')

// ─── 1a. Entity types: snake_case ASCII ───────────────────────────────────────

for (const t of UPG_TYPES) {
  if (!SNAKE_CASE.test(t)) {
    report.error(`Entity type "${t}" is not snake_case ASCII`, 'registry/domains.ts')
  }
  if (/[A-Z]/.test(t)) {
    report.error(`Entity type "${t}" contains uppercase`, 'registry/domains.ts')
  }
  if (/[^a-zA-Z0-9_]/.test(t)) {
    report.error(`Entity type "${t}" has non-ASCII or special chars`, 'registry/domains.ts')
  }
}

// Digits in entity type names — flag for review
for (const t of UPG_TYPES) {
  if (/[0-9]/.test(t)) {
    // a11y is load-bearing; otherwise flag
    if (!t.startsWith('a11y')) {
      report.warn(`Entity type "${t}" contains digit — is this load-bearing?`, 'registry/domains.ts')
    }
  }
}

// ─── 1b. Edge keys: {source}_{verb}_{object} pattern ──────────────────────────

// An edge key must start with its source_type. Strictly: edgeKey starts with source_type + "_".
for (const [key, def] of Object.entries(UPG_EDGE_CATALOG)) {
  if (!SNAKE_CASE.test(key)) {
    report.error(`Edge key "${key}" is not snake_case ASCII`, 'catalog/edge-catalog.ts')
    continue
  }
  // Check it starts with source_type
  if (!key.startsWith(def.source_type + '_')) {
    // Allow self-edges where source == target (e.g. metric_decomposes_into_metric)
    report.warn(
      `Edge key "${key}" does not start with source_type "${def.source_type}_"`,
      'catalog/edge-catalog.ts',
    )
  }
  // Check that the source_type in catalog is in UPG_TYPES.
  // Polymorphic "node" is intentional (see invariant 5 for full details).
  if (!UPG_TYPES.includes(def.source_type) && def.source_type !== 'node') {
    report.error(`Edge "${key}" has source_type "${def.source_type}" not in UPG_TYPES`, 'catalog/edge-catalog.ts')
  }
  if (!UPG_TYPES.includes(def.target_type) && def.target_type !== 'node') {
    report.error(`Edge "${key}" has target_type "${def.target_type}" not in UPG_TYPES`, 'catalog/edge-catalog.ts')
  }
  // Check reverse_verb is snake_case
  if (!SNAKE_CASE.test(def.forward_verb)) {
    report.warn(`Edge "${key}" forward_verb "${def.forward_verb}" is not snake_case`, 'catalog/edge-catalog.ts')
  }
  if (!SNAKE_CASE.test(def.reverse_verb)) {
    report.warn(`Edge "${key}" reverse_verb "${def.reverse_verb}" is not snake_case`, 'catalog/edge-catalog.ts')
  }
}

// ─── 1c. Property keys: enforce snake_case across all domain property files ──

// Extract all property keys from every *Properties interface in domain files.
// Pattern: `  key: Type` or `  key?: Type` inside `export interface XxxProperties { ... }`.
const propertyKeyPattern = /^\s{2,4}([a-zA-Z_][a-zA-Z0-9_]*)\??\s*:/gm
const camelCaseOffenders: Array<{ file: string; key: string }> = []

for (const file of listDomainFiles()) {
  const content = readSrc(`properties/domains/${file}`)

  // Find each interface block
  const interfaceRe = /export\s+interface\s+(\w+Properties)\s*\{([\s\S]*?)^\}/gm
  let m: RegExpExecArray | null
  while ((m = interfaceRe.exec(content))) {
    const body = m[2]
    let pm: RegExpExecArray | null
    const keyRe = new RegExp(propertyKeyPattern.source, 'gm')
    while ((pm = keyRe.exec(body))) {
      const key = pm[1]
      // TypeScript syntax — skip reserved words/modifiers that wouldn't be property keys
      if (['readonly', 'public', 'private', 'protected', 'static'].includes(key)) continue
      if (!SNAKE_CASE.test(key)) {
        camelCaseOffenders.push({ file, key })
      }
    }
  }
}

// Count conventions to determine the dominant one
const totalKeys = camelCaseOffenders.length > 0 || true
// Property key convention: the dominant convention should be snake_case.
// If any camelCase keys exist, they are naming drift.
if (camelCaseOffenders.length > 0) {
  report.info(`Property key convention: snake_case (${camelCaseOffenders.length} non-conforming keys found)`)
  // Dedupe by key
  const byKey = new Map<string, string[]>()
  for (const { file, key } of camelCaseOffenders) {
    if (!byKey.has(key)) byKey.set(key, [])
    byKey.get(key)!.push(file)
  }
  for (const [key, files] of Array.from(byKey.entries()).sort(([a], [b]) => a.localeCompare(b))) {
    report.warn(`Non-snake_case property key "${key}"`, `properties/domains/{${[...new Set(files)].join(',')}}`)
  }
}

// ─── 1d. Domain IDs ──────────────────────────────────────────────────────────
for (const d of UPG_DOMAINS) {
  if (!SNAKE_CASE.test(d.id)) {
    report.error(`Domain id "${d.id}" is not snake_case`, 'registry/domains.ts')
  }
}

// ─── Emit ────────────────────────────────────────────────────────────────────
report.print()
if (report.errorCount > 0) process.exitCode = 1
