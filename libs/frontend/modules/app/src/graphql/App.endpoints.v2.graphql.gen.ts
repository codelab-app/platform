import * as Types from '@codelab/shared/abstract/codegen-v2'

import { gql } from '@apollo/client'
import {
  api,
  GraphqlOperationOptions,
} from '@codelab/frontend/model/infra/redux'
export type CreateAppsMutationVariables = Types.Exact<{
  input: Array<Types.AppCreateInput> | Types.AppCreateInput
}>

export type CreateAppsMutation = {
  createApps: { apps: Array<{ name: string }> }
}

export const CreateAppsGql = gql`
  mutation CreateApps($input: [AppCreateInput!]!) {
    createApps(input: $input) {
      apps {
        name
      }
    }
  }
`

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    CreateApps: build.mutation<
      CreateAppsMutation,
      GraphqlOperationOptions<CreateAppsMutationVariables>
    >({
      query: (options) => ({
        document: CreateAppsGql,
        options: options ?? undefined,
      }),
    }),
  }),
})
export { injectedRtkApi as api }
export const { useCreateAppsMutation } = injectedRtkApi
