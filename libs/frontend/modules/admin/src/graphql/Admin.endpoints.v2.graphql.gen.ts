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

export type ImportAdminDataMutationVariables = Types.Exact<{
  input: Types.ImportAdminDataInput
}>

export type ImportAdminDataMutation = {
  importAdminData?: { result: boolean } | null | undefined
}

export const ResetDatabaseGql = gql`
  mutation ResetDatabase {
    resetDatabase {
      success
    }
  }
`
export const ImportAdminDataGql = gql`
  mutation importAdminData($input: ImportAdminDataInput!) {
    importAdminData(input: $input) {
      result
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
    importAdminData: build.mutation<
      ImportAdminDataMutation,
      GraphqlOperationOptions<ImportAdminDataMutationVariables>
    >({
      query: (options) => ({
        document: ImportAdminDataGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
  }),
})
export { injectedRtkApi as api }
export const { useResetDatabaseMutation, useImportAdminDataMutation } =
  injectedRtkApi
