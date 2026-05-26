/**
 * UPG Framework Definitions — Accessibility
 * 4 frameworks for the accessibility domain.
 */

import type { UPGFramework } from '../types.js'

export const ACCESSIBILITY_FRAMEWORKS: UPGFramework[] = [
  {
    id: 'pour-principles',
    name: 'POUR Principles',
    version: '1.0.0',
    description: 'Perceivable, Operable, Understandable, Robust — the four foundational principles of web accessibility.',
    category: 'accessibility',
    origin: {
      type: 'practitioner',
      attribution: 'W3C WAI',
      url: 'https://www.w3.org/WAI/fundamentals/accessibility-principles/',
      year: 2008,
      description: 'Defined by the W3C WAI as the four foundational principles underlying WCAG 2.0 (2008). Perceivable, Operable, Understandable, Robust became the organising framework for all accessibility success criteria.',
      license: 'standard',
    },
    tags: [
      'accessibility',
      'collection'
    ],
    slots: [
      {
        label: 'Perceivable',
        entityTypeId: 'a11y_standard',
        description: 'Perceivable — group of a11y standard entities'
      },
      {
        label: 'Operable',
        entityTypeId: 'a11y_guideline',
        description: 'Operable — group of a11y guideline entities'
      },
      {
        label: 'Understandable',
        entityTypeId: 'a11y_audit',
        description: 'Understandable — group of a11y audit entities'
      },
      {
        label: 'Robust',
        entityTypeId: 'a11y_issue',
        description: 'Robust — group of a11y issue entities'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'a11y_audit',
            role: 'item'
          },
          {
            type: 'a11y_standard',
            role: 'item'
          },
          {
            type: 'a11y_guideline',
            role: 'item'
          },
          {
            type: 'a11y_issue',
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
      purpose: 'Evaluate digital experiences against the four foundational accessibility principles — Perceivable, Operable, Understandable, Robust — that underpin all WCAG criteria.',
      core_question: 'Can every user perceive, operate, understand, and rely on our interface regardless of ability or assistive technology?',
      when_to_use: [
        'You want to ensure your product is usable by people with disabilities',
        'You need to meet regulatory accessibility requirements',
        'You are designing for diverse user contexts and abilities'
      ],
      when_not_to_use: [
        'The product is an internal prototype not intended for public use',
        'Accessibility has already been audited and meets all standards'
      ]
    }
  },
  {
    id: 'accessibility-maturity-model',
    approach_ids: ['inspect'],
    name: 'Accessibility Maturity Model',
    version: '1.0.0',
    description: 'Five levels of organisational accessibility maturity from informal to continuous improvement.',
    category: 'accessibility',
    origin: {
      type: 'practitioner',
      attribution: 'W3C',
      url: 'https://www.w3.org/TR/maturity-model/',
      year: 2023,
      description: 'Published by the W3C in 2023 as a supplement to WCAG, providing organisations with a self-assessment tool to measure and improve their accessibility capability across people, process, and technology.',
      license: 'standard',
    },
    tags: [
      'accessibility',
      'table'
    ],
    slots: [
      {
        label: 'Informal',
        entityTypeId: 'a11y_audit',
        description: 'Informal — a11y standard entries to evaluate'
      },
      {
        label: 'Planned',
        entityTypeId: 'a11y_audit',
        description: 'Planned — a11y guideline entries to evaluate'
      },
      {
        label: 'Resourced',
        entityTypeId: 'a11y_audit',
        description: 'Resourced — a11y audit entries to evaluate'
      },
      {
        label: 'Managed',
        entityTypeId: 'a11y_audit',
        description: 'Managed — a11y issue entries to evaluate'
      },
      {
        label: 'Continuous',
        entityTypeId: 'a11y_audit',
        description: 'Continuous — a11y standard entries to evaluate'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'a11y_audit',
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
            property: 'a11y_standard',
            label: 'Informal',
            sortable: true
          },
          {
            property: 'a11y_guideline',
            label: 'Planned',
            sortable: true
          },
          {
            property: 'a11y_audit',
            label: 'Resourced',
            sortable: true
          },
          {
            property: 'a11y_issue',
            label: 'Managed',
            sortable: true
          },
          {
            property: 'a11y_standard',
            label: 'Continuous',
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
      purpose: 'Assess where an organisation sits on the accessibility maturity curve — from ad-hoc fixes to embedded culture — and identify the next level-up actions.',
      core_question: 'Is accessibility a reactive fix or a proactive capability in our organisation, and what would move us one level higher?',
      when_to_use: [
        'You want to ensure your product is usable by people with disabilities',
        'You need to meet regulatory accessibility requirements',
        'You are designing for diverse user contexts and abilities'
      ],
      when_not_to_use: [
        'The product is an internal prototype not intended for public use',
        'Accessibility has already been audited and meets all standards'
      ]
    }
  },
  {
    id: 'inclusive-design-principles',
    name: 'Inclusive Design Principles',
    version: '1.0.0',
    description: 'Seven principles for designing inclusive products that work for the widest possible audience.',
    category: 'accessibility',
    origin: {
      type: 'practitioner',
      attribution: 'Paciello Group',
      url: 'https://inclusivedesignprinciples.info/',
      year: 2017,
      description: 'Published by the Paciello Group (now TPGi) in 2017. Distils inclusive design thinking into actionable principles that go beyond WCAG compliance to design for the full spectrum of human diversity.',
      license: 'open_attribution',
    },
    tags: [
      'accessibility',
      'collection'
    ],
    slots: [
      {
        label: 'Provide Comparable Experience',
        entityTypeId: 'a11y_guideline',
        description: 'Provide Comparable Experience — group of a11y guideline entities'
      },
      {
        label: 'Consider Situation',
        entityTypeId: 'a11y_guideline',
        description: 'Consider Situation — group of a11y standard entities'
      },
      {
        label: 'Be Consistent',
        entityTypeId: 'a11y_guideline',
        description: 'Be Consistent — group of design guideline entities'
      },
      {
        label: 'Give Control',
        entityTypeId: 'a11y_guideline',
        description: 'Give Control — group of a11y annotation entities'
      },
      {
        label: 'Offer Choice',
        entityTypeId: 'a11y_guideline',
        description: 'Offer Choice — group of a11y guideline entities'
      },
      {
        label: 'Prioritise Content',
        entityTypeId: 'a11y_guideline',
        description: 'Prioritise Content — group of a11y standard entities'
      },
      {
        label: 'Add Value',
        entityTypeId: 'a11y_guideline',
        description: 'Add Value — group of design guideline entities'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'a11y_guideline',
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
      purpose: 'Apply design principles that consider the full range of human diversity from the start, rather than retrofitting accessibility onto a design built for the average user.',
      core_question: 'Are we designing for the widest possible range of users from the outset, or are we designing for ourselves and patching later?',
      when_to_use: [
        'You want to ensure your product is usable by people with disabilities',
        'You need to meet regulatory accessibility requirements',
        'You are designing for diverse user contexts and abilities'
      ],
      when_not_to_use: [
        'The product is an internal prototype not intended for public use',
        'Accessibility has already been audited and meets all standards'
      ]
    }
  },
  {
    id: 'cognitive-walkthrough',
    approach_ids: ['inspect'],
    name: 'Cognitive Walkthrough',
    version: '1.0.0',
    description: 'Step-by-step learnability evaluation — can users figure out each step without prior instruction?',
    category: 'accessibility',
    origin: {
      type: 'practitioner',
      attribution: 'Wharton et al.',
      description: 'Introduced by Wharton, Rieman, Lewis, and Polson in 1994 as a usability inspection method. Unlike heuristic evaluation, it simulates a novice user\'s thought process at each step of a task.',
      year: 1994,
      license: 'public_domain',
    },
    tags: [
      'accessibility',
      'flow'
    ],
    slots: [
      {
        label: 'Task Definition',
        entityTypeId: 'task',
        description: 'Task Definition phase — a11y audit entities move through this stage'
      },
      {
        label: 'Action Sequence',
        entityTypeId: 'user_flow',
        description: 'Action Sequence phase — user flow entities move through this stage'
      },
      {
        label: 'Will User Try?',
        entityTypeId: 'observation',
        description: 'Will User Try? phase — screen entities move through this stage'
      },
      {
        label: 'Will User Notice?',
        entityTypeId: 'observation',
        description: 'Will User Notice? phase — observation entities move through this stage'
      },
      {
        label: 'Will User Understand?',
        entityTypeId: 'a11y_issue',
        description: 'Will User Understand? phase — a11y issue entities move through this stage'
      },
      {
        label: 'Will User Progress?',
        entityTypeId: 'observation',
        description: 'Will User Progress? phase — a11y audit entities move through this stage'
      }
    ],
    data: {
      entity_types: [
          {
            type: 'user_flow',
            role: 'leaf'
          },
          {
            type: 'observation',
            role: 'item'
          },
          {
            type: 'a11y_issue',
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
      purpose: 'Step through a task from a first-time user\'s perspective, evaluating whether each step is discoverable, understandable, and recoverable without prior knowledge.',
      core_question: 'Can a new user complete this task without training, and at which step would they get stuck or confused?',
      when_to_use: [
        'You want to ensure your product is usable by people with disabilities',
        'You need to meet regulatory accessibility requirements',
        'You are designing for diverse user contexts and abilities'
      ],
      when_not_to_use: [
        'The product is an internal prototype not intended for public use',
        'Accessibility has already been audited and meets all standards'
      ]
    }
  }
]
