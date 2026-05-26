# @unified-product-graph/templates

Entity templates for bootstrapping product graphs in the [Unified Product Graph](https://unifiedproductgraph.org). Start from proven patterns instead of blank pages.

## What is this?

When you create a new product graph, you start with nothing. Templates give you a structured starting point: pre-built sets of entities (personas, hypotheses, funnels, business models) with relationships between them, tailored to your industry and product stage.

Each template is a `TemplateSet` containing multiple related entities, edges connecting them, and placeholder prompts that personalise the output to your product.

## Available Templates

### SaaS (`saas`)

| Template | ID | Stages | What you get |
|----------|----|--------|--------------|
| SaaS Technical Buyer Persona | `saas-technical-buyer-persona` | idea, mvp | 1 persona, 2 jobs-to-be-done, 2 pain points |
| PLG Acquisition Funnel | `saas-plg-funnel` | mvp, growth | 1 funnel, 5 funnel steps (AARRR pirate metrics) |
| SaaS Business Model | `saas-business-model` | mvp, growth | 1 business model, 1 revenue stream, 1 value proposition, 1 cost structure |
| Feature-Led Roadmap | `saas-feature-roadmap` | mvp, growth | 1 release, 3 features, 3 epics |
| SaaS Hypothesis Set | `saas-hypothesis-set` | idea, mvp | 3 hypotheses (value, usability, feasibility), 1 experiment |

### Marketplace (`marketplace`)

| Template | ID | Stages | What you get |
|----------|----|--------|--------------|
| Two-Sided Persona Pair | `marketplace-two-sided-personas` | idea, mvp | 2 personas (buyer + seller), 4 jobs-to-be-done |
| Marketplace Business Model | `marketplace-business-model` | mvp, growth | 1 business model, 2 revenue streams (take rate + subscription), 2 value propositions |
| Supply-Demand Hypothesis Set | `marketplace-hypothesis-set` | idea, mvp | 3 hypotheses (supply, demand, matching) |

### Mobile (`mobile`)

| Template | ID | Stages | What you get |
|----------|----|--------|--------------|
| Mobile User Persona | `mobile-user-persona` | idea, mvp | 1 persona, 2 jobs-to-be-done, 2 pain points |
| App Engagement Loop | `mobile-engagement-loop` | mvp, growth | 1 funnel, 5 funnel steps (download to share) |
| Mobile Launch Checklist | `mobile-launch-checklist` | mvp | 1 release, 5 features (onboarding, core loop, notifications, analytics, crash reporting) |

### Open Source (`oss`)

| Template | ID | Stages | What you get |
|----------|----|--------|--------------|
| OSS Community Personas | `oss-community-personas` | idea, mvp | 2 personas (contributor + user), 4 jobs-to-be-done |
| OSS Adoption Funnel | `oss-adoption-funnel` | mvp, growth | 1 funnel, 6 funnel steps (discover to evangelize) |
| OSS to Commercial | `oss-to-commercial` | growth, scale | 1 business model, 2 value propositions (community + enterprise), 1 revenue stream |

### Agency (`agency`)

| Template | ID | Stages | What you get |
|----------|----|--------|--------------|
| Client Persona | `agency-client-persona` | idea, mvp, growth | 1 persona, 2 jobs-to-be-done, 2 pain points |
| Service Blueprint | `agency-service-blueprint` | mvp, growth | 1 business model, 3 revenue streams (project, retainer, advisory) |
| Engagement Kickoff | `agency-engagement-kickoff` | mvp, growth, scale | 1 release, 5 features (discovery through handoff phases) |

## Installation

```bash
npm install @unified-product-graph/templates
```

## Usage

### Get templates by industry

```ts
import { getTemplatesForIndustry } from '@unified-product-graph/templates'

const templates = getTemplatesForIndustry('saas')
// Returns all 5 SaaS templates
```

### Get templates by product stage

```ts
import { getTemplatesForStage } from '@unified-product-graph/templates'

const templates = getTemplatesForStage('idea')
// Returns all templates applicable to the idea stage
```

### Access all templates

```ts
import { ALL_TEMPLATES } from '@unified-product-graph/templates'

console.log(ALL_TEMPLATES.length) // 17 templates across 5 industries
```

### Access templates by industry export

```ts
import { saasTemplates, marketplaceTemplates, mobileTemplates, ossTemplates, agencyTemplates } from '@unified-product-graph/templates'
```

## Placeholder System

Templates use `{{placeholder}}` syntax in titles, descriptions, and properties. Each template includes a `prompts` map that tells you what to ask the user for each placeholder.

For example, the SaaS Technical Buyer Persona template has:

```ts
{
  entities: [
    {
      type: 'persona',
      title_template: '{{persona_name}} -- {{persona_role}}',
      description_template: '{{persona_motivation}}',
      // ...
    },
    // ...
  ],
  prompts: {
    persona_name: "What's this persona's name? (e.g. Alex Chen, Jordan Rivera)",
    persona_role: "What's their role? (e.g. VP of Engineering, Staff Developer)",
    persona_motivation: "What drives this person? What gets them excited about their work?",
    problem_domain: "What problem domain does your product address? (e.g. deployment, data pipelines)",
    // ...
  }
}
```

To apply a template, collect answers for each key in `prompts`, then replace all `{{placeholder}}` occurrences in `title_template`, `description_template`, and `default_properties` with the user's answers.

## Output Structure

A `TemplateSet` produces:

```ts
interface TemplateSet {
  id: string                          // Unique template ID
  name: string                        // Human-readable name
  description: string                 // Shown in template picker
  industries: string[]                // Which industries this applies to
  stages: ('idea' | 'mvp' | 'growth' | 'scale')[]
  entities: EntityTemplate[]          // Entities to create
  edges?: Array<{                     // Relationships between entities (by index)
    source_index: number
    target_index: number
  }>
  prompts?: Record<string, string>    // Placeholder key -> question to ask
}

interface EntityTemplate {
  type: string                        // UPG entity type
  title_template: string              // Title with {{placeholders}}
  description_template?: string
  default_properties?: Record<string, unknown>
  default_tags?: string[]
  default_status?: string
}
```

## Extending with Custom Templates

Create a new file exporting `TemplateSet[]`:

```ts
import type { TemplateSet } from '@unified-product-graph/templates'

export const myTemplates: TemplateSet[] = [
  {
    id: 'my-custom-template',
    name: 'My Custom Template',
    description: 'Description for the template picker',
    industries: ['fintech'],
    stages: ['idea'],
    entities: [
      {
        type: 'persona',
        title_template: '{{name}} -- {{role}}',
        description_template: '{{motivation}}',
        default_tags: ['fintech'],
      },
    ],
    edges: [],
    prompts: {
      name: 'Persona name?',
      role: 'Their role?',
      motivation: 'What drives them?',
    },
  },
]
```

Then merge with the built-in templates:

```ts
import { ALL_TEMPLATES } from '@unified-product-graph/templates'
import { myTemplates } from './my-templates.js'

const allTemplates = [...ALL_TEMPLATES, ...myTemplates]
```

## License

MIT
