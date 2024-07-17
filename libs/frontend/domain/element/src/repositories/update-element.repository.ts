import {
  graphql,
  type UpdateElementsMutationVariables,
} from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'

const UpdateElementsDocument = graphql(`
  mutation UpdateElements($where: ElementWhere, $update: ElementUpdateInput) {
    updateElements(update: $update, where: $where) {
      elements {
        id
      }
    }
  }
`)

export const updateElementsRepository = async (
  variables: UpdateElementsMutationVariables,
) => await gqlFetch(UpdateElementsDocument, variables)
