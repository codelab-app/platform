import { ElementGraphFragment } from '@codelab/codegen/graphql'
import { ElementTree } from '../interfaces'
import { ElementGraphTreeAdapter } from './ElementGraphTreeAdapter'

/**
 * Parses a ElementGraph and provides a tree interface
 */
export const useElementTree = (
  graph?: ElementGraphFragment | null,
): ElementTree => {
  return new ElementGraphTreeAdapter(graph)
}
