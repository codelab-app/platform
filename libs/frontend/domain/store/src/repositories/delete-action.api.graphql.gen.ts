import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'

export const DeleteCodeActionsDocument = graphql(`
  mutation DeleteCodeActions(
    $where: CodeActionWhere!
    $delete: CodeActionDeleteInput
  ) {
    deleteCodeActions(delete: $delete, where: $where) {
      nodesDeleted
      relationshipsDeleted
    }
  }
`)

export const DeleteApiActionsDocument = graphql(`
  mutation DeleteApiActions(
    $where: ApiActionWhere!
    $delete: ApiActionDeleteInput
  ) {
    deleteApiActions(delete: $delete, where: $where) {
      nodesDeleted
      relationshipsDeleted
    }
  }
`)

import {
  type DeleteCodeActionsMutationVariables,
  type DeleteApiActionsMutationVariables,
} from '@codelab/shared/infra/gql'

export const DeleteCodeActions = (
  variables: DeleteCodeActionsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteCodeActionsDocument.toString(), variables, next)

export const DeleteApiActions = (
  variables: DeleteApiActionsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteApiActionsDocument.toString(), variables, next)
