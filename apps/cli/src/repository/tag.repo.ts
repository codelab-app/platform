import { TagOGM } from '@codelab/backend/adapter/neo4j'
import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { ITagExport } from '@codelab/shared/abstract/core'
import { BaseUniqueWhereCallback } from '@codelab/shared/data'

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
  where: BaseUniqueWhereCallback<ITagExport>,
) => {
  const Tag = await TagOGM()

  console.log(`[Finding Tag]: with ${where}`)

  const existingTag = await Tag.find({
    where: where(tag),
  })

  const baseInput: Pick<OGM_TYPES.TagCreateInput, 'owner'> = {
    owner: { connect: { where: { node: { id: selectedUser } } } },
  }

  if (!existingTag.length) {
    console.log(`[Creating Tag]: ${tag.name}`)

    const createInput: OGM_TYPES.TagCreateInput = {
      ...baseInput,
      name: tag.name,
      id: tag.id,
    }

    return Tag.create({
      input: [createInput],
    })
  } else {
    console.log(`[Updating Tag]: ${tag.name}`)

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
