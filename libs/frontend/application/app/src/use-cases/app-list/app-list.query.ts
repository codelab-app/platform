import { graphql } from '@codelab/frontend/infra/gql'

export const GetAppsListQuery = graphql(`
  query GetAppsList($options: AppOptions, $where: AppWhere) {
    apps(options: $options, where: $where) {
      ...AppPreview
    }
  }
`)
