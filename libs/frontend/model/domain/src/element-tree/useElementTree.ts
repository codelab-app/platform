import { ElementTree } from '@codelab/frontend/abstract/props'
import { ElementGraphFragment } from '@codelab/shared/codegen/graphql'
import { ElementGraphTreeAdapter } from './ElementGraphTreeAdapter'

/**
 * Parses a ElementGraph and provides a tree interface
 */
export const useElementTree = (
  graph?: ElementGraphFragment | null,
): ElementTree => {
  return new ElementGraphTreeAdapter(graph)
}
