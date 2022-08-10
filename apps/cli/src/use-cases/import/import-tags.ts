import { ITagExport } from '@codelab/shared/abstract/core'
import { cLog } from '@codelab/shared/utils'
import { upsertTag } from '../../repository/tag.repo'

export const importTags = async (
  tags: Array<ITagExport> = [],
  selectedUser: string,
) => {
  console.log('Importing tag...\n')

  for (const tag of tags) {
    console.log('\n---------------------\n')
    console.log(`Upserting ${tag.name}:`)
    cLog(tag)
    console.log('\n')

    await upsertTag(tag, selectedUser)
  }
}
