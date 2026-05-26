/**
 * UPG Framework Definitions — Metrics
 * 3 frameworks for the metrics domain.
 */

import type { UPGFramework } from '../types.js'

export const METRICS_FRAMEWORKS: UPGFramework[] = [
  {
    id: 'dora-metrics',
    name: 'DORA Metrics',
    version: '1.0.0',
    description: 'Four key metrics for software delivery performance: deployment frequency, lead time, change failure rate, and time to restore.',
    category: 'metrics',
    origin: {
      type: 'practitioner',
      attribution: 'DORA Team (Google Cloud)',
      description: 'From Accelerate: The Science of Lean Software (IT Revolution Press). Based on 6 years of State of DevOps research.',
      url: 'https://dora.dev/',
      year: 2018,
      license: 'open_attribution',
    },
    tags: [
      'metrics',
      'collection'
    ],
    slots: [
      {
        label: 'Deployment Frequency',
        entityTypeId: 'metric',
        description: 'How often you deploy to production'
      },
      {
        label: 'Lead Time for Changes',
        entityTypeId: 'metric',
        description: 'Time from commit to production'
      },
      {
        label: 'Change Failure Rate',
        entityTypeId: 'metric',
        description: 'Percentage of deployments causing failures'
      },
      {
        label: 'Time to Restore',
        entityTypeId: 'metric',
        description: 'How long to recover from a failure'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'metric',
            role: 'item'
          }
        ],
      required_properties: {},
      computed_properties: [
        {
          property: 'stability_index',
          expression: 'change_failure_rate * mean_time_to_recovery',
          entity_type: 'metric',
          label: 'Stability Index',
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
      purpose: 'Measure software delivery performance through four key metrics that predict both speed and stability, enabling data-driven engineering improvement.',
      core_question: 'How fast and how safely is our team shipping software, and where are the bottlenecks?',
      when_to_use: [
        'You need to define what success looks like for your product or team',
        'Teams are optimising for different metrics that may conflict',
        'You want to move from vanity metrics to actionable measurements'
      ],
      when_not_to_use: [
        'You lack the data infrastructure to track metrics reliably',
        'The product is too early for meaningful quantitative measurement'
      ]
    }
  },
  {
    id: 'heart-framework',
    name: 'HEART Framework',
    version: '1.0.0',
    description: 'Measure user experience across five dimensions: Happiness, Engagement, Adoption, Retention, and Task success.',
    category: 'metrics',
    origin: {
      type: 'practitioner',
      attribution: 'Google (Kerry Rodden)',
      description: 'Developed at Google to measure user experience at scale. Published as a CHI 2010 conference paper.',
      url: 'https://research.google/pubs/pub36299/',
      year: 2010,
      license: 'open_attribution',
    },
    tags: [
      'metrics',
      'table'
    ],
    slots: [
      {
        label: 'Happiness',
        entityTypeId: 'metric',
        description: 'Satisfaction, NPS, ease-of-use ratings'
      },
      {
        label: 'Engagement',
        entityTypeId: 'metric',
        description: 'Session depth, frequency, intensity'
      },
      {
        label: 'Adoption',
        entityTypeId: 'metric',
        description: 'New users, feature adoption rates'
      },
      {
        label: 'Retention',
        entityTypeId: 'metric',
        description: 'Churn rate, returning users'
      },
      {
        label: 'Task Success',
        entityTypeId: 'metric',
        description: 'Completion rate, time-on-task, errors'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'metric',
            role: 'scored_item'
          }
        ],
      required_properties: {},
      computed_properties: [
        {
          property: 'heart_index',
          expression: '(happiness + engagement + adoption + retention + task_success) / 5',
          entity_type: 'metric',
          label: 'HEART Index',
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
            label: 'Metric',
            sortable: true
          },
          {
            property: 'happiness',
            label: 'Happiness',
            sortable: true
          },
          {
            property: 'engagement',
            label: 'Engagement',
            sortable: true
          },
          {
            property: 'adoption',
            label: 'Adoption',
            sortable: true
          },
          {
            property: 'retention',
            label: 'Retention',
            sortable: true
          },
          {
            property: 'task_success',
            label: 'Task Success',
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
      purpose: 'Evaluate user experience quality across five dimensions (Happiness, Engagement, Adoption, Retention, Task success). Product teams get a balanced UX scorecard.',
      core_question: 'Beyond feature shipping, how is the actual user experience performing across satisfaction, engagement, and retention?',
      when_to_use: [
        'You need to define what success looks like for your product or team',
        'Teams are optimising for different metrics that may conflict',
        'You want to move from vanity metrics to actionable measurements'
      ],
      when_not_to_use: [
        'You lack the data infrastructure to track metrics reliably',
        'The product is too early for meaningful quantitative measurement'
      ]
    }
  },
  {
    id: 'north-star-metric',
    name: 'North Star Metric',
    version: '1.0.0',
    description: 'One metric that best captures the core value you deliver. Supported by 3-5 input metrics that drive it.',
    category: 'metrics',
    origin: {
      type: 'practitioner',
      attribution: 'Sean Ellis / Amplitude',
      description: 'Popularised by Sean Ellis (Hacking Growth) and Amplitude. One metric that captures the core value you deliver.',
      url: 'https://amplitude.com/blog/north-star-metric',
      year: 2017,
      license: 'open_attribution',
    },
    tags: [
      'metrics',
      'collection'
    ],
    slots: [
      {
        label: 'North Star',
        entityTypeId: 'metric',
        description: 'The single metric reflecting core value delivered'
      },
      {
        label: 'Input Metric 1',
        entityTypeId: 'metric',
        description: 'A driver metric you can directly influence'
      },
      {
        label: 'Input Metric 2',
        entityTypeId: 'metric',
        description: 'A driver metric you can directly influence'
      },
      {
        label: 'Input Metric 3',
        entityTypeId: 'metric',
        description: 'A driver metric you can directly influence'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'metric',
            role: 'item'
          }
        ],
      required_properties: {},
      computed_properties: [
        {
          property: 'nsm_impact',
          expression: 'input_metric_value * leverage',
          entity_type: 'metric',
          label: 'NSM Impact',
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
      purpose: 'Identify the single metric that best captures the core value your product delivers to customers, aligning the entire organisation around sustainable growth.',
      core_question: 'What one metric, if it grows, proves we are delivering more value to more customers over time?',
      when_to_use: [
        'You need to define what success looks like for your product or team',
        'Teams are optimising for different metrics that may conflict',
        'You want to move from vanity metrics to actionable measurements'
      ],
      when_not_to_use: [
        'You lack the data infrastructure to track metrics reliably',
        'The product is too early for meaningful quantitative measurement'
      ]
    }
  }
]
