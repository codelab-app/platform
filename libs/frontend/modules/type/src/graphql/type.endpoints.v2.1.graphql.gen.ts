import * as Types from '@codelab/shared/abstract/codegen-v2'

import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
export type IsTypeDescendantOfQueryVariables = Types.Exact<{
  descendantTypeId: Types.Scalars['ID']
  parentTypeId: Types.Scalars['ID']
}>

export type IsTypeDescendantOfQuery = {
  isTypeDescendantOf?: boolean | null | undefined
}

export type GetTypeReferencesQueryVariables = Types.Exact<{
  typeId: Types.Scalars['ID']
}>

export type GetTypeReferencesQuery = {
  getTypeReferences?: Array<{ name: string; label: string }> | null | undefined
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
      name
      label
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
    IsTypeDescendantOf(
      variables: IsTypeDescendantOfQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
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
      )
    },
    GetTypeReferences(
      variables: GetTypeReferencesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
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
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
