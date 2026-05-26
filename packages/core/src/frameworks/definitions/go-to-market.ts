/**
 * UPG Framework Definitions — Go To Market
 * 11 frameworks for the go to market domain.
 *
 * Dedup: removed `competitive-battle-card-framework` —
 * duplicate of `competitive-battlecard` (competitive). Battle cards are
 * competitive intel; canonical home is the competitive category.
 */

import type { UPGFramework } from '../types.js'

export const GO_TO_MARKET_FRAMEWORKS: UPGFramework[] = [
  {
    id: 'gtm-playbook',
    approach_ids: ['plan'],
    name: 'GTM Playbook',
    version: '1.0.0',
    description: 'End-to-end go-to-market plan. Covers market analysis, ICP definition, positioning, messaging, channel strategy, launch plan, and success metrics in a sequential flow.',
    category: 'go_to_market',
    origin: {
      type: 'practitioner',
      description: 'Synthesised from go-to-market practice across product marketing, sales, and customer success. The playbook format coordinates all GTM functions into a single executable plan.',
      license: 'cc_by',
    },
    tags: [
      'go_to_market',
      'flow'
    ],
    slots: [
      {
        label: 'Market Analysis',
        entityTypeId: 'gtm_strategy',
        description: 'Market sizing and competitive landscape'
      },
      {
        label: 'Ideal Customer Profile',
        entityTypeId: 'ideal_customer_profile',
        description: 'Ideal customer profile'
      },
      {
        label: 'Positioning',
        entityTypeId: 'positioning',
        description: 'How you position against alternatives'
      },
      {
        label: 'Messaging',
        entityTypeId: 'messaging',
        description: 'Key messages by audience'
      },
      {
        label: 'Launch',
        entityTypeId: 'launch',
        description: 'Launch activities and timeline'
      },
      {
        label: 'Sales Motion',
        entityTypeId: 'sales_motion',
        description: 'How you will sell'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'gtm_strategy',
            role: 'item'
          },
          {
            type: 'ideal_customer_profile',
            role: 'item'
          },
          {
            type: 'positioning',
            role: 'item'
          },
          {
            type: 'messaging',
            role: 'item'
          },
          {
            type: 'launch',
            role: 'item'
          },
          {
            type: 'sales_motion',
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
      purpose: 'Orchestrate every go-to-market activity — messaging, channels, pricing, enablement, launch timeline — into a single executable plan.',
      core_question: 'Do all go-to-market functions (product, marketing, sales, CS) have a shared plan for how we\'ll bring this to market?',
      when_to_use: [
        'You are launching a new product, feature, or entering a new market',
        'You need to coordinate cross-functional launch activities',
        'You want to define target customers, channels, and messaging'
      ],
      when_not_to_use: [
        'The product is mature with established distribution channels',
        'You are iterating on an existing product for existing customers'
      ]
    }
  },
  {
    id: 'icp-canvas',
    name: 'ICP Canvas',
    version: '1.0.0',
    description: 'Define your ideal customer across multiple dimensions: firmographics, technographics, pain points, buying process, success indicators, and disqualifiers. Creates a clear target for sales and marketing.',
    category: 'go_to_market',
    origin: {
      type: 'practitioner',
      attribution: 'Lincoln Murphy',
      description: 'Popularised by Lincoln Murphy of Sixteen Ventures around 2014. The Ideal Customer Profile canvas provides a structured format for defining who the product is really for, beyond basic firmographics.',
      url: 'https://sixteenventures.com/ideal-customer-profile',
      year: 2014,
      license: 'open_attribution',
    },
    tags: [
      'go_to_market',
      'matrix'
    ],
    slots: [
      {
        label: 'Firmographics',
        entityTypeId: 'ideal_customer_profile',
        description: 'Company size, industry, geography, revenue'
      },
      {
        label: 'Technographics',
        entityTypeId: 'ideal_customer_profile',
        description: 'Technology stack and tools used'
      },
      {
        label: 'Pain Points',
        entityTypeId: 'need',
        description: 'Problems the ICP needs solved'
      },
      {
        label: 'Buying Process',
        entityTypeId: 'ideal_customer_profile',
        description: 'How they evaluate and buy'
      },
      {
        label: 'Success Indicator',
        entityTypeId: 'metric',
        description: 'Signs this customer will succeed'
      },
      {
        label: 'Disqualifier',
        entityTypeId: 'ideal_customer_profile',
        description: 'Red flags that signal poor fit'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'ideal_customer_profile',
          role: 'bucket'
        },
        {
          type: 'need',
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
      purpose: 'Define the Ideal Customer Profile on a structured canvas — firmographics, pain points, buying triggers, deal-breakers — so sales and marketing target the right accounts.',
      core_question: 'Which accounts are most likely to buy, succeed, and expand — and are we spending our go-to-market effort on them?',
      when_to_use: [
        'You are launching a new product, feature, or entering a new market',
        'You need to coordinate cross-functional launch activities',
        'You want to define target customers, channels, and messaging'
      ],
      when_not_to_use: [
        'The product is mature with established distribution channels',
        'You are iterating on an existing product for existing customers'
      ]
    }
  },
  {
    id: 'messaging-house',
    name: 'Messaging House',
    version: '1.0.0',
    description: 'Hierarchical messaging architecture. A single roof message (brand promise) supported by pillars (key value propositions), each grounded in proof points. Ensures consistent communication across teams.',
    category: 'go_to_market',
    origin: {
      type: 'practitioner',
      description: 'Standard product marketing framework used to organise messaging into a hierarchy — positioning statement at the top, value pillars in the middle, proof points at the base.',
      license: 'cc_by',
    },
    tags: [
      'go_to_market',
      'tree'
    ],
    slots: [
      {
        label: 'Roof Message',
        entityTypeId: 'messaging',
        description: 'Overarching brand promise'
      },
      {
        label: 'Value Pillar',
        entityTypeId: 'messaging',
        description: 'Key value proposition'
      },
      {
        label: 'Proof Point',
        entityTypeId: 'proof_point',
        description: 'Evidence supporting each pillar'
      },
      {
        label: 'Persona',
        entityTypeId: 'persona',
        description: 'Who this messaging is for'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'messaging',
            role: 'item'
          },
          {
            type: 'proof_point',
            role: 'item'
          },
          {
            type: 'persona',
            role: 'item'
          }
        ],
      required_properties: {}
    },
    structure: {
      pattern: 'tree'
    },
    presentation: {
      layout: {
        type: 'tree',
        direction: 'TB',
        engine: 'dagre'
      },
      colour_by: 'type',
      collapsible: true,
      card_fields: [
        'title',
        'description',
        'status'
      ]
    },
    education: {
      purpose: 'Organise messaging into a hierarchy — positioning statement, value pillars, proof points — so everyone from CEO to SDR tells the same coherent story.',
      core_question: 'Can every person in our company articulate our value proposition consistently, from elevator pitch to detailed proof points?',
      when_to_use: [
        'You are launching a new product, feature, or entering a new market',
        'You need to coordinate cross-functional launch activities',
        'You want to define target customers, channels, and messaging'
      ],
      when_not_to_use: [
        'The product is mature with established distribution channels',
        'You are iterating on an existing product for existing customers'
      ]
    }
  },
  {
    id: 'product-led-growth-framework',
    name: 'PLG Framework',
    version: '1.0.0',
    description: 'Product-led go-to-market motion. Free entry gives users access, the aha moment hooks them, they expand usage within their team, and monetisation captures value from power users.',
    category: 'go_to_market',
    origin: {
      type: 'practitioner',
      attribution: 'Wes Bush',
      description: 'Coined and formalised by Wes Bush in \"Product-Led Growth\" (2019). The framework describes how the product itself drives acquisition, activation, and expansion, reducing dependence on sales-led motions.',
      url: 'https://www.productled.com/',
      year: 2019,
      license: 'published_methodology',
    },
    tags: [
      'go_to_market',
      'flow'
    ],
    slots: [
      {
        label: 'Free Entry',
        entityTypeId: 'gtm_strategy',
        description: 'How users access the product for free'
      },
      {
        label: 'Aha Moment',
        entityTypeId: 'gtm_strategy',
        description: 'First experience of core value'
      },
      {
        label: 'Expansion Motion',
        entityTypeId: 'sales_motion',
        description: 'How usage spreads within accounts'
      },
      {
        label: 'Monetisation Trigger',
        entityTypeId: 'gtm_strategy',
        description: 'When and how to convert to paid'
      },
      {
        label: 'Metric',
        entityTypeId: 'metric',
        description: 'Key metric driving the PLG motion'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'gtm_strategy',
            role: 'item'
          },
          {
            type: 'sales_motion',
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
      purpose: 'Design the product itself as the primary growth driver — free tier, self-serve onboarding, in-product virality — reducing dependence on sales-led acquisition.',
      core_question: 'Can our product acquire, activate, and expand users without human intervention, and where in the loop do we still need sales?',
      when_to_use: [
        'You are launching a new product, feature, or entering a new market',
        'You need to coordinate cross-functional launch activities',
        'You want to define target customers, channels, and messaging'
      ],
      when_not_to_use: [
        'The product is mature with established distribution channels',
        'You are iterating on an existing product for existing customers'
      ]
    }
  },
  {
    id: 'launch-checklist',
    approach_ids: ['plan'],
    name: 'Launch Checklist',
    version: '1.0.0',
    description: 'Structured checklist covering pre-launch (positioning, beta, assets), during-launch (comms, PR, events), and post-launch (monitor, iterate, retro) tasks to ensure nothing falls through the cracks.',
    category: 'go_to_market',
    origin: {
      type: 'practitioner',
      description: 'Standard product marketing practice. The checklist format ensures coordination across all launch functions — product readiness, marketing assets, sales enablement, support preparation — before go-live.',
      license: 'cc_by',
    },
    tags: [
      'go_to_market',
      'collection'
    ],
    slots: [
      {
        label: 'Pre-Launch',
        entityTypeId: 'launch',
        description: 'Preparation tasks before launch day'
      },
      {
        label: 'Launch Day',
        entityTypeId: 'launch',
        description: 'Activities on launch day'
      },
      {
        label: 'Post-Launch',
        entityTypeId: 'launch',
        description: 'Follow-up tasks after launch'
      },
      {
        label: 'Content Strategy',
        entityTypeId: 'content_strategy',
        description: 'Content and collateral needed'
      },
      {
        label: 'Metric',
        entityTypeId: 'metric',
        description: 'How launch success is measured'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'launch',
            role: 'item'
          },
          {
            type: 'content_strategy',
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
      purpose: 'Coordinate every launch activity — from feature readiness through marketing assets to support preparation — into a single checklist that prevents launch-day chaos.',
      core_question: 'Is every function (product, marketing, sales, support, legal) ready for launch, and what would block us if we shipped today?',
      when_to_use: [
        'You are launching a new product, feature, or entering a new market',
        'You need to coordinate cross-functional launch activities',
        'You want to define target customers, channels, and messaging'
      ],
      when_not_to_use: [
        'The product is mature with established distribution channels',
        'You are iterating on an existing product for existing customers'
      ]
    }
  },
  {
    id: 'channel-strategy',
    approach_ids: ['plan'],
    name: 'Channel Strategy',
    version: '1.0.0',
    description: 'Evaluate and select distribution channels. Assess each channel on reach, cost, control, fit with ICP, and scalability. Decide between direct, indirect, and partner channels.',
    category: 'go_to_market',
    origin: {
      type: 'practitioner',
      description: 'Rooted in marketing distribution theory. Channel strategy frameworks help companies evaluate and prioritise acquisition and distribution channels based on cost, reach, and strategic fit.',
      license: 'cc_by',
    },
    tags: [
      'go_to_market',
      'table'
    ],
    slots: [
      {
        label: 'Channel',
        entityTypeId: 'sales_motion',
        description: 'Distribution or sales channel'
      },
      {
        label: 'Reach',
        entityTypeId: 'metric',
        description: 'Total addressable audience via this channel'
      },
      {
        label: 'Acquisition Cost',
        entityTypeId: 'metric',
        description: 'Cost to acquire through this channel'
      },
      {
        label: 'Ideal Customer Profile',
        entityTypeId: 'ideal_customer_profile',
        description: 'How well this channel reaches the ICP'
      },
      {
        label: 'Territory',
        entityTypeId: 'territory',
        description: 'Geographic or segment coverage'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'sales_motion',
          role: 'item'
        },
        {
          type: 'territory',
          role: 'item'
        },
        {
          type: 'ideal_customer_profile',
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
      pattern: 'table'
    },
    presentation: {
      layout: {
        type: 'table',
        columns: [
          {
            property: 'title',
            label: 'Channel',
            sortable: true
          },
          {
            property: 'description',
            label: 'Primary Metric',
          },
          {
            property: 'description',
            label: 'Secondary Metric',
          },
          {
            property: 'title',
            label: 'Ideal Customer Profile',
            sortable: true
          },
          {
            property: 'title',
            label: 'Territory',
            sortable: true
          }
        ]
      },
      sort_by: {
        property: 'title',
        direction: 'asc'
      },
      colour_by: 'type',
      card_fields: [
        'title',
        'description',
        'status'
      ]
    },
    education: {
      purpose: 'Evaluate and prioritise distribution channels — direct, partner, marketplace, PLG — based on customer acquisition cost, reach, and strategic fit.',
      core_question: 'Which channels reach our ICP most efficiently, and are we over-invested in high-cost channels when lower-cost alternatives exist?',
      when_to_use: [
        'You are launching a new product, feature, or entering a new market',
        'You need to coordinate cross-functional launch activities',
        'You want to define target customers, channels, and messaging'
      ],
      when_not_to_use: [
        'The product is mature with established distribution channels',
        'You are iterating on an existing product for existing customers'
      ]
    }
  },
  {
    id: 'positioning-framework',
    name: 'Positioning Framework',
    version: '1.0.0',
    description: 'Five components of effective positioning: competitive alternatives (what you replace), unique attributes (what you do differently), value (what that means for the customer), target segments (who cares most), and market category (the context that makes the value obvious).',
    category: 'go_to_market',
    origin: {
      type: 'practitioner',
      attribution: 'April Dunford',
      description: 'Popularised by April Dunford in \"Obviously Awesome\" (2019). The five-component framework (competitive alternatives, unique attributes, value, target customers, market category) replaced traditional positioning templates.',
      url: 'https://www.aprildunford.com/obviously-awesome',
      year: 2019,
      license: 'published_methodology',
    },
    tags: [
      'go_to_market',
      'flow'
    ],
    slots: [
      {
        label: 'Competitive Alternative',
        entityTypeId: 'positioning',
        description: 'What customers would use if you didn\'t exist'
      },
      {
        label: 'Unique Attribute',
        entityTypeId: 'positioning',
        description: 'What you have that alternatives lack'
      },
      {
        label: 'Value',
        entityTypeId: 'messaging',
        description: 'Benefit those attributes enable'
      },
      {
        label: 'Target Segment',
        entityTypeId: 'ideal_customer_profile',
        description: 'Customers who care most about this value'
      },
      {
        label: 'Market Category',
        entityTypeId: 'positioning',
        description: 'Context that makes the value obvious'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'positioning',
            role: 'item'
          },
          {
            type: 'ideal_customer_profile',
            role: 'item'
          },
          {
            type: 'messaging',
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
      purpose: 'Define competitive alternatives, unique attributes, value, target customers, and market category to craft a positioning story that makes the product\'s value self-evident.',
      core_question: 'If our product didn\'t exist, what would customers use instead — and what do we offer that those alternatives fundamentally cannot?',
      when_to_use: [
        'You are launching a new product, feature, or entering a new market',
        'You need to coordinate cross-functional launch activities',
        'You want to define target customers, channels, and messaging'
      ],
      when_not_to_use: [
        'The product is mature with established distribution channels',
        'You are iterating on an existing product for existing customers'
      ]
    }
  },
  {
    id: 'category-creation',
    name: 'Category Creation Playbook',
    version: '1.0.0',
    description: 'Define and own a new market category rather than competing in an existing one. Name the category, define the problem space, establish the POV, evangelise through content and community, and build the ecosystem.',
    category: 'go_to_market',
    origin: {
      type: 'practitioner',
      attribution: 'Al Ramadan et al.',
      description: 'Formalised by Al Ramadan, Dave Peterson, Christopher Lochhead, and Kevin Maney in \"Play Bigger\" (2016). Argues that legendary companies create and dominate new categories rather than competing in existing ones.',
      url: 'https://www.playbigger.com/',
      year: 2016,
      license: 'published_methodology',
    },
    tags: [
      'go_to_market',
      'collection'
    ],
    slots: [
      {
        label: 'Category Name',
        entityTypeId: 'positioning',
        description: 'The new category you\'re defining'
      },
      {
        label: 'Problem Framing',
        entityTypeId: 'messaging',
        description: 'The problem the old category can\'t solve'
      },
      {
        label: 'Point of View',
        entityTypeId: 'messaging',
        description: 'Your unique perspective on the category'
      },
      {
        label: 'Content Strategy',
        entityTypeId: 'content_strategy',
        description: 'How you spread the category narrative'
      },
      {
        label: 'Proof Point',
        entityTypeId: 'proof_point',
        description: 'Partners, analysts, community who validate the category'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'positioning',
            role: 'item'
          },
          {
            type: 'messaging',
            role: 'item'
          },
          {
            type: 'content_strategy',
            role: 'item'
          },
          {
            type: 'proof_point',
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
      purpose: 'Define and own a new market category rather than competing in an existing one — establishing the problem framing, vocabulary, and evaluation criteria that favour your solution.',
      core_question: 'Should we compete in an existing category or create a new one — and if we create one, can we define the category criteria so we win by definition?',
      when_to_use: [
        'You are launching a new product, feature, or entering a new market',
        'You need to coordinate cross-functional launch activities',
        'You want to define target customers, channels, and messaging'
      ],
      when_not_to_use: [
        'The product is mature with established distribution channels',
        'You are iterating on an existing product for existing customers'
      ]
    }
  },
]
