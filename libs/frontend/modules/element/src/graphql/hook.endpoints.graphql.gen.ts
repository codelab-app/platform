import * as Types from '@codelab/frontend/abstract/codegen'

import {
  HookFragment,
  PropMapBindingFragment,
} from './Element.fragment.graphql.gen'
import { gql } from '@apollo/client'
import {
  HookFragmentDoc,
  PropMapBindingFragmentDoc,
} from './Element.fragment.graphql.gen'
import { api, GraphqlOperationOptions } from '@codelab/frontend/model/infra/api'
export type AddHookToElementMutationVariables = Types.Exact<{
  input: Types.AddHookToElementInput
}>

export type AddHookToElementMutation = { addHookToElement: { id: string } }

export type GetLambdaNameQueryVariables = Types.Exact<{
  input: Types.GetLambdaInput
}>

export type GetLambdaNameQuery = {
  getLambda?: { name: string } | null | undefined
}

export type RemoveHookFromElementMutationVariables = Types.Exact<{
  input: Types.RemoveHookFromElementInput
}>

export type RemoveHookFromElementMutation = {
  removeHookFromElement?: HookFragment | null | undefined
}

export const AddHookToElementGql = gql`
  mutation AddHookToElement($input: AddHookToElementInput!) {
    addHookToElement(input: $input) {
      id
    }
  }
`
export const GetLambdaNameGql = gql`
  query GetLambdaName($input: GetLambdaInput!) {
    getLambda(input: $input) {
      name
    }
  }
`
export const RemoveHookFromElementGql = gql`
  mutation RemoveHookFromElement($input: RemoveHookFromElementInput!) {
    removeHookFromElement(input: $input) {
      ...Hook
    }
  }
  ${HookFragmentDoc}
`

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    AddHookToElement: build.mutation<
      AddHookToElementMutation,
      GraphqlOperationOptions<AddHookToElementMutationVariables>
    >({
      query: (options) => ({
        document: AddHookToElementGql,
        options: options ?? undefined,
      }),
    }),
    GetLambdaName: build.query<
      GetLambdaNameQuery,
      GraphqlOperationOptions<GetLambdaNameQueryVariables>
    >({
      query: (options) => ({
        document: GetLambdaNameGql,
        options: options ?? undefined,
      }),
    }),
    RemoveHookFromElement: build.mutation<
      RemoveHookFromElementMutation,
      GraphqlOperationOptions<RemoveHookFromElementMutationVariables>
    >({
      query: (options) => ({
        document: RemoveHookFromElementGql,
        options: options ?? undefined,
      }),
    }),
  }),
})
export { injectedRtkApi as api }
export const {
  useAddHookToElementMutation,
  useGetLambdaNameQuery,
  useLazyGetLambdaNameQuery,
  useRemoveHookFromElementMutation,
} = injectedRtkApi
