import type { ITag } from '@codelab/backend/abstract/core'
import {
  Repository,
  tagSelectionSet,
} from '@codelab/backend/infra/adapter/neo4j'
import { OGM_TYPES } from '@codelab/shared/abstract/codegen'

export const exportTags = async () => {
  const Tag = await Repository.instance.Tag

  return (await Tag.find({
    options: {
      sort: [{ name: OGM_TYPES.SortDirection.Asc }],
    },
    selectionSet: tagSelectionSet,
  })) as Array<ITag>
}
