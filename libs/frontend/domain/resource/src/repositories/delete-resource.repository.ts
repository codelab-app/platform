import {
  type DeleteResourcesMutationVariables,
  graphql,
} from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'

const DeleteResourcesDocument = graphql(`
  mutation DeleteResources(
    $where: ResourceWhere
    $delete: ResourceDeleteInput
  ) {
    deleteResources(where: $where, delete: $delete) {
      nodesDeleted
    }
  }
`)

export const deleteResourcesRepository = async (
  input: DeleteResourcesMutationVariables,
) => await gqlFetch(DeleteResourcesDocument, input)
