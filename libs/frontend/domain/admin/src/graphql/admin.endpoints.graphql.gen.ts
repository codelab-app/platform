import * as Types from '@codelab/shared/abstract/codegen'

import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import { gql } from 'graphql-tag'
export type ResetDatabaseMutationVariables = Types.Exact<{
  [key: string]: never
}>

export type ResetDatabaseMutation = {
  resetDatabase?: { success?: boolean | null } | null
}

export const ResetDatabaseDocument = gql`
  mutation ResetDatabase {
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
    ResetDatabase(
      variables?: ResetDatabaseMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
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
  }
}
export type Sdk = ReturnType<typeof getSdk>
