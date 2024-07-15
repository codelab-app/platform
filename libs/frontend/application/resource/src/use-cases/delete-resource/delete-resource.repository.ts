import {
  type DeleteResourcesMutationVariables,
  execute,
  graphql,
  type ResourceDeleteInput,
} from '@codelab/frontend/infra/gql'

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
) => await execute(DeleteResourcesDocument, input)
