import * as Types from '@codelab/shared/abstract/codegen'

import { FieldFragment } from '../../../../abstract/core/src/domain/type/fragments/field.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import { gql } from 'graphql-tag'
import { FieldFragmentDoc } from '../../../../abstract/core/src/domain/type/fragments/field.fragment.graphql.gen'
export type CreateFieldsMutationVariables = Types.Exact<{
  input: Array<Types.FieldCreateInput> | Types.FieldCreateInput
}>

export type CreateFieldsMutation = {
  createFields: { fields: Array<{ id: string }> }
}

export type UpdateFieldsMutationVariables = Types.Exact<{
  where: Types.FieldWhere
  update: Types.FieldUpdateInput
}>

export type UpdateFieldsMutation = {
  updateFields: { fields: Array<{ id: string }> }
}

export type DeleteFieldsMutationVariables = Types.Exact<{
  where: Types.FieldWhere
}>

export type DeleteFieldsMutation = { deleteFields: { nodesDeleted: number } }

export type GetFieldsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.FieldWhere>
  options?: Types.InputMaybe<Types.FieldOptions>
}>

export type GetFieldsQuery = {
  aggregate: { count: number }
  items: Array<FieldFragment>
}

export const CreateFieldsDocument = gql`
  mutation CreateFields($input: [FieldCreateInput!]!) {
    createFields(input: $input) {
      fields {
        id
      }
    }
  }
`
export const UpdateFieldsDocument = gql`
  mutation UpdateFields($where: FieldWhere!, $update: FieldUpdateInput!) {
    updateFields(where: $where, update: $update) {
      fields {
        id
      }
    }
  }
`
export const DeleteFieldsDocument = gql`
  mutation DeleteFields($where: FieldWhere!) {
    deleteFields(where: $where) {
      nodesDeleted
    }
  }
`
export const GetFieldsDocument = gql`
  query GetFields($where: FieldWhere, $options: FieldOptions) {
    aggregate: fieldsAggregate(where: $where) {
      count
    }
    items: fields(where: $where, options: $options) {
      ...Field
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
    CreateFields(
      variables: CreateFieldsMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
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
      requestHeaders?: GraphQLClientRequestHeaders,
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
      requestHeaders?: GraphQLClientRequestHeaders,
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
    GetFields(
      variables?: GetFieldsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetFieldsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetFieldsQuery>(GetFieldsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetFields',
        'query',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
