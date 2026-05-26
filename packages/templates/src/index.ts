export * from './types.js'
import type { TemplateSet } from './types.js'

// Import all template sets
import { saasTemplates } from './templates/saas.js'
import { marketplaceTemplates } from './templates/marketplace.js'
import { mobileTemplates } from './templates/mobile.js'
import { ossTemplates } from './templates/oss.js'
import { agencyTemplates } from './templates/agency.js'

export const ALL_TEMPLATES: TemplateSet[] = [
  ...saasTemplates,
  ...marketplaceTemplates,
  ...mobileTemplates,
  ...ossTemplates,
  ...agencyTemplates,
]

export function getTemplatesForIndustry(industry: string): TemplateSet[] {
  return ALL_TEMPLATES.filter(t => t.industries.includes(industry))
}

export function getTemplatesForStage(stage: string): TemplateSet[] {
  return ALL_TEMPLATES.filter(t => t.stages.includes(stage as 'idea' | 'mvp' | 'growth' | 'scale'))
}

export { saasTemplates, marketplaceTemplates, mobileTemplates, ossTemplates, agencyTemplates }
