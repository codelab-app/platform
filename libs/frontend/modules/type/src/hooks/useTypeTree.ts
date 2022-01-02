import { Nullable } from '@codelab/shared/abstract/types'
import { TypeTree } from '@codelab/shared/core'
import { TypeGraphFragment } from '../graphql/TypeGraph.fragment.graphql.gen'

/**
 * Parses a TypeGraph and provides helper methods for it
 */
export const useTypeTree = (graph?: Nullable<TypeGraphFragment>) => {
  return new TypeTree(graph ?? { edges: [], vertices: [] })
}
