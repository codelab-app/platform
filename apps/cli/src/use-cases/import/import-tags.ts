import { ITagExport } from '@codelab/shared/abstract/core'
import { connectChildTagToParent, upsertTag } from '../../repository/tag.repo'
import { logSection, logTask } from '../../shared/utils/log-task'

export const importTags = async (
  tags: Array<ITagExport> = [],
  selectedUserId: string,
) => {
  logSection('Importing Tags')

  const createTagsOperations = tags.map((tag) => {
    logTask('Upserting Tag', tag.name)

    return upsertTag(tag, selectedUserId, (whereTag: ITagExport) => ({
      name: whereTag.name,
    }))
  })

  await Promise.all(createTagsOperations)

  const syncTagsOperations = tags.map((tag) => {
    logTask('Linking Tag', tag.name, tag)

    return connectChildTagToParent(tag)
  })

  await Promise.all(syncTagsOperations)
}
