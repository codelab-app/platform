import { AtomOGM } from '@codelab/backend'
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

  const input = {
    id: atom.id,
    name: atom.name,
    type: atom.type as OGM_TYPES.AtomType,
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

  if (!idExisting.length) {
    console.log(`Creating ${atom.name}...`)

    console.log(input)

    try {
      return await Atom.create({
        input: [input],
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
    update: input,
  })
}
