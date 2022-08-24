import { TagOGM } from '@codelab/backend'
import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { ITagExport } from '@codelab/shared/abstract/core'

export const linkTag = async (tag: ITagExport) => {
  const connectChildrens =
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
      children: connectChildrens,
      parent: connectParent,
    },
  }

  return Tag.update(updateInput)
}

export const createOrUpdateTag = async (
  tag: ITagExport,
  selectedUser: string,
) => {
  const Tag = await TagOGM()

  const nameExisting = await Tag.find({
    where: {
      name: tag.name,
    },
  })

  const baseInput: Pick<OGM_TYPES.TagCreateInput, 'owner'> = {
    owner: { connect: { where: { node: { id: selectedUser } } } },
  }

  if (!nameExisting.length) {
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
