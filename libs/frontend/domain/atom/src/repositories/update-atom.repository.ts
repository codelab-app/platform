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

export const updateAtomRepository = async (
  variables: UpdateAtomsMutationVariables,
) => gqlFetch(UpdateAtomDocument, variables)
