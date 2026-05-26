/**
 * UPG Framework Definitions — Marketing
 * 12 frameworks for the marketing domain.
 */

import type { UPGFramework } from '../types.js'

export const MARKETING_FRAMEWORKS: UPGFramework[] = [
  {
    id: 'marketing-mix-4ps',
    name: 'Marketing Mix 4Ps',
    version: '1.0.0',
    description: 'The foundational marketing framework. Every marketing strategy must address four decisions: what to sell (Product), what to charge (Price), where to sell (Place), and how to promote (Promotion).',
    category: 'marketing',
    origin: {
      type: 'practitioner',
      attribution: 'E. Jerome McCarthy',
      description: 'Basic Marketing: A Managerial Approach',
      url: 'https://en.wikipedia.org/wiki/Marketing_mix',
      year: 1960,
      license: 'public_domain',
    },
    tags: [
      'marketing',
      'collection'
    ],
    slots: [
      {
        label: 'Product',
        entityTypeId: 'product',
        description: 'What you offer — features, quality, branding'
      },
      {
        label: 'Price',
        entityTypeId: 'proof_point',
        description: 'Pricing strategy and structure'
      },
      {
        label: 'Place',
        entityTypeId: 'marketing_channel',
        description: 'Distribution channels and availability'
      },
      {
        label: 'Promotion',
        entityTypeId: 'funnel_step',
        description: 'Advertising, PR, sales promotion, direct marketing'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'marketing_channel',
            role: 'item'
          },
          {
            type: 'product',
            role: 'item'
          },
          {
            type: 'proof_point',
            role: 'item'
          },
          {
            type: 'funnel_step',
            role: 'item'
          }
        ],
      required_properties: {}
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
      purpose: 'Evaluate the four foundational marketing levers — Product, Price, Place, Promotion — to ensure they are aligned and working together.',
      core_question: 'Are our product offering, pricing, distribution, and promotion working in harmony, or are they pulling in different directions?',
      when_to_use: [
        'You need to structure your marketing strategy and messaging',
        'You want to align marketing activities with product positioning',
        'You are entering a new market or launching a new product'
      ],
      when_not_to_use: [
        'The product is pre-launch with no audience to market to',
        'Marketing strategy is well-established and performing'
      ]
    }
  },
  {
    id: 'stp-framework',
    name: 'STP Framework',
    version: '1.0.0',
    description: 'Three sequential steps to market strategy: Segment the market into distinct groups, Target the most attractive segments, and Position your offering to win within those segments.',
    category: 'marketing',
    origin: {
      type: 'practitioner',
      attribution: 'Philip Kotler',
      description: 'The Segmentation-Targeting-Positioning framework was formalised by Philip Kotler, building on Wendell R. Smith\'s 1956 segmentation work. It remains the foundational model for marketing strategy.',
      url: 'https://en.wikipedia.org/wiki/Market_segmentation#STP_approach',
      year: 1994,
      license: 'public_domain',
    },
    tags: [
      'marketing',
      'flow'
    ],
    slots: [
      {
        label: 'Segmentation',
        entityTypeId: 'market_segment',
        description: 'Divide market into meaningful groups'
      },
      {
        label: 'Targeting',
        entityTypeId: 'behavioral_segment',
        description: 'Select segments to focus on'
      },
      {
        label: 'Positioning',
        entityTypeId: 'positioning',
        description: 'Define how to win in target segments'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'positioning',
            role: 'item'
          },
          {
            type: 'behavioral_segment',
            role: 'item'
          },
          {
            type: 'market_segment',
            role: 'item'
          }
        ],
      required_properties: {}
    },
    structure: {
      pattern: 'flow'
    },
    presentation: {
      layout: {
        type: 'flow',
        direction: 'LR'
      },
      colour_by: 'status',
      card_fields: [
        'title',
        'description',
        'status'
      ]
    },
    education: {
      purpose: 'Segment the market, select target segments, and position the product for each — ensuring marketing effort concentrates where it has the highest chance of resonance.',
      core_question: 'Which market segments should we target, and how should we position our product to win in those segments?',
      when_to_use: [
        'You need to structure your marketing strategy and messaging',
        'You want to align marketing activities with product positioning',
        'You are entering a new market or launching a new product'
      ],
      when_not_to_use: [
        'The product is pre-launch with no audience to market to',
        'Marketing strategy is well-established and performing'
      ]
    }
  },
  {
    id: 'marketing-funnel',
    approach_ids: ['trace'],
    name: 'Marketing Funnel',
    version: '1.0.0',
    description: 'The original purchase funnel. Prospects move through Awareness, Interest, Desire, and Action (AIDA). One of the oldest frameworks in marketing, still foundational for campaign planning.',
    category: 'marketing',
    origin: {
      type: 'practitioner',
      attribution: 'E. St. Elmo Lewis',
      description: 'Based on the AIDA model (Attention, Interest, Desire, Action) attributed to E. St. Elmo Lewis around 1898. The funnel metaphor was later adopted by B2B marketing to model the buyer journey from awareness to purchase.',
      url: 'https://en.wikipedia.org/wiki/AIDA_(marketing)',
      year: 1898,
      license: 'public_domain',
    },
    tags: [
      'marketing',
      'funnel'
    ],
    slots: [
      {
        label: 'Awareness',
        entityTypeId: 'funnel_step',
        description: 'Prospect becomes aware of a need or solution'
      },
      {
        label: 'Interest',
        entityTypeId: 'marketing_campaign_plan',
        description: 'Prospect actively seeks information'
      },
      {
        label: 'Desire',
        entityTypeId: 'marketing_campaign_plan',
        description: 'Prospect evaluates and prefers your solution'
      },
      {
        label: 'Action',
        entityTypeId: 'marketing_campaign_plan',
        description: 'Prospect converts to customer'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'marketing_campaign_plan',
            role: 'item'
          },
          {
            type: 'funnel_step',
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
      purpose: 'Model the customer journey from awareness through consideration to purchase, identifying where prospects drop off and what content or actions move them to the next stage.',
      core_question: 'At which stage of the funnel are we losing the most prospects, and what intervention would move them forward?',
      when_to_use: [
        'You need to structure your marketing strategy and messaging',
        'You want to align marketing activities with product positioning',
        'You are entering a new market or launching a new product'
      ],
      when_not_to_use: [
        'The product is pre-launch with no audience to market to',
        'Marketing strategy is well-established and performing'
      ]
    }
  },
]
