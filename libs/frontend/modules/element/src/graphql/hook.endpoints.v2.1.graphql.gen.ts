import * as Types from '@codelab/shared/abstract/codegen-v2'

import {
  HookFragment,
  HookPropFragment,
} from './Element.fragment.v2.1.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-request'
import {
  HookFragmentDoc,
  HookPropFragmentDoc,
} from './Element.fragment.v2.1.graphql.gen'
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
  ${HookPropFragmentDoc}
`
export const DeleteHooksGql = gql`
  mutation DeleteHooks($where: HookWhere!) {
    deleteHooks(where: $where) {
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
    CreateHooks(
      variables: CreateHooksMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateHooksMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateHooksMutation>(CreateHooksGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'CreateHooks',
        'mutation',
      )
    },
    DeleteHooks(
      variables: DeleteHooksMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteHooksMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteHooksMutation>(DeleteHooksGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'DeleteHooks',
        'mutation',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
