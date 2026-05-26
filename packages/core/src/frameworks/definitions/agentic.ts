/**
 * UPG Framework Definitions — Agentic
 * 4 frameworks for the agentic domain.
 */

import type { UPGFramework } from '../types.js'

export const AGENTIC_FRAMEWORKS: UPGFramework[] = [
  {
    id: 'agent-evaluation-matrix',
    name: 'Agent Evaluation Matrix',
    version: '1.0.0',
    description: 'Evaluate AI agents across task completion, tool-use accuracy, safety compliance, cost efficiency, and user satisfaction. Systematic quality assurance for autonomous systems.',
    category: 'agentic',
    origin: {
      type: 'practitioner',
      year: 2024,
      description: 'Emerged from the AI engineering community in 2024 as teams needed structured ways to evaluate and compare autonomous AI agent implementations across quality, safety, and cost dimensions.',
      license: 'cc_by',
    },
    tags: [
      'agentic',
      'table'
    ],
    slots: [
      {
        label: 'Agent',
        entityTypeId: 'agent_definition',
        description: 'Agent being evaluated'
      },
      {
        label: 'Task Completion',
        entityTypeId: 'metric',
        description: '% of tasks completed correctly'
      },
      {
        label: 'Tool-Use Accuracy',
        entityTypeId: 'metric',
        description: 'Correct tool selection and usage'
      },
      {
        label: 'Safety Compliance',
        entityTypeId: 'review_gate',
        description: 'Adherence to boundaries and policies'
      },
      {
        label: 'Cost Efficiency',
        entityTypeId: 'metric',
        description: 'Token/compute cost per task'
      },
      {
        label: 'User Satisfaction',
        entityTypeId: 'agent_definition',
        description: 'Qualitative feedback score'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'agent_definition',
            role: 'item'
          },
          {
            type: 'review_gate',
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
            label: 'Agent',
            sortable: true
          },
          {
            property: 'description',
            label: 'Task Completion',
          },
          {
            property: 'description',
            label: 'Tool-Use Accuracy',
          },
          {
            property: 'description',
            label: 'Safety Compliance',
          },
          {
            property: 'description',
            label: 'Cost Efficiency',
          },
          {
            property: 'description',
            label: 'User Satisfaction',
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
      purpose: 'Score AI agents across quality, safety, cost, and latency dimensions so teams compare agent implementations on consistent criteria.',
      core_question: 'Which agent architecture delivers the best balance of quality, safety, cost, and speed for our use case?',
      when_to_use: [
        'You are designing or evaluating autonomous AI agent systems',
        'You need structured approaches to agent orchestration and safety',
        'You want to define human-in-the-loop boundaries for AI agents'
      ],
      when_not_to_use: [
        'Your AI integration is simple prompt-response with no autonomy',
        'Agent workflows are not part of your product architecture'
      ]
    }
  },
  {
    id: 'human-in-the-loop-gates',
    name: 'Human-in-the-Loop Gates',
    version: '1.0.0',
    description: 'Define checkpoints in agentic workflows where human review and approval is required before the agent proceeds. Balance autonomy with oversight.',
    category: 'agentic',
    origin: {
      type: 'practitioner',
      year: 2024,
      description: 'Crystallised from AI safety and responsible AI practices in 2024, as agentic systems moved from research to production and teams needed explicit approval/escalation boundaries.',
      license: 'cc_by',
    },
    tags: [
      'agentic',
      'flow'
    ],
    slots: [
      {
        label: 'Agent Proposes Action',
        entityTypeId: 'agent_task',
        description: 'Agent generates a plan or output'
      },
      {
        label: 'Gate Check',
        entityTypeId: 'review_gate',
        description: 'Is human approval required?'
      },
      {
        label: 'Human Review',
        entityTypeId: 'review_gate',
        description: 'Review proposed action, context, risks'
      },
      {
        label: 'Approve / Reject / Modify',
        entityTypeId: 'approval_record',
        description: 'Human decision'
      },
      {
        label: 'Agent Proceeds',
        entityTypeId: 'workflow_run',
        description: 'Execute approved action'
      },
      {
        label: 'Log Decision',
        entityTypeId: 'approval_record',
        description: 'Record approval for audit trail'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'review_gate',
            role: 'item'
          },
          {
            type: 'approval_record',
            role: 'item'
          },
          {
            type: 'workflow_run',
            role: 'item'
          },
          {
            type: 'agent_task',
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
      purpose: 'Define where human review is required in an agent workflow — approval gates, escalation triggers, override points — to maintain safety without killing autonomy.',
      core_question: 'At which points in the agent workflow must a human approve, review, or override — and what triggers escalation?',
      when_to_use: [
        'You are designing or evaluating autonomous AI agent systems',
        'You need structured approaches to agent orchestration and safety',
        'You want to define human-in-the-loop boundaries for AI agents'
      ],
      when_not_to_use: [
        'Your AI integration is simple prompt-response with no autonomy',
        'Agent workflows are not part of your product architecture'
      ]
    }
  },
  {
    id: 'agent-workflow-canvas',
    approach_ids: ['trace'],
    name: 'Agent Workflow Canvas',
    version: '1.0.0',
    description: 'Design an end-to-end agentic workflow: define the trigger, agent selection, tool access, decision points, human gates, and output delivery.',
    category: 'agentic',
    origin: {
      type: 'practitioner',
      year: 2024,
      description: 'Emerged from the intersection of business process modelling and AI agent design in 2024, adapting canvas-style frameworks to the unique needs of multi-step autonomous agent workflows.',
      license: 'cc_by',
    },
    tags: [
      'agentic',
      'flow'
    ],
    slots: [
      {
        label: 'Trigger',
        entityTypeId: 'workflow_template',
        description: 'What initiates the workflow'
      },
      {
        label: 'Agent Selection',
        entityTypeId: 'agent_definition',
        description: 'Which agent handles this'
      },
      {
        label: 'Context Gathering',
        entityTypeId: 'agent_skill',
        description: 'What information the agent needs'
      },
      {
        label: 'Tool Access',
        entityTypeId: 'agent_skill',
        description: 'Which tools are available'
      },
      {
        label: 'Decision Points',
        entityTypeId: 'review_gate',
        description: 'Conditional branching logic'
      },
      {
        label: 'Human Gates',
        entityTypeId: 'review_gate',
        description: 'Where human approval is needed'
      },
      {
        label: 'Output Delivery',
        entityTypeId: 'workflow_template',
        description: 'How results are delivered'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'workflow_template',
            role: 'item'
          },
          {
            type: 'agent_definition',
            role: 'item'
          },
          {
            type: 'agent_skill',
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
      purpose: 'Design an end-to-end agent workflow on a single canvas — triggers, reasoning steps, tool calls, decision points, outputs — making the agent\'s behaviour transparent.',
      core_question: 'What is the complete flow from user request to agent output, and where are the decision points, loops, and exit conditions?',
      when_to_use: [
        'You are designing or evaluating autonomous AI agent systems',
        'You need structured approaches to agent orchestration and safety',
        'You want to define human-in-the-loop boundaries for AI agents'
      ],
      when_not_to_use: [
        'Your AI integration is simple prompt-response with no autonomy',
        'Agent workflows are not part of your product architecture'
      ]
    }
  },
  {
    id: 'multi-agent-orchestration',
    name: 'Multi-Agent Orchestration',
    version: '1.0.0',
    description: 'Coordinate multiple specialised agents working together on complex tasks. Define agent roles, communication protocols, handoff patterns, and conflict resolution.',
    category: 'agentic',
    origin: {
      type: 'practitioner',
      year: 2024,
      description: 'Formalised in 2024 as research on multi-agent systems (AutoGen, CrewAI, LangGraph) matured into production patterns. Draws on decades of distributed systems and multi-agent research.',
      license: 'cc_by',
    },
    tags: [
      'agentic',
      'flow'
    ],
    slots: [
      {
        label: 'Define Agent Roles',
        entityTypeId: 'agent_definition',
        description: 'Specialisation for each agent'
      },
      {
        label: 'Orchestration Pattern',
        entityTypeId: 'workflow_template',
        description: 'Sequential, parallel, hierarchical'
      },
      {
        label: 'Communication Protocol',
        entityTypeId: 'agent_hook',
        description: 'How agents share information'
      },
      {
        label: 'Handoff Rules',
        entityTypeId: 'workflow_run',
        description: 'When and how to pass work between agents'
      },
      {
        label: 'Conflict Resolution',
        entityTypeId: 'review_gate',
        description: 'What happens when agents disagree'
      },
      {
        label: 'Aggregation',
        entityTypeId: 'workflow_artifact',
        description: 'How to combine agent outputs'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'agent_definition',
            role: 'item'
          },
          {
            type: 'workflow_template',
            role: 'item'
          },
          {
            type: 'workflow_run',
            role: 'item'
          },
          {
            type: 'workflow_artifact',
            role: 'item'
          },
          {
            type: 'agent_hook',
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
      purpose: 'Coordinate multiple specialised agents working together — routing, delegation, result aggregation, conflict resolution — to solve complex tasks no single agent can handle.',
      core_question: 'How do our agents divide work, communicate results, resolve conflicts, and produce a coherent output?',
      when_to_use: [
        'You are designing or evaluating autonomous AI agent systems',
        'You need structured approaches to agent orchestration and safety',
        'You want to define human-in-the-loop boundaries for AI agents'
      ],
      when_not_to_use: [
        'Your AI integration is simple prompt-response with no autonomy',
        'Agent workflows are not part of your product architecture'
      ]
    }
  },
]
