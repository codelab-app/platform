import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
import { api, GraphqlOperationOptions } from '@codelab/frontend/model/infra/api'
export type CreatePropMapBindingMutationVariables = Types.Exact<{
  input: Types.CreatePropMapBindingInput
}>

export type CreatePropMapBindingMutation = {
  createPropMapBinding: { id: string }
}

export type DeletePropMapBindingMutationVariables = Types.Exact<{
  input: Types.DeletePropMapBindingInput
}>

export type DeletePropMapBindingMutation = {
  deletePropMapBinding?: void | null | undefined
}

export type UpdatePropMapBindingMutationVariables = Types.Exact<{
  input: Types.UpdatePropMapBindingInput
}>

export type UpdatePropMapBindingMutation = {
  updatePropMapBinding?: void | null | undefined
}

export const CreatePropMapBindingGql = gql`
  mutation CreatePropMapBinding($input: CreatePropMapBindingInput!) {
    createPropMapBinding(input: $input) {
      id
    }
  }
`
export const DeletePropMapBindingGql = gql`
  mutation DeletePropMapBinding($input: DeletePropMapBindingInput!) {
    deletePropMapBinding(input: $input)
  }
`
export const UpdatePropMapBindingGql = gql`
  mutation UpdatePropMapBinding($input: UpdatePropMapBindingInput!) {
    updatePropMapBinding(input: $input)
  }
`

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    CreatePropMapBinding: build.mutation<
      CreatePropMapBindingMutation,
      GraphqlOperationOptions<CreatePropMapBindingMutationVariables>
    >({
      query: (options) => ({
        document: CreatePropMapBindingGql,
        options: options ?? undefined,
      }),
    }),
    DeletePropMapBinding: build.mutation<
      DeletePropMapBindingMutation,
      GraphqlOperationOptions<DeletePropMapBindingMutationVariables>
    >({
      query: (options) => ({
        document: DeletePropMapBindingGql,
        options: options ?? undefined,
      }),
    }),
    UpdatePropMapBinding: build.mutation<
      UpdatePropMapBindingMutation,
      GraphqlOperationOptions<UpdatePropMapBindingMutationVariables>
    >({
      query: (options) => ({
        document: UpdatePropMapBindingGql,
        options: options ?? undefined,
      }),
    }),
  }),
})
export { injectedRtkApi as api }
export const {
  useCreatePropMapBindingMutation,
  useDeletePropMapBindingMutation,
  useUpdatePropMapBindingMutation,
} = injectedRtkApi
