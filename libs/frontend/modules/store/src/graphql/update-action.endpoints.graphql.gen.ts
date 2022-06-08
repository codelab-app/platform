import * as Types from '@codelab/shared/abstract/codegen'

import {
  Action_CustomAction_Fragment,
  Action_PipelineAction_Fragment,
  Action_ResourceAction_Fragment,
} from '../../../../../shared/abstract/core/src/domain/action/action.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import { ActionFragmentDoc } from '../../../../../shared/abstract/core/src/domain/action/action.fragment.graphql.gen'
export type UpdateCustomActionsMutationVariables = Types.Exact<{
  connect?: Types.InputMaybe<Types.CustomActionConnectInput>
  create?: Types.InputMaybe<Types.CustomActionRelationInput>
  delete?: Types.InputMaybe<Types.CustomActionDeleteInput>
  disconnect?: Types.InputMaybe<Types.CustomActionDisconnectInput>
  update?: Types.InputMaybe<Types.CustomActionUpdateInput>
  where?: Types.InputMaybe<Types.CustomActionWhere>
}>

export type UpdateCustomActionsMutation = {
  updateCustomActions: { customActions: Array<Action_CustomAction_Fragment> }
}

export type UpdateResourceActionsMutationVariables = Types.Exact<{
  connect?: Types.InputMaybe<Types.ResourceActionConnectInput>
  create?: Types.InputMaybe<Types.ResourceActionRelationInput>
  delete?: Types.InputMaybe<Types.ResourceActionDeleteInput>
  disconnect?: Types.InputMaybe<Types.ResourceActionDisconnectInput>
  update?: Types.InputMaybe<Types.ResourceActionUpdateInput>
  where?: Types.InputMaybe<Types.ResourceActionWhere>
}>

export type UpdateResourceActionsMutation = {
  updateResourceActions: {
    resourceActions: Array<Action_ResourceAction_Fragment>
  }
}

export type UpdatePipelineActionsMutationVariables = Types.Exact<{
  connect?: Types.InputMaybe<Types.PipelineActionConnectInput>
  create?: Types.InputMaybe<Types.PipelineActionRelationInput>
  delete?: Types.InputMaybe<Types.PipelineActionDeleteInput>
  disconnect?: Types.InputMaybe<Types.PipelineActionDisconnectInput>
  update?: Types.InputMaybe<Types.PipelineActionUpdateInput>
  where?: Types.InputMaybe<Types.PipelineActionWhere>
}>

export type UpdatePipelineActionsMutation = {
  updatePipelineActions: {
    pipelineActions: Array<Action_PipelineAction_Fragment>
  }
}

export const UpdateCustomActionsDocument = gql`
  mutation UpdateCustomActions(
    $connect: CustomActionConnectInput
    $create: CustomActionRelationInput
    $delete: CustomActionDeleteInput
    $disconnect: CustomActionDisconnectInput
    $update: CustomActionUpdateInput
    $where: CustomActionWhere
  ) {
    updateCustomActions(
      update: $update
      where: $where
      connect: $connect
      create: $create
      delete: $delete
      disconnect: $disconnect
    ) {
      customActions {
        ...Action
      }
    }
  }
  ${ActionFragmentDoc}
`
export const UpdateResourceActionsDocument = gql`
  mutation UpdateResourceActions(
    $connect: ResourceActionConnectInput
    $create: ResourceActionRelationInput
    $delete: ResourceActionDeleteInput
    $disconnect: ResourceActionDisconnectInput
    $update: ResourceActionUpdateInput
    $where: ResourceActionWhere
  ) {
    updateResourceActions(
      update: $update
      where: $where
      connect: $connect
      create: $create
      delete: $delete
      disconnect: $disconnect
    ) {
      resourceActions {
        ...Action
      }
    }
  }
  ${ActionFragmentDoc}
`
export const UpdatePipelineActionsDocument = gql`
  mutation UpdatePipelineActions(
    $connect: PipelineActionConnectInput
    $create: PipelineActionRelationInput
    $delete: PipelineActionDeleteInput
    $disconnect: PipelineActionDisconnectInput
    $update: PipelineActionUpdateInput
    $where: PipelineActionWhere
  ) {
    updatePipelineActions(
      update: $update
      where: $where
      connect: $connect
      create: $create
      delete: $delete
      disconnect: $disconnect
    ) {
      pipelineActions {
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
    UpdateCustomActions(
      variables?: UpdateCustomActionsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateCustomActionsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateCustomActionsMutation>(
            UpdateCustomActionsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdateCustomActions',
        'mutation',
      )
    },
    UpdateResourceActions(
      variables?: UpdateResourceActionsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateResourceActionsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateResourceActionsMutation>(
            UpdateResourceActionsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdateResourceActions',
        'mutation',
      )
    },
    UpdatePipelineActions(
      variables?: UpdatePipelineActionsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdatePipelineActionsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdatePipelineActionsMutation>(
            UpdatePipelineActionsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdatePipelineActions',
        'mutation',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
