import { IGraph } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { TreeService } from '@codelab/shared/core'
import { TagFragment } from '../graphql/Tag.fragment.graphql.gen'
import { TagEdgeFragment } from '../graphql/TagEdge.fragment.graphql.gen'

export type GraphqlTagGraph = IGraph<TagFragment, TagEdgeFragment>

export const useTagTree = (
  graph?: Nullable<GraphqlTagGraph>,
): TreeService<TagFragment, TagEdgeFragment> => {
  return new TreeService(graph ?? { vertices: [], edges: [] })
}

// export const useTagTrees = (
//   graphs: Array<GraphqlTagGraph> = [],
// ): Array<TreeService<TagFragment, TagEdgeFragment>> => {
//   return graphs.map((graph) => new TreeService(graph))
// }
