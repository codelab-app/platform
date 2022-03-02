import * as Types from '@codelab/shared/abstract/codegen-v2'

import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import gql from 'graphql-tag'
export type E2eResetDataMutationVariables = Types.Exact<{
  [key: string]: never
}>

export type E2eResetDataMutation = {
  __typename?: 'Mutation'
  resetDatabase?:
    | {
        __typename?: 'ResetDatabaseMutationResponse'
        success?: boolean | null | undefined
      }
    | null
    | undefined
}

export const E2eResetDataDocument = gql`
  mutation E2eResetData {
    resetDatabase {
      success
    }
  }
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    E2eResetData(
      variables?: E2eResetDataMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<E2eResetDataMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<E2eResetDataMutation>(
            E2eResetDataDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'E2eResetData',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
