/**
 * UPG Framework Definitions — Feedback Voc
 * 10 frameworks for the feedback voc domain.
 */

import type { UPGFramework } from '../types.js'

export const FEEDBACK_VOC_FRAMEWORKS: UPGFramework[] = [
  {
    id: 'voice-of-customer-program',
    name: 'Voice of Customer Program',
    version: '1.0.0',
    description: 'Structured VoC program across channels — capture, aggregate, and act on customer feedback.',
    category: 'feedback_voc',
    origin: {
      type: 'practitioner',
      year: 2000,
      description: 'Rooted in quality management (Six Sigma, Total Quality Management) and formalised for product management as companies needed systematic ways to collect, analyse, and act on multi-channel customer feedback.',
      license: 'cc_by',
    },
    tags: [
      'feedback_voc',
      'collection'
    ],
    slots: [
      {
        label: 'Channels',
        entityTypeId: 'feedback_program',
        description: 'Channels — group of feedback program entities'
      },
      {
        label: 'Collection Methods',
        entityTypeId: 'feedback_theme',
        description: 'Collection Methods — group of feedback theme entities'
      },
      {
        label: 'Aggregation',
        entityTypeId: 'feature_request',
        description: 'Aggregation — group of feature request entities'
      },
      {
        label: 'Analysis',
        entityTypeId: 'insight',
        description: 'Analysis — group of insight entities'
      },
      {
        label: 'Action & Closing the Loop',
        entityTypeId: 'customer_feedback',
        description: 'Action & Closing the Loop — group of quote entities'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'feedback_program',
            role: 'item'
          },
          {
            type: 'feedback_theme',
            role: 'item'
          },
          {
            type: 'feature_request',
            role: 'item'
          },
          {
            type: 'insight',
            role: 'item'
          },
          {
            type: 'quote',
            role: 'leaf'
          },
          {
            type: 'customer_feedback',
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
      purpose: 'Establish a structured programme for continuously collecting, analysing, and distributing customer feedback across the organisation so every team hears the customer\'s voice.',
      core_question: 'Do all teams in our organisation have regular access to unfiltered customer feedback, and are we acting on patterns rather than anecdotes?',
      when_to_use: [
        'You want to systematically capture and act on user feedback',
        'Customer satisfaction is declining and you need to understand why',
        'You need to close the loop between feedback and product decisions'
      ],
      when_not_to_use: [
        'You have no existing users or customers to gather feedback from',
        'The product is in stealth mode and feedback channels are not open'
      ]
    }
  },
  {
    id: 'feedback-triage-framework',
    approach_ids: ['inspect'],
    name: 'Feedback Triage',
    version: '1.0.0',
    description: 'Capture, categorise, assess impact, route to owners, and close the loop on customer feedback.',
    category: 'feedback_voc',
    origin: {
      type: 'practitioner',
      year: 2015,
      description: 'Evolved from product management practice as feedback volume scaled beyond manual processing. Triage frameworks bring medical triage principles to product feedback — classify, prioritise, route.',
      license: 'cc_by',
    },
    tags: [
      'feedback_voc',
      'flow'
    ],
    slots: [
      {
        label: 'Capture',
        entityTypeId: 'feedback_program',
        description: 'Capture phase — feedback program entities move through this stage'
      },
      {
        label: 'Categorise',
        entityTypeId: 'feedback_theme',
        description: 'Categorise phase — feedback theme entities move through this stage'
      },
      {
        label: 'Assess Impact',
        entityTypeId: 'feature_request',
        description: 'Assess Impact phase — feature request entities move through this stage'
      },
      {
        label: 'Route',
        entityTypeId: 'feedback_theme',
        description: 'Route phase — feedback vote entities move through this stage'
      },
      {
        label: 'Close the Loop',
        entityTypeId: 'insight',
        description: 'Close the Loop phase — insight entities move through this stage'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'feedback_program',
            role: 'item'
          },
          {
            type: 'feedback_theme',
            role: 'item'
          },
          {
            type: 'feature_request',
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
      purpose: 'Classify incoming feedback by type (bug, feature request, UX issue, praise), urgency, and strategic fit so the right team acts on the right feedback at the right time.',
      core_question: 'Is every piece of customer feedback reaching the right team with the right priority, or is valuable signal getting lost?',
      when_to_use: [
        'You want to systematically capture and act on user feedback',
        'Customer satisfaction is declining and you need to understand why',
        'You need to close the loop between feedback and product decisions'
      ],
      when_not_to_use: [
        'You have no existing users or customers to gather feedback from',
        'The product is in stealth mode and feedback channels are not open'
      ]
    }
  },
  {
    id: 'feature-voting-board',
    approach_ids: ['prioritise'],
    name: 'Feature Voting Board',
    version: '1.0.0',
    description: 'Users submit and vote on feature requests — surface demand signals and prioritise by community voice.',
    category: 'feedback_voc',
    origin: {
      type: 'practitioner',
      year: 2008,
      description: 'Popularised by tools like UserVoice (2008) and Productboard. Feature voting boards surface demand signal from users, though practitioners note that votes measure enthusiasm, not willingness to pay.',
      license: 'cc_by',
    },
    tags: [
      'feedback_voc',
      'table'
    ],
    slots: [
      {
        label: 'Requests',
        entityTypeId: 'feature_request',
        description: 'Requests — feature request entries to evaluate'
      },
      {
        label: 'Votes',
        entityTypeId: 'feedback_vote',
        description: 'Votes — feedback vote entries to evaluate'
      },
      {
        label: 'Status',
        entityTypeId: 'feedback_theme',
        description: 'Status — feedback theme entries to evaluate'
      },
      {
        label: 'Segments',
        entityTypeId: 'behavioral_segment',
        description: 'Segments — feature entries to evaluate'
      },
      {
        label: 'Response',
        entityTypeId: 'customer_feedback',
        description: 'Response — persona entries to evaluate'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'feature_request',
            role: 'item'
          },
          {
            type: 'feedback_vote',
            role: 'item'
          },
          {
            type: 'feedback_theme',
            role: 'item'
          },
          {
            type: 'behavioral_segment',
            role: 'item'
          },
          {
            type: 'customer_feedback',
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
            property: 'feature_request',
            label: 'Requests',
            sortable: true
          },
          {
            property: 'feedback_vote',
            label: 'Votes',
            sortable: true
          },
          {
            property: 'feedback_theme',
            label: 'Status',
            sortable: true
          },
          {
            property: 'feature',
            label: 'Segments',
            sortable: true
          },
          {
            property: 'persona',
            label: 'Response',
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
      purpose: 'Let customers vote on feature requests to surface demand signal — while understanding that votes measure enthusiasm, not willingness to pay or strategic fit.',
      core_question: 'What features do our users want most, and does voting volume correlate with actual business value or just vocal minority noise?',
      when_to_use: [
        'You want to systematically capture and act on user feedback',
        'Customer satisfaction is declining and you need to understand why',
        'You need to close the loop between feedback and product decisions'
      ],
      when_not_to_use: [
        'You have no existing users or customers to gather feedback from',
        'The product is in stealth mode and feedback channels are not open'
      ]
    }
  },
  {
    id: 'nps-analysis-framework',
    approach_ids: ['inspect', 'reflect'],
    name: 'NPS Analysis',
    version: '1.0.0',
    description: 'Beyond the score — analyse NPS by segments, trends, drivers, and follow-up actions.',
    category: 'feedback_voc',
    origin: {
      type: 'practitioner',
      attribution: 'Fred Reichheld',
      description: 'Based on Net Promoter Score introduced by Fred Reichheld at Bain & Company in 2003, published in Harvard Business Review. The analysis framework goes beyond the score to mine promoter and detractor verbatims.',
      url: 'https://hbr.org/2003/12/the-one-number-you-need-to-grow',
      year: 2003,
      license: 'open_attribution',
    },
    tags: [
      'feedback_voc',
      'collection'
    ],
    slots: [
      {
        label: 'NPS Score',
        entityTypeId: 'metric',
        description: 'NPS Score — group of nps campaign entities'
      },
      {
        label: 'Segment Breakdown',
        entityTypeId: 'feedback_theme',
        description: 'Segment Breakdown — group of feedback theme entities'
      },
      {
        label: 'Drivers',
        entityTypeId: 'insight',
        description: 'Drivers — group of behavioral segment entities'
      },
      {
        label: 'Trends',
        entityTypeId: 'insight',
        description: 'Trends — group of insight entities'
      },
      {
        label: 'Follow-Up Actions',
        entityTypeId: 'initiative',
        description: 'Follow-Up Actions — group of quote entities'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'feedback_theme',
            role: 'item'
          },
          {
            type: 'insight',
            role: 'item'
          },
          {
            type: 'quote',
            role: 'leaf'
          },
          {
            type: 'metric',
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
      purpose: 'Go beyond the NPS number to analyse promoter and detractor verbatims, segment scores by cohort, and connect the score to actionable product and service improvements.',
      core_question: 'What specifically makes our promoters promote and our detractors detract — and what one change would shift the most detractors?',
      when_to_use: [
        'You want to systematically capture and act on user feedback',
        'Customer satisfaction is declining and you need to understand why',
        'You need to close the loop between feedback and product decisions'
      ],
      when_not_to_use: [
        'You have no existing users or customers to gather feedback from',
        'The product is in stealth mode and feedback channels are not open'
      ]
    }
  },
  {
    id: 'customer-advisory-board-framework',
    name: 'Customer Advisory Board',
    version: '1.0.0',
    description: 'Structure a customer advisory board program — recruitment, cadence, topics, and outcomes.',
    category: 'feedback_voc',
    origin: {
      type: 'practitioner',
      year: 2005,
      description: 'Standard enterprise practice formalised by product management and customer success communities. Provides a structured approach to getting strategic input from engaged customers.',
      license: 'cc_by',
    },
    tags: [
      'feedback_voc',
      'collection'
    ],
    slots: [
      {
        label: 'Charter',
        entityTypeId: 'user_advisory_board',
        description: 'Charter — group of user advisory board entities'
      },
      {
        label: 'Recruitment',
        entityTypeId: 'feedback_program',
        description: 'Recruitment — group of feedback program entities'
      },
      {
        label: 'Cadence',
        entityTypeId: 'ceremony',
        description: 'Cadence — group of feedback theme entities'
      },
      {
        label: 'Agenda',
        entityTypeId: 'research_question',
        description: 'Agenda — group of insight entities'
      },
      {
        label: 'Outcomes & Actions',
        entityTypeId: 'initiative',
        description: 'Outcomes & Actions — group of persona entities'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'user_advisory_board',
            role: 'item'
          },
          {
            type: 'feedback_program',
            role: 'item'
          },
          {
            type: 'persona',
            role: 'root'
          },
          {
            type: 'ceremony',
            role: 'item'
          },
          {
            type: 'research_question',
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
      purpose: 'Structure a customer advisory board — member selection, meeting cadence, agenda design, feedback loops — to get strategic input from your most engaged customers.',
      core_question: 'Are we getting candid strategic guidance from our best customers, or is our advisory board a feel-good exercise?',
      when_to_use: [
        'You want to systematically capture and act on user feedback',
        'Customer satisfaction is declining and you need to understand why',
        'You need to close the loop between feedback and product decisions'
      ],
      when_not_to_use: [
        'You have no existing users or customers to gather feedback from',
        'The product is in stealth mode and feedback channels are not open'
      ]
    }
  },
  {
    id: 'beta-testing-framework',
    name: 'Beta Testing Framework',
    version: '1.0.0',
    description: 'From beta recruitment through structured feedback collection to go/no-go decision.',
    category: 'feedback_voc',
    origin: {
      type: 'practitioner',
      year: 2000,
      description: 'Evolved from software development practice dating to the early days of commercial software. Modern beta frameworks add structured feedback collection, success criteria, and go/no-go decision processes.',
      license: 'cc_by',
    },
    tags: [
      'feedback_voc',
      'flow'
    ],
    slots: [
      {
        label: 'Recruitment',
        entityTypeId: 'beta_program',
        description: 'Recruitment phase — beta program entities move through this stage'
      },
      {
        label: 'Onboarding',
        entityTypeId: 'feedback_program',
        description: 'Onboarding phase — feedback program entities move through this stage'
      },
      {
        label: 'Testing Period',
        entityTypeId: 'feedback_theme',
        description: 'Testing Period phase — feedback theme entities move through this stage'
      },
      {
        label: 'Feedback Collection',
        entityTypeId: 'feature_request',
        description: 'Feedback Collection phase — feature request entities move through this stage'
      },
      {
        label: 'Go / No-Go',
        entityTypeId: 'learning',
        description: 'Go / No-Go phase — learning entities move through this stage'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'beta_program',
          role: 'item'
        },
        {
          type: 'feedback_program',
          role: 'item'
        },
        {
          type: 'feedback_theme',
          role: 'item'
        },
        {
          type: 'feature_request',
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
      purpose: 'Design a beta programme — participant selection, success metrics, feedback collection, exit criteria — that produces actionable learnings before general availability.',
      core_question: 'Will our beta programme give us the confidence to ship (or not ship) this feature, and do we have clear pass/fail criteria?',
      when_to_use: [
        'You want to systematically capture and act on user feedback',
        'Customer satisfaction is declining and you need to understand why',
        'You need to close the loop between feedback and product decisions'
      ],
      when_not_to_use: [
        'You have no existing users or customers to gather feedback from',
        'The product is in stealth mode and feedback channels are not open'
      ]
    }
  },
  {
    id: 'csat-analysis',
    approach_ids: ['inspect', 'reflect'],
    name: 'CSAT Analysis',
    version: '1.0.0',
    description: 'Measure and analyse customer satisfaction across touchpoints, segments, and time.',
    category: 'feedback_voc',
    origin: {
      type: 'practitioner',
      year: 1995,
      description: 'Customer Satisfaction Score measurement dates to the mid-1990s. CSAT analysis frameworks evolved as companies needed to go beyond aggregate scores to understand satisfaction drivers by feature, journey stage, and segment.',
      license: 'cc_by',
    },
    tags: [
      'feedback_voc',
      'table'
    ],
    slots: [
      {
        label: 'Touchpoints',
        entityTypeId: 'feedback_program',
        description: 'Touchpoints — feedback program entries to evaluate'
      },
      {
        label: 'Scores',
        entityTypeId: 'metric',
        description: 'Scores — feedback theme entries to evaluate'
      },
      {
        label: 'Segments',
        entityTypeId: 'behavioral_segment',
        description: 'Segments — behavioral segment entries to evaluate'
      },
      {
        label: 'Trends',
        entityTypeId: 'metric',
        description: 'Trends — metric entries to evaluate'
      },
      {
        label: 'Actions',
        entityTypeId: 'insight',
        description: 'Actions — insight entries to evaluate'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'feedback_program',
            role: 'item'
          },
          {
            type: 'behavioral_segment',
            role: 'item'
          },
          {
            type: 'metric',
            role: 'item'
          },
          {
            type: 'insight',
            role: 'leaf'
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
            property: 'feedback_program',
            label: 'Touchpoints',
            sortable: true
          },
          {
            property: 'feedback_theme',
            label: 'Scores',
            sortable: true
          },
          {
            property: 'behavioral_segment',
            label: 'Segments',
            sortable: true
          },
          {
            property: 'metric',
            label: 'Trends',
            sortable: true
          },
          {
            property: 'insight',
            label: 'Actions',
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
      purpose: 'Analyse Customer Satisfaction scores in context — by feature, journey stage, support interaction — to find where satisfaction dips and what drives it.',
      core_question: 'Where in the customer experience does satisfaction drop, and what specific interaction or feature is causing it?',
      when_to_use: [
        'You want to systematically capture and act on user feedback',
        'Customer satisfaction is declining and you need to understand why',
        'You need to close the loop between feedback and product decisions'
      ],
      when_not_to_use: [
        'You have no existing users or customers to gather feedback from',
        'The product is in stealth mode and feedback channels are not open'
      ]
    }
  },
  {
    id: 'feedback-loop-design',
    name: 'Feedback Loop Design',
    version: '1.0.0',
    description: 'Design in-product feedback mechanisms — triggers, prompts, collection, and response.',
    category: 'feedback_voc',
    origin: {
      type: 'practitioner',
      year: 2018,
      description: 'Draws on systems thinking and service design principles. Closed-loop feedback systems became essential as product teams recognised that collecting feedback without acting on it erodes trust.',
      license: 'cc_by',
    },
    tags: [
      'feedback_voc',
      'flow'
    ],
    slots: [
      {
        label: 'Trigger Point',
        entityTypeId: 'feedback_program',
        description: 'Trigger Point phase — feedback program entities move through this stage'
      },
      {
        label: 'Prompt Design',
        entityTypeId: 'feedback_theme',
        description: 'Prompt Design phase — feedback theme entities move through this stage'
      },
      {
        label: 'Collection',
        entityTypeId: 'feature_request',
        description: 'Collection phase — feature request entities move through this stage'
      },
      {
        label: 'Processing',
        entityTypeId: 'workflow_template',
        description: 'Processing phase — user flow entities move through this stage'
      },
      {
        label: 'Response to User',
        entityTypeId: 'customer_feedback',
        description: 'Response to User phase — screen entities move through this stage'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'feedback_program',
            role: 'item'
          },
          {
            type: 'feedback_theme',
            role: 'item'
          },
          {
            type: 'feature_request',
            role: 'item'
          },
          {
            type: 'workflow_template',
            role: 'item'
          },
          {
            type: 'customer_feedback',
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
      purpose: 'Design closed-loop feedback systems where customer input triggers action, the action is communicated back, and the cycle reinforces trust and engagement.',
      core_question: 'When a customer gives us feedback, do they see it acknowledged, acted on, and communicated back — or does it disappear into a void?',
      when_to_use: [
        'You want to systematically capture and act on user feedback',
        'Customer satisfaction is declining and you need to understand why',
        'You need to close the loop between feedback and product decisions'
      ],
      when_not_to_use: [
        'You have no existing users or customers to gather feedback from',
        'The product is in stealth mode and feedback channels are not open'
      ]
    }
  },
  {
    id: 'customer-effort-score',
    name: 'Customer Effort Score',
    version: '1.0.0',
    description: 'Measure how much effort customers expend to complete tasks — lower effort correlates with higher loyalty.',
    category: 'feedback_voc',
    origin: {
      type: 'practitioner',
      attribution: 'CEB / Gartner',
      description: 'Introduced by CEB (now Gartner) researchers in 2010, published in Harvard Business Review as \"Stop Trying to Delight Your Customers.\" The key finding: reducing effort drives loyalty more than exceeding expectations.',
      url: 'https://hbr.org/2010/07/stop-trying-to-delight-your-customers',
      year: 2010,
      license: 'open_attribution',
    },
    tags: [
      'feedback_voc',
      'table'
    ],
    slots: [
      {
        label: 'Tasks',
        entityTypeId: 'feedback_program',
        description: 'Tasks — feedback program entries to evaluate'
      },
      {
        label: 'Effort Score',
        entityTypeId: 'metric',
        description: 'Effort Score — metric entries to evaluate'
      },
      {
        label: 'Segments',
        entityTypeId: 'behavioral_segment',
        description: 'Segments — behavioral segment entries to evaluate'
      },
      {
        label: 'Effort Drivers',
        entityTypeId: 'insight',
        description: 'Effort Drivers — insight entries to evaluate'
      },
      {
        label: 'Improvements',
        entityTypeId: 'feedback_theme',
        description: 'Improvements — feedback theme entries to evaluate'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'feedback_program',
          role: 'leaf'
        },
        {
          type: 'metric',
          role: 'item'
        },
        {
          type: 'behavioral_segment',
          role: 'item'
        },
        {
          type: 'insight',
          role: 'item'
        },
        {
          type: 'feedback_theme',
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
            property: 'feedback_program',
            label: 'Tasks',
            sortable: true
          },
          {
            property: 'metric',
            label: 'Effort Score',
            sortable: true
          },
          {
            property: 'behavioral_segment',
            label: 'Segments',
            sortable: true
          },
          {
            property: 'insight',
            label: 'Effort Drivers',
            sortable: true
          },
          {
            property: 'feedback_theme',
            label: 'Improvements',
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
      purpose: 'Measure the effort customers must exert to accomplish a task or resolve an issue — because low-effort experiences drive loyalty more effectively than delight.',
      core_question: 'How easy is it for customers to accomplish their goals with our product, and where are the highest-effort friction points?',
      when_to_use: [
        'You want to systematically capture and act on user feedback',
        'Customer satisfaction is declining and you need to understand why',
        'You need to close the loop between feedback and product decisions'
      ],
      when_not_to_use: [
        'You have no existing users or customers to gather feedback from',
        'The product is in stealth mode and feedback channels are not open'
      ]
    }
  },
  {
    id: 'product-feedback-taxonomy',
    name: 'Product Feedback Taxonomy',
    version: '1.0.0',
    description: 'Hierarchical feedback tagging system — category, subcategory, theme, sentiment.',
    category: 'feedback_voc',
    origin: {
      type: 'practitioner',
      year: 2016,
      description: 'Developed by product management practitioners to bring structure to qualitative feedback. A consistent taxonomy enables aggregation, trending, and comparison of feedback over time.',
      license: 'cc_by',
    },
    tags: [
      'feedback_voc',
      'tree'
    ],
    slots: [
      {
        label: 'Categories',
        entityTypeId: 'feedback_theme',
        description: 'Categories — feedback theme entities for this dimension of the framework'
      },
      {
        label: 'Subcategories',
        entityTypeId: 'feedback_theme',
        description: 'Subcategories — feedback program entities for this dimension of the framework'
      },
      {
        label: 'Themes',
        entityTypeId: 'feedback_theme',
        description: 'Themes — feature request entities for this dimension of the framework'
      },
      {
        label: 'Sentiment',
        entityTypeId: 'feedback_vote',
        description: 'Sentiment — feedback vote entities for this dimension of the framework'
      },
      {
        label: 'Priority',
        entityTypeId: 'insight',
        description: 'Priority — insight entities for this dimension of the framework'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'feedback_theme',
            role: 'item'
          },
          {
            type: 'feedback_vote',
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
      purpose: 'Create a consistent taxonomy for categorising product feedback — by theme, feature area, user segment, sentiment — so feedback is analysable rather than a pile of notes.',
      core_question: 'Can we aggregate, trend, and compare feedback over time using a consistent taxonomy, or is every piece of feedback a one-off note?',
      when_to_use: [
        'You want to systematically capture and act on user feedback',
        'Customer satisfaction is declining and you need to understand why',
        'You need to close the loop between feedback and product decisions'
      ],
      when_not_to_use: [
        'You have no existing users or customers to gather feedback from',
        'The product is in stealth mode and feedback channels are not open'
      ]
    }
  }
]
