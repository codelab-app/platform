import { Graph } from '@codelab/shared/abstract/core'
import { TreeAdapter } from '@codelab/shared/core'
import { TagFragment } from '../../graphql/Tag.fragment.api.graphql'
import { TagEdgeFragment } from '../../graphql/TagEdge.fragment.api.graphql'

export type GraphqlTagGraph = Graph<TagFragment, TagEdgeFragment>

export const useTagTree = (
  graph?: GraphqlTagGraph | null,
): TreeAdapter<TagFragment, TagEdgeFragment> => {
  return new TreeAdapter(graph)
}
