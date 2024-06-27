import { graphql } from '@codelab/frontend/infra/gql'

export const CreateAppsMutation = graphql(`
  mutation CreateApps($input: [AppCreateInput!]!) {
    createApps(input: $input) {
      apps {
        id
      }
    }
  }
`)
