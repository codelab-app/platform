import { ElementGraphGraphql } from './ElementGraphGraphql'
import { ElementTreeGraphql } from './ElementTreeGraphql'

/**
 * Parses a ElementGraph and provides a tree interface
 */
export const useElementTree = (
  graph?: ElementGraphGraphql | null,
): ElementTreeGraphql => {
  return new ElementTreeGraphql(graph ?? { vertices: [], edges: [] })
}
