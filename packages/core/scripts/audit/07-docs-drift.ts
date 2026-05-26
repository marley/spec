/**
 * Invariant 7: Documentation drift
 *
 * - src/README.md, src/ARCHITECTURE.md, top-level README.md, CHANGELOG.md
 *   should describe v0.3 reality
 * - UPG_VERSION in code vs claims in docs
 * - Count claims (e.g. "36 domains", "699 edges") — verify against constants
 * - Directory names mentioned in docs must exist in src/
 */

import * as fs from 'node:fs'
import * as path from 'node:path'
import {
  UPG_VERSION,
  UPG_TYPES,
  UPG_ENTITY_COUNT,
  UPG_DOMAIN_COUNT,
  UPG_EDGE_COUNT,
  UPG_META_COUNT,
  UPG_LIFECYCLES,
  UPG_PROPERTY_SCHEMA,
  UPG_FRAMEWORKS,
} from '../../src/index.js'
import { Report, ROOT, SRC } from './_lib.js'

const report = new Report('Invariant 7: Documentation drift')

const docs: Array<{ file: string; label: string }> = [
  { file: path.join(SRC, 'README.md'), label: 'src/README.md' },
  { file: path.join(SRC, 'ARCHITECTURE.md'), label: 'src/ARCHITECTURE.md' },
  { file: path.join(ROOT, 'README.md'), label: 'package README.md' },
  { file: path.join(ROOT, 'CHANGELOG.md'), label: 'CHANGELOG.md' },
]

// Build a claim detector: numbers followed by keywords we care about.
const claimPatterns: Array<{ pattern: RegExp; expected: number; description: string }> = [
  { pattern: /(\d{1,4})\s+entity types/gi, expected: UPG_ENTITY_COUNT, description: 'entity types' },
  { pattern: /(\d{1,4})\s+(unique\s+)?entity types/gi, expected: UPG_ENTITY_COUNT, description: 'unique entity types' },
  { pattern: /(\d{1,4})\s+(semantic\s+)?domains/gi, expected: UPG_DOMAIN_COUNT, description: 'domains' },
  { pattern: /(\d{1,4})\s+(flat\s+)?domains/gi, expected: UPG_DOMAIN_COUNT, description: 'flat domains' },
  { pattern: /(\d{1,4})\s+edges/gi, expected: UPG_EDGE_COUNT, description: 'edges' },
  { pattern: /(\d{1,4})\s+edge types/gi, expected: UPG_EDGE_COUNT, description: 'edge types' },
  { pattern: /(\d{1,4})\s+frameworks/gi, expected: UPG_FRAMEWORKS.length, description: 'frameworks' },
  { pattern: /(\d{1,4})\s+framework definitions/gi, expected: UPG_FRAMEWORKS.length, description: 'framework definitions' },
  { pattern: /(\d{1,4})\s+entity-specific lifecycle/gi, expected: UPG_LIFECYCLES.length, description: 'lifecycles' },
]

// Directory names referenced in docs that must exist
const dirClaims = ['catalog', 'shapes', 'registry', 'grammar', 'properties', 'presentation', 'intelligence', 'frameworks', 'vocabulary', 'display']
const existingDirs = new Set(
  fs.readdirSync(SRC, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name),
)

// CHANGELOG counts are release-scoped (e.g. "51 entity types had lifecycle added in 0.2.0"),
// not current totals. Skip the numeric claim sweep there.
const SKIP_COUNT_SWEEP = new Set(['CHANGELOG.md'])

for (const doc of docs) {
  if (!fs.existsSync(doc.file)) {
    report.warn(`Doc file missing: ${doc.label}`, doc.file)
    continue
  }
  const content = fs.readFileSync(doc.file, 'utf8')

  // Version claims
  const versionMatches = content.match(/0\.\d+\.\d+/g) ?? []
  if (versionMatches.length > 0) {
    const uniqueVersions = [...new Set(versionMatches)]
    if (!uniqueVersions.includes(UPG_VERSION)) {
      report.warn(
        `${doc.label} mentions versions ${uniqueVersions.join(', ')} but code has UPG_VERSION="${UPG_VERSION}"`,
        doc.label,
      )
    }
  }

  // Numeric claim sweep (skip files where counts are release-scoped)
  if (!SKIP_COUNT_SWEEP.has(doc.label)) {
    for (const { pattern, expected, description } of claimPatterns) {
      const re = new RegExp(pattern.source, pattern.flags)
      let m: RegExpExecArray | null
      while ((m = re.exec(content))) {
        const n = parseInt(m[1], 10)
        if (!Number.isFinite(n)) continue
        if (n < 10) continue
        if (n !== expected) {
          report.warn(
            `${doc.label} claims "${m[0]}" but code has ${expected} ${description}`,
            doc.label,
          )
        }
      }
    }
  }

  // Directory references (applies to all docs)
  for (const dir of dirClaims) {
    const re = new RegExp(`\`${dir}/[^\`]*\``, 'g')
    let m: RegExpExecArray | null
    while ((m = re.exec(content))) {
      if (!existingDirs.has(dir)) {
        // Find the surrounding line — skip if it explains the directory no longer exists.
        const lineStart = content.lastIndexOf('\n', m.index) + 1
        const lineEnd = content.indexOf('\n', m.index)
        const line = content.slice(lineStart, lineEnd === -1 ? content.length : lineEnd)
        if (/restructured|earlier|renamed|historical|used to|previously/i.test(line)) {
          continue
        }
        report.error(
          `${doc.label} references src/${dir}/ but that directory does not exist`,
          doc.label,
        )
      }
    }
  }
}

report.info(`UPG_VERSION (code) = "${UPG_VERSION}"`)
report.info(`UPG_TYPES.length = ${UPG_TYPES.length}; UPG_ENTITY_COUNT = ${UPG_ENTITY_COUNT}`)
report.info(`UPG_DOMAIN_COUNT = ${UPG_DOMAIN_COUNT}`)
report.info(`UPG_EDGE_COUNT = ${UPG_EDGE_COUNT}`)
report.info(`UPG_META_COUNT = ${UPG_META_COUNT}`)
report.info(`UPG_LIFECYCLES.length = ${UPG_LIFECYCLES.length}`)
report.info(`UPG_PROPERTY_SCHEMA (entity types with schemas) = ${Object.keys(UPG_PROPERTY_SCHEMA).length}`)
report.info(`UPG_FRAMEWORKS.length = ${UPG_FRAMEWORKS.length}`)

report.print()
if (report.errorCount > 0) process.exitCode = 1
