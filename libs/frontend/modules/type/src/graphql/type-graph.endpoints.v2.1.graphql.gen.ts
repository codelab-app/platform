import * as Types from '@codelab/shared/abstract/codegen-v2'

import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
export type GetTypeGraphQueryVariables = Types.Exact<{
  interfaceId: Types.Scalars['ID']
}>

export type GetTypeGraphQuery = {
  typeGraph: { vertices: Array<{ __typename: 'PrimitiveType'; id: string }> }
}

export const GetTypeGraphDocument = gql`
  query GetTypeGraph($interfaceId: ID!) {
    typeGraph(interfaceId: $interfaceId) {
      vertices {
        ... on PrimitiveType {
          __typename
          id
        }
      }
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
    GetTypeGraph(
      variables: GetTypeGraphQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetTypeGraphQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetTypeGraphQuery>(GetTypeGraphDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetTypeGraph',
        'query',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
