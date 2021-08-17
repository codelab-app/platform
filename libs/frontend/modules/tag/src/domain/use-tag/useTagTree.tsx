import { TagTree } from '@codelab/frontend/abstract/props'
import { TagGraphTreeAdapter } from '@codelab/frontend/model/domain'
import { TagFragment, TagGraphFragment } from '@codelab/shared/codegen/graphql'

export const useTagTree = (
  graph?: TagGraphFragment | null,
): TagTree<TagFragment> => {
  return new TagGraphTreeAdapter(graph)
}
