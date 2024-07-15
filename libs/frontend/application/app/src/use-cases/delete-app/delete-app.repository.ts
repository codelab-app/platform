import {
  type DeleteAppsMutationVariables,
  graphql,
} from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'

const DeleteAppsMutation = graphql(`
  mutation DeleteApps($where: AppWhere!, $delete: AppDeleteInput) {
    deleteApps(delete: $delete, where: $where) {
      nodesDeleted
    }
  }
`)

export const deleteAppRepository = async ({
  delete: delete$,
  where,
}: DeleteAppsMutationVariables) => {
  return gqlFetch(DeleteAppsMutation, { delete: delete$, where })
}
