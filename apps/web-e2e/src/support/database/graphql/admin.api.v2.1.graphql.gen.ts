import * as Types from '@codelab/shared/abstract/codegen-v2'

import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
export type E2eResetDatabaseMutationVariables = Types.Exact<{
  [key: string]: never
}>

export type E2eResetDatabaseMutation = {
  resetDatabase?: { success?: boolean | null } | null
}

export type E2eImportAdminDataMutationVariables = Types.Exact<{
  input: Types.ImportAdminDataInput
}>

export type E2eImportAdminDataMutation = {
  importAdminData?: { result: boolean } | null | undefined
}

export type E2eExportAdminDataQueryVariables = Types.Exact<{
  [key: string]: never
}>

export type E2eExportAdminDataQuery = {
  exportAdminData: { result: Record<string, any> }
}

export const E2eResetDatabaseDocument = gql`
  mutation E2eResetDatabase {
    resetDatabase {
      success
    }
  }
`
export const E2eImportAdminDataDocument = gql`
  mutation E2eImportAdminData($input: ImportAdminDataInput!) {
    importAdminData(input: $input) {
      result
    }
  }
`
export const E2eExportAdminDataDocument = gql`
  query E2eExportAdminData {
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
    E2eResetDatabase(
      variables?: E2eResetDatabaseMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<E2eResetDatabaseMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<E2eResetDatabaseMutation>(
            E2eResetDatabaseDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'E2eResetDatabase',
        'mutation',
      )
    },
    E2eImportAdminData(
      variables: E2eImportAdminDataMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<E2eImportAdminDataMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<E2eImportAdminDataMutation>(
            E2eImportAdminDataDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'E2eImportAdminData',
        'mutation',
      )
    },
    E2eExportAdminData(
      variables?: E2eExportAdminDataQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<E2eExportAdminDataQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<E2eExportAdminDataQuery>(
            E2eExportAdminDataDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'E2eExportAdminData',
        'query',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
