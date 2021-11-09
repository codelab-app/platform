import * as Types from '@codelab/frontend/abstract/codegen'

import {
  ElementFragment,
  ElementGraphFragment,
} from './Element.fragment.graphql.gen'
import { gql } from '@apollo/client'
import {
  ElementFragmentDoc,
  ElementGraphFragmentDoc,
} from './Element.fragment.graphql.gen'
import { api, GraphqlOperationOptions } from '@codelab/frontend/model/infra/api'
export type GetComponentsQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetComponentsQuery = { getComponents: Array<ElementFragment> }

export type CreateComponentMutationVariables = Types.Exact<{
  input: Types.CreateComponentInput
}>

export type CreateComponentMutation = { createComponent: ElementFragment }

export const GetComponentsGql = gql`
  query GetComponents {
    getComponents {
      ...Element
    }
  }
  ${ElementFragmentDoc}
`
export const CreateComponentGql = gql`
  mutation CreateComponent($input: CreateComponentInput!) {
    createComponent(input: $input) {
      ...Element
    }
  }
  ${ElementFragmentDoc}
`

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    GetComponents: build.query<
      GetComponentsQuery,
      GraphqlOperationOptions<GetComponentsQueryVariables> | void | undefined
    >({
      query: (options) => ({
        document: GetComponentsGql,
        options: options ?? undefined,
      }),
    }),
    CreateComponent: build.mutation<
      CreateComponentMutation,
      GraphqlOperationOptions<CreateComponentMutationVariables>
    >({
      query: (options) => ({
        document: CreateComponentGql,
        options: options ?? undefined,
      }),
    }),
  }),
})
export { injectedRtkApi as api }
export const {
  useGetComponentsQuery,
  useLazyGetComponentsQuery,
  useCreateComponentMutation,
} = injectedRtkApi
