/**
 * UPG Framework Definitions — Portfolio
 * 7 frameworks for the portfolio domain.
 */

import type { UPGFramework } from '../types.js'

export const PORTFOLIO_FRAMEWORKS: UPGFramework[] = [
  {
    id: 'bcg-growth-share-matrix',
    name: 'BCG Growth-Share Matrix',
    version: '1.0.0',
    description: 'The classic portfolio analysis tool plotting business units on market growth rate vs. relative market share — classifying them as Stars, Cash Cows, Question Marks, or Dogs to guide investment decisions.',
    category: 'portfolio',
    origin: {
      type: 'practitioner',
      attribution: 'Bruce Henderson / BCG',
      description: 'Created by Bruce Henderson for the Boston Consulting Group in 1970. The 2x2 matrix became one of the most widely used strategic planning tools, helping conglomerates allocate capital across business units.',
      url: 'https://www.bcg.com/about/overview/our-history/growth-share-matrix',
      year: 1970,
      license: 'public_domain',
    },
    tags: [
      'portfolio',
      'quadrant'
    ],
    slots: [
      {
        label: 'Portfolio',
        entityTypeId: 'portfolio',
        description: 'Product portfolio being analysed — all products or business units plotted on the growth-share matrix'
      },
      {
        label: 'Product',
        entityTypeId: 'product',
        description: 'Product or business unit classified as Star, Cash Cow, Question Mark, or Dog based on its position'
      },
      {
        label: 'Metric',
        entityTypeId: 'metric',
        description: 'Portfolio metric — market growth rate (y-axis) and relative market share (x-axis) determining quadrant placement'
      },
      {
        label: 'Initiative',
        entityTypeId: 'initiative',
        description: 'Strategic initiative triggered by quadrant position — invest (Star), harvest (Cash Cow), divest (Dog), or decide (Question Mark)'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'portfolio',
          role: 'item'
        },
        {
          type: 'product',
          role: 'item'
        },
        {
          type: 'metric',
          role: 'item'
        },
        {
          type: 'initiative',
          role: 'item'
        }
      ],
      required_properties: {}
    },
    structure: {
      pattern: 'quadrant'
    },
    presentation: {
      layout: {
        type: 'quadrant',
        x_axis: 'impact',
        y_axis: 'effort',
        x_label: 'Portfolio',
        y_label: 'Product'
      },
      colour_by: 'group',
      card_fields: [
        'title',
        'description'
      ]
    },
    education: {
      purpose: 'Classify products by market growth rate and relative market share into Stars, Cash Cows, Question Marks, and Dogs to guide portfolio investment decisions.',
      core_question: 'Which products should we invest in (Stars), harvest (Cash Cows), investigate (Question Marks), or divest (Dogs)?',
      when_to_use: [
        'You manage multiple products and need to allocate resources across them',
        'You need to assess the health and lifecycle stage of products',
        'Strategic decisions require a portfolio-level view'
      ],
      when_not_to_use: [
        'You have a single product with no portfolio complexity',
        'Portfolio decisions are made ad-hoc without need for frameworks'
      ]
    }
  },
  {
    id: 'three-horizons',
    approach_ids: ['plan'],
    name: 'Three Horizons of Growth',
    version: '1.0.0',
    description: 'McKinsey\'s growth framework dividing the portfolio into three time horizons — H1 (core business), H2 (emerging opportunities), and H3 (future bets) — ensuring balanced investment across today, tomorrow, and the future.',
    category: 'portfolio',
    origin: {
      type: 'practitioner',
      attribution: 'McKinsey',
      description: 'Introduced by Mehrdad Baghai, Stephen Coley, and David White in \"The Alchemy of Growth\" (1999, McKinsey). Adapted by many organisations and later by Bill Sharpe for futures thinking.',
      url: 'https://www.mckinsey.com/business-functions/strategy-and-corporate-finance/our-insights/enduring-ideas-the-three-horizons-of-growth',
      year: 1999,
      license: 'open_attribution',
    },
    tags: [
      'portfolio',
      'tree'
    ],
    slots: [
      {
        label: 'Portfolio',
        entityTypeId: 'portfolio',
        description: 'Innovation portfolio balanced across three horizons — core performance, emerging growth, and future creation'
      },
      {
        label: 'Product',
        entityTypeId: 'product',
        description: 'Product or business unit assigned to a horizon — H1 (defend and extend), H2 (build), or H3 (seed and explore)'
      },
      {
        label: 'Initiative',
        entityTypeId: 'portfolio',
        description: 'Growth initiative positioned in a horizon — with appropriate funding model, governance, and success metrics'
      },
      {
        label: 'Product Area',
        entityTypeId: 'product_area',
        description: 'Product area representing a horizon — core products (H1), adjacent expansions (H2), or experimental ventures (H3)'
      },
      {
        label: 'Capability',
        entityTypeId: 'capability',
        description: 'Capability needed to execute across horizons — H1 needs efficiency, H2 needs scaling, H3 needs discovery'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'portfolio',
            role: 'item'
          },
          {
            type: 'product',
            role: 'item'
          },
          {
            type: 'product_area',
            role: 'item'
          },
          {
            type: 'capability',
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
      purpose: 'Balance investment across three time horizons — Horizon 1 (core business), Horizon 2 (emerging), Horizon 3 (future bets) — so the organisation grows while protecting current revenue.',
      core_question: 'Are we investing enough in future horizons, or is the urgency of the core business starving our long-term growth options?',
      when_to_use: [
        'You manage multiple products and need to allocate resources across them',
        'You need to assess the health and lifecycle stage of products',
        'Strategic decisions require a portfolio-level view'
      ],
      when_not_to_use: [
        'You have a single product with no portfolio complexity',
        'Portfolio decisions are made ad-hoc without need for frameworks'
      ]
    }
  },
  {
    id: 'ge-mckinsey-matrix',
    name: 'GE-McKinsey Nine-Box',
    version: '1.0.0',
    description: 'A nine-cell portfolio analysis matrix plotting business units on industry attractiveness vs. competitive strength — more nuanced than BCG, using weighted multi-factor scores for each axis.',
    category: 'portfolio',
    origin: {
      type: 'practitioner',
      attribution: 'McKinsey / GE',
      description: 'McKinsey & Company / General Electric',
      url: 'https://www.mckinsey.com/',
      year: 1970,
      license: 'public_domain',
    },
    tags: [
      'portfolio',
      'matrix'
    ],
    slots: [
      {
        label: 'Portfolio',
        entityTypeId: 'portfolio',
        description: 'Product portfolio assessed using the nine-box matrix — all units scored and plotted for strategic resource allocation'
      },
      {
        label: 'Product',
        entityTypeId: 'product',
        description: 'Business unit or product scored on industry attractiveness (market factors) and competitive strength (internal factors)'
      },
      {
        label: 'Metric',
        entityTypeId: 'metric',
        description: 'Weighted scoring factor — market size, growth, profitability (attractiveness) or share, brand, capabilities (strength)'
      },
      {
        label: 'Initiative',
        entityTypeId: 'portfolio',
        description: 'Strategic action based on nine-box position — invest/grow (top-left), hold/earn (middle), harvest/divest (bottom-right)'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'portfolio',
          role: 'bucket'
        },
        {
          type: 'product',
          role: 'bucket'
        },
        {
          type: 'metric',
          role: 'bucket'
        },
        {
          type: 'initiative',
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
        cols: 2
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
      purpose: 'Evaluate business units or products on industry attractiveness and competitive strength to guide invest, hold, or harvest decisions — a more nuanced evolution of the BCG matrix.',
      core_question: 'Given industry attractiveness and our competitive position, should we invest, hold, or divest each product in our portfolio?',
      when_to_use: [
        'You manage multiple products and need to allocate resources across them',
        'You need to assess the health and lifecycle stage of products',
        'Strategic decisions require a portfolio-level view'
      ],
      when_not_to_use: [
        'You have a single product with no portfolio complexity',
        'Portfolio decisions are made ad-hoc without need for frameworks'
      ]
    }
  },
  {
    id: 'product-lifecycle',
    name: 'Product Lifecycle',
    version: '1.0.0',
    description: 'The four-stage lifecycle — Introduction, Growth, Maturity, and Decline — describing revenue and profit patterns over a product\'s life, informing marketing, pricing, and investment strategy at each stage.',
    category: 'portfolio',
    origin: {
      type: 'practitioner',
      attribution: 'Theodore Levitt',
      description: 'Harvard Business Review',
      url: 'https://hbr.org/1965/11/exploit-the-product-life-cycle',
      year: 1965,
      license: 'public_domain',
    },
    tags: [
      'portfolio',
      'flow'
    ],
    slots: [
      {
        label: 'Product',
        entityTypeId: 'product',
        description: 'Product at a specific lifecycle stage — with stage-appropriate strategy for marketing, pricing, and investment'
      },
      {
        label: 'Metric',
        entityTypeId: 'metric',
        description: 'Stage-indicating metric — sales growth rate, market share, profit margin, or competitive intensity'
      },
      {
        label: 'Initiative',
        entityTypeId: 'product',
        description: 'Stage-appropriate strategic initiative — awareness (Introduction), scaling (Growth), efficiency (Maturity), or sunsetting (Decline)'
      },
      {
        label: 'Marketing Strategy',
        entityTypeId: 'marketing_strategy',
        description: 'Marketing strategy adapted to lifecycle stage — education (Intro), differentiation (Growth), loyalty (Maturity), harvesting (Decline)'
      },
      {
        label: 'Pricing Strategy',
        entityTypeId: 'pricing_strategy',
        description: 'Pricing strategy aligned with stage — skimming or penetration (Intro), competitive (Growth), value-based (Maturity), discount (Decline)'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'product',
            role: 'item'
          },
          {
            type: 'metric',
            role: 'item'
          },
          {
            type: 'marketing_strategy',
            role: 'item'
          },
          {
            type: 'pricing_strategy',
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
      purpose: 'Track a product through Introduction, Growth, Maturity, and Decline stages to adapt strategy, pricing, and investment to the current phase.',
      core_question: 'Which lifecycle stage is our product in, and is our strategy appropriate for that stage or stuck in a previous one?',
      when_to_use: [
        'You manage multiple products and need to allocate resources across them',
        'You need to assess the health and lifecycle stage of products',
        'Strategic decisions require a portfolio-level view'
      ],
      when_not_to_use: [
        'You have a single product with no portfolio complexity',
        'Portfolio decisions are made ad-hoc without need for frameworks'
      ]
    }
  },
  {
    id: 'ansoff-growth-matrix',
    name: 'Ansoff Growth Matrix',
    version: '1.0.0',
    description: 'A 2x2 growth strategy matrix crossing existing/new products with existing/new markets — yielding four strategies: Market Penetration, Market Development, Product Development, and Diversification.',
    category: 'portfolio',
    origin: {
      type: 'practitioner',
      attribution: 'Igor Ansoff',
      description: 'Published by Igor Ansoff in 1957 in Harvard Business Review. The product-market growth matrix remains one of the most cited strategic planning frameworks.',
      url: 'https://hbr.org/1957/09/strategies-for-diversification',
      year: 1957,
      license: 'public_domain',
    },
    tags: [
      'portfolio',
      'quadrant'
    ],
    slots: [
      {
        label: 'Product',
        entityTypeId: 'product',
        description: 'Product classified as existing or new — determining whether the strategy is penetration/development or development/diversification'
      },
      {
        label: 'Initiative',
        entityTypeId: 'product',
        description: 'Growth initiative in one of four quadrants — with risk level increasing from penetration (lowest) to diversification (highest)'
      },
      {
        label: 'Segment',
        entityTypeId: 'market_segment',
        description: 'Market segment classified as existing or new — the other axis determining the growth strategy quadrant'
      },
      {
        label: 'Revenue Stream',
        entityTypeId: 'revenue_stream',
        description: 'Revenue stream associated with the growth strategy — existing revenue defended or new revenue pursued'
      },
      {
        label: 'Capability',
        entityTypeId: 'capability',
        description: 'Capability required for the chosen strategy — product development (new products), market knowledge (new markets), or both (diversification)'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'product',
            role: 'item'
          },
          {
            type: 'revenue_stream',
            role: 'item'
          },
          {
            type: 'capability',
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
      pattern: 'quadrant'
    },
    presentation: {
      layout: {
        type: 'quadrant',
        x_axis: 'impact',
        y_axis: 'effort',
        x_label: 'Product',
        y_label: 'Initiative'
      },
      colour_by: 'group',
      card_fields: [
        'title',
        'description'
      ]
    },
    education: {
      purpose: 'Map four growth strategies — Market Penetration, Product Development, Market Development, Diversification — by crossing existing/new products with existing/new markets.',
      core_question: 'Should we grow by deepening in our current market, expanding to new markets, building new products, or diversifying entirely?',
      when_to_use: [
        'You manage multiple products and need to allocate resources across them',
        'You need to assess the health and lifecycle stage of products',
        'Strategic decisions require a portfolio-level view'
      ],
      when_not_to_use: [
        'You have a single product with no portfolio complexity',
        'Portfolio decisions are made ad-hoc without need for frameworks'
      ]
    }
  },
  {
    id: 'portfolio-kanban',
    name: 'Portfolio Kanban',
    version: '1.0.0',
    description: 'A portfolio-level kanban system managing the flow of strategic initiatives from ideation through analysis, approval, implementation, and done — with WIP limits ensuring focus and throughput.',
    category: 'portfolio',
    origin: {
      type: 'practitioner',
      attribution: 'SAFe',
      description: 'Scaled Agile Framework',
      url: 'https://www.scaledagileframework.com/portfolio-kanban/',
      year: 2011,
      license: 'open_attribution',
    },
    tags: [
      'portfolio',
      'flow'
    ],
    slots: [
      {
        label: 'Initiative',
        entityTypeId: 'initiative',
        description: 'Strategic initiative flowing through the portfolio kanban — from funnel through reviewing, analysing, implementing, to done'
      },
      {
        label: 'Portfolio',
        entityTypeId: 'portfolio',
        description: 'Portfolio governing the kanban — with investment themes, guardrails, and strategic intent guiding flow decisions'
      },
      {
        label: 'Product',
        entityTypeId: 'product',
        description: 'Product or value stream receiving the initiative — determining implementation capacity and delivery timeline'
      },
      {
        label: 'Metric',
        entityTypeId: 'metric',
        description: 'Flow metric — kanban lead time, WIP count, throughput, and cycle time at the portfolio level'
      },
      {
        label: 'Capability',
        entityTypeId: 'capability',
        description: 'Strategic capability the initiative builds or enhances — linking portfolio flow to capability-based planning'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'initiative',
          role: 'item'
        },
        {
          type: 'portfolio',
          role: 'item'
        },
        {
          type: 'product',
          role: 'item'
        },
        {
          type: 'metric',
          role: 'item'
        },
        {
          type: 'capability',
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
      purpose: 'Manage a portfolio of initiatives as a kanban board — Funnel, Analysing, Implementing, Done — with WIP limits to prevent strategic overcommitment.',
      core_question: 'How many strategic initiatives are we running simultaneously, and would reducing WIP help us finish the most important ones faster?',
      when_to_use: [
        'You manage multiple products and need to allocate resources across them',
        'You need to assess the health and lifecycle stage of products',
        'Strategic decisions require a portfolio-level view'
      ],
      when_not_to_use: [
        'You have a single product with no portfolio complexity',
        'Portfolio decisions are made ad-hoc without need for frameworks'
      ]
    }
  },
  {
    id: 'investment-thesis',
    approach_ids: ['plan'],
    name: 'Investment Thesis',
    version: '1.0.0',
    description: 'A structured articulation of why an investment in a product, market, or capability will generate returns — defining the hypothesis, evidence, assumptions, risks, and success criteria.',
    category: 'portfolio',
    origin: {
      type: 'practitioner',
      year: 2018,
      description: 'Adapted from venture capital and private equity for product portfolio management. An investment thesis articulates the strategic rationale for investing in a product or initiative.',
      license: 'cc_by',
    },
    tags: [
      'portfolio',
      'collection'
    ],
    slots: [
      {
        label: 'Initiative',
        entityTypeId: 'initiative',
        description: 'Strategic initiative or bet the investment thesis supports — the action being funded and evaluated'
      },
      {
        label: 'Metric',
        entityTypeId: 'metric',
        description: 'Success metric validating the thesis — revenue target, market share goal, or capability milestone with timeline'
      },
      {
        label: 'Product',
        entityTypeId: 'product',
        description: 'Product or product area the investment targets — the vehicle through which the thesis is executed'
      },
      {
        label: 'Revenue Stream',
        entityTypeId: 'revenue_stream',
        description: 'Expected revenue stream the investment will create or grow — the financial return justifying the thesis'
      },
      {
        label: 'Capability',
        entityTypeId: 'capability',
        description: 'Strategic capability the investment builds — the durable asset created beyond immediate financial returns'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'initiative',
          role: 'item'
        },
        {
          type: 'metric',
          role: 'item'
        },
        {
          type: 'product',
          role: 'item'
        },
        {
          type: 'revenue_stream',
          role: 'item'
        },
        {
          type: 'capability',
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
      purpose: 'Articulate the strategic rationale for a product investment — market opportunity, competitive advantage, required capabilities, expected returns — to justify resource allocation.',
      core_question: 'Why should we invest in this product or initiative — what is the market opportunity, our right to win, and the expected return?',
      when_to_use: [
        'You manage multiple products and need to allocate resources across them',
        'You need to assess the health and lifecycle stage of products',
        'Strategic decisions require a portfolio-level view'
      ],
      when_not_to_use: [
        'You have a single product with no portfolio complexity',
        'Portfolio decisions are made ad-hoc without need for frameworks'
      ]
    }
  }
]
