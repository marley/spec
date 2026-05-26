/**
 * UPG Framework Definitions — Growth
 * 15 frameworks for the growth domain.
 */

import type { UPGFramework } from '../types.js'

export const GROWTH_FRAMEWORKS: UPGFramework[] = [
  {
    id: 'pirate-metrics-aarrr',
    name: 'Pirate Metrics AARRR',
    version: '1.0.0',
    description: 'Track user lifecycle across five stages: Acquisition, Activation, Retention, Revenue, and Referral.',
    category: 'growth',
    origin: {
      type: 'practitioner',
      attribution: 'Dave McClure',
      description: 'Presented by Dave McClure at 500 Startups. Became the default growth metrics framework for startups.',
      url: 'https://www.slideshare.net/dmc500hats/startup-metrics-for-pirates-long-version',
      year: 2007,
      license: 'open_attribution',
    },
    tags: [
      'growth',
      'funnel'
    ],
    slots: [
      {
        label: 'Acquisition',
        entityTypeId: 'metric',
        description: 'How do users find you?'
      },
      {
        label: 'Activation',
        entityTypeId: 'metric',
        description: 'Do users have a great first experience?'
      },
      {
        label: 'Retention',
        entityTypeId: 'metric',
        description: 'Do users come back?'
      },
      {
        label: 'Revenue',
        entityTypeId: 'metric',
        description: 'Can you monetise the behaviour?'
      },
      {
        label: 'Referral',
        entityTypeId: 'metric',
        description: 'Do users tell others?'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'metric',
            role: 'item'
          }
        ],
      required_properties: {},
      computed_properties: [
        {
          property: 'conversion_rate',
          expression: '(stage_exits / stage_entries) * 100',
          entity_type: 'metric',
          label: 'Stage Conversion',
          format: 'percentage'
        }
      ]
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
      purpose: 'Track the five stages of the customer lifecycle (Acquisition, Activation, Retention, Revenue, Referral) to find and fix leaks in the growth funnel.',
      core_question: 'Where in the customer lifecycle are we losing users, and which stage offers the highest-leverage improvement?',
      when_to_use: [
        'You need to systematically identify and optimise growth levers',
        'User acquisition, activation, or retention metrics need improvement',
        'You want to build a structured growth experimentation practice'
      ],
      when_not_to_use: [
        'The product has not yet achieved product-market fit',
        'Growth would scale problems rather than value'
      ]
    }
  },
  {
    id: 'growth-model',
    name: 'Growth Model',
    version: '1.0.0',
    description: 'Map the acquisition, activation, and retention loops that drive sustainable growth. Identifies the levers that compound.',
    category: 'growth',
    origin: {
      type: 'practitioner',
      description: 'Common growth team framework for modelling compounding acquisition and retention loops.',
      license: 'cc_by',
    },
    tags: [
      'growth',
      'flow'
    ],
    slots: [
      {
        label: 'Acquisition Loop',
        entityTypeId: 'metric',
        description: 'How new users discover the product'
      },
      {
        label: 'Activation Step',
        entityTypeId: 'outcome',
        description: 'The aha moment that converts signups to users'
      },
      {
        label: 'Retention Loop',
        entityTypeId: 'metric',
        description: 'What brings users back repeatedly'
      },
      {
        label: 'Growth Lever',
        entityTypeId: 'feature',
        description: 'Feature or mechanism that amplifies the loop'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'metric',
            role: 'item'
          },
          {
            type: 'outcome',
            role: 'item'
          },
          {
            type: 'feature',
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
      purpose: 'Build a quantitative model of your growth engine (acquisition, activation, retention, revenue). Identify which lever moves the top-line number most.',
      core_question: 'Which single metric improvement (conversion rate, retention, referral rate) would have the largest compound effect on growth?',
      when_to_use: [
        'You need to systematically identify and optimise growth levers',
        'User acquisition, activation, or retention metrics need improvement',
        'You want to build a structured growth experimentation practice'
      ],
      when_not_to_use: [
        'The product has not yet achieved product-market fit',
        'Growth would scale problems rather than value'
      ]
    }
  },
  {
    id: 'retention-cohort',
    name: 'Retention Cohort',
    version: '1.0.0',
    description: 'Track how cohorts of users behave over time. Reveals retention curves, drop-off points, and improvement trends.',
    category: 'growth',
    origin: {
      type: 'practitioner',
      description: 'Standard analytics technique for measuring user retention. Foundational to growth and product analytics.',
      license: 'cc_by',
    },
    tags: [
      'growth',
      'table'
    ],
    slots: [
      {
        label: 'Cohort',
        entityTypeId: 'cohort',
        description: 'Group of users by signup date or attribute'
      },
      {
        label: 'Time Period',
        entityTypeId: 'metric',
        description: 'Week, month, or quarter since signup'
      },
      {
        label: 'Retention Rate',
        entityTypeId: 'metric',
        description: 'Percentage of cohort still active'
      },
      {
        label: 'Target Segment',
        entityTypeId: 'persona',
        description: 'User segment being analysed'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'metric',
            role: 'item'
          },
          {
            type: 'persona',
            role: 'item'
          },
          {
            type: 'cohort',
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
            label: 'Cohort',
            sortable: true
          },
          {
            property: 'title',
            label: 'Time Period',
            sortable: true
          },
          {
            property: 'description',
            label: 'Retention Rate',
          },
          {
            property: 'title',
            label: 'Target Segment',
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
      purpose: 'Track user retention by signup cohort over time, revealing whether product changes actually improve long-term engagement or just boost short-term vanity metrics.',
      core_question: 'Are newer cohorts retaining better than older ones, and at which time interval do we lose the most users?',
      when_to_use: [
        'You need to systematically identify and optimise growth levers',
        'User acquisition, activation, or retention metrics need improvement',
        'You want to build a structured growth experimentation practice'
      ],
      when_not_to_use: [
        'The product has not yet achieved product-market fit',
        'Growth would scale problems rather than value'
      ]
    }
  },
  {
    id: 'viral-loop',
    approach_ids: ['trace'],
    name: 'Viral Loop',
    version: '1.0.0',
    description: 'Model the cycle where users invite others who become users who invite others. K-factor > 1 means viral growth.',
    category: 'growth',
    origin: {
      type: 'practitioner',
      attribution: 'Andrew Chen',
      description: 'Popularised by Andrew Chen\'s essays on viral growth. Models the invite-signup-invite cycle that drives organic growth.',
      license: 'open_attribution',
    },
    tags: [
      'growth',
      'flow'
    ],
    slots: [
      {
        label: 'Trigger',
        entityTypeId: 'event_schema',
        description: 'What prompts a user to invite others'
      },
      {
        label: 'Invite Mechanism',
        entityTypeId: 'feature',
        description: 'How users share or invite'
      },
      {
        label: 'Conversion',
        entityTypeId: 'metric',
        description: 'What percentage of invitees sign up'
      },
      {
        label: 'K-Factor',
        entityTypeId: 'metric',
        description: 'Invites per user × conversion rate'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'metric',
            role: 'item'
          },
          {
            type: 'feature',
            role: 'item'
          },
          {
            type: 'event_schema',
            role: 'item'
          }
        ],
      required_properties: {},
      computed_properties: [
        {
          property: 'k_factor',
          expression: 'invites_per_user * conversion_rate',
          entity_type: 'metric',
          label: 'K-Factor',
          format: 'number'
        }
      ]
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
      purpose: 'Map the mechanics of how one user brings in more users (viral coefficient and cycle time). Determine whether organic growth is self-sustaining.',
      core_question: 'Is each existing user bringing in more than one new user, and how fast is that loop cycling?',
      when_to_use: [
        'You need to systematically identify and optimise growth levers',
        'User acquisition, activation, or retention metrics need improvement',
        'You want to build a structured growth experimentation practice'
      ],
      when_not_to_use: [
        'The product has not yet achieved product-market fit',
        'Growth would scale problems rather than value'
      ]
    }
  },
  {
    id: 'hook-model',
    name: 'Hook Model',
    version: '1.0.0',
    description: 'Design habit-forming products through four phases: Trigger, Action, Variable Reward, and Investment.',
    category: 'growth',
    origin: {
      type: 'practitioner',
      attribution: 'Nir Eyal',
      description: 'Published in Hooked: How to Build Habit-Forming Products (Portfolio/Penguin). Based on behavioural psychology research.',
      year: 2014,
      license: 'published_methodology',
    },
    tags: [
      'growth',
      'flow'
    ],
    slots: [
      {
        label: 'Trigger',
        entityTypeId: 'need',
        description: 'External or internal cue that initiates behaviour'
      },
      {
        label: 'Action',
        entityTypeId: 'feature',
        description: 'Simplest behaviour in anticipation of reward'
      },
      {
        label: 'Variable Reward',
        entityTypeId: 'outcome',
        description: 'Unpredictable positive reinforcement'
      },
      {
        label: 'Investment',
        entityTypeId: 'feature',
        description: 'User action that improves the next cycle'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'feature',
            role: 'item'
          },
          {
            type: 'outcome',
            role: 'item'
          },
          {
            type: 'need',
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
      purpose: 'Design habit-forming products through a four-phase loop (Trigger, Action, Variable Reward, Investment) that brings users back without expensive re-engagement.',
      core_question: 'Does our product create a self-reinforcing cycle where each pass through the loop increases the user\'s investment and likelihood of return?',
      when_to_use: [
        'You need to systematically identify and optimise growth levers',
        'User acquisition, activation, or retention metrics need improvement',
        'You want to build a structured growth experimentation practice'
      ],
      when_not_to_use: [
        'The product has not yet achieved product-market fit',
        'Growth would scale problems rather than value'
      ]
    }
  },
  {
    id: 'bullseye-framework',
    name: 'Bullseye Framework',
    version: '1.0.0',
    description: 'Test 19 traction channels systematically. Start with the outer ring (what\'s possible), narrow to the middle ring (what\'s probable), then focus on the inner ring (what\'s working). Run cheap tests across all channels to find your bullseye.',
    category: 'growth',
    origin: {
      type: 'practitioner',
      attribution: 'Weinberg & Mares',
      description: 'Traction: How Any Startup Can Achieve Explosive Customer Growth',
      url: 'https://www.amazon.com/Traction-Startup-Achieve-Explosive-Customer/dp/1591848369',
      year: 2015,
      license: 'published_methodology',
    },
    tags: [
      'growth',
      'funnel'
    ],
    slots: [
      {
        label: 'Outer Ring',
        entityTypeId: 'acquisition_channel',
        description: 'All 19 traction channels brainstormed'
      },
      {
        label: 'Middle Ring',
        entityTypeId: 'acquisition_channel',
        description: 'Top 6 channels worth testing'
      },
      {
        label: 'Inner Ring',
        entityTypeId: 'acquisition_channel',
        description: 'Top 3 channels to focus on'
      },
      {
        label: 'Traction Test',
        entityTypeId: 'growth_campaign',
        description: 'Cheap test for each channel'
      },
      {
        label: 'Bullseye Channel',
        entityTypeId: 'acquisition_channel',
        description: 'The single best-performing channel'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'acquisition_channel',
            role: 'item'
          },
          {
            type: 'growth_campaign',
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
      purpose: 'Systematically test all 19 traction channels to find the one or two that drive scalable growth, avoiding premature commitment to a favourite channel.',
      core_question: 'Which of the 19 traction channels is our bullseye, the one that works at our current stage and scale?',
      when_to_use: [
        'You need to systematically identify and optimise growth levers',
        'User acquisition, activation, or retention metrics need improvement',
        'You want to build a structured growth experimentation practice'
      ],
      when_not_to_use: [
        'The product has not yet achieved product-market fit',
        'Growth would scale problems rather than value'
      ]
    }
  },
  {
    id: 'racecar-framework',
    name: 'Racecar Growth Framework',
    version: '1.0.0',
    description: 'Model your growth strategy as a racecar. Growth engines provide sustainable power, turbo boosts give temporary acceleration, lubricants reduce friction, and fuel is the budget that keeps everything running.',
    category: 'growth',
    origin: {
      type: 'practitioner',
      attribution: 'Lenny Rachitsky',
      description: 'Created by Lenny Rachitsky in his newsletter (2022). The racecar metaphor decomposes growth into four components: the engine (loops), turbo boosts (one-time efforts), lubricants (optimisations), and fuel (investment).',
      url: 'https://www.lennysnewsletter.com/p/the-racecar-growth-framework',
      year: 2022,
      license: 'open_attribution',
    },
    tags: [
      'growth',
      'collection'
    ],
    slots: [
      {
        label: 'Engine',
        entityTypeId: 'growth_loop',
        description: 'Sustainable, compounding growth loops'
      },
      {
        label: 'Turbo Boost',
        entityTypeId: 'growth_campaign',
        description: 'One-time or short-term growth accelerators'
      },
      {
        label: 'Lubricant',
        entityTypeId: 'funnel_step',
        description: 'Optimisations that reduce friction'
      },
      {
        label: 'Metric',
        entityTypeId: 'metric',
        description: 'Budget and resources powering the engine'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'growth_loop',
            role: 'item'
          },
          {
            type: 'growth_campaign',
            role: 'item'
          },
          {
            type: 'metric',
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
      purpose: 'Decompose growth into four components: Engine (acquisition loops), Turbo Boosts (one-time campaigns), Lubricants (conversion optimisations), Fuel (capital/content). Diagnose what is driving and limiting growth.',
      core_question: 'Is our growth driven by a sustainable engine (loops), or are we relying on turbo boosts (campaigns) that don\'t compound?',
      when_to_use: [
        'You need to systematically identify and optimise growth levers',
        'User acquisition, activation, or retention metrics need improvement',
        'You want to build a structured growth experimentation practice'
      ],
      when_not_to_use: [
        'The product has not yet achieved product-market fit',
        'Growth would scale problems rather than value'
      ]
    }
  },
  {
    id: 'sean-ellis-test',
    name: 'Sean Ellis Test',
    version: '1.0.0',
    description: 'Survey users: \'How would you feel if you could no longer use this product?\' If 40%+ answer \'very disappointed\', you have product-market fit. Below 40%, iterate on positioning or product before scaling.',
    category: 'growth',
    origin: {
      type: 'practitioner',
      attribution: 'Sean Ellis',
      description: 'Startup Marketing Blog',
      url: 'https://www.startup-marketing.com/the-startup-pyramid/',
      year: 2010,
      license: 'open_attribution',
    },
    tags: [
      'growth',
      'table'
    ],
    slots: [
      {
        label: 'Very Disappointed',
        entityTypeId: 'metric',
        description: 'Percentage who would be very disappointed'
      },
      {
        label: 'Somewhat Disappointed',
        entityTypeId: 'metric',
        description: 'Percentage who would be somewhat disappointed'
      },
      {
        label: 'Not Disappointed',
        entityTypeId: 'metric',
        description: 'Percentage who would not be disappointed'
      },
      {
        label: 'Cohort',
        entityTypeId: 'cohort',
        description: 'Users who experienced core value'
      },
      {
        label: 'Segment',
        entityTypeId: 'behavioral_segment',
        description: 'Segment where PMF is strongest'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'behavioral_segment',
            role: 'item'
          },
          {
            type: 'cohort',
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
            label: 'Metric',
            sortable: true
          },
          {
            property: 'description',
            label: 'Baseline',
          },
          {
            property: 'description',
            label: 'Target',
          },
          {
            property: 'title',
            label: 'Cohort',
            sortable: true
          },
          {
            property: 'title',
            label: 'Segment',
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
      purpose: 'Measure product-market fit by asking users how they\'d feel if they could no longer use the product. 40%+ saying \"very disappointed\" signals PMF.',
      core_question: 'Would at least 40% of our active users be very disappointed without this product?',
      when_to_use: [
        'You need to systematically identify and optimise growth levers',
        'User acquisition, activation, or retention metrics need improvement',
        'You want to build a structured growth experimentation practice'
      ],
      when_not_to_use: [
        'The product has not yet achieved product-market fit',
        'Growth would scale problems rather than value'
      ]
    }
  },
  {
    id: 'activation-funnel',
    approach_ids: ['trace'],
    name: 'Activation Funnel',
    version: '1.0.0',
    description: 'Map the steps from signup to the aha moment. Identify where users drop off between registration, onboarding, first key action, and full activation. Optimise each step to compress time-to-value.',
    category: 'growth',
    origin: {
      type: 'practitioner',
      year: 2012,
      description: 'Evolved from growth engineering practice, particularly at companies like Facebook, Slack, and Dropbox around 2012. Maps the steps from signup to \"aha moment\" to identify and reduce drop-off.',
      license: 'cc_by',
    },
    tags: [
      'growth',
      'funnel'
    ],
    slots: [
      {
        label: 'Signup',
        entityTypeId: 'funnel_step',
        description: 'User creates an account'
      },
      {
        label: 'Onboarding',
        entityTypeId: 'funnel_step',
        description: 'Key onboarding actions'
      },
      {
        label: 'Aha Moment',
        entityTypeId: 'funnel_step',
        description: 'First experience of core value'
      },
      {
        label: 'Full Activation',
        entityTypeId: 'funnel_step',
        description: 'User fully activated'
      },
      {
        label: 'Metric',
        entityTypeId: 'metric',
        description: 'Conversion rate between steps'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'funnel_step',
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
      purpose: 'Map the steps from signup to the \"aha moment\" where users first experience core value, then optimise each step to reduce drop-off.',
      core_question: 'What is the shortest path to our aha moment, and where in that path are we losing the most new users?',
      when_to_use: [
        'You need to systematically identify and optimise growth levers',
        'User acquisition, activation, or retention metrics need improvement',
        'You want to build a structured growth experimentation practice'
      ],
      when_not_to_use: [
        'The product has not yet achieved product-market fit',
        'Growth would scale problems rather than value'
      ]
    }
  },
  {
    id: 'plg-flywheel',
    name: 'PLG Flywheel',
    version: '1.0.0',
    description: 'Product-led growth flywheel with four user segments: evaluators trying the product, beginners learning core value, regulars using it habitually, and champions who advocate and drive expansion.',
    category: 'growth',
    origin: {
      type: 'practitioner',
      attribution: 'OpenView',
      description: 'OpenView Product-Led Growth',
      url: 'https://openviewpartners.com/product-led-growth/',
      year: 2019,
      license: 'open_attribution',
    },
    tags: [
      'growth',
      'flow'
    ],
    slots: [
      {
        label: 'Evaluator',
        entityTypeId: 'behavioral_segment',
        description: 'Users in free trial or freemium'
      },
      {
        label: 'Beginner',
        entityTypeId: 'behavioral_segment',
        description: 'Users learning core workflows'
      },
      {
        label: 'Regular',
        entityTypeId: 'behavioral_segment',
        description: 'Habitual users getting repeated value'
      },
      {
        label: 'Champion',
        entityTypeId: 'behavioral_segment',
        description: 'Power users who advocate and expand'
      },
      {
        label: 'Growth Loop',
        entityTypeId: 'growth_loop',
        description: 'How champions create new evaluators'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'growth_loop',
            role: 'item'
          },
          {
            type: 'behavioral_segment',
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
      purpose: 'Design a product-led growth flywheel where product usage drives acquisition, activation drives retention, and retention drives expansion. Each stage feeds the next.',
      core_question: 'Does our product create a self-reinforcing growth loop where each new user naturally brings more users and expands their own usage?',
      when_to_use: [
        'You need to systematically identify and optimise growth levers',
        'User acquisition, activation, or retention metrics need improvement',
        'You want to build a structured growth experimentation practice'
      ],
      when_not_to_use: [
        'The product has not yet achieved product-market fit',
        'Growth would scale problems rather than value'
      ]
    }
  },
  {
    id: 'growth-loops',
    approach_ids: ['trace'],
    name: 'Growth Loops',
    version: '1.0.0',
    description: 'Replace linear funnels with compounding loops. Each cohort of users generates output that becomes input for the next cohort. Types include viral loops, content loops, and paid loops that reinvest revenue.',
    category: 'growth',
    origin: {
      type: 'practitioner',
      attribution: 'Brian Balfour / Reforge',
      description: 'Reforge Growth Series',
      url: 'https://www.reforge.com/blog/growth-loops',
      year: 2018,
      license: 'open_attribution',
    },
    tags: [
      'growth',
      'flow'
    ],
    slots: [
      {
        label: 'Loop Input',
        entityTypeId: 'acquisition_channel',
        description: 'What enters the loop (new users, content, capital)'
      },
      {
        label: 'Loop Action',
        entityTypeId: 'funnel_step',
        description: 'Core action users take inside the loop'
      },
      {
        label: 'Loop Output',
        entityTypeId: 'growth_loop',
        description: 'What the loop produces that re-enters as input'
      },
      {
        label: 'Loop Type',
        entityTypeId: 'growth_loop',
        description: 'Viral, content, or paid loop classification'
      },
      {
        label: 'Metric',
        entityTypeId: 'metric',
        description: 'Metric showing loop efficiency'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'growth_loop',
            role: 'item'
          },
          {
            type: 'acquisition_channel',
            role: 'item'
          },
          {
            type: 'metric',
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
      purpose: 'Identify and optimise closed-loop systems where the output of one step becomes the input to an earlier step. Compounding growth replaces linear acquisition.',
      core_question: 'What are our growth loops, how fast do they cycle, and what is the compound growth rate each loop produces?',
      when_to_use: [
        'You need to systematically identify and optimise growth levers',
        'User acquisition, activation, or retention metrics need improvement',
        'You want to build a structured growth experimentation practice'
      ],
      when_not_to_use: [
        'The product has not yet achieved product-market fit',
        'Growth would scale problems rather than value'
      ]
    }
  },
  {
    id: 'referral-engine',
    name: 'Referral Engine',
    version: '1.0.0',
    description: 'Design systematic referral programs that turn customers into advocates. Map the referral trigger, invitation mechanism, incentive structure, and conversion path for both referrer and referee.',
    category: 'growth',
    origin: {
      type: 'practitioner',
      attribution: 'John Jantsch',
      description: 'Described by John Jantsch in \"The Referral Engine\" (2010). Formalises the mechanics of how one user brings in more users: incentives, timing, sharing surfaces, and onboarding of referred users.',
      url: 'https://www.amazon.com/Referral-Engine-Teaching-Business-Market/dp/1591844428',
      year: 2010,
      license: 'published_methodology',
    },
    tags: [
      'growth',
      'flow'
    ],
    slots: [
      {
        label: 'Referral Trigger',
        entityTypeId: 'growth_loop',
        description: 'Moment that prompts referral behaviour'
      },
      {
        label: 'Invite Mechanism',
        entityTypeId: 'acquisition_channel',
        description: 'How referrers invite others'
      },
      {
        label: 'Referrer Incentive',
        entityTypeId: 'growth_campaign',
        description: 'What the referrer gets'
      },
      {
        label: 'Referee Incentive',
        entityTypeId: 'growth_campaign',
        description: 'What the new user gets'
      },
      {
        label: 'Metric',
        entityTypeId: 'metric',
        description: 'K-factor and referral metrics'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'growth_loop',
            role: 'item'
          },
          {
            type: 'acquisition_channel',
            role: 'item'
          },
          {
            type: 'growth_campaign',
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
      purpose: 'Design and optimise the mechanics of user referrals — incentives, sharing surfaces, onboarding of referred users — to turn existing users into a sustainable acquisition channel.',
      core_question: 'What motivates our users to refer others, at which moment are they most likely to share, and how do we make sharing frictionless?',
      when_to_use: [
        'You need to systematically identify and optimise growth levers',
        'User acquisition, activation, or retention metrics need improvement',
        'You want to build a structured growth experimentation practice'
      ],
      when_not_to_use: [
        'The product has not yet achieved product-market fit',
        'Growth would scale problems rather than value'
      ]
    }
  },
  {
    id: 'engagement-loop',
    approach_ids: ['trace'],
    name: 'Engagement Loop',
    version: '1.0.0',
    description: 'Four-phase habit loop for retention: a trigger prompts the user, they take an action, receive a variable reward, and make an investment that improves the next cycle. Drives long-term engagement.',
    category: 'growth',
    origin: {
      type: 'practitioner',
      year: 2013,
      description: 'Built on behavioural psychology and game design principles, adapted for product design around 2013. Engagement loops create self-reinforcing cycles of user interaction and reward.',
      license: 'cc_by',
    },
    tags: [
      'growth',
      'flow'
    ],
    slots: [
      {
        label: 'Trigger',
        entityTypeId: 'funnel_step',
        description: 'External or internal cue that starts the loop'
      },
      {
        label: 'Action',
        entityTypeId: 'funnel_step',
        description: 'Simple behaviour the user performs'
      },
      {
        label: 'Variable Reward',
        entityTypeId: 'funnel_step',
        description: 'Unpredictable reward that satisfies'
      },
      {
        label: 'Investment',
        entityTypeId: 'funnel_step',
        description: 'User input that increases future value'
      },
      {
        label: 'Metric',
        entityTypeId: 'metric',
        description: 'Engagement frequency or retention rate'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'funnel_step',
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
      purpose: 'Design the in-product loop that keeps users coming back — trigger, engagement action, reward, re-engagement — to drive habitual usage beyond the initial activation.',
      core_question: 'What brings users back to our product repeatedly, and is there a reinforcing loop or do we rely on external reminders?',
      when_to_use: [
        'You need to systematically identify and optimise growth levers',
        'User acquisition, activation, or retention metrics need improvement',
        'You want to build a structured growth experimentation practice'
      ],
      when_not_to_use: [
        'The product has not yet achieved product-market fit',
        'Growth would scale problems rather than value'
      ]
    }
  },
  {
    id: 'growth-accounting',
    name: 'Growth Accounting',
    version: '1.0.0',
    description: 'Decompose user growth into four components: new users acquired, retained users from prior periods, resurrected users returning after churn, and churned users lost. Reveals the true health behind net growth.',
    category: 'growth',
    origin: {
      type: 'practitioner',
      attribution: 'Social Capital',
      description: '8 Ways to Measure Product-Market Fit',
      url: 'https://medium.com/social-capital/8-ways-to-measure-product-market-fit-1f53c5fc397e',
      year: 2017,
      license: 'open_attribution',
    },
    tags: [
      'growth',
      'table'
    ],
    slots: [
      {
        label: 'New Users',
        entityTypeId: 'cohort',
        description: 'First-time users in the period'
      },
      {
        label: 'Retained Users',
        entityTypeId: 'cohort',
        description: 'Users active in both current and prior period'
      },
      {
        label: 'Resurrected Users',
        entityTypeId: 'cohort',
        description: 'Previously churned users who returned'
      },
      {
        label: 'Churned Users',
        entityTypeId: 'cohort',
        description: 'Users who stopped being active'
      },
      {
        label: 'Metric',
        entityTypeId: 'metric',
        description: 'Growth efficiency metric'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'cohort',
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
            label: 'Cohort',
            sortable: true
          },
          {
            property: 'description',
            label: 'New',
          },
          {
            property: 'description',
            label: 'Retained',
          },
          {
            property: 'description',
            label: 'Resurrected',
          },
          {
            property: 'description',
            label: 'Churned',
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
      purpose: 'Decompose revenue or user growth into its components — new, retained, resurrected, and churned — to see whether growth is healthy (retention-driven) or leaky (acquisition-dependent).',
      core_question: 'Is our growth coming from retaining and expanding existing users, or are we backfilling churn with expensive new acquisition?',
      when_to_use: [
        'You need to systematically identify and optimise growth levers',
        'User acquisition, activation, or retention metrics need improvement',
        'You want to build a structured growth experimentation practice'
      ],
      when_not_to_use: [
        'The product has not yet achieved product-market fit',
        'Growth would scale problems rather than value'
      ]
    }
  },
  {
    id: 'channel-model-fit',
    name: 'Channel-Model Fit',
    version: '1.0.0',
    description: 'Match your ARPU to viable acquisition channels. Low ARPU requires viral or UGC channels. Mid ARPU supports paid marketing. High ARPU justifies outbound sales. Misalignment kills growth.',
    category: 'growth',
    origin: {
      type: 'practitioner',
      attribution: 'Brian Balfour',
      description: 'Introduced by Brian Balfour of Reforge in 2017. Argues that growth channels must structurally fit the business model — not every channel works for every price point, sales cycle, and product mechanic.',
      url: 'https://brianbalfour.com/essays/channel-model-fit-for-user-acquisition',
      year: 2017,
      license: 'open_attribution',
    },
    tags: [
      'growth',
      'matrix'
    ],
    slots: [
      {
        label: 'ARPU Level',
        entityTypeId: 'metric',
        description: 'Revenue tier driving channel viability'
      },
      {
        label: 'Viable Channel',
        entityTypeId: 'acquisition_channel',
        description: 'Channels that work at this ARPU'
      },
      {
        label: 'Non-Viable Channel',
        entityTypeId: 'acquisition_channel',
        description: 'Channels too expensive for this ARPU'
      },
      {
        label: 'Sales Model',
        entityTypeId: 'behavioral_segment',
        description: 'Self-serve, inside sales, or enterprise'
      },
      {
        label: 'Target CAC',
        entityTypeId: 'metric',
        description: 'Target acquisition cost by channel'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'acquisition_channel',
          role: 'bucket'
        },
        {
          type: 'behavioral_segment',
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
      purpose: 'Match growth channels to business model characteristics — ARPU, sales cycle, virality — because not every channel works for every model.',
      core_question: 'Given our price point, sales cycle, and product mechanics, which growth channels are structurally viable and which are a waste of effort?',
      when_to_use: [
        'You need to systematically identify and optimise growth levers',
        'User acquisition, activation, or retention metrics need improvement',
        'You want to build a structured growth experimentation practice'
      ],
      when_not_to_use: [
        'The product has not yet achieved product-market fit',
        'Growth would scale problems rather than value'
      ]
    }
  }
]
