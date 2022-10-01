import * as Types from '@codelab/shared/abstract/codegen'






import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
export type DeleteCodeActionsMutationVariables = Types.Exact<{
  where: Types.CodeActionWhere
}>

export type DeleteCodeActionsMutation = {
  deleteCodeActions: { nodesDeleted: number; relationshipsDeleted: number }
}

export type DeleteApiActionsMutationVariables = Types.Exact<{
  where: Types.ApiActionWhere
}>

export type DeleteApiActionsMutation = {
  deleteApiActions: { nodesDeleted: number; relationshipsDeleted: number }
}

export const DeleteCodeActionsDocument = gql`
  mutation DeleteCodeActions($where: CodeActionWhere!) {
    deleteCodeActions(where: $where) {
      nodesDeleted
      relationshipsDeleted
    }
  }
`
export const DeleteApiActionsDocument = gql`
  mutation DeleteApiActions($where: ApiActionWhere!) {
    deleteApiActions(where: $where) {
      nodesDeleted
      relationshipsDeleted
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
    DeleteCodeActions(
      variables: DeleteCodeActionsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
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
      )
    },
    DeleteApiActions(
      variables: DeleteApiActionsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
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
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
