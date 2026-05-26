/**
 * Runs every audit script sequentially and prints a consolidated summary.
 *
 * Usage: npx tsx scripts/audit/run-all.ts
 */

import { spawnSync } from 'node:child_process'
import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))

const scripts = fs
  .readdirSync(HERE)
  .filter((f) => /^\d{2}-.*\.ts$/.test(f))
  .sort()

let totalErrors = 0
let totalWarnings = 0
let anyNonZeroExit = false

for (const script of scripts) {
  const fullPath = path.join(HERE, script)
  const result = spawnSync('npx', ['tsx', fullPath], {
    stdio: ['ignore', 'pipe', 'inherit'],
    encoding: 'utf8',
  })
  const out = result.stdout ?? ''
  process.stdout.write(out)
  const header = out.match(/errors:\s+(\d+)\s+warnings:\s+(\d+)/)
  if (header) {
    totalErrors += parseInt(header[1], 10)
    totalWarnings += parseInt(header[2], 10)
  }
  // Propagate per-audit exit codes so enforcing audits (e.g. 09-jsdoc-coverage)
  // can signal failure without necessarily emitting report-level errors.
  if ((result.status ?? 0) !== 0) {
    anyNonZeroExit = true
  }
}

console.log('\n=== Audit summary ===')
console.log(`Scripts run: ${scripts.length}`)
console.log(`Total errors: ${totalErrors}`)
console.log(`Total warnings: ${totalWarnings}`)

if (totalErrors > 0 || anyNonZeroExit) {
  process.exitCode = 1
}
