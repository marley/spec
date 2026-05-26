/**
 * UPG Framework Definitions — Customer Success
 * 10 frameworks for the customer success domain.
 *
 * Voice-of-Customer and Customer Effort Score are intentionally absent —
 * both are feedback metrics whose canonical home is the `feedback_voc`
 * category.
 */

import type { UPGFramework } from '../types.js'

export const CUSTOMER_SUCCESS_FRAMEWORKS: UPGFramework[] = [
  {
    id: 'service-blueprint',
    approach_ids: ['trace'],
    name: 'Service Blueprint',
    version: '1.0.0',
    description: 'A cross-functional map showing the customer journey alongside frontstage actions, backstage processes, and support systems — revealing how service delivery actually works end to end.',
    category: 'customer_success',
    origin: {
      type: 'practitioner',
      attribution: 'G. Lynn Shostack',
      description: 'Introduced by G. Lynn Shostack in Harvard Business Review (1984). Extended the customer journey map by adding backstage processes, support systems, and the line of visibility between customer-facing and internal activities.',
      url: 'https://hbr.org/1984/01/designing-services-that-deliver',
      year: 1984,
      license: 'open_attribution',
    },
    tags: [
      'customer_success',
      'matrix'
    ],
    slots: [
      {
        label: 'Blueprint',
        entityTypeId: 'service_blueprint',
        description: 'Complete service blueprint mapping customer actions, frontstage, backstage, and support layers'
      },
      {
        label: 'Customer Journey Stage',
        entityTypeId: 'customer_journey_stage',
        description: 'Stage in the customer\'s journey that the service blueprint row addresses — e.g. onboarding, support, renewal'
      },
      {
        label: 'Touchpoint',
        entityTypeId: 'touchpoint',
        description: 'Frontstage interaction point where the customer directly experiences the service'
      },
      {
        label: 'Playbook',
        entityTypeId: 'playbook',
        description: 'Backstage operational playbook executed behind the line of visibility to deliver the service'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'service_blueprint',
          role: 'bucket'
        },
        {
          type: 'customer_journey_stage',
          role: 'bucket'
        },
        {
          type: 'touchpoint',
          role: 'bucket'
        },
        {
          type: 'playbook',
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
      purpose: 'Map the service delivery process across customer actions, frontstage interactions, backstage processes, and support systems to find failure points and improvement opportunities.',
      core_question: 'Where in our service delivery chain do things break down — and are the failures visible to the customer or hidden backstage?',
      when_to_use: [
        'You need to reduce churn and improve customer retention',
        'Customers need structured onboarding or ongoing support',
        'You want to build a proactive customer success practice'
      ],
      when_not_to_use: [
        'The product is self-serve with no customer success function',
        'The user base is too small to justify a formal CS programme'
      ]
    }
  },
  {
    id: 'customer-health-score',
    name: 'Customer Health Score Model',
    version: '1.0.0',
    description: 'A composite scoring model combining product usage, engagement, support sentiment, contract status, and relationship signals to predict customer retention and expansion likelihood.',
    category: 'customer_success',
    origin: {
      type: 'practitioner',
      attribution: 'Gainsight',
      description: 'Popularised by Gainsight and the customer success movement starting in 2013. Health scoring combines usage, engagement, and relationship signals into a composite predictor of renewal likelihood.',
      url: 'https://www.gainsight.com/',
      year: 2013,
      license: 'open_attribution',
    },
    tags: [
      'customer_success',
      'table'
    ],
    slots: [
      {
        label: 'Health Score',
        entityTypeId: 'customer_health_score',
        description: 'Composite health score for an account combining weighted signals into a red/yellow/green status'
      },
      {
        label: 'Metric',
        entityTypeId: 'metric',
        description: 'Individual health signal — login frequency, feature adoption depth, NPS response, support ticket volume'
      },
      {
        label: 'Churn Reason',
        entityTypeId: 'churn_reason',
        description: 'Risk factor correlated with declining health scores — e.g. executive sponsor departure, low usage'
      },
      {
        label: 'Playbook',
        entityTypeId: 'playbook',
        description: 'Intervention playbook triggered when health score drops — e.g. executive outreach, adoption workshop, QBR acceleration'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'customer_health_score',
          role: 'item'
        },
        {
          type: 'metric',
          role: 'scored_item'
        },
        {
          type: 'churn_reason',
          role: 'item'
        },
        {
          type: 'playbook',
          role: 'item'
        }
      ],
      required_properties: {},
      computed_properties: [
        {
          property: 'health_score',
          expression: '(usage_score * 0.4) + (engagement_score * 0.3) + (satisfaction_score * 0.3)',
          entity_type: 'metric',
          label: 'Health Score',
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
            property: 'customer_health_score',
            label: 'Health Score',
            sortable: true
          },
          {
            property: 'metric',
            label: 'Metric',
            sortable: true
          },
          {
            property: 'churn_reason',
            label: 'Churn Reason',
            sortable: true
          },
          {
            property: 'playbook',
            label: 'Playbook',
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
      purpose: 'Combine usage data, engagement signals, and support interactions into a composite health score that predicts churn risk before the customer complains.',
      core_question: 'Which accounts show early warning signs of churn, and what intervention would move them from red to green?',
      when_to_use: [
        'You need to reduce churn and improve customer retention',
        'Customers need structured onboarding or ongoing support',
        'You want to build a proactive customer success practice'
      ],
      when_not_to_use: [
        'The product is self-serve with no customer success function',
        'The user base is too small to justify a formal CS programme'
      ]
    }
  },
  {
    id: 'onboarding-playbook',
    name: 'Onboarding Playbook',
    version: '1.0.0',
    description: 'A structured sequence of activities, milestones, and success criteria guiding new customers from contract signing through first value realisation — the most critical CS motion.',
    category: 'customer_success',
    origin: {
      type: 'practitioner',
      year: 2014,
      description: 'Evolved from customer success practice as SaaS companies recognised that time-to-value in the first 30 days is the strongest predictor of long-term retention. Formalised by CS leaders around 2014.',
      license: 'cc_by',
    },
    tags: [
      'customer_success',
      'flow'
    ],
    slots: [
      {
        label: 'Playbook',
        entityTypeId: 'playbook',
        description: 'The onboarding playbook itself — defining phases, responsibilities, timelines, and escalation paths'
      },
      {
        label: 'Success Milestone',
        entityTypeId: 'success_milestone',
        description: 'Key milestone in the onboarding journey — e.g. kickoff complete, integration live, first value delivered'
      },
      {
        label: 'Customer Journey Stage',
        entityTypeId: 'customer_journey_stage',
        description: 'Onboarding phase such as discovery, technical setup, training, go-live, or handoff to CSM'
      },
      {
        label: 'Touchpoint',
        entityTypeId: 'touchpoint',
        description: 'Scheduled interaction during onboarding — kickoff call, training session, check-in, or go-live review'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'playbook',
          role: 'item'
        },
        {
          type: 'success_milestone',
          role: 'item'
        },
        {
          type: 'customer_journey_stage',
          role: 'item'
        },
        {
          type: 'touchpoint',
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
      purpose: 'Define the step-by-step onboarding journey — milestones, touchpoints, success criteria — so every new customer reaches time-to-value consistently.',
      core_question: 'What does a new customer need to do, learn, and experience in their first 30 days to become a retained user?',
      when_to_use: [
        'You need to reduce churn and improve customer retention',
        'Customers need structured onboarding or ongoing support',
        'You want to build a proactive customer success practice'
      ],
      when_not_to_use: [
        'The product is self-serve with no customer success function',
        'The user base is too small to justify a formal CS programme'
      ]
    }
  },
  {
    id: 'churn-analysis',
    approach_ids: ['inspect', 'reflect'],
    name: 'Churn Analysis Framework',
    version: '1.0.0',
    description: 'A diagnostic framework decomposing churn into categories, root causes, and leading indicators — enabling targeted retention strategies rather than reactive firefighting.',
    category: 'customer_success',
    origin: {
      type: 'practitioner',
      description: 'Rooted in telecommunications churn prediction from the 1990s. Adapted for SaaS by the customer success community, combining quantitative churn metrics with qualitative exit interview analysis.',
      license: 'cc_by',
    },
    tags: [
      'customer_success',
      'tree'
    ],
    slots: [
      {
        label: 'Churn Reason',
        entityTypeId: 'churn_reason',
        description: 'Categorised churn driver — product-market fit, competitive loss, budget cut, poor onboarding, champion departure'
      },
      {
        label: 'Customer Health Score',
        entityTypeId: 'customer_health_score',
        description: 'Health score pattern observed in churned accounts — used to identify leading indicators of churn risk'
      },
      {
        label: 'Metric',
        entityTypeId: 'metric',
        description: 'Leading indicator metric correlated with churn — e.g. declining DAU, increasing support tickets, missed QBR'
      },
      {
        label: 'Customer Feedback',
        entityTypeId: 'customer_feedback',
        description: 'Exit interview or survey feedback from churned customers revealing true reasons for leaving'
      },
      {
        label: 'Playbook',
        entityTypeId: 'playbook',
        description: 'Retention playbook designed to address a specific churn category — e.g. re-engagement campaign, executive alignment'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'churn_reason',
          role: 'item'
        },
        {
          type: 'customer_health_score',
          role: 'item'
        },
        {
          type: 'metric',
          role: 'item'
        },
        {
          type: 'customer_feedback',
          role: 'item'
        },
        {
          type: 'playbook',
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
      purpose: 'Investigate churn patterns — who leaves, when, why, and what they do before leaving — to find systemic causes rather than treating each cancellation as an isolated event.',
      core_question: 'What are the common patterns among customers who churn, and which leading indicators predict departure early enough to intervene?',
      when_to_use: [
        'You need to reduce churn and improve customer retention',
        'Customers need structured onboarding or ongoing support',
        'You want to build a proactive customer success practice'
      ],
      when_not_to_use: [
        'The product is self-serve with no customer success function',
        'The user base is too small to justify a formal CS programme'
      ]
    }
  },
  {
    id: 'quarterly-business-review',
    name: 'QBR',
    version: '1.0.0',
    description: 'Quarterly Business Review — a structured executive meeting with the customer reviewing value delivered, product usage, strategic alignment, and forward-looking plans to deepen the partnership.',
    category: 'customer_success',
    origin: {
      type: 'practitioner',
      description: 'Standard enterprise account management practice adopted by the customer success community. QBRs provide a structured cadence for reviewing value delivered and planning next steps with key accounts.',
      license: 'cc_by',
    },
    tags: [
      'customer_success',
      'collection'
    ],
    slots: [
      {
        label: 'Milestone',
        entityTypeId: 'success_milestone',
        description: 'Milestone reviewed during the QBR — progress toward agreed outcomes, value delivered, and ROI achieved'
      },
      {
        label: 'Customer Health Score',
        entityTypeId: 'customer_health_score',
        description: 'Current health score presented to stakeholders with trend analysis and contributing factors'
      },
      {
        label: 'Metric',
        entityTypeId: 'metric',
        description: 'Key metric shared in the QBR — product adoption, feature usage, support volume, or business impact'
      },
      {
        label: 'Customer Feedback',
        entityTypeId: 'customer_feedback',
        description: 'Strategic feedback captured during the QBR — executive priorities, upcoming changes, or unmet needs'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'success_milestone',
          role: 'item'
        },
        {
          type: 'customer_health_score',
          role: 'item'
        },
        {
          type: 'metric',
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
      purpose: 'Conduct a structured review with key accounts — results achieved, value delivered, upcoming goals, expansion opportunities — to strengthen the partnership and identify growth.',
      core_question: 'What value have we delivered this quarter, what does the customer want next, and where is the expansion opportunity?',
      when_to_use: [
        'You need to reduce churn and improve customer retention',
        'Customers need structured onboarding or ongoing support',
        'You want to build a proactive customer success practice'
      ],
      when_not_to_use: [
        'The product is self-serve with no customer success function',
        'The user base is too small to justify a formal CS programme'
      ]
    }
  },
]
