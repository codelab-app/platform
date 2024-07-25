import type {
  IAtomModel,
  IAtomRepository,
} from '@codelab/frontend/abstract/domain'
import { atomApi } from './atom.api'

export const deleteAtomsRepository: IAtomRepository['delete'] = async (
  atoms: Array<IAtomModel>,
) => {
  const {
    deleteAtoms: { nodesDeleted },
  } = await atomApi.DeleteAtoms({
    where: { id_IN: atoms.map(({ id }) => id) },
  })

  return nodesDeleted
}
