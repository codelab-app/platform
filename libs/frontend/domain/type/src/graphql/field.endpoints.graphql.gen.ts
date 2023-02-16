import * as Types from '@codelab/shared/abstract/codegen'

import { FieldPreviewFragment } from '../../../../abstract/core/src/domain/type/fragments/field.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import { FieldPreviewFragmentDoc } from '../../../../abstract/core/src/domain/type/fragments/field.fragment.graphql.gen'
export type CreateFieldsMutationVariables = Types.Exact<{
  input: Array<Types.FieldCreateInput> | Types.FieldCreateInput
}>

export type CreateFieldsMutation = {
  createFields: { fields: Array<FieldPreviewFragment> }
}

export type UpdateFieldsMutationVariables = Types.Exact<{
  where: Types.FieldWhere
  update: Types.FieldUpdateInput
}>

export type UpdateFieldsMutation = {
  updateFields: { fields: Array<FieldPreviewFragment> }
}

export type DeleteFieldsMutationVariables = Types.Exact<{
  where: Types.FieldWhere
}>

export type DeleteFieldsMutation = { deleteFields: { nodesDeleted: number } }

export const CreateFieldsDocument = gql`
  mutation CreateFields($input: [FieldCreateInput!]!) {
    createFields(input: $input) {
      fields {
        ...FieldPreview
      }
    }
  }
  ${FieldPreviewFragmentDoc}
`
export const UpdateFieldsDocument = gql`
  mutation UpdateFields($where: FieldWhere!, $update: FieldUpdateInput!) {
    updateFields(where: $where, update: $update) {
      fields {
        ...FieldPreview
      }
    }
  }
  ${FieldPreviewFragmentDoc}
`
export const DeleteFieldsDocument = gql`
  mutation DeleteFields($where: FieldWhere!) {
    deleteFields(where: $where) {
      nodesDeleted
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
    CreateFields(
      variables: CreateFieldsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateFieldsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateFieldsMutation>(
            CreateFieldsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateFields',
        'mutation',
      )
    },
    UpdateFields(
      variables: UpdateFieldsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateFieldsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateFieldsMutation>(
            UpdateFieldsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdateFields',
        'mutation',
      )
    },
    DeleteFields(
      variables: DeleteFieldsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteFieldsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteFieldsMutation>(
            DeleteFieldsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'DeleteFields',
        'mutation',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
