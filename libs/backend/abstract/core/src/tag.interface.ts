/**
 * Create hierarchical data from data file
 *
 * This is keyed by name
 */
export interface TagNodeData {
  children: Array<TagNodeData>
  name: string
  parent: string | null
}
