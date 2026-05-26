/**
 * UPG Framework Definitions — Team Process
 * 12 frameworks for the team process domain.
 */

import type { UPGFramework } from '../types.js'

export const TEAM_PROCESS_FRAMEWORKS: UPGFramework[] = [
  {
    id: 'raci-matrix',
    name: 'RACI Matrix',
    version: '1.0.0',
    description: 'Assign roles: Responsible, Accountable, Consulted, Informed for each activity.',
    category: 'team_process',
    origin: {
      type: 'practitioner',
      description: 'Standard project management tool for role clarity. Origins in 1950s management science.',
      license: 'cc_by',
    },
    tags: [
      'team_process',
      'matrix'
    ],
    slots: [
      {
        label: 'Activity',
        entityTypeId: 'key_activity',
        description: 'Place persona entities in the Activity position of the matrix'
      },
      {
        label: 'Responsible',
        entityTypeId: 'role',
        description: 'Does the work'
      },
      {
        label: 'Accountable',
        entityTypeId: 'role',
        description: 'Makes the final call'
      },
      {
        label: 'Consulted',
        entityTypeId: 'role',
        description: 'Gives input'
      },
      {
        label: 'Informed',
        entityTypeId: 'role',
        description: 'Kept in the loop'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'key_activity',
            role: 'item'
          },
          {
            type: 'role',
            role: 'item'
          }
        ],
      required_properties: {},
      computed_properties: [
        {
          property: 'coverage_score',
          expression: 'assigned_count / total_activities',
          entity_type: 'team',
          label: 'RACI Coverage',
          format: 'percentage'
        }
      ]
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
      purpose: 'Assign Responsible, Accountable, Consulted, and Informed roles for every deliverable so there are no ambiguity gaps and no duplicate ownership.',
      core_question: 'For every key deliverable, does exactly one person own the decision (A), and does everyone know their role (R, C, or I)?',
      when_to_use: [
        'You need to improve team collaboration, clarity, or effectiveness',
        'Roles and responsibilities are unclear or causing friction',
        'You want to establish or improve team processes and ceremonies'
      ],
      when_not_to_use: [
        'The team is small and informal coordination works well',
        'Process overhead would slow down a team that needs speed'
      ]
    }
  },
  {
    id: 'team-topology',
    name: 'Team Topology',
    version: '1.0.0',
    description: 'Organise teams as Stream-aligned, Platform, Enabling, or Complicated-subsystem.',
    category: 'team_process',
    origin: {
      type: 'practitioner',
      attribution: 'Matthew Skelton & Manuel Pais',
      description: 'Created by Matthew Skelton and Manuel Pais, published in \"Team Topologies\" (2019). Builds on Conway\'s Law to define four fundamental team types and three interaction modes that optimise software delivery.',
      url: 'https://teamtopologies.com/',
      year: 2019,
      license: 'published_methodology',
    },
    tags: [
      'team_process',
      'collection'
    ],
    slots: [
      {
        label: 'Stream-aligned',
        entityTypeId: 'team',
        description: 'Teams aligned to a flow of work'
      },
      {
        label: 'Platform',
        entityTypeId: 'service',
        description: 'Teams providing internal services'
      },
      {
        label: 'Enabling',
        entityTypeId: 'capability',
        description: 'Teams helping others adopt new capabilities'
      },
      {
        label: 'Complicated-subsystem',
        entityTypeId: 'team',
        description: 'Teams handling complex domains'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'service',
            role: 'item'
          },
          {
            type: 'capability',
            role: 'item'
          },
          {
            type: 'team',
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
      purpose: 'Organise teams as Stream-aligned, Platform, Enabling, or Complicated-subsystem to optimise for fast flow of change while minimising cognitive load.',
      core_question: 'Does our team structure support fast flow of change, or does it create handoffs, dependencies, and cognitive overload?',
      when_to_use: [
        'You need to improve team collaboration, clarity, or effectiveness',
        'Roles and responsibilities are unclear or causing friction',
        'You want to establish or improve team processes and ceremonies'
      ],
      when_not_to_use: [
        'The team is small and informal coordination works well',
        'Process overhead would slow down a team that needs speed'
      ]
    }
  },
  {
    id: 'retrospective',
    approach_ids: ['reflect'],
    name: 'Retrospective',
    version: '1.0.0',
    description: 'Reflect on what went well, what didn\'t, and what to change. Classic agile ceremony.',
    category: 'team_process',
    origin: {
      type: 'practitioner',
      attribution: 'Esther Derby & Diana Larsen',
      description: 'Core agile ceremony. Formalised in Agile Retrospectives (Pragmatic Bookshelf) by Esther Derby & Diana Larsen.',
      year: 2006,
      license: 'published_methodology',
    },
    tags: [
      'team_process',
      'matrix'
    ],
    slots: [
      {
        label: 'What Went Well',
        entityTypeId: 'outcome',
        description: 'Practices to continue'
      },
      {
        label: 'What Didn\'t Go Well',
        entityTypeId: 'need',
        description: 'Issues to address'
      },
      {
        label: 'Action Items',
        entityTypeId: 'learning',
        description: 'Changes for next iteration'
      },
      {
        label: 'Learnings',
        entityTypeId: 'learning',
        description: 'Insights to carry forward'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'learning',
          role: 'bucket'
        },
        {
          type: 'need',
          role: 'bucket'
        },
        {
          type: 'outcome',
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
      purpose: 'Reflect on the last iteration as a team: what went well, what did not, what to try next. Creates a continuous improvement habit.',
      core_question: 'What should we start doing, stop doing, and continue doing to work better together?',
      when_to_use: [
        'You need to improve team collaboration, clarity, or effectiveness',
        'Roles and responsibilities are unclear or causing friction',
        'You want to establish or improve team processes and ceremonies'
      ],
      when_not_to_use: [
        'The team is small and informal coordination works well',
        'Process overhead would slow down a team that needs speed'
      ]
    }
  },
  {
    id: 'team-api',
    name: 'Team API',
    version: '1.0.0',
    description: 'A formal description of how a team interacts with the rest of the organisation. Defines mission, capabilities, communication channels, and ways of working so team interfaces are explicit.',
    category: 'team_process',
    origin: {
      type: 'practitioner',
      attribution: 'Skelton & Pais',
      description: 'Introduced by Matthew Skelton and Manuel Pais in \"Team Topologies\" (2019). The Team API defines a team\'s interface — what they own, how to interact with them — like an API contract between teams.',
      url: 'https://teamtopologies.com/key-concepts',
      year: 2019,
      license: 'published_methodology',
    },
    tags: [
      'team_process',
      'collection'
    ],
    slots: [
      {
        label: 'Team',
        entityTypeId: 'team',
        description: 'The team defining its API — including mission, team type (stream-aligned, platform, enabling, or complicated-subsystem), and cognitive load'
      },
      {
        label: 'Role',
        entityTypeId: 'role',
        description: 'Team member role visible in the API — who to contact for what (tech lead, product owner, on-call)'
      },
      {
        label: 'Ceremony',
        entityTypeId: 'ceremony',
        description: 'Team ceremony or communication channel others can use — office hours, PR reviews, or Slack channel'
      },
      {
        label: 'Dependency',
        entityTypeId: 'dependency',
        description: 'Declared dependency on or interaction mode with another team — collaboration, X-as-a-Service, or facilitating'
      },
      {
        label: 'Stakeholder',
        entityTypeId: 'stakeholder',
        description: 'External stakeholder who consumes the team\'s API — another team, leadership, or external partner'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'team',
          role: 'item'
        },
        {
          type: 'role',
          role: 'item'
        },
        {
          type: 'ceremony',
          role: 'item'
        },
        {
          type: 'dependency',
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
      purpose: 'Define a team\'s interface: what they own, how to interact with them, what they expect, what they provide. Other teams collaborate without ambiguity.',
      core_question: 'Does every team know how to work with every other team: what to request, how to request it, and what to expect?',
      when_to_use: [
        'You need to improve team collaboration, clarity, or effectiveness',
        'Roles and responsibilities are unclear or causing friction',
        'You want to establish or improve team processes and ceremonies'
      ],
      when_not_to_use: [
        'The team is small and informal coordination works well',
        'Process overhead would slow down a team that needs speed'
      ]
    }
  },
  {
    id: 'daci-decision-framework',
    name: 'DACI Decision Framework',
    version: '1.0.0',
    description: 'A decision-making framework with four roles (Driver, Approver, Contributors, Informed) assigned to every major decision. Eliminates ambiguity about who decides and who is consulted.',
    category: 'team_process',
    origin: {
      type: 'practitioner',
      attribution: 'Intuit',
      description: 'Developed at Intuit around 2006 as an evolution of RACI for decision-making. DACI (Driver, Approver, Contributors, Informed) clarifies roles specifically for decisions rather than deliverables.',
      year: 2006,
      license: 'open_attribution',
    },
    tags: [
      'team_process',
      'matrix'
    ],
    slots: [
      {
        label: 'Decision',
        entityTypeId: 'decision',
        description: 'The decision being made — clearly stated with context, options considered, and deadline'
      },
      {
        label: 'Stakeholder',
        entityTypeId: 'stakeholder',
        description: 'Person assigned a DACI role — Driver (owns the process), Approver (has veto), Contributor (provides input), or Informed (notified)'
      },
      {
        label: 'Role',
        entityTypeId: 'role',
        description: 'DACI role assignment — one Driver, one Approver, multiple Contributors, and multiple Informed parties'
      },
      {
        label: 'Team',
        entityTypeId: 'team',
        description: 'Team affected by or contributing to the decision — ensures cross-functional representation'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'decision',
          role: 'bucket'
        },
        {
          type: 'stakeholder',
          role: 'bucket'
        },
        {
          type: 'role',
          role: 'bucket'
        },
        {
          type: 'team',
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
      purpose: 'Assign clear decision-making roles (Driver, Approver, Contributors, Informed). Decisions get made efficiently with the right people involved at the right level.',
      core_question: 'For this decision, who drives the process, who has final approval, who contributes input, and who just needs to know the outcome?',
      when_to_use: [
        'You need to improve team collaboration, clarity, or effectiveness',
        'Roles and responsibilities are unclear or causing friction',
        'You want to establish or improve team processes and ceremonies'
      ],
      when_not_to_use: [
        'The team is small and informal coordination works well',
        'Process overhead would slow down a team that needs speed'
      ]
    }
  },
  {
    id: 'working-agreement',
    name: 'Working Agreement',
    version: '1.0.0',
    description: 'A team-authored set of explicit norms, expectations, and practices. Covers communication, availability, code review, meeting etiquette, and conflict resolution. Revisited regularly.',
    category: 'team_process',
    origin: {
      type: 'practitioner',
      year: 2006,
      description: 'Standard agile team practice, often created during team formation. Working agreements make implicit norms explicit — communication preferences, meeting rules, code review expectations.',
      license: 'cc_by',
    },
    tags: [
      'team_process',
      'collection'
    ],
    slots: [
      {
        label: 'Team',
        entityTypeId: 'team',
        description: 'Team that authored and committed to the working agreement — reviewed at onboarding and retros'
      },
      {
        label: 'Ceremony',
        entityTypeId: 'ceremony',
        description: 'Team ceremony governed by the agreement — e.g. standup format, retro rules, focus time blocks'
      },
      {
        label: 'Retrospective',
        entityTypeId: 'retrospective',
        description: 'Retrospective where the working agreement is reviewed, updated, and recommitted to by the team'
      },
      {
        label: 'Dependency',
        entityTypeId: 'dependency',
        description: 'Cross-team interaction norm defined in the agreement — response times, handoff protocols, shared channels'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'team',
          role: 'item'
        },
        {
          type: 'ceremony',
          role: 'item'
        },
        {
          type: 'retrospective',
          role: 'item'
        },
        {
          type: 'dependency',
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
      purpose: 'Co-create a team agreement on how to work together — communication norms, meeting rules, code review expectations, conflict resolution — making implicit norms explicit.',
      core_question: 'Has the team explicitly agreed on how they work together, or are they relying on unspoken assumptions that different members interpret differently?',
      when_to_use: [
        'You need to improve team collaboration, clarity, or effectiveness',
        'Roles and responsibilities are unclear or causing friction',
        'You want to establish or improve team processes and ceremonies'
      ],
      when_not_to_use: [
        'The team is small and informal coordination works well',
        'Process overhead would slow down a team that needs speed'
      ]
    }
  },
  {
    id: 'team-health-check',
    name: 'Team Health Check',
    version: '1.0.0',
    description: 'A facilitated team self-assessment across dimensions like mission, fun, learning, speed, and support — using traffic-light voting to surface strengths and improvement areas in a safe format.',
    category: 'team_process',
    origin: {
      type: 'practitioner',
      attribution: 'Spotify / Kniberg',
      description: 'Popularised by Spotify and Henrik Kniberg\'s Squad Health Check model (2014). Teams self-assess health across dimensions like mission clarity, psychological safety, speed, and learning.',
      url: 'https://engineering.atspotify.com/2014/09/squad-health-check-model/',
      year: 2014,
      license: 'open_attribution',
    },
    tags: [
      'team_process',
      'table'
    ],
    slots: [
      {
        label: 'Team',
        entityTypeId: 'team',
        description: 'Team conducting the health check — all members vote anonymously on each dimension'
      },
      {
        label: 'Retrospective',
        entityTypeId: 'retrospective',
        description: 'Health check session results feeding into the retrospective discussion and action items'
      },
      {
        label: 'Metric',
        entityTypeId: 'metric',
        description: 'Health dimension scored — e.g. delivering value, teamwork, fun, learning, mission clarity, speed'
      },
      {
        label: 'Team OKR',
        entityTypeId: 'team_okr',
        description: 'Team OKR or improvement goal derived from consistently red health check dimensions'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'team',
          role: 'scored_item'
        },
        {
          type: 'retrospective',
          role: 'item'
        },
        {
          type: 'metric',
          role: 'item'
        },
        {
          type: 'team_okr',
          role: 'item'
        }
      ],
      required_properties: {},
      computed_properties: [
        {
          property: 'health_index',
          expression: '(green_count - red_count) / total_indicators',
          entity_type: 'team',
          label: 'Health Index',
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
            label: 'Team',
            sortable: true
          },
          {
            property: 'title',
            label: 'Retrospective',
            sortable: true
          },
          {
            property: 'description',
            label: 'Metric',
          },
          {
            property: 'title',
            label: 'Team OKR',
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
      purpose: 'Regularly assess team health across dimensions — psychological safety, autonomy, mission clarity, fun, speed, learning — to catch problems early and celebrate strengths.',
      core_question: 'How is the team really doing — where do they feel strong, where do they feel stuck, and what has changed since last check?',
      when_to_use: [
        'You need to improve team collaboration, clarity, or effectiveness',
        'Roles and responsibilities are unclear or causing friction',
        'You want to establish or improve team processes and ceremonies'
      ],
      when_not_to_use: [
        'The team is small and informal coordination works well',
        'Process overhead would slow down a team that needs speed'
      ]
    }
  },
  // ── Reflection classics ──────────────────────────────────────────
  // Five canonical reflective methods authored alongside the UPGApproach
  // catalog. They are the named techniques inside the Reflect
  // approach. Minimal-but-complete records — content depth post-launch.
  {
    id: 'five-whys',
    approach_ids: ['reflect', 'inspect'],
    name: 'Five Whys',
    version: '1.0.0',
    description: 'Iteratively ask "why?" — typically five times — starting from a symptom; each answer becomes the subject of the next question. The chain of answers reveals the underlying root cause behind the surface problem.',
    category: 'team_process',
    origin: {
      type: 'practitioner',
      attribution: 'Sakichi Toyoda / Toyota Production System',
      description: 'Developed within the Toyota Production System as a root-cause analysis technique. Popularised through Lean and Six Sigma practice; now a widely used incident-review and design-debug staple.',
      year: 1930,
      license: 'public_domain',
    },
    tags: [
      'team_process',
      'reflection',
      'root_cause',
      'tree',
    ],
    slots: [
      {
        label: 'Symptom',
        entityTypeId: 'need',
        description: 'The observed problem the analysis starts from.',
      },
      {
        label: 'Why chain',
        entityTypeId: 'insight',
        description: 'Each "why?" answer along the chain — typically five iterations deep.',
      },
      {
        label: 'Root cause',
        entityTypeId: 'insight',
        description: 'The terminal answer at the bottom of the chain — the underlying cause to address.',
      },
    ],
    data: {
      entity_types: [
        { type: 'need', role: 'root' },
        { type: 'insight', role: 'branch' },
      ],
      required_properties: {},
    },
    structure: {
      pattern: 'tree',
    },
    presentation: {
      layout: {
        type: 'tree',
        direction: 'TB',
      },
      sort_by: {
        property: 'title',
        direction: 'asc',
      },
      card_fields: ['title', 'description'],
    },
    education: {
      purpose: 'Move past surface symptoms by chaining "why?" questions until the underlying root cause surfaces — so fixes target the real driver rather than a downstream effect.',
      core_question: 'Why is this happening — and why is THAT happening, until we reach a cause we can act on?',
      when_to_use: [
        'A problem keeps recurring after surface fixes',
        'Post-incident review where the obvious cause feels too obvious',
        'Designing a fix and you want to confirm you understand the actual driver',
      ],
      when_not_to_use: [
        'The problem has multiple independent root causes (use a fishbone or richer RCA tool)',
        'You need quantitative attribution rather than a single-thread narrative',
        'Five linear "whys" oversimplify a systems problem with feedback loops',
      ],
    },
  },
  {
    id: 'pre-mortem',
    approach_ids: ['reflect'],
    name: 'Pre-mortem',
    version: '1.0.0',
    description: 'Imagine the project has already failed; work backward listing the plausible causes of the failure. Produce a risk register and matching mitigations before the work starts.',
    category: 'team_process',
    origin: {
      type: 'practitioner',
      attribution: 'Gary Klein',
      description: 'Popularised by Gary Klein in Harvard Business Review (2007) as a prospective-hindsight technique. Inverts the post-mortem: imagine failure first, then list causes, while there is still time to act.',
      url: 'https://hbr.org/2007/09/performing-a-project-premortem',
      year: 2007,
      license: 'published_methodology',
    },
    tags: [
      'team_process',
      'reflection',
      'risk',
      'collection',
    ],
    slots: [
      {
        label: 'Imagined failures',
        entityTypeId: 'risk',
        description: 'Plausible failure modes named as if they had already occurred.',
      },
      {
        label: 'Causes',
        entityTypeId: 'insight',
        description: 'For each imagined failure, the contributing causes the team can foresee.',
      },
      {
        label: 'Mitigations',
        entityTypeId: 'initiative',
        description: 'Mitigation actions the team will take before failure can occur.',
      },
    ],
    data: {
      entity_types: [
        { type: 'risk', role: 'bucket' },
        { type: 'insight', role: 'bucket' },
        { type: 'initiative', role: 'bucket' },
      ],
      required_properties: {},
    },
    structure: {
      pattern: 'collection',
    },
    presentation: {
      layout: {
        type: 'grid',
        groupBy: 'type',
      },
      sort_by: {
        property: 'title',
        direction: 'asc',
      },
      colour_by: 'group',
      card_fields: ['title', 'description'],
    },
    education: {
      purpose: 'Surface project risks early by inverting hindsight — imagine the project has already failed and ask why, while there is still time to mitigate.',
      core_question: 'It is six months from now and the project has failed catastrophically — what happened, and why?',
      when_to_use: [
        'Kicking off a project with significant downside or irreversible commitment',
        'A plan looks too clean and the team senses unspoken concerns',
        'Stakeholders disagree on risk; the exercise externalises and ranks them',
      ],
      when_not_to_use: [
        'The work is small, reversible, and cheap to course-correct',
        'The team is in execution mode and reflective ceremonies will derail momentum',
        'Risk surfacing has become performative — the team names risks but never mitigates them',
      ],
    },
  },
  {
    id: 'red-team',
    approach_ids: ['reflect', 'inspect'],
    name: 'Red Team',
    version: '1.0.0',
    description: 'Structured adversarial review. A designated group is assigned to attack a plan, design, or proposal from an outside-in stance — surfacing weaknesses the inside-out builders cannot see.',
    category: 'team_process',
    origin: {
      type: 'practitioner',
      attribution: 'US Department of Defense (Cold War era); broadened by security and intelligence practice',
      description: 'Originated in Cold War-era military strategic exercises ("red" team takes the adversary role against the "blue" team\'s defence). Adopted by cybersecurity, intelligence analysis, and product teams as a structured contrarian-review practice.',
      year: 1960,
      license: 'public_domain',
    },
    tags: ['team_process', 'reflection', 'adversarial', 'collection'],
    slots: [
      { label: 'Target', entityTypeId: 'initiative', description: 'The plan, design, or proposal under adversarial review.' },
      { label: 'Attack vectors', entityTypeId: 'risk', description: 'The angles the red team uses to probe weaknesses.' },
      { label: 'Findings', entityTypeId: 'insight', description: 'Weaknesses, blind spots, or unstated assumptions surfaced by the review.' },
    ],
    data: {
      entity_types: [
        { type: 'initiative', role: 'root' },
        { type: 'risk', role: 'bucket' },
        { type: 'insight', role: 'bucket' },
      ],
      required_properties: {},
    },
    structure: { pattern: 'collection' },
    presentation: {
      layout: { type: 'grid', groupBy: 'type' },
      sort_by: { property: 'title', direction: 'asc' },
      colour_by: 'group',
      card_fields: ['title', 'description'],
    },
    education: {
      purpose: 'Stress-test a plan against an explicit adversary — assigning reviewers to attack rather than agree — so weaknesses surface before reality finds them.',
      core_question: 'If a competent adversary wanted this to fail, where would they push first — and would we hold?',
      when_to_use: [
        'A high-stakes decision, launch, or security posture needs hardening',
        'Inside-out thinking is dominant and dissent has gone quiet',
        'Risk register is suspiciously short for the size of the bet',
      ],
      when_not_to_use: [
        'Early-stage exploration where adversarial framing would crush a fragile idea prematurely',
        'Team trust is too low — red-teaming will read as personal attack rather than role-play',
        'The work is small enough that a lightweight devil\'s-advocate pass is sufficient',
      ],
    },
  },
  {
    id: 'devils-advocate',
    approach_ids: ['reflect'],
    name: "Devil's Advocate",
    version: '1.0.0',
    description: 'Designate one reviewer to formally take the opposing position regardless of personal view. The assigned-role contrarian defangs groupthink by making dissent legitimate and structured.',
    category: 'team_process',
    origin: {
      type: 'practitioner',
      attribution: 'Roman Catholic Church (advocatus diaboli); broadened by decision-quality practice',
      description: 'Originated in 16th-century canonisation proceedings as the advocatus diaboli — an official assigned to argue against canonising a candidate. Adopted by decision-science and product-team practice as a structured antidote to groupthink.',
      year: 1587,
      license: 'public_domain',
    },
    tags: ['team_process', 'reflection', 'decision_quality', 'collection'],
    slots: [
      { label: 'Proposal', entityTypeId: 'initiative', description: 'The plan or recommendation under consideration.' },
      { label: 'Opposing arguments', entityTypeId: 'insight', description: 'The case against the proposal, voiced by the assigned contrarian regardless of personal view.' },
      { label: 'Counter-evidence', entityTypeId: 'evidence', description: 'Data points the contrarian raises that the proposal does not yet account for.' },
    ],
    data: {
      entity_types: [
        { type: 'initiative', role: 'root' },
        { type: 'insight', role: 'bucket' },
        { type: 'evidence', role: 'bucket' },
      ],
      required_properties: {},
    },
    structure: { pattern: 'collection' },
    presentation: {
      layout: { type: 'grid', groupBy: 'type' },
      sort_by: { property: 'title', direction: 'asc' },
      colour_by: 'group',
      card_fields: ['title', 'description'],
    },
    education: {
      purpose: 'Make dissent a legitimate role rather than a personal stance — assigning one reviewer to argue against the proposal forces the team to confront the strongest counter-case.',
      core_question: 'If we had to argue against this proposal — not because we believe it, but because the role demands it — what is the strongest case?',
      when_to_use: [
        'A decision is heading toward consensus and you suspect groupthink',
        'Stakes are high and the team has not heard a serious counter-argument',
        'Cultural norms make raw dissent costly — assigning the role lowers the social cost',
      ],
      when_not_to_use: [
        'Genuine disagreement already exists in the room (let it surface; do not theatricalise it)',
        'The decision is small enough that the ceremony costs more than the insight returned',
        'The assigned contrarian will be punished socially for the role — set the norms first or skip',
      ],
    },
  },
  {
    id: 'second-order-thinking',
    approach_ids: ['reflect'],
    name: 'Second-order Thinking',
    version: '1.0.0',
    description: 'After deciding a move, ask "and then what?" repeatedly. Trace second-, third-, and higher-order consequences to surface downstream effects that first-order reasoning misses.',
    category: 'team_process',
    origin: {
      type: 'practitioner',
      attribution: 'Howard Marks / Charlie Munger',
      description: 'Howard Marks distinguished first-order vs second-order thinking in The Most Important Thing (2011) as the essential discipline of consequential decision-making. Charlie Munger\'s "and then what?" framing is the practical heuristic.',
      url: 'https://www.oaktreecapital.com/insights/memo/dare-to-be-great-ii',
      year: 2011,
      license: 'published_methodology',
    },
    tags: ['team_process', 'reflection', 'consequences', 'tree'],
    slots: [
      { label: 'First-order move', entityTypeId: 'decision', description: 'The decision or move under consideration.' },
      { label: 'Second-order consequences', entityTypeId: 'insight', description: 'Downstream effects that follow from the first-order move.' },
      { label: 'Higher-order consequences', entityTypeId: 'insight', description: 'Third-, fourth-, fifth-order ripples — second-order consequences of the second-order consequences.' },
    ],
    data: {
      entity_types: [
        { type: 'decision', role: 'root' },
        { type: 'insight', role: 'branch' },
      ],
      required_properties: {},
    },
    structure: { pattern: 'tree' },
    presentation: {
      layout: { type: 'tree', direction: 'TB' },
      sort_by: { property: 'title', direction: 'asc' },
      card_fields: ['title', 'description'],
    },
    education: {
      purpose: 'Resist first-order reasoning by chaining "and then what?" until non-obvious downstream consequences come into view.',
      core_question: 'If we make this move and it works — what does the world look like next, and is that the world we want?',
      when_to_use: [
        'A decision has feedback loops, market reactions, or behavioural ripples',
        'The first-order case is compelling — which is exactly when downstream effects bite',
        'Considering an irreversible or large-scale commitment',
      ],
      when_not_to_use: [
        'Routine, reversible, low-blast-radius decisions where deliberation costs more than mistakes',
        'Higher-order branches diverge into pure speculation with no anchor in evidence',
        'Time pressure makes a deeper trace expensive and the first-order call is good enough',
      ],
    },
  },
]
