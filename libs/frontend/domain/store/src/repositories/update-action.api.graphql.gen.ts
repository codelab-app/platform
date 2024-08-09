import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'

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

import {
  type UpdateCodeActionsMutationVariables,
  type UpdateApiActionsMutationVariables,
} from '@codelab/shared/infra/gql'

export const UpdateCodeActions = (
  variables: UpdateCodeActionsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateCodeActionsDocument.toString(), variables, next)

export const UpdateApiActions = (
  variables: UpdateApiActionsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateApiActionsDocument.toString(), variables, next)
