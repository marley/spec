/**
 * UPG Framework Definitions — Devops
 * 3 frameworks for the devops domain.
 */

import type { UPGFramework } from '../types.js'

export const DEVOPS_FRAMEWORKS: UPGFramework[] = [
  {
    id: 'slo-workshop',
    name: 'SLO Workshop',
    version: '1.0.0',
    description: 'Structured process for defining meaningful Service Level Objectives. Walk through user journeys, identify critical interactions, select SLIs, set targets, and define consequences.',
    category: 'devops',
    origin: {
      type: 'practitioner',
      attribution: 'Alex Hidalgo',
      description: 'Formalised by Alex Hidalgo in "Implementing Service Level Objectives" (2020). The workshop format helps teams collaboratively define SLOs that reflect user expectations rather than engineering convenience.',
      url: 'https://www.alex-hidalgo.com/the-slo-book',
      year: 2020,
      license: 'open_attribution',
    },
    tags: [
      'devops',
      'table'
    ],
    slots: [
      {
        label: 'User Journey',
        entityTypeId: 'service_level_objective',
        description: 'Critical user-facing flow'
      },
      {
        label: 'SLI',
        entityTypeId: 'service_level_indicator',
        description: 'What to measure (latency, availability, correctness)'
      },
      {
        label: 'SLO Target',
        entityTypeId: 'error_budget',
        description: 'e.g., 99.9% of requests < 200ms'
      },
      {
        label: 'Measurement Window',
        entityTypeId: 'monitor',
        description: 'Rolling 28 days, calendar month'
      },
      {
        label: 'Consequence',
        entityTypeId: 'alert_rule',
        description: 'What happens when SLO is breached'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'service_level_objective',
          role: 'item'
        },
        {
          type: 'service_level_indicator',
          role: 'item'
        },
        {
          type: 'error_budget',
          role: 'item'
        },
        {
          type: 'monitor',
          role: 'item'
        },
        {
          type: 'alert_rule',
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
            property: 'service_level_objective',
            label: 'User Journey',
            sortable: true
          },
          {
            property: 'service_level_indicator',
            label: 'SLI',
            sortable: true
          },
          {
            property: 'error_budget',
            label: 'SLO Target',
            sortable: true
          },
          {
            property: 'monitor',
            label: 'Measurement Window',
            sortable: true
          },
          {
            property: 'alert_rule',
            label: 'Consequence',
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
      purpose: 'Collaboratively define Service Level Objectives with stakeholders — what to measure, what target to set, what consequences follow when targets are missed.',
      core_question: 'What level of reliability do our users actually need, and are our SLOs set based on user impact rather than engineering convenience?',
      when_to_use: [
        'You need to improve deployment reliability, speed, or observability',
        'The team is experiencing production incidents or slow release cycles',
        'You want to establish or improve infrastructure practices'
      ],
      when_not_to_use: [
        'The product has not yet reached a stage where operational maturity matters',
        'You are in early development with infrequent deployments'
      ]
    }
  },
  {
    id: 'observability-three-pillars',
    name: 'Observability Three Pillars',
    version: '1.0.0',
    description: 'The three pillars of observability: logs (discrete events), metrics (aggregated measurements), and traces (distributed request flows). Together they enable understanding of system behaviour.',
    category: 'devops',
    origin: {
      type: 'practitioner',
      year: 2018,
      description: 'Synthesised from distributed systems monitoring practice around 2018, influenced by Cindy Sridharan\'s "Distributed Systems Observability" and the OpenTelemetry project. The three pillars (logs, metrics, traces) provide complementary views of system behaviour.',
      license: 'cc_by',
    },
    tags: [
      'devops',
      'collection'
    ],
    slots: [
      {
        label: 'Logs',
        entityTypeId: 'monitor',
        description: 'Structured, contextual event records'
      },
      {
        label: 'Metrics',
        entityTypeId: 'service_level_indicator',
        description: 'Aggregated numerical measurements over time'
      },
      {
        label: 'Traces',
        entityTypeId: 'monitor',
        description: 'Distributed request flow across services'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'monitor',
            role: 'item'
          },
          {
            type: 'service_level_indicator',
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
      purpose: 'Implement the three pillars of observability — logs, metrics, traces — in a coordinated way so teams can understand system behaviour from any entry point.',
      core_question: 'When something goes wrong, can we go from an alert to root cause using our logs, metrics, and traces without guessing?',
      when_to_use: [
        'You need to improve deployment reliability, speed, or observability',
        'The team is experiencing production incidents or slow release cycles',
        'You want to establish or improve infrastructure practices'
      ],
      when_not_to_use: [
        'The product has not yet reached a stage where operational maturity matters',
        'You are in early development with infrequent deployments'
      ]
    }
  },
  {
    id: 'blameless-postmortem',
    approach_ids: ['inspect', 'reflect'],
    name: 'Blameless Postmortem',
    version: '1.0.0',
    description: 'A learning-focused incident review that examines what happened, why, and how to prevent recurrence — without assigning individual blame. Focus on systems, not people.',
    category: 'devops',
    origin: {
      type: 'practitioner',
      attribution: 'John Allspaw / Etsy',
      description: 'Adopted from aviation and healthcare safety culture, popularised in tech by John Allspaw at Etsy (2012). The blameless approach focuses on systemic factors rather than individual fault, encouraging honest incident reporting.',
      url: 'https://www.etsy.com/codeascraft/blameless-postmortems/',
      year: 2012,
      license: 'open_attribution',
    },
    tags: [
      'devops',
      'matrix'
    ],
    slots: [
      {
        label: 'Incident Summary',
        entityTypeId: 'postmortem',
        description: 'What happened, severity, duration, impact'
      },
      {
        label: 'Timeline',
        entityTypeId: 'incident',
        description: 'Chronological sequence of events'
      },
      {
        label: 'Root Cause',
        entityTypeId: 'root_cause',
        description: 'Contributing factors — not a single person'
      },
      {
        label: 'What Went Well',
        entityTypeId: 'decision',
        description: 'Effective responses and safeguards'
      },
      {
        label: 'What Went Wrong',
        entityTypeId: 'postmortem',
        description: 'Process gaps and system weaknesses'
      },
      {
        label: 'Action Items',
        entityTypeId: 'task',
        description: 'Concrete follow-ups with owners and deadlines'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'postmortem',
            role: 'bucket'
          },
          {
            type: 'incident',
            role: 'bucket'
          },
          {
            type: 'runbook',
            role: 'bucket'
          },
          {
            type: 'decision',
            role: 'bucket'
          },
          {
            type: 'root_cause',
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
      purpose: 'Analyse incidents without assigning blame, focusing on systemic causes and preventive actions so the organisation learns from failure instead of hiding it.',
      core_question: 'What conditions in our system allowed this incident to happen, and what safeguards would prevent it from recurring?',
      when_to_use: [
        'You need to improve deployment reliability, speed, or observability',
        'The team is experiencing production incidents or slow release cycles',
        'You want to establish or improve infrastructure practices'
      ],
      when_not_to_use: [
        'The product has not yet reached a stage where operational maturity matters',
        'You are in early development with infrequent deployments'
      ]
    }
  }
]
