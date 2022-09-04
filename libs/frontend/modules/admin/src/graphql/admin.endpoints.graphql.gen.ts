import * as Types from '@codelab/shared/abstract/codegen'

import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
export type ResetDatabaseMutationVariables = Types.Exact<{
  [key: string]: never
}>

export type ResetDatabaseMutation = {
  resetDatabase?: { success?: boolean | null } | null
}

export type ExecuteCommandMutationVariables = Types.Exact<{
  input: Types.ExecuteCommandInput
}>

export type ExecuteCommandMutation = {
  executeCommand: {
    success: boolean
    data: string
    handler: Types.ExecuteCommandHandler
  }
}

export const ResetDatabaseDocument = gql`
  mutation ResetDatabase {
    resetDatabase {
      success
    }
  }
`
export const ExecuteCommandDocument = gql`
  mutation ExecuteCommand($input: ExecuteCommandInput!) {
    executeCommand(input: $input) {
      success
      data
      handler
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
    ResetDatabase(
      variables?: ResetDatabaseMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<ResetDatabaseMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ResetDatabaseMutation>(
            ResetDatabaseDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'ResetDatabase',
        'mutation',
      )
    },
    ExecuteCommand(
      variables: ExecuteCommandMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<ExecuteCommandMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ExecuteCommandMutation>(
            ExecuteCommandDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'ExecuteCommand',
        'mutation',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
