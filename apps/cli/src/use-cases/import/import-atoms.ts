import { ImportAtoms } from '@codelab/shared/abstract/core'
import { assignAllowedChildren, upsertAtom } from '../../repository/atom.repo'
import { logSection } from '../../shared/utils/log-task'
import { createExistingData } from '../seed/data/ant-design.data'

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

  /**
   * Here we assign allowedChildren, since all atoms must be created first
   */
  for (const atom of atoms) {
    /**
     * We fetch existing data again so we have all the atoms for allowedChildren assignment
     */
    await assignAllowedChildren(atom, await createExistingData())
  }
}
