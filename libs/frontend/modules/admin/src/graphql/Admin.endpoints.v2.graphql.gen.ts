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
  resetDatabase?: { success?: boolean | null } | null
}

export type ImportAdminDataMutationVariables = Types.Exact<{
  input: Types.ImportAdminDataInput
}>

export type ImportAdminDataMutation = {
  importAdminData?: { result: boolean } | null
}

export type ExportAdminDataQueryVariables = Types.Exact<{
  [key: string]: never
}>

export type ExportAdminDataQuery = {
  exportAdminData: { result: Record<string, any> }
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
export const ExportAdminDataGql = gql`
  query exportAdminData {
    exportAdminData {
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
    exportAdminData: build.query<
      ExportAdminDataQuery,
      GraphqlOperationOptions<ExportAdminDataQueryVariables> | void | undefined
    >({
      query: (options) => ({
        document: ExportAdminDataGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
  }),
})
export { injectedRtkApi as api }
export const {
  useResetDatabaseMutation,
  useImportAdminDataMutation,
  useExportAdminDataQuery,
  useLazyExportAdminDataQuery,
} = injectedRtkApi
