import { TypeTree } from '@codelab/shared/core'
import { TypeGraphFragment } from '../graphql/TypeGraph.fragment.graphql.gen'

/**
 * Parses a TypeGraph and provides helper methods for it
 */
export const useTypeTree = (graph?: TypeGraphFragment | null) => {
  return new TypeTree(graph ?? { edges: [], vertices: [] })
}
