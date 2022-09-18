import { AtomOGM } from '@codelab/backend/adapter/neo4j'
import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { IAtomExport } from '@codelab/shared/abstract/core'
import {
  BaseUniqueWhereCallback,
  connectId,
  connectTypeId,
} from '@codelab/shared/data'
import { v4 } from 'uuid'

/**
 * We upsert by ID so we can easily change the names by re-running import
 */
export const upsertAtom = async (
  atom: IAtomExport,
  userId: string,
  where: BaseUniqueWhereCallback<IAtomExport>,
) => {
  const Atom = await AtomOGM()

  const existingAtom = await Atom.find({
    where: where(atom),
  })

  const baseInput = {
    id: atom.id,
    name: atom.name,
    type: atom.type,
    icon: atom.icon,
    // Create an interface if not existing
    api: atom.api?.id
      ? connectId(atom.api?.id)
      : {
          create: {
            node: {
              id: v4(),
              name: `${atom.name} API`,
              owner: connectTypeId(userId),
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

      // for programmatic API __seedData
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

  if (!existingAtom.length) {
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
