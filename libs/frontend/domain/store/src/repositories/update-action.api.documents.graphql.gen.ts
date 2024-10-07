import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'

export const UpdateCodeActionsDocument = graphql(`
  mutation UpdateCodeActions(
    $connect: CodeActionConnectInput
    $create: CodeActionRelationInput
    $delete: CodeActionDeleteInput
    $disconnect: CodeActionDisconnectInput
    $update: CodeActionUpdateInput
    $where: CodeActionWhere
  ) {
    updateCodeActions(
      connect: $connect
      create: $create
      delete: $delete
      disconnect: $disconnect
      update: $update
      where: $where
    ) {
      codeActions {
        id
      }
    }
  }
`)

export const UpdateApiActionsDocument = graphql(`
  mutation UpdateApiActions(
    $connect: ApiActionConnectInput
    $create: ApiActionRelationInput
    $delete: ApiActionDeleteInput
    $disconnect: ApiActionDisconnectInput
    $update: ApiActionUpdateInput
    $where: ApiActionWhere
  ) {
    updateApiActions(
      connect: $connect
      create: $create
      delete: $delete
      disconnect: $disconnect
      update: $update
      where: $where
    ) {
      apiActions {
        id
      }
    }
  }
`)
