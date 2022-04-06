import * as Types from '@codelab/shared/abstract/codegen-v2'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import {
  Field_InterfaceTypeEdge_Fragment,
  Field_InterfaceTypeFieldsRelationship_Fragment,
  FieldFragmentDoc,
  InterfaceTypeEdgeFragment,
  InterfaceTypeEdgeFragmentDoc,
} from './fragments/field.fragment.v2.1.graphql.gen'

export type CreateFieldMutationVariables = Types.Exact<{
  input: Types.UpsertFieldInput
}>

export type CreateFieldMutation = { upsertFieldEdge: InterfaceTypeEdgeFragment }

export type UpdateFieldMutationVariables = Types.Exact<{
  input: Types.UpsertFieldInput
}>

export type UpdateFieldMutation = { upsertFieldEdge: InterfaceTypeEdgeFragment }

export type DeleteFieldMutationVariables = Types.Exact<{
  input: Types.DeleteFieldInput
}>

export type DeleteFieldMutation = {
  deleteFieldEdge: { deletedEdgesCount: number }
}

export const CreateFieldDocument = gql`
  mutation CreateField($input: UpsertFieldInput!) {
    upsertFieldEdge(input: $input, isCreating: true) {
      ...InterfaceTypeEdge
    }
  }
  ${InterfaceTypeEdgeFragmentDoc}
  ${FieldFragmentDoc}
`
export const UpdateFieldDocument = gql`
  mutation UpdateField($input: UpsertFieldInput!) {
    upsertFieldEdge(input: $input, isCreating: false) {
      ...InterfaceTypeEdge
    }
  }
  ${InterfaceTypeEdgeFragmentDoc}
  ${FieldFragmentDoc}
`
export const DeleteFieldDocument = gql`
  mutation DeleteField($input: DeleteFieldInput!) {
    deleteFieldEdge(input: $input) {
      deletedEdgesCount
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
    CreateField(
      variables: CreateFieldMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateFieldMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateFieldMutation>(CreateFieldDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'CreateField',
        'mutation',
      )
    },
    UpdateField(
      variables: UpdateFieldMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateFieldMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateFieldMutation>(UpdateFieldDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'UpdateField',
        'mutation',
      )
    },
    DeleteField(
      variables: DeleteFieldMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteFieldMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteFieldMutation>(DeleteFieldDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'DeleteField',
        'mutation',
      )
    },
  }
}

export type Sdk = ReturnType<typeof getSdk>
