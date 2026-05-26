/**
 * UPG Framework Definitions — Business Model
 * 2 frameworks for the business model domain.
 */

import type { UPGFramework } from '../types.js'

export const BUSINESS_MODEL_FRAMEWORKS: UPGFramework[] = [
  {
    id: 'business-model-canvas',
    name: 'Business Model Canvas',
    version: '1.0.0',
    description: 'Nine building blocks that describe how an organisation creates, delivers, and captures value.',
    category: 'business_model',
    origin: {
      type: 'practitioner',
      attribution: 'Alexander Osterwalder & Yves Pigneur',
      description: 'Published in Business Model Generation (Wiley). The most widely used business model framework in the world.',
      url: 'https://www.strategyzer.com/business-model-canvas',
      year: 2010,
      license: 'published_methodology',
    },
    tags: [
      'business_model',
      'matrix'
    ],
    slots: [
      {
        label: 'Key Partners',
        entityTypeId: 'partnership',
        description: 'Who are your key partners and suppliers?'
      },
      {
        label: 'Key Activities',
        entityTypeId: 'key_activity',
        description: 'What key activities does your value prop require?'
      },
      {
        label: 'Value Propositions',
        entityTypeId: 'value_proposition',
        description: 'What value do you deliver to the customer?'
      },
      {
        label: 'Customer Relationships',
        entityTypeId: 'customer_relationship',
        description: 'What type of relationship does each segment expect?'
      },
      {
        label: 'Customer Segments',
        entityTypeId: 'market_segment',
        description: 'For whom are you creating value?'
      },
      {
        label: 'Key Resources',
        entityTypeId: 'key_resource',
        description: 'What key resources does your value prop require?'
      },
      {
        label: 'Channels',
        entityTypeId: 'distribution_channel',
        description: 'How do you reach your customer segments?'
      },
      {
        label: 'Cost Structure',
        entityTypeId: 'cost_structure',
        description: 'What are the most important costs?'
      },
      {
        label: 'Revenue Streams',
        entityTypeId: 'revenue_stream',
        description: 'For what value are customers willing to pay?'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'partnership',
            role: 'bucket'
          },
          {
            type: 'key_activity',
            role: 'bucket'
          },
          {
            type: 'value_proposition',
            role: 'bucket'
          },
          {
            type: 'customer_relationship',
            role: 'bucket'
          },
          {
            type: 'key_resource',
            role: 'bucket'
          },
          {
            type: 'distribution_channel',
            role: 'bucket'
          },
          {
            type: 'cost_structure',
            role: 'bucket'
          },
          {
            type: 'revenue_stream',
            role: 'bucket'
          },
          {
            type: 'market_segment',
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
        rows: 3,
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
      purpose: 'Map all nine building blocks of a business model so teams see how value creation, delivery, and capture connect end-to-end.',
      core_question: 'How does our organisation create, deliver, and capture value — and where are the dependencies between those activities?',
      when_to_use: [
        'You are designing or redesigning how the business creates and captures value',
        'You need to communicate the business model to stakeholders or investors',
        'You want to identify risks and assumptions in your business model'
      ],
      when_not_to_use: [
        'The business model is mature and well-understood by all stakeholders',
        'You are focused on tactical execution rather than model design'
      ]
    }
  },
  {
    id: 'lean-canvas',
    name: 'Lean Canvas',
    version: '1.0.0',
    description: 'Startup-focused adaptation of the BMC. Replaces partners/resources with problem/solution/unfair advantage.',
    category: 'business_model',
    origin: {
      type: 'practitioner',
      attribution: 'Ash Maurya',
      description: 'Adapted from BMC for startups. Published in Running Lean (O\'Reilly). Replaces partners/resources with problem/solution.',
      url: 'https://leanstack.com/lean-canvas',
      year: 2012,
      license: 'published_methodology',
    },
    tags: [
      'business_model',
      'matrix'
    ],
    slots: [
      {
        label: 'Problem',
        entityTypeId: 'need',
        description: 'Top 3 problems your customers face'
      },
      {
        label: 'Solution',
        entityTypeId: 'solution',
        description: 'Top 3 features addressing each problem'
      },
      {
        label: 'Key Metrics',
        entityTypeId: 'metric',
        description: 'Key numbers that tell you how your business is doing'
      },
      {
        label: 'Unique Value Prop',
        entityTypeId: 'value_proposition',
        description: 'Single, clear, compelling message'
      },
      {
        label: 'Unfair Advantage',
        entityTypeId: 'capability',
        description: 'Something that cannot be easily copied'
      },
      {
        label: 'Channels',
        entityTypeId: 'acquisition_channel',
        description: 'Path to customers'
      },
      {
        label: 'Customer Segments',
        entityTypeId: 'persona',
        description: 'Target customers'
      },
      {
        label: 'Existing Alternatives',
        entityTypeId: 'competitor',
        description: 'What do customers use today?'
      },
      {
        label: 'Early Adopters',
        entityTypeId: 'behavioral_segment',
        description: 'Your first target customers'
      },
      {
        label: 'Cost Structure',
        entityTypeId: 'cost_structure',
        description: 'Customer acquisition costs, hosting, etc.'
      },
      {
        label: 'Revenue Streams',
        entityTypeId: 'revenue_stream',
        description: 'Revenue model, lifetime value, margins'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'need',
            role: 'bucket'
          },
          {
            type: 'solution',
            role: 'bucket'
          },
          {
            type: 'value_proposition',
            role: 'bucket'
          },
          {
            type: 'competitor',
            role: 'bucket'
          },
          {
            type: 'persona',
            role: 'bucket'
          },
          {
            type: 'behavioral_segment',
            role: 'bucket'
          },
          {
            type: 'metric',
            role: 'bucket'
          },
          {
            type: 'acquisition_channel',
            role: 'bucket'
          },
          {
            type: 'cost_structure',
            role: 'bucket'
          },
          {
            type: 'revenue_stream',
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
        rows: 3,
        cols: 4
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
      purpose: 'Capture an entire business model hypothesis on a single page so founders can test assumptions rapidly without writing a full business plan.',
      core_question: 'What are the riskiest assumptions in our business model, and how can we test them quickly?',
      when_to_use: [
        'You are designing or redesigning how the business creates and captures value',
        'You need to communicate the business model to stakeholders or investors',
        'You want to identify risks and assumptions in your business model'
      ],
      when_not_to_use: [
        'The business model is mature and well-understood by all stakeholders',
        'You are focused on tactical execution rather than model design'
      ]
    }
  }
]
