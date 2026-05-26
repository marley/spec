/**
 * UPG Framework Definitions — Design
 * 12 frameworks for the design domain.
 */

import type { UPGFramework } from '../types.js'

export const DESIGN_FRAMEWORKS: UPGFramework[] = [
  {
    id: 'double-diamond',
    name: 'Double Diamond',
    version: '1.0.0',
    description: 'Discover, Define, Develop, Deliver — a four-phase divergent/convergent design process.',
    category: 'design',
    origin: {
      type: 'practitioner',
      attribution: 'British Design Council',
      description: 'Introduced by the British Design Council in 2005. Maps the design process as two connected diamonds — diverge to explore, converge to decide. Widely adopted across design, product, and innovation teams worldwide.',
      url: 'https://www.designcouncil.org.uk/our-resources/the-double-diamond/',
      year: 2005,
      license: 'open_attribution',
    },
    tags: [
      'design',
      'flow'
    ],
    slots: [
      {
        label: 'Discover',
        entityTypeId: 'insight',
        description: 'Explore the problem space — research, observe, and interview users to understand unmet needs'
      },
      {
        label: 'Define',
        entityTypeId: 'design_question',
        description: 'Converge on the core problem — synthesise research into a clear problem statement'
      },
      {
        label: 'Develop',
        entityTypeId: 'design_concept',
        description: 'Diverge on solutions — ideate, prototype, and explore multiple approaches'
      },
      {
        label: 'Deliver',
        entityTypeId: 'prototype',
        description: 'Converge on the best solution — test, refine, and ship'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'design_question',
            role: 'item'
          },
          {
            type: 'design_concept',
            role: 'item'
          },
          {
            type: 'insight',
            role: 'item'
          },
          {
            type: 'prototype',
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
      purpose: 'Guide teams through two cycles of divergent and convergent thinking — first to find the right problem, then to find the right solution.',
      core_question: 'How do we move from a fuzzy problem space to a tested solution through structured divergence and convergence?',
      when_to_use: [
        'You need a structured approach to solve a complex design problem',
        'The team needs alignment on design process and principles',
        'You want to evaluate or improve existing design quality'
      ],
      when_not_to_use: [
        'The design problem is straightforward and well-understood',
        'You are in a rapid prototyping phase where process would slow you down'
      ]
    }
  },
  {
    id: 'design-thinking-process',
    name: 'Design Thinking Process',
    version: '1.0.0',
    description: 'Empathise, Define, Ideate, Prototype, Test — a human-centred iterative design methodology.',
    category: 'design',
    origin: {
      type: 'practitioner',
      attribution: 'Stanford d.school',
      description: 'Popularised by IDEO and Stanford d.school in the 2000s, building on earlier work by Herbert Simon and Rolf Faste. The five-stage process — Empathise, Define, Ideate, Prototype, Test — became the canonical design thinking framework.',
      url: 'https://dschool.stanford.edu/',
      year: 2005,
      license: 'open_attribution',
    },
    tags: [
      'design',
      'flow'
    ],
    slots: [
      {
        label: 'Empathise',
        entityTypeId: 'persona',
        description: 'Observe and engage with users to understand their experiences, needs, and motivations'
      },
      {
        label: 'Define',
        entityTypeId: 'design_question',
        description: 'Synthesise empathy findings into a clear, actionable problem statement (Point of View)'
      },
      {
        label: 'Ideate',
        entityTypeId: 'design_concept',
        description: 'Generate a wide range of creative solutions — quantity over quality at this stage'
      },
      {
        label: 'Prototype',
        entityTypeId: 'prototype',
        description: 'Build quick, low-fidelity representations of solutions to make ideas tangible'
      },
      {
        label: 'Test',
        entityTypeId: 'experiment_run',
        description: 'Put prototypes in front of users, gather feedback, and iterate'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'persona',
            role: 'item'
          },
          {
            type: 'design_question',
            role: 'item'
          },
          {
            type: 'design_concept',
            role: 'item'
          },
          {
            type: 'prototype',
            role: 'item'
          },
          {
            type: 'experiment_run',
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
      purpose: 'Apply a human-centred iterative process that moves from empathy through ideation to prototyping, ensuring solutions are grounded in real user needs.',
      core_question: 'What do our users truly need, and how can we prototype and test solutions before committing to full development?',
      when_to_use: [
        'You need a structured approach to solve a complex design problem',
        'The team needs alignment on design process and principles',
        'You want to evaluate or improve existing design quality'
      ],
      when_not_to_use: [
        'The design problem is straightforward and well-understood',
        'You are in a rapid prototyping phase where process would slow you down'
      ]
    }
  },
  {
    id: 'atomic-design',
    name: 'Atomic Design',
    version: '1.0.0',
    description: 'Atoms, Molecules, Organisms, Templates, Pages — a methodology for creating design systems from the smallest elements up.',
    category: 'design',
    origin: {
      type: 'practitioner',
      attribution: 'Brad Frost',
      description: 'Created by Brad Frost in 2013, inspired by chemistry. The five-level hierarchy (atoms → molecules → organisms → templates → pages) provides a mental model for building design systems from small, reusable parts.',
      url: 'https://bradfrost.com/blog/post/atomic-web-design/',
      year: 2013,
      license: 'published_methodology',
    },
    tags: [
      'design',
      'tree'
    ],
    slots: [
      {
        label: 'Atoms',
        entityTypeId: 'design_component',
        description: 'Atoms — design component entities for this dimension of the framework'
      },
      {
        label: 'Molecules',
        entityTypeId: 'design_component',
        description: 'Molecules — design token entities for this dimension of the framework'
      },
      {
        label: 'Organisms',
        entityTypeId: 'design_pattern',
        description: 'Organisms — design pattern entities for this dimension of the framework'
      },
      {
        label: 'Templates',
        entityTypeId: 'wireframe',
        description: 'Templates — design system entities for this dimension of the framework'
      },
      {
        label: 'Pages',
        entityTypeId: 'screen',
        description: 'Pages — screen entities for this dimension of the framework'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'design_component',
            role: 'item'
          },
          {
            type: 'design_pattern',
            role: 'item'
          },
          {
            type: 'screen',
            role: 'item'
          },
          {
            type: 'wireframe',
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
      purpose: 'Organise UI components into five levels — Atoms, Molecules, Organisms, Templates, Pages — creating a shared vocabulary between design and engineering for building design systems.',
      core_question: 'Can our design system be decomposed into reusable atoms and molecules that compose predictably into every page?',
      when_to_use: [
        'You need a structured approach to solve a complex design problem',
        'The team needs alignment on design process and principles',
        'You want to evaluate or improve existing design quality'
      ],
      when_not_to_use: [
        'The design problem is straightforward and well-understood',
        'You are in a rapid prototyping phase where process would slow you down'
      ]
    }
  },
  {
    id: 'heuristic-evaluation',
    approach_ids: ['inspect'],
    name: 'Heuristic Evaluation',
    version: '1.0.0',
    description: 'Evaluate a user interface against 10 usability heuristics to identify design problems.',
    category: 'design',
    origin: {
      type: 'practitioner',
      attribution: 'Jakob Nielsen',
      description: 'Introduced by Jakob Nielsen and Rolf Molich in 1990, refined into ten usability heuristics by Nielsen in 1994. One of the most widely used discount usability methods, requiring evaluators rather than test participants.',
      url: 'https://www.nngroup.com/articles/ten-usability-heuristics/',
      year: 1994,
      license: 'public_domain',
    },
    tags: [
      'design',
      'table'
    ],
    slots: [
      {
        label: 'Visibility of System Status',
        entityTypeId: 'design_guideline',
        description: 'Visibility of System Status — design guideline entries to evaluate'
      },
      {
        label: 'Match Between System & Real World',
        entityTypeId: 'design_guideline',
        description: 'Match Between System & Real World — observation entries to evaluate'
      },
      {
        label: 'User Control & Freedom',
        entityTypeId: 'design_guideline',
        description: 'User Control & Freedom — a11y issue entries to evaluate'
      },
      {
        label: 'Consistency & Standards',
        entityTypeId: 'design_guideline',
        description: 'Consistency & Standards — screen entries to evaluate'
      },
      {
        label: 'Error Prevention',
        entityTypeId: 'design_guideline',
        description: 'Error Prevention — annotation entries to evaluate'
      },
      {
        label: 'Recognition Over Recall',
        entityTypeId: 'design_guideline',
        description: 'Recognition Over Recall — design guideline entries to evaluate'
      },
      {
        label: 'Flexibility & Efficiency',
        entityTypeId: 'design_guideline',
        description: 'Flexibility & Efficiency — observation entries to evaluate'
      },
      {
        label: 'Aesthetic & Minimalist Design',
        entityTypeId: 'design_guideline',
        description: 'Aesthetic & Minimalist Design — a11y issue entries to evaluate'
      },
      {
        label: 'Help Users Recover from Errors',
        entityTypeId: 'design_guideline',
        description: 'Help Users Recover from Errors — screen entries to evaluate'
      },
      {
        label: 'Help & Documentation',
        entityTypeId: 'design_guideline',
        description: 'Help & Documentation — annotation entries to evaluate'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'design_guideline',
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
            property: 'design_guideline',
            label: 'Visibility of System Status',
            sortable: true
          },
          {
            property: 'observation',
            label: 'Match Between System & Real World',
            sortable: true
          },
          {
            property: 'a11y_issue',
            label: 'User Control & Freedom',
            sortable: true
          },
          {
            property: 'screen',
            label: 'Consistency & Standards',
            sortable: true
          },
          {
            property: 'annotation',
            label: 'Error Prevention',
            sortable: true
          },
          {
            property: 'design_guideline',
            label: 'Recognition Over Recall',
            sortable: true
          },
          {
            property: 'observation',
            label: 'Flexibility & Efficiency',
            sortable: true
          },
          {
            property: 'a11y_issue',
            label: 'Aesthetic & Minimalist Design',
            sortable: true
          },
          {
            property: 'screen',
            label: 'Help Users Recover from Errors',
            sortable: true
          },
          {
            property: 'annotation',
            label: 'Help & Documentation',
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
      purpose: 'Evaluate an interface against established usability principles (heuristics) to find interaction problems quickly and cheaply, without user testing.',
      core_question: 'Which of the established usability heuristics does our interface violate, and how severely?',
      when_to_use: [
        'You need a structured approach to solve a complex design problem',
        'The team needs alignment on design process and principles',
        'You want to evaluate or improve existing design quality'
      ],
      when_not_to_use: [
        'The design problem is straightforward and well-understood',
        'You are in a rapid prototyping phase where process would slow you down'
      ]
    }
  },
  {
    id: 'lean-ux-canvas',
    name: 'Lean UX Canvas',
    version: '1.0.0',
    description: 'Business problem, user outcomes, and solutions — a canvas for aligning teams around outcome-driven design.',
    category: 'design',
    origin: {
      type: 'practitioner',
      attribution: 'Jeff Gothelf',
      description: 'Created by Jeff Gothelf and Josh Seiden, published in \"Lean UX\" (2013). Combines Lean Startup validation thinking with UX design practice, integrating hypothesis-driven design into agile workflows.',
      url: 'https://jeffgothelf.com/blog/the-lean-ux-canvas/',
      year: 2013,
      license: 'published_methodology',
    },
    tags: [
      'design',
      'matrix'
    ],
    slots: [
      {
        label: 'Business Problem',
        entityTypeId: 'need',
        description: 'Place hypothesis entities in the Business Problem position of the matrix'
      },
      {
        label: 'Business Outcomes',
        entityTypeId: 'outcome',
        description: 'Place assumption entities in the Business Outcomes position of the matrix'
      },
      {
        label: 'Users',
        entityTypeId: 'persona',
        description: 'Place outcome entities in the Users position of the matrix'
      },
      {
        label: 'User Outcomes & Benefits',
        entityTypeId: 'outcome',
        description: 'Place persona entities in the User Outcomes & Benefits position of the matrix'
      },
      {
        label: 'Solutions',
        entityTypeId: 'feature',
        description: 'Place feature entities in the Solutions position of the matrix'
      },
      {
        label: 'Hypotheses',
        entityTypeId: 'hypothesis',
        description: 'Place experiment entities in the Hypotheses position of the matrix'
      },
      {
        label: 'Assumptions',
        entityTypeId: 'assumption',
        description: 'Place hypothesis entities in the Assumptions position of the matrix'
      },
      {
        label: 'Experiments',
        entityTypeId: 'experiment_run',
        description: 'Place assumption entities in the Experiments position of the matrix'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'hypothesis',
            role: 'bucket'
          },
          {
            type: 'assumption',
            role: 'bucket'
          },
          {
            type: 'outcome',
            role: 'bucket'
          },
          {
            type: 'persona',
            role: 'bucket'
          },
          {
            type: 'feature',
            role: 'bucket'
          },
          {
            type: 'experiment_run',
            role: 'bucket'
          },
          {
            type: 'need',
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
        rows: 3,
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
      purpose: 'Combine Lean Startup thinking with UX design on a single canvas — business problem, users, outcomes, solutions, hypotheses, experiments — so design decisions are testable from day one.',
      core_question: 'What is our riskiest UX assumption, and what is the cheapest experiment we can run to validate it?',
      when_to_use: [
        'You need a structured approach to solve a complex design problem',
        'The team needs alignment on design process and principles',
        'You want to evaluate or improve existing design quality'
      ],
      when_not_to_use: [
        'The design problem is straightforward and well-understood',
        'You are in a rapid prototyping phase where process would slow you down'
      ]
    }
  },
  {
    id: 'user-journey-map',
    approach_ids: ['trace'],
    name: 'User Journey Map',
    version: '1.0.0',
    description: 'Map a persona\'s experience across stages, touchpoints, emotions, and pain points.',
    category: 'design',
    origin: {
      type: 'practitioner',
      attribution: 'Adaptive Path',
      description: 'Pioneered by Adaptive Path (founded by Jesse James Garrett) around 2005. Journey mapping synthesises user research into a visual narrative of the experience across touchpoints, emotions, and pain points.',
      url: 'https://www.adaptivepath.com/',
      year: 2005,
      license: 'open_attribution',
    },
    tags: [
      'design',
      'flow'
    ],
    slots: [
      {
        label: 'Awareness',
        entityTypeId: 'journey_phase',
        description: 'Awareness phase — user journey entities move through this stage'
      },
      {
        label: 'Consideration',
        entityTypeId: 'journey_phase',
        description: 'Consideration phase — journey step entities move through this stage'
      },
      {
        label: 'Acquisition',
        entityTypeId: 'journey_phase',
        description: 'Acquisition phase — persona entities move through this stage'
      },
      {
        label: 'Onboarding',
        entityTypeId: 'user_flow',
        description: 'Onboarding phase — observation entities move through this stage'
      },
      {
        label: 'Usage',
        entityTypeId: 'journey_phase',
        description: 'Usage phase — insight entities move through this stage'
      },
      {
        label: 'Retention',
        entityTypeId: 'journey_phase',
        description: 'Retention phase — design question entities move through this stage'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'journey_phase',
            role: 'item'
          },
          {
            type: 'user_flow',
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
      purpose: 'Visualise the end-to-end experience of a user across touchpoints, emotions, and pain points so the whole team shares one view of the customer\'s reality.',
      core_question: 'Where in the user\'s journey are we creating friction, confusion, or disappointment — and where are the moments of delight?',
      when_to_use: [
        'You need a structured approach to solve a complex design problem',
        'The team needs alignment on design process and principles',
        'You want to evaluate or improve existing design quality'
      ],
      when_not_to_use: [
        'The design problem is straightforward and well-understood',
        'You are in a rapid prototyping phase where process would slow you down'
      ]
    }
  },
  {
    id: 'design-sprint',
    name: 'Design Sprint',
    version: '1.0.0',
    description: 'A five-day process for answering critical business questions through design, prototyping, and testing.',
    category: 'design',
    origin: {
      type: 'practitioner',
      attribution: 'Jake Knapp / Google Ventures',
      description: 'Created by Jake Knapp at Google Ventures in 2010 and published as the book \"Sprint\" in 2016. The five-day process has been run by thousands of teams at startups, Fortune 500s, and nonprofits worldwide.',
      url: 'https://www.thesprintbook.com/',
      year: 2016,
      license: 'published_methodology',
    },
    tags: [
      'design',
      'flow'
    ],
    slots: [
      {
        label: 'Map',
        entityTypeId: 'design_question',
        description: 'Map phase — design question entities move through this stage'
      },
      {
        label: 'Sketch',
        entityTypeId: 'design_concept',
        description: 'Sketch phase — design concept entities move through this stage'
      },
      {
        label: 'Decide',
        entityTypeId: 'decision',
        description: 'Decide phase — prototype entities move through this stage'
      },
      {
        label: 'Prototype',
        entityTypeId: 'user_flow',
        description: 'Prototype phase — user flow entities move through this stage'
      },
      {
        label: 'Test',
        entityTypeId: 'observation',
        description: 'Test phase — observation entities move through this stage'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'design_question',
            role: 'item'
          },
          {
            type: 'design_concept',
            role: 'item'
          },
          {
            type: 'user_flow',
            role: 'item'
          },
          {
            type: 'observation',
            role: 'item'
          },
          {
            type: 'decision',
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
      purpose: 'Compress months of design debate into five days — Map, Sketch, Decide, Prototype, Test — producing a validated prototype before writing any production code.',
      core_question: 'Can we answer our biggest product question in one week with a prototype and five user tests?',
      when_to_use: [
        'You need a structured approach to solve a complex design problem',
        'The team needs alignment on design process and principles',
        'You want to evaluate or improve existing design quality'
      ],
      when_not_to_use: [
        'The design problem is straightforward and well-understood',
        'You are in a rapid prototyping phase where process would slow you down'
      ]
    }
  },
]
