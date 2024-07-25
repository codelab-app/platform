import type {
  IAtomModel,
  IAtomRepository,
} from '@codelab/frontend/abstract/domain'
import { atomApi } from './atom.api'

export const updateAtomRepository: IAtomRepository['update'] = async (
  atom: IAtomModel,
) => {
  const {
    updateAtoms: { atoms },
  } = await atomApi.UpdateAtoms({
    update: atom.toUpdateInput(),
    where: { id: atom.id },
  })

  return atoms[0]
}
