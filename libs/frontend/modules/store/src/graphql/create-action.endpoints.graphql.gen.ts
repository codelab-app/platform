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
export type CreateCustomActionsMutationVariables = Types.Exact<{
  input: Array<Types.CustomActionCreateInput> | Types.CustomActionCreateInput
}>

export type CreateCustomActionsMutation = {
  createCustomActions: { customActions: Array<Action_CustomAction_Fragment> }
}

export type CreateResourceActionsMutationVariables = Types.Exact<{
  input:
    | Array<Types.ResourceActionCreateInput>
    | Types.ResourceActionCreateInput
}>

export type CreateResourceActionsMutation = {
  createResourceActions: {
    resourceActions: Array<Action_ResourceAction_Fragment>
  }
}

export type CreatePipelineActionsMutationVariables = Types.Exact<{
  input:
    | Array<Types.ResourceActionCreateInput>
    | Types.ResourceActionCreateInput
}>

export type CreatePipelineActionsMutation = {
  createResourceActions: {
    resourceActions: Array<Action_ResourceAction_Fragment>
  }
}

export const CreateCustomActionsDocument = gql`
  mutation CreateCustomActions($input: [CustomActionCreateInput!]!) {
    createCustomActions(input: $input) {
      customActions {
        ...Action
      }
    }
  }
  ${ActionFragmentDoc}
`
export const CreateResourceActionsDocument = gql`
  mutation CreateResourceActions($input: [ResourceActionCreateInput!]!) {
    createResourceActions(input: $input) {
      resourceActions {
        ...Action
      }
    }
  }
  ${ActionFragmentDoc}
`
export const CreatePipelineActionsDocument = gql`
  mutation CreatePipelineActions($input: [ResourceActionCreateInput!]!) {
    createResourceActions(input: $input) {
      resourceActions {
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
    CreateCustomActions(
      variables: CreateCustomActionsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateCustomActionsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateCustomActionsMutation>(
            CreateCustomActionsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateCustomActions',
        'mutation',
      )
    },
    CreateResourceActions(
      variables: CreateResourceActionsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateResourceActionsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateResourceActionsMutation>(
            CreateResourceActionsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateResourceActions',
        'mutation',
      )
    },
    CreatePipelineActions(
      variables: CreatePipelineActionsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreatePipelineActionsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreatePipelineActionsMutation>(
            CreatePipelineActionsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreatePipelineActions',
        'mutation',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
