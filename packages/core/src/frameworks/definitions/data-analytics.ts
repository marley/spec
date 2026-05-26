/**
 * UPG Framework Definitions — Data Analytics
 * 12 frameworks for the data analytics domain.
 */

import type { UPGFramework } from '../types.js'

export const DATA_ANALYTICS_FRAMEWORKS: UPGFramework[] = [
  {
    id: 'metrics-tree',
    approach_ids: ['trace'],
    name: 'Metrics Tree',
    version: '1.0.0',
    description: 'A hierarchical decomposition of a north-star metric into driver metrics and input metrics, making it clear which levers teams can pull to move the top-level outcome.',
    category: 'data_analytics',
    origin: {
      type: 'practitioner',
      attribution: 'Amplitude/Reforge',
      description: 'Popularised by Amplitude and Reforge around 2018 as growth teams needed to decompose north star metrics into actionable component metrics and identify the highest-leverage improvement opportunities.',
      url: 'https://amplitude.com/blog/north-star-metric',
      year: 2018,
      license: 'open_attribution',
    },
    tags: [
      'data_analytics',
      'tree'
    ],
    slots: [
      {
        label: 'Metric',
        entityTypeId: 'metric',
        description: 'A measurable indicator at any level of the tree — north star at the root, driver and input metrics as children'
      },
      {
        label: 'Outcome',
        entityTypeId: 'outcome',
        description: 'The business or product outcome the north-star metric is designed to represent'
      },
      {
        label: 'Dashboard',
        entityTypeId: 'dashboard',
        description: 'Dashboard visualising the metrics tree and showing real-time progress across levels'
      },
      {
        label: 'Report',
        entityTypeId: 'report',
        description: 'Periodic report analysing movement across the tree and attributing changes to specific inputs'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'metric',
          role: 'item'
        },
        {
          type: 'outcome',
          role: 'root'
        },
        {
          type: 'dashboard',
          role: 'item'
        },
        {
          type: 'report',
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
      purpose: 'Decompose a top-level business metric into its component parts and drivers, creating a tree that shows exactly which levers move the number.',
      core_question: 'What are the component metrics that drive our north star, and which lever has the most headroom for improvement?',
      when_to_use: [
        'You need to structure your data architecture or analytics practice',
        'Data quality, governance, or accessibility is a problem',
        'You want to move from ad-hoc analysis to systematic data practices'
      ],
      when_not_to_use: [
        'The product generates minimal data that does not warrant formal practices',
        'You are in very early stage where data infrastructure is premature'
      ]
    }
  },
  {
    id: 'analytics-maturity-model',
    approach_ids: ['inspect'],
    name: 'Analytics Maturity Model',
    version: '1.0.0',
    description: 'A staged progression from descriptive to diagnostic to predictive to prescriptive analytics — helping organisations assess their current capability and chart a growth path.',
    category: 'data_analytics',
    origin: {
      type: 'practitioner',
      attribution: 'Gartner',
      description: 'Popularised by Gartner\'s analytics maturity model (2012), which defines the progression from descriptive analytics (what happened) through diagnostic, predictive, to prescriptive analytics (what should we do).',
      url: 'https://www.gartner.com/en/documents/2157415',
      year: 2012,
      license: 'open_attribution',
    },
    tags: [
      'data_analytics',
      'funnel'
    ],
    slots: [
      {
        label: 'Domain',
        entityTypeId: 'data_domain',
        description: 'Analytics capability area assessed at a specific maturity level — descriptive, diagnostic, predictive, or prescriptive'
      },
      {
        label: 'Dashboard',
        entityTypeId: 'dashboard',
        description: 'Dashboard representing the current analytics maturity — from basic reports to real-time prescriptive systems'
      },
      {
        label: 'Report',
        entityTypeId: 'report',
        description: 'Maturity assessment report documenting current state, gaps, and recommended next steps'
      },
      {
        label: 'Data Pipeline',
        entityTypeId: 'data_pipeline',
        description: 'Data infrastructure pipeline whose sophistication corresponds to the organisation\'s maturity level'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'data_domain',
          role: 'item'
        },
        {
          type: 'dashboard',
          role: 'item'
        },
        {
          type: 'report',
          role: 'item'
        },
        {
          type: 'data_pipeline',
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
      purpose: 'Assess where the organisation sits on the analytics maturity curve — from descriptive (what happened) through predictive (what will happen) to prescriptive (what should we do).',
      core_question: 'Are we still reporting what happened, or can we predict what will happen and recommend what to do about it?',
      when_to_use: [
        'You need to structure your data architecture or analytics practice',
        'Data quality, governance, or accessibility is a problem',
        'You want to move from ad-hoc analysis to systematic data practices'
      ],
      when_not_to_use: [
        'The product generates minimal data that does not warrant formal practices',
        'You are in very early stage where data infrastructure is premature'
      ]
    }
  },
  {
    id: 'kpi-dashboard-framework',
    name: 'KPI Dashboard Framework',
    version: '1.0.0',
    description: 'A design methodology for building effective analytical dashboards — organising KPIs by audience and function with clear visual hierarchy, context, and actionability.',
    category: 'data_analytics',
    origin: {
      type: 'practitioner',
      attribution: 'Stephen Few',
      description: 'Information Dashboard Design',
      url: 'https://www.perceptualedge.com/',
      year: 2006,
      license: 'open_attribution',
    },
    tags: [
      'data_analytics',
      'matrix'
    ],
    slots: [
      {
        label: 'Dashboard',
        entityTypeId: 'dashboard',
        description: 'A purpose-built dashboard designed for a specific audience — strategic, operational, or analytical'
      },
      {
        label: 'Metric',
        entityTypeId: 'metric',
        description: 'KPI displayed on the dashboard with defined target, threshold, and visual encoding'
      },
      {
        label: 'Report',
        entityTypeId: 'report',
        description: 'Drill-down report linked from a dashboard tile providing deeper context behind a KPI'
      },
      {
        label: 'Data Source',
        entityTypeId: 'data_source',
        description: 'Source system feeding real-time or batch data to the dashboard\'s KPI calculations'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'dashboard',
          role: 'bucket'
        },
        {
          type: 'metric',
          role: 'bucket'
        },
        {
          type: 'report',
          role: 'bucket'
        },
        {
          type: 'data_source',
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
      purpose: 'Design dashboards that surface the right KPIs at the right level — executive, team, individual — with clear thresholds, trends, and drill-down paths.',
      core_question: 'Does each audience level have a dashboard that answers their most important questions at a glance, with the ability to drill down?',
      when_to_use: [
        'You need to structure your data architecture or analytics practice',
        'Data quality, governance, or accessibility is a problem',
        'You want to move from ad-hoc analysis to systematic data practices'
      ],
      when_not_to_use: [
        'The product generates minimal data that does not warrant formal practices',
        'You are in very early stage where data infrastructure is premature'
      ]
    }
  }
]
