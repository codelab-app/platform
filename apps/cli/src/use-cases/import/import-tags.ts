import { ITagExport } from '@codelab/shared/abstract/core'
import { cLog } from '@codelab/shared/utils'
import { connectChildTagToParent, upsertTag } from '../../repository/tag.repo'

export const importTags = async (
  tags: Array<ITagExport> = [],
  selectedUser: string,
) => {
  console.log('Importing tag...\n')

  const createTagsOperations = tags.map((tag) => {
    console.log('\n---------------------\n')
    console.log(`Upserting ${tag.name}:`)
    cLog(tag)
    console.log('\n')

    return upsertTag(tag, selectedUser, (whereTag: ITagExport) => ({
      name: whereTag.name,
    }))
  })

  await Promise.all(createTagsOperations)

  const syncTagsOperations = tags.map((tag) => {
    console.log(`Link Tag ${tag.name}:`, tag)
    console.log('\n')

    return connectChildTagToParent(tag)
  })

  await Promise.all(syncTagsOperations)
}
