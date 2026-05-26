/**
 * UPG v0.2 Workspace Properties.
 * https://unifiedproductgraph.org/spec | MIT
 */

import type { ISODateTime } from '../primitives.js'

/** Workspace: a spatial thinking space for arranging entities.
 *
 * A transient or durable canvas where a team arranges, relates, and debates
 * entities before committing them to the wider product graph. Distinct from
 * `feature_area` (which structures shipped product) and `team` (the people
 * unit): a workspace is the *space* a team thinks in.
 *
 * Per UPG principle P14, structural relationships are edges:
 *   parent product: `product_contains_workspace`
 *   members: `team_works_in_workspace` / `persona_collaborates_in_workspace`
 *     (the `member_count` and `owner` properties are display-time aggregates;
 *     canonical membership is the edge set)
 *   contained entities: spatial placement is recorded on edge metadata
 *
 * @example
 * const properties: WorkspaceProperties = {
 *   slug: 'q2-discovery',
 *   visibility: 'shared',
 *   purpose: 'Arrange personas, jobs, and opportunities for the Q2 discovery sprint.',
 *   workspace_purpose: 'discovery',
 *   owner: 'sam.patel@arkheiev.com',
 *   member_count: 5,
 *   archived: false,
 *   archived_at: undefined,
 *   icon: 'compass',
 * }
 */
export interface WorkspaceProperties {
  /** URL-friendly identifier */
  slug?: string
  /** Who can see this workspace */
  visibility?: 'private' | 'shared' | 'public'
  /** Free-text description. Pairs with the closed-enum `workspace_purpose`. */
  purpose?: string
  /**
   * Closed-enum classifier. Drives template suggestions and surfaces in workspace browsers.
   *   `discovery` = persona/job/opportunity exploration.
   *   `planning` = roadmap and decision sessions.
   *   `retrospective` = reflection on shipped work.
   *   `design` = experience or UI exploration.
   *   `research` = organising study data and synthesis.
   *   `strategy` = high-level direction setting.
   *   `general` = catch-all.
   */
  workspace_purpose?: 'discovery' | 'planning' | 'retrospective' | 'design' | 'research' | 'strategy' | 'general'
  /** Workspace owner (handle or email). Display label; canonical owner is `team_owns_workspace` or `persona_owns_workspace`. */
  owner?: string
  /** Snapshot count. `team_works_in_workspace` edges are the source of truth. */
  member_count?: number
  /** Archived. Archived workspaces remain queryable but hidden from default views. */
  archived?: boolean
  /** ISO timestamp archived. Pairs with `archived === true`. */
  archived_at?: ISODateTime
  /** Display icon (emoji or icon name) */
  icon?: string
}
