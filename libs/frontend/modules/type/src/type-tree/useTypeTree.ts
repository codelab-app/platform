import { TypeGraphTreeAdapter } from '@codelab/frontend/model/domain'
import { __TypeGraphFragment } from '@codelab/shared/codegen/graphql'

/**
 * Parses a TypeGraph and provides helper methods for it
 */
export const useTypeTree = (graph?: __TypeGraphFragment | null) => {
  return new TypeGraphTreeAdapter(graph)
}
