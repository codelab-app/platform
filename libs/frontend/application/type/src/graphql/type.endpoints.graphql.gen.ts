import * as Types from '@codelab/shared/abstract/codegen'

import { GraphQLClient, RequestOptions } from 'graphql-request'
import { gql } from 'graphql-tag'
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders']
export type IsTypeDescendantOfQueryVariables = Types.Exact<{
  descendantTypeId: Types.Scalars['ID']['input']
  parentTypeId: Types.Scalars['ID']['input']
}>

export type IsTypeDescendantOfQuery = { isTypeDescendantOf?: boolean | null }

export type GetTypeReferencesQueryVariables = Types.Exact<{
  typeId: Types.Scalars['ID']['input']
}>

export type GetTypeReferencesQuery = {
  getTypeReferences?: Array<{ label: string; name: string }> | null
}

export const IsTypeDescendantOfDocument = gql`
  query IsTypeDescendantOf($descendantTypeId: ID!, $parentTypeId: ID!) {
    isTypeDescendantOf(
      descendantTypeId: $descendantTypeId
      parentTypeId: $parentTypeId
    )
  }
`
export const GetTypeReferencesDocument = gql`
  query GetTypeReferences($typeId: ID!) {
    getTypeReferences(typeId: $typeId) {
      label
      name
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
    IsTypeDescendantOf(
      variables: IsTypeDescendantOfQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<IsTypeDescendantOfQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<IsTypeDescendantOfQuery>(
            IsTypeDescendantOfDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'IsTypeDescendantOf',
        'query',
        variables,
      )
    },
    GetTypeReferences(
      variables: GetTypeReferencesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetTypeReferencesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetTypeReferencesQuery>(
            GetTypeReferencesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetTypeReferences',
        'query',
        variables,
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
