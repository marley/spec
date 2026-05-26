/**
 * UPG Framework Definitions — User Understanding
 * 10 frameworks for the user understanding domain.
 */

import type { UPGFramework } from '../types.js'

export const USER_UNDERSTANDING_FRAMEWORKS: UPGFramework[] = [
  {
    id: 'persona-canvas',
    name: 'Persona Canvas',
    version: '1.0.0',
    description: 'Demographics, goals, frustrations, JTBD: a structured template for creating research-backed personas.',
    category: 'user_understanding',
    origin: {
      type: 'practitioner',
      attribution: 'Alan Cooper',
      description: 'Based on Alan Cooper\'s persona methodology from \"The Inmates Are Running the Asylum\" (1999). The canvas format structures persona creation around goals, behaviours, frustrations, and context.',
      url: 'https://www.cooper.com/journal/2001/08/perfecting_your_personas',
      year: 1999,
      license: 'published_methodology',
    },
    tags: [
      'user_understanding',
      'matrix'
    ],
    slots: [
      {
        label: 'Demographics',
        entityTypeId: 'persona',
        description: 'Place persona entities in the Demographics position of the matrix'
      },
      {
        label: 'Goals',
        entityTypeId: 'desired_outcome',
        description: 'Place job entities in the Goals position of the matrix'
      },
      {
        label: 'Frustrations',
        entityTypeId: 'need',
        description: 'Place need entities in the Frustrations position of the matrix'
      },
      {
        label: 'Behaviours',
        entityTypeId: 'observation',
        description: 'Place desired outcome entities in the Behaviours position of the matrix'
      },
      {
        label: 'Jobs to Be Done',
        entityTypeId: 'job',
        description: 'Place quote entities in the Jobs to Be Done position of the matrix'
      },
      {
        label: 'Quotes',
        entityTypeId: 'quote',
        description: 'Place observation entities in the Quotes position of the matrix'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'persona',
          role: 'bucket'
        },
        {
          type: 'job',
          role: 'bucket'
        },
        {
          type: 'need',
          role: 'bucket'
        },
        {
          type: 'desired_outcome',
          role: 'bucket'
        },
        {
          type: 'quote',
          role: 'bucket'
        },
        {
          type: 'observation',
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
      purpose: 'Define a user archetype\'s goals, behaviours, frustrations, and context on a structured canvas so every team member designs for the same person instead of an abstract \"user\".',
      core_question: 'Who specifically are we building for? What are their goals, frustrations, and the context in which they use our product?',
      when_to_use: [
        'You need to build empathy for your users across the team',
        'Product decisions require deeper understanding of user context',
        'You want to segment users in meaningful ways beyond demographics'
      ],
      when_not_to_use: [
        'You have a single, well-understood user persona',
        'The product serves a narrow, homogeneous audience'
      ]
    }
  },
  {
    id: 'user-needs-matrix',
    name: 'User Needs Matrix',
    version: '1.0.0',
    description: 'Map needs across personas by importance and satisfaction. Identify underserved opportunities.',
    category: 'user_understanding',
    origin: {
      type: 'practitioner',
      attribution: 'Anthony Ulwick',
      description: 'Based on Anthony Ulwick\'s Outcome-Driven Innovation methodology, published in \"What Customers Want\" (2005). Maps user needs against current solution satisfaction to identify the biggest opportunity gaps.',
      url: 'https://strategyn.com/outcome-driven-innovation-process/',
      year: 2005,
      license: 'published_methodology',
    },
    tags: [
      'user_understanding',
      'matrix'
    ],
    slots: [
      {
        label: 'Personas',
        entityTypeId: 'persona',
        description: 'Place persona entities in the Personas position of the matrix'
      },
      {
        label: 'Needs',
        entityTypeId: 'need',
        description: 'Place need entities in the Needs position of the matrix'
      },
      {
        label: 'Importance',
        entityTypeId: 'metric',
        description: 'Place desired outcome entities in the Importance position of the matrix'
      },
      {
        label: 'Satisfaction',
        entityTypeId: 'metric',
        description: 'Place job entities in the Satisfaction position of the matrix'
      },
      {
        label: 'Opportunity Score',
        entityTypeId: 'metric',
        description: 'Place insight entities in the Opportunity Score position of the matrix'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'persona',
            role: 'bucket'
          },
          {
            type: 'need',
            role: 'bucket'
          },
          {
            type: 'metric',
            role: 'item'
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
      purpose: 'Map user needs against current solutions to reveal gaps, over-served needs, and unmet needs that represent opportunities for product innovation.',
      core_question: 'Which user needs are currently unmet or poorly met, and which are over-served? Where is the real opportunity?',
      when_to_use: [
        'You need to build empathy for your users across the team',
        'Product decisions require deeper understanding of user context',
        'You want to segment users in meaningful ways beyond demographics'
      ],
      when_not_to_use: [
        'You have a single, well-understood user persona',
        'The product serves a narrow, homogeneous audience'
      ]
    }
  },
  {
    id: 'customer-lifecycle-map',
    approach_ids: ['trace'],
    name: 'Customer Lifecycle Map',
    version: '1.0.0',
    description: 'Awareness through advocacy: map the full customer lifecycle and identify drop-off points.',
    category: 'user_understanding',
    origin: {
      type: 'practitioner',
      attribution: 'Lincoln Murphy',
      description: 'Popularised by Lincoln Murphy of Sixteen Ventures around 2013 for SaaS customer success. Maps the complete customer lifecycle from first awareness through renewal and advocacy.',
      url: 'https://sixteenventures.com/customer-success',
      year: 2013,
      license: 'open_attribution',
    },
    tags: [
      'user_understanding',
      'funnel'
    ],
    slots: [
      {
        label: 'Awareness',
        entityTypeId: 'customer_journey_stage',
        description: 'Awareness stage — track funnel progression through this level of the funnel'
      },
      {
        label: 'Evaluation',
        entityTypeId: 'customer_journey_stage',
        description: 'Evaluation stage — track funnel step progression through this level of the funnel'
      },
      {
        label: 'Purchase',
        entityTypeId: 'customer_journey_stage',
        description: 'Purchase stage — track persona progression through this level of the funnel'
      },
      {
        label: 'Onboarding',
        entityTypeId: 'customer_journey_stage',
        description: 'Onboarding stage — track behavioral segment progression through this level of the funnel'
      },
      {
        label: 'Adoption',
        entityTypeId: 'customer_journey_stage',
        description: 'Adoption stage — track metric progression through this level of the funnel'
      },
      {
        label: 'Retention',
        entityTypeId: 'customer_journey_stage',
        description: 'Retention stage — track funnel progression through this level of the funnel'
      },
      {
        label: 'Advocacy',
        entityTypeId: 'customer_journey_stage',
        description: 'Advocacy stage — track funnel step progression through this level of the funnel'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'customer_journey_stage',
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
      purpose: 'Map the complete customer lifecycle from first awareness through onboarding, engagement, renewal, and advocacy. Identify moments that make or break the relationship.',
      core_question: 'At which lifecycle stage do we create the most value, and at which stage do we lose the most customers?',
      when_to_use: [
        'You need to build empathy for your users across the team',
        'Product decisions require deeper understanding of user context',
        'You want to segment users in meaningful ways beyond demographics'
      ],
      when_not_to_use: [
        'You have a single, well-understood user persona',
        'The product serves a narrow, homogeneous audience'
      ]
    }
  },
  {
    id: 'behavioural-cohort-analysis',
    name: 'Behavioural Cohort Analysis',
    version: '1.0.0',
    description: 'Group users by behaviour patterns, compare outcomes across cohorts to find what drives retention.',
    category: 'user_understanding',
    origin: {
      type: 'practitioner',
      year: 2015,
      description: 'Evolved from growth analytics practice around 2015, particularly at companies like Amplitude and Mixpanel. Segments users by behaviour rather than demographics to find actions that predict retention.',
      license: 'cc_by',
    },
    tags: [
      'user_understanding',
      'table'
    ],
    slots: [
      {
        label: 'Cohort Definition',
        entityTypeId: 'cohort',
        description: 'Cohort Definition — cohort entries to evaluate'
      },
      {
        label: 'Key Behaviours',
        entityTypeId: 'behavioral_segment',
        description: 'Key Behaviours — behavioral segment entries to evaluate'
      },
      {
        label: 'Outcome Metrics',
        entityTypeId: 'metric',
        description: 'Outcome Metrics — metric entries to evaluate'
      },
      {
        label: 'Comparison',
        entityTypeId: 'observation',
        description: 'Comparison — observation entries to evaluate'
      },
      {
        label: 'Insights',
        entityTypeId: 'insight',
        description: 'Insights — insight entries to evaluate'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'cohort',
          role: 'item'
        },
        {
          type: 'behavioral_segment',
          role: 'item'
        },
        {
          type: 'metric',
          role: 'root'
        },
        {
          type: 'observation',
          role: 'item'
        },
        {
          type: 'insight',
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
            label: 'Key Behaviours',
          },
          {
            property: 'description',
            label: 'Outcome Metrics',
          },
          {
            property: 'description',
            label: 'Comparison',
          },
          {
            property: 'description',
            label: 'Insights',
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
      purpose: 'Segment users by behaviour (feature usage, engagement patterns) rather than demographics, revealing which actions predict retention, expansion, or churn.',
      core_question: 'Which user behaviours in the first week predict long-term retention, and are we optimising onboarding to drive those behaviours?',
      when_to_use: [
        'You need to build empathy for your users across the team',
        'Product decisions require deeper understanding of user context',
        'You want to segment users in meaningful ways beyond demographics'
      ],
      when_not_to_use: [
        'You have a single, well-understood user persona',
        'The product serves a narrow, homogeneous audience'
      ]
    }
  },
  {
    id: 'jobs-atlas',
    approach_ids: ['trace'],
    name: 'Jobs Atlas',
    version: '1.0.0',
    description: 'Complete job landscape mapping: from main job through related and emotional jobs.',
    category: 'user_understanding',
    origin: {
      type: 'practitioner',
      attribution: 'Anthony Ulwick',
      description: 'Created by Anthony Ulwick, published in \"Jobs to Be Done\" (2016). The Jobs Atlas maps the complete hierarchy of functional, emotional, and social jobs a customer is trying to accomplish.',
      url: 'https://strategyn.com/jobs-to-be-done/jobs-to-be-done-theory/',
      year: 2016,
      license: 'published_methodology',
    },
    tags: [
      'user_understanding',
      'tree'
    ],
    slots: [
      {
        label: 'Main Job',
        entityTypeId: 'job',
        description: 'Main Job — job entities for this dimension of the framework'
      },
      {
        label: 'Related Jobs',
        entityTypeId: 'job',
        description: 'Related Jobs — job step entities for this dimension of the framework'
      },
      {
        label: 'Emotional Jobs',
        entityTypeId: 'desired_outcome',
        description: 'Emotional Jobs — desired outcome entities for this dimension of the framework'
      },
      {
        label: 'Job Steps',
        entityTypeId: 'job_step',
        description: 'Job Steps — need entities for this dimension of the framework'
      },
      {
        label: 'Desired Outcomes',
        entityTypeId: 'desired_outcome',
        description: 'Desired Outcomes — persona entities for this dimension of the framework'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'job',
            role: 'item'
          },
          {
            type: 'job_step',
            role: 'item'
          },
          {
            type: 'desired_outcome',
            role: 'item'
          }        ],
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
      purpose: 'Map the complete landscape of jobs a customer is trying to get done (functional, emotional, social) organised into a hierarchical atlas that reveals the full job ecosystem.',
      core_question: 'What is the complete set of jobs our customers are trying to accomplish, and how do those jobs relate to each other?',
      when_to_use: [
        'You need to build empathy for your users across the team',
        'Product decisions require deeper understanding of user context',
        'You want to segment users in meaningful ways beyond demographics'
      ],
      when_not_to_use: [
        'You have a single, well-understood user persona',
        'The product serves a narrow, homogeneous audience'
      ]
    }
  },
  {
    id: 'mental-model-diagram',
    approach_ids: ['trace'],
    name: 'Mental Model Diagram',
    version: '1.0.0',
    description: 'Align user mental models with product support — top half is user behaviour, bottom half is product features.',
    category: 'user_understanding',
    origin: {
      type: 'practitioner',
      attribution: 'Indi Young',
      description: 'Created by Indi Young, published in \"Mental Models\" (2008). Mental model diagrams align a user\'s task-based mental model with the product\'s feature set, revealing gaps and mismatches.',
      url: 'https://indiyoung.com/mental-models/',
      year: 2008,
      license: 'published_methodology',
    },
    tags: [
      'user_understanding',
      'matrix'
    ],
    slots: [
      {
        label: 'User Tasks (Top)',
        entityTypeId: 'job',
        description: 'Place persona entities in the User Tasks (Top) position of the matrix'
      },
      {
        label: 'User Philosophies (Top)',
        entityTypeId: 'observation',
        description: 'Place job entities in the User Philosophies (Top) position of the matrix'
      },
      {
        label: 'Product Support (Bottom)',
        entityTypeId: 'feature',
        description: 'Place need entities in the Product Support (Bottom) position of the matrix'
      },
      {
        label: 'Gaps',
        entityTypeId: 'need',
        description: 'Place feature entities in the Gaps position of the matrix'
      },
      {
        label: 'Opportunities',
        entityTypeId: 'insight',
        description: 'Place insight entities in the Opportunities position of the matrix'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'job',
          role: 'bucket'
        },
        {
          type: 'need',
          role: 'bucket'
        },
        {
          type: 'feature',
          role: 'bucket'
        },
        {
          type: 'insight',
          role: 'bucket'
        },
        {
          type: 'observation',
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
      purpose: 'Align your product\'s feature set with how users actually think about the problem domain, revealing gaps where your product doesn\'t match the user\'s mental model.',
      core_question: 'Does our product\'s structure match how our users think about and approach their tasks, or are we forcing an alien mental model on them?',
      when_to_use: [
        'You need to build empathy for your users across the team',
        'Product decisions require deeper understanding of user context',
        'You want to segment users in meaningful ways beyond demographics'
      ],
      when_not_to_use: [
        'You have a single, well-understood user persona',
        'The product serves a narrow, homogeneous audience'
      ]
    }
  },
  {
    id: 'user-segmentation-matrix',
    name: 'User Segmentation Matrix',
    version: '1.0.0',
    description: 'Segment users along two behavioural or attitudinal axes to reveal distinct user groups.',
    category: 'user_understanding',
    origin: {
      type: 'practitioner',
      description: 'Standard product management and marketing practice. User segmentation matrices classify users along multiple dimensions (behaviour, value, needs) to tailor experiences for each segment.',
      license: 'cc_by',
    },
    tags: [
      'user_understanding',
      'matrix'
    ],
    slots: [
      {
        label: 'X-Axis Dimension',
        entityTypeId: 'persona',
        description: 'Place persona entities in the X-Axis Dimension position of the matrix'
      },
      {
        label: 'Y-Axis Dimension',
        entityTypeId: 'behavioral_segment',
        description: 'Place behavioral segment entities in the Y-Axis Dimension position of the matrix'
      },
      {
        label: 'Top-Left Segment',
        entityTypeId: 'market_segment',
        description: 'Place cohort entities in the Top-Left Segment position of the matrix'
      },
      {
        label: 'Top-Right Segment',
        entityTypeId: 'market_segment',
        description: 'Place observation entities in the Top-Right Segment position of the matrix'
      },
      {
        label: 'Bottom-Left Segment',
        entityTypeId: 'market_segment',
        description: 'Place insight entities in the Bottom-Left Segment position of the matrix'
      },
      {
        label: 'Bottom-Right Segment',
        entityTypeId: 'market_segment',
        description: 'Place persona entities in the Bottom-Right Segment position of the matrix'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'persona',
            role: 'bucket'
          },
          {
            type: 'behavioral_segment',
            role: 'bucket'
          },
          {
            type: 'market_segment',
            role: 'item'
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
      purpose: 'Segment users along multiple dimensions — behaviour, value, needs, lifecycle stage — to tailor product experiences, pricing, and marketing to each segment.',
      core_question: 'Which user segments behave differently enough to warrant different product experiences, pricing, or marketing approaches?',
      when_to_use: [
        'You need to build empathy for your users across the team',
        'Product decisions require deeper understanding of user context',
        'You want to segment users in meaningful ways beyond demographics'
      ],
      when_not_to_use: [
        'You have a single, well-understood user persona',
        'The product serves a narrow, homogeneous audience'
      ]
    }
  },
  {
    id: 'empathy-interview-synthesis',
    name: 'Empathy Interview Synthesis',
    version: '1.0.0',
    description: 'Synthesise empathy interviews into quotes, observations, and insights.',
    category: 'user_understanding',
    origin: {
      type: 'practitioner',
      year: 2005,
      description: 'Rooted in ethnographic research methods, adapted for product design by the design thinking community. Synthesis frameworks help researchers extract patterns from qualitative interview data.',
      license: 'cc_by',
    },
    tags: [
      'user_understanding',
      'collection'
    ],
    slots: [
      {
        label: 'Key Quotes',
        entityTypeId: 'quote',
        description: 'Key Quotes — group of quote entities'
      },
      {
        label: 'Observations',
        entityTypeId: 'observation',
        description: 'Observations — group of observation entities'
      },
      {
        label: 'Patterns',
        entityTypeId: 'affinity_cluster',
        description: 'Patterns — group of insight entities'
      },
      {
        label: 'Insights',
        entityTypeId: 'affinity_cluster',
        description: 'Insights — group of affinity cluster entities'
      },
      {
        label: 'Implications',
        entityTypeId: 'opportunity',
        description: 'Implications — group of persona entities'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'quote',
            role: 'item'
          },
          {
            type: 'observation',
            role: 'item'
          },
          {
            type: 'affinity_cluster',
            role: 'item'
          },
          {
            type: 'opportunity',
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
      purpose: 'Synthesise empathy interview findings into patterns — common themes, surprising insights, emotional moments — that inform persona development and design decisions.',
      core_question: 'What patterns emerge across our empathy interviews, and what surprised us about how users think and feel about this problem?',
      when_to_use: [
        'You need to build empathy for your users across the team',
        'Product decisions require deeper understanding of user context',
        'You want to segment users in meaningful ways beyond demographics'
      ],
      when_not_to_use: [
        'You have a single, well-understood user persona',
        'The product serves a narrow, homogeneous audience'
      ]
    }
  },
  {
    id: 'customer-forces-canvas',
    name: 'Customer Forces Canvas',
    version: '1.0.0',
    description: 'Push, pull, anxiety, inertia — the four forces that drive or resist switching behaviour.',
    category: 'user_understanding',
    origin: {
      type: 'practitioner',
      attribution: 'Ash Maurya / Bob Moesta',
      description: 'Created by Ash Maurya (Lean Stack) adapting Bob Moesta\'s Forces of Progress framework. Maps the push (current pain), pull (new solution), anxiety (fear of change), and habit (status quo comfort) forces acting on customers.',
      url: 'https://blog.leanstack.com/the-customer-forces-canvas/',
      year: 2016,
      license: 'published_methodology',
    },
    tags: [
      'user_understanding',
      'matrix'
    ],
    slots: [
      {
        label: 'Push (Current Problem)',
        entityTypeId: 'need',
        description: 'Place job entities in the Push (Current Problem) position of the matrix'
      },
      {
        label: 'Pull (New Solution)',
        entityTypeId: 'value_proposition',
        description: 'Place switching cost entities in the Pull (New Solution) position of the matrix'
      },
      {
        label: 'Anxiety (New Solution Risk)',
        entityTypeId: 'risk',
        description: 'Place need entities in the Anxiety (New Solution Risk) position of the matrix'
      },
      {
        label: 'Inertia (Habit of Present)',
        entityTypeId: 'switching_cost',
        description: 'Place desired outcome entities in the Inertia (Habit of Present) position of the matrix'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'switching_cost',
            role: 'bucket'
          },
          {
            type: 'need',
            role: 'bucket'
          },
          {
            type: 'value_proposition',
            role: 'item'
          },
          {
            type: 'risk',
            role: 'item'
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
      purpose: 'Map the four forces acting on a customer at the moment of switching — Push (current pain), Pull (new solution appeal), Anxiety (fear of change), Habit (comfort of status quo).',
      core_question: 'Are the push and pull forces in our market strong enough to overcome the anxiety and habit that keep customers on their current solution?',
      when_to_use: [
        'You need to build empathy for your users across the team',
        'Product decisions require deeper understanding of user context',
        'You want to segment users in meaningful ways beyond demographics'
      ],
      when_not_to_use: [
        'You have a single, well-understood user persona',
        'The product serves a narrow, homogeneous audience'
      ]
    }
  },
  {
    id: 'value-proposition-fit',
    name: 'Value Proposition Fit',
    version: '1.0.0',
    description: 'Jobs, pains, gains mapped against pain relievers, gain creators, and products/services.',
    category: 'user_understanding',
    origin: {
      type: 'practitioner',
      attribution: 'Alexander Osterwalder / Strategyzer',
      description: 'Part of Alexander Osterwalder\'s Value Proposition Canvas, published by Strategyzer in 2014. Assesses the fit between customer jobs/pains/gains and the product\'s features/pain relievers/gain creators.',
      url: 'https://www.strategyzer.com/library/the-value-proposition-canvas',
      year: 2014,
      license: 'published_methodology',
    },
    tags: [
      'user_understanding',
      'matrix'
    ],
    slots: [
      {
        label: 'Customer Jobs',
        entityTypeId: 'job',
        description: 'Place job entities in the Customer Jobs position of the matrix'
      },
      {
        label: 'Pains',
        entityTypeId: 'need',
        description: 'Place need entities in the Pains position of the matrix'
      },
      {
        label: 'Gains',
        entityTypeId: 'desired_outcome',
        description: 'Place desired outcome entities in the Gains position of the matrix'
      },
      {
        label: 'Pain Relievers',
        entityTypeId: 'feature',
        description: 'Place feature entities in the Pain Relievers position of the matrix'
      },
      {
        label: 'Gain Creators',
        entityTypeId: 'feature',
        description: 'Place persona entities in the Gain Creators position of the matrix'
      },
      {
        label: 'Products & Services',
        entityTypeId: 'value_proposition',
        description: 'Place hypothesis entities in the Products & Services position of the matrix'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'job',
            role: 'bucket'
          },
          {
            type: 'need',
            role: 'bucket'
          },
          {
            type: 'desired_outcome',
            role: 'bucket'
          },
          {
            type: 'feature',
            role: 'bucket'
          },
          {
            type: 'value_proposition',
            role: 'item'
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
      purpose: 'Assess the fit between your value proposition and the customer segment — do the pain relievers match the pains, do the gain creators match the gains?',
      core_question: 'Is there genuine fit between what we offer and what our target customers need, or are we forcing a match that doesn\'t exist?',
      when_to_use: [
        'You need to build empathy for your users across the team',
        'Product decisions require deeper understanding of user context',
        'You want to segment users in meaningful ways beyond demographics'
      ],
      when_not_to_use: [
        'You have a single, well-understood user persona',
        'The product serves a narrow, homogeneous audience'
      ]
    }
  }
]
