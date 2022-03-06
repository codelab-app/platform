import * as Types from '@codelab/shared/abstract/codegen-v2'

import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import gql from 'graphql-tag'
export type E2eCreateFieldMutationVariables = Types.Exact<{
  input: Types.UpsertFieldInput
}>

export type E2eCreateFieldMutation = {
  __typename?: 'Mutation'
  upsertFieldEdge: {
    __typename?: 'InterfaceTypeEdge'
    target: string
    source: string
    key: string
    name?: string | null | undefined
    description?: string | null | undefined
  }
}

export type E2eField_InterfaceTypeEdge_Fragment = {
  __typename?: 'InterfaceTypeEdge'
  key: string
  name?: string | null | undefined
  description?: string | null | undefined
}

export type E2eField_InterfaceTypeFieldsRelationship_Fragment = {
  __typename?: 'InterfaceTypeFieldsRelationship'
  key: string
  name?: string | null | undefined
  description?: string | null | undefined
}

export type E2eFieldFragment =
  | E2eField_InterfaceTypeEdge_Fragment
  | E2eField_InterfaceTypeFieldsRelationship_Fragment

export type E2eInterfaceTypeEdgeFragment = {
  __typename?: 'InterfaceTypeEdge'
  target: string
  source: string
  key: string
  name?: string | null | undefined
  description?: string | null | undefined
}

export const E2eFieldFragmentDoc = gql`
  fragment E2eField on Field {
    key
    name
    description
  }
`
export const E2eInterfaceTypeEdgeFragmentDoc = gql`
  fragment E2eInterfaceTypeEdge on InterfaceTypeEdge {
    ...E2eField
    target
    source
  }
  ${E2eFieldFragmentDoc}
`
export const E2eCreateFieldDocument = gql`
  mutation E2eCreateField($input: UpsertFieldInput!) {
    upsertFieldEdge(input: $input, isCreating: true) {
      ...E2eInterfaceTypeEdge
    }
  }
  ${E2eInterfaceTypeEdgeFragmentDoc}
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
    E2eCreateField(
      variables: E2eCreateFieldMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<E2eCreateFieldMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<E2eCreateFieldMutation>(
            E2eCreateFieldDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'E2eCreateField',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
