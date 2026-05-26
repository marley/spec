/**
 * Framework Shape Audit — Regression Gates
 *
 * Wires `scripts/audit-framework-shape.ts` into vitest as a CI gate.
 *
 *   Blocker-class issues fail the build for the four documented showcase
 *   frameworks:
 *     - rice-scoring
 *     - kano-model
 *     - wardley-map
 *     - business-model-canvas
 *
 *   The full 216-framework sweep is reported via a console.warn but does
 *   not fail the build — wider remediation is tracked separately and is
 *   out of scope for this PR.
 *
 *   A negative test runs the linter against an intentionally-broken
 *   fixture to prove the detector actually fires.
 */

import { describe, it, expect } from 'vitest'
import { runFrameworkShapeAudit } from '../frameworks/audit-shape.js'
import type { UPGFramework } from '../frameworks/types.js'

describe('Framework Shape Audit — showcase frameworks must be clean', () => {
  const SHOWCASE_IDS = [
    'rice-scoring',
    'kano-model',
    'wardley-map',
    'business-model-canvas',
  ] as const

  const result = runFrameworkShapeAudit()
  const byId = new Map(result.reports.map((r) => [r.framework_id, r]))

  for (const id of SHOWCASE_IDS) {
    it(`${id} has zero blocker-class issues`, () => {
      const report = byId.get(id)
      expect(report, `Framework "${id}" missing from UPG_FRAMEWORKS`).toBeDefined()
      const blockers = (report?.issues ?? []).filter((i) => i.severity === 'blocker')
      expect(
        blockers,
        `${id} has blocker issues:\n${blockers.map((b) => `  - [${b.kind}] ${b.location}: ${b.detail}`).join('\n')}`,
      ).toEqual([])
    })
  }
})

describe('Framework Shape Audit — sweep report', () => {
  it('records baseline blocker count for the wider catalog (warn-only)', () => {
    // This test is informational. It does NOT fail when blockers exist in
    // non-showcase frameworks — wider remediation lives in a follow-up PR.
    // We assert only that the audit ran and produced numeric counts.
    const result = runFrameworkShapeAudit()
    expect(result.summary.total_frameworks).toBeGreaterThan(0)
    expect(result.summary.by_severity.blocker).toBeGreaterThanOrEqual(0)

    if (result.summary.by_severity.blocker > 0) {
      console.warn(
        `[framework-shape-audit] ${result.summary.by_severity.blocker} blocker issues across ` +
          `${result.summary.total_frameworks - result.summary.clean_frameworks} non-clean frameworks. ` +
          `Showcase frameworks are gated; wider sweep is deferred.`,
      )
    }
  })

  it('PRESENTATION_COLUMN_REFERENCES_ENTITY_TYPE is zero across all frameworks (bulk fix gate)', () => {
    // UPG-521 bulk fix: all 212 column-drift frameworks repaired.
    // This category must stay at zero — any regression here is a blocker.
    const result = runFrameworkShapeAudit()
    const count = result.summary.by_kind.PRESENTATION_COLUMN_REFERENCES_ENTITY_TYPE
    const offenders = result.reports
      .filter((r) => r.issues.some((i) => i.kind === 'PRESENTATION_COLUMN_REFERENCES_ENTITY_TYPE'))
      .map((r) => `  - ${r.framework_id}: ${r.issues.filter((i) => i.kind === 'PRESENTATION_COLUMN_REFERENCES_ENTITY_TYPE').map((i) => i.location).join(', ')}`)
    expect(
      count,
      `${count} PRESENTATION_COLUMN_REFERENCES_ENTITY_TYPE blocker(s) still present:\n${offenders.join('\n')}`,
    ).toBe(0)
  })
})

describe('Framework Shape Audit — negative tests (detector self-check)', () => {
  it('flags a column that references an entity type instead of a property', () => {
    const fixture: UPGFramework = {
      id: 'fixture-bad-column',
      name: 'Bad Column Fixture',
      version: '0.0.0',
      description: '',
      category: 'prioritization',
      origin: { type: 'custom' },
      tags: [],
      data: {
        entity_types: [{ type: 'feature', role: 'item' }],
        required_properties: {
          feature: [
            { property: 'reach', type: 'number', required: true },
          ],
        },
      },
      structure: { pattern: 'table' },
      presentation: {
        layout: {
          type: 'table',
          columns: [
            // BAD: should be `reach` (the declared property), not `metric` (an entity type)
            { property: 'metric', label: 'Reach' },
          ],
        },
      },
      education: {
        purpose: '',
        core_question: '',
        when_to_use: [],
        when_not_to_use: [],
      },
    }

    const result = runFrameworkShapeAudit([fixture])
    const issues = result.reports[0].issues
    expect(issues.some((i) => i.kind === 'PRESENTATION_COLUMN_REFERENCES_ENTITY_TYPE')).toBe(true)
    expect(issues.find((i) => i.kind === 'PRESENTATION_COLUMN_REFERENCES_ENTITY_TYPE')?.severity).toBe(
      'blocker',
    )
  })

  it('flags a computed_property expression referencing an undefined identifier', () => {
    const fixture: UPGFramework = {
      id: 'fixture-bad-expression',
      name: 'Bad Expression Fixture',
      version: '0.0.0',
      description: '',
      category: 'prioritization',
      origin: { type: 'custom' },
      tags: [],
      data: {
        entity_types: [{ type: 'feature', role: 'item' }],
        required_properties: {
          feature: [
            { property: 'reach', type: 'number', required: true },
          ],
        },
        computed_properties: [
          {
            property: 'score',
            // BAD: `impact` is not declared
            expression: 'reach * impact',
            entity_type: 'feature',
          },
        ],
      },
      structure: { pattern: 'table' },
      presentation: {
        layout: { type: 'table', columns: [{ property: 'reach', label: 'Reach' }] },
      },
      education: {
        purpose: '',
        core_question: '',
        when_to_use: [],
        when_not_to_use: [],
      },
    }

    const result = runFrameworkShapeAudit([fixture])
    const issues = result.reports[0].issues
    const undef = issues.find((i) => i.kind === 'COMPUTED_EXPRESSION_UNDEFINED_VARIABLE')
    expect(undef).toBeDefined()
    expect(undef?.severity).toBe('blocker')
    expect(undef?.detail).toContain('impact')
  })

  it('flags a slot whose entityTypeId is missing from data.entity_types', () => {
    const fixture: UPGFramework = {
      id: 'fixture-slot-data-drift',
      name: 'Slot Drift Fixture',
      version: '0.0.0',
      description: '',
      category: 'prioritization',
      origin: { type: 'custom' },
      tags: [],
      slots: [
        // BAD: persona slot but persona is not in data.entity_types
        { label: 'Anchor', entityTypeId: 'persona' },
      ],
      data: {
        entity_types: [{ type: 'feature', role: 'item' }],
        required_properties: {},
      },
      structure: { pattern: 'collection' },
      presentation: {
        layout: { type: 'grid', groupBy: 'type' },
      },
      education: {
        purpose: '',
        core_question: '',
        when_to_use: [],
        when_not_to_use: [],
      },
    }

    const result = runFrameworkShapeAudit([fixture])
    const issues = result.reports[0].issues
    const drift = issues.find(
      (i) => i.kind === 'SLOT_DATA_DRIFT' && i.severity === 'blocker',
    )
    expect(drift).toBeDefined()
    expect(drift?.detail).toContain('persona')
  })

  it('does not flag a clean framework', () => {
    const fixture: UPGFramework = {
      id: 'fixture-clean',
      name: 'Clean Fixture',
      version: '0.0.0',
      description: '',
      category: 'prioritization',
      origin: { type: 'custom' },
      tags: [],
      slots: [{ label: 'Items', entityTypeId: 'feature' }],
      data: {
        entity_types: [{ type: 'feature', role: 'item' }],
        required_properties: {
          feature: [
            { property: 'reach', type: 'number', required: true },
            { property: 'impact', type: 'number', required: true },
          ],
        },
        computed_properties: [
          {
            property: 'score',
            expression: 'reach * impact',
            entity_type: 'feature',
          },
        ],
      },
      structure: { pattern: 'table' },
      presentation: {
        layout: {
          type: 'table',
          columns: [
            { property: 'title', label: 'Item' },
            { property: 'reach', label: 'Reach' },
            { property: 'impact', label: 'Impact' },
            { property: 'score', label: 'Score' },
          ],
        },
      },
      education: {
        purpose: '',
        core_question: '',
        when_to_use: [],
        when_not_to_use: [],
      },
    }

    const result = runFrameworkShapeAudit([fixture])
    const blockers = result.reports[0].issues.filter((i) => i.severity === 'blocker')
    expect(blockers).toEqual([])
  })
})
