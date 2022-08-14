import { TagOGM } from '@codelab/backend'
import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { ITagExport } from '@codelab/shared/abstract/core'

export const upsertTag = async (tag: ITagExport, selectedUser: string) => {
  try {
    const Tag = await TagOGM()

    const nameExisting = await Tag.find({
      where: {
        name: tag.name,
      },
    })

    const baseInput = {
      owner: { connect: { where: { node: { id: selectedUser } } } },
      name: tag.name,
    }

    const connectOrCreateChildren = (tag.children || []).map((_tag) => ({
      where: { node: { name: _tag.name } },
      onCreate: { node: { name: _tag.name } },
    }))

    const connectOrCreateParent = {
      where: { node: { name: String(tag.parent?.name) } },
      onCreate: { node: { name: String(tag.parent?.name) } },
    }

    if (!nameExisting.length) {
      console.log(`Creating ${tag.name}...`)

      const createInput: OGM_TYPES.TagCreateInput = {
        ...baseInput,
        children: {
          connectOrCreate: connectOrCreateChildren,
        },
      }

      if (tag.parent) {
        createInput.parent = {
          connectOrCreate: connectOrCreateParent,
        }
      }

      try {
        return await Tag.create({
          input: [createInput],
        })
      } catch (e) {
        console.error(e)

        return
      }
    }

    return
  } catch (e) {
    console.log({ e })
  }

  return
}
