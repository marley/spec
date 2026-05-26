/**
 * UPG Framework Definitions — Program Mgmt
 * 10 frameworks for the program mgmt domain.
 */

import type { UPGFramework } from '../types.js'

export const PROGRAM_MGMT_FRAMEWORKS: UPGFramework[] = [
  {
    id: 'raid-log',
    name: 'RAID Log',
    version: '1.0.0',
    description: 'A project management register tracking Risks, Assumptions, Issues, and Dependencies — the four categories most likely to derail a project if left unmanaged.',
    category: 'program_mgmt',
    origin: {
      type: 'practitioner',
      description: 'Standard project management tool used across methodologies. The RAID log (Risks, Assumptions, Issues, Dependencies) provides a single living document for tracking all factors that could derail a programme.',
      license: 'cc_by',
    },
    tags: [
      'program_mgmt',
      'table'
    ],
    slots: [
      {
        label: 'Risk Register',
        entityTypeId: 'risk_register',
        description: 'Risk or assumption logged with likelihood, impact, owner, and mitigation strategy'
      },
      {
        label: 'Dependency',
        entityTypeId: 'dependency',
        description: 'Dependency on another team, system, or deliverable that could block progress if not resolved'
      },
      {
        label: 'Status Report',
        entityTypeId: 'status_report',
        description: 'Status update summarising RAID log changes — new risks, resolved issues, and dependency updates'
      },
      {
        label: 'Deliverable',
        entityTypeId: 'deliverable',
        description: 'Deliverable affected by logged risks, issues, or dependencies — linking RAID items to project scope'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'risk_register',
          role: 'item'
        },
        {
          type: 'dependency',
          role: 'item'
        },
        {
          type: 'status_report',
          role: 'item'
        },
        {
          type: 'deliverable',
          role: 'item'
        }
      ],
      required_properties: {},
      computed_properties: [
        {
          property: 'severity',
          expression: 'probability * impact',
          entity_type: 'risk',
          label: 'Severity',
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
            property: 'risk_register',
            label: 'Risk Register',
            sortable: true
          },
          {
            property: 'dependency',
            label: 'Dependency',
            sortable: true
          },
          {
            property: 'status_report',
            label: 'Status Report',
            sortable: true
          },
          {
            property: 'deliverable',
            label: 'Deliverable',
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
      purpose: 'Track Risks, Assumptions, Issues, and Dependencies in a single living document so the project manager sees all potential blockers in one place.',
      core_question: 'What are the current risks, untested assumptions, open issues, and external dependencies that could derail this programme?',
      when_to_use: [
        'You are managing complex, multi-team initiatives with dependencies',
        'You need to track risks, decisions, and milestones across workstreams',
        'Stakeholders need visibility into programme-level progress'
      ],
      when_not_to_use: [
        'The project is small enough for a single team to manage',
        'Formal programme management would create overhead without value'
      ]
    }
  },
  {
    id: 'stage-gate-process',
    name: 'Stage-Gate Process',
    version: '1.0.0',
    description: 'A phased product development process with gates between stages — each gate is a go/kill/hold decision point ensuring only viable projects advance, reducing waste and managing portfolio risk.',
    category: 'program_mgmt',
    origin: {
      type: 'practitioner',
      attribution: 'Robert Cooper',
      description: 'Stage-Gate International',
      url: 'https://www.stage-gate.com/',
      year: 1990,
      license: 'public_domain',
    },
    tags: [
      'program_mgmt',
      'funnel'
    ],
    slots: [
      {
        label: 'Milestone',
        entityTypeId: 'milestone',
        description: 'Gate — a decision point where the project is reviewed against criteria and receives a go, kill, hold, or recycle verdict'
      },
      {
        label: 'Deliverable',
        entityTypeId: 'deliverable',
        description: 'Stage deliverable required to pass the gate — e.g. business case, prototype, test results, launch plan'
      },
      {
        label: 'Project',
        entityTypeId: 'project',
        description: 'Project advancing through the stage-gate process — tracked from scoping through launch and post-launch review'
      },
      {
        label: 'Risk Register',
        entityTypeId: 'risk_register',
        description: 'Risk assessed at each gate — technical, market, or financial risk that could trigger a kill or hold decision'
      },
      {
        label: 'Change Request',
        entityTypeId: 'change_request',
        description: 'Scope or resource change request submitted at a gate when the project needs adjustment to proceed'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'milestone',
          role: 'item'
        },
        {
          type: 'deliverable',
          role: 'item'
        },
        {
          type: 'project',
          role: 'item'
        },
        {
          type: 'risk_register',
          role: 'item'
        },
        {
          type: 'change_request',
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
      purpose: 'Gate project progression through defined stages — each gate requiring deliverables, reviews, and go/no-go decisions — to kill weak projects early and fund strong ones.',
      core_question: 'Has this project earned the right to proceed to the next stage, and does the evidence support continued investment?',
      when_to_use: [
        'You are managing complex, multi-team initiatives with dependencies',
        'You need to track risks, decisions, and milestones across workstreams',
        'Stakeholders need visibility into programme-level progress'
      ],
      when_not_to_use: [
        'The project is small enough for a single team to manage',
        'Formal programme management would create overhead without value'
      ]
    }
  },
  {
    id: 'dependency-board',
    name: 'Dependency Board',
    version: '1.0.0',
    description: 'A visual board mapping dependencies between teams, projects, or workstreams — making blocking relationships explicit and enabling proactive coordination at the programme level.',
    category: 'program_mgmt',
    origin: {
      type: 'practitioner',
      year: 2012,
      description: 'Emerged from agile scaling practices, particularly PI Planning in SAFe (around 2012). The dependency board makes inter-team dependencies visible so blocking issues can be resolved proactively.',
      license: 'cc_by',
    },
    tags: [
      'program_mgmt',
      'matrix'
    ],
    slots: [
      {
        label: 'Dependency',
        entityTypeId: 'dependency',
        description: 'Cross-team or cross-project dependency — specifying what\'s needed, from whom, and by when'
      },
      {
        label: 'Project',
        entityTypeId: 'project',
        description: 'Project with inbound or outbound dependencies visualised on the board'
      },
      {
        label: 'Milestone',
        entityTypeId: 'milestone',
        description: 'Milestone that a dependency is blocking — showing the delivery impact if the dependency slips'
      },
      {
        label: 'Team',
        entityTypeId: 'team',
        description: 'Team owning or depending on a deliverable — the two axes of the dependency matrix'
      },
      {
        label: 'Risk Register',
        entityTypeId: 'risk_register',
        description: 'Risk logged when a dependency is at high probability of slipping — triggering mitigation planning'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'dependency',
          role: 'bucket'
        },
        {
          type: 'project',
          role: 'bucket'
        },
        {
          type: 'milestone',
          role: 'bucket'
        },
        {
          type: 'team',
          role: 'bucket'
        },
        {
          type: 'risk_register',
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
      purpose: 'Visualise inter-team dependencies on a shared board — who needs what from whom by when — so blocked teams see their blockers and blocking teams see their obligations.',
      core_question: 'Which teams are waiting on which other teams, and which dependency is most likely to cause a schedule slip?',
      when_to_use: [
        'You are managing complex, multi-team initiatives with dependencies',
        'You need to track risks, decisions, and milestones across workstreams',
        'Stakeholders need visibility into programme-level progress'
      ],
      when_not_to_use: [
        'The project is small enough for a single team to manage',
        'Formal programme management would create overhead without value'
      ]
    }
  },
]
