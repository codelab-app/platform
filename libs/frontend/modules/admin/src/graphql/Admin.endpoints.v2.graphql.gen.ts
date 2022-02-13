import * as Types from '@codelab/shared/abstract/codegen-v2'

import { gql } from '@apollo/client'
import {
  api,
  GraphqlOperationOptions,
} from '@codelab/frontend/model/infra/redux'
export type ResetDataMutationVariables = Types.Exact<{ [key: string]: never }>

export type ResetDataMutation = {
  resetData?: { success?: boolean | null | undefined } | null | undefined
}

export const ResetDataGql = gql`
  mutation ResetData {
    resetData {
      success
    }
  }
`

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    ResetData: build.mutation<
      ResetDataMutation,
      GraphqlOperationOptions<ResetDataMutationVariables> | void | undefined
    >({
      query: (options) => ({
        document: ResetDataGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
  }),
})
export { injectedRtkApi as api }
export const { useResetDataMutation } = injectedRtkApi
