import { Graph } from '@codelab/shared/abstract/core'
import { TreeAdapter } from '@codelab/shared/core'
import { TagFragment } from '../../graphql/Tag.fragment.graphql.gen'
import { TagEdgeFragment } from '../../graphql/TagEdge.fragment.graphql.gen'

export type GraphqlTagGraph = Graph<TagFragment, TagEdgeFragment>

export const useTagTree = (
  graph?: GraphqlTagGraph | null,
): TreeAdapter<TagFragment, TagEdgeFragment> => {
  return new TreeAdapter(graph)
}

export const useTagTrees = (
  graphs: Array<GraphqlTagGraph> = [],
): Array<TreeAdapter<TagFragment, TagEdgeFragment>> => {
  return graphs.map((graph) => new TreeAdapter(graph))
}
