import {
  ITypeGraph,
  ITypeTree,
  TypeGraphTreeAdapter,
} from '@codelab/shared/abstract/core'
import { __TypeGraphFragment } from '@codelab/shared/codegen/graphql'

/**
 * Parses a TypeGraph and provides helper methods for it
 */
export const useTypeTree = (graph?: __TypeGraphFragment | null): ITypeTree => {
  // FIXME
  // there's a difference between union typed 'kind', and a general typed TypeKind one, so we have to cast
  // can we make them the same somehow, tweak some graphql-gen settings perhaps? Or make concrete models have concrete enum types?

  return new TypeGraphTreeAdapter(graph as any as ITypeGraph)
}
