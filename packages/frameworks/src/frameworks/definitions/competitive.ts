/**
 * UPG Framework Definitions — Competitive
 * 11 frameworks for the competitive domain.
 */

import type { UPGFramework } from '../types.js'

export const COMPETITIVE_FRAMEWORKS: UPGFramework[] = [
  {
    id: 'competitive-matrix',
    name: 'Competitive Matrix',
    version: '1.0.0',
    description: 'Compare your product against competitors across key capabilities. Reveals gaps and differentiators.',
    category: 'competitive',
    origin: {
      type: 'practitioner',
      description: 'Standard competitive analysis tool used across strategy consulting and product management.',
      license: 'cc_by',
    },
    tags: [
      'competitive',
      'table'
    ],
    slots: [
      {
        label: 'Your Product',
        entityTypeId: 'product',
        description: 'Your product\'s capabilities'
      },
      {
        label: 'Competitor',
        entityTypeId: 'competitor',
        description: 'Each competitor being compared'
      },
      {
        label: 'Capability',
        entityTypeId: 'capability',
        description: 'The dimension being compared'
      },
      {
        label: 'Feature Gap',
        entityTypeId: 'feature',
        description: 'Features where you lead or lag'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'competitor',
          role: 'item'
        },
        {
          type: 'feature',
          role: 'item'
        },
        {
          type: 'capability',
          role: 'item'
        },
        {
          type: 'product',
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
            property: 'product',
            label: 'Your Product',
            sortable: true
          },
          {
            property: 'competitor',
            label: 'Competitor',
            sortable: true
          },
          {
            property: 'capability',
            label: 'Capability',
            sortable: true
          },
          {
            property: 'feature',
            label: 'Feature Gap',
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
      purpose: 'Compare your product against competitors across feature categories, making strengths and gaps visible at a glance for product strategy and sales enablement.',
      core_question: 'Where do we lead, where do we lag, and which gaps matter most to our target customers?',
      when_to_use: [
        'You are entering a crowded market and need to find differentiation',
        'A new competitor has emerged and you need to assess the threat',
        'You want to identify gaps in competitor offerings you can exploit'
      ],
      when_not_to_use: [
        'You are creating a new category with no direct competitors',
        'Over-indexing on competitors would distract from user needs'
      ]
    }
  },
  {
    id: 'feature-parity',
    name: 'Feature Parity',
    version: '1.0.0',
    description: 'Track which features you and competitors offer. Reveals gaps and differentiators.',
    category: 'competitive',
    origin: {
      type: 'practitioner',
      description: 'Standard competitive analysis tool for feature-by-feature comparison.',
      license: 'cc_by',
    },
    tags: [
      'competitive',
      'table'
    ],
    slots: [
      {
        label: 'Feature',
        entityTypeId: 'feature',
        description: 'Feature — feature entries to evaluate'
      },
      {
        label: 'Your Status',
        entityTypeId: 'feature',
        description: 'Built/Planned/Not planned'
      },
      {
        label: 'Competitor A',
        entityTypeId: 'competitor_feature',
        description: 'Competitor A — competitor feature entries to evaluate'
      },
      {
        label: 'Competitor B',
        entityTypeId: 'competitor_feature',
        description: 'Competitor B — competitor feature entries to evaluate'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'feature',
            role: 'item'
          },
          {
            type: 'competitor_feature',
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
            property: 'feature',
            label: 'Feature',
            sortable: true
          },
          {
            property: 'feature',
            label: 'Your Status',
            sortable: true
          },
          {
            property: 'competitor_feature',
            label: 'Competitor A',
            sortable: true
          },
          {
            property: 'competitor_feature',
            label: 'Competitor B',
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
      purpose: 'Track feature-by-feature parity with competitors to identify table-stakes gaps that block deals and areas where differentiation matters more than matching.',
      core_question: 'Which missing features are actually losing us deals versus which are nice-to-have distractions?',
      when_to_use: [
        'You are entering a crowded market and need to find differentiation',
        'A new competitor has emerged and you need to assess the threat',
        'You want to identify gaps in competitor offerings you can exploit'
      ],
      when_not_to_use: [
        'You are creating a new category with no direct competitors',
        'Over-indexing on competitors would distract from user needs'
      ]
    }
  },
  {
    id: 'positioning-map',
    name: 'Positioning Map',
    version: '1.0.0',
    description: 'Plot products on two axes (e.g., price vs quality) to find white space.',
    category: 'competitive',
    origin: {
      type: 'practitioner',
      attribution: 'Al Ries & Jack Trout',
      description: 'Popularised in Positioning: The Battle for Your Mind (McGraw-Hill). Foundational marketing strategy concept.',
      year: 1981,
      license: 'public_domain',
    },
    tags: [
      'competitive',
      'quadrant'
    ],
    slots: [
      {
        label: 'Premium Quality',
        entityTypeId: 'product',
        description: 'High price, high quality'
      },
      {
        label: 'Value Leader',
        entityTypeId: 'competitor',
        description: 'Low price, high quality'
      },
      {
        label: 'Luxury Niche',
        entityTypeId: 'product',
        description: 'High price, niche appeal'
      },
      {
        label: 'Mass Market',
        entityTypeId: 'competitor',
        description: 'Low price, basic quality'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'product',
            role: 'item'
          },
          {
            type: 'competitor',
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
        x_label: 'Premium Quality',
        y_label: 'Value Leader'
      },
      colour_by: 'group',
      card_fields: [
        'title',
        'description'
      ]
    },
    education: {
      purpose: 'Plot competitors on two strategic dimensions to reveal open spaces in the market where no one is competing — the visual cousin of Blue Ocean Strategy.',
      core_question: 'On the dimensions that matter most to buyers, where is the white space that no competitor occupies?',
      when_to_use: [
        'You are entering a crowded market and need to find differentiation',
        'A new competitor has emerged and you need to assess the threat',
        'You want to identify gaps in competitor offerings you can exploit'
      ],
      when_not_to_use: [
        'You are creating a new category with no direct competitors',
        'Over-indexing on competitors would distract from user needs'
      ]
    }
  },
  {
    id: 'vrio-analysis',
    name: 'VRIO Analysis',
    version: '1.0.0',
    description: 'Evaluate resources and capabilities through four questions: Is it Valuable? Rare? Costly to Imitate? Is the firm Organised to capture value?',
    category: 'competitive',
    origin: {
      type: 'practitioner',
      attribution: 'Jay Barney',
      description: 'Firm Resources and Sustained Competitive Advantage',
      url: 'https://en.wikipedia.org/wiki/VRIO',
      year: 1991,
      license: 'public_domain',
    },
    tags: [
      'competitive',
      'table'
    ],
    slots: [
      {
        label: 'Valuable?',
        entityTypeId: 'capability',
        description: 'Valuable? — capability entries to evaluate'
      },
      {
        label: 'Rare?',
        entityTypeId: 'capability',
        description: 'Rare? — capability entries to evaluate'
      },
      {
        label: 'Costly to Imitate?',
        entityTypeId: 'key_resource',
        description: 'Costly to Imitate? — key resource entries to evaluate'
      },
      {
        label: 'Organised?',
        entityTypeId: 'competitive_analysis',
        description: 'Organised? — competitive analysis entries to evaluate'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'capability',
            role: 'scored_item'
          },
          {
            type: 'key_resource',
            role: 'item'
          },
          {
            type: 'competitive_analysis',
            role: 'item'
          }
        ],
      required_properties: {},
      computed_properties: [
        {
          property: 'competitive_advantage',
          expression: 'valuable + rare + inimitable + organised',
          entity_type: 'capability',
          label: 'VRIO Score',
          format: 'number'
        }
      ]
    },
    structure: {
      pattern: 'table'
    },
    presentation: {
      layout: {
        type: 'table',
        columns: [
          {
            property: 'capability',
            label: 'Valuable?',
            sortable: true
          },
          {
            property: 'capability',
            label: 'Rare?',
            sortable: true
          },
          {
            property: 'key_resource',
            label: 'Costly to Imitate?',
            sortable: true
          },
          {
            property: 'competitive_analysis',
            label: 'Organised?',
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
      purpose: 'Evaluate resources and capabilities through four lenses — Valuable, Rare, Inimitable, Organised — to determine which ones create sustainable competitive advantage.',
      core_question: 'Which of our resources are truly rare and hard to copy, and are we organised to exploit them fully?',
      when_to_use: [
        'You are entering a crowded market and need to find differentiation',
        'A new competitor has emerged and you need to assess the threat',
        'You want to identify gaps in competitor offerings you can exploit'
      ],
      when_not_to_use: [
        'You are creating a new category with no direct competitors',
        'Over-indexing on competitors would distract from user needs'
      ]
    }
  },
  {
    id: 'competitive-battlecard',
    name: 'Competitive Battlecard',
    version: '1.0.0',
    description: 'A structured dossier for each competitor covering strengths, weaknesses, common objections, and rebuttals to arm sales and product teams.',
    category: 'competitive',
    origin: {
      type: 'practitioner',
      description: 'Evolved from sales enablement practice. Battlecards became a standard competitive intelligence deliverable as B2B sales teams needed quick-reference guides for handling competitive objections in real time.',
      license: 'cc_by',
    },
    tags: [
      'competitive',
      'matrix'
    ],
    slots: [
      {
        label: 'Competitor',
        entityTypeId: 'competitor',
        description: 'Place competitor entities in the Competitor position of the matrix'
      },
      {
        label: 'Strengths',
        entityTypeId: 'competitor_feature',
        description: 'Place competitor feature entities in the Strengths position of the matrix'
      },
      {
        label: 'Weaknesses',
        entityTypeId: 'competitor_feature',
        description: 'Place competitor feature entities in the Weaknesses position of the matrix'
      },
      {
        label: 'Objections',
        entityTypeId: 'objection',
        description: 'Place objection entities in the Objections position of the matrix'
      },
      {
        label: 'Rebuttals',
        entityTypeId: 'rebuttal',
        description: 'Place rebuttal entities in the Rebuttals position of the matrix'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'competitor',
          role: 'bucket'
        },
        {
          type: 'competitor_feature',
          role: 'bucket'
        },
        {
          type: 'objection',
          role: 'bucket'
        },
        {
          type: 'rebuttal',
          role: 'bucket'
        },
        {
          type: 'competitive_battle_card',
          role: 'bucket'
        },
        {
          type: 'positioning',
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
      purpose: 'Arm sales and marketing with a quick-reference card for each competitor — strengths, weaknesses, traps, landmines, and winning talk tracks.',
      core_question: 'When a prospect mentions this competitor, what do our reps say, what traps do they avoid, and where do we win?',
      when_to_use: [
        'You are entering a crowded market and need to find differentiation',
        'A new competitor has emerged and you need to assess the threat',
        'You want to identify gaps in competitor offerings you can exploit'
      ],
      when_not_to_use: [
        'You are creating a new category with no direct competitors',
        'Over-indexing on competitors would distract from user needs'
      ]
    }
  },
  {
    id: 'win-loss-analysis',
    approach_ids: ['inspect', 'reflect'],
    name: 'Win/Loss Analysis',
    version: '1.0.0',
    description: 'Systematically analyse won and lost deals to understand competitive dynamics, buyer decision criteria, and areas for improvement.',
    category: 'competitive',
    origin: {
      type: 'practitioner',
      description: 'Formalised as a discipline in the 1990s by competitive intelligence professionals. Clozd and other firms later productised the methodology, making structured buyer interviews a standard product and sales practice.',
      license: 'cc_by',
    },
    tags: [
      'competitive',
      'table'
    ],
    slots: [
      {
        label: 'Won Deals',
        entityTypeId: 'insight',
        description: 'Won Deals — insight entries to evaluate'
      },
      {
        label: 'Lost Deals',
        entityTypeId: 'insight',
        description: 'Lost Deals — insight entries to evaluate'
      },
      {
        label: 'Decision Criteria',
        entityTypeId: 'competitive_analysis',
        description: 'Decision Criteria — competitive analysis entries to evaluate'
      },
      {
        label: 'Competitors Involved',
        entityTypeId: 'competitor',
        description: 'Competitors Involved — competitor entries to evaluate'
      },
      {
        label: 'Learnings',
        entityTypeId: 'learning',
        description: 'Learnings — learning entries to evaluate'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'competitor',
            role: 'item'
          },
          {
            type: 'insight',
            role: 'item'
          },
          {
            type: 'competitive_analysis',
            role: 'item'
          },
          {
            type: 'learning',
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
            property: 'insight',
            label: 'Won Deals',
            sortable: true
          },
          {
            property: 'insight',
            label: 'Lost Deals',
            sortable: true
          },
          {
            property: 'competitive_analysis',
            label: 'Decision Criteria',
            sortable: true
          },
          {
            property: 'competitor',
            label: 'Competitors Involved',
            sortable: true
          },
          {
            property: 'learning',
            label: 'Learnings',
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
      purpose: 'Interview won and lost prospects to discover the real decision drivers — not what CRM says, but what buyers actually thought — and feed insights back into product and sales.',
      core_question: 'Why did we actually win or lose this deal — what did the buyer value, fear, or wish we had?',
      when_to_use: [
        'You are entering a crowded market and need to find differentiation',
        'A new competitor has emerged and you need to assess the threat',
        'You want to identify gaps in competitor offerings you can exploit'
      ],
      when_not_to_use: [
        'You are creating a new category with no direct competitors',
        'Over-indexing on competitors would distract from user needs'
      ]
    }
  },
  {
    id: 'perceptual-map',
    name: 'Perceptual Map',
    version: '1.0.0',
    description: 'Plot brands or products on two strategic dimensions to visualise market positioning and identify whitespace opportunities.',
    category: 'competitive',
    origin: {
      type: 'practitioner',
      description: 'Rooted in multidimensional scaling techniques from marketing research. Perceptual maps became a standard positioning tool in the 1980s, visualising how consumers perceive brands relative to competitors.',
      license: 'cc_by',
    },
    tags: [
      'competitive',
      'quadrant'
    ],
    slots: [
      {
        label: 'Dimension X',
        entityTypeId: 'competitive_analysis',
        description: 'Dimension X quadrant — place competitive analysis entities here based on their position on both axes'
      },
      {
        label: 'Dimension Y',
        entityTypeId: 'competitive_analysis',
        description: 'Dimension Y quadrant — place competitive analysis entities here based on their position on both axes'
      },
      {
        label: 'Brands / Products',
        entityTypeId: 'competitor',
        description: 'Brands / Products quadrant — place competitor entities here based on their position on both axes'
      },
      {
        label: 'Your Position',
        entityTypeId: 'positioning',
        description: 'Your Position quadrant — place positioning entities here based on their position on both axes'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'competitor',
            role: 'item'
          },
          {
            type: 'positioning',
            role: 'item'
          },
          {
            type: 'competitive_analysis',
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
        x_label: 'Dimension X',
        y_label: 'Dimension Y'
      },
      colour_by: 'group',
      card_fields: [
        'title',
        'description'
      ]
    },
    education: {
      purpose: 'Plot brands or products on two perceptual dimensions as seen by customers, revealing how the market actually perceives your positioning versus how you intend it.',
      core_question: 'How do customers perceive our position relative to competitors — and does their perception match our intended positioning?',
      when_to_use: [
        'You are entering a crowded market and need to find differentiation',
        'A new competitor has emerged and you need to assess the threat',
        'You want to identify gaps in competitor offerings you can exploit'
      ],
      when_not_to_use: [
        'You are creating a new category with no direct competitors',
        'Over-indexing on competitors would distract from user needs'
      ]
    }
  },
  {
    id: 'competitor-profile',
    name: 'Competitor Profile',
    version: '1.0.0',
    description: 'Build a comprehensive dossier on a competitor — covering strategy, product, team, funding, customers, strengths, and weaknesses.',
    category: 'competitive',
    origin: {
      type: 'practitioner',
      description: 'A fundamental competitive intelligence practice with roots in military intelligence analysis. Adapted for business strategy, it provides a structured dossier format for understanding a competitor\'s strategy and capabilities.',
      license: 'cc_by',
    },
    tags: [
      'competitive',
      'matrix'
    ],
    slots: [
      {
        label: 'Overview',
        entityTypeId: 'competitor',
        description: 'Place competitor entities in the Overview position of the matrix'
      },
      {
        label: 'Product & Features',
        entityTypeId: 'competitor_feature',
        description: 'Place competitor feature entities in the Product & Features position of the matrix'
      },
      {
        label: 'Target Market',
        entityTypeId: 'market_segment',
        description: 'Place market segment entities in the Target Market position of the matrix'
      },
      {
        label: 'Strengths',
        entityTypeId: 'insight',
        description: 'Place insight entities in the Strengths position of the matrix'
      },
      {
        label: 'Weaknesses',
        entityTypeId: 'insight',
        description: 'Place insight entities in the Weaknesses position of the matrix'
      },
      {
        label: 'Strategy',
        entityTypeId: 'competitive_analysis',
        description: 'Place competitive analysis entities in the Strategy position of the matrix'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'competitor',
          role: 'bucket'
        },
        {
          type: 'competitor_feature',
          role: 'bucket'
        },
        {
          type: 'market_segment',
          role: 'bucket'
        },
        {
          type: 'competitive_analysis',
          role: 'bucket'
        },
        {
          type: 'positioning',
          role: 'bucket'
        },
        {
          type: 'insight',
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
      purpose: 'Build a comprehensive profile of a competitor — strategy, strengths, weaknesses, likely moves, customer perception — as a living intelligence document.',
      core_question: 'What is this competitor\'s strategy, where are they vulnerable, and what move are they most likely to make next?',
      when_to_use: [
        'You are entering a crowded market and need to find differentiation',
        'A new competitor has emerged and you need to assess the threat',
        'You want to identify gaps in competitor offerings you can exploit'
      ],
      when_not_to_use: [
        'You are creating a new category with no direct competitors',
        'Over-indexing on competitors would distract from user needs'
      ]
    }
  },
  {
    id: 'technology-adoption-lifecycle',
    name: 'Technology Adoption Lifecycle',
    version: '1.0.0',
    description: 'Map adoption stages from Innovators through Early Adopters, Early Majority, Late Majority, and Laggards — with the critical chasm between early adopters and the mainstream.',
    category: 'competitive',
    origin: {
      type: 'practitioner',
      attribution: 'Geoffrey Moore',
      description: 'Originally described by Everett Rogers in \"Diffusion of Innovations\" (1962). Geoffrey Moore\'s \"Crossing the Chasm\" (1991) added the critical insight about the gap between early adopters and the early majority.',
      url: 'https://en.wikipedia.org/wiki/Crossing_the_Chasm',
      year: 1991,
      license: 'public_domain',
    },
    tags: [
      'competitive',
      'funnel'
    ],
    slots: [
      {
        label: 'Innovators',
        entityTypeId: 'persona',
        description: 'Innovators stage — track persona progression through this level of the funnel'
      },
      {
        label: 'Early Adopters',
        entityTypeId: 'persona',
        description: 'Early Adopters stage — track persona progression through this level of the funnel'
      },
      {
        label: 'The Chasm',
        entityTypeId: 'positioning',
        description: 'The Chasm stage — track positioning progression through this level of the funnel'
      },
      {
        label: 'Early Majority',
        entityTypeId: 'market_segment',
        description: 'Early Majority stage — track market segment progression through this level of the funnel'
      },
      {
        label: 'Late Majority',
        entityTypeId: 'market_segment',
        description: 'Late Majority stage — track market segment progression through this level of the funnel'
      },
      {
        label: 'Laggards',
        entityTypeId: 'market_segment',
        description: 'Laggards stage — track market segment progression through this level of the funnel'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'market_segment',
            role: 'item'
          },
          {
            type: 'persona',
            role: 'item'
          },
          {
            type: 'positioning',
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
      purpose: 'Identify which adoption segment your product is serving — Innovators, Early Adopters, Early Majority, Late Majority, Laggards — and adapt strategy to cross the chasm.',
      core_question: 'Which adoption segment are our current customers in, and what must change to reach the next segment across the chasm?',
      when_to_use: [
        'You are entering a crowded market and need to find differentiation',
        'A new competitor has emerged and you need to assess the threat',
        'You want to identify gaps in competitor offerings you can exploit'
      ],
      when_not_to_use: [
        'You are creating a new category with no direct competitors',
        'Over-indexing on competitors would distract from user needs'
      ]
    }
  },
  {
    id: 'competitive-response-matrix',
    name: 'Competitive Response Matrix',
    version: '1.0.0',
    description: 'Anticipate how competitors will react to your strategic moves — mapping likely responses by competitor and move type.',
    category: 'competitive',
    origin: {
      type: 'practitioner',
      description: 'Derived from game theory and competitive strategy literature. Used by strategy teams to pre-plan responses to competitor moves, reducing reaction time when competitive events occur.',
      license: 'cc_by',
    },
    tags: [
      'competitive',
      'matrix'
    ],
    slots: [
      {
        label: 'Your Strategic Moves',
        entityTypeId: 'initiative',
        description: 'Place competitor entities in the Your Strategic Moves position of the matrix'
      },
      {
        label: 'Competitors',
        entityTypeId: 'competitor',
        description: 'Place competitor entities in the Competitors position of the matrix'
      },
      {
        label: 'Likely Responses',
        entityTypeId: 'assumption',
        description: 'Place assumption entities in the Likely Responses position of the matrix'
      },
      {
        label: 'Risks',
        entityTypeId: 'risk',
        description: 'Place risk entities in the Risks position of the matrix'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'competitor',
          role: 'bucket'
        },
        {
          type: 'initiative',
          role: 'bucket'
        },
        {
          type: 'assumption',
          role: 'bucket'
        },
        {
          type: 'risk',
          role: 'bucket'
        },
        {
          type: 'competitive_analysis',
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
      purpose: 'Pre-plan responses to competitor moves — price cuts, feature launches, acquisitions — so the team reacts from strategy rather than panic.',
      core_question: 'If our main competitor does X tomorrow, what is our pre-planned response — and have we prepared the assets to execute it?',
      when_to_use: [
        'You are entering a crowded market and need to find differentiation',
        'A new competitor has emerged and you need to assess the threat',
        'You want to identify gaps in competitor offerings you can exploit'
      ],
      when_not_to_use: [
        'You are creating a new category with no direct competitors',
        'Over-indexing on competitors would distract from user needs'
      ]
    }
  },
]
