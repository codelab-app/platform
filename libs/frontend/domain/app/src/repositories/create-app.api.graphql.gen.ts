import { graphql } from '@codelab/frontend/infra/gql'
import { type CreateAppsMutationVariables } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'

export const CreateAppsDocument = graphql(`
  mutation CreateApps($input: [AppCreateInput!]!) {
    createApps(input: $input) {
      apps {
        id
      }
    }
  }
`)

export const createAppsMutation = (variables: CreateAppsMutationVariables) =>
  gqlFetch(CreateAppsDocument, variables)
