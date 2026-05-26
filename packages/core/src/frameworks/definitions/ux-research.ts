/**
 * UPG Framework Definitions — Ux Research
 * 10 frameworks for the ux research domain.
 */

import type { UPGFramework } from '../types.js'

export const UX_RESEARCH_FRAMEWORKS: UPGFramework[] = [
  {
    id: 'usability-test-plan',
    name: 'Usability Test Plan',
    version: '1.0.0',
    description: 'From objectives through tasks to findings — a structured plan for running usability tests.',
    category: 'ux_research',
    origin: {
      type: 'practitioner',
      attribution: 'Jakob Nielsen',
      description: 'Based on Jakob Nielsen\'s usability engineering methodology, published in \"Usability Engineering\" (1993). The test plan format structures usability studies with clear tasks, participants, metrics, and success criteria.',
      url: 'https://www.nngroup.com/articles/usability-testing-101/',
      year: 1993,
      license: 'published_methodology',
    },
    tags: [
      'ux_research',
      'flow'
    ],
    slots: [
      {
        label: 'Objectives',
        entityTypeId: 'research_question',
        description: 'Objectives phase — research study entities move through this stage'
      },
      {
        label: 'Participants',
        entityTypeId: 'participant',
        description: 'Participants phase — participant entities move through this stage'
      },
      {
        label: 'Tasks',
        entityTypeId: 'task',
        description: 'Tasks phase — observation entities move through this stage'
      },
      {
        label: 'Scenarios',
        entityTypeId: 'test_case',
        description: 'Scenarios phase — insight entities move through this stage'
      },
      {
        label: 'Findings',
        entityTypeId: 'insight',
        description: 'Findings phase — research question entities move through this stage'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'participant',
            role: 'item'
          },
          {
            type: 'insight',
            role: 'item'
          },
          {
            type: 'research_question',
            role: 'item'
          },
          {
            type: 'task',
            role: 'item'
          },
          {
            type: 'test_case',
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
      purpose: 'Design a usability test (tasks, participants, metrics, protocol) that produces actionable findings about whether users accomplish their goals with the product.',
      core_question: 'Can users complete their key tasks successfully, and where do they struggle, hesitate, or make errors?',
      when_to_use: [
        'You need to understand user behaviour, needs, or pain points',
        'Design decisions require empirical evidence rather than assumptions',
        'You want to evaluate usability of an existing product or prototype'
      ],
      when_not_to_use: [
        'You already have strong quantitative signal from analytics',
        'Time constraints make formal research impractical'
      ]
    }
  },
  {
    id: 'diary-study',
    name: 'Diary Study',
    version: '1.0.0',
    description: 'Longitudinal self-reported user data — participants log experiences over days or weeks.',
    category: 'ux_research',
    origin: {
      type: 'practitioner',
      attribution: 'NNGroup',
      description: 'Adapted from ethnographic research for UX by the NNGroup and academic HCI community around 2014. Diary studies capture longitudinal user behaviour in context over days or weeks.',
      url: 'https://www.nngroup.com/articles/diary-studies/',
      year: 2014,
      license: 'open_attribution',
    },
    tags: [
      'ux_research',
      'collection'
    ],
    slots: [
      {
        label: 'Study Setup',
        entityTypeId: 'research_study',
        description: 'Study Setup — group of research study entities'
      },
      {
        label: 'Prompts',
        entityTypeId: 'research_question',
        description: 'Prompts — group of participant entities'
      },
      {
        label: 'Diary Entries',
        entityTypeId: 'observation',
        description: 'Diary Entries — group of observation entities'
      },
      {
        label: 'Themes',
        entityTypeId: 'affinity_cluster',
        description: 'Themes — group of quote entities'
      },
      {
        label: 'Insights',
        entityTypeId: 'insight',
        description: 'Insights — group of insight entities'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'research_study',
            role: 'item'
          },
          {
            type: 'observation',
            role: 'item'
          },
          {
            type: 'insight',
            role: 'item'
          },
          {
            type: 'affinity_cluster',
            role: 'item'
          },
          {
            type: 'research_question',
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
      purpose: 'Collect longitudinal data on user behaviour in context across days or weeks. Understand how product usage fits into real life rather than a lab setting.',
      core_question: 'How does our product fit into users\' daily lives over time, and what usage patterns, workarounds, or abandonments emerge naturally?',
      when_to_use: [
        'You need to understand user behaviour, needs, or pain points',
        'Design decisions require empirical evidence rather than assumptions',
        'You want to evaluate usability of an existing product or prototype'
      ],
      when_not_to_use: [
        'You already have strong quantitative signal from analytics',
        'Time constraints make formal research impractical'
      ]
    }
  },
  {
    id: 'card-sort-analysis',
    name: 'Card Sort Analysis',
    version: '1.0.0',
    description: 'Reveal users\' mental models for information architecture through open, closed, or hybrid card sorts.',
    category: 'ux_research',
    origin: {
      type: 'practitioner',
      attribution: 'Donna Spencer',
      description: 'Described by Donna Spencer in \"Card Sorting: Designing Usable Categories\" (2009). Card sorting reveals how users group and label concepts, informing information architecture decisions.',
      url: 'https://rosenfeldmedia.com/books/card-sorting/',
      year: 2009,
      license: 'published_methodology',
    },
    tags: [
      'ux_research',
      'tree'
    ],
    slots: [
      {
        label: 'Cards',
        entityTypeId: 'design_concept',
        description: 'Cards — research study entities for this dimension of the framework'
      },
      {
        label: 'Categories',
        entityTypeId: 'affinity_cluster',
        description: 'Categories — participant entities for this dimension of the framework'
      },
      {
        label: 'Similarity Matrix',
        entityTypeId: 'affinity_cluster',
        description: 'Similarity Matrix — affinity cluster entities for this dimension of the framework'
      },
      {
        label: 'Dendrograms',
        entityTypeId: 'observation',
        description: 'Dendrograms — insight entities for this dimension of the framework'
      },
      {
        label: 'Recommendations',
        entityTypeId: 'insight',
        description: 'Recommendations — observation entities for this dimension of the framework'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'affinity_cluster',
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
            type: 'design_concept',
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
      purpose: 'Analyse how users group and label concepts to design information architecture that matches users\' mental models rather than the organisation\'s internal structure.',
      core_question: 'How do users expect information to be organised, and does our navigation match their mental model or our org chart?',
      when_to_use: [
        'You need to understand user behaviour, needs, or pain points',
        'Design decisions require empirical evidence rather than assumptions',
        'You want to evaluate usability of an existing product or prototype'
      ],
      when_not_to_use: [
        'You already have strong quantitative signal from analytics',
        'Time constraints make formal research impractical'
      ]
    }
  },
  {
    id: 'jtbd-interview-script',
    name: 'JTBD Interview Script',
    version: '1.0.0',
    description: 'Timeline interview for uncovering switching behaviour — first thought, passive looking, active looking, deciding, consuming.',
    category: 'ux_research',
    origin: {
      type: 'practitioner',
      attribution: 'Bob Moesta',
      description: 'Developed by Bob Moesta and Chris Spiek at the Rewired Group, building on Clayton Christensen\'s Jobs to Be Done theory. The Switch Interview technique maps the forces of progress (push, pull, anxiety, habit) along the customer\'s decision timeline.',
      url: 'https://jobstobedone.org/',
      year: 2013,
      license: 'published_methodology',
    },
    tags: [
      'ux_research',
      'flow'
    ],
    slots: [
      {
        label: 'First Thought',
        entityTypeId: 'interview_guide',
        description: 'When did the customer first realise their current solution wasn\'t working? What triggered the search?'
      },
      {
        label: 'Passive Looking',
        entityTypeId: 'observation',
        description: 'How did they begin exploring alternatives? What information did they seek?'
      },
      {
        label: 'Active Looking',
        entityTypeId: 'quote',
        description: 'When did the search become deliberate? What criteria emerged?'
      },
      {
        label: 'Deciding',
        entityTypeId: 'insight',
        description: 'What tipped the decision? Which forces won — push/pull vs anxiety/habit?'
      },
      {
        label: 'Consuming',
        entityTypeId: 'switching_cost',
        description: 'Consuming phase — switching cost entities move through this stage'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'interview_guide',
            role: 'item'
          },
          {
            type: 'quote',
            role: 'item'
          },
          {
            type: 'switching_cost',
            role: 'item'
          },
          {
            type: 'insight',
            role: 'item'
          },
          {
            type: 'observation',
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
      purpose: 'Structure Jobs to Be Done interviews around the timeline of a purchase decision, from first thought through to satisfaction. Uncover the forces that drive switching behaviour.',
      core_question: 'What was the sequence of events, emotions, and trade-offs that led a customer to switch to (or away from) a solution?',
      when_to_use: [
        'You need to understand user behaviour, needs, or pain points',
        'Design decisions require empirical evidence rather than assumptions',
        'You want to evaluate usability of an existing product or prototype'
      ],
      when_not_to_use: [
        'You already have strong quantitative signal from analytics',
        'Time constraints make formal research impractical'
      ]
    }
  },
  {
    id: 'research-ops-framework',
    name: 'Research Ops Framework',
    version: '1.0.0',
    description: 'Operationalise UX research — governance, participant management, knowledge management, tools.',
    category: 'ux_research',
    origin: {
      type: 'practitioner',
      attribution: 'ResearchOps Community',
      url: 'https://researchops.community/',
      year: 2018,
      description: 'Developed by the Research Ops Community, a global volunteer-led group formed in 2018. Research Ops addresses the operational infrastructure (recruitment, tooling, governance) needed to scale user research.',
      license: 'cc_by',
    },
    tags: [
      'ux_research',
      'collection'
    ],
    slots: [
      {
        label: 'Governance',
        entityTypeId: 'research_plan',
        description: 'Governance — group of research study entities'
      },
      {
        label: 'Participant Management',
        entityTypeId: 'participant',
        description: 'Participant Management — group of participant entities'
      },
      {
        label: 'Knowledge Management',
        entityTypeId: 'insight',
        description: 'Knowledge Management — group of insight entities'
      },
      {
        label: 'Tools & Infrastructure',
        entityTypeId: 'document',
        description: 'Tools & Infrastructure — group of research question entities'
      },
      {
        label: 'Practices & Standards',
        entityTypeId: 'design_guideline',
        description: 'Practices & Standards — group of affinity cluster entities'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'participant',
            role: 'item'
          },
          {
            type: 'insight',
            role: 'item'
          },
          {
            type: 'research_plan',
            role: 'item'
          },
          {
            type: 'document',
            role: 'item'
          },
          {
            type: 'design_guideline',
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
      purpose: 'Operationalise user research (participant recruitment, tooling, data management, governance) so research scales beyond a single researcher doing everything manually.',
      core_question: 'Can our research function scale: are participant recruitment, consent management, and insight distribution systematised or bottlenecked?',
      when_to_use: [
        'You need to understand user behaviour, needs, or pain points',
        'Design decisions require empirical evidence rather than assumptions',
        'You want to evaluate usability of an existing product or prototype'
      ],
      when_not_to_use: [
        'You already have strong quantitative signal from analytics',
        'Time constraints make formal research impractical'
      ]
    }
  },
  {
    id: 'survey-design-framework',
    name: 'Survey Design Framework',
    version: '1.0.0',
    description: 'From research questions to survey design, distribution, and analysis.',
    category: 'ux_research',
    origin: {
      type: 'practitioner',
      description: 'Rooted in survey methodology and social science research. Applied to product research with best practices for question design, response scales, sampling, and bias mitigation.',
      license: 'cc_by',
    },
    tags: [
      'ux_research',
      'flow'
    ],
    slots: [
      {
        label: 'Research Questions',
        entityTypeId: 'research_question',
        description: 'Research Questions phase — research study entities move through this stage'
      },
      {
        label: 'Survey Design',
        entityTypeId: 'research_plan',
        description: 'Survey Design phase — research question entities move through this stage'
      },
      {
        label: 'Distribution',
        entityTypeId: 'research_study',
        description: 'Distribution phase — survey response entities move through this stage'
      },
      {
        label: 'Collection',
        entityTypeId: 'survey_response',
        description: 'Collection phase — insight entities move through this stage'
      },
      {
        label: 'Analysis',
        entityTypeId: 'insight',
        description: 'Analysis phase — observation entities move through this stage'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'research_study',
            role: 'item'
          },
          {
            type: 'research_question',
            role: 'item'
          },
          {
            type: 'survey_response',
            role: 'item'
          },
          {
            type: 'insight',
            role: 'item'
          },
          {
            type: 'research_plan',
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
      purpose: 'Design surveys that produce valid, actionable data: clear objectives, unbiased questions, appropriate scales, adequate sample size. Avoid the common traps that produce misleading results.',
      core_question: 'Will this survey give us reliable answers to our research question, or will question bias, low response rate, or poor sampling undermine the results?',
      when_to_use: [
        'You need to understand user behaviour, needs, or pain points',
        'Design decisions require empirical evidence rather than assumptions',
        'You want to evaluate usability of an existing product or prototype'
      ],
      when_not_to_use: [
        'You already have strong quantitative signal from analytics',
        'Time constraints make formal research impractical'
      ]
    }
  },
  {
    id: 'contextual-inquiry',
    name: 'Contextual Inquiry',
    version: '1.0.0',
    description: 'Observe users in their actual environment — a field research method combining observation and interview.',
    category: 'ux_research',
    origin: {
      type: 'practitioner',
      attribution: 'Beyer & Holtzblatt',
      description: 'Developed by Hugh Beyer and Karen Holtzblatt, published in \"Contextual Design\" (1998). Contextual inquiry combines observation and interview in the user\'s actual work environment to uncover tacit knowledge.',
      url: 'https://www.elsevier.com/books/contextual-design/holtzblatt/978-0-12-800894-2',
      year: 1998,
      license: 'public_domain',
    },
    tags: [
      'ux_research',
      'flow'
    ],
    slots: [
      {
        label: 'Planning',
        entityTypeId: 'research_study',
        description: 'Planning phase — research study entities move through this stage'
      },
      {
        label: 'Field Visit',
        entityTypeId: 'participant',
        description: 'Field Visit phase — participant entities move through this stage'
      },
      {
        label: 'Observation',
        entityTypeId: 'observation',
        description: 'Observation phase — observation entities move through this stage'
      },
      {
        label: 'Interpretation',
        entityTypeId: 'insight',
        description: 'Interpretation phase — quote entities move through this stage'
      },
      {
        label: 'Synthesis',
        entityTypeId: 'insight',
        description: 'Synthesis phase — insight entities move through this stage'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'research_study',
            role: 'item'
          },
          {
            type: 'participant',
            role: 'item'
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
      purpose: 'Observe and interview users in their actual work environment. Watch what they do, ask why, and discover tacit knowledge that lab-based research misses.',
      core_question: 'What do users actually do (versus what they say they do), and what environmental factors, workarounds, and informal processes shape their behaviour?',
      when_to_use: [
        'You need to understand user behaviour, needs, or pain points',
        'Design decisions require empirical evidence rather than assumptions',
        'You want to evaluate usability of an existing product or prototype'
      ],
      when_not_to_use: [
        'You already have strong quantitative signal from analytics',
        'Time constraints make formal research impractical'
      ]
    }
  },
  {
    id: 'mixed-methods-matrix',
    name: 'Mixed Methods Matrix',
    version: '1.0.0',
    description: 'Qualitative/quantitative crossed with attitudinal/behavioural — a landscape of user research methods.',
    category: 'ux_research',
    origin: {
      type: 'practitioner',
      attribution: 'Christian Rohrer / NNGroup',
      description: 'Adapted by Christian Rohrer at NNGroup (2008) from social science mixed methods research. The matrix maps research methods along two axes — behavioural vs. attitudinal and qualitative vs. quantitative.',
      url: 'https://www.nngroup.com/articles/which-ux-research-methods/',
      year: 2008,
      license: 'open_attribution',
    },
    tags: [
      'ux_research',
      'matrix'
    ],
    slots: [
      {
        label: 'Qualitative–Attitudinal',
        entityTypeId: 'research_study',
        description: 'Place research study entities in the Qualitative–Attitudinal position of the matrix'
      },
      {
        label: 'Qualitative–Behavioural',
        entityTypeId: 'research_study',
        description: 'Place research question entities in the Qualitative–Behavioural position of the matrix'
      },
      {
        label: 'Quantitative–Attitudinal',
        entityTypeId: 'research_study',
        description: 'Place observation entities in the Quantitative–Attitudinal position of the matrix'
      },
      {
        label: 'Quantitative–Behavioural',
        entityTypeId: 'research_study',
        description: 'Place insight entities in the Quantitative–Behavioural position of the matrix'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'research_study',
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
      purpose: 'Combine quantitative and qualitative research strategically. Numbers find what, stories understand why. Together they make findings robust and actionable.',
      core_question: 'Are we combining quantitative (what is happening) and qualitative (why it is happening) research to get the full picture?',
      when_to_use: [
        'You need to understand user behaviour, needs, or pain points',
        'Design decisions require empirical evidence rather than assumptions',
        'You want to evaluate usability of an existing product or prototype'
      ],
      when_not_to_use: [
        'You already have strong quantitative signal from analytics',
        'Time constraints make formal research impractical'
      ]
    }
  },
  {
    id: 'five-act-interview',
    name: 'Five-Act Interview',
    version: '1.0.0',
    description: 'A structured user interview format — friendly welcome, context, prototype introduction, tasks, debrief.',
    category: 'ux_research',
    origin: {
      type: 'practitioner',
      attribution: 'Michael Margolis / Google Ventures',
      description: 'Created by Michael Margolis at Google Ventures, published as part of the Sprint methodology (2016). Structures user interviews in five acts — warm-up, context, deep-dive, retrospective, wrap-up.',
      url: 'https://library.gv.com/the-gv-research-sprint-a-4-day-process-for-answering-important-startup-questions-97279b532b25',
      year: 2016,
      license: 'published_methodology',
    },
    tags: [
      'ux_research',
      'flow'
    ],
    slots: [
      {
        label: 'Friendly Welcome',
        entityTypeId: 'interview_guide',
        description: 'Friendly Welcome phase — interview guide entities move through this stage'
      },
      {
        label: 'Context Questions',
        entityTypeId: 'research_question',
        description: 'Context Questions phase — participant entities move through this stage'
      },
      {
        label: 'Introduce Prototype',
        entityTypeId: 'prototype',
        description: 'Introduce Prototype phase — quote entities move through this stage'
      },
      {
        label: 'Tasks',
        entityTypeId: 'observation',
        description: 'Tasks phase — observation entities move through this stage'
      },
      {
        label: 'Debrief',
        entityTypeId: 'insight',
        description: 'Debrief phase — insight entities move through this stage'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'interview_guide',
            role: 'item'
          },
          {
            type: 'observation',
            role: 'leaf'
          },
          {
            type: 'insight',
            role: 'item'
          },
          {
            type: 'research_question',
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
      purpose: 'Structure user interviews in five acts: friendly intro, context questions, deep-dive, retrospective, wrap-up. Build rapport, go deep, close cleanly.',
      core_question: 'Are our interviews structured to build trust, go deep on the topic, and close with the participant feeling valued?',
      when_to_use: [
        'You need to understand user behaviour, needs, or pain points',
        'Design decisions require empirical evidence rather than assumptions',
        'You want to evaluate usability of an existing product or prototype'
      ],
      when_not_to_use: [
        'You already have strong quantitative signal from analytics',
        'Time constraints make formal research impractical'
      ]
    }
  },
  {
    id: 'research-democratisation-framework',
    name: 'Research Democratisation',
    version: '1.0.0',
    description: 'Enable non-researchers to do lightweight research — templates, training, guardrails, review.',
    category: 'ux_research',
    origin: {
      type: 'practitioner',
      year: 2019,
      description: 'Emerged from the UX research community around 2019 as demand for research exceeded researcher capacity. Provides guardrails for non-researchers to conduct lightweight research safely.',
      license: 'cc_by',
    },
    tags: [
      'ux_research',
      'collection'
    ],
    slots: [
      {
        label: 'Training',
        entityTypeId: 'tutorial',
        description: 'Training — group of research study entities'
      },
      {
        label: 'Templates',
        entityTypeId: 'interview_guide',
        description: 'Templates — group of interview guide entities'
      },
      {
        label: 'Guardrails',
        entityTypeId: 'design_guideline',
        description: 'Guardrails — group of research question entities'
      },
      {
        label: 'Review Process',
        entityTypeId: 'review_gate',
        description: 'Review Process — group of insight entities'
      },
      {
        label: 'Insight Repository',
        entityTypeId: 'insight',
        description: 'Insight Repository — group of observation entities'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'interview_guide',
            role: 'item'
          },
          {
            type: 'insight',
            role: 'item'
          },
          {
            type: 'tutorial',
            role: 'item'
          },
          {
            type: 'design_guideline',
            role: 'item'
          },
          {
            type: 'review_gate',
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
      purpose: 'Enable non-researchers to conduct basic research safely: templates, training, ethics guidelines, and quality checks. Research scales beyond the UXR team.',
      core_question: 'Can product managers and designers run lightweight research with proper guardrails, or is all research bottlenecked on the UXR team?',
      when_to_use: [
        'You need to understand user behaviour, needs, or pain points',
        'Design decisions require empirical evidence rather than assumptions',
        'You want to evaluate usability of an existing product or prototype'
      ],
      when_not_to_use: [
        'You already have strong quantitative signal from analytics',
        'Time constraints make formal research impractical'
      ]
    }
  }
]
