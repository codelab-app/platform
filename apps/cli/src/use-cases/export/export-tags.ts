import { TagOGM, tagSelectionSet } from '@codelab/backend'
import { ITagExport } from '@codelab/shared/abstract/core'

export const exportTags = async () => {
  const Tag = await TagOGM()

  return (await Tag.find({
    selectionSet: tagSelectionSet,
  })) as Array<ITagExport>
}
