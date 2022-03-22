import * as Types from '@codelab/shared/abstract/codegen-v2'

import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-request'
export type E2eResetDatabaseMutationVariables = Types.Exact<{
  [key: string]: never
}>

export type E2eResetDatabaseMutation = {
  resetDatabase?: { success?: boolean | null | undefined } | null | undefined
}

export const E2eResetDatabaseGql = gql`
  mutation E2eResetDatabase {
    resetDatabase {
      success
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
            E2eResetDatabaseGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'E2eResetDatabase',
        'mutation',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
