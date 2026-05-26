#!/usr/bin/env npx tsx
/**
 * Apply all ~320 entityTypeId slot fixes deterministically.
 *
 * Each entry: [frameworkId, slotLabel, oldType, newType]
 *
 * Run:  npx tsx packages/upg-spec/scripts/apply-slot-fixes.ts
 */

import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const DEFS_DIR = join(import.meta.dirname, '../src/display/frameworks/definitions')

// ─── All fixes from Clusters 2-6 ────────────────────────────────────────────
// Format: [frameworkId, slotLabel, correctEntityTypeId]

const FIXES: [string, string, string][] = [
  // ── Cluster 2: prioritization.ts, validation.ts, research.ts ──────────────
  // prioritization.ts (14 changes)
  ['rice-scoring', 'Reach', 'feature'],
  ['rice-scoring', 'Impact', 'feature'],
  ['rice-scoring', 'Confidence', 'feature'],
  ['rice-scoring', 'Effort', 'feature'],
  ['kano-model', 'Must-haves', 'feature'],
  ['kano-model', 'Delighters', 'feature'],
  ['ice-scoring', 'Impact', 'feature'],
  ['ice-scoring', 'Confidence', 'feature'],
  ['ice-scoring', 'Ease', 'feature'],
  ['eisenhower-matrix', 'Delegate', 'feature'],
  ['cost-of-delay', 'Risk Reduction', 'risk'],
  ['buy-a-feature', 'Participants', 'stakeholder'],
  ['opportunity-scoring', 'Opportunity Score', 'metric'],
  ['stack-ranking', 'Rationale', 'decision'],
  // validation.ts (4 changes)
  ['pretotyping', 'Go/No-Go', 'decision'],
  ['pretotyping', 'Product Idea', 'solution'],
  ['validation-board', 'Pivot or Persevere', 'decision'],
  ['experiment-card', 'Success Criteria', 'metric'],
  ['innovation-accounting', 'Pivot or Persevere', 'decision'],
  // research.ts (2 changes)
  ['empathy-map', 'Says', 'quote'],
  ['research-plan', 'Research Questions', 'research_question'],

  // ── Cluster 3: design.ts ──────────────────────────────────────────────────
  // Double Diamond (4)
  ['double-diamond', 'Discover', 'insight'],
  ['double-diamond', 'Define', 'design_question'],
  ['double-diamond', 'Develop', 'design_concept'],
  ['double-diamond', 'Deliver', 'prototype'],
  // Design Thinking Process (1)
  ['design-thinking-process', 'Test', 'experiment'],
  // Atomic Design (2)
  ['atomic-design', 'Molecules', 'design_component'],
  ['atomic-design', 'Templates', 'wireframe'],
  // Heuristic Evaluation (8)
  ['heuristic-evaluation', 'Match Between System & Real World', 'design_guideline'],
  ['heuristic-evaluation', 'User Control & Freedom', 'design_guideline'],
  ['heuristic-evaluation', 'Consistency & Standards', 'design_guideline'],
  ['heuristic-evaluation', 'Error Prevention', 'design_guideline'],
  ['heuristic-evaluation', 'Flexibility & Efficiency', 'design_guideline'],
  ['heuristic-evaluation', 'Aesthetic & Minimalist Design', 'design_guideline'],
  ['heuristic-evaluation', 'Help Users Recover from Errors', 'design_guideline'],
  ['heuristic-evaluation', 'Help & Documentation', 'design_guideline'],
  // Lean UX Canvas (7)
  ['lean-ux-canvas', 'Business Problem', 'need'],
  ['lean-ux-canvas', 'Business Outcomes', 'outcome'],
  ['lean-ux-canvas', 'Users', 'persona'],
  ['lean-ux-canvas', 'User Outcomes & Benefits', 'outcome'],
  ['lean-ux-canvas', 'Hypotheses', 'hypothesis'],
  ['lean-ux-canvas', 'Assumptions', 'assumption'],
  ['lean-ux-canvas', 'Experiments', 'experiment'],
  // Brand Identity Prism (3)
  ['kapferer-brand-identity-prism', 'Personality', 'brand_voice'],
  ['kapferer-brand-identity-prism', 'Culture', 'brand_identity'],
  ['kapferer-brand-identity-prism', 'Self-Image', 'brand_imagery'],
  // UI Audit (3)
  ['ui-audit', 'Spacing', 'design_token'],
  ['ui-audit', 'Components', 'design_component'],
  ['ui-audit', 'Icons', 'design_component'],
  // User Journey Map (6)
  ['user-journey-map', 'Awareness', 'journey_phase'],
  ['user-journey-map', 'Consideration', 'journey_phase'],
  ['user-journey-map', 'Acquisition', 'journey_phase'],
  ['user-journey-map', 'Onboarding', 'user_flow'],
  ['user-journey-map', 'Usage', 'journey_phase'],
  ['user-journey-map', 'Retention', 'journey_phase'],
  // Design Sprint (3)
  ['design-sprint', 'Decide', 'decision'],
  ['design-sprint', 'Prototype', 'prototype'],
  ['design-sprint', 'Test', 'experiment'],
  // Interaction Design Specification (2)
  ['interaction-design-specification', 'States', 'screen_state'],
  ['interaction-design-specification', 'Triggers', 'interaction_spec'],
  // Design Critique (3)
  ['design-critique', 'Observations', 'observation'],
  ['design-critique', 'Interpretations', 'insight'],
  ['design-critique', 'Action Items', 'task'],

  // ── Cluster 3: ux-research.ts ─────────────────────────────────────────────
  // Usability Test Plan (4)
  ['usability-test-plan', 'Objectives', 'research_question'],
  ['usability-test-plan', 'Tasks', 'task'],
  ['usability-test-plan', 'Scenarios', 'test_case'],
  ['usability-test-plan', 'Findings', 'insight'],
  // Diary Study (2)
  ['diary-study', 'Prompts', 'research_question'],
  ['diary-study', 'Themes', 'affinity_cluster'],
  // Card Sort Analysis (4)
  ['card-sort-analysis', 'Cards', 'design_concept'],
  ['card-sort-analysis', 'Categories', 'affinity_cluster'],
  ['card-sort-analysis', 'Dendrograms', 'observation'],
  ['card-sort-analysis', 'Recommendations', 'insight'],
  // JTBD Interview Script (2)
  ['jtbd-interview-script', 'Passive Looking', 'observation'],
  ['jtbd-interview-script', 'Deciding', 'insight'],
  // Research Ops Framework (3)
  ['research-ops-framework', 'Governance', 'research_plan'],
  ['research-ops-framework', 'Tools & Infrastructure', 'document'],
  ['research-ops-framework', 'Practices & Standards', 'design_guideline'],
  // Survey Design Framework (5)
  ['survey-design-framework', 'Research Questions', 'research_question'],
  ['survey-design-framework', 'Survey Design', 'research_plan'],
  ['survey-design-framework', 'Distribution', 'research_study'],
  ['survey-design-framework', 'Collection', 'survey_response'],
  ['survey-design-framework', 'Analysis', 'insight'],
  // Contextual Inquiry (1)
  ['contextual-inquiry', 'Interpretation', 'insight'],
  // Mixed Methods Matrix (3)
  ['mixed-methods-matrix', 'Qualitative\u2013Behavioural', 'research_study'],
  ['mixed-methods-matrix', 'Quantitative\u2013Attitudinal', 'research_study'],
  ['mixed-methods-matrix', 'Quantitative\u2013Behavioural', 'research_study'],
  // Five-Act Interview (2)
  ['five-act-interview', 'Context Questions', 'research_question'],
  ['five-act-interview', 'Introduce Prototype', 'prototype'],
  // Research Democratisation (4)
  ['research-democratisation-framework', 'Training', 'tutorial'],
  ['research-democratisation-framework', 'Guardrails', 'design_guideline'],
  ['research-democratisation-framework', 'Review Process', 'review_gate'],
  ['research-democratisation-framework', 'Insight Repository', 'insight'],

  // ── Cluster 3: accessibility.ts ───────────────────────────────────────────
  // WCAG Audit Checklist (6)
  ['wcag-audit-checklist', 'Perceivable', 'a11y_guideline'],
  ['wcag-audit-checklist', 'Operable', 'a11y_guideline'],
  ['wcag-audit-checklist', 'Robust', 'a11y_guideline'],
  ['wcag-audit-checklist', 'Level A', 'a11y_guideline'],
  ['wcag-audit-checklist', 'Level AA', 'a11y_guideline'],
  ['wcag-audit-checklist', 'Level AAA', 'a11y_guideline'],
  // POUR Principles (3)
  ['pour-principles', 'Perceivable', 'a11y_guideline'],
  ['pour-principles', 'Understandable', 'a11y_guideline'],
  ['pour-principles', 'Robust', 'a11y_guideline'],
  // Accessibility Maturity Model (4)
  ['accessibility-maturity-model', 'Informal', 'a11y_audit'],
  ['accessibility-maturity-model', 'Planned', 'a11y_audit'],
  ['accessibility-maturity-model', 'Managed', 'a11y_audit'],
  ['accessibility-maturity-model', 'Continuous', 'a11y_audit'],
  // Inclusive Design Principles (5)
  ['inclusive-design-principles', 'Consider Situation', 'a11y_guideline'],
  ['inclusive-design-principles', 'Be Consistent', 'a11y_guideline'],
  ['inclusive-design-principles', 'Give Control', 'a11y_guideline'],
  ['inclusive-design-principles', 'Prioritise Content', 'a11y_guideline'],
  ['inclusive-design-principles', 'Add Value', 'a11y_guideline'],
  // Screen Reader Testing Matrix (4)
  ['screen-reader-testing-matrix', 'NVDA + Firefox', 'a11y_audit'],
  ['screen-reader-testing-matrix', 'JAWS + Chrome', 'a11y_audit'],
  ['screen-reader-testing-matrix', 'JAWS + Edge', 'a11y_audit'],
  ['screen-reader-testing-matrix', 'TalkBack + Chrome', 'a11y_audit'],
  // Accessibility Annotation Kit (4)
  ['accessibility-annotation-kit', 'Landmarks', 'a11y_annotation'],
  ['accessibility-annotation-kit', 'Alt Text', 'a11y_annotation'],
  ['accessibility-annotation-kit', 'Focus Order', 'a11y_annotation'],
  ['accessibility-annotation-kit', 'ARIA Labels', 'a11y_annotation'],
  // Colour Contrast Audit (6)
  ['colour-contrast-audit', 'Foreground Colour', 'brand_colour'],
  ['colour-contrast-audit', 'Background Colour', 'brand_colour'],
  ['colour-contrast-audit', 'Contrast Ratio', 'metric'],
  ['colour-contrast-audit', 'Normal Text (4.5:1)', 'a11y_guideline'],
  ['colour-contrast-audit', 'Large Text (3:1)', 'a11y_guideline'],
  ['colour-contrast-audit', 'Pass / Fail', 'test_result'],
  // Cognitive Walkthrough (3)
  ['cognitive-walkthrough', 'Task Definition', 'task'],
  ['cognitive-walkthrough', 'Will User Try?', 'observation'],
  ['cognitive-walkthrough', 'Will User Progress?', 'observation'],

  // ── Cluster 3: user-understanding.ts ──────────────────────────────────────
  // Persona Canvas (4)
  ['persona-canvas', 'Goals', 'desired_outcome'],
  ['persona-canvas', 'Behaviours', 'observation'],
  ['persona-canvas', 'Jobs to Be Done', 'job'],
  ['persona-canvas', 'Quotes', 'quote'],
  // User Needs Matrix (3)
  ['user-needs-matrix', 'Importance', 'metric'],
  ['user-needs-matrix', 'Satisfaction', 'metric'],
  ['user-needs-matrix', 'Opportunity Score', 'metric'],
  // Customer Lifecycle Map (7)
  // customer-lifecycle-map: actual labels differ from AARRR names
  ['customer-lifecycle-map', 'Awareness', 'customer_journey_stage'],
  ['customer-lifecycle-map', 'Evaluation', 'customer_journey_stage'],
  ['customer-lifecycle-map', 'Purchase', 'customer_journey_stage'],
  ['customer-lifecycle-map', 'Onboarding', 'customer_journey_stage'],
  ['customer-lifecycle-map', 'Adoption', 'customer_journey_stage'],
  ['customer-lifecycle-map', 'Retention', 'customer_journey_stage'],
  ['customer-lifecycle-map', 'Advocacy', 'customer_journey_stage'],
  // Jobs Atlas (4)
  ['jobs-atlas', 'Related Jobs', 'job'],
  ['jobs-atlas', 'Job Steps', 'job_step'],
  ['jobs-atlas', 'Desired Outcomes', 'desired_outcome'],
  // Mental Model Diagram (4)
  ['mental-model-diagram', 'User Tasks (Top)', 'job'],
  ['mental-model-diagram', 'User Philosophies (Top)', 'observation'],
  ['mental-model-diagram', 'Product Support (Bottom)', 'feature'],
  ['mental-model-diagram', 'Gaps', 'need'],
  // User Segmentation Matrix (4)
  ['user-segmentation-matrix', 'Top-Left Segment', 'market_segment'],
  ['user-segmentation-matrix', 'Top-Right Segment', 'market_segment'],
  ['user-segmentation-matrix', 'Bottom-Left Segment', 'market_segment'],
  ['user-segmentation-matrix', 'Bottom-Right Segment', 'market_segment'],
  // Empathy Interview Synthesis (3)
  ['empathy-interview-synthesis', 'Patterns', 'affinity_cluster'],
  ['empathy-interview-synthesis', 'Insights', 'insight'],
  ['empathy-interview-synthesis', 'Implications', 'opportunity'],
  // Customer Forces Canvas (4)
  ['customer-forces-canvas', 'Push (Current Problem)', 'need'],
  ['customer-forces-canvas', 'Pull (New Solution)', 'value_proposition'],
  ['customer-forces-canvas', 'Anxiety (New Solution Risk)', 'risk'],
  ['customer-forces-canvas', 'Inertia (Habit of Present)', 'switching_cost'],
  // Value Proposition Fit (2)
  ['value-proposition-fit', 'Gain Creators', 'feature'],
  ['value-proposition-fit', 'Products & Services', 'value_proposition'],

  // ── Cluster 4: engineering.ts ─────────────────────────────────────────────
  ['tech-radar', 'Trial', 'library_dependency'],
  ['tech-radar', 'Assess', 'library_dependency'],
  ['tech-debt-tracker', 'Resolution', 'task'],
  ['ddd-context-map', 'Map Relationships', 'integration_pattern'],
  ['ddd-context-map', 'Define Integration Patterns', 'integration_pattern'],
  ['event-storming', 'Policies', 'domain_event'],
  ['event-storming', 'Read Models', 'read_model'],
  ['event-storming', 'External Systems', 'external_api'],
  ['cqrs-pattern', 'Aggregates', 'aggregate'],
  ['cqrs-pattern', 'Events', 'domain_event'],
  ['cqrs-pattern', 'Projections', 'read_model'],
  ['12-factor-app', 'Dependencies', 'library_dependency'],
  ['12-factor-app', 'Backing Services', 'service'],
  ['12-factor-app', 'Build, Release, Run', 'ci_pipeline'],
  ['12-factor-app', 'Logs', 'monitor'],
  ['architecture-fitness-functions', 'Threshold', 'metric'],
  ['architecture-fitness-functions', 'Frequency', 'ci_pipeline'],
  ['microservices-decomposition', 'Migration Strategy', 'integration_pattern'],
  ['feature-flag-strategy', 'Owner', 'stakeholder'],

  // ── Cluster 4: devops.ts ──────────────────────────────────────────────────
  ['incident-command-system', 'Assign Incident Commander', 'on_call_rotation'],
  ['incident-command-system', 'Mitigate', 'runbook'],
  ['chaos-engineering', 'Design Experiment', 'experiment'],
  ['chaos-engineering', 'Run Experiment', 'experiment'],
  ['deployment-strategies', 'Feature Flag', 'feature_flag'],
  ['platform-engineering-blueprint', 'Observability Layer', 'monitor'],
  ['platform-engineering-blueprint', 'Security Layer', 'security_policy'],
  ['observability-three-pillars', 'Metrics', 'service_level_indicator'],
  ['observability-three-pillars', 'Traces', 'monitor'],
  ['blameless-postmortem', 'Root Cause', 'root_cause'],
  ['blameless-postmortem', 'Action Items', 'task'],
  ['ci-cd-pipeline-design', 'Test', 'test_suite'],
  ['ci-cd-pipeline-design', 'Security Scan', 'security_review'],
  ['ci-cd-pipeline-design', 'Deploy to Staging', 'deployment'],
  ['ci-cd-pipeline-design', 'Deploy to Production', 'deployment'],

  // ── Cluster 4: security.ts ────────────────────────────────────────────────
  ['stride-threat-model', 'Spoofing', 'threat'],
  ['stride-threat-model', 'Repudiation', 'threat'],
  ['stride-threat-model', 'Information Disclosure', 'threat'],
  ['stride-threat-model', 'Denial of Service', 'threat'],
  ['stride-threat-model', 'Elevation of Privilege', 'threat'],
  ['owasp-top-10-checklist', 'Current Controls', 'security_control'],
  ['zero-trust-architecture', 'Micro-Segment Network', 'security_control'],
  ['zero-trust-architecture', 'Monitor & Log', 'monitor'],
  ['nist-cybersecurity-framework', 'Detect', 'monitor'],
  ['nist-cybersecurity-framework', 'Respond', 'runbook'],
  ['nist-cybersecurity-framework', 'Recover', 'runbook'],
  ['devsecops-pipeline', 'Container Scan', 'security_review'],
  ['devsecops-pipeline', 'DAST', 'penetration_test'],
  ['attack-tree', 'Sub-Goal', 'threat'],
  ['security-scorecard', 'Authorisation', 'access_policy'],
  ['security-scorecard', 'Overall Score', 'metric'],

  // ── Cluster 4: qa-testing.ts ──────────────────────────────────────────────
  ['testing-trophy', 'Integration Tests', 'test_suite'],
  ['testing-trophy', 'E2E Tests', 'test_suite'],
  ['bdd-specification', 'Feature', 'test_suite'],
  ['bdd-specification', 'Scenario', 'test_case'],
  ['exploratory-testing-charter', 'Time Box', 'qa_session'],
  ['exploratory-testing-charter', 'Notes', 'qa_session'],
  ['exploratory-testing-charter', 'Bugs Found', 'bug'],
  ['contract-testing', 'Define Contract', 'api_contract'],
  ['contract-testing', 'Provider Test', 'test_case'],
  ['contract-testing', 'Publish Contract', 'api_contract'],
  ['risk-based-testing', 'Feature / Area', 'feature_area'],
  ['risk-based-testing', 'Likelihood of Failure', 'metric'],
  ['risk-based-testing', 'Impact of Failure', 'metric'],
  ['risk-based-testing', 'Risk Score', 'metric'],
  ['test-environment-matrix', 'Test Suite', 'test_suite'],
  ['test-environment-matrix', 'Local', 'test_environment'],
  ['test-environment-matrix', 'CI', 'test_environment'],
  ['test-environment-matrix', 'Staging', 'test_environment'],
  ['accessibility-testing-framework', 'Status', 'test_result'],
  ['accessibility-testing-framework', 'Remediation', 'a11y_issue'],

  // ── Cluster 4: ai-ml.ts ──────────────────────────────────────────────────
  ['model-card', 'Intended Use', 'ai_model'],
  ['model-card', 'Recommendations', 'ai_guardrail'],
  ['mlops-lifecycle', 'Data Collection', 'ai_dataset'],
  ['mlops-lifecycle', 'Data Preparation', 'ai_dataset'],
  ['mlops-lifecycle', 'Model Training', 'ai_model'],
  ['mlops-lifecycle', 'Model Evaluation', 'eval_run'],
  ['mlops-lifecycle', 'Model Deployment', 'deployment'],
  ['mlops-lifecycle', 'Monitoring', 'ai_trace'],
  ['mlops-lifecycle', 'Retraining', 'ai_model'],
  ['llm-evaluation-framework', 'Safety', 'ai_guardrail'],
  ['llm-evaluation-framework', 'Latency', 'metric'],
  ['llm-evaluation-framework', 'Cost', 'ai_cost_tracker'],
  ['responsible-ai-framework', 'Fairness', 'ai_guardrail'],
  ['responsible-ai-framework', 'Safety', 'ai_guardrail'],
  ['responsible-ai-framework', 'Privacy', 'security_policy'],
  ['responsible-ai-framework', 'Accountability', 'ai_guardrail'],
  ['prompt-engineering-patterns', 'Chain-of-Thought', 'prompt_version'],
  ['prompt-engineering-patterns', 'ReAct', 'prompt_version'],
  ['prompt-engineering-patterns', 'Structured Output', 'prompt_version'],
  ['rag-architecture-map', 'Document Ingestion', 'ai_dataset'],
  ['rag-architecture-map', 'Chunking', 'data_pipeline'],
  ['rag-architecture-map', 'Embedding', 'ai_model'],
  ['rag-architecture-map', 'Vector Store', 'infrastructure_component'],
  ['rag-architecture-map', 'Retrieval', 'data_pipeline'],
  ['rag-architecture-map', 'Evaluation', 'eval_run'],
  ['ai-safety-checklist', 'Method', 'eval_benchmark'],
  ['ai-safety-checklist', 'Pass Criteria', 'eval_benchmark'],
  ['ai-safety-checklist', 'Result', 'eval_run'],
  ['llm-guardrails-framework', 'Output Guardrails', 'ai_guardrail'],
  ['llm-guardrails-framework', 'Hallucination Detection', 'ai_guardrail'],
  ['llm-guardrails-framework', 'Rate Limiting', 'ai_guardrail'],

  // ── Cluster 4: agentic.ts ────────────────────────────────────────────────
  ['agent-evaluation-matrix', 'Task Completion', 'metric'],
  ['agent-evaluation-matrix', 'Tool-Use Accuracy', 'metric'],
  ['agent-evaluation-matrix', 'Cost Efficiency', 'metric'],
  ['human-in-the-loop-gates', 'Agent Proposes Action', 'agent_task'],
  ['human-in-the-loop-gates', 'Gate Check', 'review_gate'],
  ['human-in-the-loop-gates', 'Human Review', 'review_gate'],
  ['human-in-the-loop-gates', 'Approve / Reject / Modify', 'approval_record'],
  ['human-in-the-loop-gates', 'Log Decision', 'approval_record'],
  ['tool-use-pattern-map', 'Input Schema', 'agent_skill'],
  ['tool-use-pattern-map', 'Output Schema', 'agent_skill'],
  ['agent-workflow-canvas', 'Tool Access', 'agent_skill'],
  ['agent-workflow-canvas', 'Decision Points', 'review_gate'],
  ['agent-workflow-canvas', 'Human Gates', 'review_gate'],
  ['multi-agent-orchestration', 'Communication Protocol', 'agent_hook'],
  ['multi-agent-orchestration', 'Conflict Resolution', 'review_gate'],
  ['agent-observability-dashboard', 'Metric', 'metric'],
  ['agent-observability-dashboard', 'Current Value', 'metric'],
  ['agent-observability-dashboard', 'Trend', 'metric'],
  ['agent-observability-dashboard', 'Threshold', 'alert_rule'],
  ['agent-observability-dashboard', 'Alert Status', 'alert_rule'],
  ['agent-safety-framework', 'Forbidden Actions', 'ai_guardrail'],
  ['agent-safety-framework', 'Monitoring', 'monitor'],

  // ── Cluster 5: growth.ts ──────────────────────────────────────────────────
  ['retention-cohort', 'Cohort', 'cohort'],
  ['hook-model', 'Trigger', 'event_schema'],

  // ── Cluster 5: marketing.ts ───────────────────────────────────────────────
  // 4Ps/7Ps: first slot has snake_case label 'marketing_strategy' — fix entityTypeId
  ['marketing-mix-4ps', 'marketing_strategy', 'product'],
  ['marketing-mix-4ps', 'Marketing Strategy', 'pricing_strategy'],
  ['marketing-mix-7ps', 'marketing_strategy', 'product'],
  ['marketing-mix-7ps', 'Marketing Strategy', 'pricing_strategy'],
  // STP: first slot has snake_case label 'behavioral_segment'
  ['stp-framework', 'behavioral_segment', 'market_segment'],
  // marketing-funnel: first slot has snake_case label 'marketing_campaign_plan'
  ['marketing-funnel', 'marketing_campaign_plan', 'funnel_step'],
  ['marketing-funnel', 'Marketing Campaign Plan', 'funnel_step'],
  // brand-positioning: last slot 'Marketing Strategy' → proof_point
  ['brand-positioning-statement', 'Marketing Strategy', 'proof_point'],

  // ── Cluster 5: sales.ts ───────────────────────────────────────────────────
  // win-loss-analysis-sales: all 3 "Metric" slots have label "Metric" — can't disambiguate, skip
  // command-of-the-message: "Metric" slots — can't disambiguate duplicate labels, skip
  // NOTE: These need manual label disambiguation first (pre-existing data quality issue)

  // ── Cluster 5: feedback-voc.ts ────────────────────────────────────────────
  ['voice-of-customer-program', 'Action & Closing the Loop', 'customer_feedback'],
  ['feedback-triage-framework', 'Route', 'feedback_theme'],
  ['feature-voting-board', 'Segments', 'behavioral_segment'],
  ['feature-voting-board', 'Response', 'customer_feedback'],
  ['nps-analysis-framework', 'NPS Score', 'metric'],
  ['nps-analysis-framework', 'Drivers', 'insight'],
  ['nps-analysis-framework', 'Follow-Up Actions', 'initiative'],
  ['customer-advisory-board-framework', 'Cadence', 'ceremony'],
  ['customer-advisory-board-framework', 'Agenda', 'research_question'],
  ['customer-advisory-board-framework', 'Outcomes & Actions', 'initiative'],
  // beta-testing-framework: "Go / No-Go" slot doesn't exist in current file — skip
  ['csat-analysis', 'Scores', 'metric'],
  ['feedback-loop-design', 'Processing', 'workflow_template'],
  ['feedback-loop-design', 'Response to User', 'customer_feedback'],
  // customer-effort-score: "Improvements" slot doesn't exist in current file — skip
  ['product-feedback-taxonomy', 'Subcategories', 'feedback_theme'],
  ['product-feedback-taxonomy', 'Themes', 'feedback_theme'],

  // ── Cluster 6: strategy.ts ────────────────────────────────────────────────
  ['wardley-map', 'User Need', 'need'],
  ['strategic-cascade', 'Vision', 'vision'],
  ['strategic-cascade', 'Mission', 'mission'],
  ['okr-framework', 'Initiatives', 'initiative'],
  ['strategy-diamond', 'Staging', 'initiative'],

  // ── Cluster 6: planning.ts ────────────────────────────────────────────────
  ['roadmap-timeline', 'Q2', 'initiative'],
  ['roadmap-timeline', 'Q3', 'initiative'],
  ['now-next-later', 'Later', 'initiative'],
  ['product-tree', 'Branches (Feature Areas)', 'feature_area'],
  ['outcome-based-roadmap', 'Bets / Initiatives', 'initiative'],

  // ── Cluster 6: competitive.ts ─────────────────────────────────────────────
  ['competitive-response-matrix', 'Your Strategic Moves', 'initiative'],

  // ── Cluster 6: business-model.ts ──────────────────────────────────────────
  ['business-model-canvas', 'Customer Segments', 'market_segment'],
  ['lean-canvas', 'Unfair Advantage', 'capability'],
  ['lean-canvas', 'Channels', 'distribution_channel'],
  ['lean-canvas', 'Customer Segments', 'market_segment'],

  // ── Cluster 6: portfolio.ts ───────────────────────────────────────────────
  ['bcg-growth-share-matrix', 'Initiative', 'initiative'],
  ['three-horizons', 'Initiative', 'initiative'],
  ['ge-mckinsey-matrix', 'Initiative', 'initiative'],
  ['product-lifecycle', 'Initiative', 'initiative'],
  ['ansoff-growth-matrix', 'Initiative', 'initiative'],
  ['ansoff-growth-matrix', 'Segment', 'market_segment'],

  // ── Cluster 6: team-process.ts ────────────────────────────────────────────
  ['raci-matrix', 'Activity', 'key_activity'],
  ['raci-matrix', 'Responsible', 'role'],
  ['raci-matrix', 'Accountable', 'role'],
  ['raci-matrix', 'Consulted', 'role'],
  ['raci-matrix', 'Informed', 'role'],
  ['team-topology', 'Stream-aligned', 'team'],
  ['team-topology', 'Complicated-subsystem', 'team'],

  // ── Cluster 6: content.ts ─────────────────────────────────────────────────
  ['kcs-methodology', 'Internal Doc', 'document'],
  ['seci-knowledge-spiral', 'Internal Doc', 'document'],
]

// ─── Apply fixes ─────────────────────────────────────────────────────────────

// Read all definition files into memory
const files = readdirSync(DEFS_DIR)
  .filter((f) => f.endsWith('.ts') && f !== 'index.ts')
  .sort()

const fileContents = new Map<string, string>()
for (const file of files) {
  fileContents.set(file, readFileSync(join(DEFS_DIR, file), 'utf-8'))
}

let applied = 0
let notFound = 0
const notFoundList: string[] = []

for (const [fwId, slotLabel, newType] of FIXES) {
  let found = false

  for (const [file, content] of fileContents) {
    // Check if this framework is in this file
    if (!content.includes(`id: '${fwId}'`)) continue

    // Build the pattern to find the slot and replace its entityTypeId
    // We need to match the slot by label and replace the entityTypeId on the next line
    const escapedLabel = slotLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const pattern = new RegExp(
      `(label: '${escapedLabel}',\\s*\\n\\s*entityTypeId: )'[^']*'`,
    )

    const match = content.match(pattern)
    if (match) {
      const updated = content.replace(pattern, `$1'${newType}'`)
      if (updated !== content) {
        fileContents.set(file, updated)
        applied++
        found = true
      } else {
        // Already correct
        found = true
      }
    }

    if (found) break
  }

  if (!found) {
    notFound++
    notFoundList.push(`${fwId} → "${slotLabel}"`)
  }
}

// Write all modified files
for (const [file, content] of fileContents) {
  const original = readFileSync(join(DEFS_DIR, file), 'utf-8')
  if (content !== original) {
    writeFileSync(join(DEFS_DIR, file), content)
  }
}

// Report
console.log(`Applied: ${applied} fixes`)
console.log(`Not found: ${notFound}`)
if (notFoundList.length > 0) {
  console.log('\nSlots not found (may have different IDs):')
  for (const item of notFoundList) {
    console.log(`  - ${item}`)
  }
}
