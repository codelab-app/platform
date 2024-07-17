import type { IAtomModel } from '@codelab/frontend/abstract/domain'
import { deleteAtomsRepository } from '@codelab/frontend-domain-atom/repositories'
import type { IRef } from '@codelab/shared/abstract/core'

export const deleteAtomsUseCase = async (atoms: Array<IAtomModel>) => {
  return await deleteAtomsRepository(atoms)
}
