import type {
  IAtomModel,
  IAtomRepository,
} from '@codelab/frontend/abstract/domain'
import { graphql } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
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
