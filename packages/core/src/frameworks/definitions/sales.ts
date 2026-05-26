/**
 * UPG Framework Definitions — Sales
 * 11 frameworks for the sales domain.
 *
 * Dedup: removed `win-loss-analysis-sales` — duplicate
 * of `win-loss-analysis` (competitive). Competitive version is structurally
 * cleaner; sales version had three duplicate "Metric" columns.
 */

import type { UPGFramework } from '../types.js'

export const SALES_FRAMEWORKS: UPGFramework[] = [
  {
    id: 'meddpicc',
    name: 'MEDDPICC',
    version: '1.0.0',
    description: 'Enterprise sales qualification framework. Metrics (quantified value), Economic Buyer, Decision Criteria, Decision Process, Paper Process, Identify Pain, Champion, and Competition. The gold standard for complex B2B deals.',
    category: 'sales',
    origin: {
      type: 'practitioner',
      attribution: 'Jack Napoli / PTC',
      description: 'Developed by Jack Napoli and Dick Dunkel at PTC in the 1990s. Extended from MEDDIC to MEDDPICC by adding Paper Process and Competition. Widely adopted in B2B enterprise sales as the gold standard qualification framework.',
      url: 'https://www.meddpicc.com/',
      year: 1996,
      license: 'published_methodology',
    },
    tags: [
      'sales',
      'collection'
    ],
    slots: [
      {
        label: 'Metrics',
        entityTypeId: 'metric',
        description: 'Quantifiable value the customer will gain'
      },
      {
        label: 'Economic Buyer',
        entityTypeId: 'contact',
        description: 'Person with budget authority'
      },
      {
        label: 'Decision Criteria',
        entityTypeId: 'deal',
        description: 'How the customer will evaluate solutions'
      },
      {
        label: 'Decision Process',
        entityTypeId: 'deal',
        description: 'Steps to reach a decision'
      },
      {
        label: 'Paper Process',
        entityTypeId: 'deal',
        description: 'Procurement and legal steps'
      },
      {
        label: 'Identify Pain',
        entityTypeId: 'deal',
        description: 'Core business pain being solved'
      },
      {
        label: 'Champion',
        entityTypeId: 'contact',
        description: 'Internal advocate selling on your behalf'
      },
      {
        label: 'Competition',
        entityTypeId: 'deal',
        description: 'Competitive alternatives being considered'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'deal',
            role: 'item'
          },
          {
            type: 'contact',
            role: 'item'
          },
          {
            type: 'metric',
            role: 'item'
          }
        ],
      required_properties: {},
      computed_properties: [
        {
          property: 'deal_score',
          expression: 'metrics + economic_buyer + decision_criteria + decision_process + identify_pain + champion + competition',
          entity_type: 'opportunity',
          label: 'Deal Score',
          format: 'number'
        }
      ]
    },
    structure: {
      pattern: 'collection'
    },
    presentation: {
      layout: {
        type: 'grid',
        groupBy: 'type'
      },
      sort_by: {
        property: 'title',
        direction: 'asc'
      },
      colour_by: 'type',
      card_fields: [
        'title',
        'description'
      ]
    },
    education: {
      purpose: 'Qualify enterprise deals through seven dimensions — Metrics, Economic Buyer, Decision Criteria, Decision Process, Paper Process, Implications of Pain, Champion, Competition — ensuring no blind spots in complex sales.',
      core_question: 'For this deal, can we quantify the value (M), access the decision-maker (E), and arm our champion (C) — or are we hoping instead of knowing?',
      when_to_use: [
        'You need a structured approach to sales process and qualification',
        'Win rates are declining and you need to understand why',
        'You want to scale a repeatable sales methodology'
      ],
      when_not_to_use: [
        'The product is self-serve with no sales-assisted motion',
        'Deal volume is too low to justify formal sales methodology'
      ]
    }
  },
  {
    id: 'sales-pipeline-framework',
    approach_ids: ['trace'],
    name: 'Sales Pipeline',
    version: '1.0.0',
    description: 'Define pipeline stages with clear entry/exit criteria and expected conversion rates. Track deals through prospecting, qualification, demo, proposal, negotiation, and close.',
    category: 'sales',
    origin: {
      type: 'practitioner',
      description: 'Standard sales operations practice formalised as CRM systems enabled pipeline management. Defines stages, entry/exit criteria, and conversion rate targets for predictable revenue forecasting.',
      license: 'cc_by',
    },
    tags: [
      'sales',
      'funnel'
    ],
    slots: [
      {
        label: 'Prospecting',
        entityTypeId: 'pipeline_stage',
        description: 'Identifying potential opportunities'
      },
      {
        label: 'Qualification',
        entityTypeId: 'pipeline_stage',
        description: 'Validating fit and intent'
      },
      {
        label: 'Demo',
        entityTypeId: 'pipeline_stage',
        description: 'Product demonstration or trial'
      },
      {
        label: 'Proposal',
        entityTypeId: 'pipeline_stage',
        description: 'Formal proposal or quote'
      },
      {
        label: 'Negotiation',
        entityTypeId: 'pipeline_stage',
        description: 'Terms and pricing discussion'
      },
      {
        label: 'Closed Won',
        entityTypeId: 'pipeline_stage',
        description: 'Deal signed and won'
      },
      {
        label: 'Metric',
        entityTypeId: 'metric',
        description: 'Conversion metrics between stages'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'pipeline_stage',
            role: 'item'
          },
          {
            type: 'metric',
            role: 'item'
          }
        ],
      required_properties: {}
    },
    structure: {
      pattern: 'funnel'
    },
    presentation: {
      layout: {
        type: 'funnel',
        orientation: 'vertical'
      },
      colour_by: 'status',
      card_fields: [
        'title',
        'description'
      ]
    },
    education: {
      purpose: 'Define pipeline stages — from prospecting through qualification, demo, proposal, negotiation, to close — with clear entry/exit criteria and conversion rate targets for each.',
      core_question: 'Is our pipeline healthy — enough volume at the top, good conversion at each stage, and predictable close rates?',
      when_to_use: [
        'You need a structured approach to sales process and qualification',
        'Win rates are declining and you need to understand why',
        'You want to scale a repeatable sales methodology'
      ],
      when_not_to_use: [
        'The product is self-serve with no sales-assisted motion',
        'Deal volume is too low to justify formal sales methodology'
      ]
    }
  },
  {
    id: 'account-planning',
    name: 'Account Planning',
    version: '1.0.0',
    description: 'Strategic plan for key accounts. Map the organisation chart, identify stakeholders and their priorities, define growth opportunities, track competitive threats, and plan expansion motions.',
    category: 'sales',
    origin: {
      type: 'practitioner',
      description: 'Standard enterprise sales practice for key accounts. Account planning frameworks map stakeholders, identify expansion opportunities, and create strategic action plans for growing revenue within existing accounts.',
      license: 'cc_by',
    },
    tags: [
      'sales',
      'matrix'
    ],
    slots: [
      {
        label: 'Account Overview',
        entityTypeId: 'account',
        description: 'Company profile, industry, size, current spend'
      },
      {
        label: 'Stakeholder Map',
        entityTypeId: 'contact',
        description: 'Key contacts and their roles'
      },
      {
        label: 'Growth Opportunity',
        entityTypeId: 'deal',
        description: 'Expansion and upsell opportunities'
      },
      {
        label: 'Competitive Threat',
        entityTypeId: 'deal',
        description: 'Competitors present in the account'
      },
      {
        label: 'Metric',
        entityTypeId: 'metric',
        description: 'Revenue and relationship targets'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'account',
          role: 'bucket'
        },
        {
          type: 'contact',
          role: 'bucket'
        },
        {
          type: 'deal',
          role: 'bucket'
        },
        {
          type: 'metric',
          role: 'bucket'
        }
      ],
      required_properties: {}
    },
    structure: {
      pattern: 'matrix'
    },
    presentation: {
      layout: {
        type: 'matrix',
        rows: 2,
        cols: 3
      },
      sort_by: {
        property: 'title',
        direction: 'asc'
      },
      colour_by: 'group',
      card_fields: [
        'title',
        'description'
      ]
    },
    education: {
      purpose: 'Create a strategic plan for key accounts — stakeholder map, goals, expansion opportunities, competitive threats, action plan — to grow revenue methodically.',
      core_question: 'Do we have a plan to grow this account — do we know the stakeholders, their goals, our white space, and the competitive threats?',
      when_to_use: [
        'You need a structured approach to sales process and qualification',
        'Win rates are declining and you need to understand why',
        'You want to scale a repeatable sales methodology'
      ],
      when_not_to_use: [
        'The product is self-serve with no sales-assisted motion',
        'Deal volume is too low to justify formal sales methodology'
      ]
    }
  },
]
