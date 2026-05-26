#!/usr/bin/env tsx
/**
 * Playbook coverage audit.
 *
 * Enforces the W1 (restated) invariant on `UPG_PLAYBOOKS`:
 * 1. Coverage — every region has at least one playbook.
 * 2. Canonical uniqueness — exactly one canonical playbook per region.
 * 3. Region validity — every `playbook.region` is a valid `UPGRegionId`.
 * 4. Framework reference validity — every `framework_id` resolves in `UPG_FRAMEWORKS`.
 * 5. ID uniqueness — every `playbook.id` is unique.
 *
 * Exits non-zero on any violation; emits a structured report on success.
 *
 * Usage:
 *   tsx scripts/audit-playbook-coverage.ts
 *
 * The same invariant is locked by `__tests__/playbooks.test.ts`; the audit
 * script exists so CI can run it standalone (without spinning up vitest)
 * and so external authors of additional playbooks can validate their
 * catalogue extension out-of-band.
 */

import {
  UPG_PLAYBOOKS,
  UPG_REGIONS,
  UPG_FRAMEWORKS_BY_ID,
} from '../src/index.js'

type Violation = { rule: string; message: string }
const violations: Violation[] = []

// 1. Coverage
for (const region of UPG_REGIONS) {
  const matches = UPG_PLAYBOOKS.filter((p) => p.region === region.id)
  if (matches.length === 0) {
    violations.push({
      rule: 'coverage',
      message: `Region "${region.id}" has no playbook (W1 coverage violation).`,
    })
  }
}

// 2. Canonical uniqueness
for (const region of UPG_REGIONS) {
  const canonicals = UPG_PLAYBOOKS.filter(
    (p) => p.region === region.id && p.is_canonical === true,
  )
  if (canonicals.length !== 1) {
    violations.push({
      rule: 'canonical-uniqueness',
      message: `Region "${region.id}" has ${canonicals.length} canonical playbook(s) — expected exactly 1.`,
    })
  }
}

// 3. Region validity
const regionIds = new Set(UPG_REGIONS.map((r) => r.id))
for (const p of UPG_PLAYBOOKS) {
  if (!regionIds.has(p.region)) {
    violations.push({
      rule: 'region-validity',
      message: `Playbook "${p.id}" references unknown region "${p.region}".`,
    })
  }
}

// 4. Framework reference validity
for (const p of UPG_PLAYBOOKS) {
  if (!p.framework_id) continue
  if (!UPG_FRAMEWORKS_BY_ID[p.framework_id]) {
    violations.push({
      rule: 'framework-validity',
      message: `Playbook "${p.id}" references unknown framework "${p.framework_id}".`,
    })
  }
}

// 5. ID uniqueness
{
  const seen = new Set<string>()
  for (const p of UPG_PLAYBOOKS) {
    if (seen.has(p.id)) {
      violations.push({
        rule: 'id-uniqueness',
        message: `Duplicate playbook id: "${p.id}".`,
      })
    }
    seen.add(p.id)
  }
}

// ── Report ────────────────────────────────────────────────────────────────

const counts = {
  total: UPG_PLAYBOOKS.length,
  canonical: UPG_PLAYBOOKS.filter((p) => p.is_canonical === true).length,
  specialised: UPG_PLAYBOOKS.filter((p) => p.is_canonical !== true).length,
  framework_anchored: UPG_PLAYBOOKS.filter((p) => p.framework_id).length,
  regions: UPG_REGIONS.length,
}

if (violations.length > 0) {
  console.error('✗ Playbook coverage audit FAILED')
  console.error(`  ${violations.length} violation(s):`)
  for (const v of violations) {
    console.error(`  - [${v.rule}] ${v.message}`)
  }
  process.exit(1)
}

console.log('✓ Playbook coverage audit PASSED (W1 invariant)')
console.log(`  Playbooks:           ${counts.total}`)
console.log(`  Canonical:           ${counts.canonical} (one per region)`)
console.log(`  Specialised:         ${counts.specialised}`)
console.log(`  Framework-anchored:  ${counts.framework_anchored}`)
console.log(`  Regions covered:     ${counts.regions}/${counts.regions}`)
