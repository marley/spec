/**
 * UPG Framework Definitions — Pricing
 * 10 frameworks for the pricing domain.
 */

import type { UPGFramework } from '../types.js'

export const PRICING_FRAMEWORKS: UPGFramework[] = [
  {
    id: 'van-westendorp',
    name: 'Van Westendorp Price Sensitivity',
    version: '1.0.0',
    description: 'Four pricing questions plotted on a chart: at what price is it too expensive, too cheap, getting expensive but acceptable, and a bargain? The intersections reveal optimal price, acceptable range, and stress points.',
    category: 'pricing',
    origin: {
      type: 'practitioner',
      attribution: 'van Westendorp',
      description: 'Developed by Dutch economist Peter van Westendorp in 1976. The Price Sensitivity Meter uses four questions to identify the acceptable price range and optimal price point without requiring conjoint analysis.',
      url: 'https://en.wikipedia.org/wiki/Van_Westendorp%27s_price_sensitivity_meter',
      year: 1976,
      license: 'public_domain',
    },
    tags: [
      'pricing',
      'quadrant'
    ],
    slots: [
      {
        label: 'Too Expensive',
        entityTypeId: 'metric',
        description: 'Price at which most reject as overpriced'
      },
      {
        label: 'Too Cheap',
        entityTypeId: 'metric',
        description: 'Price at which quality is doubted'
      },
      {
        label: 'Getting Expensive',
        entityTypeId: 'metric',
        description: 'Price that causes hesitation but is acceptable'
      },
      {
        label: 'Bargain',
        entityTypeId: 'metric',
        description: 'Price seen as a great deal'
      },
      {
        label: 'Pricing Strategy',
        entityTypeId: 'pricing_strategy',
        description: 'Intersection: optimal price'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'pricing_strategy',
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
          property: 'optimal_price',
          expression: '(point_of_marginal_cheapness + point_of_marginal_expensiveness) / 2',
          entity_type: 'metric',
          label: 'Optimal Price Point',
          format: 'currency'
        }
      ]
    },
    structure: {
      pattern: 'quadrant'
    },
    presentation: {
      layout: {
        type: 'quadrant',
        x_axis: 'impact',
        y_axis: 'effort',
        x_label: 'metric',
        y_label: 'Metric'
      },
      colour_by: 'group',
      card_fields: [
        'title',
        'description'
      ]
    },
    education: {
      purpose: 'Determine acceptable price ranges by asking four pricing questions — too cheap, cheap, expensive, too expensive — and plotting the intersection points.',
      core_question: 'What price range do our target customers consider acceptable, and where is the optimal price point within that range?',
      when_to_use: [
        'You need to set or change pricing for your product',
        'You want to understand willingness to pay and price sensitivity',
        'You are designing a pricing model for a new product or tier'
      ],
      when_not_to_use: [
        'Pricing is fixed by regulation or contractual obligations',
        'The product is free and monetisation is not a priority'
      ]
    }
  },
  {
    id: 'freemium-model',
    name: 'Freemium Model',
    version: '1.0.0',
    description: 'Design the boundary between free and paid. Determine which features stay free to drive adoption, which go behind the paywall to drive revenue, and what triggers the upgrade moment.',
    category: 'pricing',
    origin: {
      type: 'practitioner',
      year: 2006,
      description: 'The term \"freemium\" was coined by Jarid Lukin and popularised by Fred Wilson around 2006. The model — free basic tier with paid upgrades — became the dominant SaaS acquisition strategy.',
      license: 'cc_by',
    },
    tags: [
      'pricing',
      'flow'
    ],
    slots: [
      {
        label: 'Free Tier',
        entityTypeId: 'pricing_tier',
        description: 'Features available for free'
      },
      {
        label: 'Paid Tier',
        entityTypeId: 'pricing_tier',
        description: 'Premium features behind paywall'
      },
      {
        label: 'Paywall',
        entityTypeId: 'paywall',
        description: 'What triggers the upgrade prompt'
      },
      {
        label: 'Metric',
        entityTypeId: 'metric',
        description: 'Free-to-paid conversion rate goal'
      },
      {
        label: 'Pricing Strategy',
        entityTypeId: 'pricing_strategy',
        description: 'Unit of value that scales with usage'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'pricing_strategy',
            role: 'item'
          },
          {
            type: 'pricing_tier',
            role: 'item'
          },
          {
            type: 'paywall',
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
      purpose: 'Design the boundary between free and paid tiers so the free product drives viral adoption while the paid product captures willingness to pay from power users.',
      core_question: 'Where should the free/paid boundary sit so the free tier drives adoption without cannibalising revenue?',
      when_to_use: [
        'You need to set or change pricing for your product',
        'You want to understand willingness to pay and price sensitivity',
        'You are designing a pricing model for a new product or tier'
      ],
      when_not_to_use: [
        'Pricing is fixed by regulation or contractual obligations',
        'The product is free and monetisation is not a priority'
      ]
    }
  },
  {
    id: 'usage-based-pricing',
    name: 'Usage-Based Pricing',
    version: '1.0.0',
    description: 'Price around a value metric that correlates with customer value. Identify what customers consume (API calls, seats, storage, events), set pricing tiers around that metric, and align revenue with usage.',
    category: 'pricing',
    origin: {
      type: 'practitioner',
      attribution: 'OpenView / Kyle Poyar',
      description: 'Usage-Based Pricing Playbook',
      url: 'https://openviewpartners.com/usage-based-pricing/',
      year: 2020,
      license: 'open_attribution',
    },
    tags: [
      'pricing',
      'collection'
    ],
    slots: [
      {
        label: 'Value Metric',
        entityTypeId: 'pricing_strategy',
        description: 'The unit of consumption that drives pricing'
      },
      {
        label: 'Usage Tier',
        entityTypeId: 'pricing_tier',
        description: 'Usage-based tiers'
      },
      {
        label: 'Overage Policy',
        entityTypeId: 'pricing_strategy',
        description: 'What happens when limits are exceeded'
      },
      {
        label: 'Billing Model',
        entityTypeId: 'pricing_strategy',
        description: 'Pre-paid, post-paid, or committed'
      },
      {
        label: 'Metric',
        entityTypeId: 'metric',
        description: 'How usage is measured and reported'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'pricing_strategy',
            role: 'item'
          },
          {
            type: 'pricing_tier',
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
      purpose: 'Design pricing that scales with customer usage — per API call, per seat, per GB — aligning cost with value so customers pay proportionally to the value they receive.',
      core_question: 'Which usage metric best correlates with the value customers get, and how do we set unit prices that are fair and predictable?',
      when_to_use: [
        'You need to set or change pricing for your product',
        'You want to understand willingness to pay and price sensitivity',
        'You are designing a pricing model for a new product or tier'
      ],
      when_not_to_use: [
        'Pricing is fixed by regulation or contractual obligations',
        'The product is free and monetisation is not a priority'
      ]
    }
  },
  {
    id: 'good-better-best',
    name: 'Good-Better-Best Packaging',
    version: '1.0.0',
    description: 'Three-tier pricing architecture. Good tier for entry-level adoption, Better tier as the most popular with the best value ratio, and Best tier for power users willing to pay premium.',
    category: 'pricing',
    origin: {
      type: 'practitioner',
      year: 2010,
      description: 'Standard SaaS pricing practice, popularised by pricing consultants and companies like ProfitWell. The three-tier model leverages anchoring psychology and captures willingness to pay across segments.',
      license: 'cc_by',
    },
    tags: [
      'pricing',
      'table'
    ],
    slots: [
      {
        label: 'Good Tier',
        entityTypeId: 'pricing_tier',
        description: 'Entry-level tier with core features'
      },
      {
        label: 'Better Tier',
        entityTypeId: 'pricing_tier',
        description: 'Mid-tier with the best value (default recommendation)'
      },
      {
        label: 'Best Tier',
        entityTypeId: 'pricing_tier',
        description: 'Premium tier with all features'
      },
      {
        label: 'Feature',
        entityTypeId: 'feature',
        description: 'Features that separate tiers'
      },
      {
        label: 'Metric',
        entityTypeId: 'metric',
        description: 'Price relationship between tiers'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'pricing_tier',
            role: 'item'
          },
          {
            type: 'feature',
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
            property: 'pricing_tier',
            label: 'pricing_tier',
            sortable: true
          },
          {
            property: 'pricing_tier',
            label: 'Package',
            sortable: true
          },
          {
            property: 'pricing_tier',
            label: 'Package',
            sortable: true
          },
          {
            property: 'feature',
            label: 'Feature',
            sortable: true
          },
          {
            property: 'metric',
            label: 'Metric',
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
      purpose: 'Structure three pricing tiers — Good (entry), Better (popular), Best (premium) — that naturally guide customers to the middle tier while capturing willingness to pay at both ends.',
      core_question: 'Are our three tiers clearly differentiated, and does the middle tier feel like the obvious choice for most customers?',
      when_to_use: [
        'You need to set or change pricing for your product',
        'You want to understand willingness to pay and price sensitivity',
        'You are designing a pricing model for a new product or tier'
      ],
      when_not_to_use: [
        'Pricing is fixed by regulation or contractual obligations',
        'The product is free and monetisation is not a priority'
      ]
    }
  },
  {
    id: 'value-based-pricing',
    name: 'Value-Based Pricing',
    version: '1.0.0',
    description: 'Price based on the value delivered to the customer, not on cost-plus or competitor benchmarking. Quantify the economic value your product creates, then capture a fair share of that value.',
    category: 'pricing',
    origin: {
      type: 'practitioner',
      attribution: 'Tom Nagle',
      description: 'The Strategy and Tactics of Pricing',
      url: 'https://www.amazon.com/Strategy-Tactics-Pricing-Growing-Profitably/dp/0131856774',
      year: 1987,
      license: 'published_methodology',
    },
    tags: [
      'pricing',
      'flow'
    ],
    slots: [
      {
        label: 'Economic Value',
        entityTypeId: 'metric',
        description: 'Quantified value delivered to the customer'
      },
      {
        label: 'Reference Price',
        entityTypeId: 'metric',
        description: 'Price of the next-best alternative'
      },
      {
        label: 'Differentiation Value',
        entityTypeId: 'value_proposition',
        description: 'Additional value beyond the alternative'
      },
      {
        label: 'Value Capture Ratio',
        entityTypeId: 'pricing_strategy',
        description: 'Percentage of value captured as price'
      },
      {
        label: 'Recommended Price',
        entityTypeId: 'pricing_strategy',
        description: 'Final price based on value analysis'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'pricing_strategy',
            role: 'item'
          },
          {
            type: 'metric',
            role: 'item'
          },
          {
            type: 'value_proposition',
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
      purpose: 'Set prices based on the economic value delivered to the customer — not cost-plus or competitor-matching — to capture a fair share of the value the product creates.',
      core_question: 'What is this product worth to our customers in measurable terms, and are we pricing to capture a portion of that value?',
      when_to_use: [
        'You need to set or change pricing for your product',
        'You want to understand willingness to pay and price sensitivity',
        'You are designing a pricing model for a new product or tier'
      ],
      when_not_to_use: [
        'Pricing is fixed by regulation or contractual obligations',
        'The product is free and monetisation is not a priority'
      ]
    }
  },
  {
    id: 'monetisation-strategy',
    approach_ids: ['plan'],
    name: 'Monetisation Strategy Canvas',
    version: '1.0.0',
    description: 'Comprehensive monetisation plan covering four questions: Who pays (customer segments), What for (value units), How (pricing model), and When (billing timing). Maps the full revenue architecture.',
    category: 'pricing',
    origin: {
      type: 'practitioner',
      description: 'Synthesised from pricing strategy and business model design. Monetisation strategy canvases bring together free/paid boundaries, revenue mechanics, and growth economics in one view.',
      license: 'cc_by',
    },
    tags: [
      'pricing',
      'matrix'
    ],
    slots: [
      {
        label: 'Who Pays',
        entityTypeId: 'persona',
        description: 'Customer segments that generate revenue'
      },
      {
        label: 'What For',
        entityTypeId: 'revenue_stream',
        description: 'Units of value being monetised'
      },
      {
        label: 'Pricing Model',
        entityTypeId: 'pricing_strategy',
        description: 'Pricing model (subscription, usage, transaction)'
      },
      {
        label: 'Billing Timing',
        entityTypeId: 'pricing_strategy',
        description: 'Billing timing (upfront, monthly, annual, metered)'
      },
      {
        label: 'Metric',
        entityTypeId: 'metric',
        description: 'Revenue goals by segment'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'pricing_strategy',
          role: 'bucket'
        },
        {
          type: 'revenue_stream',
          role: 'bucket'
        },
        {
          type: 'pricing_tier',
          role: 'bucket'
        },
        {
          type: 'metric',
          role: 'bucket'
        },
        {
          type: 'persona',
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
      purpose: 'Design the overall monetisation approach — which features are free, which are paid, how revenue grows with usage, when to upsell — as a coherent strategy rather than ad-hoc pricing.',
      core_question: 'How does our monetisation strategy align with how customers experience and get value from our product?',
      when_to_use: [
        'You need to set or change pricing for your product',
        'You want to understand willingness to pay and price sensitivity',
        'You are designing a pricing model for a new product or tier'
      ],
      when_not_to_use: [
        'Pricing is fixed by regulation or contractual obligations',
        'The product is free and monetisation is not a priority'
      ]
    }
  },
  {
    id: 'pricing-page-optimisation',
    approach_ids: ['plan'],
    name: 'Pricing Page Optimisation',
    version: '1.0.0',
    description: 'Audit and optimise the pricing page for conversion. Cover tier naming, feature comparison, social proof, FAQ, annual vs monthly toggle, CTA design, and trust signals.',
    category: 'pricing',
    origin: {
      type: 'practitioner',
      description: 'Evolved from conversion rate optimisation applied specifically to SaaS pricing pages. Best practices have been documented by pricing specialists like Patrick Campbell (ProfitWell) and Kyle Poyar (OpenView).',
      license: 'cc_by',
    },
    tags: [
      'pricing',
      'collection'
    ],
    slots: [
      {
        label: 'Tier Naming',
        entityTypeId: 'pricing_tier',
        description: 'How tiers are named and ordered'
      },
      {
        label: 'Feature Comparison',
        entityTypeId: 'pricing_tier',
        description: 'Clear feature comparison across tiers'
      },
      {
        label: 'Social Proof',
        entityTypeId: 'pricing_strategy',
        description: 'Testimonials, logos, trust badges'
      },
      {
        label: 'FAQ',
        entityTypeId: 'pricing_strategy',
        description: 'Common pricing questions answered'
      },
      {
        label: 'Paywall',
        entityTypeId: 'paywall',
        description: 'Call-to-action design and copy'
      },
      {
        label: 'Metric',
        entityTypeId: 'metric',
        description: 'Pricing page conversion rate'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'pricing_tier',
          role: 'item'
        },
        {
          type: 'pricing_strategy',
          role: 'item'
        },
        {
          type: 'paywall',
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
      purpose: 'Optimise the pricing page — tier presentation, feature comparison, CTAs, FAQ, social proof — to maximise conversion from visitor to paying customer.',
      core_question: 'Does our pricing page make it easy for prospects to choose the right tier and start paying, or is it creating confusion and abandonment?',
      when_to_use: [
        'You need to set or change pricing for your product',
        'You want to understand willingness to pay and price sensitivity',
        'You are designing a pricing model for a new product or tier'
      ],
      when_not_to_use: [
        'Pricing is fixed by regulation or contractual obligations',
        'The product is free and monetisation is not a priority'
      ]
    }
  },
  {
    id: 'discount-strategy-framework',
    name: 'Discount Strategy',
    version: '1.0.0',
    description: 'Structured rules for when and how to discount. Define discount types (volume, annual, competitive), approval thresholds, maximum discount depth, and guard rails to protect pricing integrity.',
    category: 'pricing',
    origin: {
      type: 'practitioner',
      description: 'Standard revenue operations practice. Discount strategy frameworks define guardrails for when, why, and how much to discount, protecting price integrity while enabling strategic flexibility.',
      license: 'cc_by',
    },
    tags: [
      'pricing',
      'table'
    ],
    slots: [
      {
        label: 'Discount Type',
        entityTypeId: 'discount_strategy',
        description: 'Volume, annual commitment, competitive, strategic'
      },
      {
        label: 'Approval Threshold',
        entityTypeId: 'discount_strategy',
        description: 'Who can approve at each discount level'
      },
      {
        label: 'Maximum Depth',
        entityTypeId: 'metric',
        description: 'Deepest allowed discount'
      },
      {
        label: 'Guard Rail',
        entityTypeId: 'discount_strategy',
        description: 'Rules that prevent excessive discounting'
      },
      {
        label: 'Impact Metric',
        entityTypeId: 'metric',
        description: 'How discount impact is measured'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'discount_strategy',
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
            property: 'discount_strategy',
            label: 'discount_strategy',
            sortable: true
          },
          {
            property: 'discount_strategy',
            label: 'Discount Strategy',
            sortable: true
          },
          {
            property: 'metric',
            label: 'Metric',
            sortable: true
          },
          {
            property: 'discount_strategy',
            label: 'Discount Strategy',
            sortable: true
          },
          {
            property: 'metric',
            label: 'Metric',
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
      purpose: 'Define when, why, and how to offer discounts — annual prepay, volume, strategic, competitive — while protecting price integrity and avoiding a race to the bottom.',
      core_question: 'Are our discounts strategic and controlled, or are they ad-hoc concessions that are training customers to never pay full price?',
      when_to_use: [
        'You need to set or change pricing for your product',
        'You want to understand willingness to pay and price sensitivity',
        'You are designing a pricing model for a new product or tier'
      ],
      when_not_to_use: [
        'Pricing is fixed by regulation or contractual obligations',
        'The product is free and monetisation is not a priority'
      ]
    }
  },
  {
    id: 'conjoint-analysis',
    name: 'Conjoint Analysis',
    version: '1.0.0',
    description: 'Quantify willingness to pay per feature by presenting trade-off scenarios. Users choose between product bundles with different features and prices, revealing the relative value of each attribute.',
    category: 'pricing',
    origin: {
      type: 'practitioner',
      attribution: 'Green & Rao',
      description: 'Conjoint Measurement for Quantifying Judgmental Data',
      url: 'https://en.wikipedia.org/wiki/Conjoint_analysis',
      year: 1971,
      license: 'public_domain',
    },
    tags: [
      'pricing',
      'table'
    ],
    slots: [
      {
        label: 'Attribute',
        entityTypeId: 'feature',
        description: 'Product feature or dimension being tested'
      },
      {
        label: 'Attribute Level',
        entityTypeId: 'pricing_tier',
        description: 'Variations of each attribute (e.g., 10GB vs 100GB)'
      },
      {
        label: 'Part-Worth Utility',
        entityTypeId: 'metric',
        description: 'Relative value of each level'
      },
      {
        label: 'Willingness to Pay',
        entityTypeId: 'metric',
        description: 'WTP at different price points'
      },
      {
        label: 'Pricing Strategy',
        entityTypeId: 'pricing_strategy',
        description: 'Highest-value feature combination'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'pricing_strategy',
          role: 'item'
        },
        {
          type: 'feature',
          role: 'scored_item'
        },
        {
          type: 'pricing_tier',
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
          property: 'part_worth',
          expression: 'utility_score / total_utility',
          entity_type: 'feature',
          label: 'Part Worth',
          format: 'percentage'
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
            property: 'feature',
            label: 'feature',
            sortable: true
          },
          {
            property: 'pricing_tier',
            label: 'Package',
            sortable: true
          },
          {
            property: 'metric',
            label: 'Metric',
            sortable: true
          },
          {
            property: 'metric',
            label: 'Metric',
            sortable: true
          },
          {
            property: 'pricing_strategy',
            label: 'Pricing Strategy',
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
      purpose: 'Determine how customers value different product attributes by presenting trade-off choices, revealing willingness to pay for specific features and bundles.',
      core_question: 'Which feature combinations do customers value most, and how much incremental willingness to pay does each feature add?',
      when_to_use: [
        'You need to set or change pricing for your product',
        'You want to understand willingness to pay and price sensitivity',
        'You are designing a pricing model for a new product or tier'
      ],
      when_not_to_use: [
        'Pricing is fixed by regulation or contractual obligations',
        'The product is free and monetisation is not a priority'
      ]
    }
  },
  {
    id: 'expansion-revenue-model',
    name: 'Expansion Revenue Model',
    version: '1.0.0',
    description: 'Design the land-and-expand motion. Start with a small initial deal, deliver value quickly, identify expansion triggers (more users, more features, higher usage), and systematically grow accounts.',
    category: 'pricing',
    origin: {
      type: 'practitioner',
      year: 2015,
      description: 'Formalised by the SaaS metrics community around 2015, as net revenue retention became a key indicator of business health. Models the mechanics of seat growth, usage expansion, and tier upgrades.',
      license: 'cc_by',
    },
    tags: [
      'pricing',
      'flow'
    ],
    slots: [
      {
        label: 'Land Deal',
        entityTypeId: 'pricing_tier',
        description: 'Initial deal structure and entry point'
      },
      {
        label: 'Trial Config',
        entityTypeId: 'trial_config',
        description: 'Driving product adoption within the account'
      },
      {
        label: 'Paywall',
        entityTypeId: 'paywall',
        description: 'Events that signal expansion opportunity'
      },
      {
        label: 'Pricing Strategy',
        entityTypeId: 'pricing_strategy',
        description: 'Upsell, cross-sell, or add-seat motions'
      },
      {
        label: 'Metric',
        entityTypeId: 'metric',
        description: 'NRR target metric'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'pricing_strategy',
          role: 'item'
        },
        {
          type: 'pricing_tier',
          role: 'item'
        },
        {
          type: 'metric',
          role: 'item'
        },
        {
          type: 'trial_config',
          role: 'item'
        },
        {
          type: 'paywall',
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
      purpose: 'Design the mechanics of revenue expansion within existing accounts — seat growth, usage upgrades, add-on purchases, tier upgrades — so net revenue retention exceeds 100%.',
      core_question: 'What natural expansion triggers exist in our product, and are we making it easy for existing customers to spend more as they get more value?',
      when_to_use: [
        'You need to set or change pricing for your product',
        'You want to understand willingness to pay and price sensitivity',
        'You are designing a pricing model for a new product or tier'
      ],
      when_not_to_use: [
        'Pricing is fixed by regulation or contractual obligations',
        'The product is free and monetisation is not a priority'
      ]
    }
  }
]
