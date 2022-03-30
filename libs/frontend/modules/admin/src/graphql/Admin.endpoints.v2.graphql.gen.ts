import * as Types from '@codelab/shared/abstract/codegen-v2'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql, GraphQLClient } from 'graphql-request'

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

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    ResetData(
      variables?: ResetDatabaseMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<ResetDatabaseMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ResetDatabaseMutation>(ResetDatabaseGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'ResetData',
        'mutation',
      )
    },

    ImportData(
      variables: ImportAdminDataMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<ImportAdminDataMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ImportAdminDataMutation>(
            ImportAdminDataGql,
            variables,
            {
              ...requestHeaders,
              ...wrappedRequestHeaders,
            },
          ),
        'ImportData',
        'mutation',
      )
    },

    ExportData(
      variables?: ExportAdminDataQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<ExportAdminDataQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ExportAdminDataQuery>(ExportAdminDataGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'ExportData',
        'query',
      )
    },
  }
}
