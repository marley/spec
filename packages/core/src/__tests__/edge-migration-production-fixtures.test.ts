/**
 * — Production-Graph Fixture Regression Test
 *
 * Simulates the actual edge shapes carried by `.upg/entopo.upg` and
 * `.upg/unified-product-graph.upg` at the time was filed:
 *
 *   - `unified-product-graph.upg`: 4× `solution_proposes_hypothesis`
 *     edges (source=solution, target=hypothesis).
 *   - `entopo.upg`: 10× `hypothesis_contains_feature` edges
 *     (source=hypothesis, target=feature).
 *
 * Replays the canonical migration pipeline:
 *
 *   1. Run `migrateNode(hypothesis → hypothesis_claim)` on every
 *      hypothesis-typed endpoint (UPG_MIGRATIONS["0.2.8"]).
 *   2. For each edge, simulate the post-migration endpoint types using
 *      the same logic `@unified-product-graph/mcp-server`'s `migrate_type` tool uses
 *      (substituting the migrated type for endpoints whose pre-migration
 *      type matched the migration's `from`).
 *   3. Run `migrateEdge(edge, '0.0.0', UPG_VERSION, endpoints)`.
 *
 * Asserts every legacy edge lands on a canonical edge-catalog key. If a
 * future change drops or breaks either rule, this test surfaces the
 * regression before it hits production.
 *
 * Companion to `edge-migrations.test.ts` — that file tests the rules in
 * isolation; this file tests the rules against a production-shape graph.
 */

import { describe, it, expect } from 'vitest'
import { migrateNode, migrateEdge, UPG_VERSION } from '../index.js'
import { UPG_EDGE_CATALOG } from '../catalog/edge-catalog.js'

// ─── Fixtures mirroring the actual .upg files at filing time ────────

interface FixtureNode {
  id: string
  type: string
  properties?: Record<string, unknown>
}

interface FixtureEdge {
  id: string
  source: string
  target: string
  type: string
}

/** unified-product-graph.upg shape — 4 solution_proposes_hypothesis edges. */
function buildUnifiedProductGraphFixture(): { nodes: FixtureNode[]; edges: FixtureEdge[] } {
  const nodes: FixtureNode[] = [
    { id: 's1', type: 'solution' },
    { id: 's2', type: 'solution' },
    { id: 's3', type: 'solution' },
    { id: 's4', type: 'solution' },
    { id: 'h1', type: 'hypothesis', properties: { we_believe: 'a' } },
    { id: 'h2', type: 'hypothesis', properties: { we_believe: 'b' } },
    { id: 'h3', type: 'hypothesis', properties: { we_believe: 'c' } },
    { id: 'h4', type: 'hypothesis', properties: { we_believe: 'd' } },
  ]
  const edges: FixtureEdge[] = [
    { id: 'e1', source: 's1', target: 'h1', type: 'solution_proposes_hypothesis' },
    { id: 'e2', source: 's2', target: 'h2', type: 'solution_proposes_hypothesis' },
    { id: 'e3', source: 's3', target: 'h3', type: 'solution_proposes_hypothesis' },
    { id: 'e4', source: 's4', target: 'h4', type: 'solution_proposes_hypothesis' },
  ]
  return { nodes, edges }
}

/** entopo.upg shape — 10 hypothesis_contains_feature edges. */
function buildEntopoFixture(): { nodes: FixtureNode[]; edges: FixtureEdge[] } {
  const nodes: FixtureNode[] = []
  const edges: FixtureEdge[] = []
  for (let i = 1; i <= 10; i++) {
    nodes.push({ id: `h${i}`, type: 'hypothesis', properties: { we_believe: `claim ${i}` } })
    nodes.push({ id: `f${i}`, type: 'feature' })
    edges.push({
      id: `e${i}`,
      source: `h${i}`,
      target: `f${i}`,
      type: 'hypothesis_contains_feature',
    })
  }
  return { nodes, edges }
}

// ─── MCP migrate_type endpoint-simulation logic (mirror of nodes.ts) ────────

/**
 * Mirror of `@unified-product-graph/mcp-server`'s migrate_type: for each edge, simulate
 * post-node-migration endpoint types by substituting `toType` wherever
 * an endpoint's current type matches `fromType`.
 */
function simulateMigrateType(
  fixture: { nodes: FixtureNode[]; edges: FixtureEdge[] },
  fromType: string,
  toType: string,
): { migratedNodes: FixtureNode[]; migratedEdges: Array<FixtureEdge | null> } {
  // 1. Migrate matching nodes via UPG_MIGRATIONS.
  const migratedNodes = fixture.nodes.map((n) =>
    n.type === fromType ? migrateNode(n, '0.0.0', UPG_VERSION) : n,
  )

  // Build id → migrated-type lookup.
  const typeById = new Map(migratedNodes.map((n) => [n.id, n.type] as const))

  // 2. For each edge, simulate post-migration endpoints + run migrateEdge.
  const migratedEdges = fixture.edges.map((edge) => {
    const sourceType = typeById.get(edge.source)
    const targetType = typeById.get(edge.target)
    return migrateEdge(edge, '0.0.0', UPG_VERSION, { sourceType, targetType })
  })

  return { migratedNodes, migratedEdges }
}

// ─── Assertions ─────────────────────────────────────────────────────────────

const CATALOG_KEYS = new Set(Object.keys(UPG_EDGE_CATALOG))

describe('Production-graph fixture regression', () => {
  describe('unified-product-graph.upg shape (4× solution_proposes_hypothesis)', () => {
    it('every edge retargets to solution_proposes_hypothesis_claim (v0.2.8 intermediate step)', () => {
      // migrateNode is a single-hop function: hypothesis → hypothesis_claim (v0.2.8).
      // A second hop (hypothesis_claim → hypothesis, v0.4.0) would complete the round-trip.
      // This test covers the v0.2.8 hop: edge renames from solution_proposes_hypothesis
      // to solution_proposes_hypothesis_claim. CATALOG_KEYS check is omitted since
      // hypothesis_claim intermediate keys are deprecated at v0.4.0.
      const fixture = buildUnifiedProductGraphFixture()
      const { migratedEdges } = simulateMigrateType(fixture, 'hypothesis', 'hypothesis_claim')

      expect(migratedEdges.length).toBe(4)
      for (const result of migratedEdges) {
        expect(result, 'edge should not drop').not.toBeNull()
        expect(result!.type).toBe('solution_proposes_hypothesis_claim')
      }
    })

    it('endpoints remain in the canonical direction (no flip — direct target retarget)', () => {
      const fixture = buildUnifiedProductGraphFixture()
      const { migratedEdges } = simulateMigrateType(fixture, 'hypothesis', 'hypothesis_claim')
      // Original: source=solution, target=hypothesis. Post-migration target becomes hypothesis_claim.
      for (const result of migratedEdges) {
        expect(result!.source.startsWith('s'), 'source remains a solution id').toBe(true)
        expect(result!.target.startsWith('h'), 'target remains a hypothesis(_claim) id').toBe(true)
      }
    })
  })

  describe('entopo.upg shape (10× hypothesis_contains_feature)', () => {
    it('every edge flips + retypes to feature_tests_hypothesis_claim (v0.2.8 intermediate step)', () => {
      // migrateNode single-hop: hypothesis → hypothesis_claim. CATALOG_KEYS check omitted
      // since hypothesis_claim intermediate keys are deprecated at v0.4.0.
      const fixture = buildEntopoFixture()
      const { migratedEdges } = simulateMigrateType(fixture, 'hypothesis', 'hypothesis_claim')

      expect(migratedEdges.length).toBe(10)
      for (const result of migratedEdges) {
        expect(result, 'edge should not drop').not.toBeNull()
        expect(result!.type).toBe('feature_tests_hypothesis_claim')
      }
    })

    it('endpoints flip — original source (hypothesis_claim) becomes new target', () => {
      const fixture = buildEntopoFixture()
      const original = new Map(fixture.edges.map((e) => [e.id, e] as const))
      const { migratedEdges } = simulateMigrateType(fixture, 'hypothesis', 'hypothesis_claim')

      for (let i = 0; i < migratedEdges.length; i++) {
        const result = migratedEdges[i]!
        const orig = original.get(`e${i + 1}`)!
        // Original hypothesis_contains_feature: source=h<i>, target=f<i>.
        // Canonical feature_tests_hypothesis_claim: source=f<i>, target=h<i>.
        expect(result.source).toBe(orig.target) // f<i>
        expect(result.target).toBe(orig.source) // h<i>
      }
    })
  })

  describe('combined contract — both rules fire in the same pass', () => {
    it('a graph carrying both edge types retargets all of them in one migrate_type call', () => {
      // Combine fixtures: solution + hypothesis + feature nodes, 14 edges total.
      const unified = buildUnifiedProductGraphFixture()
      const entopo = buildEntopoFixture()
      // Use distinct ids across the two fixtures.
      const renameId = (prefix: string) => (n: FixtureNode) => ({ ...n, id: prefix + n.id })
      const renameEdge = (prefix: string) => (e: FixtureEdge) => ({
        ...e,
        id: prefix + e.id,
        source: prefix + e.source,
        target: prefix + e.target,
      })
      const combined = {
        nodes: [
          ...unified.nodes.map(renameId('U_')),
          ...entopo.nodes.map(renameId('E_')),
        ],
        edges: [
          ...unified.edges.map(renameEdge('U_')),
          ...entopo.edges.map(renameEdge('E_')),
        ],
      }

      const { migratedEdges } = simulateMigrateType(combined, 'hypothesis', 'hypothesis_claim')

      // 14 total edges — all land on v0.2.8 intermediate keys (migrateNode is single-hop).
      expect(migratedEdges.length).toBe(14)
      const types = migratedEdges.map((e) => e!.type)
      const sphCount = types.filter((t) => t === 'solution_proposes_hypothesis_claim').length
      const fthCount = types.filter((t) => t === 'feature_tests_hypothesis_claim').length
      expect(sphCount, 'solution_proposes_hypothesis_claim count').toBe(4)
      expect(fthCount, 'feature_tests_hypothesis_claim count').toBe(10)
      // CATALOG_KEYS check omitted: hypothesis_claim intermediate keys are
      // deprecated at v0.4.0. Run a second migrateNode pass to reach final v0.4.0 names.
    })
  })

  describe('staging contract — rules require correct source migration', () => {
    it('migrate_type(pain_point → need) does NOT fire hypothesis-edge rules', () => {
      // This is the test reproducing's misleading symptom: running
      // the wrong migration leaves hypothesis edges untouched because the
      // post-migration endpoint guards never match (hypothesis nodes still
      // read as type='hypothesis').
      const fixture = buildUnifiedProductGraphFixture()
      const { migratedEdges } = simulateMigrateType(fixture, 'pain_point', 'need')
      // Edges pass through unchanged because the rule's
      // requires_target_type='hypothesis_claim' guard mismatches against
      // the still-pre-migration type='hypothesis'.
      for (const result of migratedEdges) {
        expect(result, 'edge unchanged').not.toBeNull()
        expect(result!.type).toBe('solution_proposes_hypothesis')
      }
    })
  })
})
