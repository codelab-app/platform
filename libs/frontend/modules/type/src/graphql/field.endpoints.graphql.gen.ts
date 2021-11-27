import * as Types from '@codelab/frontend/abstract/codegen'

import { FieldFragment } from './Field.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { FieldFragmentDoc } from './Field.fragment.graphql.gen'
import { api, GraphqlOperationOptions } from '@codelab/frontend/model/infra/api'
export type CreateFieldMutationVariables = Types.Exact<{
  input: Types.CreateFieldInput
}>

export type CreateFieldMutation = { createField: { id: string } }

export type DeleteFieldMutationVariables = Types.Exact<{
  input: Types.DeleteFieldInput
}>

export type DeleteFieldMutation = {
  deleteField?: FieldFragment | null | undefined
}

export type GetFieldQueryVariables = Types.Exact<{
  input: Types.GetFieldInput
}>

export type GetFieldQuery = { getField?: FieldFragment | null | undefined }

export type UpdateFieldMutationVariables = Types.Exact<{
  input: Types.UpdateFieldInput
}>

export type UpdateFieldMutation = {
  updateField?: FieldFragment | null | undefined
}

export const CreateFieldGql = gql`
  mutation CreateField($input: CreateFieldInput!) {
    createField(input: $input) {
      id
    }
  }
`
export const DeleteFieldGql = gql`
  mutation DeleteField($input: DeleteFieldInput!) {
    deleteField(input: $input) {
      ...Field
    }
  }
  ${FieldFragmentDoc}
`
export const GetFieldGql = gql`
  query GetField($input: GetFieldInput!) {
    getField(input: $input) {
      ...Field
    }
  }
  ${FieldFragmentDoc}
`
export const UpdateFieldGql = gql`
  mutation UpdateField($input: UpdateFieldInput!) {
    updateField(input: $input) {
      ...Field
    }
  }
  ${FieldFragmentDoc}
`

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    CreateField: build.mutation<
      CreateFieldMutation,
      GraphqlOperationOptions<CreateFieldMutationVariables>
    >({
      query: (options) => ({
        document: CreateFieldGql,
        options: options ?? undefined,
      }),
    }),
    DeleteField: build.mutation<
      DeleteFieldMutation,
      GraphqlOperationOptions<DeleteFieldMutationVariables>
    >({
      query: (options) => ({
        document: DeleteFieldGql,
        options: options ?? undefined,
      }),
    }),
    GetField: build.query<
      GetFieldQuery,
      GraphqlOperationOptions<GetFieldQueryVariables>
    >({
      query: (options) => ({
        document: GetFieldGql,
        options: options ?? undefined,
      }),
    }),
    UpdateField: build.mutation<
      UpdateFieldMutation,
      GraphqlOperationOptions<UpdateFieldMutationVariables>
    >({
      query: (options) => ({
        document: UpdateFieldGql,
        options: options ?? undefined,
      }),
    }),
  }),
})
export { injectedRtkApi as api }
export const {
  useCreateFieldMutation,
  useDeleteFieldMutation,
  useGetFieldQuery,
  useLazyGetFieldQuery,
  useUpdateFieldMutation,
} = injectedRtkApi
