import * as Types from '@codelab/shared/abstract/codegen-v2'

import { gql } from 'graphql-request'
import {
  api,
  GraphqlOperationOptions,
} from '@codelab/frontend/model/infra/redux'
export type ResetDatabaseMutationVariables = Types.Exact<{
  [key: string]: never
}>

export type ResetDatabaseMutation = {
  resetDatabase?: { success?: boolean | null | undefined } | null | undefined
}

export const ResetDatabaseGql = gql`
  mutation ResetDatabase {
    resetDatabase {
      success
    }
  }
`

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    ResetDatabase: build.mutation<
      ResetDatabaseMutation,
      GraphqlOperationOptions<ResetDatabaseMutationVariables> | void | undefined
    >({
      query: (options) => ({
        document: ResetDatabaseGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
  }),
})
export { injectedRtkApi as api }
export const { useResetDatabaseMutation } = injectedRtkApi
