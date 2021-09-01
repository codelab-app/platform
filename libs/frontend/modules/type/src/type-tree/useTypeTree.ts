import { TypeGraphFragment } from '../graphql/TypeGraph.fragment.api.graphql'
import { TypeTreeGraphql } from '../shared'
/**
 * Parses a TypeGraph and provides helper methods for it
 */

export const useTypeTree = (graph?: TypeGraphFragment | null) => {
  return new TypeTreeGraphql(graph)
}
