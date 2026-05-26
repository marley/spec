/**
 * UPG Framework Definitions — Partnerships
 * 7 frameworks for the partnerships domain.
 */

import type { UPGFramework } from '../types.js'

export const PARTNERSHIPS_FRAMEWORKS: UPGFramework[] = [
  {
    id: 'marketplace-flywheel',
    name: 'Marketplace Flywheel',
    version: '1.0.0',
    description: 'A self-reinforcing growth loop where more sellers attract more buyers, which attracts more sellers — with network effects creating a defensible moat as the marketplace achieves liquidity.',
    category: 'partnerships',
    origin: {
      type: 'practitioner',
      attribution: 'Jeff Bezos / Amazon',
      description: 'Famously drawn by Jeff Bezos on a napkin (reportedly around 2001). The flywheel describes the self-reinforcing dynamics of Amazon\'s marketplace — lower prices attract customers, which attracts sellers, which increases selection.',
      year: 2001,
      license: 'open_attribution',
    },
    tags: [
      'partnerships',
      'flow'
    ],
    slots: [
      {
        label: 'Listing',
        entityTypeId: 'marketplace_listing',
        description: 'Listing on the marketplace — app, integration, or service that adds supply and attracts buyers'
      },
      {
        label: 'Partner Program',
        entityTypeId: 'partner_program',
        description: 'Programme accelerating the flywheel — onboarding partners, reducing listing friction, and driving discovery'
      },
      {
        label: 'Integration Partner',
        entityTypeId: 'integration_partner',
        description: 'Partner building on the platform — their presence strengthens the flywheel through added supply and use cases'
      },
      {
        label: 'Developer Portal',
        entityTypeId: 'developer_portal',
        description: 'Developer portal enabling partners to build marketplace listings — APIs, SDKs, documentation, and sandbox'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'marketplace_listing',
          role: 'item'
        },
        {
          type: 'partner_program',
          role: 'item'
        },
        {
          type: 'integration_partner',
          role: 'item'
        },
        {
          type: 'developer_portal',
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
      purpose: 'Design the self-reinforcing dynamics of a two-sided marketplace — more supply attracts demand, more demand attracts supply — and identify which side to seed first.',
      core_question: 'Which side of our marketplace should we invest in first, and what is the flywheel that makes each side attract the other?',
      when_to_use: [
        'You are building or evaluating strategic partnerships or ecosystems',
        'You need to structure partner programmes and relationships',
        'You want to leverage partnerships as a growth or distribution channel'
      ],
      when_not_to_use: [
        'The product operates independently with no partner dependencies',
        'Partnerships would create complexity without proportionate value'
      ]
    }
  },
  {
    id: 'developer-experience-framework',
    name: 'Developer Experience Framework',
    version: '1.0.0',
    description: 'A framework for measuring and improving developer experience across dimensions — documentation quality, time-to-first-API-call, SDK ergonomics, error messages, and community support.',
    category: 'partnerships',
    origin: {
      type: 'practitioner',
      year: 2019,
      description: 'Formalised by the developer relations community around 2019 as API-first companies recognised that developer experience is the product. Evaluates documentation, SDKs, onboarding, and support.',
      license: 'cc_by',
    },
    tags: [
      'partnerships',
      'matrix'
    ],
    slots: [
      {
        label: 'Portal',
        entityTypeId: 'developer_portal',
        description: 'Developer portal assessed on DX dimensions — docs completeness, onboarding flow, interactive examples, and search'
      },
      {
        label: 'API Ecosystem',
        entityTypeId: 'api_ecosystem',
        description: 'API evaluated for developer experience — naming consistency, error clarity, pagination, and versioning strategy'
      },
      {
        label: 'Marketplace Listing',
        entityTypeId: 'marketplace_listing',
        description: 'Developer-built app or integration whose creation experience reveals DX friction points and improvement opportunities'
      },
      {
        label: 'Integration Partner',
        entityTypeId: 'integration_partner',
        description: 'Partner whose onboarding journey is tracked to measure real-world DX — time to integrate, support tickets, and feedback'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'developer_portal',
          role: 'bucket'
        },
        {
          type: 'api_ecosystem',
          role: 'bucket'
        },
        {
          type: 'marketplace_listing',
          role: 'bucket'
        },
        {
          type: 'integration_partner',
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
      purpose: 'Evaluate and improve the developer experience — documentation, SDKs, onboarding, support — because developer adoption is won or lost in the first hour.',
      core_question: 'Can a developer go from zero to a working integration in under an hour, and where in that journey do they get stuck?',
      when_to_use: [
        'You are building or evaluating strategic partnerships or ecosystems',
        'You need to structure partner programmes and relationships',
        'You want to leverage partnerships as a growth or distribution channel'
      ],
      when_not_to_use: [
        'The product operates independently with no partner dependencies',
        'Partnerships would create complexity without proportionate value'
      ]
    }
  },
  {
    id: 'ecosystem-value-chain',
    approach_ids: ['trace'],
    name: 'Ecosystem Value Chain',
    version: '1.0.0',
    description: 'A mapping of how value flows through the partner ecosystem — from platform capabilities through partner services to end-customer outcomes — revealing where value is created, captured, and exchanged.',
    category: 'partnerships',
    origin: {
      type: 'practitioner',
      year: 2015,
      description: 'Adapts Michael Porter\'s value chain analysis for platform and ecosystem businesses. Maps how value flows through the ecosystem to identify where value is created, captured, and leaked.',
      license: 'cc_by',
    },
    tags: [
      'partnerships',
      'flow'
    ],
    slots: [
      {
        label: 'Program',
        entityTypeId: 'partner_program',
        description: 'Programme orchestrating value flow — enabling partners to create, deliver, and capture value in the ecosystem'
      },
      {
        label: 'Integration Partner',
        entityTypeId: 'integration_partner',
        description: 'Partner adding value at a specific point in the chain — implementation, extension, support, or resale'
      },
      {
        label: 'Partner Revenue Share',
        entityTypeId: 'partner_revenue_share',
        description: 'Value capture mechanism — how revenue, margin, or value is shared between platform and partners at each stage'
      },
      {
        label: 'Marketplace Listing',
        entityTypeId: 'marketplace_listing',
        description: 'Marketplace offering where value is packaged and delivered to end customers — the point of value realisation'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'partner_program',
          role: 'item'
        },
        {
          type: 'integration_partner',
          role: 'item'
        },
        {
          type: 'partner_revenue_share',
          role: 'item'
        },
        {
          type: 'marketplace_listing',
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
      purpose: 'Map how value flows through the partner ecosystem — from end-customer through partners to your platform — to find where value is created, captured, and leaked.',
      core_question: 'Where in our ecosystem is value created, who captures it, and where are partners or customers losing value they should be gaining?',
      when_to_use: [
        'You are building or evaluating strategic partnerships or ecosystems',
        'You need to structure partner programmes and relationships',
        'You want to leverage partnerships as a growth or distribution channel'
      ],
      when_not_to_use: [
        'The product operates independently with no partner dependencies',
        'Partnerships would create complexity without proportionate value'
      ]
    }
  },
]
