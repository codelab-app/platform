import type {
  IAtomModel,
  IAtomRepository,
} from '@codelab/frontend/abstract/domain'
import { atomApi } from './atom.api'

export const createAtomRepository: IAtomRepository['add'] = async (
  atom: IAtomModel,
) => {
  const {
    createAtoms: { atoms },
  } = await atomApi.CreateAtoms({ input: atom.toCreateInput() })

  return atoms[0]
}
