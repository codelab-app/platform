'use server'

import {
  type AppCreateInput,
  execute,
  graphql,
} from '@codelab/frontend/infra/gql'

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
  return await execute(CreateAppsMutation, {
    input,
  })
}
