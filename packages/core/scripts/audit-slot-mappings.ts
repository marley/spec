#!/usr/bin/env npx tsx
/**
 * Audit framework slot entity type mappings
 *
 * Reads every framework definition, extracts slots, and flags
 * suspicious entityTypeId mappings based on label-keyword rules.
 *
 * Run:  npx tsx packages/upg-spec/scripts/audit-slot-mappings.ts
 */

import { FRAMEWORKS } from '../src/frameworks/definitions/index.js'

// ─── Types ───────────────────────────────────────────────────────────────────

interface Flag {
  framework: string
  frameworkId: string
  category: string
  slotLabel: string
  currentType: string
  suggestedTypes: string[]
  rule: string
  severity: 'error' | 'warning' | 'info'
}

// ─── Label → expected entity type rules ──────────────────────────────────────
//
// Each rule: [regex to match label, array of acceptable entityTypeIds, severity]
// If the slot's entityTypeId is NOT in the acceptable list, it gets flagged.

type Rule = {
  name: string
  labelPattern: RegExp
  acceptableTypes: string[]
  severity: 'error' | 'warning'
  /** If set, only apply this rule to these framework categories */
  categories?: string[]
}

const RULES: Rule[] = [
  // ── Features & capabilities ───────────────────────────────────────────────
  {
    name: 'feature-slot',
    labelPattern: /\b(feature|functionality|capabilit|product feature|enhancement)\b/i,
    acceptableTypes: ['feature', 'feature_area', 'feature_request', 'competitor_feature'],
    severity: 'error',
  },
  {
    name: 'must-have-should-have',
    labelPattern: /\b(must.?have|should.?have|could.?have|won.?t.?have|nice.?to.?have)\b/i,
    acceptableTypes: ['feature', 'feature_area', 'user_story', 'need', 'epic'],
    severity: 'error',
  },

  // ── Problems & needs ──────────────────────────────────────────────────────
  {
    name: 'problem-slot',
    labelPattern: /\b(problem|pain\s*point|challenge|friction|struggle|blocker|barrier|obstacle|business problem)\b/i,
    acceptableTypes: ['need', 'opportunity', 'bug', 'risk', 'root_cause', 'symptom'],
    severity: 'error',
  },
  {
    name: 'need-slot',
    labelPattern: /\b(need|requirement|demand|expectation|job.?to.?be.?done)\b/i,
    acceptableTypes: ['need', 'job', 'desired_outcome', 'compliance_requirement', 'acceptance_criterion'],
    severity: 'warning',
  },

  // ── Goals & outcomes ──────────────────────────────────────────────────────
  {
    name: 'goal-outcome-slot',
    labelPattern: /\b(goal|target outcome|expected outcome|desired outcome|key result|success measure|success metric)\b/i,
    acceptableTypes: ['outcome', 'desired_outcome', 'objective', 'key_result', 'metric', 'success_milestone'],
    severity: 'error',
  },
  {
    name: 'objective-slot',
    labelPattern: /\b(objective)\b/i,
    acceptableTypes: ['objective', 'outcome', 'key_result', 'team_okr'],
    severity: 'warning',
  },

  // ── Metrics & measurement ─────────────────────────────────────────────────
  {
    name: 'metric-slot',
    labelPattern: /\b(metric|kpi|measure|indicator|score|ratio|rate|benchmark)\b/i,
    acceptableTypes: [
      'metric', 'key_result', 'service_level_indicator', 'service_level_objective',
      'eval_benchmark', 'customer_health_score', 'test_coverage_report',
    ],
    severity: 'error',
  },

  // ── Heuristics & guidelines ───────────────────────────────────────────────
  {
    name: 'heuristic-guideline-slot',
    labelPattern: /\b(heuristic|guideline|principle|standard|best practice|rule|checklist)\b/i,
    acceptableTypes: [
      'a11y_guideline', 'a11y_standard', 'design_guideline', 'design_pattern',
      'compliance_requirement', 'compliance_framework', 'security_policy',
      'data_quality_rule', 'ai_guardrail',
    ],
    severity: 'error',
  },

  // ── Personas & users ──────────────────────────────────────────────────────
  {
    name: 'persona-slot',
    labelPattern: /\b(persona|user type|customer type|archetype|user segment)\b/i,
    acceptableTypes: ['persona', 'ideal_customer_profile', 'market_segment', 'behavioral_segment'],
    severity: 'error',
  },

  // ── Hypotheses ────────────────────────────────────────────────────────────
  {
    name: 'hypothesis-slot',
    labelPattern: /\b(hypothesis|hypotheses|belief|bet|leap of faith)\b/i,
    acceptableTypes: ['hypothesis', 'assumption'],
    severity: 'warning',
  },

  // ── Experiments & tests ───────────────────────────────────────────────────
  {
    name: 'experiment-slot',
    labelPattern: /\b(experiment|test|validation|a\/b test|split test|trial)\b/i,
    acceptableTypes: [
      'experiment', 'test_plan', 'test_case', 'variant', 'ai_experiment',
      'penetration_test', 'test_suite', 'qa_session', 'regression_test',
    ],
    severity: 'warning',
  },

  // ── Risks ─────────────────────────────────────────────────────────────────
  {
    name: 'risk-slot',
    labelPattern: /\b(risk|threat|vulnerabilit|weakness)\b/i,
    acceptableTypes: [
      'risk', 'threat', 'vulnerability', 'competitor_feature', 'risk_register',
      'security_control', 'threat_model',
    ],
    severity: 'error',
  },

  // ── Competitors ───────────────────────────────────────────────────────────
  {
    name: 'competitor-slot',
    labelPattern: /\b(competitor|rival|alternative|competing product)\b/i,
    acceptableTypes: ['competitor', 'competitor_feature', 'competitive_analysis', 'competitive_battle_card'],
    severity: 'error',
  },

  // ── User stories ──────────────────────────────────────────────────────────
  {
    name: 'user-story-slot',
    labelPattern: /\b(user stor|stories)\b/i,
    acceptableTypes: ['user_story', 'epic', 'feature'],
    severity: 'error',
  },

  // ── Flows & journeys ──────────────────────────────────────────────────────
  {
    name: 'flow-slot',
    labelPattern: /\b(user flow|workflow|process flow|task flow|flow)\b/i,
    acceptableTypes: [
      'user_flow', 'workflow_template', 'workflow_run', 'user_journey',
      'journey_step', 'data_flow', 'ci_pipeline', 'data_pipeline', 'funnel',
    ],
    severity: 'warning',
  },
  {
    name: 'journey-slot',
    labelPattern: /\b(journey|customer journey|user journey)\b/i,
    acceptableTypes: ['user_journey', 'journey_step', 'journey_phase', 'journey_action', 'customer_journey_stage'],
    severity: 'warning',
  },

  // ── Insights & learnings ──────────────────────────────────────────────────
  {
    name: 'insight-slot',
    labelPattern: /\b(insight|finding|takeaway|learning|lesson)\b/i,
    acceptableTypes: ['insight', 'learning', 'observation', 'research_question'],
    severity: 'warning',
  },

  // ── Assumptions & decisions ───────────────────────────────────────────────
  {
    name: 'assumption-slot',
    labelPattern: /\b(assumption)\b/i,
    acceptableTypes: ['assumption', 'hypothesis'],
    severity: 'warning',
  },
  {
    name: 'decision-slot',
    labelPattern: /\b(decision)\b/i,
    acceptableTypes: ['decision', 'change_request'],
    severity: 'warning',
  },

  // ── Initiatives & epics ───────────────────────────────────────────────────
  {
    name: 'initiative-slot',
    labelPattern: /\b(initiative|program|workstream)\b/i,
    acceptableTypes: ['initiative', 'program', 'strategic_theme', 'epic'],
    severity: 'warning',
  },
  {
    name: 'epic-slot',
    labelPattern: /\b(epic)\b/i,
    acceptableTypes: ['epic', 'initiative', 'feature_area'],
    severity: 'warning',
  },

  // ── Channels ──────────────────────────────────────────────────────────────
  {
    name: 'channel-slot',
    labelPattern: /\b(channel|acquisition channel|distribution channel|marketing channel)\b/i,
    acceptableTypes: [
      'acquisition_channel', 'distribution_channel', 'marketing_channel',
    ],
    severity: 'warning',
  },

  // ── Funnel ────────────────────────────────────────────────────────────────
  {
    name: 'funnel-slot',
    labelPattern: /\b(funnel|stage|conversion|pipeline stage)\b/i,
    acceptableTypes: [
      'funnel', 'funnel_step', 'pipeline_stage', 'journey_phase',
      'customer_journey_stage',
    ],
    severity: 'warning',
  },

  // ── Strategy ──────────────────────────────────────────────────────────────
  {
    name: 'strategy-slot',
    labelPattern: /\b(strategy|strategic)\b/i,
    acceptableTypes: [
      'gtm_strategy', 'marketing_strategy', 'pricing_strategy',
      'content_strategy', 'strategic_theme', 'strategic_pillar',
      'release_strategy',
    ],
    severity: 'warning',
  },

  // ── Observation (should be limited to research context) ───────────────────
  {
    name: 'observation-overuse',
    labelPattern: /\b(screen|onboarding|interface|navigation|layout|component|interaction|usability|accessibility|heuristic|flexibility|match|consistency|error prevention|recognition|efficiency|aesthetic|help|documentation|control)\b/i,
    acceptableTypes: [
      'screen', 'screen_state', 'user_flow', 'design_component', 'design_pattern',
      'design_guideline', 'a11y_guideline', 'a11y_issue', 'a11y_annotation',
      'a11y_standard', 'interaction_spec', 'wireframe', 'annotation',
    ],
    severity: 'warning',
    categories: ['design', 'ux-research', 'accessibility'],
  },

  // ── Accessibility-specific ────────────────────────────────────────────────
  {
    name: 'a11y-issue-slot',
    labelPattern: /\b(issue|violation|failure|non.?compliance|barrier)\b/i,
    acceptableTypes: ['a11y_issue', 'bug', 'risk', 'vulnerability', 'symptom', 'need', 'root_cause'],
    severity: 'warning',
    categories: ['accessibility'],
  },
  {
    name: 'a11y-audit-slot',
    labelPattern: /\b(audit|assessment|review|evaluation)\b/i,
    acceptableTypes: ['a11y_audit', 'security_audit', 'security_review', 'qa_session', 'research_study'],
    severity: 'warning',
    categories: ['accessibility', 'security', 'qa-testing'],
  },

  // ── Engineering-specific ──────────────────────────────────────────────────
  {
    name: 'service-slot',
    labelPattern: /\b(service|microservice|api|endpoint)\b/i,
    acceptableTypes: [
      'service', 'api_contract', 'api_endpoint', 'external_api',
      'service_level_indicator', 'service_level_objective',
      'service_blueprint', 'service_level_agreement',
    ],
    severity: 'warning',
    categories: ['engineering', 'devops'],
  },

  // ── Content ───────────────────────────────────────────────────────────────
  {
    name: 'content-slot',
    labelPattern: /\b(content|article|blog|post|copy|messaging|message)\b/i,
    acceptableTypes: [
      'content_piece', 'content_strategy', 'content_theme', 'content_calendar',
      'knowledge_base_article', 'messaging', 'social_post', 'press_release',
      'email_sequence', 'brand_voice', 'documentation_template', 'document',
    ],
    severity: 'warning',
  },

  // ── Pricing ───────────────────────────────────────────────────────────────
  {
    name: 'pricing-slot',
    labelPattern: /\b(pricing|price|tier|plan|subscription|revenue)\b/i,
    acceptableTypes: [
      'pricing_tier', 'pricing_strategy', 'revenue_stream', 'subscription',
      'discount_strategy', 'trial_config', 'paywall', 'unit_economics',
    ],
    severity: 'warning',
  },

  // ── Stakeholder ───────────────────────────────────────────────────────────
  {
    name: 'stakeholder-slot',
    labelPattern: /\b(stakeholder|sponsor|owner|accountable|responsible)\b/i,
    acceptableTypes: ['stakeholder', 'role', 'team', 'contact', 'account'],
    severity: 'warning',
  },

  // ── Milestone & timeline ──────────────────────────────────────────────────
  {
    name: 'milestone-slot',
    labelPattern: /\b(milestone|deadline|checkpoint|gate|phase)\b/i,
    acceptableTypes: [
      'milestone', 'release', 'journey_phase', 'review_gate',
      'success_milestone', 'deliverable',
    ],
    severity: 'warning',
  },

  // ── Value proposition ─────────────────────────────────────────────────────
  {
    name: 'value-prop-slot',
    labelPattern: /\b(value proposition|unique value|differentiat)\b/i,
    acceptableTypes: ['value_proposition', 'positioning', 'proof_point'],
    severity: 'error',
  },

  // ── Release & launch ──────────────────────────────────────────────────────
  {
    name: 'release-launch-slot',
    labelPattern: /\b(release|launch|rollout|deployment|ship)\b/i,
    acceptableTypes: ['release', 'launch', 'deployment', 'release_strategy'],
    severity: 'warning',
  },

  // ── Tasks & work items ────────────────────────────────────────────────────
  {
    name: 'task-slot',
    labelPattern: /\b(task|action item|to.?do|work item)\b/i,
    acceptableTypes: ['task', 'agent_task', 'deliverable'],
    severity: 'warning',
  },

  // ── Dashboard & report ────────────────────────────────────────────────────
  {
    name: 'dashboard-report-slot',
    labelPattern: /\b(dashboard|report|analytics)\b/i,
    acceptableTypes: ['dashboard', 'report', 'data_product', 'test_coverage_report', 'status_report'],
    severity: 'warning',
  },
]

// ─── Known overrides: manually verified as correct despite rule match ────────
// Format: "frameworkId::slotLabel" → true
const KNOWN_GOOD: Set<string> = new Set([
  // RICE: these slots are scoring dimensions, not standalone entities
  'rice-scoring::Reach',
  'rice-scoring::Impact',
  'rice-scoring::Confidence',
  'rice-scoring::Effort',
])

// ─── Run audit ───────────────────────────────────────────────────────────────

const flags: Flag[] = []
let totalSlots = 0
let totalFrameworks = 0

for (const fw of FRAMEWORKS) {
  totalFrameworks++
  if (!fw.slots || fw.slots.length === 0) continue

  for (const slot of fw.slots) {
    totalSlots++
    const key = `${fw.id}::${slot.label}`
    if (KNOWN_GOOD.has(key)) continue

    for (const rule of RULES) {
      // Category filter
      if (rule.categories && !rule.categories.includes(fw.category)) continue

      if (rule.labelPattern.test(slot.label)) {
        if (!rule.acceptableTypes.includes(slot.entityTypeId)) {
          flags.push({
            framework: fw.name,
            frameworkId: fw.id,
            category: fw.category,
            slotLabel: slot.label,
            currentType: slot.entityTypeId,
            suggestedTypes: rule.acceptableTypes,
            rule: rule.name,
            severity: rule.severity,
          })
        }
      }
    }
  }
}

// ─── Report ──────────────────────────────────────────────────────────────────

const errors = flags.filter((f) => f.severity === 'error')
const warnings = flags.filter((f) => f.severity === 'warning')

console.log('╔══════════════════════════════════════════════════════════════╗')
console.log('║       UPG Framework Slot Mapping — Audit Report            ║')
console.log('╚══════════════════════════════════════════════════════════════╝')
console.log()
console.log(`  Frameworks scanned: ${totalFrameworks}`)
console.log(`  Total slots:        ${totalSlots}`)
console.log(`  Flags found:        ${flags.length}`)
console.log(`    Errors:           ${errors.length}`)
console.log(`    Warnings:         ${warnings.length}`)
console.log()

// Group by category
const byCategory = new Map<string, Flag[]>()
for (const f of flags) {
  const cat = f.category
  if (!byCategory.has(cat)) byCategory.set(cat, [])
  byCategory.get(cat)!.push(f)
}

// Group by file (for cluster assignment)
const categoryToFile: Record<string, string> = {
  'prioritization': 'prioritization.ts',
  'discovery': 'discovery.ts',
  'business-model': 'business-model.ts',
  'metrics': 'metrics.ts',
  'growth': 'growth.ts',
  'validation': 'validation.ts',
  'research': 'research.ts',
  'planning': 'planning.ts',
  'competitive': 'competitive.ts',
  'strategy': 'strategy.ts',
  'engineering': 'engineering.ts',
  'team-process': 'team-process.ts',
  'devops': 'devops.ts',
  'security': 'security.ts',
  'qa-testing': 'qa-testing.ts',
  'ai-ml': 'ai-ml.ts',
  'agentic': 'agentic.ts',
  'design': 'design.ts',
  'ux-research': 'ux-research.ts',
  'user-understanding': 'user-understanding.ts',
  'accessibility': 'accessibility.ts',
  'feedback-voc': 'feedback-voc.ts',
  'marketing': 'marketing.ts',
  'go-to-market': 'go-to-market.ts',
  'sales': 'sales.ts',
  'pricing': 'pricing.ts',
  'data-analytics': 'data-analytics.ts',
  'legal-compliance': 'legal-compliance.ts',
  'customer-success': 'customer-success.ts',
  'program-mgmt': 'program-mgmt.ts',
  'content': 'content.ts',
  'education': 'education.ts',
  'partnerships': 'partnerships.ts',
  'localisation': 'localisation.ts',
  'portfolio': 'portfolio.ts',
}

// Print errors first, then warnings
for (const severity of ['error', 'warning'] as const) {
  const subset = flags.filter((f) => f.severity === severity)
  if (subset.length === 0) continue

  console.log(`${'═'.repeat(64)}`)
  console.log(`  ${severity === 'error' ? '🔴 ERRORS' : '🟡 WARNINGS'} (${subset.length})`)
  console.log(`${'═'.repeat(64)}`)
  console.log()

  for (const [cat, catFlags] of byCategory) {
    const catSubset = catFlags.filter((f) => f.severity === severity)
    if (catSubset.length === 0) continue

    const file = categoryToFile[cat] || `${cat}.ts`
    console.log(`  ┌── ${cat} (${file}) — ${catSubset.length} ${severity === 'error' ? 'errors' : 'warnings'}`)

    for (const f of catSubset) {
      console.log(`  │  ${f.framework} → "${f.slotLabel}"`)
      console.log(`  │    current: ${f.currentType}  →  suggested: ${f.suggestedTypes.slice(0, 3).join(' | ')}`)
      console.log(`  │    rule: ${f.rule}`)
    }
    console.log(`  └──`)
    console.log()
  }
}

// ─── Summary by file (for parallel cluster planning) ─────────────────────────

console.log()
console.log(`${'═'.repeat(64)}`)
console.log('  SUMMARY BY FILE')
console.log(`${'═'.repeat(64)}`)
console.log()
console.log('  File'.padEnd(35) + 'Errors'.padEnd(10) + 'Warnings'.padEnd(10) + 'Total')
console.log('  ' + '─'.repeat(60))

const byFile = new Map<string, { errors: number; warnings: number }>()
for (const f of flags) {
  const file = categoryToFile[f.category] || `${f.category}.ts`
  if (!byFile.has(file)) byFile.set(file, { errors: 0, warnings: 0 })
  const entry = byFile.get(file)!
  if (f.severity === 'error') entry.errors++
  else entry.warnings++
}

const sortedFiles = [...byFile.entries()].sort((a, b) => {
  const totalA = a[1].errors + a[1].warnings
  const totalB = b[1].errors + b[1].warnings
  return totalB - totalA
})

for (const [file, counts] of sortedFiles) {
  const total = counts.errors + counts.warnings
  console.log(`  ${file.padEnd(33)}${String(counts.errors).padEnd(10)}${String(counts.warnings).padEnd(10)}${total}`)
}

console.log()
console.log(`  Total: ${flags.length} flags across ${byFile.size} files`)
console.log()

// ─── JSON output for downstream scripts ──────────────────────────────────────

const jsonPath = new URL('./audit-report.json', import.meta.url).pathname
const reportData = {
  generated: new Date().toISOString(),
  summary: {
    frameworks: totalFrameworks,
    slots: totalSlots,
    errors: errors.length,
    warnings: warnings.length,
    total: flags.length,
  },
  flags: flags.map((f) => ({
    ...f,
    file: categoryToFile[f.category] || `${f.category}.ts`,
  })),
  byFile: Object.fromEntries(sortedFiles),
}

import { writeFileSync } from 'node:fs'
writeFileSync(jsonPath, JSON.stringify(reportData, null, 2))

console.log(`  JSON report: ${jsonPath}`)
