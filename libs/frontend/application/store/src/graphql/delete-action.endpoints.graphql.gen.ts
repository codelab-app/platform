import * as Types from '@codelab/shared/abstract/codegen'

import { GraphQLClient, RequestOptions } from 'graphql-request'
import { gql } from 'graphql-tag'
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders']
export type DeleteCodeActionsMutationVariables = Types.Exact<{
  where: Types.CodeActionWhere
  delete?: Types.InputMaybe<Types.CodeActionDeleteInput>
}>

export type DeleteCodeActionsMutation = {
  deleteCodeActions: { nodesDeleted: number; relationshipsDeleted: number }
}

export type DeleteApiActionsMutationVariables = Types.Exact<{
  where: Types.ApiActionWhere
  delete?: Types.InputMaybe<Types.ApiActionDeleteInput>
}>

export type DeleteApiActionsMutation = {
  deleteApiActions: { nodesDeleted: number; relationshipsDeleted: number }
}

export const DeleteCodeActionsDocument = gql`
  mutation DeleteCodeActions(
    $where: CodeActionWhere!
    $delete: CodeActionDeleteInput
  ) {
    deleteCodeActions(delete: $delete, where: $where) {
      nodesDeleted
      relationshipsDeleted
    }
  }
`
export const DeleteApiActionsDocument = gql`
  mutation DeleteApiActions(
    $where: ApiActionWhere!
    $delete: ApiActionDeleteInput
  ) {
    deleteApiActions(delete: $delete, where: $where) {
      nodesDeleted
      relationshipsDeleted
    }
  }
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
  variables?: any,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
  _variables,
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    DeleteCodeActions(
      variables: DeleteCodeActionsMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<DeleteCodeActionsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteCodeActionsMutation>(
            DeleteCodeActionsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'DeleteCodeActions',
        'mutation',
        variables,
      )
    },
    DeleteApiActions(
      variables: DeleteApiActionsMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<DeleteApiActionsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteApiActionsMutation>(
            DeleteApiActionsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'DeleteApiActions',
        'mutation',
        variables,
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
