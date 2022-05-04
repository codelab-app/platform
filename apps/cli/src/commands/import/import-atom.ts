import { AtomOGM, AtomType } from '@codelab/backend'
import { IAtomExport } from '@codelab/shared/abstract/core'
import { connectId } from '@codelab/shared/data'

export const importAtom = async (
  atoms: Array<IAtomExport>,
  auth0Id: string,
) => {
  for (const atom of atoms) {
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
    type: atom.type as AtomType,
    api: connectId(atom.api.id),
  }

  if (!existing) {
    return await Atom.create({
      input: [input],
    })
  }

  return await Atom.update({
    where: {
      id: atom.id,
    },
    update: input,
  })
}
