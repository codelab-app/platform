import { IAtomExport } from '@codelab/shared/abstract/core'
import { upsertAtomById } from '../../repository/atom.repo'

export const importAtomsById = async (
  atoms: Array<IAtomExport> = [],
  userId: string,
) => {
  console.log('Importing atoms...')

  for (const atom of atoms) {
    console.log(`Upserting atom: ${atom.name}`)
    await upsertAtomById(atom, userId)
  }
}
