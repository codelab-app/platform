import * as Types from '@codelab/shared/abstract/codegen-v2'

import { PropMapBindingFragment } from './Element.fragment.v2.graphql.gen'
import { gql } from '@apollo/client'
import { PropMapBindingFragmentDoc } from './Element.fragment.v2.graphql.gen'
import {
  api,
  GraphqlOperationOptions,
} from '@codelab/frontend/model/infra/redux'
export type CreatePropMapBindingsMutationVariables = Types.Exact<{
  input:
    | Array<Types.PropMapBindingCreateInput>
    | Types.PropMapBindingCreateInput
}>

export type CreatePropMapBindingsMutation = {
  createPropMapBindings: { propMapBindings: Array<PropMapBindingFragment> }
}

export type UpdatePropMapBindingsMutationVariables = Types.Exact<{
  where: Types.PropMapBindingWhere
  update: Types.PropMapBindingUpdateInput
}>

export type UpdatePropMapBindingsMutation = {
  updatePropMapBindings: { propMapBindings: Array<PropMapBindingFragment> }
}

export type DeletePropMapBindingsMutationVariables = Types.Exact<{
  where: Types.PropMapBindingWhere
}>

export type DeletePropMapBindingsMutation = {
  deletePropMapBindings: { nodesDeleted: number }
}

export type GetPropMapBindingsQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.PropMapBindingOptions>
  where?: Types.InputMaybe<Types.PropMapBindingWhere>
}>

export type GetPropMapBindingsQuery = {
  propMapBindings: Array<PropMapBindingFragment>
}

export const CreatePropMapBindingsGql = gql`
  mutation CreatePropMapBindings($input: [PropMapBindingCreateInput!]!) {
    createPropMapBindings(input: $input) {
      propMapBindings {
        ...PropMapBinding
      }
    }
  }
  ${PropMapBindingFragmentDoc}
`
export const UpdatePropMapBindingsGql = gql`
  mutation UpdatePropMapBindings(
    $where: PropMapBindingWhere!
    $update: PropMapBindingUpdateInput!
  ) {
    updatePropMapBindings(where: $where, update: $update) {
      propMapBindings {
        ...PropMapBinding
      }
    }
  }
  ${PropMapBindingFragmentDoc}
`
export const DeletePropMapBindingsGql = gql`
  mutation DeletePropMapBindings($where: PropMapBindingWhere!) {
    deletePropMapBindings(where: $where) {
      nodesDeleted
    }
  }
`
export const GetPropMapBindingsGql = gql`
  query GetPropMapBindings(
    $options: PropMapBindingOptions
    $where: PropMapBindingWhere
  ) {
    propMapBindings(options: $options, where: $where) {
      ...PropMapBinding
    }
  }
  ${PropMapBindingFragmentDoc}
`

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    CreatePropMapBindings: build.mutation<
      CreatePropMapBindingsMutation,
      GraphqlOperationOptions<CreatePropMapBindingsMutationVariables>
    >({
      query: (options) => ({
        document: CreatePropMapBindingsGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    UpdatePropMapBindings: build.mutation<
      UpdatePropMapBindingsMutation,
      GraphqlOperationOptions<UpdatePropMapBindingsMutationVariables>
    >({
      query: (options) => ({
        document: UpdatePropMapBindingsGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    DeletePropMapBindings: build.mutation<
      DeletePropMapBindingsMutation,
      GraphqlOperationOptions<DeletePropMapBindingsMutationVariables>
    >({
      query: (options) => ({
        document: DeletePropMapBindingsGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    GetPropMapBindings: build.query<
      GetPropMapBindingsQuery,
      | GraphqlOperationOptions<GetPropMapBindingsQueryVariables>
      | void
      | undefined
    >({
      query: (options) => ({
        document: GetPropMapBindingsGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
  }),
})
export { injectedRtkApi as api }
export const {
  useCreatePropMapBindingsMutation,
  useUpdatePropMapBindingsMutation,
  useDeletePropMapBindingsMutation,
  useGetPropMapBindingsQuery,
  useLazyGetPropMapBindingsQuery,
} = injectedRtkApi
