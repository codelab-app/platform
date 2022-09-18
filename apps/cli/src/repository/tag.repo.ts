import { TagOGM } from '@codelab/backend/adapter/neo4j'
import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { ITagExport } from '@codelab/shared/abstract/core'
import { BaseUniqueWhere } from './type.repo'

export const connectChildTagToParent = async (tag: ITagExport) => {
  const connectChildren =
    tag.children?.map((childrenTag) => ({
      where: { node: { id: childrenTag.id } },
    })) || []

  const connectParent = tag.parent?.id
    ? {
        where: { node: { id: tag.parent?.id } },
      }
    : undefined

  const Tag = await TagOGM()

  const updateInput = {
    where: { id: tag.id },
    connect: {
      children: connectChildren,
      parent: connectParent,
    },
  }

  return Tag.update(updateInput)
}

export const upsertTag = async (
  tag: ITagExport,
  selectedUser: string,
  where: BaseUniqueWhere = (_tag: ITagExport) => ({ name: _tag.name }),
) => {
  const Tag = await TagOGM()

  const existingName = await Tag.find({
    where,
  })

  const baseInput: Pick<OGM_TYPES.TagCreateInput, 'owner'> = {
    owner: { connect: { where: { node: { id: selectedUser } } } },
  }

  if (!existingName.length) {
    console.log(`Creating ${tag.name}...`)

    const createInput = {
      ...baseInput,
      name: tag.name,
      id: tag.id,
    }

    return Tag.create({
      input: [createInput as any],
    })
  } else {
    console.log(`Updating ${tag.name} id...`)

    const updateInput: any = {
      ...baseInput,
      id: tag.id,
    }

    return Tag.update({
      where: { name: tag.name },
      update: updateInput,
    })
  }
}
