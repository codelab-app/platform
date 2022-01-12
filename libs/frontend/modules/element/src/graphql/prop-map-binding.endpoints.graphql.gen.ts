import * as Types from '@codelab/frontend/abstract/codegen'

import { PropMapBindingFragment } from './Element.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { PropMapBindingFragmentDoc } from './Element.fragment.graphql.gen'
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
  deletePropMapBinding?: Array<PropMapBindingFragment> | null | undefined
}

export type UpdatePropMapBindingMutationVariables = Types.Exact<{
  input: Types.UpdatePropMapBindingInput
}>

export type UpdatePropMapBindingMutation = {
  updatePropMapBinding?: PropMapBindingFragment | null | undefined
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
    deletePropMapBinding(input: $input) {
      ...PropMapBinding
    }
  }
  ${PropMapBindingFragmentDoc}
`
export const UpdatePropMapBindingGql = gql`
  mutation UpdatePropMapBinding($input: UpdatePropMapBindingInput!) {
    updatePropMapBinding(input: $input) {
      ...PropMapBinding
    }
  }
  ${PropMapBindingFragmentDoc}
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
