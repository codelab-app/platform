import type {
  IAtomModel,
  IAtomRepository,
} from '@codelab/frontend/abstract/domain'
import { type AtomCreateInput, graphql } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import { atomApi } from './atom.api'

export const createAtomRepository: IAtomRepository['add'] = async (
  atom: IAtomModel,
) => {
  const {
    createAtoms: { atoms },
  } = await atomApi.CreateAtoms({ input: atom.toCreateInput() })

  return atoms[0]
}
