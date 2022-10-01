import * as Types from '@codelab/shared/abstract/codegen'





import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import {
  Action_ApiAction_Fragment,
  Action_CodeAction_Fragment,
  ActionFragmentDoc,
} from '../../../../abstract/core/src/domain/action/fragments/action.fragment.graphql.gen'

export type CreateCodeActionsMutationVariables = Types.Exact<{
  input: Array<Types.CodeActionCreateInput> | Types.CodeActionCreateInput
}>

export interface CreateCodeActionsMutation {
  createCodeActions: { codeActions: Array<Action_CodeAction_Fragment> }
}

export type CreateApiActionsMutationVariables = Types.Exact<{
  input: Array<Types.ApiActionCreateInput> | Types.ApiActionCreateInput
}>

export interface CreateApiActionsMutation {
  createApiActions: { apiActions: Array<Action_ApiAction_Fragment> }
}

export const CreateCodeActionsDocument = gql`
  mutation CreateCodeActions($input: [CodeActionCreateInput!]!) {
    createCodeActions(input: $input) {
      codeActions {
        ...Action
      }
    }
  }
  ${ActionFragmentDoc}
`
export const CreateApiActionsDocument = gql`
  mutation CreateApiActions($input: [ApiActionCreateInput!]!) {
    createApiActions(input: $input) {
      apiActions {
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
    CreateCodeActions(
      variables: CreateCodeActionsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateCodeActionsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateCodeActionsMutation>(
            CreateCodeActionsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateCodeActions',
        'mutation',
      )
    },
    CreateApiActions(
      variables: CreateApiActionsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateApiActionsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateApiActionsMutation>(
            CreateApiActionsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateApiActions',
        'mutation',
      )
    },
  }
}

export type Sdk = ReturnType<typeof getSdk>
