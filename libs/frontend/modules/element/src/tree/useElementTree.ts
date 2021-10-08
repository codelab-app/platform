import { ElementTree } from '@codelab/shared/core'
import { ElementGraphGraphql } from './ElementGraphGraphql'

/**
 * Parses a ElementGraph and provides a tree interface
 */
export const useElementTree = (
  graph?: ElementGraphGraphql | null,
): ElementTree => {
  return new ElementTree(graph ?? { vertices: [], edges: [] })
}
