/**
 * UPG Framework Definitions — Engineering
 * 11 frameworks for the engineering domain.
 */

import type { UPGFramework } from '../types.js'

export const ENGINEERING_FRAMEWORKS: UPGFramework[] = [
  {
    id: 'adr-log',
    name: 'ADR Log',
    version: '1.0.0',
    description: 'Architecture Decision Records: log decisions with context, options, and rationale.',
    category: 'engineering',
    origin: {
      type: 'practitioner',
      attribution: 'Michael Nygard',
      description: 'Proposed by Michael Nygard in 2011 as \"Architecture Decision Records\". The lightweight template (Title, Status, Context, Decision, Consequences) has become a standard practice in software teams.',
      url: 'https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions',
      year: 2011,
      license: 'published_methodology',
    },
    tags: [
      'engineering',
      'table'
    ],
    slots: [
      {
        label: 'Decision',
        entityTypeId: 'decision',
        description: 'Decision — decision entries to evaluate'
      },
      {
        label: 'Context',
        entityTypeId: 'bounded_context',
        description: 'Context — bounded context entries to evaluate'
      },
      {
        label: 'Options Considered',
        entityTypeId: 'solution',
        description: 'Options Considered — solution entries to evaluate'
      },
      {
        label: 'Consequences',
        entityTypeId: 'outcome',
        description: 'Consequences — outcome entries to evaluate'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'decision',
            role: 'item'
          },
          {
            type: 'bounded_context',
            role: 'item'
          },
          {
            type: 'solution',
            role: 'item'
          },
          {
            type: 'outcome',
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
            label: 'Decision',
            sortable: true
          },
          {
            property: 'title',
            label: 'Context',
            sortable: true
          },
          {
            property: 'description',
            label: 'Options Considered',
          },
          {
            property: 'description',
            label: 'Consequences',
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
      purpose: 'Record architectural decisions as lightweight, immutable documents (Context, Decision, Consequences). Future teams understand why the system is the way it is.',
      core_question: 'Why was this architectural decision made, what alternatives were considered, and what consequences did we accept?',
      when_to_use: [
        'You need to structure complex technical decisions or architecture',
        'The engineering team needs alignment on technical approach',
        'You want to evaluate or improve engineering practices'
      ],
      when_not_to_use: [
        'The technical solution is straightforward and well-understood',
        'You are building a throwaway prototype where architecture does not matter'
      ]
    }
  },
  {
    id: 'tech-radar',
    name: 'Tech Radar',
    version: '1.0.0',
    description: 'Assess technologies across 4 rings: Adopt, Trial, Assess, Hold.',
    category: 'engineering',
    origin: {
      type: 'practitioner',
      attribution: 'ThoughtWorks',
      description: 'Pioneered by ThoughtWorks in 2010 as the Technology Radar, published biannually. The four-ring model (Adopt, Trial, Assess, Hold) has been adopted by hundreds of engineering organisations for internal technology governance.',
      url: 'https://www.thoughtworks.com/radar',
      year: 2010,
      license: 'open_attribution',
    },
    tags: [
      'engineering',
      'quadrant'
    ],
    slots: [
      {
        label: 'Adopt',
        entityTypeId: 'service',
        description: 'Technologies to use by default'
      },
      {
        label: 'Trial',
        entityTypeId: 'library_dependency',
        description: 'Worth trying in a project'
      },
      {
        label: 'Assess',
        entityTypeId: 'library_dependency',
        description: 'Explore and understand'
      },
      {
        label: 'Hold',
        entityTypeId: 'technical_debt_item',
        description: 'Proceed with caution'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'service',
            role: 'item'
          },
          {
            type: 'technical_debt_item',
            role: 'item'
          },
          {
            type: 'library_dependency',
            role: 'item'
          }
        ],
      required_properties: {}
    },
    structure: {
      pattern: 'quadrant'
    },
    presentation: {
      layout: {
        type: 'quadrant',
        x_axis: 'impact',
        y_axis: 'effort',
        x_label: 'Adopt',
        y_label: 'Trial'
      },
      colour_by: 'group',
      card_fields: [
        'title',
        'description'
      ]
    },
    education: {
      purpose: 'Classify technologies into Adopt, Trial, Assess, Hold rings so engineering teams make consistent technology choices and avoid fragmentation.',
      core_question: 'Which technologies should we standardise on, which should we experiment with, and which should we phase out?',
      when_to_use: [
        'You need to structure complex technical decisions or architecture',
        'The engineering team needs alignment on technical approach',
        'You want to evaluate or improve engineering practices'
      ],
      when_not_to_use: [
        'The technical solution is straightforward and well-understood',
        'You are building a throwaway prototype where architecture does not matter'
      ]
    }
  },
  {
    id: 'dependency-map',
    approach_ids: ['trace'],
    name: 'Dependency Map',
    version: '1.0.0',
    description: 'Visualise service dependencies and data flows between bounded contexts.',
    category: 'engineering',
    origin: {
      type: 'practitioner',
      attribution: 'Domain-Driven Design community',
      description: 'Rooted in DDD. Maps how services depend on each other through contracts and events.',
      license: 'cc_by',
    },
    tags: [
      'engineering',
      'flow'
    ],
    slots: [
      {
        label: 'Service',
        entityTypeId: 'service',
        description: 'Service phase — service entities move through this stage'
      },
      {
        label: 'Bounded Context',
        entityTypeId: 'bounded_context',
        description: 'Bounded Context phase — bounded context entities move through this stage'
      },
      {
        label: 'API Contract',
        entityTypeId: 'api_contract',
        description: 'API Contract phase — api contract entities move through this stage'
      },
      {
        label: 'Domain Event',
        entityTypeId: 'domain_event',
        description: 'Domain Event phase — domain event entities move through this stage'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'service',
          role: 'item'
        },
        {
          type: 'bounded_context',
          role: 'item'
        },
        {
          type: 'api_contract',
          role: 'item'
        },
        {
          type: 'domain_event',
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
      purpose: 'Visualise runtime and build-time dependencies between services, libraries, and teams to identify fragile coupling and single points of failure.',
      core_question: 'Which services depend on which, where are the single points of failure, and what breaks if this dependency goes down?',
      when_to_use: [
        'You need to structure complex technical decisions or architecture',
        'The engineering team needs alignment on technical approach',
        'You want to evaluate or improve engineering practices'
      ],
      when_not_to_use: [
        'The technical solution is straightforward and well-understood',
        'You are building a throwaway prototype where architecture does not matter'
      ]
    }
  },
  {
    id: 'tech-debt-tracker',
    approach_ids: ['inspect'],
    name: 'Tech Debt Tracker',
    version: '1.0.0',
    description: 'Track and prioritise technical debt items by impact and effort to resolve.',
    category: 'engineering',
    origin: {
      type: 'practitioner',
      description: 'Standard engineering practice. Term coined by Ward Cunningham in 1992.',
      year: 1992,
      license: 'cc_by',
    },
    tags: [
      'engineering',
      'table'
    ],
    slots: [
      {
        label: 'Debt Item',
        entityTypeId: 'technical_debt_item',
        description: 'Debt Item — technical debt item entries to evaluate'
      },
      {
        label: 'Affected Service',
        entityTypeId: 'service',
        description: 'Affected Service — service entries to evaluate'
      },
      {
        label: 'Impact',
        entityTypeId: 'metric',
        description: 'How much does this slow the team?'
      },
      {
        label: 'Resolution',
        entityTypeId: 'task',
        description: 'What work resolves this debt?'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'technical_debt_item',
            role: 'item'
          },
          {
            type: 'service',
            role: 'item'
          },
          {
            type: 'metric',
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
      pattern: 'table'
    },
    presentation: {
      layout: {
        type: 'table',
        columns: [
          {
            property: 'title',
            label: 'Debt Item',
            sortable: true
          },
          {
            property: 'title',
            label: 'Affected Service',
            sortable: true
          },
          {
            property: 'description',
            label: 'Impact',
          },
          {
            property: 'status',
            label: 'Resolution',
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
      purpose: 'Classify and quantify technical debt so teams can make informed trade-offs between new features and paying down debt before it compounds.',
      core_question: 'Where is our technical debt concentrated, what is its carrying cost, and which items should we pay down before they block critical work?',
      when_to_use: [
        'You need to structure complex technical decisions or architecture',
        'The engineering team needs alignment on technical approach',
        'You want to evaluate or improve engineering practices'
      ],
      when_not_to_use: [
        'The technical solution is straightforward and well-understood',
        'You are building a throwaway prototype where architecture does not matter'
      ]
    }
  },
  {
    id: 'c4-model',
    name: 'C4 Model',
    version: '1.0.0',
    description: 'Visualise software architecture at four levels of abstraction: System Context, Container, Component, and Code. Each level zooms in to reveal more detail.',
    category: 'engineering',
    origin: {
      type: 'practitioner',
      attribution: 'Simon Brown',
      description: 'Created by Simon Brown. The C4 model addresses the chaos of ad-hoc architecture diagrams by defining four standard levels of abstraction, each with clear rules about what to include and exclude.',
      url: 'https://c4model.com',
      year: 2011,
      license: 'published_methodology',
    },
    tags: [
      'engineering',
      'tree'
    ],
    slots: [
      {
        label: 'System Context',
        entityTypeId: 'bounded_context',
        description: 'The system and its external actors'
      },
      {
        label: 'Containers',
        entityTypeId: 'service',
        description: 'Applications, data stores, microservices'
      },
      {
        label: 'Components',
        entityTypeId: 'code_repository',
        description: 'Major structural building blocks inside a container'
      },
      {
        label: 'Code',
        entityTypeId: 'library_dependency',
        description: 'Classes, interfaces, implementation details'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'bounded_context',
            role: 'item'
          },
          {
            type: 'service',
            role: 'item'
          },
          {
            type: 'code_repository',
            role: 'item'
          },
          {
            type: 'library_dependency',
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
      purpose: 'Document software architecture at four zoom levels — Context, Containers, Components, Code — so every stakeholder gets the diagram at the right level of detail.',
      core_question: 'Can every team member (from PM to engineer) understand our architecture at the level of detail they need?',
      when_to_use: [
        'You need to structure complex technical decisions or architecture',
        'The engineering team needs alignment on technical approach',
        'You want to evaluate or improve engineering practices'
      ],
      when_not_to_use: [
        'The technical solution is straightforward and well-understood',
        'You are building a throwaway prototype where architecture does not matter'
      ]
    }
  },
  {
    id: 'ddd-context-map',
    approach_ids: ['trace'],
    name: 'DDD Context Map',
    version: '1.0.0',
    description: 'Map the relationships between bounded contexts in a domain-driven design. Identify upstream/downstream, shared kernels, anti-corruption layers, and conformist patterns.',
    category: 'engineering',
    origin: {
      type: 'practitioner',
      attribution: 'Eric Evans',
      description: 'Introduced by Eric Evans in \"Domain-Driven Design: Tackling Complexity in the Heart of Software\" (2003). The Context Map describes the relationships between bounded contexts, making integration patterns explicit.',
      url: 'https://www.domainlanguage.com/ddd/',
      year: 2003,
      license: 'published_methodology',
    },
    tags: [
      'engineering',
      'flow'
    ],
    slots: [
      {
        label: 'Identify Bounded Contexts',
        entityTypeId: 'bounded_context',
        description: 'List all contexts in the system'
      },
      {
        label: 'Map Relationships',
        entityTypeId: 'integration_pattern',
        description: 'Upstream/downstream, shared kernel, conformist'
      },
      {
        label: 'Define Integration Patterns',
        entityTypeId: 'integration_pattern',
        description: 'ACL, open-host, published language'
      },
      {
        label: 'Document Context Boundaries',
        entityTypeId: 'aggregate',
        description: 'What each context owns and doesn\'t own'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'bounded_context',
            role: 'item'
          },
          {
            type: 'aggregate',
            role: 'item'
          },
          {
            type: 'integration_pattern',
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
      purpose: 'Map the relationships between bounded contexts in a domain-driven architecture — upstream, downstream, shared kernel, conformist — to manage integration complexity.',
      core_question: 'How do our bounded contexts relate to each other, and where are the integration seams that need explicit contracts?',
      when_to_use: [
        'You need to structure complex technical decisions or architecture',
        'The engineering team needs alignment on technical approach',
        'You want to evaluate or improve engineering practices'
      ],
      when_not_to_use: [
        'The technical solution is straightforward and well-understood',
        'You are building a throwaway prototype where architecture does not matter'
      ]
    }
  },
  {
    id: 'bounded-context-canvas',
    name: 'Bounded Context Canvas',
    version: '1.0.0',
    description: 'Document a bounded context\'s purpose, ubiquitous language, inbound/outbound communication, and key domain roles. A structured way to align teams around context ownership.',
    category: 'engineering',
    origin: {
      type: 'practitioner',
      attribution: 'Nick Tune',
      description: 'Created by Nick Tune in 2019 as a practical companion to DDD context mapping. The canvas format makes it easier for teams to define the scope, interfaces, and dependencies of their bounded context.',
      url: 'https://github.com/ddd-crew/bounded-context-canvas',
      year: 2019,
      license: 'published_methodology',
    },
    tags: [
      'engineering',
      'matrix'
    ],
    slots: [
      {
        label: 'Purpose',
        entityTypeId: 'bounded_context',
        description: 'Why this context exists'
      },
      {
        label: 'Ubiquitous Language',
        entityTypeId: 'domain_entity',
        description: 'Key terms and definitions'
      },
      {
        label: 'Inbound Communication',
        entityTypeId: 'domain_event',
        description: 'Commands and queries received'
      },
      {
        label: 'Outbound Communication',
        entityTypeId: 'command',
        description: 'Events and data published'
      },
      {
        label: 'Domain Roles',
        entityTypeId: 'aggregate',
        description: 'Key aggregates and entities'
      },
      {
        label: 'Business Decisions',
        entityTypeId: 'api_contract',
        description: 'Policies and rules owned'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'bounded_context',
          role: 'bucket'
        },
        {
          type: 'domain_entity',
          role: 'bucket'
        },
        {
          type: 'domain_event',
          role: 'bucket'
        },
        {
          type: 'command',
          role: 'bucket'
        },
        {
          type: 'aggregate',
          role: 'bucket'
        },
        {
          type: 'api_contract',
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
      purpose: 'Define a single bounded context\'s purpose, domain model, interfaces, and dependencies on a structured canvas so the team owns a clear, bounded piece of the domain.',
      core_question: 'What is the precise scope of this bounded context — what domain concepts does it own, and what does it delegate to others?',
      when_to_use: [
        'You need to structure complex technical decisions or architecture',
        'The engineering team needs alignment on technical approach',
        'You want to evaluate or improve engineering practices'
      ],
      when_not_to_use: [
        'The technical solution is straightforward and well-understood',
        'You are building a throwaway prototype where architecture does not matter'
      ]
    }
  },
  {
    id: 'event-storming',
    name: 'Event Storming',
    version: '1.0.0',
    description: 'Collaborative workshop format for exploring complex business domains through domain events. Work backwards from events to discover commands, aggregates, policies, and read models.',
    category: 'engineering',
    origin: {
      type: 'practitioner',
      attribution: 'Alberto Brandolini',
      description: 'Created by Alberto Brandolini in 2013 as a collaborative workshop format for Domain-Driven Design. Uses orange sticky notes for domain events, and progressively adds commands, aggregates, and bounded contexts.',
      url: 'https://www.eventstorming.com',
      year: 2013,
      license: 'published_methodology',
    },
    tags: [
      'engineering',
      'flow'
    ],
    slots: [
      {
        label: 'Domain Events',
        entityTypeId: 'domain_event',
        description: 'What happened — past tense, business language'
      },
      {
        label: 'Commands',
        entityTypeId: 'command',
        description: 'What triggered each event'
      },
      {
        label: 'Aggregates',
        entityTypeId: 'aggregate',
        description: 'What processed the command'
      },
      {
        label: 'Policies',
        entityTypeId: 'domain_event',
        description: 'Automated reactions — when X then Y'
      },
      {
        label: 'Read Models',
        entityTypeId: 'read_model',
        description: 'Information needed to make decisions'
      },
      {
        label: 'External Systems',
        entityTypeId: 'external_api',
        description: 'Systems outside your boundary'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'domain_event',
            role: 'item'
          },
          {
            type: 'command',
            role: 'item'
          },
          {
            type: 'aggregate',
            role: 'item'
          },
          {
            type: 'read_model',
            role: 'item'
          },
          {
            type: 'external_api',
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
      purpose: 'Map a business domain as a timeline of domain events on sticky notes, revealing bounded contexts, aggregates, and process flows through collaborative exploration.',
      core_question: 'What events happen in our domain, who triggers them, and where do the natural boundaries between contexts emerge?',
      when_to_use: [
        'You need to structure complex technical decisions or architecture',
        'The engineering team needs alignment on technical approach',
        'You want to evaluate or improve engineering practices'
      ],
      when_not_to_use: [
        'The technical solution is straightforward and well-understood',
        'You are building a throwaway prototype where architecture does not matter'
      ]
    }
  },
  {
    id: 'architecture-fitness-functions',
    name: 'Architecture Fitness Functions',
    version: '1.0.0',
    description: 'Define automated, objective measures to assess how well your architecture meets its goals. Fitness functions run as tests in CI to catch architectural drift early.',
    category: 'engineering',
    origin: {
      type: 'practitioner',
      attribution: 'Neal Ford, Rebecca Parsons, Patrick Kua',
      description: 'Introduced by Neal Ford, Rebecca Parsons, and Patrick Kua in \"Building Evolutionary Architectures\" (2017). Fitness functions are automated tests that verify architectural properties don\'t degrade over time.',
      url: 'https://www.thoughtworks.com/books/building-evolutionary-architectures',
      year: 2017,
      license: 'published_methodology',
    },
    tags: [
      'engineering',
      'table'
    ],
    slots: [
      {
        label: 'Architecture Characteristic',
        entityTypeId: 'decision',
        description: 'e.g., modularity, performance, security'
      },
      {
        label: 'Fitness Function',
        entityTypeId: 'build_artifact',
        description: 'Automated check or test'
      },
      {
        label: 'Threshold',
        entityTypeId: 'metric',
        description: 'Acceptable value or pass/fail criteria'
      },
      {
        label: 'Frequency',
        entityTypeId: 'ci_pipeline',
        description: 'When it runs — commit, nightly, release'
      },
      {
        label: 'Status',
        entityTypeId: 'decision',
        description: 'Passing, failing, not yet implemented'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'decision',
            role: 'item'
          },
          {
            type: 'build_artifact',
            role: 'item'
          },
          {
            type: 'ci_pipeline',
            role: 'item'
          },
          {
            type: 'metric',
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
            label: 'Architecture Characteristic',
            sortable: true
          },
          {
            property: 'title',
            label: 'Fitness Function',
            sortable: true
          },
          {
            property: 'description',
            label: 'Threshold',
          },
          {
            property: 'description',
            label: 'Frequency',
          },
          {
            property: 'status',
            label: 'Status',
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
      purpose: 'Define automated tests that continuously verify architectural properties — performance budgets, dependency rules, security invariants — so architecture doesn\'t silently degrade.',
      core_question: 'Are our architectural quality attributes (performance, security, modularity) tested automatically, or do we only discover violations in production?',
      when_to_use: [
        'You need to structure complex technical decisions or architecture',
        'The engineering team needs alignment on technical approach',
        'You want to evaluate or improve engineering practices'
      ],
      when_not_to_use: [
        'The technical solution is straightforward and well-understood',
        'You are building a throwaway prototype where architecture does not matter'
      ]
    }
  },
  {
    id: 'api-design-first',
    name: 'API Design First',
    version: '1.0.0',
    description: 'Design the API contract before writing any implementation code. Use OpenAPI or similar specs to align consumers and producers, generate mocks, and validate early.',
    category: 'engineering',
    origin: {
      type: 'practitioner',
      attribution: 'Swagger / OpenAPI Initiative',
      description: 'Promoted by the OpenAPI Initiative (formerly Swagger) starting in 2014. API-first design advocates defining the API contract before implementation, ensuring producer-consumer alignment from the start.',
      url: 'https://www.openapis.org',
      year: 2014,
      license: 'open_attribution',
    },
    tags: [
      'engineering',
      'flow'
    ],
    slots: [
      {
        label: 'Define Resources',
        entityTypeId: 'api_contract',
        description: 'Identify API resources and relationships'
      },
      {
        label: 'Design Contract',
        entityTypeId: 'api_endpoint',
        description: 'Write OpenAPI/AsyncAPI spec'
      },
      {
        label: 'Review with Consumers',
        entityTypeId: 'decision',
        description: 'Get feedback from API consumers'
      },
      {
        label: 'Generate Mocks',
        entityTypeId: 'domain_entity',
        description: 'Create mock server from spec'
      },
      {
        label: 'Implement',
        entityTypeId: 'data_flow',
        description: 'Build against the agreed contract'
      },
      {
        label: 'Validate',
        entityTypeId: 'api_contract',
        description: 'Contract testing in CI'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'api_contract',
          role: 'item'
        },
        {
          type: 'api_endpoint',
          role: 'item'
        },
        {
          type: 'decision',
          role: 'item'
        },
        {
          type: 'domain_entity',
          role: 'item'
        },
        {
          type: 'data_flow',
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
      purpose: 'Design the API contract before writing implementation code — using OpenAPI, protobuf, or GraphQL schemas — so consumers and producers agree on the interface upfront.',
      core_question: 'Have we agreed on the API contract with all consumers before writing a line of implementation code?',
      when_to_use: [
        'You need to structure complex technical decisions or architecture',
        'The engineering team needs alignment on technical approach',
        'You want to evaluate or improve engineering practices'
      ],
      when_not_to_use: [
        'The technical solution is straightforward and well-understood',
        'You are building a throwaway prototype where architecture does not matter'
      ]
    }
  },
  {
    id: 'feature-flag-strategy',
    name: 'Feature Flag Strategy',
    version: '1.0.0',
    description: 'Manage feature flags by classifying them into types (release, experiment, ops, permission) with defined lifecycle, ownership, and cleanup policies.',
    category: 'engineering',
    origin: {
      type: 'practitioner',
      attribution: 'Pete Hodgson',
      description: 'Described by Pete Hodgson in Martin Fowler\'s blog (2017), building on practices from Facebook, Flickr, and Etsy. Feature flags decouple deployment from release, enabling progressive rollout and continuous delivery.',
      url: 'https://martinfowler.com/articles/feature-toggles.html',
      year: 2017,
      license: 'open_attribution',
    },
    tags: [
      'engineering',
      'table'
    ],
    slots: [
      {
        label: 'Flag Name',
        entityTypeId: 'feature_flag',
        description: 'Unique identifier for the flag'
      },
      {
        label: 'Type',
        entityTypeId: 'feature',
        description: 'Release, experiment, ops, permission'
      },
      {
        label: 'Owner',
        entityTypeId: 'stakeholder',
        description: 'Team or person responsible'
      },
      {
        label: 'Lifecycle',
        entityTypeId: 'decision',
        description: 'Temporary or permanent'
      },
      {
        label: 'Expiry Date',
        entityTypeId: 'feature_flag',
        description: 'When to remove (if temporary)'
      },
      {
        label: 'Status',
        entityTypeId: 'feature',
        description: 'Active, rolled out, archived'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'feature_flag',
            role: 'item'
          },
          {
            type: 'feature',
            role: 'item'
          },
          {
            type: 'decision',
            role: 'item'
          },
          {
            type: 'stakeholder',
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
            label: 'Flag Name',
            sortable: true
          },
          {
            property: 'description',
            label: 'Type',
          },
          {
            property: 'description',
            label: 'Owner',
          },
          {
            property: 'description',
            label: 'Lifecycle',
          },
          {
            property: 'description',
            label: 'Expiry Date',
          },
          {
            property: 'status',
            label: 'Status',
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
      purpose: 'Use feature flags to decouple deployment from release — shipping code dark, testing in production, rolling out gradually — while managing flag lifecycle to avoid technical debt.',
      core_question: 'Can we deploy any change to production without exposing it to users, and do we have a process for cleaning up old flags?',
      when_to_use: [
        'You need to structure complex technical decisions or architecture',
        'The engineering team needs alignment on technical approach',
        'You want to evaluate or improve engineering practices'
      ],
      when_not_to_use: [
        'The technical solution is straightforward and well-understood',
        'You are building a throwaway prototype where architecture does not matter'
      ]
    }
  }
]
