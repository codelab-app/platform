import {
  Repository,
  tagSelectionSet,
} from '@codelab/backend/infra/adapter/neo4j'
import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { ITagExport } from '@codelab/shared/abstract/core'

export const exportTags = async () => {
  const Tag = await Repository.instance.Tag

  return (await Tag.find({
    selectionSet: tagSelectionSet,
    options: {
      sort: [{ name: OGM_TYPES.SortDirection.Asc }],
    },
  })) as Array<ITagExport>
}
