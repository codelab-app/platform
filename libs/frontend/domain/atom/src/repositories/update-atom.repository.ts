import type {
  IAtomModel,
  IAtomRepository,
} from '@codelab/frontend/abstract/domain'
import {
  graphql,
  type UpdateAtomsMutationVariables,
} from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'

const UpdateAtomDocument = graphql(`
  mutation UpdateAtoms($where: AtomWhere, $update: AtomUpdateInput) {
    updateAtoms(update: $update, where: $where) {
      atoms {
        id
      }
    }
  }
`)

export const updateAtomRepository: IAtomRepository['update'] = async (
  atom: IAtomModel,
) => {
  const {
    updateAtoms: { atoms },
  } = await gqlFetch(UpdateAtomDocument, {
    update: atom.toUpdateInput(),
    where: { id: atom.id },
  })

  return atoms[0]
}
