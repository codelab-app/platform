import * as Types from '@codelab/frontend/infra/gql'

import { graphql } from '@codelab/frontend/infra/gql'
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
import { type CreateAppsMutationVariables } from '@codelab/frontend/infra/gql'

export const createAppsMutation = (variables: CreateAppsMutationVariables) =>
  gqlFetch(CreateAppsDocument, variables)
