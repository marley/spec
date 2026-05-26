/**
 * Invariant 2: Property ownership
 *
 * Every property interface (XxxProperties) appears in exactly one domain file.
 * Report duplicates with file paths. Also report property keys that appear in
 * multiple interfaces (same key across entities) — informational, not errors,
 * but useful for design review.
 */

import * as fs from 'node:fs'
import * as path from 'node:path'
import { Report, SRC, listDomainFiles } from './_lib.js'

const report = new Report('Invariant 2: Property ownership')

interface InterfaceOccurrence {
  file: string
  interfaceName: string
  keys: string[]
}

const interfaceOccurrences: InterfaceOccurrence[] = []
const interfaceNameToFiles = new Map<string, string[]>()

const INTERFACE_RE = /export\s+interface\s+(\w+Properties)\s*\{([\s\S]*?)^\}/gm
const KEY_RE = /^\s{2,4}([a-zA-Z_][a-zA-Z0-9_]*)\??\s*:/gm

for (const file of listDomainFiles()) {
  const content = fs.readFileSync(path.join(SRC, 'properties', 'domains', file), 'utf8')
  const reInst = new RegExp(INTERFACE_RE.source, 'gm')
  let m: RegExpExecArray | null
  while ((m = reInst.exec(content))) {
    const name = m[1]
    const body = m[2]
    const keys: string[] = []
    const keyRe = new RegExp(KEY_RE.source, 'gm')
    let km: RegExpExecArray | null
    while ((km = keyRe.exec(body))) keys.push(km[1])
    interfaceOccurrences.push({ file, interfaceName: name, keys })
    if (!interfaceNameToFiles.has(name)) interfaceNameToFiles.set(name, [])
    interfaceNameToFiles.get(name)!.push(file)
  }
}

// ─── Duplicate interface definitions ──────────────────────────────────────────
for (const [name, files] of interfaceNameToFiles.entries()) {
  if (files.length > 1) {
    report.error(
      `Interface "${name}" is defined in ${files.length} files: ${files.join(', ')}`,
      'properties/domains',
    )
  }
}

// ─── Cross-interface key collision report (informational) ─────────────────────
// Group by key — which interfaces declare each property key?
const keyToInterfaces = new Map<string, Array<{ interfaceName: string; file: string }>>()
for (const occ of interfaceOccurrences) {
  for (const key of occ.keys) {
    if (!keyToInterfaces.has(key)) keyToInterfaces.set(key, [])
    keyToInterfaces.get(key)!.push({ interfaceName: occ.interfaceName, file: occ.file })
  }
}

// Property keys that appear in 3+ interfaces — candidates for shared base
const heavilyShared: Array<{ key: string; count: number; interfaces: string[] }> = []
for (const [key, list] of keyToInterfaces.entries()) {
  if (list.length >= 3) {
    heavilyShared.push({
      key,
      count: list.length,
      interfaces: [...new Set(list.map((l) => l.interfaceName))].sort(),
    })
  }
}
heavilyShared.sort((a, b) => b.count - a.count || a.key.localeCompare(b.key))

if (heavilyShared.length > 0) {
  report.info(`Cross-cutting properties appearing in 3+ interfaces: ${heavilyShared.length}`)
  for (const h of heavilyShared.slice(0, 30)) {
    report.info(`"${h.key}" appears in ${h.count} interfaces: ${h.interfaces.slice(0, 6).join(', ')}${h.interfaces.length > 6 ? ` … +${h.interfaces.length - 6}` : ''}`)
  }
}

report.print()
if (report.errorCount > 0) process.exitCode = 1
