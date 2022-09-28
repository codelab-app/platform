import { TagOGM, tagSelectionSet } from '@codelab/backend/adapter/neo4j'
import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { ITagExport } from '@codelab/shared/abstract/core'
import { BaseUniqueWhereCallback } from '@codelab/shared/abstract/types'
import { connectNode, whereNodeId } from '@codelab/shared/data'
import { cLog } from '@codelab/shared/utils'
import { logTask } from '../shared/utils/log-task'

/**
 * Used for seeding only, will overwrite existing data
 */
export const connectChildTagToParent = async (
  tag: ITagExport,
): Promise<void> => {
  const Tag = await TagOGM()

  const input = {
    where: { id: tag.id },
    connect: {
      children: tag.children?.map((childTag) => whereNodeId(childTag.id)),
      parent: whereNodeId(tag.parent?.id),
    },
    disconnect: {
      children: [{ where: {} }],
      parent: { where: {} },
    },
  }

  cLog(input)

  try {
    await Tag.update(input)
  } catch (e) {
    console.error(e)
    throw new Error('Error connecting tag to parent')
  }
}

export const upsertTag = async (
  tag: ITagExport,
  selectedUserId: string,
  where: BaseUniqueWhereCallback<ITagExport>,
): Promise<void> => {
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
      await Tag.create({
        input: [createInput],
        selectionSet: tagSelectionSet,
      })
    } catch (e) {
      console.error(e)
      throw new Error('Tag create failed')
    }
  } else {
    logTask('Updating Tag', tag.name)

    const updateInput: OGM_TYPES.TagUpdateInput = {
      ...baseInput,
      id: tag.id,
    }

    try {
      await Tag.update({
        where: { name: tag.name },
        update: updateInput,
      })
    } catch (e) {
      console.error(e)
      throw new Error('Tag update failed')
    }
  }
}
