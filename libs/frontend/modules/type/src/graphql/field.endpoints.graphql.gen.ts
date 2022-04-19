import * as Types from '@codelab/shared/abstract/codegen'

import { FieldFragment } from '../../../../../shared/abstract/core/src/domain/type/fragments/field.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import { FieldFragmentDoc } from '../../../../../shared/abstract/core/src/domain/type/fragments/field.fragment.graphql.gen'
export type CreateFieldMutationVariables = Types.Exact<{
  interfaceId: Types.Scalars['ID']
  fieldTypeId: Types.Scalars['ID']
  field: Types.FieldCreateInput
}>

export type CreateFieldMutation = {
  updateInterfaceTypes: {
    interfaceTypes: Array<{ fieldsConnection: { edges: Array<FieldFragment> } }>
  }
}

export type UpdateFieldMutationVariables = Types.Exact<{
  interfaceId: Types.Scalars['ID']
  fieldTypeId: Types.Scalars['ID']
  field: Types.FieldUpdateInput
}>

export type UpdateFieldMutation = {
  updateInterfaceTypes: {
    interfaceTypes: Array<{ fieldsConnection: { edges: Array<FieldFragment> } }>
  }
}

export type DeleteFieldMutationVariables = Types.Exact<{
  interfaceId: Types.Scalars['ID']
  where: Types.FieldWhere
}>

export type DeleteFieldMutation = {
  updateInterfaceTypes: {
    interfaceTypes: Array<{ fieldsConnection: { edges: Array<FieldFragment> } }>
  }
}

export const CreateFieldDocument = gql`
  mutation CreateField(
    $interfaceId: ID!
    $fieldTypeId: ID!
    $field: FieldCreateInput!
  ) {
    updateInterfaceTypes(
      where: { id: $interfaceId }
      connect: {
        fields: [{ edge: $field, where: { node: { id: $fieldTypeId } } }]
      }
    ) {
      interfaceTypes {
        fieldsConnection {
          edges {
            ...Field
          }
        }
      }
    }
  }
  ${FieldFragmentDoc}
`
export const UpdateFieldDocument = gql`
  mutation UpdateField(
    $interfaceId: ID!
    $fieldTypeId: ID!
    $field: FieldUpdateInput!
  ) {
    updateInterfaceTypes(
      where: { id: $interfaceId }
      update: {
        fields: [
          { where: { node: { id: $fieldTypeId } }, update: { edge: $field } }
        ]
      }
    ) {
      interfaceTypes {
        fieldsConnection {
          edges {
            ...Field
          }
        }
      }
    }
  }
  ${FieldFragmentDoc}
`
export const DeleteFieldDocument = gql`
  mutation DeleteField($interfaceId: ID!, $where: FieldWhere!) {
    updateInterfaceTypes(
      where: { id: $interfaceId }
      delete: { fields: [{ where: { edge: $where } }] }
    ) {
      interfaceTypes {
        fieldsConnection {
          edges {
            ...Field
          }
        }
      }
    }
  }
  ${FieldFragmentDoc}
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
