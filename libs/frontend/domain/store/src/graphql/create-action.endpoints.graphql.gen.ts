import * as Types from '@codelab/shared/abstract/codegen'

import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
export type CreateCodeActionsMutationVariables = Types.Exact<{
  input: Array<Types.CodeActionCreateInput> | Types.CodeActionCreateInput
}>

export type CreateCodeActionsMutation = {
  createCodeActions: { codeActions: Array<{ id: string }> }
}

export type CreateApiActionsMutationVariables = Types.Exact<{
  input: Array<Types.ApiActionCreateInput> | Types.ApiActionCreateInput
}>

export type CreateApiActionsMutation = {
  createApiActions: { apiActions: Array<{ id: string }> }
}

export const CreateCodeActionsDocument = gql`
  mutation CreateCodeActions($input: [CodeActionCreateInput!]!) {
    createCodeActions(input: $input) {
      codeActions {
        id
      }
    }
  }
`
export const CreateApiActionsDocument = gql`
  mutation CreateApiActions($input: [ApiActionCreateInput!]!) {
    createApiActions(input: $input) {
      apiActions {
        id
      }
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
