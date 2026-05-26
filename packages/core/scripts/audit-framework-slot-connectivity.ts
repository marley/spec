/**
 * Framework Slot-Connectivity Audit — UPG-528 Part 1.
 *
 * For every framework in `UPG_FRAMEWORKS`, examine the set of unique entity
 * types referenced by its `slots[*]`. Then, for every ordered pair (A, B) of
 * slot entity types (A ≠ B), ask the canonical edge resolver whether at least
 * one edge exists in the catalog between A and B in that direction.
 *
 * Output:
 *   - Human-readable markdown report at:
 *     TPC-context/upg/02-spec/analysis/2026-05-21-framework-slot-connectivity-audit.md
 *   - Structured JSON report at:
 *     packages/upg-spec/scripts/output/framework-slot-connectivity.json
 *
 * Categories per framework:
 *   - CLEAN        — every ordered slot pair resolves to a canonical edge
 *   - PARTIAL      — some pairs resolve, others don't
 *   - DISCONNECTED — zero pairs resolve (Wardley pre-UPG-528 case)
 *
 * This is a reporting tool. Exit code is always 0. No catalog or framework
 * definitions are mutated.
 *
 * Usage:
 *   npx tsx packages/upg-spec/scripts/audit-framework-slot-connectivity.ts
 */

import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { UPG_FRAMEWORKS } from '../src/frameworks/definitions/index.js'
import {
  resolveContainmentEdge,
  resolveAllEdges,
} from '../src/index.js'

// ── Types ─────────────────────────────────────────────────────────────────

type ConnectivityStatus = 'CLEAN' | 'PARTIAL' | 'DISCONNECTED'

interface PairResult {
  source: string
  target: string
  canonical_edge: string | null
  any_edge_exists: boolean
  all_edges: string[]
}

interface FrameworkAudit {
  framework_id: string
  framework_name: string
  category: string
  slot_count: number
  unique_entity_type_count: number
  unique_entity_types: string[]
  total_slot_pairs: number
  connected_pairs: number
  null_pairs_count: number
  connectivity_ratio: number
  status: ConnectivityStatus
  null_pairs: Array<{ source: string; target: string }>
  pair_results: PairResult[]
}

interface AuditReport {
  generated_at: string
  total_frameworks: number
  audited_frameworks: number
  skipped_single_slot: number
  status_counts: Record<ConnectivityStatus, number>
  mean_connectivity_ratio: number
  frameworks: FrameworkAudit[]
}

// ── Famous frameworks for Tier-1 flagging ─────────────────────────────────

const FAMOUS_FRAMEWORK_IDS = new Set([
  'competitive-matrix',
  'okr-framework',
  'okrs',
  'objectives-and-key-results',
  'north-star-metric',
  'pirate-metrics-aarrr',
  'aarrr-pirate-metrics',
  'wsjf',
  'weighted-shortest-job-first',
  'four-forces-of-progress',
  'forces-of-progress',
  'rice-scoring',
  'lean-canvas',
  'business-model-canvas',
  'opportunity-solution-tree',
  'kano-model',
  'jobs-to-be-done',
  'wardley-mapping',
  'ddd-context-map',
  'c4-model',
  'event-storming',
])

// ── Audit one framework ────────────────────────────────────────────────────

function auditFramework(framework: typeof UPG_FRAMEWORKS[number]): FrameworkAudit | null {
  const slots = framework.slots ?? []
  if (slots.length < 2) return null

  // Unique entity types across slots — stable order (first-seen).
  const seen = new Set<string>()
  const uniqueTypes: string[] = []
  for (const slot of slots) {
    const t = slot.entityTypeId
    if (!seen.has(t)) {
      seen.add(t)
      uniqueTypes.push(t)
    }
  }

  // Need at least 2 distinct entity types for there to be any ordered pair.
  if (uniqueTypes.length < 2) {
    return {
      framework_id: framework.id,
      framework_name: framework.name,
      category: framework.category,
      slot_count: slots.length,
      unique_entity_type_count: uniqueTypes.length,
      unique_entity_types: uniqueTypes,
      total_slot_pairs: 0,
      connected_pairs: 0,
      null_pairs_count: 0,
      connectivity_ratio: 1, // vacuously clean — no pairs to test
      status: 'CLEAN',
      null_pairs: [],
      pair_results: [],
    }
  }

  // Build ordered pairs (A, B) where A !== B. Direction matters.
  const pairResults: PairResult[] = []
  for (const a of uniqueTypes) {
    for (const b of uniqueTypes) {
      if (a === b) continue
      const canonical = resolveContainmentEdge(a, b)
      const all = resolveAllEdges(a, b)
      const anyEdge = all.length > 0
      pairResults.push({
        source: a,
        target: b,
        canonical_edge: canonical,
        any_edge_exists: anyEdge,
        all_edges: all,
      })
    }
  }

  const total = pairResults.length
  const connected = pairResults.filter((p) => p.canonical_edge !== null).length
  const nullPairs = pairResults.filter((p) => p.canonical_edge === null)
  const ratio = total === 0 ? 1 : connected / total

  let status: ConnectivityStatus
  if (ratio === 1) status = 'CLEAN'
  else if (ratio === 0) status = 'DISCONNECTED'
  else status = 'PARTIAL'

  return {
    framework_id: framework.id,
    framework_name: framework.name,
    category: framework.category,
    slot_count: slots.length,
    unique_entity_type_count: uniqueTypes.length,
    unique_entity_types: uniqueTypes,
    total_slot_pairs: total,
    connected_pairs: connected,
    null_pairs_count: nullPairs.length,
    connectivity_ratio: ratio,
    status,
    null_pairs: nullPairs.map((p) => ({ source: p.source, target: p.target })),
    pair_results: pairResults,
  }
}

// ── Build the full report ─────────────────────────────────────────────────

function buildReport(): AuditReport {
  const audits: FrameworkAudit[] = []
  let skipped = 0
  for (const fw of UPG_FRAMEWORKS) {
    const a = auditFramework(fw)
    if (a === null) {
      skipped++
      continue
    }
    audits.push(a)
  }

  const statusCounts: Record<ConnectivityStatus, number> = {
    CLEAN: 0,
    PARTIAL: 0,
    DISCONNECTED: 0,
  }
  let ratioSum = 0
  let ratioCount = 0
  for (const a of audits) {
    statusCounts[a.status]++
    // Only count frameworks that have at least one pair in the mean.
    if (a.total_slot_pairs > 0) {
      ratioSum += a.connectivity_ratio
      ratioCount++
    }
  }
  const meanRatio = ratioCount === 0 ? 1 : ratioSum / ratioCount

  return {
    generated_at: new Date().toISOString(),
    total_frameworks: UPG_FRAMEWORKS.length,
    audited_frameworks: audits.length,
    skipped_single_slot: skipped,
    status_counts: statusCounts,
    mean_connectivity_ratio: meanRatio,
    frameworks: audits,
  }
}

// ── Markdown rendering ────────────────────────────────────────────────────

function pct(x: number): string {
  return `${(x * 100).toFixed(1)}%`
}

function isFamous(id: string): boolean {
  return FAMOUS_FRAMEWORK_IDS.has(id)
}

function famousTag(id: string): string {
  return isFamous(id) ? ' **FAMOUS — Tier-1 priority**' : ''
}

function renderMarkdown(report: AuditReport): string {
  const today = report.generated_at.slice(0, 10)

  // ── Group by category for "By category" section ──────────────────────
  const byCategory = new Map<
    string,
    { clean: number; partial: number; disconnected: number; total: number }
  >()
  for (const f of report.frameworks) {
    const row = byCategory.get(f.category) ?? {
      clean: 0,
      partial: 0,
      disconnected: 0,
      total: 0,
    }
    row.total++
    if (f.status === 'CLEAN') row.clean++
    else if (f.status === 'PARTIAL') row.partial++
    else row.disconnected++
    byCategory.set(f.category, row)
  }
  const categoryRows = Array.from(byCategory.entries()).sort((a, b) =>
    a[0].localeCompare(b[0]),
  )

  // ── Top 20 frameworks needing edges ──────────────────────────────────
  const needFixes = report.frameworks
    .filter((f) => f.null_pairs_count > 0)
    .sort((a, b) => {
      // Primary: by null_pairs_count desc.
      if (b.null_pairs_count !== a.null_pairs_count)
        return b.null_pairs_count - a.null_pairs_count
      // Secondary: disconnected before partial.
      const rank = (s: ConnectivityStatus) =>
        s === 'DISCONNECTED' ? 0 : s === 'PARTIAL' ? 1 : 2
      const rDiff = rank(a.status) - rank(b.status)
      if (rDiff !== 0) return rDiff
      // Tertiary: alphabetical.
      return a.framework_id.localeCompare(b.framework_id)
    })

  const top20 = needFixes.slice(0, 20)
  const longTail = needFixes.slice(20)

  // ── Header ────────────────────────────────────────────────────────────
  const lines: string[] = []
  lines.push('# Framework slot-connectivity audit — UPG-528 Part 1')
  lines.push('')
  lines.push(`*${today}*`)
  lines.push('')
  lines.push('Audits every `UPGFramework` slot set for canonical edge coverage between')
  lines.push('every ordered pair of slot entity types. Per UPG-528: Wardley was the')
  lines.push('motivating case (4 slots, zero canonical edges between any pair). This')
  lines.push('report inventories how many other frameworks share that shape.')
  lines.push('')
  lines.push('**Method.** For each framework with ≥ 2 slots, collect unique')
  lines.push('`slots[*].entityTypeId` values. For every ordered pair (A, B) with A ≠ B,')
  lines.push('call `resolveContainmentEdge(A, B)` (canonical resolver) and check')
  lines.push('`UPG_EDGE_PAIR_MAP[A→B]` for any edge at all. Categorise:')
  lines.push('')
  lines.push('- **CLEAN** — every ordered pair has a canonical edge')
  lines.push('- **PARTIAL** — some pairs resolve, others do not')
  lines.push('- **DISCONNECTED** — zero pairs resolve (Wardley pre-UPG-528 shape)')
  lines.push('')
  lines.push('## Summary')
  lines.push('')
  lines.push(`- Total frameworks in registry: **${report.total_frameworks}**`)
  lines.push(`- Frameworks audited (≥ 2 slots): **${report.audited_frameworks}**`)
  lines.push(`- Skipped (< 2 slots — nothing to test): **${report.skipped_single_slot}**`)
  lines.push(`- **CLEAN** (every slot pair has a canonical edge): **${report.status_counts.CLEAN}**`)
  lines.push(`- **PARTIAL**: **${report.status_counts.PARTIAL}**`)
  lines.push(`- **DISCONNECTED** (Wardley-style): **${report.status_counts.DISCONNECTED}**`)
  lines.push(`- Mean connectivity ratio (frameworks with ≥ 1 ordered pair): **${pct(report.mean_connectivity_ratio)}**`)
  lines.push('')

  // ── Top 20 ────────────────────────────────────────────────────────────
  lines.push('## Top 20 frameworks needing edges')
  lines.push('')
  lines.push('Sorted by number of missing edges (`null_pairs_count`) descending, then')
  lines.push('DISCONNECTED before PARTIAL, then alphabetical. **FAMOUS** flag marks')
  lines.push('Tier-1-priority frameworks the wider PM community recognises by name.')
  lines.push('')
  lines.push('| # | Framework | Category | Status | Slots | Unique types | Pairs (connected / total) | Missing | Famous |')
  lines.push('|---|-----------|----------|--------|-------|--------------|---------------------------|---------|--------|')
  top20.forEach((f, i) => {
    lines.push(
      `| ${i + 1} | \`${f.framework_id}\` — ${f.framework_name} | ${f.category} | **${f.status}** | ${f.slot_count} | ${f.unique_entity_type_count} | ${f.connected_pairs} / ${f.total_slot_pairs} | ${f.null_pairs_count} | ${isFamous(f.framework_id) ? 'YES' : ''} |`,
    )
  })
  lines.push('')
  lines.push('### Null-pair detail for the top 20')
  lines.push('')
  for (const f of top20) {
    lines.push(`#### \`${f.framework_id}\` — ${f.framework_name}${famousTag(f.framework_id)}`)
    lines.push('')
    lines.push(`- Category: \`${f.category}\``)
    lines.push(`- Status: **${f.status}**`)
    lines.push(`- Slots: ${f.slot_count} · unique entity types: ${f.unique_entity_type_count} (${f.unique_entity_types.map((t) => `\`${t}\``).join(', ')})`)
    lines.push(`- Connectivity ratio: ${pct(f.connectivity_ratio)} (${f.connected_pairs} / ${f.total_slot_pairs} ordered pairs)`)
    lines.push(`- Missing ordered pairs (${f.null_pairs_count}):`)
    for (const p of f.null_pairs) {
      lines.push(`  - \`${p.source}\` → \`${p.target}\``)
    }
    lines.push('')
  }

  // ── By category ───────────────────────────────────────────────────────
  lines.push('## By category')
  lines.push('')
  lines.push('| Category | Total | CLEAN | PARTIAL | DISCONNECTED |')
  lines.push('|----------|------:|------:|--------:|-------------:|')
  for (const [cat, row] of categoryRows) {
    lines.push(`| ${cat} | ${row.total} | ${row.clean} | ${row.partial} | ${row.disconnected} |`)
  }
  lines.push('')

  // ── Pareto candidates ────────────────────────────────────────────────
  lines.push('## Pareto candidates')
  lines.push('')
  lines.push('The first 20 frameworks (above) by missing-edge count are the highest-')
  lines.push('impact fix targets. Below them, the long-tail can wait for v0.7.')
  lines.push('')
  if (longTail.length === 0) {
    lines.push('_No long-tail — every framework with gaps is in the top 20._')
  } else {
    lines.push(`Long-tail (${longTail.length} additional frameworks with gaps):`)
    lines.push('')
    lines.push('| Framework | Category | Status | Missing | Famous |')
    lines.push('|-----------|----------|--------|--------:|--------|')
    for (const f of longTail) {
      lines.push(
        `| \`${f.framework_id}\` — ${f.framework_name} | ${f.category} | **${f.status}** | ${f.null_pairs_count} | ${isFamous(f.framework_id) ? 'YES' : ''} |`,
      )
    }
  }
  lines.push('')

  // ── Famous frameworks roll-up ────────────────────────────────────────
  const famous = report.frameworks.filter((f) => isFamous(f.framework_id))
  if (famous.length > 0) {
    lines.push('## Famous frameworks roll-up')
    lines.push('')
    lines.push('Tier-1 frameworks the PM community recognises by name. These should')
    lines.push('be CLEAN before v0.7 ships. Sorted by missing-edge count desc.')
    lines.push('')
    famous.sort((a, b) => b.null_pairs_count - a.null_pairs_count)
    lines.push('| Framework | Category | Status | Pairs (connected / total) | Missing |')
    lines.push('|-----------|----------|--------|---------------------------|--------:|')
    for (const f of famous) {
      lines.push(
        `| \`${f.framework_id}\` — ${f.framework_name} | ${f.category} | **${f.status}** | ${f.connected_pairs} / ${f.total_slot_pairs} | ${f.null_pairs_count} |`,
      )
    }
    lines.push('')
  }

  // ── Complete inventory ────────────────────────────────────────────────
  lines.push('## Complete inventory')
  lines.push('')
  lines.push('Every audited framework with status, connectivity ratio, slot count.')
  lines.push('')
  lines.push('| Framework | Category | Status | Slots | Unique types | Pairs (connected / total) | Ratio |')
  lines.push('|-----------|----------|--------|------:|-------------:|---------------------------|-------|')
  const sorted = [...report.frameworks].sort((a, b) => {
    const rank = (s: ConnectivityStatus) =>
      s === 'DISCONNECTED' ? 0 : s === 'PARTIAL' ? 1 : 2
    const r = rank(a.status) - rank(b.status)
    if (r !== 0) return r
    if (b.null_pairs_count !== a.null_pairs_count)
      return b.null_pairs_count - a.null_pairs_count
    return a.framework_id.localeCompare(b.framework_id)
  })
  for (const f of sorted) {
    lines.push(
      `| \`${f.framework_id}\` — ${f.framework_name} | ${f.category} | **${f.status}** | ${f.slot_count} | ${f.unique_entity_type_count} | ${f.connected_pairs} / ${f.total_slot_pairs} | ${pct(f.connectivity_ratio)} |`,
    )
  }
  lines.push('')

  // ── Verification ─────────────────────────────────────────────────────
  const capCap = resolveContainmentEdge('capability', 'capability')
  const capCapAll = resolveAllEdges('capability', 'capability')
  lines.push('## Verification — post-UPG-528 Wardley wiring')
  lines.push('')
  lines.push('Spot-check that Agent K\'s 4 Wardley edges landed correctly. The motivating')
  lines.push('case was `capability → capability` (Wardley map evolution / dependency).')
  lines.push('')
  lines.push(`- \`resolveContainmentEdge("capability", "capability")\` → \`${capCap ?? 'null'}\``)
  lines.push(`- \`resolveAllEdges("capability", "capability")\` → [${capCapAll.map((e) => `\`${e}\``).join(', ')}]`)
  lines.push('')
  lines.push(capCap === null
    ? '**WARNING** — capability self-edge still null. Agent K wiring did not land.'
    : '**OK** — capability self-edge resolves. Agent K wiring landed.')
  lines.push('')

  return lines.join('\n')
}

// ── Main ──────────────────────────────────────────────────────────────────

function main(): void {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  const repoRoot = resolve(__dirname, '../../..') // packages/upg-spec/scripts → repo root

  const report = buildReport()

  const jsonOutPath = resolve(
    repoRoot,
    'packages/upg-spec/scripts/output/framework-slot-connectivity.json',
  )
  const mdOutPath = resolve(
    repoRoot,
    'TPC-context/upg/02-spec/analysis/2026-05-21-framework-slot-connectivity-audit.md',
  )

  mkdirSync(dirname(jsonOutPath), { recursive: true })
  mkdirSync(dirname(mdOutPath), { recursive: true })

  writeFileSync(jsonOutPath, JSON.stringify(report, null, 2), 'utf-8')
  writeFileSync(mdOutPath, renderMarkdown(report), 'utf-8')

  // ── Console summary ───────────────────────────────────────────────────
  console.log('Framework slot-connectivity audit — UPG-528 Part 1')
  console.log('───────────────────────────────────────────────────')
  console.log(`Total frameworks      : ${report.total_frameworks}`)
  console.log(`Audited (≥ 2 slots)   : ${report.audited_frameworks}`)
  console.log(`Skipped (< 2 slots)   : ${report.skipped_single_slot}`)
  console.log(`CLEAN                 : ${report.status_counts.CLEAN}`)
  console.log(`PARTIAL               : ${report.status_counts.PARTIAL}`)
  console.log(`DISCONNECTED          : ${report.status_counts.DISCONNECTED}`)
  console.log(`Mean ratio            : ${pct(report.mean_connectivity_ratio)}`)
  console.log('')
  console.log(`JSON  → ${jsonOutPath}`)
  console.log(`MD    → ${mdOutPath}`)
}

main()
