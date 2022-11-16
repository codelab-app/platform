import { OGM_TYPES } from '@codelab/backend/abstract/codegen'
import { ITagExport } from '@codelab/backend/abstract/core'
import {
  Repository,
  tagSelectionSet,
} from '@codelab/backend/infra/adapter/neo4j'
import { BaseUniqueWhereCallback } from '@codelab/shared/abstract/types'
import { connectNode, whereNode } from '@codelab/shared/data'
import { logTask } from '../shared/utils/log-task'

/**
 * Used for seeding only, will overwrite existing data
 */
export const connectChildTagToParent = async (
  tag: ITagExport,
): Promise<void> => {
  const Tag = await Repository.instance.Tag

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
    connect: {
      // children: tag.children
      //   /**
      //    * Need to filter out existing connections
      //    */
      //   ?.filter((childTag) =>
      //     currentTag.children.map((x) => x.name).includes(childTag.name),
      //   )
      //   .map((childTag) => whereNode('name', childTag.name)),

      // If parent exist don't connect again
      parent: currentTag.parent
        ? undefined
        : // eslint-disable-next-line no-inline-comments
        // Connect only if parent exists
        tag.parent?.name
        ? whereNode('name', tag.parent.name)
        : undefined,
    },
  }

  logTask('Connect Input', tag.name, input)

  try {
    await Tag.update(input)
  } catch (e) {
    console.log(input)
    console.log(tag.parent)
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
