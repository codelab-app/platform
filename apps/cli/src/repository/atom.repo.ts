import { AtomOGM } from '@codelab/backend/adapter/neo4j'
import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { IAtomExport, ITagExport } from '@codelab/shared/abstract/core'
import {
  BaseUniqueWhereCallback,
  connectId,
  connectTypeId,
} from '@codelab/shared/data'

/**
 * We upsert by ID so we can easily change the names by re-running import
 */
export const upsertAtom = async (
  atom: IAtomExport,
  userId: string,
  atomWhere: BaseUniqueWhereCallback<IAtomExport>,
  tagWhere: BaseUniqueWhereCallback<ITagExport>,
) => {
  const Atom = await AtomOGM()

  const existingAtom = await Atom.find({
    where: atomWhere(atom),
  })

  const baseInput = {
    id: atom.id,
    name: atom.name,
    type: atom.type,
    icon: atom.icon,
  }

  const connectTags: OGM_TYPES.AtomTagsFieldInput['connect'] =
    atom.tags?.map((tag) => ({ where: { node: tagWhere(tag) } })) || []

  if (!existingAtom.length) {
    console.log(`Creating ${atom.name}...`)

    const createInput: OGM_TYPES.AtomCreateInput = {
      ...baseInput,
      // Always re-create the API if atom is missing
      api: {
        create: {
          node: {
            id: atom.api.id,
            name: `${atom.name} API`,
            owner: connectTypeId(userId),
          },
        },
      },
      tags: { connect: connectTags },
    }

    try {
      return await Atom.create({
        input: [createInput],
      })
    } catch (e) {
      console.error(e)

      return
    }
  } else {
    console.log(`Updating ${atom.name}...`)

    if (!atom.api?.id) {
      throw new Error('API is missing even though atom exists')
    }

    const updateInput: OGM_TYPES.AtomUpdateInput = {
      ...baseInput,
      // Assume the API exists
      api: connectId(atom.api?.id),
      tags: [{ connect: connectTags }],
    }

    return await Atom.update({
      where: {
        id: atom.id,
      },
      update: updateInput,
    })
  }
}
