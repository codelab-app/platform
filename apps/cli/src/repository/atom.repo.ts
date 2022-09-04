import { AtomOGM } from '@codelab/backend/adapter/neo4j'
import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { IAtomExport } from '@codelab/shared/abstract/core'
import { connectId } from '@codelab/shared/data'
import { v4 } from 'uuid'

export const upsertAtom = async (atom: IAtomExport, userId: string) => {
  const Atom = await AtomOGM()

  // Find by ID & find by name
  const idExisting = await Atom.find({
    where: {
      id: atom.id,
    },
  })

  const baseInput = {
    id: atom.id,
    name: atom.name,
    type: atom.type as OGM_TYPES.AtomType,
    icon: atom.icon,
    // Create an interface if not existing
    api: atom.api?.id
      ? connectId(atom.api?.id)
      : {
          create: {
            node: {
              id: v4(),
              name: `${atom.name} API`,
              owner: connectId(userId),
            },
          },
        },
  }

  const connectTags: OGM_TYPES.AtomTagsFieldInput['connect'] =
    atom.tags?.map((tag) => {
      if (tag.id) {
        return {
          where: { node: { id: tag.id } },
        }
      }

      //  for programatical API __seedData
      return {
        where: { node: { name: tag.name } },
      }
    }) || []

  const createInput: OGM_TYPES.AtomCreateInput = {
    ...baseInput,
    tags: { connect: connectTags },
  }

  const updateInput: OGM_TYPES.AtomUpdateInput = {
    ...baseInput,
    tags: [{ connect: connectTags }],
  }

  if (!idExisting.length) {
    console.log(`Creating ${atom.name}...`)

    try {
      return await Atom.create({
        input: [createInput],
      })
    } catch (e) {
      console.error(e)

      return
    }
  }

  console.log(`Updating ${atom.name}...`)

  return await Atom.update({
    where: {
      id: atom.id,
    },
    update: updateInput,
  })
}
