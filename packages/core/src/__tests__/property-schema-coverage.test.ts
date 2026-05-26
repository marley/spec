/**
 * Property Schema Coverage — Regression Test
 *
 * Asserts that every `*Properties` interface declared in
 * `src/properties/domains/*.ts` is represented in the runtime
 * `UPG_PROPERTY_SCHEMA`, and that every property declared on those
 * interfaces appears with a sensible runtime shape.
 *
 * This catches the silent-drop bug class that and
 * surfaced:
 * - Multi-line string-literal unions silently dropped.
 * - Type-alias references emitting `'object'` instead of the
 * resolved union.
 * - Inline property declarations whose JSDoc spanned multiple
 * blocks (caused regex parser to swallow declarations).
 *
 * The check is structural: we re-run the same TypeScript Compiler
 * API used by the generator, enumerate `*Properties` interfaces and
 * their `?:`/`:` property signatures, then verify each is present in
 * the generated `UPG_PROPERTY_SCHEMA`. For properties whose declared
 * type is a string-literal union (directly or via a resolved type
 * alias), we additionally assert that every union member appears as
 * an `enum` value on the generated schema.
 *
 * Run: npx vitest run src/__tests__/property-schema-coverage.test.ts
 */

import { describe, it, expect } from 'vitest'
import * as fs from 'node:fs'
import * as path from 'node:path'
import * as url from 'node:url'
import ts from 'typescript'

import { UPG_PROPERTY_SCHEMA } from '../properties/property-schema.js'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const DOMAIN_DIR = path.join(__dirname, '..', 'properties', 'domains')

const SOURCE_FILES = fs
 .readdirSync(DOMAIN_DIR)
 .filter((f) => f.endsWith('.ts'))
 .map((f) => path.join(DOMAIN_DIR, f))

const PROGRAM = ts.createProgram(SOURCE_FILES, {
 target: ts.ScriptTarget.Latest,
 module: ts.ModuleKind.ESNext,
 moduleResolution: ts.ModuleResolutionKind.NodeNext,
 allowJs: false,
 noEmit: true,
 skipLibCheck: true,
 strict: false,
})
const CHECKER = PROGRAM.getTypeChecker()

// ── Helpers (mirror the generator's logic at a high level) ──────────────────

function unwrap(node: ts.TypeNode): ts.TypeNode {
 while (ts.isParenthesizedTypeNode(node)) node = node.type
 return node
}

function collectStringLiteralUnion(node: ts.TypeNode): string[] | undefined {
 node = unwrap(node)
 if (ts.isLiteralTypeNode(node) && ts.isStringLiteral(node.literal)) {
 return [node.literal.text]
 }
 if (ts.isUnionTypeNode(node)) {
 const out: string[] = []
 for (const member of node.types) {
 const m = unwrap(member)
 if (m.kind === ts.SyntaxKind.UndefinedKeyword || m.kind === ts.SyntaxKind.NullKeyword) continue
 // Mixed `string` keyword breaks the pure literal union — bail out.
 if (m.kind === ts.SyntaxKind.StringKeyword) return undefined
 const sub = collectStringLiteralUnion(m)
 if (!sub) return undefined
 out.push(...sub)
 }
 return out
 }
 return undefined
}

function resolveAliasUnion(node: ts.TypeReferenceNode): string[] | undefined {
 const symbol = CHECKER.getSymbolAtLocation(node.typeName)
 if (!symbol) return undefined
 const target = (symbol.flags & ts.SymbolFlags.Alias) !== 0 ? CHECKER.getAliasedSymbol(symbol) : symbol
 const decls = target.declarations
 if (!decls) return undefined
 for (const d of decls) {
 if (ts.isTypeAliasDeclaration(d)) {
 return collectStringLiteralUnion(d.type)
 }
 }
 return undefined
}

function interfaceNameToEntityType(name: string): string {
 return name
 .replace(/Properties$/, '')
 .replace(/([A-Z])/g, '_$1')
 .toLowerCase()
 .replace(/^_/, '')
 .replace(/j_t_b_d/, 'jtbd')
 .replace(/k_p_i/, 'kpi')
 .replace(/o_k_r/, 'okr')
 .replace(/g_t_m/, 'gtm')
 .replace(/r_a_g/, 'rag')
 .replace(/b_m_c/, 'bmc')
 .replace(/n_p_s/, 'nps')
 .replace(/a_b_/, 'ab_')
 .replace(/a_i_/, 'ai_')
 .replace(/s_l_i$/, 'sli')
 .replace(/s_l_o$/, 'slo')
 .replace(/a_d_r/, 'adr')
 .replace(/c_i_c_d/, 'ci_cd')
 .replace(/r_i_c_e/, 'rice')
 .replace(/q_a_/, 'qa_')
 .replace(/u_x_/, 'ux_')
 .replace(/s_e_o/, 'seo')
 .replace(/l_t_v/, 'ltv')
 .replace(/c_a_c/, 'cac')
}

interface DeclaredProperty {
 name: string
 unionMembers?: string[] // present iff prop is a string-literal union (direct or aliased)
}

interface DeclaredInterface {
 entityType: string
 interfaceName: string
 properties: DeclaredProperty[]
 filePath: string
}

function collectDeclarations(): DeclaredInterface[] {
 const out: DeclaredInterface[] = []
 for (const filePath of SOURCE_FILES) {
 const sf = PROGRAM.getSourceFile(filePath)
 if (!sf) continue
 function visit(node: ts.Node) {
 if (ts.isInterfaceDeclaration(node) && node.name.text.endsWith('Properties')) {
 const interfaceName = node.name.text
 const entityType = interfaceNameToEntityType(interfaceName)
 const properties: DeclaredProperty[] = []
 for (const m of node.members) {
 if (!ts.isPropertySignature(m)) continue
 if (!m.name || !ts.isIdentifier(m.name)) continue
 if (!m.type) continue
 const t = unwrap(m.type)
 let union = collectStringLiteralUnion(t)
 if (!union && ts.isTypeReferenceNode(t)) {
 union = resolveAliasUnion(t)
 }
 properties.push({ name: m.name.text, unionMembers: union })
 }
 if (properties.length > 0) {
 out.push({ entityType, interfaceName, properties, filePath: filePath })
 }
 }
 ts.forEachChild(node, visit)
 }
 visit(sf)
 }
 return out
}

const DECLARATIONS = collectDeclarations()

describe('property-schema coverage', () => {
 it('discovers at least 300 *Properties interfaces across the domain corpus', () => {
 // Sanity check that the AST walk found a realistic surface.
 expect(DECLARATIONS.length).toBeGreaterThanOrEqual(300)
 })

 it('every declared *Properties interface appears in UPG_PROPERTY_SCHEMA', () => {
 const missing: string[] = []
 for (const iface of DECLARATIONS) {
 if (!Object.prototype.hasOwnProperty.call(UPG_PROPERTY_SCHEMA, iface.entityType)) {
 missing.push(`${iface.interfaceName} (${iface.entityType})`)
 }
 }
 expect(missing, `missing entity types: ${missing.join(', ')}`).toEqual([])
 })

 it('every declared property appears on its entity type in UPG_PROPERTY_SCHEMA', () => {
 const missing: string[] = []
 for (const iface of DECLARATIONS) {
 const schema = UPG_PROPERTY_SCHEMA[iface.entityType]
 if (!schema) continue // covered by previous test
 for (const prop of iface.properties) {
 if (!Object.prototype.hasOwnProperty.call(schema, prop.name)) {
 missing.push(`${iface.entityType}.${prop.name}`)
 }
 }
 }
 expect(
 missing,
 `silently-dropped properties: ${missing.join(', ')}`,
 ).toEqual([])
 })

 it('every string-literal-union property emits all union members as `enum` values', () => {
 const mismatches: string[] = []
 for (const iface of DECLARATIONS) {
 const schema = UPG_PROPERTY_SCHEMA[iface.entityType]
 if (!schema) continue
 for (const prop of iface.properties) {
 if (!prop.unionMembers) continue
 const def = schema[prop.name]
 if (!def) continue // covered by previous test
 const emitted = def.enum ?? []
 const missingMembers = prop.unionMembers.filter((m) => !emitted.includes(m))
 if (missingMembers.length > 0) {
 mismatches.push(
 `${iface.entityType}.${prop.name}: expected enum ⊇ [${prop.unionMembers.join(', ')}], got [${emitted.join(', ')}]`,
 )
 }
 }
 }
 expect(mismatches, `enum mismatches:\n ${mismatches.join('\n ')}`).toEqual([])
 })

  it('captures the four newly-rescued properties', () => {
    // These were silently dropped or under-emitted by the regex
    // generator. The AST migration rescues them — pin them so a future
    // regression on the generator is loud. The fourth historical pin
    // (`symptom.frequency` mixed-string union) was retired by the v0.5.0
    // deprecation-hygiene pass; the remaining three still
    // exercise the AST rescue path.
    expect(UPG_PROPERTY_SCHEMA.job?.job_type?.enum).toEqual([
      'functional',
      'emotional',
      'social',
      'supporting',
    ])
    expect(UPG_PROPERTY_SCHEMA.need?.motivation?.enum).toEqual(['functional', 'emotional', 'social'])
    expect(UPG_PROPERTY_SCHEMA.vulnerability?.exploit_maturity?.enum).toEqual([
      'no_known_exploit',
      'proof_of_concept',
      'functional_exploit',
      'active_exploitation',
    ])
    // — symptom.frequency was removed in v0.5.0 (replaced by the
    // canonical 4-way frequency split). Assert it's gone so future
    // regenerations don't accidentally re-introduce it.
    expect(UPG_PROPERTY_SCHEMA.symptom?.frequency).toBeUndefined()
  })

 it('resolves canonical type-alias references to enum constraints (Q3)', () => {
 // Spot-check a handful of cross-file aliases: the regex generator
 // emitted these as bare `'string'` / `'object'`; the AST resolves
 // them via the type checker.
 expect(UPG_PROPERTY_SCHEMA.metric?.cadence?.enum).toContain('continuous')
 expect(UPG_PROPERTY_SCHEMA.metric?.designation?.enum).toContain('north_star')
 expect(UPG_PROPERTY_SCHEMA.metric?.metric_category?.enum).toContain('acquisition')
 expect(UPG_PROPERTY_SCHEMA.metric?.guardrail_status?.enum).toContain('breached')
 expect(UPG_PROPERTY_SCHEMA.metric?.metric_health?.enum).toContain('at_risk')
 expect(UPG_PROPERTY_SCHEMA.user_journey?.journey_type?.enum).toContain('current_state')
 expect(UPG_PROPERTY_SCHEMA.need?.valence?.enum).toContain('pain')
 expect(UPG_PROPERTY_SCHEMA.need?.maturity?.enum).toContain('validated')
 expect(UPG_PROPERTY_SCHEMA.product?.stage?.enum).toContain('beta')
 })
})

// ── Fragile-case fixtures ─────────────────────────────────────────
//
// These are inline mini-fixtures rather than real domain interfaces, used to
// confirm the AST handles the shapes that historically tripped the regex
// (parenthesised unions, multi-line unions, generic references). We don't
// run the full generator here — we just exercise the same primitives the
// generator uses via inline source strings.

describe('AST primitives — fragile cases', () => {
 function inferUnionFromSource(src: string, propName: string): string[] | undefined {
 const sf = ts.createSourceFile('fixture.ts', src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
 let union: string[] | undefined
 function visit(node: ts.Node) {
 if (ts.isPropertySignature(node) && node.name && ts.isIdentifier(node.name) && node.name.text === propName) {
 if (node.type) union = collectStringLiteralUnion(node.type)
 }
 ts.forEachChild(node, visit)
 }
 visit(sf)
 return union
 }

 it('handles parenthesised unions: `(\'a\' | \'b\')`', () => {
 const src = `interface X { kind?: ('a' | 'b') }`
 expect(inferUnionFromSource(src, 'kind')).toEqual(['a', 'b'])
 })

 it('handles multi-line unions split across lines', () => {
 const src = `interface X {\n kind?:\n | 'a'\n | 'b'\n | 'c'\n}`
 expect(inferUnionFromSource(src, 'kind')).toEqual(['a', 'b', 'c'])
 })

 it('bails out on mixed `string`-keyword unions', () => {
 const src = `interface X { kind?: 'a' | 'b' | string }`
 expect(inferUnionFromSource(src, 'kind')).toBeUndefined()
 })
})
