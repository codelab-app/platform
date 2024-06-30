import { graphql } from '@codelab/frontend/infra/gql'

export const DeleteAppsMutation = graphql(`
  mutation DeleteApps($where: AppWhere!, $delete: AppDeleteInput) {
    deleteApps(delete: $delete, where: $where) {
      nodesDeleted
    }
  }
`)
