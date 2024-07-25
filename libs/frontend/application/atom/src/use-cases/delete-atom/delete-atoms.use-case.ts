import type { IAtomModel } from '@codelab/frontend/abstract/domain'
import { deleteAtomsRepository } from '@codelab/frontend-domain-atom/repositories'

export const deleteAtomsUseCase = async (atoms: Array<IAtomModel>) => {
  return await deleteAtomsRepository(atoms)
}
