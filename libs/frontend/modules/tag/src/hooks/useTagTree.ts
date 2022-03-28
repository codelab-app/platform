import { IGraph } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { TreeService } from '@codelab/shared/core'

export type GraphqlTagGraph = IGraph<any, any>

export const useTagTree = (
  graph?: Nullable<GraphqlTagGraph>,
): TreeService<any, any> => {
  return new TreeService(graph ?? { vertices: [], edges: [] })
}

// export const useTagTrees = (
//   graphs: Array<GraphqlTagGraph> = [],
// ): Array<TreeService<TagFragment, TagEdgeFragment>> => {
//   return graphs.map((graph) => new TreeService(graph))
// }
