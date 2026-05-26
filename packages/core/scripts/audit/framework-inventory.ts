/**
 * Framework inventory script — extracts every framework's metadata to surface
 * dedup, quality, and categorisation issues for a curation pass.
 *
 * Run:
 *   npx tsx packages/upg-spec/scripts/audit/framework-inventory.ts
 */

import { UPG_FRAMEWORKS, UPG_FRAMEWORKS_BY_CATEGORY } from '../../src/frameworks/definitions/index.js'

type Row = {
  id: string
  name: string
  category: string
  hasDescription: boolean
  descLen: number
  hasSteps: boolean
  stepCount: number
  hasEntityTypes: boolean
  entityTypeCount: number
  slotCount: number
}

const rows: Row[] = []
for (const fw of UPG_FRAMEWORKS) {
  rows.push({
    id: fw.id,
    name: fw.name,
    category: fw.category,
    hasDescription: !!fw.description,
    descLen: fw.description?.length ?? 0,
    hasSteps: !!(fw.steps && fw.steps.length > 0),
    stepCount: fw.steps?.length ?? 0,
    hasEntityTypes: !!(fw.data?.entity_types && fw.data.entity_types.length > 0),
    entityTypeCount: fw.data?.entity_types?.length ?? 0,
    slotCount: fw.slots?.length ?? 0,
  })
}

console.log('# Framework Inventory')
console.log(`Total frameworks: ${rows.length}`)
console.log(`Categories: ${Object.keys(UPG_FRAMEWORKS_BY_CATEGORY).length}`)
console.log()

console.log('## Per-category counts')
for (const [cat, list] of Object.entries(UPG_FRAMEWORKS_BY_CATEGORY).sort()) {
  console.log(`  ${cat}: ${list.length}`)
}
console.log()

console.log('## Quality issues')
const noDesc = rows.filter((r) => !r.hasDescription)
const thinDesc = rows.filter((r) => r.descLen > 0 && r.descLen < 60)
const noSteps = rows.filter((r) => !r.hasSteps)
const noEntityTypes = rows.filter((r) => !r.hasEntityTypes)
console.log(`Missing description: ${noDesc.length}`)
console.log(`Thin description (<60 chars): ${thinDesc.length}`)
console.log(`Missing steps: ${noSteps.length}`)
console.log(`Missing entity_types: ${noEntityTypes.length}`)
console.log()

if (noSteps.length > 0) {
  console.log('### Frameworks missing steps')
  for (const r of noSteps) console.log(`  ${r.id} (${r.category})`)
  console.log()
}

if (noEntityTypes.length > 0) {
  console.log(`### Frameworks missing entity_types (showing first 30)`)
  for (const r of noEntityTypes.slice(0, 30)) console.log(`  ${r.id} (${r.category})`)
  console.log()
}

if (thinDesc.length > 0) {
  console.log(`### Thin descriptions (showing first 30)`)
  for (const r of thinDesc.slice(0, 30)) console.log(`  ${r.id} — "${rows.find((x) => x.id === r.id)?.descLen} chars"`)
  console.log()
}

// --- Dedup detection ---
console.log('## Potential duplicates')

// Normalise id for comparison: strip suffix qualifiers like -cs, -sales, -framework, -model, -program
function normalize(id: string): string {
  return id
    .toLowerCase()
    .replace(/-framework$/, '')
    .replace(/-model$/, '')
    .replace(/-program$/, '')
    .replace(/-method$/, '')
    .replace(/-process$/, '')
    .replace(/-(cs|sales|gtm|growth|marketing|ux|product|customer|cx)$/, '')
    .replace(/-/g, '')
}

const buckets = new Map<string, { id: string; name: string; category: string }[]>()
for (const fw of UPG_FRAMEWORKS) {
  const key = normalize(fw.id)
  if (!buckets.has(key)) buckets.set(key, [])
  buckets.get(key)!.push({ id: fw.id, name: fw.name, category: fw.category })
}

const dupes = [...buckets.entries()].filter(([, v]) => v.length > 1)
console.log(`Buckets with 2+ entries (id-based): ${dupes.length}`)
for (const [key, list] of dupes) {
  console.log(`  ~${key}~`)
  for (const item of list) console.log(`    ${item.id} [${item.category}] — "${item.name}"`)
}
console.log()

// Name-based dedup
const nameBuckets = new Map<string, { id: string; name: string; category: string }[]>()
for (const fw of UPG_FRAMEWORKS) {
  const nkey = fw.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '')
    .replace(/(framework|model|program|method|process|analysis|matrix)$/, '')
  if (!nameBuckets.has(nkey)) nameBuckets.set(nkey, [])
  nameBuckets.get(nkey)!.push({ id: fw.id, name: fw.name, category: fw.category })
}
const nameDupes = [...nameBuckets.entries()].filter(([, v]) => v.length > 1)
console.log(`## Potential name-based duplicates: ${nameDupes.length}`)
for (const [, list] of nameDupes) {
  console.log(`  ${list[0].name} family:`)
  for (const item of list) console.log(`    ${item.id} [${item.category}]`)
}
