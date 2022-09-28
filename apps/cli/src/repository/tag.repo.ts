import { TagOGM } from '@codelab/backend/adapter/neo4j'
import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { ITagExport } from '@codelab/shared/abstract/core'
import { BaseUniqueWhereCallback } from '@codelab/shared/abstract/types'
import { connectNode, whereNodeId } from '@codelab/shared/data'
import { logTask } from '../shared/utils/log-task'

export const connectChildTagToParent = async (tag: ITagExport) => {
  const Tag = await TagOGM()

  const input = {
    where: { id: tag.id },
    connect: {
      children: tag.children?.map((childTag) => whereNodeId(childTag.id)),
      parent: whereNodeId(tag.parent?.id),
    },
  }
  // console.log(input)

  return Tag.update(input)
}

export const upsertTag = async (
  tag: ITagExport,
  selectedUserId: string,
  where: BaseUniqueWhereCallback<ITagExport>,
) => {
  const Tag = await TagOGM()

  const existingTag = await Tag.find({
    where: where(tag),
  })

  const baseInput: Pick<OGM_TYPES.TagCreateInput, 'owner'> = {
    owner: connectNode(selectedUserId),
  }

  if (!existingTag.length) {
    logTask('Created Task', tag.name)

    const createInput: OGM_TYPES.TagCreateInput = {
      ...baseInput,
      name: tag.name,
      id: tag.id,
    }

    try {
      return Tag.create({
        input: [createInput],
      })
    } catch (e) {
      console.error(e)
    }
  } else {
    logTask('Updating Tag', tag.name)

    const updateInput: any = {
      ...baseInput,
      id: tag.id,
    }

    return Tag.update({
      where: { name: tag.name },
      update: updateInput,
    })
  }

  return
}
