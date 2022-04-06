import * as Types from '@codelab/shared/abstract/codegen'

import { ActionFragment } from './action.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import { ActionFragmentDoc } from './action.fragment.graphql.gen'
export type CreateActionsMutationVariables = Types.Exact<{
  input: Array<Types.ActionCreateInput> | Types.ActionCreateInput
}>

export type CreateActionsMutation = {
  createActions: {
    info: { nodesCreated: number; relationshipsCreated: number }
    actions: Array<ActionFragment>
  }
}

export type DeleteActionsMutationVariables = Types.Exact<{
  where: Types.ActionWhere
}>

export type DeleteActionsMutation = {
  deleteActions: { nodesDeleted: number; relationshipsDeleted: number }
}

export type GetActionsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ActionWhere>
  options?: Types.InputMaybe<Types.ActionOptions>
}>

export type GetActionsQuery = { actions: Array<ActionFragment> }

export type UpdateActionsMutationVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ActionWhere>
  update?: Types.InputMaybe<Types.ActionUpdateInput>
}>

export type UpdateActionsMutation = {
  updateActions: { actions: Array<ActionFragment> }
}

export const CreateActionsDocument = gql`
  mutation CreateActions($input: [ActionCreateInput!]!) {
    createActions(input: $input) {
      info {
        nodesCreated
        relationshipsCreated
      }
      actions {
        ...Action
      }
    }
  }
  ${ActionFragmentDoc}
`
export const DeleteActionsDocument = gql`
  mutation DeleteActions($where: ActionWhere!) {
    deleteActions(where: $where) {
      nodesDeleted
      relationshipsDeleted
    }
  }
`
export const GetActionsDocument = gql`
  query GetActions($where: ActionWhere, $options: ActionOptions) {
    actions(where: $where, options: $options) {
      ...Action
    }
  }
  ${ActionFragmentDoc}
`
export const UpdateActionsDocument = gql`
  mutation UpdateActions($where: ActionWhere, $update: ActionUpdateInput) {
    updateActions(update: $update, where: $where) {
      actions {
        ...Action
      }
    }
  }
  ${ActionFragmentDoc}
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
    CreateActions(
      variables: CreateActionsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateActionsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateActionsMutation>(
            CreateActionsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateActions',
        'mutation',
      )
    },
    DeleteActions(
      variables: DeleteActionsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteActionsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteActionsMutation>(
            DeleteActionsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'DeleteActions',
        'mutation',
      )
    },
    GetActions(
      variables?: GetActionsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetActionsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetActionsQuery>(GetActionsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetActions',
        'query',
      )
    },
    UpdateActions(
      variables?: UpdateActionsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateActionsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateActionsMutation>(
            UpdateActionsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdateActions',
        'mutation',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
