/**
 * UPG Framework Definitions — Validation
 * 12 frameworks for the validation domain.
 */

import type { UPGFramework } from '../types.js'

export const VALIDATION_FRAMEWORKS: UPGFramework[] = [
  {
    id: 'hypothesis-board',
    approach_ids: ['reflect'],
    name: 'Hypothesis Board',
    version: '1.0.0',
    description: 'Track hypotheses through their lifecycle: draft → designed → running → analysed. Each row is a hypothesis with its experiment and learning.',
    category: 'validation',
    origin: {
      type: 'practitioner',
      description: 'Common in lean product teams. Tracks hypotheses through design, experimentation, and learning cycles.',
      year: 2013,
      license: 'cc_by',
    },
    tags: [
      'validation',
      'table'
    ],
    slots: [
      {
        label: 'Hypothesis',
        entityTypeId: 'hypothesis',
        description: 'We believe [action] will result in [outcome]'
      },
      {
        label: 'Experiment',
        entityTypeId: 'experiment_run',
        description: 'The test designed to validate or invalidate'
      },
      {
        label: 'Success Metric',
        entityTypeId: 'metric',
        description: 'What number tells us if the hypothesis holds?'
      },
      {
        label: 'Learning',
        entityTypeId: 'learning',
        description: 'What we learned from the experiment'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'hypothesis',
            role: 'item'
          },
          {
            type: 'experiment_run',
            role: 'leaf'
          },
          {
            type: 'metric',
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
            property: 'title',
            label: 'Hypothesis',
            sortable: true
          },
          {
            property: 'title',
            label: 'Experiment',
            sortable: true
          },
          {
            property: 'title',
            label: 'Success Metric',
            sortable: true
          },
          {
            property: 'description',
            label: 'Learning',
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
      purpose: 'Track product hypotheses through their lifecycle: assumption to experiment to validated/invalidated. Team learning becomes visible and cumulative.',
      core_question: 'Which hypotheses have we validated, which have we invalidated, and what new hypotheses emerged from the evidence?',
      when_to_use: [
        'You have hypotheses about user needs or solutions that need testing',
        'You want to reduce risk before committing engineering resources',
        'The team is debating assumptions that can be tested empirically'
      ],
      when_not_to_use: [
        'The solution is already validated through real usage data',
        'Speed of shipping matters more than certainty about assumptions'
      ]
    }
  },
  {
    id: 'experiment-tracker',
    name: 'Experiment Tracker',
    version: '1.0.0',
    description: 'Track experiments from design through execution to results. Velocity-focused.',
    category: 'validation',
    origin: {
      type: 'practitioner',
      description: 'Common in growth and product teams running continuous experiments.',
      license: 'cc_by',
    },
    tags: [
      'validation',
      'table'
    ],
    slots: [
      {
        label: 'Experiment',
        entityTypeId: 'experiment_run',
        description: 'The test being run'
      },
      {
        label: 'Hypothesis',
        entityTypeId: 'hypothesis',
        description: 'What we\'re testing'
      },
      {
        label: 'Success Metric',
        entityTypeId: 'metric',
        description: 'How we\'ll measure success'
      },
      {
        label: 'Status',
        entityTypeId: 'experiment_run',
        description: 'Draft/Running/Complete'
      },
      {
        label: 'Result',
        entityTypeId: 'learning',
        description: 'What we learned'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'experiment_run',
          role: 'scored_item'
        },
        {
          type: 'hypothesis',
          role: 'item'
        },
        {
          type: 'metric',
          role: 'item'
        },
        {
          type: 'learning',
          role: 'item'
        }
      ],
      required_properties: {},
      computed_properties: [
        {
          property: 'confidence_score',
          expression: '(sample_size / target_sample) * 100',
          entity_type: 'experiment_run',
          label: 'Confidence',
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
            property: 'title',
            label: 'Experiment',
            sortable: true
          },
          {
            property: 'title',
            label: 'Hypothesis',
            sortable: true
          },
          {
            property: 'title',
            label: 'Success Metric',
            sortable: true
          },
          {
            property: 'status',
            label: 'Status',
          },
          {
            property: 'description',
            label: 'Result',
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
      purpose: 'Track all running and completed experiments in one place: hypothesis, method, status, result, learnings. The team builds a cumulative record of validated knowledge.',
      core_question: 'What experiments are running, what have we learned from completed experiments, and are we applying those learnings to new hypotheses?',
      when_to_use: [
        'You have hypotheses about user needs or solutions that need testing',
        'You want to reduce risk before committing engineering resources',
        'The team is debating assumptions that can be tested empirically'
      ],
      when_not_to_use: [
        'The solution is already validated through real usage data',
        'Speed of shipping matters more than certainty about assumptions'
      ]
    }
  },
  {
    id: 'assumption-map',
    approach_ids: ['reflect'],
    name: 'Assumption Map',
    version: '1.0.0',
    description: 'Plot assumptions on axes of uncertainty vs risk. Most risky + most uncertain = test first.',
    category: 'validation',
    origin: {
      type: 'practitioner',
      attribution: 'David Bland',
      description: 'Published in Testing Business Ideas (Wiley). Prioritises which assumptions to validate first.',
      url: 'https://www.strategyzer.com/books/testing-business-ideas',
      year: 2019,
      license: 'published_methodology',
    },
    tags: [
      'validation',
      'quadrant'
    ],
    slots: [
      {
        label: 'Test First',
        entityTypeId: 'assumption',
        description: 'High risk, high uncertainty — validate immediately'
      },
      {
        label: 'Research',
        entityTypeId: 'assumption',
        description: 'High uncertainty, lower risk — learn more'
      },
      {
        label: 'Monitor',
        entityTypeId: 'assumption',
        description: 'High risk but well understood — watch closely'
      },
      {
        label: 'Accept',
        entityTypeId: 'assumption',
        description: 'Low risk, low uncertainty — safe to proceed'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'assumption',
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
        x_label: 'Test First',
        y_label: 'Research'
      },
      colour_by: 'group',
      card_fields: [
        'title',
        'description'
      ]
    },
    education: {
      purpose: 'Plot assumptions on a risk/evidence matrix so teams test the most dangerous unknowns first instead of building on unvalidated beliefs.',
      core_question: 'Which assumptions carry the most risk and the least evidence? Where do we run experiments first?',
      when_to_use: [
        'You have hypotheses about user needs or solutions that need testing',
        'You want to reduce risk before committing engineering resources',
        'The team is debating assumptions that can be tested empirically'
      ],
      when_not_to_use: [
        'The solution is already validated through real usage data',
        'Speed of shipping matters more than certainty about assumptions'
      ]
    }
  },
  {
    id: 'lean-experiment-canvas',
    approach_ids: ['reflect'],
    name: 'Lean Experiment Canvas',
    version: '1.0.0',
    description: 'One-page experiment design: hypothesis, method, metrics, and learning.',
    category: 'validation',
    origin: {
      type: 'practitioner',
      description: 'Adapted from Lean Startup methodology. A structured template for designing individual experiments.',
      license: 'cc_by',
    },
    tags: [
      'validation',
      'matrix'
    ],
    slots: [
      {
        label: 'Hypothesis',
        entityTypeId: 'hypothesis',
        description: 'We believe that...'
      },
      {
        label: 'Experiment Design',
        entityTypeId: 'experiment_run',
        description: 'We will test this by...'
      },
      {
        label: 'Success Metric',
        entityTypeId: 'metric',
        description: 'We\'ll know we\'re right if...'
      },
      {
        label: 'Minimum Success Criteria',
        entityTypeId: 'metric',
        description: 'The threshold for validation'
      },
      {
        label: 'Time Box',
        entityTypeId: 'experiment_run',
        description: 'Duration and sample size'
      },
      {
        label: 'Learning',
        entityTypeId: 'learning',
        description: 'What we actually learned'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'hypothesis',
          role: 'bucket'
        },
        {
          type: 'experiment_run',
          role: 'bucket'
        },
        {
          type: 'metric',
          role: 'bucket'
        },
        {
          type: 'learning',
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
      purpose: 'Design experiments that test one assumption at a time (hypothesis, metric, method, criteria). Each experiment produces a clear learn-or-pivot signal.',
      core_question: 'What is the one assumption we\'re testing, what result would make us pivot, and what is the fastest way to get that result?',
      when_to_use: [
        'You have hypotheses about user needs or solutions that need testing',
        'You want to reduce risk before committing engineering resources',
        'The team is debating assumptions that can be tested empirically'
      ],
      when_not_to_use: [
        'The solution is already validated through real usage data',
        'Speed of shipping matters more than certainty about assumptions'
      ]
    }
  },
  {
    id: 'riskiest-assumption-test',
    approach_ids: ['reflect'],
    name: 'Riskiest Assumption Test',
    version: '1.0.0',
    description: 'Identify the single riskiest assumption underlying your idea and design the fastest, cheapest test to validate or invalidate it before building anything.',
    category: 'validation',
    origin: {
      type: 'practitioner',
      attribution: 'Rik Higham',
      description: 'Riskiest Assumption Test',
      url: 'https://medium.com/@rik.higham/the-riskiest-assumption-test-74a9dbb82a9e',
      year: 2016,
      license: 'cc_by',
    },
    tags: [
      'validation',
      'table'
    ],
    slots: [
      {
        label: 'Riskiest Assumption',
        entityTypeId: 'assumption',
        description: 'Riskiest Assumption — assumption entries to evaluate'
      },
      {
        label: 'Hypothesis',
        entityTypeId: 'hypothesis',
        description: 'Hypothesis — hypothesis entries to evaluate'
      },
      {
        label: 'Test Design',
        entityTypeId: 'experiment_run',
        description: 'Test Design — experiment entries to evaluate'
      },
      {
        label: 'Evidence',
        entityTypeId: 'evidence',
        description: 'Evidence — evidence entries to evaluate'
      },
      {
        label: 'Learning',
        entityTypeId: 'learning',
        description: 'Learning — learning entries to evaluate'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'assumption',
          role: 'item'
        },
        {
          type: 'hypothesis',
          role: 'item'
        },
        {
          type: 'experiment_run',
          role: 'item'
        },
        {
          type: 'evidence',
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
            property: 'title',
            label: 'Riskiest Assumption',
            sortable: true
          },
          {
            property: 'title',
            label: 'Hypothesis',
            sortable: true
          },
          {
            property: 'description',
            label: 'Test Design',
          },
          {
            property: 'description',
            label: 'Evidence',
          },
          {
            property: 'description',
            label: 'Learning',
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
      purpose: 'Identify and test the single riskiest assumption in a product idea before investing in a full MVP. Fastest path to validating or killing an idea.',
      core_question: 'If we could only test one assumption, which one would kill the entire idea if proven wrong?',
      when_to_use: [
        'You have hypotheses about user needs or solutions that need testing',
        'You want to reduce risk before committing engineering resources',
        'The team is debating assumptions that can be tested empirically'
      ],
      when_not_to_use: [
        'The solution is already validated through real usage data',
        'Speed of shipping matters more than certainty about assumptions'
      ]
    }
  },
  {
    id: 'pretotyping',
    approach_ids: ['reflect'],
    name: 'Pretotyping',
    version: '1.0.0',
    description: 'Test market interest and demand with fake or minimal versions of the product before investing in building the real thing.',
    category: 'validation',
    origin: {
      type: 'practitioner',
      attribution: 'Alberto Savoia',
      description: 'Coined by Alberto Savoia (former Google engineering director), published in \"The Right It\" (2019). Pretotyping tests market demand before building anything via fake doors, landing pages, and other low-effort validation techniques.',
      url: 'https://www.pretotyping.org/',
      year: 2019,
      license: 'published_methodology',
    },
    tags: [
      'validation',
      'flow'
    ],
    slots: [
      {
        label: 'Product Idea',
        entityTypeId: 'solution',
        description: 'Product Idea phase — hypothesis entities move through this stage'
      },
      {
        label: 'Pretotype',
        entityTypeId: 'prototype',
        description: 'Pretotype phase — prototype entities move through this stage'
      },
      {
        label: 'Market Test',
        entityTypeId: 'experiment_run',
        description: 'Market Test phase — experiment entities move through this stage'
      },
      {
        label: 'Data Collected',
        entityTypeId: 'evidence',
        description: 'Data Collected phase — evidence entities move through this stage'
      },
      {
        label: 'Go/No-Go',
        entityTypeId: 'decision',
        description: 'Go/No-Go phase — learning entities move through this stage'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'experiment_run',
            role: 'item'
          },
          {
            type: 'prototype',
            role: 'item'
          },
          {
            type: 'evidence',
            role: 'item'
          },
          {
            type: 'solution',
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
      purpose: 'Test whether anyone wants a product before building it. Fake doors, landing pages, concierge MVPs separate \"I would use that\" from \"I actually used that\".',
      core_question: 'Can we test demand for this idea without building the actual product? Would people click, sign up, or pay for it right now?',
      when_to_use: [
        'You have hypotheses about user needs or solutions that need testing',
        'You want to reduce risk before committing engineering resources',
        'The team is debating assumptions that can be tested empirically'
      ],
      when_not_to_use: [
        'The solution is already validated through real usage data',
        'Speed of shipping matters more than certainty about assumptions'
      ]
    }
  },
  {
    id: 'validation-board',
    name: 'Validation Board',
    version: '1.0.0',
    description: 'Track and iterate on customer, problem, and solution hypotheses through a structured pivot-or-persevere board.',
    category: 'validation',
    origin: {
      type: 'practitioner',
      attribution: 'Lean Startup Machine',
      description: 'Lean Startup Machine Workshops',
      url: 'https://leanstartupmachine.com/validationboard/',
      year: 2012,
      license: 'open_attribution',
    },
    tags: [
      'validation',
      'matrix'
    ],
    slots: [
      {
        label: 'Customer Hypothesis',
        entityTypeId: 'persona',
        description: 'Place persona entities in the Customer Hypothesis position of the matrix'
      },
      {
        label: 'Problem Hypothesis',
        entityTypeId: 'need',
        description: 'Place need entities in the Problem Hypothesis position of the matrix'
      },
      {
        label: 'Solution Hypothesis',
        entityTypeId: 'solution',
        description: 'Place solution entities in the Solution Hypothesis position of the matrix'
      },
      {
        label: 'Experiments',
        entityTypeId: 'experiment_run',
        description: 'Place experiment entities in the Experiments position of the matrix'
      },
      {
        label: 'Pivot or Persevere',
        entityTypeId: 'decision',
        description: 'Place learning entities in the Pivot or Persevere position of the matrix'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'experiment_run',
            role: 'bucket'
          },
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
            type: 'decision',
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
      purpose: 'Manage validation as a board: customer hypothesis, problem hypothesis, solution hypothesis. Track which are validated, invalidated, or still testing.',
      core_question: 'Which of our hypotheses about the customer, problem, and solution have been validated with evidence, and which are still assumptions?',
      when_to_use: [
        'You have hypotheses about user needs or solutions that need testing',
        'You want to reduce risk before committing engineering resources',
        'The team is debating assumptions that can be tested empirically'
      ],
      when_not_to_use: [
        'The solution is already validated through real usage data',
        'Speed of shipping matters more than certainty about assumptions'
      ]
    }
  },
  {
    id: 'experiment-card',
    approach_ids: ['reflect'],
    name: 'Experiment Card',
    version: '1.0.0',
    description: 'A single-card format for designing experiments. Captures hypothesis, test method, metrics, and success criteria in one place.',
    category: 'validation',
    origin: {
      type: 'practitioner',
      attribution: 'Strategyzer',
      description: 'Testing Business Ideas',
      url: 'https://www.strategyzer.com/library/how-to-test-business-ideas',
      year: 2019,
      license: 'published_methodology',
    },
    tags: [
      'validation',
      'matrix'
    ],
    slots: [
      {
        label: 'Hypothesis',
        entityTypeId: 'hypothesis',
        description: 'Place hypothesis entities in the Hypothesis position of the matrix'
      },
      {
        label: 'Test',
        entityTypeId: 'experiment_run',
        description: 'Place experiment entities in the Test position of the matrix'
      },
      {
        label: 'Metric',
        entityTypeId: 'metric',
        description: 'Place metric entities in the Metric position of the matrix'
      },
      {
        label: 'Success Criteria',
        entityTypeId: 'metric',
        description: 'Place evidence entities in the Success Criteria position of the matrix'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'hypothesis',
          role: 'bucket'
        },
        {
          type: 'experiment_run',
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
      purpose: 'Document a single experiment on a structured card: hypothesis, method, success criteria, results, next action. A lightweight, shareable experiment record.',
      core_question: 'What exactly are we testing, what result would change our mind, and what did we actually learn?',
      when_to_use: [
        'You have hypotheses about user needs or solutions that need testing',
        'You want to reduce risk before committing engineering resources',
        'The team is debating assumptions that can be tested empirically'
      ],
      when_not_to_use: [
        'The solution is already validated through real usage data',
        'Speed of shipping matters more than certainty about assumptions'
      ]
    }
  },
  {
    id: 'build-measure-learn',
    name: 'Build-Measure-Learn',
    version: '1.0.0',
    description: 'The core Lean Startup feedback loop — build a minimum viable product, measure its impact with actionable metrics, and learn whether to pivot or persevere.',
    category: 'validation',
    origin: {
      type: 'practitioner',
      attribution: 'Eric Ries',
      description: 'Introduced by Eric Ries in \"The Lean Startup\" (2011). The Build-Measure-Learn feedback loop is the core engine of the Lean Startup methodology, emphasising validated learning over detailed planning.',
      url: 'https://en.wikipedia.org/wiki/Lean_startup',
      year: 2011,
      license: 'published_methodology',
    },
    tags: [
      'validation',
      'flow'
    ],
    slots: [
      {
        label: 'Build',
        entityTypeId: 'prototype',
        description: 'Build phase — prototype entities move through this stage'
      },
      {
        label: 'Measure',
        entityTypeId: 'metric',
        description: 'Measure phase — metric entities move through this stage'
      },
      {
        label: 'Learn',
        entityTypeId: 'learning',
        description: 'Learn phase — learning entities move through this stage'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'metric',
            role: 'item'
          },
          {
            type: 'learning',
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
      purpose: 'Iterate through the Lean Startup loop — build the smallest thing, measure what matters, learn whether to persevere or pivot — minimising waste on unvalidated ideas.',
      core_question: 'What is the minimum we need to build to test our current hypothesis, and what metric tells us whether to continue or pivot?',
      when_to_use: [
        'You have hypotheses about user needs or solutions that need testing',
        'You want to reduce risk before committing engineering resources',
        'The team is debating assumptions that can be tested empirically'
      ],
      when_not_to_use: [
        'The solution is already validated through real usage data',
        'Speed of shipping matters more than certainty about assumptions'
      ]
    }
  },
  {
    id: 'innovation-accounting',
    approach_ids: ['reflect'],
    name: 'Innovation Accounting',
    version: '1.0.0',
    description: 'Measure startup progress not by vanity metrics but through learning milestones — validated learning as the unit of progress.',
    category: 'validation',
    origin: {
      type: 'practitioner',
      attribution: 'Eric Ries',
      description: 'Introduced by Eric Ries in \"The Lean Startup\" (2011). Innovation accounting measures early-stage product progress using validated learning metrics instead of traditional financial metrics that are meaningless pre-PMF.',
      url: 'https://en.wikipedia.org/wiki/Lean_startup',
      year: 2011,
      license: 'published_methodology',
    },
    tags: [
      'validation',
      'table'
    ],
    slots: [
      {
        label: 'Establish Baseline',
        entityTypeId: 'metric',
        description: 'Establish Baseline — metric entries to evaluate'
      },
      {
        label: 'Tune the Engine',
        entityTypeId: 'experiment_run',
        description: 'Tune the Engine — experiment entries to evaluate'
      },
      {
        label: 'Pivot or Persevere',
        entityTypeId: 'learning',
        description: 'Pivot or Persevere — learning entries to evaluate'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'metric',
            role: 'item'
          },
          {
            type: 'learning',
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
      pattern: 'table'
    },
    presentation: {
      layout: {
        type: 'table',
        columns: [
          {
            property: 'title',
            label: 'Establish Baseline',
            sortable: true
          },
          {
            property: 'title',
            label: 'Tune the Engine',
            sortable: true
          },
          {
            property: 'description',
            label: 'Pivot or Persevere',
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
      purpose: 'Measure progress for early-stage products using leading indicators — validated hypotheses, experiment velocity, pivot decisions — instead of lagging financial metrics.',
      core_question: 'Is this early-stage product making measurable progress toward product-market fit, or are we investing without evidence of learning?',
      when_to_use: [
        'You have hypotheses about user needs or solutions that need testing',
        'You want to reduce risk before committing engineering resources',
        'The team is debating assumptions that can be tested empirically'
      ],
      when_not_to_use: [
        'The solution is already validated through real usage data',
        'Speed of shipping matters more than certainty about assumptions'
      ]
    }
  },
  {
    id: 'test-card-learning-card',
    approach_ids: ['reflect'],
    name: 'Test Card + Learning Card',
    version: '1.0.0',
    description: 'A paired system — the Test Card designs the experiment upfront, the Learning Card captures results and decisions afterward.',
    category: 'validation',
    origin: {
      type: 'practitioner',
      attribution: 'Osterwalder & Bland',
      description: 'Testing Business Ideas',
      url: 'https://www.strategyzer.com/library/how-to-test-business-ideas',
      year: 2019,
      license: 'published_methodology',
    },
    tags: [
      'validation',
      'flow'
    ],
    slots: [
      {
        label: 'Hypothesis',
        entityTypeId: 'hypothesis',
        description: 'Hypothesis phase — hypothesis entities move through this stage'
      },
      {
        label: 'Test Design',
        entityTypeId: 'test_plan',
        description: 'Test Design phase — test plan entities move through this stage'
      },
      {
        label: 'Experiment',
        entityTypeId: 'experiment_run',
        description: 'Experiment phase — experiment entities move through this stage'
      },
      {
        label: 'Observation',
        entityTypeId: 'evidence',
        description: 'Observation phase — evidence entities move through this stage'
      },
      {
        label: 'Learning',
        entityTypeId: 'learning',
        description: 'Learning phase — learning entities move through this stage'
      },
      {
        label: 'Decision',
        entityTypeId: 'decision',
        description: 'Decision phase — decision entities move through this stage'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'hypothesis',
            role: 'item'
          },
          {
            type: 'experiment_run',
            role: 'leaf'
          },
          {
            type: 'test_plan',
            role: 'item'
          },
          {
            type: 'evidence',
            role: 'item'
          },
          {
            type: 'learning',
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
      purpose: 'Use paired cards — a Test Card to plan the experiment (hypothesis, test, metric, criteria) and a Learning Card to capture the outcome — creating a complete experiment record.',
      core_question: 'Before we run this test, have we committed to what we expect to learn and what result would change our direction?',
      when_to_use: [
        'You have hypotheses about user needs or solutions that need testing',
        'You want to reduce risk before committing engineering resources',
        'The team is debating assumptions that can be tested empirically'
      ],
      when_not_to_use: [
        'The solution is already validated through real usage data',
        'Speed of shipping matters more than certainty about assumptions'
      ]
    }
  },
  {
    id: 'mvp-experiment-board',
    name: 'MVP Experiment Board',
    version: '1.0.0',
    description: 'Track MVP experiments across stages — from hypothesis through build, measure, and learn — in a single visual board.',
    category: 'validation',
    origin: {
      type: 'practitioner',
      attribution: 'Javelin',
      description: 'Javelin Experiment Board',
      url: 'https://www.javelin.com/',
      year: 2013,
      license: 'open_attribution',
    },
    tags: [
      'validation',
      'table'
    ],
    slots: [
      {
        label: 'Hypotheses',
        entityTypeId: 'hypothesis',
        description: 'Hypotheses — hypothesis entries to evaluate'
      },
      {
        label: 'MVP / Prototype',
        entityTypeId: 'prototype',
        description: 'MVP / Prototype — prototype entries to evaluate'
      },
      {
        label: 'Metrics',
        entityTypeId: 'metric',
        description: 'Metrics — metric entries to evaluate'
      },
      {
        label: 'Results',
        entityTypeId: 'evidence',
        description: 'Results — evidence entries to evaluate'
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
            type: 'hypothesis',
            role: 'item'
          },
          {
            type: 'prototype',
            role: 'item'
          },
          {
            type: 'metric',
            role: 'item'
          },
          {
            type: 'learning',
            role: 'item'
          },
          {
            type: 'evidence',
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
            label: 'Hypotheses',
            sortable: true
          },
          {
            property: 'title',
            label: 'MVP / Prototype',
            sortable: true
          },
          {
            property: 'title',
            label: 'Metrics',
            sortable: true
          },
          {
            property: 'description',
            label: 'Results',
          },
          {
            property: 'description',
            label: 'Learnings',
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
      purpose: 'Plan and track MVP experiments — from build to measure to learn — ensuring each MVP is designed as a learning vehicle rather than a mini-product.',
      core_question: 'Is our MVP designed to test our riskiest assumption with minimum effort, or are we building a scaled-down product instead of a learning experiment?',
      when_to_use: [
        'You have hypotheses about user needs or solutions that need testing',
        'You want to reduce risk before committing engineering resources',
        'The team is debating assumptions that can be tested empirically'
      ],
      when_not_to_use: [
        'The solution is already validated through real usage data',
        'Speed of shipping matters more than certainty about assumptions'
      ]
    }
  }
]
