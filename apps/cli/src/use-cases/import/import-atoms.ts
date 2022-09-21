import { IAtomExport, ITagExport } from '@codelab/shared/abstract/core'
import { BaseUniqueWhereCallback } from '@codelab/shared/data'
import { upsertAtom } from '../../repository/atom.repo'

interface ImportAtoms {
  atoms: Array<IAtomExport>
  userId: string
  atomWhere: BaseUniqueWhereCallback<IAtomExport>
  tagWhere: BaseUniqueWhereCallback<ITagExport>
}

//
export const importAtoms = async ({
  atoms = [],
  userId,
  atomWhere,
  tagWhere,
}: ImportAtoms) => {
  console.log('Importing atoms...')

  for (const atom of atoms) {
    /**
     * Here we only deal with connecting/disconnecting tags, actual tags are created before this
     */
    console.log(`Upserting atom: ${atom.name}`)
    await upsertAtom(atom, userId, atomWhere, tagWhere)
  }
}
