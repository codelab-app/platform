import { ITagExport } from '@codelab/shared/abstract/core'
import { cLog } from '@codelab/shared/utils'
import { createOrUpdateTag, linkTag } from '../../repository/tag.repo'

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

    return createOrUpdateTag(tag, selectedUser)
  })

  await Promise.all(createTagsOperations)

  const syncTagsOperations = tags.map((tag) => {
    console.log(`Link Tag ${tag.name}:`)
    console.log('\n')

    return linkTag(tag)
  })

  await Promise.all(syncTagsOperations)
  console.log('DONE')
}
