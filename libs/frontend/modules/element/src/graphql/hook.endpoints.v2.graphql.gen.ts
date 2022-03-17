import * as Types from '@codelab/shared/abstract/codegen-v2'

import { HookFragment } from './Element.fragment.v2.graphql.gen'
import { gql } from 'graphql-request'
import { HookFragmentDoc } from './Element.fragment.v2.graphql.gen'
import {
  api,
  GraphqlOperationOptions,
} from '@codelab/frontend/model/infra/redux'
export type CreateHooksMutationVariables = Types.Exact<{
  input: Array<Types.HookCreateInput> | Types.HookCreateInput
}>

export type CreateHooksMutation = {
  createHooks: { hooks: Array<HookFragment> }
}

export type DeleteHooksMutationVariables = Types.Exact<{
  where: Types.HookWhere
}>

export type DeleteHooksMutation = { deleteHooks: { nodesDeleted: number } }

export const CreateHooksGql = gql`
  mutation CreateHooks($input: [HookCreateInput!]!) {
    createHooks(input: $input) {
      hooks {
        ...Hook
      }
    }
  }
  ${HookFragmentDoc}
`
export const DeleteHooksGql = gql`
  mutation DeleteHooks($where: HookWhere!) {
    deleteHooks(where: $where) {
      nodesDeleted
    }
  }
`

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    CreateHooks: build.mutation<
      CreateHooksMutation,
      GraphqlOperationOptions<CreateHooksMutationVariables>
    >({
      query: (options) => ({
        document: CreateHooksGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    DeleteHooks: build.mutation<
      DeleteHooksMutation,
      GraphqlOperationOptions<DeleteHooksMutationVariables>
    >({
      query: (options) => ({
        document: DeleteHooksGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
  }),
})
export { injectedRtkApi as api }
export const { useCreateHooksMutation, useDeleteHooksMutation } = injectedRtkApi
