/**
 * UPG Framework Definitions — Strategy
 * 15 frameworks for the strategy domain.
 */

import type { UPGFramework } from '../types.js'

export const STRATEGY_FRAMEWORKS: UPGFramework[] = [
  {
    id: 'swot-analysis',
    name: 'SWOT Analysis',
    version: '1.0.0',
    description: 'Map Strengths, Weaknesses, Opportunities, and Threats in a 2x2 grid. Internal vs external, helpful vs harmful.',
    category: 'strategy',
    origin: {
      type: 'practitioner',
      description: 'Widely attributed to Albert Humphrey at Stanford Research Institute. One of the most commonly used strategy frameworks.',
      license: 'public_domain',
    },
    tags: [
      'strategy',
      'matrix'
    ],
    slots: [
      {
        label: 'Strengths',
        entityTypeId: 'capability',
        description: 'Internal advantages and core competencies'
      },
      {
        label: 'Weaknesses',
        entityTypeId: 'need',
        description: 'Internal limitations and gaps'
      },
      {
        label: 'Opportunities',
        entityTypeId: 'opportunity',
        description: 'External trends and openings'
      },
      {
        label: 'Threats',
        entityTypeId: 'competitor',
        description: 'External risks and competitive pressures'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'capability',
          role: 'bucket'
        },
        {
          type: 'need',
          role: 'bucket'
        },
        {
          type: 'opportunity',
          role: 'bucket'
        },
        {
          type: 'competitor',
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
      purpose: 'Map internal strengths and weaknesses against external opportunities and threats so teams can align strategy with reality.',
      core_question: 'What are our strongest advantages, biggest vulnerabilities, untapped opportunities, and most serious threats?',
      when_to_use: [
        'You need to align the team on long-term direction',
        'Market conditions are shifting and you need to reassess positioning',
        'Leadership needs a structured view of strategic options'
      ],
      when_not_to_use: [
        'You are in pure execution mode with a clear strategy already set',
        'The team is too early-stage to commit to strategic constraints'
      ]
    }
  },
  {
    id: 'porter-five-forces',
    name: 'Porter Five Forces',
    version: '1.0.0',
    description: 'Analyse industry competitiveness through five forces: rivalry, new entrants, substitutes, buyer power, and supplier power.',
    category: 'strategy',
    origin: {
      type: 'practitioner',
      attribution: 'Michael Porter',
      description: 'Published in Competitive Strategy (Free Press). The foundational framework for industry analysis.',
      year: 1979,
      license: 'public_domain',
    },
    tags: [
      'strategy',
      'collection'
    ],
    slots: [
      {
        label: 'Competitive Rivalry',
        entityTypeId: 'competitor',
        description: 'Intensity of competition among existing players'
      },
      {
        label: 'Threat of New Entrants',
        entityTypeId: 'competitor',
        description: 'How easy is it for new competitors to enter?'
      },
      {
        label: 'Threat of Substitutes',
        entityTypeId: 'competitor',
        description: 'Can customers switch to alternatives?'
      },
      {
        label: 'Buyer Power',
        entityTypeId: 'persona',
        description: 'How much leverage do buyers have?'
      },
      {
        label: 'Supplier Power',
        entityTypeId: 'persona',
        description: 'How much leverage do suppliers have?'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'competitor',
            role: 'item'
          },
          {
            type: 'persona',
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
      purpose: 'Analyse the competitive dynamics of an industry through five structural forces that determine profitability, revealing where power lies and where threats emerge.',
      core_question: 'What structural forces shape competition in our industry, and how do they affect our ability to capture value?',
      when_to_use: [
        'You need to align the team on long-term direction',
        'Market conditions are shifting and you need to reassess positioning',
        'Leadership needs a structured view of strategic options'
      ],
      when_not_to_use: [
        'You are in pure execution mode with a clear strategy already set',
        'The team is too early-stage to commit to strategic constraints'
      ]
    }
  },
  {
    id: 'blue-ocean-strategy',
    name: 'Blue Ocean Strategy',
    version: '1.0.0',
    description: 'Create uncontested market space by eliminating, reducing, raising, and creating factors across your value curve.',
    category: 'strategy',
    origin: {
      type: 'practitioner',
      attribution: 'W. Chan Kim & Renée Mauborgne',
      description: 'Published in Blue Ocean Strategy (Harvard Business Review Press). Challenges the traditional competitive strategy paradigm.',
      year: 2005,
      license: 'published_methodology',
    },
    tags: [
      'strategy',
      'matrix'
    ],
    slots: [
      {
        label: 'Eliminate',
        entityTypeId: 'feature',
        description: 'Which factors should be eliminated entirely?'
      },
      {
        label: 'Reduce',
        entityTypeId: 'feature',
        description: 'Which factors should be reduced well below industry standard?'
      },
      {
        label: 'Raise',
        entityTypeId: 'capability',
        description: 'Which factors should be raised well above industry standard?'
      },
      {
        label: 'Create',
        entityTypeId: 'value_proposition',
        description: 'Which factors should be created that the industry has never offered?'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'feature',
          role: 'bucket'
        },
        {
          type: 'value_proposition',
          role: 'bucket'
        },
        {
          type: 'capability',
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
      purpose: 'Escape crowded markets by simultaneously pursuing differentiation and low cost, creating uncontested market space where competition is irrelevant.',
      core_question: 'What factors can we eliminate, reduce, raise, or create to break the value-cost trade-off and open new market space?',
      when_to_use: [
        'You need to align the team on long-term direction',
        'Market conditions are shifting and you need to reassess positioning',
        'Leadership needs a structured view of strategic options'
      ],
      when_not_to_use: [
        'You are in pure execution mode with a clear strategy already set',
        'The team is too early-stage to commit to strategic constraints'
      ]
    }
  },
  {
    id: 'wardley-map',
    approach_ids: ['plan'],
    name: 'Wardley Map',
    version: '1.0.0',
    description: 'Map your value chain on axes of visibility (to user) and evolution (genesis → custom → product → commodity). Reveals strategic moves.',
    category: 'strategy',
    origin: {
      type: 'practitioner',
      attribution: 'Simon Wardley',
      description: 'Developed by Simon Wardley. A situational awareness tool for strategy based on value chain evolution.',
      url: 'https://learnwardleymapping.com/',
      year: 2005,
      license: 'published_methodology',
    },
    tags: [
      'strategy',
      'quadrant'
    ],
    slots: [
      {
        label: 'User Need',
        entityTypeId: 'need',
        description: 'The anchor — what the user actually needs'
      },
      {
        label: 'Value Chain',
        entityTypeId: 'capability',
        description: 'Components that fulfill the user need'
      },
      {
        label: 'Evolution Stage',
        entityTypeId: 'feature',
        description: 'Where each component sits on the evolution axis'
      },
      {
        label: 'Movement',
        entityTypeId: 'competitor',
        description: 'How components are evolving over time'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'capability',
            role: 'item'
          },
          {
            type: 'feature',
            role: 'item'
          },
          {
            type: 'competitor',
            role: 'item'
          },
          {
            type: 'need',
            role: 'item'
          }
        ],
      required_properties: {
        capability: [
          {
            property: 'evolution_stage',
            type: 'enum',
            required: true,
            label: 'Evolution Stage',
            description: 'Where this component sits on the evolution axis',
            enum_values: ['genesis', 'custom', 'product', 'commodity']
          },
          {
            property: 'visibility',
            type: 'number',
            required: true,
            label: 'Visibility',
            description: 'Y-axis position (0=infrastructure, 1=anchor/user)'
          }
        ],
        feature: [
          {
            property: 'evolution_stage',
            type: 'enum',
            required: true,
            label: 'Evolution Stage',
            description: 'Where this component sits on the evolution axis',
            enum_values: ['genesis', 'custom', 'product', 'commodity']
          },
          {
            property: 'visibility',
            type: 'number',
            required: true,
            label: 'Visibility',
            description: 'Y-axis position (0=infrastructure, 1=anchor/user)'
          }
        ],
        competitor: [
          {
            property: 'evolution_stage',
            type: 'enum',
            required: true,
            label: 'Evolution Stage',
            description: 'Where this component sits on the evolution axis',
            enum_values: ['genesis', 'custom', 'product', 'commodity']
          },
          {
            property: 'visibility',
            type: 'number',
            required: true,
            label: 'Visibility',
            description: 'Y-axis position (0=infrastructure, 1=anchor/user)'
          }
        ],
        need: [
          {
            property: 'evolution_stage',
            type: 'enum',
            required: true,
            label: 'Evolution Stage',
            description: 'Where this component sits on the evolution axis (need anchor is usually at "product" or "commodity")',
            enum_values: ['genesis', 'custom', 'product', 'commodity']
          },
          {
            property: 'visibility',
            type: 'number',
            required: true,
            label: 'Visibility',
            description: 'Y-axis position (0=infrastructure, 1=anchor/user — needs sit at 1.0)'
          }
        ]
      }
    },
    structure: {
      pattern: 'quadrant'
    },
    presentation: {
      layout: {
        type: 'quadrant',
        x_axis: 'evolution_stage',
        y_axis: 'visibility',
        x_label: 'Evolution (Genesis → Commodity)',
        y_label: 'Visibility (Invisible → Anchor)'
      },
      colour_by: 'status',
      card_fields: [
        'title',
        'description',
        'status'
      ]
    },
    education: {
      purpose: 'Visualise the value chain from user need to underlying components, positioning each by evolution stage to reveal strategic moves competitors cannot see.',
      core_question: 'Where is each component in our value chain on the evolution axis, and what strategic moves does that positioning reveal?',
      when_to_use: [
        'You need to align the team on long-term direction',
        'Market conditions are shifting and you need to reassess positioning',
        'Leadership needs a structured view of strategic options'
      ],
      when_not_to_use: [
        'You are in pure execution mode with a clear strategy already set',
        'The team is too early-stage to commit to strategic constraints'
      ]
    }
  },
  {
    id: 'strategic-cascade',
    approach_ids: ['plan', 'trace'],
    name: 'Strategic Cascade',
    version: '1.0.0',
    description: 'Cascade from Vision through Mission, Strategic Objectives, and Key Results. Ensures alignment from top-level purpose to measurable outcomes.',
    category: 'strategy',
    origin: {
      type: 'practitioner',
      description: 'Internal UPG framework. Cascades strategic intent from vision to measurable key results.',
      license: 'cc_by',
    },
    tags: [
      'strategy',
      'tree'
    ],
    slots: [
      {
        label: 'Vision',
        entityTypeId: 'vision',
        description: 'Long-term aspirational destination'
      },
      {
        label: 'Mission',
        entityTypeId: 'mission',
        description: 'How you will pursue the vision'
      },
      {
        label: 'Strategic Objectives',
        entityTypeId: 'objective',
        description: 'Multi-year goals that advance the mission'
      },
      {
        label: 'Key Results',
        entityTypeId: 'key_result',
        description: 'Measurable outcomes under each objective'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'objective',
            role: 'item'
          },
          {
            type: 'key_result',
            role: 'item'
          },
          {
            type: 'vision',
            role: 'item'
          },
          {
            type: 'mission',
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
      purpose: 'Connect mission, vision, values, strategic priorities, objectives, and initiatives into a single traceable hierarchy so everyone sees how daily work serves the big picture.',
      core_question: 'Can every team trace their current work back through objectives and priorities to the organisation\'s mission?',
      when_to_use: [
        'You need to align the team on long-term direction',
        'Market conditions are shifting and you need to reassess positioning',
        'Leadership needs a structured view of strategic options'
      ],
      when_not_to_use: [
        'You are in pure execution mode with a clear strategy already set',
        'The team is too early-stage to commit to strategic constraints'
      ]
    }
  },
  {
    id: 'jobs-to-be-done-canvas',
    name: 'Jobs-to-be-Done Canvas',
    version: '1.0.0',
    description: 'Map the functional, emotional, and social dimensions of a job, plus the gains sought and pains experienced.',
    category: 'strategy',
    origin: {
      type: 'practitioner',
      attribution: 'Clayton Christensen',
      description: 'Based on Jobs-to-be-Done theory. Published in The Innovator\'s Solution (Harvard Business Review Press).',
      year: 2003,
      license: 'published_methodology',
    },
    tags: [
      'strategy',
      'matrix'
    ],
    slots: [
      {
        label: 'Core Job',
        entityTypeId: 'job',
        description: 'The functional job the customer is trying to do'
      },
      {
        label: 'Emotional Job',
        entityTypeId: 'job',
        description: 'How the customer wants to feel'
      },
      {
        label: 'Pains',
        entityTypeId: 'need',
        description: 'Frustrations and obstacles in completing the job'
      },
      {
        label: 'Desired Outcomes',
        entityTypeId: 'outcome',
        description: 'What success looks like for the customer'
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
          type: 'outcome',
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
      purpose: 'Decompose a customer job into functional, emotional, and social dimensions so product teams build for the real outcome customers are hiring the product to achieve.',
      core_question: 'What job is the customer hiring our product to do, and what functional, emotional, and social outcomes define success?',
      when_to_use: [
        'You need to align the team on long-term direction',
        'Market conditions are shifting and you need to reassess positioning',
        'Leadership needs a structured view of strategic options'
      ],
      when_not_to_use: [
        'You are in pure execution mode with a clear strategy already set',
        'The team is too early-stage to commit to strategic constraints'
      ]
    }
  },
  {
    id: 'okr-framework',
    approach_ids: ['plan'],
    name: 'OKR Framework',
    version: '1.0.0',
    description: 'Set ambitious Objectives and measure progress with Key Results. Cascades from company to team to individual.',
    category: 'strategy',
    origin: {
      type: 'practitioner',
      attribution: 'Andy Grove / John Doerr',
      description: 'Invented by Andy Grove at Intel, popularised by John Doerr in Measure What Matters (Portfolio/Penguin).',
      url: 'https://www.whatmatters.com/',
      year: 1999,
      license: 'open_attribution',
    },
    tags: [
      'strategy',
      'tree'
    ],
    slots: [
      {
        label: 'Objective',
        entityTypeId: 'objective',
        description: 'Qualitative, inspiring goal'
      },
      {
        label: 'Key Result 1',
        entityTypeId: 'key_result',
        description: 'Measurable outcome proving progress'
      },
      {
        label: 'Key Result 2',
        entityTypeId: 'key_result',
        description: 'Measurable outcome proving progress'
      },
      {
        label: 'Initiatives',
        entityTypeId: 'initiative',
        description: 'Work streams that drive key results'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'objective',
            role: 'item'
          },
          {
            type: 'key_result',
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
      purpose: 'Align teams around measurable outcomes by pairing ambitious Objectives with concrete Key Results, creating focus and accountability at every level.',
      core_question: 'What must we achieve this quarter, and how will we know we succeeded?',
      when_to_use: [
        'You need to align the team on long-term direction',
        'Market conditions are shifting and you need to reassess positioning',
        'Leadership needs a structured view of strategic options'
      ],
      when_not_to_use: [
        'You are in pure execution mode with a clear strategy already set',
        'The team is too early-stage to commit to strategic constraints'
      ]
    }
  },
  {
    id: 'mckinsey-7s',
    name: 'McKinsey 7S Framework',
    version: '1.0.0',
    description: 'Analyse seven interrelated elements (Strategy, Structure, Systems, Shared Values, Skills, Style, Staff) to ensure organisational alignment.',
    category: 'strategy',
    origin: {
      type: 'practitioner',
      attribution: 'Tom Peters & Robert Waterman',
      description: 'In Search of Excellence',
      url: 'https://en.wikipedia.org/wiki/McKinsey_7S_Framework',
      year: 1980,
      license: 'public_domain',
    },
    tags: [
      'strategy',
      'collection'
    ],
    slots: [
      {
        label: 'Strategy',
        entityTypeId: 'strategic_theme',
        description: 'Strategy — group of strategic theme entities'
      },
      {
        label: 'Structure',
        entityTypeId: 'value_stream',
        description: 'Structure — group of value stream entities'
      },
      {
        label: 'Systems',
        entityTypeId: 'capability',
        description: 'Systems — group of capability entities'
      },
      {
        label: 'Shared Values',
        entityTypeId: 'vision',
        description: 'Shared Values — group of vision entities'
      },
      {
        label: 'Skills',
        entityTypeId: 'capability',
        description: 'Skills — group of capability entities'
      },
      {
        label: 'Style',
        entityTypeId: 'decision',
        description: 'Style — group of decision entities'
      },
      {
        label: 'Staff',
        entityTypeId: 'role',
        description: 'Staff — group of role entities'
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
            type: 'value_stream',
            role: 'item'
          },
          {
            type: 'role',
            role: 'item'
          },
          {
            type: 'decision',
            role: 'item'
          },
          {
            type: 'vision',
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
      purpose: 'Diagnose organisational alignment across seven interdependent elements (Strategy, Structure, Systems, Shared Values, Skills, Style, Staff). Find the root cause of execution failures.',
      core_question: 'Which of the seven organisational elements are misaligned, and what cascading effects is that misalignment causing?',
      when_to_use: [
        'You need to align the team on long-term direction',
        'Market conditions are shifting and you need to reassess positioning',
        'Leadership needs a structured view of strategic options'
      ],
      when_not_to_use: [
        'You are in pure execution mode with a clear strategy already set',
        'The team is too early-stage to commit to strategic constraints'
      ]
    }
  },
  {
    id: 'balanced-scorecard',
    name: 'Balanced Scorecard',
    version: '1.0.0',
    description: 'Translate strategy into measurable objectives across four perspectives: Financial, Customer, Internal Process, and Learning & Growth.',
    category: 'strategy',
    origin: {
      type: 'practitioner',
      attribution: 'Kaplan & Norton',
      description: 'The Balanced Scorecard',
      url: 'https://en.wikipedia.org/wiki/Balanced_scorecard',
      year: 1992,
      license: 'public_domain',
    },
    tags: [
      'strategy',
      'matrix'
    ],
    slots: [
      {
        label: 'Financial',
        entityTypeId: 'metric',
        description: 'Place metric entities in the Financial position of the matrix'
      },
      {
        label: 'Customer',
        entityTypeId: 'outcome',
        description: 'Place outcome entities in the Customer position of the matrix'
      },
      {
        label: 'Internal Process',
        entityTypeId: 'objective',
        description: 'Place objective entities in the Internal Process position of the matrix'
      },
      {
        label: 'Learning & Growth',
        entityTypeId: 'capability',
        description: 'Place capability entities in the Learning & Growth position of the matrix'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'objective',
            role: 'bucket'
          },
          {
            type: 'metric',
            role: 'bucket'
          },
          {
            type: 'outcome',
            role: 'bucket'
          },
          {
            type: 'capability',
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
      purpose: 'Translate strategy into measurable objectives across four perspectives (Financial, Customer, Internal Process, Learning & Growth). Execution stays aligned with vision.',
      core_question: 'Are we executing our strategy effectively across financial results, customer outcomes, internal processes, and organisational learning?',
      when_to_use: [
        'You need to align the team on long-term direction',
        'Market conditions are shifting and you need to reassess positioning',
        'Leadership needs a structured view of strategic options'
      ],
      when_not_to_use: [
        'You are in pure execution mode with a clear strategy already set',
        'The team is too early-stage to commit to strategic constraints'
      ]
    }
  },
  {
    id: 'pestel-analysis',
    name: 'PESTEL Analysis',
    version: '1.0.0',
    description: 'Scan the macro-environment across six dimensions (Political, Economic, Social, Technological, Environmental, Legal) to identify external forces shaping strategy.',
    category: 'strategy',
    origin: {
      type: 'practitioner',
      attribution: 'Francis Aguilar',
      description: 'Scanning the Business Environment',
      url: 'https://en.wikipedia.org/wiki/PEST_analysis',
      year: 1967,
      license: 'public_domain',
    },
    tags: [
      'strategy',
      'collection'
    ],
    slots: [
      {
        label: 'Political',
        entityTypeId: 'market_trend',
        description: 'Political — group of market trend entities'
      },
      {
        label: 'Economic',
        entityTypeId: 'market_trend',
        description: 'Economic — group of market trend entities'
      },
      {
        label: 'Social',
        entityTypeId: 'market_trend',
        description: 'Social — group of market trend entities'
      },
      {
        label: 'Technological',
        entityTypeId: 'market_trend',
        description: 'Technological — group of market trend entities'
      },
      {
        label: 'Environmental',
        entityTypeId: 'risk',
        description: 'Environmental — group of risk entities'
      },
      {
        label: 'Legal',
        entityTypeId: 'compliance_requirement',
        description: 'Legal — group of compliance requirement entities'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'market_trend',
            role: 'item'
          },
          {
            type: 'risk',
            role: 'item'
          },
          {
            type: 'compliance_requirement',
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
      purpose: 'Scan the macro-environment across six dimensions (Political, Economic, Social, Technological, Environmental, Legal). Spot forces that will reshape the competitive landscape.',
      core_question: 'Which external forces beyond our control are most likely to disrupt our industry, and how should we prepare?',
      when_to_use: [
        'You need to align the team on long-term direction',
        'Market conditions are shifting and you need to reassess positioning',
        'Leadership needs a structured view of strategic options'
      ],
      when_not_to_use: [
        'You are in pure execution mode with a clear strategy already set',
        'The team is too early-stage to commit to strategic constraints'
      ]
    }
  },
  {
    id: 'value-chain-analysis',
    approach_ids: ['trace'],
    name: 'Value Chain Analysis',
    version: '1.0.0',
    description: 'Map primary and support activities to understand where value is created and where costs can be optimised across the organisation.',
    category: 'strategy',
    origin: {
      type: 'practitioner',
      attribution: 'Michael Porter',
      description: 'Competitive Advantage',
      url: 'https://en.wikipedia.org/wiki/Value_chain',
      year: 1985,
      license: 'public_domain',
    },
    tags: [
      'strategy',
      'flow'
    ],
    slots: [
      {
        label: 'Inbound Logistics',
        entityTypeId: 'key_activity',
        description: 'Inbound Logistics phase — key activity entities move through this stage'
      },
      {
        label: 'Operations',
        entityTypeId: 'key_activity',
        description: 'Operations phase — key activity entities move through this stage'
      },
      {
        label: 'Outbound Logistics',
        entityTypeId: 'key_activity',
        description: 'Outbound Logistics phase — key activity entities move through this stage'
      },
      {
        label: 'Marketing & Sales',
        entityTypeId: 'key_activity',
        description: 'Marketing & Sales phase — key activity entities move through this stage'
      },
      {
        label: 'Service',
        entityTypeId: 'key_activity',
        description: 'Service phase — key activity entities move through this stage'
      },
      {
        label: 'Support Activities',
        entityTypeId: 'capability',
        description: 'Support Activities phase — capability entities move through this stage'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'key_activity',
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
      purpose: 'Decompose the organisation into primary and support activities to identify where value is created, where costs accumulate, and where competitive advantage can be built.',
      core_question: 'Which activities in our value chain create the most value for customers, and which are candidates for cost reduction or outsourcing?',
      when_to_use: [
        'You need to align the team on long-term direction',
        'Market conditions are shifting and you need to reassess positioning',
        'Leadership needs a structured view of strategic options'
      ],
      when_not_to_use: [
        'You are in pure execution mode with a clear strategy already set',
        'The team is too early-stage to commit to strategic constraints'
      ]
    }
  },
  {
    id: 'strategy-diamond',
    name: 'Strategy Diamond',
    version: '1.0.0',
    description: 'Define strategy through five interrelated facets: Arenas, Vehicles, Differentiators, Staging, and Economic Logic.',
    category: 'strategy',
    origin: {
      type: 'practitioner',
      attribution: 'Hambrick & Fredrickson',
      description: 'Are You Sure You Have a Strategy?',
      url: 'https://en.wikipedia.org/wiki/Strategy_diamond',
      year: 2001,
      license: 'public_domain',
    },
    tags: [
      'strategy',
      'collection'
    ],
    slots: [
      {
        label: 'Arenas',
        entityTypeId: 'market_segment',
        description: 'Arenas — group of market segment entities'
      },
      {
        label: 'Vehicles',
        entityTypeId: 'distribution_channel',
        description: 'Vehicles — group of distribution channel entities'
      },
      {
        label: 'Differentiators',
        entityTypeId: 'value_proposition',
        description: 'Differentiators — group of value proposition entities'
      },
      {
        label: 'Staging',
        entityTypeId: 'initiative',
        description: 'Staging — group of market segment entities'
      },
      {
        label: 'Economic Logic',
        entityTypeId: 'revenue_stream',
        description: 'Economic Logic — group of revenue stream entities'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'market_segment',
            role: 'item'
          },
          {
            type: 'distribution_channel',
            role: 'item'
          },
          {
            type: 'value_proposition',
            role: 'item'
          },
          {
            type: 'initiative',
            role: 'item'
          },
          {
            type: 'revenue_stream',
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
      purpose: 'Define strategy across five facets (Arenas, Vehicles, Differentiators, Staging, Economic Logic). The strategy stays internally consistent and complete.',
      core_question: 'Where will we compete (arenas), how will we get there (vehicles), how will we win (differentiators), in what sequence (staging), and how will we profit (economic logic)?',
      when_to_use: [
        'You need to align the team on long-term direction',
        'Market conditions are shifting and you need to reassess positioning',
        'Leadership needs a structured view of strategic options'
      ],
      when_not_to_use: [
        'You are in pure execution mode with a clear strategy already set',
        'The team is too early-stage to commit to strategic constraints'
      ]
    }
  },
  {
    id: 'core-competency-analysis',
    name: 'Core Competency Analysis',
    version: '1.0.0',
    description: 'Identify and evaluate organisational capabilities that provide sustainable competitive advantage: those that are valuable, rare, and difficult to imitate.',
    category: 'strategy',
    origin: {
      type: 'practitioner',
      attribution: 'Prahalad & Hamel',
      description: 'The Core Competence of the Corporation',
      url: 'https://en.wikipedia.org/wiki/Core_competency',
      year: 1990,
      license: 'public_domain',
    },
    tags: [
      'strategy',
      'collection'
    ],
    slots: [
      {
        label: 'Core Competencies',
        entityTypeId: 'capability',
        description: 'Core Competencies — group of capability entities'
      },
      {
        label: 'Value Delivered',
        entityTypeId: 'value_proposition',
        description: 'Value Delivered — group of value proposition entities'
      },
      {
        label: 'Competitive Edge',
        entityTypeId: 'competitive_analysis',
        description: 'Competitive Edge — group of competitive analysis entities'
      },
      {
        label: 'Key Resources',
        entityTypeId: 'key_resource',
        description: 'Key Resources — group of key resource entities'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'capability',
            role: 'item'
          },
          {
            type: 'competitive_analysis',
            role: 'item'
          },
          {
            type: 'value_proposition',
            role: 'item'
          },
          {
            type: 'key_resource',
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
      purpose: 'Identify the organisation\'s core competencies: capabilities that are rare, hard to imitate, and valuable across markets. Guide diversification and investment decisions.',
      core_question: 'What can we do better than anyone else, is that capability transferable to new markets, and are we investing enough to maintain it?',
      when_to_use: [
        'You need to align the team on long-term direction',
        'Market conditions are shifting and you need to reassess positioning',
        'Leadership needs a structured view of strategic options'
      ],
      when_not_to_use: [
        'You are in pure execution mode with a clear strategy already set',
        'The team is too early-stage to commit to strategic constraints'
      ]
    }
  },
  {
    id: 'strategy-canvas',
    name: 'Strategy Canvas',
    version: '1.0.0',
    description: 'Plot your value curve against competitors across key competing factors to visualise strategic differentiation and identify blue ocean opportunities.',
    category: 'strategy',
    origin: {
      type: 'practitioner',
      attribution: 'Kim & Mauborgne',
      description: 'Introduced by W. Chan Kim and Renee Mauborgne in \"Blue Ocean Strategy\" (2005). The strategy canvas plots competing offerings on key factors, making strategic convergence and divergence visible at a glance.',
      url: 'https://en.wikipedia.org/wiki/Blue_Ocean_Strategy',
      year: 2005,
      license: 'published_methodology',
    },
    tags: [
      'strategy',
      'table'
    ],
    slots: [
      {
        label: 'Competing Factors',
        entityTypeId: 'competitor_feature',
        description: 'Competing Factors — competitor feature entries to evaluate'
      },
      {
        label: 'Your Value Curve',
        entityTypeId: 'value_proposition',
        description: 'Your Value Curve — value proposition entries to evaluate'
      },
      {
        label: 'Competitor Curves',
        entityTypeId: 'competitor',
        description: 'Competitor Curves — competitor entries to evaluate'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'competitor',
            role: 'item'
          },
          {
            type: 'competitor_feature',
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
      pattern: 'table'
    },
    presentation: {
      layout: {
        type: 'table',
        columns: [
          {
            property: 'title',
            label: 'Competing Factors',
            sortable: true
          },
          {
            property: 'description',
            label: 'Your Value Curve',
          },
          {
            property: 'title',
            label: 'Competitor Curves',
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
      purpose: 'Compare your offering against competitors on key factors of competition, making strategic differentiation (or lack of it) immediately visible.',
      core_question: 'On which factors do we compete the same as everyone else, and where could we diverge to create unique value?',
      when_to_use: [
        'You need to align the team on long-term direction',
        'Market conditions are shifting and you need to reassess positioning',
        'Leadership needs a structured view of strategic options'
      ],
      when_not_to_use: [
        'You are in pure execution mode with a clear strategy already set',
        'The team is too early-stage to commit to strategic constraints'
      ]
    }
  },
  {
    id: 'business-model-environment',
    name: 'Business Model Environment',
    version: '1.0.0',
    description: 'Scan the environment around your business model across four forces: Market Forces, Industry Forces, Key Trends, and Macroeconomic Forces.',
    category: 'strategy',
    origin: {
      type: 'practitioner',
      attribution: 'Osterwalder & Pigneur',
      description: 'Business Model Generation',
      url: 'https://en.wikipedia.org/wiki/Business_Model_Canvas',
      year: 2010,
      license: 'published_methodology',
    },
    tags: [
      'strategy',
      'matrix'
    ],
    slots: [
      {
        label: 'Market Forces',
        entityTypeId: 'market_segment',
        description: 'Place market segment entities in the Market Forces position of the matrix'
      },
      {
        label: 'Industry Forces',
        entityTypeId: 'competitor',
        description: 'Place competitor entities in the Industry Forces position of the matrix'
      },
      {
        label: 'Key Trends',
        entityTypeId: 'market_trend',
        description: 'Place market trend entities in the Key Trends position of the matrix'
      },
      {
        label: 'Macroeconomic Forces',
        entityTypeId: 'risk',
        description: 'Place risk entities in the Macroeconomic Forces position of the matrix'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'market_trend',
          role: 'bucket'
        },
        {
          type: 'market_segment',
          role: 'bucket'
        },
        {
          type: 'competitor',
          role: 'bucket'
        },
        {
          type: 'risk',
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
      purpose: 'Analyse the external environment in which a business model operates (market forces, industry forces, key trends, macroeconomic forces) to stress-test the model\'s assumptions.',
      core_question: 'Which external forces could make our current business model obsolete, and how resilient is it to each scenario?',
      when_to_use: [
        'You need to align the team on long-term direction',
        'Market conditions are shifting and you need to reassess positioning',
        'Leadership needs a structured view of strategic options'
      ],
      when_not_to_use: [
        'You are in pure execution mode with a clear strategy already set',
        'The team is too early-stage to commit to strategic constraints'
      ]
    }
  }
]
