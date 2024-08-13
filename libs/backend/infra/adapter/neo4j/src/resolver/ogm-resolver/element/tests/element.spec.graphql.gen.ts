import * as Types from '@codelab/shared/infra/gql'

import { GraphQLClient, RequestOptions } from 'graphql-request'
import { gql } from 'graphql-tag'
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders']
export type ElementDependentTypesQueryVariables = Types.Exact<{
  [key: string]: never
}>

export type ElementDependentTypesQuery = {
  elements: Array<{
    dependantTypes: Array<
      | { id: string; name: string }
      | { id: string; name: string }
      | { id: string; name: string }
      | {}
    >
  }>
}

export const ElementDependentTypesDocument = gql`
  query elementDependentTypes {
    elements {
      dependantTypes {
        ... on EnumType {
          id
          name
        }
        ... on ArrayType {
          id
          name
        }
        ... on UnionType {
          id
          name
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
