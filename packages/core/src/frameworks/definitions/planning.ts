/**
 * UPG Framework Definitions — Planning
 * 15 frameworks for the planning domain.
 */

import type { UPGFramework } from '../types.js'

export const PLANNING_FRAMEWORKS: UPGFramework[] = [
  {
    id: 'release-plan',
    approach_ids: ['plan'],
    name: 'Release Plan',
    version: '1.0.0',
    description: 'Plan releases by grouping features into milestones with target dates and dependencies.',
    category: 'planning',
    origin: {
      type: 'practitioner',
      description: 'Standard agile planning artefact. Bridges sprint-level planning with roadmap-level communication.',
      license: 'cc_by',
    },
    tags: [
      'planning',
      'table'
    ],
    slots: [
      {
        label: 'Release',
        entityTypeId: 'release',
        description: 'Version or milestone'
      },
      {
        label: 'Features',
        entityTypeId: 'feature',
        description: 'What ships in this release'
      },
      {
        label: 'Epics',
        entityTypeId: 'epic',
        description: 'Large work items in scope'
      },
      {
        label: 'Dependencies',
        entityTypeId: 'release',
        description: 'What must be done first'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'release',
            role: 'item'
          },
          {
            type: 'feature',
            role: 'item'
          },
          {
            type: 'epic',
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
            label: 'Release',
            sortable: true
          },
          {
            property: 'description',
            label: 'Features',
          },
          {
            property: 'description',
            label: 'Epics',
          },
          {
            property: 'description',
            label: 'Dependencies',
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
      purpose: 'Group features into versioned releases with dates, owners, and dependencies so the team ships coherent increments instead of scattered features.',
      core_question: 'What goes into the next release, what\'s the cut line, and what dependencies could delay it?',
      when_to_use: [
        'You need to coordinate work across multiple teams or time horizons',
        'Stakeholders need visibility into what is coming and when',
        'You want to balance commitments with flexibility'
      ],
      when_not_to_use: [
        'The team is small enough that informal coordination works',
        'Plans would create false precision about uncertain outcomes'
      ]
    }
  },
  {
    id: 'sprint-board',
    approach_ids: ['plan'],
    name: 'Sprint Board',
    version: '1.0.0',
    description: 'Kanban-style board: To Do → In Progress → Review → Done for a single sprint.',
    category: 'planning',
    origin: {
      type: 'practitioner',
      description: 'Core agile ceremony artefact. Visual workflow management for sprint execution.',
      license: 'cc_by',
    },
    tags: [
      'planning',
      'table'
    ],
    slots: [
      {
        label: 'To Do',
        entityTypeId: 'story_statement',
        description: 'Planned work for this sprint'
      },
      {
        label: 'In Progress',
        entityTypeId: 'task',
        description: 'Currently being worked on'
      },
      {
        label: 'In Review',
        entityTypeId: 'task',
        description: 'Awaiting review or QA'
      },
      {
        label: 'Done',
        entityTypeId: 'feature',
        description: 'Completed and accepted'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'story_statement',
            role: 'item'
          },
          {
            type: 'task',
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
      pattern: 'table'
    },
    presentation: {
      layout: {
        type: 'table',
        columns: [
          {
            property: 'title',
            label: 'To Do',
            sortable: true
          },
          {
            property: 'title',
            label: 'In Progress',
            sortable: true
          },
          {
            property: 'title',
            label: 'In Review',
            sortable: true
          },
          {
            property: 'title',
            label: 'Done',
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
      purpose: 'Visualise the sprint backlog as columns (To Do, In Progress, Done) so the team sees daily progress and blockers without needing a meeting.',
      core_question: 'Is the team on track to complete the sprint goal, and where is work stuck?',
      when_to_use: [
        'You need to coordinate work across multiple teams or time horizons',
        'Stakeholders need visibility into what is coming and when',
        'You want to balance commitments with flexibility'
      ],
      when_not_to_use: [
        'The team is small enough that informal coordination works',
        'Plans would create false precision about uncertain outcomes'
      ]
    }
  },
  {
    id: 'roadmap-timeline',
    approach_ids: ['plan'],
    name: 'Roadmap Timeline',
    version: '1.0.0',
    description: 'Time-based roadmap showing initiatives across quarters with dependencies.',
    category: 'planning',
    origin: {
      type: 'practitioner',
      description: 'Traditional time-based roadmap. Useful for stakeholder communication when dates matter.',
      license: 'cc_by',
    },
    tags: [
      'planning',
      'flow'
    ],
    slots: [
      {
        label: 'Q1',
        entityTypeId: 'initiative',
        description: 'Current quarter commitments'
      },
      {
        label: 'Q2',
        entityTypeId: 'initiative',
        description: 'Next quarter plans'
      },
      {
        label: 'Q3',
        entityTypeId: 'initiative',
        description: 'Later quarter goals'
      },
      {
        label: 'Dependencies',
        entityTypeId: 'release',
        description: 'Cross-initiative dependencies'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'initiative',
            role: 'item'
          },
          {
            type: 'release',
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
      purpose: 'Lay out planned work on a time axis so stakeholders see what is coming when. The classic communication tool for aligning expectations.',
      core_question: 'What are we shipping in the next 3-6 months, and how does each item connect to our strategic goals?',
      when_to_use: [
        'You need to coordinate work across multiple teams or time horizons',
        'Stakeholders need visibility into what is coming and when',
        'You want to balance commitments with flexibility'
      ],
      when_not_to_use: [
        'The team is small enough that informal coordination works',
        'Plans would create false precision about uncertain outcomes'
      ]
    }
  },
  {
    id: 'now-next-later',
    approach_ids: ['plan'],
    name: 'Now-Next-Later',
    version: '1.0.0',
    description: 'Prioritise work into three time horizons without committing to specific dates. Outcome-focused, not date-focused.',
    category: 'planning',
    origin: {
      type: 'practitioner',
      description: 'Popularised by Janna Bastow (ProdPad). An outcome-focused roadmap that avoids false date commitments.',
      url: 'https://www.prodpad.com/blog/invented-now-next-later-roadmap/',
      year: 2012,
      license: 'cc_by',
    },
    tags: [
      'planning',
      'table'
    ],
    slots: [
      {
        label: 'Now',
        entityTypeId: 'feature',
        description: 'Committed work in progress'
      },
      {
        label: 'Next',
        entityTypeId: 'feature',
        description: 'High-confidence upcoming work'
      },
      {
        label: 'Later',
        entityTypeId: 'initiative',
        description: 'Exploratory, needs more discovery'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'feature',
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
      pattern: 'table'
    },
    presentation: {
      layout: {
        type: 'table',
        columns: [
          {
            property: 'title',
            label: 'Now',
            sortable: true
          },
          {
            property: 'title',
            label: 'Next',
            sortable: true
          },
          {
            property: 'title',
            label: 'Later',
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
      purpose: 'Organise work by time horizon without committing to dates. Now is in progress, Next is committed, Later is under consideration. Flexible direction.',
      core_question: 'What are we certain about (Now), what have we committed to (Next), and what are we still exploring (Later)?',
      when_to_use: [
        'You need to coordinate work across multiple teams or time horizons',
        'Stakeholders need visibility into what is coming and when',
        'You want to balance commitments with flexibility'
      ],
      when_not_to_use: [
        'The team is small enough that informal coordination works',
        'Plans would create false precision about uncertain outcomes'
      ]
    }
  },
  {
    id: 'shape-up',
    approach_ids: ['plan'],
    name: 'Shape Up',
    version: '1.0.0',
    description: 'Basecamp\'s methodology: shape work into appetites, bet on 6-week cycles, and give teams full autonomy to deliver within fixed time, variable scope.',
    category: 'planning',
    origin: {
      type: 'practitioner',
      attribution: 'Ryan Singer',
      description: 'Created at Basecamp (formerly 37signals) by Ryan Singer. Published as a free online book in 2019. Introduces the concepts of shaping, appetite, and six-week cycles as an alternative to Scrum sprints.',
      url: 'https://basecamp.com/shapeup',
      year: 2019,
      license: 'published_methodology',
    },
    tags: [
      'planning',
      'flow'
    ],
    slots: [
      {
        label: 'Shaping',
        entityTypeId: 'feature',
        description: 'Define the problem and solution at the right level of abstraction — rough enough to leave room, specific enough to act on'
      },
      {
        label: 'Betting Table',
        entityTypeId: 'decision',
        description: 'Betting Table phase — decision entities move through this stage'
      },
      {
        label: 'Building (6-week cycle)',
        entityTypeId: 'epic',
        description: 'Building (6-week cycle) phase — epic entities move through this stage'
      },
      {
        label: 'Cooldown',
        entityTypeId: 'task',
        description: 'Two-week buffer for bug fixes, exploration, and preparing the next cycle\'s pitches'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'feature',
            role: 'item'
          },
          {
            type: 'epic',
            role: 'item'
          },
          {
            type: 'task',
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
      purpose: 'Frame work in fixed six-week cycles with shaped pitches, giving teams autonomy within appetite-bounded scope instead of open-ended backlogs.',
      core_question: 'What is the right appetite for this problem, and how do we shape a pitch that fits within that boundary?',
      when_to_use: [
        'You need to coordinate work across multiple teams or time horizons',
        'Stakeholders need visibility into what is coming and when',
        'You want to balance commitments with flexibility'
      ],
      when_not_to_use: [
        'The team is small enough that informal coordination works',
        'Plans would create false precision about uncertain outcomes'
      ]
    }
  },
  {
    id: 'story-splitting-patterns',
    name: 'Story Splitting Patterns',
    version: '1.0.0',
    description: 'Nine patterns for breaking large user stories into smaller, independently deliverable slices that maintain user value.',
    category: 'planning',
    origin: {
      type: 'practitioner',
      attribution: 'Richard Lawrence',
      description: 'Story Splitting Patterns',
      url: 'https://agileforall.com/patterns-for-splitting-user-stories/',
      year: 2009,
      license: 'open_attribution',
    },
    tags: [
      'planning',
      'tree'
    ],
    slots: [
      {
        label: 'Original Story',
        entityTypeId: 'epic',
        description: 'Original Story — epic entities for this dimension of the framework'
      },
      {
        label: 'Split Stories',
        entityTypeId: 'story_statement',
        description: 'Split Stories — user story entities for this dimension of the framework'
      },
      {
        label: 'Acceptance Criteria',
        entityTypeId: 'acceptance_criterion',
        description: 'Acceptance Criteria — acceptance criterion entities for this dimension of the framework'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'story_statement',
            role: 'item'
          },
          {
            type: 'epic',
            role: 'item'
          },
          {
            type: 'acceptance_criterion',
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
      purpose: 'Apply proven patterns for splitting large user stories into smaller, independently valuable slices: by workflow step, data variation, or business rule.',
      core_question: 'How can we slice this story smaller so each piece delivers user value and can be developed, tested, and shipped independently?',
      when_to_use: [
        'You need to coordinate work across multiple teams or time horizons',
        'Stakeholders need visibility into what is coming and when',
        'You want to balance commitments with flexibility'
      ],
      when_not_to_use: [
        'The team is small enough that informal coordination works',
        'Plans would create false precision about uncertain outcomes'
      ]
    }
  },
  {
    id: 'opportunity-canvas',
    approach_ids: ['plan'],
    name: 'Opportunity Canvas',
    version: '1.0.0',
    description: 'Evaluate whether a product opportunity is worth pursuing by examining the problem, users, market, solution approach, budget, and timeline.',
    category: 'planning',
    origin: {
      type: 'practitioner',
      attribution: 'Jeff Patton',
      description: 'Created by Jeff Patton as a lightweight alternative to full business cases. The Opportunity Canvas captures problem, users, solution, metrics, and risks on one page to evaluate product opportunities before committing resources.',
      license: 'open_attribution',
    },
    tags: [
      'planning',
      'matrix'
    ],
    slots: [
      {
        label: 'Problem',
        entityTypeId: 'need',
        description: 'Place need entities in the Problem position of the matrix'
      },
      {
        label: 'Users & Customers',
        entityTypeId: 'persona',
        description: 'Place persona entities in the Users & Customers position of the matrix'
      },
      {
        label: 'Market Size',
        entityTypeId: 'market_segment',
        description: 'Place market segment entities in the Market Size position of the matrix'
      },
      {
        label: 'Solution Ideas',
        entityTypeId: 'solution',
        description: 'Place solution entities in the Solution Ideas position of the matrix'
      },
      {
        label: 'Success Metrics',
        entityTypeId: 'metric',
        description: 'Place metric entities in the Success Metrics position of the matrix'
      },
      {
        label: 'Assumptions',
        entityTypeId: 'assumption',
        description: 'Place assumption entities in the Assumptions position of the matrix'
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
          type: 'solution',
          role: 'bucket'
        },
        {
          type: 'metric',
          role: 'bucket'
        },
        {
          type: 'assumption',
          role: 'bucket'
        },
        {
          type: 'market_segment',
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
      purpose: 'Evaluate a product opportunity before committing resources: problem, target customer, solution, metrics, risks. A single canvas that forces clarity and brevity.',
      core_question: 'Is this opportunity worth pursuing? Do we understand the problem, customer, and risks well enough to invest?',
      when_to_use: [
        'You need to coordinate work across multiple teams or time horizons',
        'Stakeholders need visibility into what is coming and when',
        'You want to balance commitments with flexibility'
      ],
      when_not_to_use: [
        'The team is small enough that informal coordination works',
        'Plans would create false precision about uncertain outcomes'
      ]
    }
  },
  {
    id: 'goal-oriented-roadmap',
    approach_ids: ['plan'],
    name: 'Goal-Oriented Roadmap',
    version: '1.0.0',
    description: 'Organise your roadmap around goals and outcomes rather than features. Each time horizon maps to a goal, metrics, and the features that serve it.',
    category: 'planning',
    origin: {
      type: 'practitioner',
      attribution: 'Roman Pichler',
      description: 'Promoted by Roman Pichler in \"Strategize\" (2016). Organises the roadmap around goals and outcomes rather than features, ensuring the plan survives when solutions change but objectives remain.',
      url: 'https://www.romanpichler.com/blog/goal-oriented-agile-product-roadmap/',
      year: 2016,
      license: 'published_methodology',
    },
    tags: [
      'planning',
      'matrix'
    ],
    slots: [
      {
        label: 'Date & Goal',
        entityTypeId: 'objective',
        description: 'Place objective entities in the Date & Goal position of the matrix'
      },
      {
        label: 'Key Results',
        entityTypeId: 'key_result',
        description: 'Place key result entities in the Key Results position of the matrix'
      },
      {
        label: 'Features',
        entityTypeId: 'feature',
        description: 'Place feature entities in the Features position of the matrix'
      },
      {
        label: 'Metrics',
        entityTypeId: 'metric',
        description: 'Place metric entities in the Metrics position of the matrix'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'objective',
          role: 'bucket'
        },
        {
          type: 'key_result',
          role: 'bucket'
        },
        {
          type: 'feature',
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
      purpose: 'Organise the roadmap around goals and outcomes instead of features, so the plan survives when solutions change but the objective doesn\'t.',
      core_question: 'What outcomes are we driving toward, and which bets are we making to achieve them?',
      when_to_use: [
        'You need to coordinate work across multiple teams or time horizons',
        'Stakeholders need visibility into what is coming and when',
        'You want to balance commitments with flexibility'
      ],
      when_not_to_use: [
        'The team is small enough that informal coordination works',
        'Plans would create false precision about uncertain outcomes'
      ]
    }
  },
  {
    id: 'wsjf',
    approach_ids: ['prioritise'],
    name: 'WSJF (Weighted Shortest Job First)',
    version: '1.0.0',
    description: 'Prioritise work by dividing Cost of Delay (user value + time criticality + risk reduction) by job duration to maximise economic throughput.',
    category: 'planning',
    origin: {
      type: 'practitioner',
      attribution: 'Reinertsen / SAFe',
      description: 'Developed by Don Reinertsen and adopted as a core practice in the Scaled Agile Framework (SAFe). Combines urgency (Cost of Delay) with job size to produce an economic prioritisation sequence.',
      url: 'https://www.scaledagileframework.com/wsjf/',
      year: 2011,
      license: 'open_attribution',
    },
    tags: [
      'planning',
      'table'
    ],
    slots: [
      {
        label: 'Backlog Items',
        entityTypeId: 'feature',
        description: 'Backlog Items — feature entries to evaluate'
      },
      {
        label: 'User/Business Value',
        entityTypeId: 'metric',
        description: 'User/Business Value — metric entries to evaluate'
      },
      {
        label: 'Time Criticality',
        entityTypeId: 'metric',
        description: 'How much value decays if delivery is delayed — deadlines, competition, seasonal windows'
      },
      {
        label: 'Risk Reduction / Opportunity Enablement',
        entityTypeId: 'metric',
        description: 'Risk Reduction / Opportunity Enablement — metric entries to evaluate'
      },
      {
        label: 'Job Size',
        entityTypeId: 'metric',
        description: 'Estimated effort — story points, t-shirt size, or person-weeks'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'feature',
            role: 'scored_item'
          },
          {
            type: 'metric',
            role: 'item'
          }
        ],
      required_properties: {},
      computed_properties: [
        {
          property: 'wsjf_score',
          expression: '(user_value + time_criticality + risk_reduction) / job_size',
          entity_type: 'feature',
          label: 'WSJF Score',
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
            property: 'title',
            label: 'Backlog Items',
            sortable: true
          },
          {
            property: 'user_value',
            label: 'User/Business Value',
            sortable: true
          },
          {
            property: 'time_criticality',
            label: 'Time Criticality',
            sortable: true
          },
          {
            property: 'risk_reduction',
            label: 'Risk Reduction / Opportunity Enablement',
            sortable: true
          },
          {
            property: 'job_size',
            label: 'Job Size',
            sortable: true
          },
          {
            property: 'wsjf_score',
            label: 'WSJF Score',
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
      purpose: 'Prioritise work by dividing the Cost of Delay by job duration, ensuring the most time-sensitive, valuable items are done first.',
      core_question: 'Considering the cost of waiting, which items should we start now to maximise economic benefit?',
      when_to_use: [
        'You need to coordinate work across multiple teams or time horizons',
        'Stakeholders need visibility into what is coming and when',
        'You want to balance commitments with flexibility'
      ],
      when_not_to_use: [
        'The team is small enough that informal coordination works',
        'Plans would create false precision about uncertain outcomes'
      ]
    }
  },
  {
    id: 'kanban-board',
    approach_ids: ['plan'],
    name: 'Kanban Board',
    version: '1.0.0',
    description: 'Visualise work flowing through stages with explicit work-in-progress limits to optimise throughput and reduce lead time.',
    category: 'planning',
    origin: {
      type: 'practitioner',
      attribution: 'David Anderson',
      description: 'Adapted from the Toyota Production System by David J. Anderson for knowledge work. The Kanban method applies lean principles (visualise, limit WIP, manage flow, make policies explicit) to software development and beyond.',
      url: 'https://en.wikipedia.org/wiki/Kanban_(development)',
      year: 2010,
      license: 'open_attribution',
    },
    tags: [
      'planning',
      'flow'
    ],
    slots: [
      {
        label: 'Backlog',
        entityTypeId: 'story_statement',
        description: 'Items waiting to be pulled — ordered by priority, not yet committed'
      },
      {
        label: 'Ready',
        entityTypeId: 'story_statement',
        description: 'Ready phase — user story entities move through this stage'
      },
      {
        label: 'In Progress',
        entityTypeId: 'task',
        description: 'Work actively being done — subject to WIP limits'
      },
      {
        label: 'Review',
        entityTypeId: 'task',
        description: 'Completed work awaiting review, testing, or approval'
      },
      {
        label: 'Done',
        entityTypeId: 'task',
        description: 'Shipped and verified — the finish line'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'task',
            role: 'item'
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
      purpose: 'Visualise work in progress and enforce WIP limits so teams see bottlenecks in real time and maintain steady flow instead of overcommitting.',
      core_question: 'Where is work accumulating in our process, and what WIP limit changes would improve flow?',
      when_to_use: [
        'You need to coordinate work across multiple teams or time horizons',
        'Stakeholders need visibility into what is coming and when',
        'You want to balance commitments with flexibility'
      ],
      when_not_to_use: [
        'The team is small enough that informal coordination works',
        'Plans would create false precision about uncertain outcomes'
      ]
    }
  },
  {
    id: 'story-map-release-slicing',
    approach_ids: ['plan'],
    name: 'Story Map Release Slicing',
    version: '1.0.0',
    description: 'Arrange user stories along a narrative backbone and slice horizontal release lines to define minimum viable releases.',
    category: 'planning',
    origin: {
      type: 'practitioner',
      attribution: 'Jeff Patton',
      description: 'Extension of Jeff Patton\'s User Story Mapping. Release slicing adds the vertical dimension — drawing horizontal lines across the map to define incremental releases, from walking skeleton to full product.',
      url: 'https://www.jpattonassociates.com/user-story-mapping/',
      year: 2014,
      license: 'published_methodology',
    },
    tags: [
      'planning',
      'matrix'
    ],
    slots: [
      {
        label: 'Story Backbone (Activities)',
        entityTypeId: 'epic',
        description: 'Place epic entities in the Story Backbone (Activities) position of the matrix'
      },
      {
        label: 'Walking Skeleton (Tasks)',
        entityTypeId: 'story_statement',
        description: 'Place user story entities in the Walking Skeleton (Tasks) position of the matrix'
      },
      {
        label: 'Release 1 (MVP)',
        entityTypeId: 'release',
        description: 'Place release entities in the Release 1 (MVP) position of the matrix'
      },
      {
        label: 'Release 2',
        entityTypeId: 'release',
        description: 'Additional depth and polish across the journey'
      },
      {
        label: 'Release 3+',
        entityTypeId: 'release',
        description: 'Advanced features, edge cases, and optimisations'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'story_statement',
          role: 'bucket'
        },
        {
          type: 'epic',
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
      purpose: 'Slice a story map horizontally into releases so teams ship thin, usable increments of the full user journey instead of thick feature silos.',
      core_question: 'What is the thinnest horizontal slice across the story map that delivers a complete (if minimal) user experience?',
      when_to_use: [
        'You need to coordinate work across multiple teams or time horizons',
        'Stakeholders need visibility into what is coming and when',
        'You want to balance commitments with flexibility'
      ],
      when_not_to_use: [
        'The team is small enough that informal coordination works',
        'Plans would create false precision about uncertain outcomes'
      ]
    }
  },
  {
    id: 'product-tree',
    approach_ids: ['plan'],
    name: 'Product Tree',
    version: '1.0.0',
    description: 'Visualise your product as a tree — the trunk is the core platform, branches are feature areas, leaves are individual features, and roots are the underlying infrastructure.',
    category: 'planning',
    origin: {
      type: 'practitioner',
      attribution: 'Luke Hohmann',
      description: 'Created by Luke Hohmann as part of the Innovation Games suite (2006). The product tree metaphor organises features as leaves on branches (feature groups) on a trunk (core product).',
      url: 'https://www.innovationgames.com/prune-the-product-tree/',
      year: 2006,
      license: 'published_methodology',
    },
    tags: [
      'planning',
      'tree'
    ],
    slots: [
      {
        label: 'Trunk (Core Platform)',
        entityTypeId: 'product',
        description: 'Trunk (Core Platform) — product entities for this dimension of the framework'
      },
      {
        label: 'Branches (Feature Areas)',
        entityTypeId: 'feature_area',
        description: 'Branches (Feature Areas) — capability entities for this dimension of the framework'
      },
      {
        label: 'Leaves (Features)',
        entityTypeId: 'feature',
        description: 'Leaves (Features) — feature entities for this dimension of the framework'
      },
      {
        label: 'Roots (Infrastructure)',
        entityTypeId: 'capability',
        description: 'Roots (Infrastructure) — capability entities for this dimension of the framework'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'product',
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
            type: 'feature_area',
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
      purpose: 'Organise the product into a tree of feature groups (trunk → branches → leaves) that mirrors the user\'s mental model and helps prioritise where to grow next.',
      core_question: 'Which branches of our product tree should grow next, and which are already mature enough to prune or harvest?',
      when_to_use: [
        'You need to coordinate work across multiple teams or time horizons',
        'Stakeholders need visibility into what is coming and when',
        'You want to balance commitments with flexibility'
      ],
      when_not_to_use: [
        'The team is small enough that informal coordination works',
        'Plans would create false precision about uncertain outcomes'
      ]
    }
  },
  {
    id: 'impact-effort-matrix',
    approach_ids: ['prioritise'],
    name: 'Impact-Effort Matrix',
    version: '1.0.0',
    description: 'Plot work items on two axes — impact and effort — to identify quick wins, major projects, fill-ins, and items to avoid.',
    category: 'planning',
    origin: {
      type: 'practitioner',
      description: 'A widely used prioritisation tool with roots in project management and lean manufacturing. The 2x2 matrix plots impact against effort to quickly identify quick wins and avoid time sinks.',
      license: 'cc_by',
    },
    tags: [
      'planning',
      'quadrant'
    ],
    slots: [
      {
        label: 'Quick Wins (High Impact, Low Effort)',
        entityTypeId: 'feature',
        description: 'Quick Wins (High Impact, Low Effort) quadrant — place feature entities here based on their position on both axes'
      },
      {
        label: 'Major Projects (High Impact, High Effort)',
        entityTypeId: 'feature',
        description: 'Major Projects (High Impact, High Effort) quadrant — place feature entities here based on their position on both axes'
      },
      {
        label: 'Fill-Ins (Low Impact, Low Effort)',
        entityTypeId: 'task',
        description: 'Fill-Ins (Low Impact, Low Effort) quadrant — place task entities here based on their position on both axes'
      },
      {
        label: 'Avoid (Low Impact, High Effort)',
        entityTypeId: 'task',
        description: 'Avoid (Low Impact, High Effort) quadrant — place task entities here based on their position on both axes'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'feature',
            role: 'item'
          },
          {
            type: 'task',
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
        x_label: 'Quick Wins (High Impact, Low Effort)',
        y_label: 'Major Projects (High Impact, High Effort)'
      },
      colour_by: 'group',
      card_fields: [
        'title',
        'description'
      ]
    },
    education: {
      purpose: 'Plot items on a 2x2 matrix of impact versus effort to quickly sort them into quick wins, big bets, fill-ins, and time sinks.',
      core_question: 'Which items are high-impact, low-effort quick wins that we should do immediately?',
      when_to_use: [
        'You need to coordinate work across multiple teams or time horizons',
        'Stakeholders need visibility into what is coming and when',
        'You want to balance commitments with flexibility'
      ],
      when_not_to_use: [
        'The team is small enough that informal coordination works',
        'Plans would create false precision about uncertain outcomes'
      ]
    }
  },
  {
    id: 'outcome-based-roadmap',
    approach_ids: ['plan'],
    name: 'Outcome-Based Roadmap',
    version: '1.0.0',
    description: 'Organise your roadmap around measurable outcomes rather than outputs — each time horizon ties to an outcome, its key results, and the bets to achieve them.',
    category: 'planning',
    origin: {
      type: 'practitioner',
      attribution: 'Josh Seiden',
      description: 'Advocated by Josh Seiden in \"Outcomes Over Output\" (2019). Replaces feature-centric roadmaps with measurable outcomes that give teams autonomy to find the best solutions.',
      url: 'https://www.senseandrespondpress.com/managing-outcomes',
      year: 2019,
      license: 'published_methodology',
    },
    tags: [
      'planning',
      'flow'
    ],
    slots: [
      {
        label: 'Now — Current Outcomes',
        entityTypeId: 'outcome',
        description: 'Now — Current Outcomes phase — outcome entities move through this stage'
      },
      {
        label: 'Next — Upcoming Outcomes',
        entityTypeId: 'outcome',
        description: 'Next — Upcoming Outcomes phase — outcome entities move through this stage'
      },
      {
        label: 'Later — Future Outcomes',
        entityTypeId: 'outcome',
        description: 'Later — Future Outcomes phase — outcome entities move through this stage'
      },
      {
        label: 'Bets / Initiatives',
        entityTypeId: 'initiative',
        description: 'Bets / Initiatives phase — outcome entities move through this stage'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'outcome',
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
      purpose: 'Replace feature lists with measurable outcomes and success metrics, giving teams autonomy to find the best solution while keeping leadership aligned on results.',
      core_question: 'What measurable outcomes will we drive this quarter, and how will we know when we\'ve achieved them?',
      when_to_use: [
        'You need to coordinate work across multiple teams or time horizons',
        'Stakeholders need visibility into what is coming and when',
        'You want to balance commitments with flexibility'
      ],
      when_not_to_use: [
        'The team is small enough that informal coordination works',
        'Plans would create false precision about uncertain outcomes'
      ]
    }
  }
]
