import {
  type AppDeleteInput,
  type AppWhere,
  type DeleteAppsMutationVariables,
  execute,
  graphql,
} from '@codelab/frontend/infra/gql'

const DeleteAppsMutation = graphql(`
  mutation DeleteApps($where: AppWhere!, $delete: AppDeleteInput) {
    deleteApps(delete: $delete, where: $where) {
      nodesDeleted
    }
  }
`)

export const deleteAppAction = async ({
  delete: delete$,
  where,
}: DeleteAppsMutationVariables) => {
  return execute(DeleteAppsMutation, { delete: delete$, where })
}
