import { TagTree } from '@codelab/frontend/abstract/props'
import { TagFragment, TagGraphFragment } from '@codelab/shared/codegen/graphql'
import { TagGraphTreeAdapter } from './TagGraphTreeAdapter'

export const useTagTree = (
  graph?: TagGraphFragment | null,
): TagTree<TagFragment> => {
  return new TagGraphTreeAdapter(graph)
}
