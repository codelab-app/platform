import * as Types from '@codelab/shared/abstract/codegen-v2'

import { ComponentFragment } from './Component.fragment.v2.graphql.gen'
import { gql } from 'graphql-request'
import { ComponentFragmentDoc } from './Component.fragment.v2.graphql.gen'
import {
  api,
  GraphqlOperationOptions,
} from '@codelab/frontend/model/infra/redux'
export type CreateComponentsMutationVariables = Types.Exact<{
  input: Array<Types.ComponentCreateInput> | Types.ComponentCreateInput
}>

export type CreateComponentsMutation = {
  createComponents: {
    components: Array<{
      ' $fragmentRefs': { ComponentFragment: ComponentFragment }
    }>
  }
}

export type DeleteComponentsMutationVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ComponentWhere>
  delete?: Types.InputMaybe<Types.ComponentDeleteInput>
}>

export type DeleteComponentsMutation = {
  deleteComponents: { nodesDeleted: number }
}

export type UpdateComponentsMutationVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ComponentWhere>
  update?: Types.InputMaybe<Types.ComponentUpdateInput>
}>

export type UpdateComponentsMutation = {
  updateComponents: {
    components: Array<{
      ' $fragmentRefs': { ComponentFragment: ComponentFragment }
    }>
  }
}

export type GetComponentsQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.ComponentOptions>
  where?: Types.InputMaybe<Types.ComponentWhere>
}>

export type GetComponentsQuery = {
  components: Array<{
    ' $fragmentRefs': { ComponentFragment: ComponentFragment }
  }>
}

export const CreateComponentsGql = gql`
  mutation CreateComponents($input: [ComponentCreateInput!]!) {
    createComponents(input: $input) {
      components {
        ...Component
      }
    }
  }
  ${ComponentFragmentDoc}
`
export const DeleteComponentsGql = gql`
  mutation DeleteComponents(
    $where: ComponentWhere
    $delete: ComponentDeleteInput
  ) {
    deleteComponents(where: $where, delete: $delete) {
      nodesDeleted
    }
  }
`
export const UpdateComponentsGql = gql`
  mutation UpdateComponents(
    $where: ComponentWhere
    $update: ComponentUpdateInput
  ) {
    updateComponents(where: $where, update: $update) {
      components {
        ...Component
      }
    }
  }
  ${ComponentFragmentDoc}
`
export const GetComponentsGql = gql`
  query GetComponents($options: ComponentOptions, $where: ComponentWhere) {
    components(options: $options, where: $where) {
      ...Component
    }
  }
  ${ComponentFragmentDoc}
`

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    CreateComponents: build.mutation<
      CreateComponentsMutation,
      GraphqlOperationOptions<CreateComponentsMutationVariables>
    >({
      query: (options) => ({
        document: CreateComponentsGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    DeleteComponents: build.mutation<
      DeleteComponentsMutation,
      | GraphqlOperationOptions<DeleteComponentsMutationVariables>
      | void
      | undefined
    >({
      query: (options) => ({
        document: DeleteComponentsGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    UpdateComponents: build.mutation<
      UpdateComponentsMutation,
      | GraphqlOperationOptions<UpdateComponentsMutationVariables>
      | void
      | undefined
    >({
      query: (options) => ({
        document: UpdateComponentsGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    GetComponents: build.query<
      GetComponentsQuery,
      GraphqlOperationOptions<GetComponentsQueryVariables> | void | undefined
    >({
      query: (options) => ({
        document: GetComponentsGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
  }),
})
export { injectedRtkApi as api }
export const {
  useCreateComponentsMutation,
  useDeleteComponentsMutation,
  useUpdateComponentsMutation,
  useGetComponentsQuery,
  useLazyGetComponentsQuery,
} = injectedRtkApi
