/**
 * UPG Framework Definitions — Prioritization
 * 12 frameworks for the prioritization domain.
 */

import type { UPGFramework } from '../types.js'

export const PRIORITIZATION_FRAMEWORKS: UPGFramework[] = [
  {
    id: 'rice-scoring',
    approach_ids: ['prioritise'],
    name: 'RICE Scoring',
    version: '1.0.0',
    description: 'Score features and opportunities by Reach, Impact, Confidence, and Effort to produce a ranked priority list.',
    category: 'prioritization',
    origin: {
      type: 'practitioner',
      attribution: 'Intercom (Sean McBride)',
      description: 'Developed at Intercom as a way to quantify feature prioritisation. Published as a blog post that became an industry standard.',
      url: 'https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/',
      year: 2014,
      license: 'open_attribution',
    },
    tags: [
      'prioritization',
      'table'
    ],
    slots: [
      {
        label: 'Items to score',
        entityTypeId: 'feature',
        description: 'Features, opportunities, or solutions being evaluated'
      },
      {
        label: 'Reach',
        entityTypeId: 'feature',
        description: 'How many users does this affect per quarter?'
      },
      {
        label: 'Impact',
        entityTypeId: 'feature',
        description: 'How much does this move the target outcome?'
      },
      {
        label: 'Confidence',
        entityTypeId: 'feature',
        description: 'How sure are we about these estimates?'
      },
      {
        label: 'Effort',
        entityTypeId: 'feature',
        description: 'How many person-months to build?'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'feature',
            role: 'scored_item'
          }
        ],
      required_properties: {
        feature: [
          {
            property: 'reach',
            type: 'number',
            required: true,
            label: 'Reach',
            description: 'How many users will this impact per quarter?'
          },
          {
            property: 'impact',
            type: 'number',
            required: true,
            label: 'Impact',
            description: 'How much will this impact each user? (1=minimal, 2=low, 3=medium, 4=high, 5=massive)'
          },
          {
            property: 'confidence',
            type: 'number',
            required: true,
            label: 'Confidence',
            description: 'How confident are you in the estimates? (0.5=low, 0.8=medium, 1.0=high)'
          },
          {
            property: 'effort',
            type: 'number',
            required: true,
            label: 'Effort',
            description: 'Person-months of effort required'
          }
        ]
      },
      computed_properties: [
        {
          property: 'rice_score',
          expression: '(reach * impact * confidence) / effort',
          entity_type: 'feature',
          label: 'RICE Score',
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
            label: 'Items to score',
            sortable: true
          },
          {
            property: 'reach',
            label: 'Reach',
            sortable: true,
            format: 'number'
          },
          {
            property: 'impact',
            label: 'Impact',
            sortable: true,
            format: 'number'
          },
          {
            property: 'confidence',
            label: 'Confidence',
            sortable: true,
            format: 'number'
          },
          {
            property: 'effort',
            label: 'Effort',
            sortable: true,
            format: 'number'
          },
          {
            property: 'rice_score',
            label: 'RICE Score',
            sortable: true,
            format: 'score_pill'
          }
        ]
      },
      sort_by: {
        property: 'rice_score',
        direction: 'desc'
      },
      colour_by: 'score',
      card_fields: [
        'title',
        'description',
        'status'
      ]
    },
    education: {
      purpose: 'Quantify feature priority by scoring Reach, Impact, Confidence, and Effort so teams compare opportunities on the same scale instead of debating gut feelings.',
      core_question: 'Given limited engineering capacity, which features will deliver the most user value relative to the effort required?',
      when_to_use: [
        'You have more ideas or features than capacity to build them',
        'Stakeholders disagree on what to build next',
        'You need a transparent, defensible prioritisation process'
      ],
      when_not_to_use: [
        'You have a single obvious next step with no contention',
        'The backlog is small enough to sequence intuitively'
      ]
    }
  },
  {
    id: 'kano-model',
    approach_ids: ['prioritise'],
    name: 'Kano Model',
    version: '1.0.0',
    description: 'Classify features by how they affect user satisfaction: must-haves, performance features, and delighters.',
    category: 'prioritization',
    origin: {
      type: 'practitioner',
      attribution: 'Noriaki Kano',
      description: 'Created by Professor Noriaki Kano at Tokyo University of Science. Based on his theory of attractive quality.',
      url: 'https://en.wikipedia.org/wiki/Kano_model',
      year: 1984,
      license: 'public_domain',
    },
    tags: [
      'prioritization',
      'quadrant'
    ],
    slots: [
      {
        label: 'Must-haves',
        entityTypeId: 'feature',
        description: 'Expected features — absence causes dissatisfaction'
      },
      {
        label: 'Performance',
        entityTypeId: 'feature',
        description: 'More is better — linear satisfaction increase'
      },
      {
        label: 'Delighters',
        entityTypeId: 'feature',
        description: 'Unexpected features — presence creates delight'
      },
      {
        label: 'Indifferent',
        entityTypeId: 'feature',
        description: 'Features users don\'t care about either way'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'feature',
            role: 'item'
          }
        ],
      required_properties: {
        feature: [
          {
            property: 'functional_response',
            type: 'enum',
            required: true,
            label: 'Functional Response',
            description: 'How users feel when the feature IS present',
            enum_values: [
              'i_like_it',
              'i_expect_it',
              'i_am_neutral',
              'i_can_tolerate_it',
              'i_dislike_it'
            ]
          },
          {
            property: 'dysfunctional_response',
            type: 'enum',
            required: true,
            label: 'Dysfunctional Response',
            description: 'How users feel when the feature IS NOT present',
            enum_values: [
              'i_like_it',
              'i_expect_it',
              'i_am_neutral',
              'i_can_tolerate_it',
              'i_dislike_it'
            ]
          },
          {
            property: 'delighter_count',
            type: 'number',
            required: false,
            label: 'Delighter classifications',
            description: 'Count of survey responses classifying this feature as a delighter (attractive)'
          },
          {
            property: 'performance_count',
            type: 'number',
            required: false,
            label: 'Performance classifications',
            description: 'Count of survey responses classifying this feature as performance (one-dimensional)'
          },
          {
            property: 'must_be_count',
            type: 'number',
            required: false,
            label: 'Must-be classifications',
            description: 'Count of survey responses classifying this feature as must-be (basic)'
          },
          {
            property: 'indifferent_count',
            type: 'number',
            required: false,
            label: 'Indifferent classifications',
            description: 'Count of survey responses classifying this feature as indifferent'
          }
        ]
      },
      computed_properties: [
        {
          property: 'satisfaction_coefficient',
          expression: '(delighter_count + performance_count) / (delighter_count + performance_count + must_be_count + indifferent_count)',
          entity_type: 'feature',
          label: 'Satisfaction Coefficient',
          format: 'number'
        },
        {
          property: 'dissatisfaction_coefficient',
          expression: '(must_be_count + performance_count) / (delighter_count + performance_count + must_be_count + indifferent_count) * -1',
          entity_type: 'feature',
          label: 'Dissatisfaction Coefficient',
          format: 'number'
        }
      ]
    },
    structure: {
      pattern: 'matrix'
    },
    presentation: {
      layout: {
        type: 'matrix',
        rows: 5,
        cols: 5,
        template: 'kano-classification'
      },
      colour_by: 'group',
      card_fields: [
        'title',
        'description'
      ]
    },
    education: {
      purpose: 'Classify features by how they affect user satisfaction (must-haves vs delighters). Teams invest in the right category at the right time.',
      core_question: 'Which features prevent dissatisfaction, which increase satisfaction linearly, and which create unexpected delight?',
      when_to_use: [
        'You need to distinguish must-have features from delighters',
        'You want to identify features that drive satisfaction vs prevent dissatisfaction',
        'You are investing in differentiation and need to know which delighters move users'
      ],
      when_not_to_use: [
        'You cannot survey users for functional/dysfunctional responses',
        'The backlog is too early-stage for paired survey questions to be meaningful'
      ]
    }
  },
  {
    id: 'moscow',
    approach_ids: ['plan', 'prioritise'],
    name: 'MoSCoW',
    version: '1.0.0',
    description: 'Categorise requirements into Must have, Should have, Could have, and Won\'t have to clarify scope and priorities.',
    category: 'prioritization',
    origin: {
      type: 'practitioner',
      attribution: 'Dai Clegg (Oracle)',
      description: 'Created by Dai Clegg at Oracle as part of the DSDM Atern methodology for rapid application development.',
      year: 1994,
      license: 'open_attribution',
    },
    tags: [
      'prioritization',
      'table'
    ],
    slots: [
      {
        label: 'Must Have',
        entityTypeId: 'feature',
        description: 'Non-negotiable requirements for this release'
      },
      {
        label: 'Should Have',
        entityTypeId: 'feature',
        description: 'Important but not critical — workaround exists'
      },
      {
        label: 'Could Have',
        entityTypeId: 'feature',
        description: 'Nice to have — include if time permits'
      },
      {
        label: 'Won\'t Have',
        entityTypeId: 'feature',
        description: 'Explicitly out of scope for now'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'feature',
            role: 'scored_item'
          }
        ],
      required_properties: {},
      computed_properties: [
        {
          property: 'must_have_ratio',
          expression: 'must_count / total_count',
          entity_type: 'feature',
          label: 'Must-have Ratio',
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
            label: 'Must Have',
            sortable: true
          },
          {
            property: 'title',
            label: 'Should Have',
            sortable: true
          },
          {
            property: 'title',
            label: 'Could Have',
            sortable: true
          },
          {
            property: 'title',
            label: "Won't Have",
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
      purpose: 'Categorise requirements into Must, Should, Could, and Won\'t buckets so stakeholders agree on scope boundaries before development begins.',
      core_question: 'Which requirements are truly non-negotiable for this release, and which can be deferred without blocking the goal?',
      when_to_use: [
        'You have more ideas or features than capacity to build them',
        'Stakeholders disagree on what to build next',
        'You need a transparent, defensible prioritisation process'
      ],
      when_not_to_use: [
        'You have a single obvious next step with no contention',
        'The backlog is small enough to sequence intuitively'
      ]
    }
  },
  {
    id: 'weighted-scoring',
    approach_ids: ['prioritise'],
    name: 'Weighted Scoring',
    version: '1.0.0',
    description: 'Score features against multiple weighted criteria to produce a composite priority score. Reduces gut-feel bias.',
    category: 'prioritization',
    origin: {
      type: 'practitioner',
      description: 'Standard decision analysis technique widely used across product management and operations research.',
      license: 'cc_by',
    },
    tags: [
      'prioritization',
      'table'
    ],
    slots: [
      {
        label: 'Items to score',
        entityTypeId: 'feature',
        description: 'Features or initiatives being evaluated'
      },
      {
        label: 'Criteria',
        entityTypeId: 'metric',
        description: 'Dimensions to score against (impact, effort, risk)'
      },
      {
        label: 'Weights',
        entityTypeId: 'metric',
        description: 'Relative importance of each criterion'
      },
      {
        label: 'Target Outcome',
        entityTypeId: 'outcome',
        description: 'What outcome does this scoring serve?'
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
        },
        {
          type: 'outcome',
          role: 'root'
        }
      ],
      required_properties: {
        feature: [
          {
            property: 'benefit',
            type: 'number',
            required: true,
            label: 'Benefit',
            description: 'Expected benefit score (1-10)'
          },
          {
            property: 'benefit_weight',
            type: 'number',
            required: true,
            label: 'Benefit Weight',
            description: 'Weight for benefit (0-1)'
          },
          {
            property: 'cost',
            type: 'number',
            required: true,
            label: 'Cost',
            description: 'Expected cost score (1-10)'
          },
          {
            property: 'cost_weight',
            type: 'number',
            required: true,
            label: 'Cost Weight',
            description: 'Weight for cost (0-1)'
          },
          {
            property: 'risk',
            type: 'number',
            required: true,
            label: 'Risk',
            description: 'Risk score (1-10)'
          },
          {
            property: 'risk_weight',
            type: 'number',
            required: true,
            label: 'Risk Weight',
            description: 'Weight for risk (0-1)'
          }
        ]
      },
      computed_properties: [
        {
          property: 'weighted_score',
          expression: '(benefit * benefit_weight) + (cost * cost_weight) + (risk * risk_weight)',
          entity_type: 'feature',
          label: 'Weighted Score',
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
            label: 'Items to score',
            sortable: true
          },
          {
            property: 'benefit',
            label: 'Criteria',
            sortable: true
          },
          {
            property: 'benefit_weight',
            label: 'Weights',
            sortable: true
          },
          {
            property: 'weighted_score',
            label: 'Target Outcome',
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
      purpose: 'Evaluate items against multiple weighted criteria to produce a composite score, making multi-dimensional trade-offs explicit and debatable.',
      core_question: 'When we weight the criteria that matter to our strategy, which items score highest? Does the ranking match our intuition?',
      when_to_use: [
        'You have more ideas or features than capacity to build them',
        'Stakeholders disagree on what to build next',
        'You need a transparent, defensible prioritisation process'
      ],
      when_not_to_use: [
        'You have a single obvious next step with no contention',
        'The backlog is small enough to sequence intuitively'
      ]
    }
  },
  {
    id: 'value-vs-effort',
    approach_ids: ['prioritise'],
    name: 'Value vs Effort',
    version: '1.0.0',
    description: 'Plot features on a 2x2 matrix of value against effort. Quick wins (high value, low effort) get prioritised first.',
    category: 'prioritization',
    origin: {
      type: 'practitioner',
      description: 'Common product management prioritisation tool. A simplified form of cost-benefit analysis.',
      license: 'cc_by',
    },
    tags: [
      'prioritization',
      'quadrant'
    ],
    slots: [
      {
        label: 'Quick Wins',
        entityTypeId: 'feature',
        description: 'High value, low effort — do first'
      },
      {
        label: 'Big Bets',
        entityTypeId: 'feature',
        description: 'High value, high effort — plan carefully'
      },
      {
        label: 'Fill-ins',
        entityTypeId: 'feature',
        description: 'Low value, low effort — do when idle'
      },
      {
        label: 'Avoid',
        entityTypeId: 'feature',
        description: 'Low value, high effort — deprioritise'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'feature',
            role: 'item'
          }
        ],
      required_properties: {
        feature: [
          {
            property: 'value',
            type: 'number',
            required: true,
            label: 'Value',
            description: 'Expected business value (1-10)'
          },
          {
            property: 'effort',
            type: 'number',
            required: true,
            label: 'Effort',
            description: 'Implementation effort (1-10)'
          }
        ]
      },
      computed_properties: [
        {
          property: 'value_effort_ratio',
          expression: 'value / effort',
          entity_type: 'feature',
          label: 'Value/Effort Ratio',
          format: 'number'
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
        x_label: 'Quick Wins',
        y_label: 'Big Bets'
      },
      colour_by: 'group',
      card_fields: [
        'title',
        'description'
      ]
    },
    education: {
      purpose: 'Plot features on a value/effort matrix to identify quick wins (high value, low effort) and avoid resource traps (low value, high effort).',
      core_question: 'Which features give us the best return on engineering investment, and which are traps disguised as good ideas?',
      when_to_use: [
        'You have more ideas or features than capacity to build them',
        'Stakeholders disagree on what to build next',
        'You need a transparent, defensible prioritisation process'
      ],
      when_not_to_use: [
        'You have a single obvious next step with no contention',
        'The backlog is small enough to sequence intuitively'
      ]
    }
  },
  {
    id: 'ice-scoring',
    approach_ids: ['prioritise'],
    name: 'ICE Scoring',
    version: '1.0.0',
    description: 'Rate ideas by Impact, Confidence, and Ease on a 1-10 scale. Multiply for a composite score. Fast and lightweight.',
    category: 'prioritization',
    origin: {
      type: 'practitioner',
      attribution: 'Sean Ellis',
      description: 'Created by Sean Ellis as a lightweight growth experiment scoring method. Widely adopted in growth teams.',
      year: 2010,
      license: 'open_attribution',
    },
    tags: [
      'prioritization',
      'table'
    ],
    slots: [
      {
        label: 'Items to score',
        entityTypeId: 'feature',
        description: 'Features or experiments being evaluated'
      },
      {
        label: 'Impact',
        entityTypeId: 'outcome',
        description: 'How much will this move the needle?'
      },
      {
        label: 'Confidence',
        entityTypeId: 'assumption',
        description: 'How sure are we about the impact?'
      },
      {
        label: 'Ease',
        entityTypeId: 'feature',
        description: 'How easy is this to implement?'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'feature',
            role: 'scored_item'
          },
          {
            type: 'outcome',
            role: 'item'
          },
          {
            type: 'assumption',
            role: 'item'
          }
        ],
      required_properties: {
        feature: [
          {
            property: 'impact',
            type: 'number',
            required: true,
            label: 'Impact',
            description: 'Expected impact on the target metric (1-10)'
          },
          {
            property: 'confidence',
            type: 'number',
            required: true,
            label: 'Confidence',
            description: 'Confidence in the impact estimate (1-10)'
          },
          {
            property: 'ease',
            type: 'number',
            required: true,
            label: 'Ease',
            description: 'Ease of implementation (1-10)'
          }
        ]
      },
      computed_properties: [
        {
          property: 'ice_score',
          expression: 'impact * confidence * ease',
          entity_type: 'feature',
          label: 'ICE Score',
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
            label: 'Items to score',
            sortable: true
          },
          {
            property: 'impact',
            label: 'Impact',
            sortable: true
          },
          {
            property: 'confidence',
            label: 'Confidence',
            sortable: true
          },
          {
            property: 'ease',
            label: 'Ease',
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
      purpose: 'Provide a lightweight scoring model for early-stage ideas when detailed effort estimates are unavailable — faster than RICE, useful for brainstorm triage.',
      core_question: 'Which ideas should we investigate further based on their potential impact, confidence in our assumptions, and implementation ease?',
      when_to_use: [
        'You have more ideas or features than capacity to build them',
        'Stakeholders disagree on what to build next',
        'You need a transparent, defensible prioritisation process'
      ],
      when_not_to_use: [
        'You have a single obvious next step with no contention',
        'The backlog is small enough to sequence intuitively'
      ]
    }
  },
  {
    id: 'eisenhower-matrix',
    approach_ids: ['prioritise'],
    name: 'Eisenhower Matrix',
    version: '1.0.0',
    description: 'Classify tasks by urgency and importance into four quadrants: do, schedule, delegate, or eliminate.',
    category: 'prioritization',
    origin: {
      type: 'practitioner',
      attribution: 'Dwight D. Eisenhower',
      description: 'Based on a quote attributed to Eisenhower: \'What is important is seldom urgent and what is urgent is seldom important.\' Popularised by Stephen Covey.',
      license: 'public_domain',
    },
    tags: [
      'prioritization',
      'quadrant'
    ],
    slots: [
      {
        label: 'Do First',
        entityTypeId: 'feature',
        description: 'Urgent and important — act immediately'
      },
      {
        label: 'Schedule',
        entityTypeId: 'feature',
        description: 'Important but not urgent — plan it'
      },
      {
        label: 'Delegate',
        entityTypeId: 'feature',
        description: 'Urgent but not important — hand off'
      },
      {
        label: 'Eliminate',
        entityTypeId: 'feature',
        description: 'Neither urgent nor important — drop it'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'feature',
            role: 'item'
          }
        ],
      required_properties: {
        feature: [
          {
            property: 'urgency',
            type: 'number',
            required: true,
            label: 'Urgency',
            description: 'How time-sensitive is this? (1-5)'
          },
          {
            property: 'importance',
            type: 'number',
            required: true,
            label: 'Importance',
            description: 'How important is this to goals? (1-5)'
          }
        ]
      },
      computed_properties: [
        {
          property: 'priority_score',
          expression: '(urgency * 2) + importance',
          entity_type: 'feature',
          label: 'Priority Score',
          format: 'number'
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
        x_label: 'Do First',
        y_label: 'Schedule'
      },
      colour_by: 'group',
      card_fields: [
        'title',
        'description'
      ]
    },
    education: {
      purpose: 'Sort tasks by urgency and importance into four quadrants, making it clear what to do now, schedule, delegate, or eliminate.',
      core_question: 'Am I spending my time on what matters most, or am I trapped in the urgent-but-unimportant quadrant?',
      when_to_use: [
        'You have more ideas or features than capacity to build them',
        'Stakeholders disagree on what to build next',
        'You need a transparent, defensible prioritisation process'
      ],
      when_not_to_use: [
        'You have a single obvious next step with no contention',
        'The backlog is small enough to sequence intuitively'
      ]
    }
  },
  {
    id: 'cost-of-delay',
    approach_ids: ['prioritise'],
    name: 'Cost of Delay',
    version: '1.0.0',
    description: 'Quantify the economic cost of not shipping a feature to drive priority decisions. Combines urgency with value.',
    category: 'prioritization',
    origin: {
      type: 'practitioner',
      attribution: 'Don Reinertsen',
      description: 'Formalised in The Principles of Product Development Flow (Celeritas Publishing). Foundational to lean product economics.',
      year: 2009,
      license: 'public_domain',
    },
    tags: [
      'prioritization',
      'table'
    ],
    slots: [
      {
        label: 'Items to evaluate',
        entityTypeId: 'feature',
        description: 'Features or initiatives being assessed'
      },
      {
        label: 'User-Business Value',
        entityTypeId: 'outcome',
        description: 'Revenue, retention, or strategic value'
      },
      {
        label: 'Time Criticality',
        entityTypeId: 'metric',
        description: 'How much value decays with delay'
      },
      {
        label: 'Risk Reduction',
        entityTypeId: 'risk',
        description: 'What risk does this mitigate?'
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
          },
          {
            type: 'outcome',
            role: 'item'
          },
          {
            type: 'risk',
            role: 'item'
          }
        ],
      required_properties: {
        feature: [
          {
            property: 'cost_of_delay',
            type: 'number',
            required: true,
            label: 'Cost of Delay',
            description: 'Weekly revenue impact of not shipping'
          },
          {
            property: 'job_size',
            type: 'number',
            required: true,
            label: 'Job Size',
            description: 'Weeks of development effort'
          }
        ]
      },
      computed_properties: [
        {
          property: 'wsjf_score',
          expression: 'cost_of_delay / job_size',
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
            label: 'Items to evaluate',
            sortable: true
          },
          {
            property: 'cost_of_delay',
            label: 'User-Business Value',
            sortable: true
          },
          {
            property: 'job_size',
            label: 'Job Size',
            sortable: true
          },
          {
            property: 'wsjf_score',
            label: 'CoD Score',
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
      purpose: 'Quantify the economic impact of not delivering a feature by a given date, making urgency visible and enabling time-sensitive prioritisation.',
      core_question: 'How much value are we losing every week this feature is not in production, and does that urgency justify fast-tracking it?',
      when_to_use: [
        'You have more ideas or features than capacity to build them',
        'Stakeholders disagree on what to build next',
        'You need a transparent, defensible prioritisation process'
      ],
      when_not_to_use: [
        'You have a single obvious next step with no contention',
        'The backlog is small enough to sequence intuitively'
      ]
    }
  },
  {
    id: 'buy-a-feature',
    approach_ids: ['prioritise'],
    name: 'Buy-a-Feature',
    version: '1.0.0',
    description: 'Give stakeholders a budget and let them allocate it across features. Reveals true priorities through trade-off behaviour.',
    category: 'prioritization',
    origin: {
      type: 'practitioner',
      attribution: 'Luke Hohmann',
      description: 'Published in Innovation Games (Addison-Wesley). A collaborative game that surfaces hidden stakeholder priorities.',
      year: 2006,
      license: 'published_methodology',
    },
    tags: [
      'prioritization',
      'collection'
    ],
    slots: [
      {
        label: 'Feature List',
        entityTypeId: 'feature',
        description: 'Features available for purchase'
      },
      {
        label: 'Participants',
        entityTypeId: 'stakeholder',
        description: 'Stakeholders or customers allocating budget'
      },
      {
        label: 'Budget Allocation',
        entityTypeId: 'metric',
        description: 'How much each participant spent on each feature'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'feature',
            role: 'item'
          },
          {
            type: 'stakeholder',
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
          property: 'feature_value',
          expression: 'total_investment / price',
          entity_type: 'feature',
          label: 'Investment Ratio',
          format: 'number'
        }
      ]
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
      purpose: 'Give stakeholders or customers a fixed budget of play money to \"buy\" features, revealing true priorities through trade-off behaviour rather than wish-list voting.',
      core_question: 'When stakeholders must trade off features against each other with a fixed budget, which features do they consistently fund?',
      when_to_use: [
        'You have more ideas or features than capacity to build them',
        'Stakeholders disagree on what to build next',
        'You need a transparent, defensible prioritisation process'
      ],
      when_not_to_use: [
        'You have a single obvious next step with no contention',
        'The backlog is small enough to sequence intuitively'
      ]
    }
  },
  {
    id: 'opportunity-scoring',
    approach_ids: ['prioritise'],
    name: 'Opportunity Scoring',
    version: '1.0.0',
    description: 'Score opportunities by importance and current satisfaction. High importance + low satisfaction = best opportunities.',
    category: 'prioritization',
    origin: {
      type: 'practitioner',
      attribution: 'Anthony Ulwick (ODI)',
      description: 'Core to Outcome-Driven Innovation (ODI). Published in What Customers Want (McGraw-Hill). Maps underserved outcomes.',
      url: 'https://strategyn.com/outcome-driven-innovation-process/',
      year: 2005,
      license: 'published_methodology',
    },
    tags: [
      'prioritization',
      'table'
    ],
    slots: [
      {
        label: 'Opportunities',
        entityTypeId: 'opportunity',
        description: 'Jobs or outcomes being evaluated'
      },
      {
        label: 'Importance',
        entityTypeId: 'metric',
        description: 'How important is this to the user?'
      },
      {
        label: 'Satisfaction',
        entityTypeId: 'metric',
        description: 'How well is this currently served?'
      },
      {
        label: 'Opportunity Score',
        entityTypeId: 'metric',
        description: 'Importance + (Importance - Satisfaction)'
      },
      {
        label: 'Scored Outcomes',
        entityTypeId: 'outcome',
        description: 'Outcomes scored by the opportunity formula (Importance + Importance − Satisfaction)'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'opportunity',
            role: 'item'
          },
          {
            type: 'metric',
            role: 'item'
          },
          {
            type: 'outcome',
            role: 'scored_item'
          }
        ],
      required_properties: {},
      computed_properties: [
        {
          property: 'opportunity_score',
          expression: 'importance + (importance - satisfaction)',
          entity_type: 'outcome',
          label: 'Opportunity Score',
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
            label: 'Opportunity',
            sortable: true
          },
          {
            property: 'importance',
            label: 'Importance',
            sortable: true
          },
          {
            property: 'satisfaction',
            label: 'Satisfaction',
            sortable: true
          },
          {
            property: 'opportunity_score',
            label: 'Opportunity Score',
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
      purpose: 'Score customer opportunities by the gap between importance and satisfaction — high importance, low satisfaction gaps reveal the biggest unmet needs.',
      core_question: 'Which customer needs are most important yet least well-satisfied — where is the biggest opportunity gap?',
      when_to_use: [
        'You have more ideas or features than capacity to build them',
        'Stakeholders disagree on what to build next',
        'You need a transparent, defensible prioritisation process'
      ],
      when_not_to_use: [
        'You have a single obvious next step with no contention',
        'The backlog is small enough to sequence intuitively'
      ]
    }
  },
  {
    id: 'stack-ranking',
    approach_ids: ['prioritise'],
    name: 'Stack Ranking',
    version: '1.0.0',
    description: 'Force a strict 1-N priority order across all items. No ties allowed. Clarifies what truly matters most.',
    category: 'prioritization',
    origin: {
      type: 'practitioner',
      description: 'Common prioritisation practice in product organisations. Forces explicit trade-offs by disallowing ties.',
      license: 'cc_by',
    },
    tags: [
      'prioritization',
      'table'
    ],
    slots: [
      {
        label: 'Rank',
        entityTypeId: 'metric',
        description: 'Position in the priority stack'
      },
      {
        label: 'Item',
        entityTypeId: 'feature',
        description: 'Feature or initiative being ranked'
      },
      {
        label: 'Rationale',
        entityTypeId: 'decision',
        description: 'Why this item ranks where it does'
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
          },
          {
            type: 'decision',
            role: 'item'
          }
        ],
      required_properties: {},
      computed_properties: [
        {
          property: 'rank_position',
          expression: 'rank',
          entity_type: 'feature',
          label: 'Stack Rank',
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
            property: 'rank_position',
            label: 'Rank',
            sortable: true
          },
          {
            property: 'title',
            label: 'Item',
            sortable: true
          },
          {
            property: 'description',
            label: 'Rationale',
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
      purpose: 'Force-rank items into a single ordered list — no ties allowed — to make relative priority completely explicit and eliminate the \"everything is P1\" problem.',
      core_question: 'If we could only do one more thing, what would it be — and then what next?',
      when_to_use: [
        'You have more ideas or features than capacity to build them',
        'Stakeholders disagree on what to build next',
        'You need a transparent, defensible prioritisation process'
      ],
      when_not_to_use: [
        'You have a single obvious next step with no contention',
        'The backlog is small enough to sequence intuitively'
      ]
    }
  },
  {
    id: 'story-points-poker',
    name: 'Story Points Poker',
    version: '1.0.0',
    description: 'Team members simultaneously estimate story complexity using numbered cards. Discussion resolves divergence.',
    category: 'prioritization',
    origin: {
      type: 'practitioner',
      attribution: 'Mike Cohn',
      description: 'Popularised in Agile Estimating and Planning (Prentice Hall). Based on Wideband Delphi estimation technique.',
      year: 2005,
      license: 'cc_by',
    },
    tags: [
      'prioritization',
      'collection'
    ],
    slots: [
      {
        label: 'Stories',
        entityTypeId: 'story_statement',
        description: 'Stories or tasks being estimated'
      },
      {
        label: 'Estimates',
        entityTypeId: 'story_statement',
        description: 'Point values from each team member'
      },
      {
        label: 'Consensus',
        entityTypeId: 'story_statement',
        description: 'Final agreed estimate after discussion'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'story_statement',
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
      purpose: 'Estimate effort collaboratively by having each team member independently reveal their estimate simultaneously, using the disagreements to surface hidden assumptions.',
      core_question: 'How complex is this story, and where do team members disagree about the effort — what hidden assumptions explain the gap?',
      when_to_use: [
        'You have more ideas or features than capacity to build them',
        'Stakeholders disagree on what to build next',
        'You need a transparent, defensible prioritisation process'
      ],
      when_not_to_use: [
        'You have a single obvious next step with no contention',
        'The backlog is small enough to sequence intuitively'
      ]
    }
  }
]
