/**
 * UPG Framework Definitions — Research
 * 4 frameworks for the research domain.
 */

import type { UPGFramework } from '../types.js'

export const RESEARCH_FRAMEWORKS: UPGFramework[] = [
  {
    id: 'empathy-map',
    name: 'Empathy Map',
    version: '1.0.0',
    description: 'Visualise what a user says, thinks, does, and feels to build deeper empathy and uncover hidden needs.',
    category: 'research',
    origin: {
      type: 'practitioner',
      attribution: 'Dave Gray (XPLANE)',
      description: 'Created by Dave Gray at XPLANE. Originally a design thinking exercise, now standard in product discovery.',
      url: 'https://gamestorming.com/empathy-mapping/',
      year: 2010,
      license: 'open_attribution',
    },
    tags: [
      'research',
      'matrix'
    ],
    slots: [
      {
        label: 'Says',
        entityTypeId: 'quote',
        description: 'Direct quotes from user interviews'
      },
      {
        label: 'Thinks',
        entityTypeId: 'insight',
        description: 'What the user is thinking but may not say'
      },
      {
        label: 'Does',
        entityTypeId: 'job',
        description: 'Observable actions and behaviours'
      },
      {
        label: 'Feels',
        entityTypeId: 'need',
        description: 'Emotions, frustrations, and anxieties'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'need',
            role: 'bucket'
          },
          {
            type: 'job',
            role: 'bucket'
          },
          {
            type: 'insight',
            role: 'bucket'
          },
          {
            type: 'quote',
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
      purpose: 'Synthesise research observations into what a user says, thinks, does, and feels. Build a shared mental model of the user that goes beyond demographics.',
      core_question: 'What does this user truly think and feel versus what they say and do? What do the gaps reveal?',
      when_to_use: [
        'You need to synthesise findings from multiple research activities',
        'Research insights are scattered and not accessible to the team',
        'You want to build a shared understanding of what you have learned'
      ],
      when_not_to_use: [
        'You have not yet conducted enough research to synthesise',
        'The team prefers to act on intuition rather than evidence'
      ]
    }
  },
  {
    id: 'research-repository',
    name: 'Research Repository',
    version: '1.0.0',
    description: 'A centralised library of research studies, insights, and evidence. Makes research discoverable and reusable.',
    category: 'research',
    origin: {
      type: 'practitioner',
      description: 'Pioneered by companies like Spotify and Atlassian. Solves the \'research goes to die in slide decks\' problem.',
      url: 'https://dovetailapp.com/blog/research-repository/',
      license: 'cc_by',
    },
    tags: [
      'research',
      'collection'
    ],
    slots: [
      {
        label: 'Studies',
        entityTypeId: 'research_study',
        description: 'Individual research projects'
      },
      {
        label: 'Insights',
        entityTypeId: 'insight',
        description: 'Synthesised findings'
      },
      {
        label: 'Observations',
        entityTypeId: 'observation',
        description: 'Raw data points'
      },
      {
        label: 'Participants',
        entityTypeId: 'participant',
        description: 'People who participated'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'research_study',
          role: 'item'
        },
        {
          type: 'insight',
          role: 'item'
        },
        {
          type: 'observation',
          role: 'item'
        },
        {
          type: 'participant',
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
      purpose: 'Store, tag, and surface research findings in a searchable repository so insights compound over time and new projects build on existing knowledge instead of starting from scratch.',
      core_question: 'Can anyone in the organisation find relevant past research in under 5 minutes, or are insights trapped in individual documents and memories?',
      when_to_use: [
        'You need to synthesise findings from multiple research activities',
        'Research insights are scattered and not accessible to the team',
        'You want to build a shared understanding of what you have learned'
      ],
      when_not_to_use: [
        'You have not yet conducted enough research to synthesise',
        'The team prefers to act on intuition rather than evidence'
      ]
    }
  },
  {
    id: 'affinity-map',
    name: 'Affinity Map',
    version: '1.0.0',
    description: 'Group observations and quotes into thematic clusters to identify patterns. Bottom-up synthesis.',
    category: 'research',
    origin: {
      type: 'practitioner',
      attribution: 'Jiro Kawakita',
      description: 'Also known as KJ Method. Created by Japanese anthropologist Jiro Kawakita for fieldwork data synthesis.',
      year: 1967,
      license: 'public_domain',
    },
    tags: [
      'research',
      'collection'
    ],
    slots: [
      {
        label: 'Raw Data',
        entityTypeId: 'observation',
        description: 'Individual observations and notes'
      },
      {
        label: 'Quotes',
        entityTypeId: 'quote',
        description: 'Verbatim participant quotes'
      },
      {
        label: 'Clusters',
        entityTypeId: 'affinity_cluster',
        description: 'Thematic groupings'
      },
      {
        label: 'Insights',
        entityTypeId: 'insight',
        description: 'Patterns that emerge from clusters'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'observation',
          role: 'item'
        },
        {
          type: 'quote',
          role: 'item'
        },
        {
          type: 'affinity_cluster',
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
      purpose: 'Cluster qualitative data (interview notes, observations, feedback) into emergent themes, letting patterns surface from the bottom up instead of being imposed top-down.',
      core_question: 'What themes and patterns emerge when we group our raw research observations? What surprised us?',
      when_to_use: [
        'You need to synthesise findings from multiple research activities',
        'Research insights are scattered and not accessible to the team',
        'You want to build a shared understanding of what you have learned'
      ],
      when_not_to_use: [
        'You have not yet conducted enough research to synthesise',
        'The team prefers to act on intuition rather than evidence'
      ]
    }
  },
  {
    id: 'research-plan',
    name: 'Research Plan',
    version: '1.0.0',
    description: 'Structure a research study from questions through methodology to synthesis.',
    category: 'research',
    origin: {
      type: 'practitioner',
      description: 'Standard UX research practice. Ensures studies are purposeful and aligned to product questions.',
      license: 'cc_by',
    },
    tags: [
      'research',
      'flow'
    ],
    slots: [
      {
        label: 'Research Questions',
        entityTypeId: 'research_question',
        description: 'What we want to learn'
      },
      {
        label: 'Target Users',
        entityTypeId: 'persona',
        description: 'Who we\'re studying'
      },
      {
        label: 'Methodology',
        entityTypeId: 'research_study',
        description: 'How we\'ll gather data'
      },
      {
        label: 'Expected Outcomes',
        entityTypeId: 'hypothesis',
        description: 'What we expect to find'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'research_study',
            role: 'item'
          },
          {
            type: 'persona',
            role: 'item'
          },
          {
            type: 'hypothesis',
            role: 'root'
          },
          {
            type: 'research_question',
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
      purpose: 'Define the research objective, methodology, participants, timeline, and analysis plan before starting. Research answers the right questions at the right fidelity.',
      core_question: 'What specific decision will this research inform, and what is the minimum viable study to inform it?',
      when_to_use: [
        'You need to synthesise findings from multiple research activities',
        'Research insights are scattered and not accessible to the team',
        'You want to build a shared understanding of what you have learned'
      ],
      when_not_to_use: [
        'You have not yet conducted enough research to synthesise',
        'The team prefers to act on intuition rather than evidence'
      ]
    }
  }
]
