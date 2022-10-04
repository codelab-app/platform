import { OGM_TYPES } from '@codelab/backend/abstract/codegen'
import { ITagExport } from '@codelab/backend/abstract/core'
import {
  Repository,
  tagSelectionSet,
} from '@codelab/backend/infra/adapter/neo4j'

export const exportTags = async () => {
  const Tag = await Repository.instance.Tag

  return (await Tag.find({
    selectionSet: tagSelectionSet,
    options: {
      sort: [{ name: OGM_TYPES.SortDirection.Asc }],
    },
  })) as Array<ITagExport>
}
