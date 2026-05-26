/**
 * Shared helpers for audit scripts.
 *
 * - Loading spec modules from source (via tsx)
 * - Print helpers with stable ordering
 * - Simple finding accumulator
 */

import * as path from 'node:path'
import * as fs from 'node:fs'
import { fileURLToPath } from 'node:url'

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')
export const SRC = path.join(ROOT, 'src')

export interface Finding {
  severity: 'error' | 'warning' | 'info'
  message: string
  location?: string
}

export class Report {
  private findings: Finding[] = []
  constructor(public readonly invariant: string) {}

  add(severity: Finding['severity'], message: string, location?: string): void {
    this.findings.push({ severity, message, location })
  }

  error(message: string, location?: string): void {
    this.add('error', message, location)
  }

  warn(message: string, location?: string): void {
    this.add('warning', message, location)
  }

  info(message: string, location?: string): void {
    this.add('info', message, location)
  }

  print(): void {
    const errors = this.findings.filter((f) => f.severity === 'error')
    const warnings = this.findings.filter((f) => f.severity === 'warning')
    const infos = this.findings.filter((f) => f.severity === 'info')

    console.log(`\n=== ${this.invariant} ===`)
    console.log(`errors: ${errors.length}  warnings: ${warnings.length}  info: ${infos.length}`)
    for (const f of errors) printFinding(f)
    for (const f of warnings) printFinding(f)
    for (const f of infos) printFinding(f)
  }

  get count(): number {
    return this.findings.length
  }

  get errorCount(): number {
    return this.findings.filter((f) => f.severity === 'error').length
  }

  get warningCount(): number {
    return this.findings.filter((f) => f.severity === 'warning').length
  }
}

function printFinding(f: Finding): void {
  const prefix = f.severity === 'error' ? 'ERR ' : f.severity === 'warning' ? 'WARN' : 'INFO'
  const loc = f.location ? ` [${f.location}]` : ''
  console.log(`  ${prefix}  ${f.message}${loc}`)
}

// ─── File helpers ──────────────────────────────────────────────────────────────

export function readSrc(rel: string): string {
  return fs.readFileSync(path.join(SRC, rel), 'utf8')
}

export function listDomainFiles(): string[] {
  const dir = path.join(SRC, 'properties', 'domains')
  return fs.readdirSync(dir).filter((f) => f.endsWith('.ts'))
}

// ─── Naming predicates ─────────────────────────────────────────────────────────

export const SNAKE_CASE = /^[a-z][a-z0-9_]*$/
export const CAMEL_CASE = /^[a-z][a-zA-Z0-9]*$/
