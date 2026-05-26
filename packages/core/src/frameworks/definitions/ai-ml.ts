/**
 * UPG Framework Definitions — Ai Ml
 * 5 frameworks for the ai ml domain.
 */

import type { UPGFramework } from '../types.js'

export const AI_ML_FRAMEWORKS: UPGFramework[] = [
  {
    id: 'model-card',
    name: 'Model Card',
    version: '1.0.0',
    description: 'Standardised documentation for machine learning models covering intended use, performance across groups, limitations, and ethical considerations. Transparency by design.',
    category: 'ai_ml',
    origin: {
      type: 'practitioner',
      attribution: 'Google / Margaret Mitchell',
      description: 'Introduced by Margaret Mitchell and colleagues at Google in a 2019 paper. Model Cards for Model Reporting provide a standardised template for documenting ML model capabilities, limitations, and ethical considerations.',
      url: 'https://arxiv.org/abs/1810.03993',
      year: 2019,
      license: 'published_methodology',
    },
    tags: [
      'ai_ml',
      'matrix'
    ],
    slots: [
      {
        label: 'Model Details',
        entityTypeId: 'ai_model',
        description: 'Architecture, version, training data'
      },
      {
        label: 'Intended Use',
        entityTypeId: 'ai_model',
        description: 'Primary use cases and users'
      },
      {
        label: 'Performance',
        entityTypeId: 'eval_run',
        description: 'Metrics across evaluation benchmarks'
      },
      {
        label: 'Limitations',
        entityTypeId: 'ai_guardrail',
        description: 'Known failure modes and constraints'
      },
      {
        label: 'Ethical Considerations',
        entityTypeId: 'ai_model',
        description: 'Bias, fairness, societal impact'
      },
      {
        label: 'Recommendations',
        entityTypeId: 'ai_guardrail',
        description: 'How to use responsibly'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'ai_model',
          role: 'bucket'
        },
        {
          type: 'eval_run',
          role: 'bucket'
        },
        {
          type: 'ai_guardrail',
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
      purpose: 'Document a machine learning model\'s intended use, performance metrics, limitations, and ethical considerations so downstream users can make informed deployment decisions.',
      core_question: 'What does this model do well, where does it fail, and what populations or use cases should it never be applied to?',
      when_to_use: [
        'You are building or evaluating AI/ML systems in production',
        'You need structured approaches to model evaluation or governance',
        'You want to ensure responsible and reliable AI deployment'
      ],
      when_not_to_use: [
        'AI/ML is not a component of your product',
        'You are using off-the-shelf AI services with no customisation'
      ]
    }
  },
  {
    id: 'llm-evaluation-framework',
    name: 'LLM Evaluation Framework',
    version: '1.0.0',
    description: 'Evaluate large language models across dimensions: accuracy, coherence, safety, cost, latency, and task-specific performance. Compare models systematically.',
    category: 'ai_ml',
    origin: {
      type: 'practitioner',
      year: 2023,
      description: 'Emerged from the NLP and LLM research community in 2023 as teams needed systematic evaluation beyond perplexity. Combines automated metrics (BLEU, ROUGE, semantic similarity) with human evaluation protocols.',
      license: 'cc_by',
    },
    tags: [
      'ai_ml',
      'table'
    ],
    slots: [
      {
        label: 'Model',
        entityTypeId: 'ai_model',
        description: 'Which LLM is being evaluated'
      },
      {
        label: 'Accuracy',
        entityTypeId: 'eval_benchmark',
        description: 'Correctness on task-specific benchmarks'
      },
      {
        label: 'Coherence',
        entityTypeId: 'eval_run',
        description: 'Logical consistency and fluency'
      },
      {
        label: 'Safety',
        entityTypeId: 'ai_guardrail',
        description: 'Harmful content, bias, hallucination rate'
      },
      {
        label: 'Latency',
        entityTypeId: 'metric',
        description: 'Time to first token, total generation time'
      },
      {
        label: 'Cost',
        entityTypeId: 'ai_cost_tracker',
        description: 'Cost per 1K tokens, monthly spend'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'ai_model',
            role: 'item'
          },
          {
            type: 'eval_benchmark',
            role: 'item'
          },
          {
            type: 'eval_run',
            role: 'item'
          },
          {
            type: 'ai_guardrail',
            role: 'item'
          },
          {
            type: 'metric',
            role: 'item'
          },
          {
            type: 'ai_cost_tracker',
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
            label: 'Model',
            sortable: true
          },
          {
            property: 'description',
            label: 'Accuracy',
          },
          {
            property: 'description',
            label: 'Coherence',
          },
          {
            property: 'description',
            label: 'Safety',
          },
          {
            property: 'description',
            label: 'Latency',
          },
          {
            property: 'description',
            label: 'Cost',
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
      purpose: 'Evaluate LLM outputs across quality dimensions (accuracy, relevance, safety, coherence, groundedness) using both automated metrics and human review.',
      core_question: 'How do we systematically measure whether our LLM outputs are accurate, safe, and useful, not just fluent?',
      when_to_use: [
        'You are building or evaluating AI/ML systems in production',
        'You need structured approaches to model evaluation or governance',
        'You want to ensure responsible and reliable AI deployment'
      ],
      when_not_to_use: [
        'AI/ML is not a component of your product',
        'You are using off-the-shelf AI services with no customisation'
      ]
    }
  },
  {
    id: 'responsible-ai-framework',
    name: 'Responsible AI Framework',
    version: '1.0.0',
    description: 'Principles and practices for building AI systems that are fair, transparent, safe, and privacy-preserving. Covers the full lifecycle from design to deployment.',
    category: 'ai_ml',
    origin: {
      type: 'practitioner',
      attribution: 'Microsoft / NIST',
      description: 'Synthesised from Microsoft\'s Responsible AI Standard (2022) and the NIST AI Risk Management Framework (2023). Provides organisations with a practical structure for embedding ethics into AI development.',
      url: 'https://www.nist.gov/artificial-intelligence/executive-order-safe-secure-and-trustworthy-artificial-intelligence',
      year: 2023,
      license: 'open_attribution',
    },
    tags: [
      'ai_ml',
      'collection'
    ],
    slots: [
      {
        label: 'Fairness',
        entityTypeId: 'ai_guardrail',
        description: 'Bias detection, equitable outcomes'
      },
      {
        label: 'Transparency',
        entityTypeId: 'ai_guardrail',
        description: 'Explainability, model cards, audit trails'
      },
      {
        label: 'Safety',
        entityTypeId: 'eval_benchmark',
        description: 'Harm prevention, testing, red-teaming'
      },
      {
        label: 'Privacy',
        entityTypeId: 'security_policy',
        description: 'Data minimisation, consent, anonymisation'
      },
      {
        label: 'Accountability',
        entityTypeId: 'ai_guardrail',
        description: 'Governance, oversight, incident response'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'ai_guardrail',
            role: 'item'
          },
          {
            type: 'eval_benchmark',
            role: 'item'
          },
          {
            type: 'security_policy',
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
      purpose: 'Embed fairness, transparency, accountability, and safety into the AI development lifecycle so ethical considerations are engineering requirements, not afterthoughts.',
      core_question: 'Have we identified and mitigated the ways our AI system could cause harm to individuals, communities, or society?',
      when_to_use: [
        'You are building or evaluating AI/ML systems in production',
        'You need structured approaches to model evaluation or governance',
        'You want to ensure responsible and reliable AI deployment'
      ],
      when_not_to_use: [
        'AI/ML is not a component of your product',
        'You are using off-the-shelf AI services with no customisation'
      ]
    }
  },
  {
    id: 'prompt-engineering-patterns',
    name: 'Prompt Engineering Patterns',
    version: '1.0.0',
    description: 'A catalogue of proven prompt engineering patterns: few-shot examples, chain-of-thought reasoning, ReAct, structured output, and system prompts. Know when to use each.',
    category: 'ai_ml',
    origin: {
      type: 'practitioner',
      year: 2022,
      description: 'Catalogued by the AI engineering community starting in 2022, drawing on patterns discovered through OpenAI\'s GPT series and subsequent LLMs. Formalised by researchers and practitioners into repeatable techniques.',
      license: 'cc_by',
    },
    tags: [
      'ai_ml',
      'collection'
    ],
    slots: [
      {
        label: 'Few-Shot',
        entityTypeId: 'prompt_version',
        description: 'Provide examples in the prompt'
      },
      {
        label: 'Chain-of-Thought',
        entityTypeId: 'prompt_version',
        description: 'Ask the model to reason step by step'
      },
      {
        label: 'ReAct',
        entityTypeId: 'prompt_version',
        description: 'Reasoning + acting with tool use'
      },
      {
        label: 'Structured Output',
        entityTypeId: 'prompt_version',
        description: 'Constrain output to JSON, XML, etc.'
      },
      {
        label: 'System Prompt',
        entityTypeId: 'prompt_version',
        description: 'Set persona, rules, and boundaries'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'prompt_version',
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
      purpose: 'Catalogue proven prompt structures (chain of thought, few-shot, system prompts, structured output). Teams build reliable LLM interactions instead of guessing.',
      core_question: 'Which prompt pattern produces the most reliable output for this task, and how do we version and test prompts like code?',
      when_to_use: [
        'You are building or evaluating AI/ML systems in production',
        'You need structured approaches to model evaluation or governance',
        'You want to ensure responsible and reliable AI deployment'
      ],
      when_not_to_use: [
        'AI/ML is not a component of your product',
        'You are using off-the-shelf AI services with no customisation'
      ]
    }
  },
  {
    id: 'ai-cost-optimisation',
    name: 'AI Cost Optimisation',
    version: '1.0.0',
    description: 'Track and optimise AI infrastructure costs across model inference, embedding generation, vector storage, and fine-tuning. Identify waste and right-size resources.',
    category: 'ai_ml',
    origin: {
      type: 'practitioner',
      year: 2024,
      description: 'Emerged from AI engineering practice in 2024 as LLM inference costs became a significant operational concern. Combines techniques from cloud cost optimisation with AI-specific strategies like caching and model routing.',
      license: 'cc_by',
    },
    tags: [
      'ai_ml',
      'table'
    ],
    slots: [
      {
        label: 'Cost Category',
        entityTypeId: 'ai_cost_tracker',
        description: 'Inference, embedding, storage, fine-tuning'
      },
      {
        label: 'Current Spend',
        entityTypeId: 'ai_model',
        description: 'Monthly cost'
      },
      {
        label: 'Optimisation',
        entityTypeId: 'prompt_version',
        description: 'Caching, batching, model downgrade, pruning'
      },
      {
        label: 'Estimated Savings',
        entityTypeId: 'eval_run',
        description: 'Projected cost reduction'
      },
      {
        label: 'Status',
        entityTypeId: 'ai_cost_tracker',
        description: 'Identified, in progress, implemented'
      }
    ],
    data: {
      entity_types: [
        {
          type: 'ai_cost_tracker',
          role: 'item'
        },
        {
          type: 'ai_model',
          role: 'item'
        },
        {
          type: 'prompt_version',
          role: 'item'
        },
        {
          type: 'eval_run',
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
            label: 'Cost Category',
            sortable: true
          },
          {
            property: 'description',
            label: 'Current Spend',
          },
          {
            property: 'description',
            label: 'Optimisation',
          },
          {
            property: 'description',
            label: 'Estimated Savings',
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
      purpose: 'Analyse and reduce AI infrastructure costs (token usage, caching, model selection, batching) without sacrificing output quality.',
      core_question: 'Where are we spending the most on AI inference, and which optimisations (caching, smaller models, batching) would reduce cost without degrading quality?',
      when_to_use: [
        'You are building or evaluating AI/ML systems in production',
        'You need structured approaches to model evaluation or governance',
        'You want to ensure responsible and reliable AI deployment'
      ],
      when_not_to_use: [
        'AI/ML is not a component of your product',
        'You are using off-the-shelf AI services with no customisation'
      ]
    }
  },
]
