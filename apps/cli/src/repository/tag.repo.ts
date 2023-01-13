import type { ITagExport } from '@codelab/backend/abstract/core'
import {
  Repository,
  tagSelectionSet,
} from '@codelab/backend/infra/adapter/neo4j'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import type { BaseUniqueWhereCallback } from '@codelab/shared/abstract/types'
import { connectNode, whereNode } from '@codelab/shared/data'
import { logTask } from '../shared/utils/log-task'

/**
 * Used for seeding only, will overwrite existing data
 */
export const connectChildTagToParent = async (
  tag: ITagExport,
): Promise<void> => {
  const Tag = await Repository.instance.Tag

  // At this point, connections may be missing if it's first time
  const currentTag = (
    await Tag.find({
      where: {
        name: tag.name,
      },
      selectionSet: tagSelectionSet,
    })
  )[0]

  if (!currentTag) {
    throw new Error('Missing current tag')
  }

  const input = {
    where: { name: tag.name },
    /**
     * Reconnect the parent
     */
    connect: {
      parent: tag.parent?.name ? whereNode('name', tag.parent.name) : undefined,
    },
    // disconnect: {
    //   parent: { where: {} },
    // },
  }

  logTask('Connect Input', tag.name, input)
  console.log(tag)

  try {
    await Tag.update(input)
  } catch (e) {
    console.log(tag)
    console.log(input)
    console.log(e)
    throw new Error('Error connecting tag to parent')
  }
}

export const upsertTag = async (
  tag: ITagExport,
  userId: string,
  where: BaseUniqueWhereCallback<ITagExport>,
): Promise<void> => {
  const Tag = await Repository.instance.Tag

  const existingTag = await Tag.find({
    where: where(tag),
  })

  const baseInput: Pick<OGM_TYPES.TagCreateInput, 'owner'> = {
    owner: connectNode(userId),
  }

  if (!existingTag.length) {
    logTask('Created Tag', tag.name)

    const createInput: OGM_TYPES.TagCreateInput = {
      ...baseInput,
      name: tag.name,
      id: tag.id,
    }

    try {
      await Tag.create({
        input: [createInput],
      })
    } catch (e) {
      console.error(e)
      throw new Error('Tag create failed')
    }
  } else {
    logTask('Updating Tag', tag.name)

    const updateInput: OGM_TYPES.TagUpdateInput = {
      ...baseInput,
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
