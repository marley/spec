/**
 * Primitives — smoke tests (Concern 3)
 *
 * Verifies that every primitive added in the v0.4 property-shape pass compiles,
 * is exported from the module, and holds the expected runtime shape.
 *
 * These tests are intentionally thin — the primitives are plain TypeScript type
 * aliases (not runtime validators). What we assert is:
 * 1. The export exists and is importable.
 * 2. Valid member values are accepted by a type-cast helper without throwing.
 * 3. For union types, the member list matches the canonical set defined in the audit.
 *
 * Call-site migration tests belong in the per-domain test files added in
 * subsequent concern passes.
 *
 * Run: npx vitest run src/__tests__/primitives.test.ts
 */

import { describe, it, expect } from 'vitest'

// ── Import all primitives ────────────────────────────────────────────────────

import type {
 // Pre-existing (regression guard — should still compile)
 ISODate,
 ISODateTime,
 Priority,
 HealthStatus,
 Confidence,
 // v0.4 additions
 Duration,
 ISO4217,
 Semver,
 Cron,
 Timeframe,
 LowMedHigh,
 SignalUrgency,
 SignalSentiment,
 SignalChannel,
 Protocol,
 MarketingPlatform,
} from '../properties/primitives.js'

// ── Type-cast helper ─────────────────────────────────────────────────────────

/** Casts a literal to the target type so TypeScript validates it at compile time. */
function as<T>(value: T): T {
 return value
}

// ── Pre-existing primitives — regression guard ───────────────────────────────

describe('pre-existing primitives', () => {
 it('ISODate accepts a YYYY-MM-DD string', () => {
 const d: ISODate = '2026-06-01'
 expect(d).toBe('2026-06-01')
 })

 it('ISODateTime accepts an ISO-8601 timestamp string', () => {
 const dt: ISODateTime = '2026-06-01T09:00:00Z'
 expect(dt).toBe('2026-06-01T09:00:00Z')
 })

 it('Priority covers all five levels', () => {
 const levels: Priority[] = ['urgent', 'high', 'medium', 'low', 'none']
 expect(levels).toHaveLength(5)
 })

 it('HealthStatus covers three traffic-light states', () => {
 const states: HealthStatus[] = ['on_track', 'at_risk', 'off_track']
 expect(states).toHaveLength(3)
 })

 it('Confidence covers three levels', () => {
 const levels: Confidence[] = ['high', 'medium', 'low']
 expect(levels).toHaveLength(3)
 })
})

// ── v0.4 new primitives ───────────────────────────────────────────────────────

describe('Duration', () => {
 it('accepts ISO-8601 duration strings', () => {
 const samples: Duration[] = ['P14D', 'P3M', 'PT2H30M', 'P1Y6M', 'P1Y2M3DT4H5M6S']
 for (const s of samples) {
 expect(typeof s).toBe('string')
 }
 })
})

describe('ISO4217', () => {
 it('accepts three-character currency codes', () => {
 const currencies: ISO4217[] = ['USD', 'EUR', 'GBP', 'JPY', 'CHF']
 for (const c of currencies) {
 expect(c).toHaveLength(3)
 }
 })
})

describe('Semver', () => {
 it('accepts valid semantic version strings', () => {
 const versions: Semver[] = ['1.0.0', '0.3.1', '2.0.0-beta.1', '1.4.0+build.42']
 for (const v of versions) {
 expect(typeof v).toBe('string')
 }
 })
})

describe('Cron', () => {
 it('accepts 5-field and 6-field cron expressions', () => {
 const expressions: Cron[] = ['0 9 * * 1', '0 0 1 * *', '*/15 * * * *', '0 0 0 * * 1']
 for (const e of expressions) {
 expect(typeof e).toBe('string')
 }
 })
})

describe('Timeframe', () => {
 it('accepts quarter, half-year, and relative range forms', () => {
 const frames: Timeframe[] = ['Q1 2026', '2026-H1', 'FY2027 Q2', '12-18 months', 'now', 'ongoing']
 for (const f of frames) {
 expect(typeof f).toBe('string')
 }
 })
})

describe('LowMedHigh', () => {
 it('is assignable to and from Confidence (same shape)', () => {
 const lmh: LowMedHigh = 'high'
 const conf: Confidence = lmh
 expect(conf).toBe('high')
 })

 it('covers the three canonical levels', () => {
 const levels: LowMedHigh[] = ['high', 'medium', 'low']
 expect(levels).toHaveLength(3)
 })
})

describe('SignalUrgency', () => {
 it('covers all four urgency levels', () => {
 const levels: SignalUrgency[] = ['low', 'medium', 'high', 'critical']
 expect(levels).toHaveLength(4)
 })

 it('includes critical (not present in Confidence)', () => {
 const critical = as<SignalUrgency>('critical')
 expect(critical).toBe('critical')
 })
})

describe('SignalSentiment', () => {
 it('covers all four sentiment polarities', () => {
 const polarities: SignalSentiment[] = ['positive', 'neutral', 'negative', 'mixed']
 expect(polarities).toHaveLength(4)
 })
})

describe('SignalChannel', () => {
 it('covers all twelve canonical channels', () => {
 const channels: SignalChannel[] = [
 'analytics_event',
 'community',
 'email',
 'in_app',
 'interview',
 'other',
 'review',
 'sales_call',
 'social',
 'support_ticket',
 'survey',
 'usage_session',
 ]
 expect(channels).toHaveLength(12)
 })

 it('includes support_ticket and sales_call (common redeclaration gaps)', () => {
 expect(as<SignalChannel>('support_ticket')).toBe('support_ticket')
 expect(as<SignalChannel>('sales_call')).toBe('sales_call')
 })

 it('includes product-telemetry channels (in_app, analytics_event, usage_session)', () => {
 expect(as<SignalChannel>('in_app')).toBe('in_app')
 expect(as<SignalChannel>('analytics_event')).toBe('analytics_event')
 expect(as<SignalChannel>('usage_session')).toBe('usage_session')
 })
})

describe('Protocol', () => {
 it('covers all eleven canonical protocols', () => {
 const protocols: Protocol[] = [
 'asyncapi',
 'event',
 'file',
 'graphql',
 'grpc',
 'mqtt',
 'other',
 'rest',
 'soap',
 'webhook',
 'websocket',
 ]
 expect(protocols).toHaveLength(11)
 })

 it('includes asyncapi (present in ApiContract but not DataFlow)', () => {
 expect(as<Protocol>('asyncapi')).toBe('asyncapi')
 })

 it('includes event and file (present in DataFlow but not ApiContract)', () => {
 expect(as<Protocol>('event')).toBe('event')
 expect(as<Protocol>('file')).toBe('file')
 })

 it('all members are lowercase', () => {
 const protocols: Protocol[] = [
 'asyncapi', 'event', 'file', 'graphql', 'grpc',
 'mqtt', 'other', 'rest', 'soap', 'webhook', 'websocket',
 ]
 for (const p of protocols) {
 expect(p).toBe(p.toLowerCase())
 }
 })
})

describe('MarketingPlatform', () => {
 it('covers all twelve canonical platforms', () => {
 const platforms: MarketingPlatform[] = [
 'discord',
 'email',
 'google',
 'instagram',
 'linkedin',
 'meta',
 'other',
 'podcast',
 'reddit',
 'tiktok',
 'twitter',
 'youtube',
 ]
 expect(platforms).toHaveLength(12)
 })

 it('includes meta (AdCreative) and tiktok/youtube (SocialPost) — full superset', () => {
 expect(as<MarketingPlatform>('meta')).toBe('meta')
 expect(as<MarketingPlatform>('tiktok')).toBe('tiktok')
 expect(as<MarketingPlatform>('youtube')).toBe('youtube')
 })

 it('includes brand-vision channels (discord, email newsletter, podcast, reddit)', () => {
 expect(as<MarketingPlatform>('discord')).toBe('discord')
 expect(as<MarketingPlatform>('email')).toBe('email')
 expect(as<MarketingPlatform>('podcast')).toBe('podcast')
 expect(as<MarketingPlatform>('reddit')).toBe('reddit')
 })
})
