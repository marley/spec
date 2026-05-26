/**
 * UPG Framework Shape Audit — CLI
 *
 * Lints `UPG_FRAMEWORKS` for structural inconsistencies between the
 * `data`, `presentation`, `slots`, and `education` layers. Audit rules
 * live in `src/frameworks/audit-shape.ts` so they can be re-used by
 * the Vitest gate at `src/__tests__/framework-shape-audit.test.ts`.
 *
 * Issue kinds:
 *
 *   PRESENTATION_COLUMN_REFERENCES_ENTITY_TYPE   (BLOCKER)
 *     A column in a `table` layout names an entity-type (e.g.
 *     `metric`, `epic`) instead of a declared property. A renderer
 *     using this would put entities into the wrong column.
 *
 *   PRESENTATION_COLUMN_UNKNOWN_PROPERTY         (WARNING)
 *     A column references a property that is neither declared in
 *     `data.required_properties[<entity_type>]`, a computed_property
 *     name, nor a universal node field (title/description/status).
 *
 *   COMPUTED_EXPRESSION_UNDEFINED_VARIABLE       (BLOCKER)
 *     A `data.computed_properties[*].expression` references an
 *     identifier that resolves to nothing.
 *
 *   SLOT_DATA_DRIFT                              (BLOCKER / WARNING)
 *     A `slots[*].entityTypeId` is missing from
 *     `data.entity_types[*].type` (BLOCKER), or vice-versa (WARNING).
 *
 *   WHEN_TO_USE_BOILERPLATE                      (WARNING)
 *     `education.when_to_use` bullets are >50% identical (after
 *     normalisation) to other frameworks in the same category.
 *
 * Output:
 *   Default: human-readable text report to stdout
 *   `--json`: full drift report as JSON to stdout
 *   `--summary`: short counts only
 *
 * Exit code is always 0 — failures are surfaced by the matching
 * Vitest gate.
 *
 * Usage:
 *   npx tsx scripts/audit-framework-shape.ts
 *   npx tsx scripts/audit-framework-shape.ts --json
 *   npx tsx scripts/audit-framework-shape.ts --summary
 */

import { runFrameworkShapeAudit } from '../src/frameworks/audit-shape.js'

function main(): void {
  const flag = process.argv[2]
  const result = runFrameworkShapeAudit()

  if (flag === '--json') {
    console.log(JSON.stringify(result, null, 2))
    return
  }

  if (flag === '--summary') {
    console.log(JSON.stringify(result.summary, null, 2))
    return
  }

  // Default: human-readable text
  const lines: string[] = []
  lines.push('# UPG Framework Shape Audit')
  lines.push('')
  lines.push(`Generated: ${new Date().toISOString()}`)
  lines.push('')
  lines.push('## Summary')
  lines.push('')
  lines.push(`- Total frameworks audited: **${result.summary.total_frameworks}**`)
  lines.push(`- Frameworks clean (zero issues): **${result.summary.clean_frameworks}**`)
  lines.push(`- Total issues: **${result.summary.total_issues}**`)
  lines.push(`  - Blockers: **${result.summary.by_severity.blocker}**`)
  lines.push(`  - Warnings: **${result.summary.by_severity.warning}**`)
  lines.push('')
  lines.push('### Issues by kind')
  for (const [kind, count] of Object.entries(result.summary.by_kind)) {
    lines.push(`- \`${kind}\`: ${count}`)
  }
  lines.push('')

  const reportsWithIssues = result.reports.filter((r) => r.issues.length > 0)
  if (reportsWithIssues.length === 0) {
    lines.push('All frameworks pass shape audit.')
  } else {
    lines.push(`## ${reportsWithIssues.length} frameworks with issues`)
    lines.push('')
    for (const r of reportsWithIssues) {
      lines.push(`### \`${r.framework_id}\` (${r.category}) — ${r.issues.length} issues`)
      for (const i of r.issues) {
        lines.push(`- **[${i.severity}] ${i.kind}** — ${i.location}`)
        lines.push(`  - ${i.detail}`)
      }
      lines.push('')
    }
  }

  console.log(lines.join('\n'))
}

main()
