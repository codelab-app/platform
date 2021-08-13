import {
  __TypeFragment,
  __TypeGraphFragment,
} from '@codelab/shared/codegen/graphql'
import { ITypeTree, TypeGraphTreeAdapter } from '@codelab/shared/graph'
import { typeGraphFragmentToTypeGraph } from './typeGraphFragmentToTypeGraph'
import { typenameToTypeKind } from './typenameToTypeKind'

/**
 * Parses a TypeGraph and provides helper methods for it
 */
export const useTypeTree = (graph?: __TypeGraphFragment | null): ITypeTree => {
  return new TypeGraphTreeAdapter(
    graph ? typeGraphFragmentToTypeGraph(graph) : undefined,
    (type) => typenameToTypeKind((type as __TypeFragment).__typename),
  )
}
