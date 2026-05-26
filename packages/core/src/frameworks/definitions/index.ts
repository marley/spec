/**
 * Aggregated framework definitions — all categories combined.
 */

import type { UPGFramework } from '../types.js'

import { PRIORITIZATION_FRAMEWORKS } from './prioritization.js'
import { DISCOVERY_FRAMEWORKS } from './discovery.js'
import { BUSINESS_MODEL_FRAMEWORKS } from './business-model.js'
import { METRICS_FRAMEWORKS } from './metrics.js'
import { GROWTH_FRAMEWORKS } from './growth.js'
import { VALIDATION_FRAMEWORKS } from './validation.js'
import { RESEARCH_FRAMEWORKS } from './research.js'
import { PLANNING_FRAMEWORKS } from './planning.js'
import { COMPETITIVE_FRAMEWORKS } from './competitive.js'
import { STRATEGY_FRAMEWORKS } from './strategy.js'
import { ENGINEERING_FRAMEWORKS } from './engineering.js'
import { TEAM_PROCESS_FRAMEWORKS } from './team-process.js'
import { DEVOPS_FRAMEWORKS } from './devops.js'
import { AI_ML_FRAMEWORKS } from './ai-ml.js'
import { AGENTIC_FRAMEWORKS } from './agentic.js'
import { DESIGN_FRAMEWORKS } from './design.js'
import { UX_RESEARCH_FRAMEWORKS } from './ux-research.js'
import { USER_UNDERSTANDING_FRAMEWORKS } from './user-understanding.js'
import { ACCESSIBILITY_FRAMEWORKS } from './accessibility.js'
import { FEEDBACK_VOC_FRAMEWORKS } from './feedback-voc.js'
import { MARKETING_FRAMEWORKS } from './marketing.js'
import { GO_TO_MARKET_FRAMEWORKS } from './go-to-market.js'
import { SALES_FRAMEWORKS } from './sales.js'
import { PRICING_FRAMEWORKS } from './pricing.js'
import { DATA_ANALYTICS_FRAMEWORKS } from './data-analytics.js'
import { CUSTOMER_SUCCESS_FRAMEWORKS } from './customer-success.js'
import { PROGRAM_MGMT_FRAMEWORKS } from './program-mgmt.js'
import { PARTNERSHIPS_FRAMEWORKS } from './partnerships.js'
import { PORTFOLIO_FRAMEWORKS } from './portfolio.js'

export { PRIORITIZATION_FRAMEWORKS } from './prioritization.js'
export { DISCOVERY_FRAMEWORKS } from './discovery.js'
export { BUSINESS_MODEL_FRAMEWORKS } from './business-model.js'
export { METRICS_FRAMEWORKS } from './metrics.js'
export { GROWTH_FRAMEWORKS } from './growth.js'
export { VALIDATION_FRAMEWORKS } from './validation.js'
export { RESEARCH_FRAMEWORKS } from './research.js'
export { PLANNING_FRAMEWORKS } from './planning.js'
export { COMPETITIVE_FRAMEWORKS } from './competitive.js'
export { STRATEGY_FRAMEWORKS } from './strategy.js'
export { ENGINEERING_FRAMEWORKS } from './engineering.js'
export { TEAM_PROCESS_FRAMEWORKS } from './team-process.js'
export { DEVOPS_FRAMEWORKS } from './devops.js'
export { AI_ML_FRAMEWORKS } from './ai-ml.js'
export { AGENTIC_FRAMEWORKS } from './agentic.js'
export { DESIGN_FRAMEWORKS } from './design.js'
export { UX_RESEARCH_FRAMEWORKS } from './ux-research.js'
export { USER_UNDERSTANDING_FRAMEWORKS } from './user-understanding.js'
export { ACCESSIBILITY_FRAMEWORKS } from './accessibility.js'
export { FEEDBACK_VOC_FRAMEWORKS } from './feedback-voc.js'
export { MARKETING_FRAMEWORKS } from './marketing.js'
export { GO_TO_MARKET_FRAMEWORKS } from './go-to-market.js'
export { SALES_FRAMEWORKS } from './sales.js'
export { PRICING_FRAMEWORKS } from './pricing.js'
export { DATA_ANALYTICS_FRAMEWORKS } from './data-analytics.js'
export { CUSTOMER_SUCCESS_FRAMEWORKS } from './customer-success.js'
export { PROGRAM_MGMT_FRAMEWORKS } from './program-mgmt.js'
export { PARTNERSHIPS_FRAMEWORKS } from './partnerships.js'
export { PORTFOLIO_FRAMEWORKS } from './portfolio.js'

/** All framework definitions, combined from all categories */
export const UPG_FRAMEWORKS: UPGFramework[] = [
  ...PRIORITIZATION_FRAMEWORKS,
  ...DISCOVERY_FRAMEWORKS,
  ...BUSINESS_MODEL_FRAMEWORKS,
  ...METRICS_FRAMEWORKS,
  ...GROWTH_FRAMEWORKS,
  ...VALIDATION_FRAMEWORKS,
  ...RESEARCH_FRAMEWORKS,
  ...PLANNING_FRAMEWORKS,
  ...COMPETITIVE_FRAMEWORKS,
  ...STRATEGY_FRAMEWORKS,
  ...ENGINEERING_FRAMEWORKS,
  ...TEAM_PROCESS_FRAMEWORKS,
  ...DEVOPS_FRAMEWORKS,
  ...AI_ML_FRAMEWORKS,
  ...AGENTIC_FRAMEWORKS,
  ...DESIGN_FRAMEWORKS,
  ...UX_RESEARCH_FRAMEWORKS,
  ...USER_UNDERSTANDING_FRAMEWORKS,
  ...ACCESSIBILITY_FRAMEWORKS,
  ...FEEDBACK_VOC_FRAMEWORKS,
  ...MARKETING_FRAMEWORKS,
  ...GO_TO_MARKET_FRAMEWORKS,
  ...SALES_FRAMEWORKS,
  ...PRICING_FRAMEWORKS,
  ...DATA_ANALYTICS_FRAMEWORKS,
  ...CUSTOMER_SUCCESS_FRAMEWORKS,
  ...PROGRAM_MGMT_FRAMEWORKS,
  ...PARTNERSHIPS_FRAMEWORKS,
  ...PORTFOLIO_FRAMEWORKS,
]

/** Framework lookup by ID */
export const UPG_FRAMEWORKS_BY_ID: Record<string, UPGFramework> = Object.fromEntries(
  UPG_FRAMEWORKS.map((fw) => [fw.id, fw]),
)

/** Frameworks grouped by category */
export const UPG_FRAMEWORKS_BY_CATEGORY: Record<string, UPGFramework[]> = {}
for (const fw of UPG_FRAMEWORKS) {
  if (!UPG_FRAMEWORKS_BY_CATEGORY[fw.category]) UPG_FRAMEWORKS_BY_CATEGORY[fw.category] = []
  UPG_FRAMEWORKS_BY_CATEGORY[fw.category].push(fw)
}
