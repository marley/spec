/**
 * Framework quality audit (Pass 3).
 *
 * Reports frameworks with missing or thin substantive fields:
 * - description (must exist, >= 60 chars)
 * - data.entity_types (must exist, len > 0)
 * - education.purpose (must exist)
 * - education.core_question (must exist)
 * - education.when_to_use (>= 1 entry)
 * - education.when_not_to_use (>= 1 entry)
 * - education.steps (optional — flagged INFO if missing)
 */

import { UPG_FRAMEWORKS } from '../../src/frameworks/definitions/index.js'

let errors = 0
let warns = 0
let stepless = 0

for (const fw of UPG_FRAMEWORKS) {
  const issues: string[] = []
  if (!fw.description || fw.description.length < 60) issues.push('description thin')
  if (!fw.data?.entity_types || fw.data.entity_types.length === 0) issues.push('entity_types empty')
  if (!fw.education?.purpose) issues.push('education.purpose missing')
  if (!fw.education?.core_question) issues.push('education.core_question missing')
  if (!fw.education?.when_to_use || fw.education.when_to_use.length === 0) issues.push('when_to_use empty')
  if (!fw.education?.when_not_to_use || fw.education.when_not_to_use.length === 0) issues.push('when_not_to_use empty')
  if (issues.length > 0) {
    console.log(`ERROR ${fw.id} [${fw.category}]: ${issues.join(', ')}`)
    errors++
  }
  if (!fw.education?.steps || fw.education.steps.length === 0) stepless++
}

console.log()
console.log(`Total frameworks: ${UPG_FRAMEWORKS.length}`)
console.log(`Frameworks with quality issues: ${errors}`)
console.log(`Frameworks without education.steps (optional): ${stepless}`)
