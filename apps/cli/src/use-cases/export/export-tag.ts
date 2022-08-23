import { TagOGM, tagSelectionSet } from '@codelab/backend'
import { ITagExport } from '@codelab/shared/abstract/core'

export const exportTag = async () => {
  const Tag = await TagOGM()

  const tags = (await Tag.find({
    selectionSet: tagSelectionSet,
  })) as Array<ITagExport>

  return { tags }
}
