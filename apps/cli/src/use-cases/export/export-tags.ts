import { TagOGM, tagSelectionSet } from '@codelab/backend/adapter/neo4j'
import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { ITagExport } from '@codelab/shared/abstract/core'

export const exportTags = async () => {
  const Tag = await TagOGM()

  return (await Tag.find({
    selectionSet: tagSelectionSet,
    options: {
      sort: [{ name: OGM_TYPES.SortDirection.Asc }],
    },
  })) as Array<ITagExport>
}
