import { BaseUniqueWhere, IAtomExport } from '@codelab/shared/abstract/core'
import { upsertAtom } from '../../repository/atom.repo'

export const importAtoms = async (
  atoms: Array<IAtomExport> = [],
  userId: string,
  extractWhere: (atom: IAtomExport) => BaseUniqueWhere,
) => {
  console.log('Importing atoms...')

  for (const atom of atoms) {
    console.log(`Upserting atom: ${atom.name}`)
    await upsertAtom(atom, userId, extractWhere(atom))
  }
}
