import { ElementGraphFragment } from '@codelab/codegen/graphql'
import { ElementGraphTreeAdapter } from './ElemenGraphTreeAdapter'
import { ElementTree } from './ElementTree'

/**
 * Parses a ElementGraph and provides a tree interface
 */
export const useElementTree = (graph?: ElementGraphFragment): ElementTree => {
  return new ElementGraphTreeAdapter(graph)
}
