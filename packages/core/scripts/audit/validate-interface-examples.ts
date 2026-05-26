/**
 * validate-interface-examples — walks every `*Properties` interface in
 * `packages/upg-spec/src/properties/domains/` and confirms that any literal
 * value inside an `@example` block matches the declared string-literal union
 * for that field. Flags mismatches like:
 *
 *     Iface.field = 'bogus' — not in union ['a' | 'b' | 'c']
 *
 * A permanent audit helper under `packages/upg-spec/scripts/audit/` so that
 * future `@example` passes can re-run it.
 *
 * Usage:
 *   npx tsx packages/upg-spec/scripts/audit/validate-interface-examples.ts
 *
 * Reports only; does not fix. Hand-tune the reported lines.
 */

import * as fs from 'node:fs'
import * as path from 'node:path'

const DOMAINS_DIR = path.resolve(
  process.cwd(),
  'packages/upg-spec/src/properties/domains',
)

interface Field {
  name: string
  typeText: string
  optional: boolean
}

function findMatchingBrace(src: string, openIdx: number): number {
  let depth = 0
  for (let i = openIdx; i < src.length; i++) {
    const c = src[i]
    if (c === '{') depth++
    else if (c === '}') {
      depth--
      if (depth === 0) return i
    }
  }
  return -1
}

function extractFields(src: string, bodyStart: number, bodyEnd: number): Field[] {
  const fields: Field[] = []
  let i = bodyStart + 1
  let bracketDepth = 0
  let atLineStart = true

  while (i <= bodyEnd - 1) {
    const ch = src[i]
    if (atLineStart && /\s/.test(ch) && ch !== '\n') { i++; continue }
    if (ch === '\n') { atLineStart = true; i++; continue }

    if (atLineStart && bracketDepth === 0 && ch === '/') {
      if (src[i + 1] === '*') {
        const close = src.indexOf('*/', i + 2)
        if (close === -1) break
        i = close + 2
        atLineStart = true
        continue
      }
      if (src[i + 1] === '/') {
        const nl = src.indexOf('\n', i)
        if (nl === -1) break
        i = nl
        atLineStart = true
        continue
      }
    }

    if (atLineStart && bracketDepth === 0) {
      const rest = src.slice(i, bodyEnd)
      const nameMatch = rest.match(/^(readonly\s+)?([A-Za-z_$][A-Za-z0-9_$]*)(\?)?\s*:\s*/)
      if (nameMatch) {
        const name = nameMatch[2]
        const optional = nameMatch[3] === '?'
        let k = i + nameMatch[0].length
        let typeDepth = 0
        const typeStart = k
        while (k < bodyEnd) {
          const c = src[k]
          if (c === '{' || c === '(' || c === '<' || c === '[') typeDepth++
          else if (c === '}' || c === ')' || c === '>' || c === ']') {
            if (typeDepth === 0) break
            typeDepth--
          } else if (typeDepth === 0 && (c === ';' || c === ',' || c === '\n')) break
          k++
        }
        fields.push({ name, typeText: src.slice(typeStart, k).trim(), optional })
        i = k
        atLineStart = true
        continue
      }
    }

    if (ch === '{' || ch === '(' || ch === '<' || ch === '[') bracketDepth++
    else if (ch === '}' || ch === ')' || ch === '>' || ch === ']') bracketDepth--

    atLineStart = false
    i++
  }
  return fields
}

interface InterfaceBlock {
  name: string
  declStart: number
  bodyStart: number
  bodyEnd: number
  docStart: number | null
  docEnd: number | null
}

function findPrecedingDoc(src: string, pos: number): { start: number; end: number } | null {
  let i = pos - 1
  while (i > 0 && /\s/.test(src[i])) i--
  if (i < 1) return null
  if (src[i] !== '/' || src[i - 1] !== '*') return null
  const closeAt = i - 1
  const before = src.slice(0, closeAt)
  const openAt = before.lastIndexOf('/**')
  if (openAt === -1) return null
  return { start: openAt, end: closeAt + 2 }
}

function parseInterfaces(src: string): InterfaceBlock[] {
  const re = /^export\s+interface\s+(\w+Properties)\b/gm
  const out: InterfaceBlock[] = []
  let m: RegExpExecArray | null
  while ((m = re.exec(src)) !== null) {
    const declStart = m.index
    const name = m[1]
    const braceOpen = src.indexOf('{', declStart)
    if (braceOpen === -1) continue
    const braceClose = findMatchingBrace(src, braceOpen)
    if (braceClose === -1) continue
    const doc = findPrecedingDoc(src, declStart)
    out.push({
      name,
      declStart,
      bodyStart: braceOpen,
      bodyEnd: braceClose,
      docStart: doc?.start ?? null,
      docEnd: doc?.end ?? null,
    })
  }
  return out
}

function unionLiterals(typeText: string): string[] | null {
  // Matches `'a' | 'b' | 'c'` — with optional spaces / newlines.
  const t = typeText.trim()
  if (!/^['"][^'"]+['"](\s*\|\s*['"][^'"]+['"])+$/.test(t)) return null
  return t.split('|').map((p) => p.trim().replace(/^['"]|['"]$/g, ''))
}

function extractExampleAssignments(docText: string, ifaceName: string): Record<string, string> {
  // Find `const properties: IfaceName = { ... }` body and capture field: value.
  const pattern = new RegExp(
    `const properties:\\s*${ifaceName}\\s*=\\s*\\{([\\s\\S]*?)\\}`,
  )
  const m = docText.match(pattern)
  if (!m) return {}
  const body = m[1]
  // Each assignment line looks like: `   *   field: value,`
  const out: Record<string, string> = {}
  const lineRe = /\*\s+([a-z_][a-z0-9_]*):\s*([^\n]+)/g
  let lm: RegExpExecArray | null
  while ((lm = lineRe.exec(body)) !== null) {
    out[lm[1]] = lm[2].replace(/,\s*$/, '').trim()
  }
  return out
}

function main(): void {
  const files = fs
    .readdirSync(DOMAINS_DIR)
    .filter((f) => f.endsWith('.ts'))
    .map((f) => path.join(DOMAINS_DIR, f))

  let issueCount = 0
  for (const f of files) {
    const src = fs.readFileSync(f, 'utf8')
    const blocks = parseInterfaces(src)
    for (const b of blocks) {
      if (b.docStart === null || b.docEnd === null) continue
      const doc = src.slice(b.docStart, b.docEnd)
      if (!doc.includes('@example')) continue
      const assignments = extractExampleAssignments(doc, b.name)
      const fields = extractFields(src, b.bodyStart, b.bodyEnd)
      const fieldMap = new Map(fields.map((fld) => [fld.name, fld]))
      for (const [key, value] of Object.entries(assignments)) {
        const fld = fieldMap.get(key)
        if (!fld) continue
        const lits = unionLiterals(fld.typeText)
        if (!lits) continue
        // `value` is a TS-literal expression — we care about string-literal unions
        const strMatch = value.match(/^['"]([^'"]+)['"]$/)
        if (!strMatch) continue
        const lit = strMatch[1]
        if (!lits.includes(lit)) {
          console.log(
            `${path.basename(f)}  ${b.name}.${key} = '${lit}' — not in union [${lits.map((l) => `'${l}'`).join(' | ')}]`,
          )
          issueCount++
        }
      }
    }
  }
  console.log(`\n${issueCount} type-union mismatches found.`)
}

main()
