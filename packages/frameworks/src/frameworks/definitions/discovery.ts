/**
 * UPG Framework Definitions — Discovery
 * 8 frameworks for the discovery domain.
 */

import type { UPGFramework } from '../types.js'

export const DISCOVERY_FRAMEWORKS: UPGFramework[] = [
  {
    id: 'opportunity-solution-tree',
    approach_ids: ['trace'],
    name: 'Opportunity Solution Tree',
    version: '1.0.0',
    description: 'Map desired outcomes to opportunities, then branch into solutions and experiments. Ensures every solution traces back to a real user need.',
    category: 'discovery',
    origin: {
      type: 'practitioner',
      attribution: 'Teresa Torres',
      description: 'Introduced in Continuous Discovery Habits. Maps outcomes to opportunities, solutions, and experiments.',
      url: 'https://www.producttalk.org/opportunity-solution-tree/',
      year: 2021,
      license: 'published_methodology',
    },
    tags: [
      'discovery',
      'tree'
    ],
    slots: [
      {
        label: 'Root Outcome',
        entityTypeId: 'outcome',
        description: 'The desired business or user outcome'
      },
      {
        label: 'Opportunities',
        entityTypeId: 'opportunity',
        description: 'User needs, pain points, or desires'
      },
      {
        label: 'Solutions',
        entityTypeId: 'solution',
        description: 'Ideas to address each opportunity'
      },
      {
        label: 'Experiments',
        entityTypeId: 'experiment_run',
        description: 'Tests to validate each solution'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'outcome',
          role: 'root'
        },
        {
          type: 'opportunity',
          role: 'item'
        },
        {
          type: 'solution',
          role: 'item'
        },
        {
          type: 'experiment_run',
          role: 'leaf'
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
      purpose: 'Connect a desired outcome to the opportunities and solutions that could drive it, making the reasoning chain from goal to feature explicit and testable.',
      core_question: 'What opportunities exist under our target outcome, and which solutions best address them?',
      when_to_use: [
        'You need to understand unmet user needs before committing to solutions',
        'The problem space is ambiguous and requires structured exploration',
        'You want to reduce the risk of building the wrong thing'
      ],
      when_not_to_use: [
        'The solution is well-understood and validated',
        'You are in a delivery phase with clear requirements'
      ]
    }
  },
  {
    id: 'story-map',
    approach_ids: ['plan'],
    name: 'Story Map',
    version: '1.0.0',
    description: 'Arrange user activities across the top, then prioritise user stories vertically under each activity. Horizontal = breadth, vertical = depth.',
    category: 'discovery',
    origin: {
      type: 'practitioner',
      attribution: 'Jeff Patton',
      description: 'Published in User Story Mapping (O\'Reilly). Organises stories by user activities to reveal the whole product.',
      url: 'https://www.jpattonassociates.com/user-story-mapping/',
      year: 2014,
      license: 'published_methodology',
    },
    tags: [
      'discovery',
      'matrix'
    ],
    slots: [
      {
        label: 'User Activities',
        entityTypeId: 'job',
        description: 'High-level tasks users perform (horizontal axis)'
      },
      {
        label: 'Epics',
        entityTypeId: 'epic',
        description: 'Groups of stories under each activity'
      },
      {
        label: 'User Stories',
        entityTypeId: 'story_statement',
        description: 'Detailed stories prioritised vertically'
      },
      {
        label: 'Release Slices',
        entityTypeId: 'release',
        description: 'Horizontal cuts defining MVP and iterations'
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
          type: 'epic',
          role: 'bucket'
        },
        {
          type: 'story_statement',
          role: 'bucket'
        },
        {
          type: 'release',
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
      purpose: 'Arrange user stories along the narrative flow of the user journey, creating a two-dimensional backlog that shows both breadth and depth of functionality.',
      core_question: 'What is the complete user journey, and which stories form the minimum walking skeleton versus later enhancements?',
      when_to_use: [
        'You need to understand unmet user needs before committing to solutions',
        'The problem space is ambiguous and requires structured exploration',
        'You want to reduce the risk of building the wrong thing'
      ],
      when_not_to_use: [
        'The solution is well-understood and validated',
        'You are in a delivery phase with clear requirements'
      ]
    }
  },
  {
    id: 'impact-map',
    approach_ids: ['trace'],
    name: 'Impact Map',
    version: '1.0.0',
    description: 'Start with a goal, identify actors, define the impacts you want, then list deliverables. Why → Who → How → What.',
    category: 'discovery',
    origin: {
      type: 'practitioner',
      attribution: 'Gojko Adzic',
      description: 'Published in Impact Mapping (self-published). Connects business goals to deliverables through actors and impacts.',
      url: 'https://www.impactmapping.org/',
      year: 2012,
      license: 'published_methodology',
    },
    tags: [
      'discovery',
      'tree'
    ],
    slots: [
      {
        label: 'Goal',
        entityTypeId: 'objective',
        description: 'The business goal (Why)'
      },
      {
        label: 'Actors',
        entityTypeId: 'persona',
        description: 'Who can help or hinder (Who)'
      },
      {
        label: 'Impacts',
        entityTypeId: 'outcome',
        description: 'Behaviour changes we want (How)'
      },
      {
        label: 'Deliverables',
        entityTypeId: 'feature',
        description: 'What we can build to cause impacts (What)'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'objective',
          role: 'root'
        },
        {
          type: 'persona',
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
      purpose: 'Connect business goals to deliverables through actors and impacts, ensuring every feature traces back to a measurable outcome.',
      core_question: 'Who can help or hinder our goal, what behaviour change do we need from them, and what can we build to cause that change?',
      when_to_use: [
        'You need to understand unmet user needs before committing to solutions',
        'The problem space is ambiguous and requires structured exploration',
        'You want to reduce the risk of building the wrong thing'
      ],
      when_not_to_use: [
        'The solution is well-understood and validated',
        'You are in a delivery phase with clear requirements'
      ]
    }
  },
  {
    id: 'dual-track-agile',
    name: 'Dual Track Agile',
    version: '1.0.0',
    description: 'Run continuous discovery alongside delivery — the discovery track validates ideas while the delivery track builds proven solutions.',
    category: 'discovery',
    origin: {
      type: 'practitioner',
      attribution: 'Marty Cagan',
      description: 'Coined by Marty Cagan at Silicon Valley Product Group and described in \"Inspired\" (2008, expanded 2018). Advocates running discovery and delivery as parallel tracks, ensuring validated ideas feed the backlog continuously.',
      url: 'https://www.svpg.com/dual-track-agile/',
      year: 2012,
      license: 'published_methodology',
    },
    tags: [
      'discovery',
      'flow'
    ],
    slots: [
      {
        label: 'Discovery Backlog',
        entityTypeId: 'opportunity',
        description: 'Discovery Backlog phase — opportunity entities move through this stage'
      },
      {
        label: 'Hypotheses',
        entityTypeId: 'hypothesis',
        description: 'Hypotheses phase — hypothesis entities move through this stage'
      },
      {
        label: 'Experiments',
        entityTypeId: 'experiment_run',
        description: 'Experiments phase — experiment entities move through this stage'
      },
      {
        label: 'Validated Items',
        entityTypeId: 'solution',
        description: 'Validated Items phase — solution entities move through this stage'
      },
      {
        label: 'Delivery Backlog',
        entityTypeId: 'story_statement',
        description: 'Delivery Backlog phase — user story entities move through this stage'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'opportunity',
            role: 'item'
          },
          {
            type: 'solution',
            role: 'item'
          },
          {
            type: 'hypothesis',
            role: 'item'
          },
          {
            type: 'experiment_run',
            role: 'leaf'
          },
          {
            type: 'story_statement',
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
      purpose: 'Run discovery and delivery in parallel — one track validates what to build next while the other ships validated work — so the team never runs out of validated ideas or ships unvalidated ones.',
      core_question: 'Do we have a continuous pipeline of validated opportunities feeding the delivery backlog, or are we building on assumptions?',
      when_to_use: [
        'You need to understand unmet user needs before committing to solutions',
        'The problem space is ambiguous and requires structured exploration',
        'You want to reduce the risk of building the wrong thing'
      ],
      when_not_to_use: [
        'The solution is well-understood and validated',
        'You are in a delivery phase with clear requirements'
      ]
    }
  },
  {
    id: 'value-proposition-canvas',
    name: 'Value Proposition Canvas',
    version: '1.0.0',
    description: 'Map customer jobs, pains, and gains on one side, then align product features, pain relievers, and gain creators on the other to achieve product-market fit.',
    category: 'discovery',
    origin: {
      type: 'practitioner',
      attribution: 'Osterwalder',
      description: 'Value Proposition Design',
      url: 'https://en.wikipedia.org/wiki/Value_proposition_canvas',
      year: 2014,
      license: 'published_methodology',
    },
    tags: [
      'discovery',
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
        label: 'Products & Services',
        entityTypeId: 'feature',
        description: 'Place feature entities in the Products & Services position of the matrix'
      },
      {
        label: 'Pain Relievers',
        entityTypeId: 'feature',
        description: 'Place feature entities in the Pain Relievers position of the matrix'
      },
      {
        label: 'Gain Creators',
        entityTypeId: 'feature',
        description: 'Place feature entities in the Gain Creators position of the matrix'
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
      purpose: 'Zoom into one customer segment to map their jobs, pains, and gains against your value proposition\'s products, pain relievers, and gain creators — ensuring product-market fit by design.',
      core_question: 'Does our value proposition address the jobs, pains, and gains that matter most to this customer segment?',
      when_to_use: [
        'You need to understand unmet user needs before committing to solutions',
        'The problem space is ambiguous and requires structured exploration',
        'You want to reduce the risk of building the wrong thing'
      ],
      when_not_to_use: [
        'The solution is well-understood and validated',
        'You are in a delivery phase with clear requirements'
      ]
    }
  },
  {
    id: 'assumption-canvas',
    approach_ids: ['reflect'],
    name: 'Assumption Canvas',
    version: '1.0.0',
    description: 'Surface and prioritise assumptions across desirability, viability, and feasibility to focus testing on the riskiest unknowns.',
    category: 'discovery',
    origin: {
      type: 'practitioner',
      attribution: 'David Bland',
      description: 'Testing Business Ideas',
      url: 'https://www.strategyzer.com/library/the-assumption-canvas',
      year: 2019,
      license: 'published_methodology',
    },
    tags: [
      'discovery',
      'matrix'
    ],
    slots: [
      {
        label: 'Desirability Assumptions',
        entityTypeId: 'assumption',
        description: 'Place assumption entities in the Desirability Assumptions position of the matrix'
      },
      {
        label: 'Viability Assumptions',
        entityTypeId: 'assumption',
        description: 'Place assumption entities in the Viability Assumptions position of the matrix'
      },
      {
        label: 'Feasibility Assumptions',
        entityTypeId: 'assumption',
        description: 'Place assumption entities in the Feasibility Assumptions position of the matrix'
      },
      {
        label: 'Riskiest Assumptions',
        entityTypeId: 'hypothesis',
        description: 'Place hypothesis entities in the Riskiest Assumptions position of the matrix'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'assumption',
          role: 'bucket'
        },
        {
          type: 'hypothesis',
          role: 'bucket'
        },
        {
          type: 'experiment_run',
          role: 'bucket'
        },
        {
          type: 'risk',
          role: 'bucket'
        },
        {
          type: 'feasibility_study',
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
      purpose: 'Capture every assumption behind a product idea — desirability, viability, feasibility — and rank them by risk so the team knows exactly what to test first.',
      core_question: 'What are we assuming about our customers, market, and technology — and which assumptions would kill the idea if wrong?',
      when_to_use: [
        'You need to understand unmet user needs before committing to solutions',
        'The problem space is ambiguous and requires structured exploration',
        'You want to reduce the risk of building the wrong thing'
      ],
      when_not_to_use: [
        'The solution is well-understood and validated',
        'You are in a delivery phase with clear requirements'
      ]
    }
  },
  {
    id: 'four-forces-of-progress',
    approach_ids: ['reflect'],
    name: 'Four Forces of Progress',
    version: '1.0.0',
    description: 'Analyse the four forces that drive or inhibit customers switching to a new solution: Push, Pull, Anxiety, and Habit.',
    category: 'discovery',
    origin: {
      type: 'practitioner',
      attribution: 'Bob Moesta',
      description: 'Demand-Side Sales 101',
      url: 'https://jobstobedone.org/',
      year: 2014,
      license: 'published_methodology',
    },
    tags: [
      'discovery',
      'matrix'
    ],
    slots: [
      {
        label: 'Push of Current Situation',
        entityTypeId: 'need',
        description: 'Place need entities in the Push of Current Situation position of the matrix'
      },
      {
        label: 'Pull of New Solution',
        entityTypeId: 'desired_outcome',
        description: 'Place desired outcome entities in the Pull of New Solution position of the matrix'
      },
      {
        label: 'Anxiety of New Solution',
        entityTypeId: 'switching_cost',
        description: 'Place switching cost entities in the Anxiety of New Solution position of the matrix'
      },
      {
        label: 'Habit of Current Situation',
        entityTypeId: 'switching_cost',
        description: 'Place switching cost entities in the Habit of Current Situation position of the matrix'
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
          type: 'switching_cost',
          role: 'bucket'
        },
        {
          type: 'insight',
          role: 'bucket'
        },
        {
          type: 'persona',
          role: 'bucket'
        },
        {
          type: 'desired_outcome',
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
      purpose: 'Map the four forces that drive or resist a customer\'s switch to a new solution — Push, Pull, Anxiety, Habit — to understand why people change (or don\'t).',
      core_question: 'Are the push and pull forces strong enough to overcome the anxiety of the new and the comfort of the familiar?',
      when_to_use: [
        'You need to understand unmet user needs before committing to solutions',
        'The problem space is ambiguous and requires structured exploration',
        'You want to reduce the risk of building the wrong thing'
      ],
      when_not_to_use: [
        'The solution is well-understood and validated',
        'You are in a delivery phase with clear requirements'
      ]
    }
  },
  {
    id: 'wardley-doctrine',
    approach_ids: ['plan'],
    name: 'Wardley Doctrine',
    version: '1.0.0',
    description: 'Forty universal principles of strategy grouped into phases of organisational maturity — from communication to learning to leading.',
    category: 'discovery',
    origin: {
      type: 'practitioner',
      attribution: 'Simon Wardley',
      description: 'Developed by Simon Wardley as a companion to Wardley Mapping. The doctrine principles distil decades of strategic thinking into actionable practices, categorised from basic awareness through to advanced gameplay.',
      url: 'https://doctrine.wardleymaps.com/',
      year: 2016,
      license: 'published_methodology',
    },
    tags: [
      'discovery',
      'table'
    ],
    slots: [
      {
        label: 'Phase I — Communication',
        entityTypeId: 'decision',
        description: 'Phase I — Communication — decision entries to evaluate'
      },
      {
        label: 'Phase II — Development',
        entityTypeId: 'capability',
        description: 'Phase II — Development — capability entries to evaluate'
      },
      {
        label: 'Phase III — Operation',
        entityTypeId: 'strategic_theme',
        description: 'Phase III — Operation — strategic theme entries to evaluate'
      },
      {
        label: 'Phase IV — Learning',
        entityTypeId: 'strategic_pillar',
        description: 'Phase IV — Learning — strategic pillar entries to evaluate'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'strategic_theme',
            role: 'item'
          },
          {
            type: 'capability',
            role: 'item'
          },
          {
            type: 'decision',
            role: 'item'
          },
          {
            type: 'strategic_pillar',
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
            property: 'decision',
            label: 'Phase I — Communication',
            sortable: true
          },
          {
            property: 'capability',
            label: 'Phase II — Development',
            sortable: true
          },
          {
            property: 'strategic_theme',
            label: 'Phase III — Operation',
            sortable: true
          },
          {
            property: 'strategic_pillar',
            label: 'Phase IV — Learning',
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
      purpose: 'Apply Simon Wardley\'s 40 universal principles of strategic play — from situational awareness to gameplay — as a maturity assessment for organisational strategy.',
      core_question: 'Which strategic principles does our organisation practice well, and which doctrine gaps leave us exposed?',
      when_to_use: [
        'You need to understand unmet user needs before committing to solutions',
        'The problem space is ambiguous and requires structured exploration',
        'You want to reduce the risk of building the wrong thing'
      ],
      when_not_to_use: [
        'The solution is well-understood and validated',
        'You are in a delivery phase with clear requirements'
      ]
    }
  }
]
