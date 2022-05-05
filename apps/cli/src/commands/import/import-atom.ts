import { IAtomExport } from '@codelab/shared/abstract/core'
import { upsertAtom } from '../../repository/atom.repo'

export const importAtom = async (atoms: Array<IAtomExport>, userId: string) => {
  for (const atom of atoms) {
    console.log(`Upserting atom: ${atom.name}`)
    await upsertAtom(atom, userId)
  }
}
