import { AtomOGM } from '@codelab/backend'
import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { IAtomExport } from '@codelab/shared/abstract/core'
import { connectId } from '@codelab/shared/data'

export const importAtom = async (
  atoms: Array<IAtomExport>,
  auth0Id: string,
) => {
  for (const atom of atoms) {
    console.log(`Upserting ${atom.name}`)
    await upsertAtom(atom)
  }
}

const upsertAtom = async (atom: IAtomExport) => {
  const Atom = await AtomOGM()

  const existing = await Atom.find({
    where: {
      id: atom.id,
    },
  })

  const input = {
    id: atom.id,
    name: atom.name,
    type: atom.type as OGM_TYPES.AtomType,
    api: connectId(atom.api.id),
  }

  if (!existing.length) {
    console.log(`Creating ${atom.name}...`)

    return await Atom.create({
      input: [input],
    })
  }

  console.log(`Updating ${atom.name}...`)

  return await Atom.update({
    where: {
      id: atom.id,
    },
    update: input,
  })
}
