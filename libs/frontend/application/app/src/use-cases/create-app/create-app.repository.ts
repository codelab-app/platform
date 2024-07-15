'use server'

import { type AppCreateInput, graphql } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'

const CreateAppsMutation = graphql(`
  mutation CreateApps($input: [AppCreateInput!]!) {
    createApps(input: $input) {
      apps {
        id
      }
    }
  }
`)

export const createAppRepository = async (input: AppCreateInput) => {
  return await gqlFetch(CreateAppsMutation, {
    input,
  })
}
