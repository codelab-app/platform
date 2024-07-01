import { graphql } from '@codelab/frontend/infra/gql'

export const UpdateAppsMutation = graphql(`
  mutation UpdateApps($where: AppWhere!, $update: AppUpdateInput!) {
    updateApps(update: $update, where: $where) {
      apps {
        id
      }
    }
  }
`)
