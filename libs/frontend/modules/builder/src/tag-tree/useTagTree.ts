import { ElementGraphTreeAdapter } from './ElementGraphTreeAdapter'

/**
 * Parses a ElementGraph and provides a tree interface
 */
export const useTagTree = (graph?: TagGraphFragment): TagTree => {
  return new ElementGraphTreeAdapter(graph)
}
