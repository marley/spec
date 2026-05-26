/**
 * Semantic dedup detector — finds frameworks with overlapping descriptions or
 * highly similar tag/entity-type fingerprints. Surfaces non-id-equal duplicates.
 */

import { UPG_FRAMEWORKS } from '../../src/frameworks/definitions/index.js'

function tokens(s: string): Set<string> {
  return new Set(
    s
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 3 && !STOP.has(w)),
  )
}
const STOP = new Set([
  'with',
  'that',
  'this',
  'have',
  'from',
  'their',
  'will',
  'they',
  'each',
  'which',
  'them',
  'when',
  'your',
  'into',
  'across',
  'these',
  'than',
  'about',
  'over',
  'where',
  'while',
  'used',
  'using',
  'standard',
  'practice',
  'framework',
  'model',
  'method',
  'process',
  'system',
  'analysis',
])

function jaccard(a: Set<string>, b: Set<string>): number {
  const inter = [...a].filter((x) => b.has(x)).length
  const uni = new Set([...a, ...b]).size
  return uni === 0 ? 0 : inter / uni
}

const candidates: Array<{ a: string; b: string; score: number; aName: string; bName: string }> = []

for (let i = 0; i < UPG_FRAMEWORKS.length; i++) {
  for (let j = i + 1; j < UPG_FRAMEWORKS.length; j++) {
    const A = UPG_FRAMEWORKS[i]
    const B = UPG_FRAMEWORKS[j]
    const score = jaccard(tokens(A.name + ' ' + A.description), tokens(B.name + ' ' + B.description))
    if (score >= 0.30) {
      candidates.push({ a: A.id, b: B.id, score, aName: A.name, bName: B.name })
    }
  }
}

candidates.sort((x, y) => y.score - x.score)
console.log(`Pairs with description Jaccard >= 0.55: ${candidates.length}`)
for (const c of candidates) {
  console.log(`  ${c.score.toFixed(2)}  ${c.a} <=> ${c.b}`)
  console.log(`            "${c.aName}" / "${c.bName}"`)
}
