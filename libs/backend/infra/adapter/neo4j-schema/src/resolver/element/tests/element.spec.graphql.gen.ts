import * as Types from '@codelab/shared/infra/gqlgen'

import { GraphQLClient, RequestOptions } from 'graphql-request'
import { gql } from 'graphql-tag'
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders']
export type ElementDependentTypesQueryVariables = Types.Exact<{
  [key: string]: never
}>

export type ElementDependentTypesQuery = {
  elements: Array<{
    dependantTypes: Array<
      | { __typename: 'ArrayType'; id: string }
      | { __typename: 'EnumType'; id: string }
      | { __typename: 'UnionType'; id: string }
      | {}
    >
  }>
}

export const ElementDependentTypesDocument = gql`
  query elementDependentTypes {
    elements {
      dependantTypes {
        ... on EnumType {
          __typename
          id
        }
        ... on ArrayType {
          __typename
          id
        }
        ... on UnionType {
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
  variables?: any,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
  _variables,
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    elementDependentTypes(
      variables?: ElementDependentTypesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<ElementDependentTypesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ElementDependentTypesQuery>(
            ElementDependentTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'elementDependentTypes',
        'query',
        variables,
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
