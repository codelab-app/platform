import { IAtomExport, ITagExport } from '@codelab/shared/abstract/core'
import { BaseUniqueWhereCallback } from '@codelab/shared/abstract/types'
import { upsertAtom } from '../../repository/atom.repo'
import { logSection } from '../../shared/utils/log-task'

interface ImportAtoms {
  atoms: Array<IAtomExport>
  userId: string
  atomWhere: BaseUniqueWhereCallback<IAtomExport>
  tagWhere: BaseUniqueWhereCallback<ITagExport>
}

export const importAtoms = async ({
  atoms = [],
  userId,
  atomWhere,
  tagWhere,
}: ImportAtoms) => {
  logSection('Importing Atoms')

  for (const atom of atoms) {
    /**
     * Here we only deal with connecting/disconnecting tags, actual tags are created before this
     */
    await upsertAtom(atom, userId, atomWhere, tagWhere)
  }
}
