import { TypeTree } from '@codelab/shared/core'
import { TypeFragment } from '../graphql/Type.fragment.graphql.gen'
import { TypeEdgeFragment } from '../graphql/TypeEdge.fragment.graphql.gen'
import { TypeGraphFragment } from '../graphql/TypeGraph.fragment.graphql.gen'

// Type tree composed of graphql fragments
export class TypeTreeGraphql extends TypeTree<TypeFragment, TypeEdgeFragment> {
  // Not useless - constricts to a specific input type
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(graph: TypeGraphFragment | undefined | null) {
    super(graph)
  }
}
