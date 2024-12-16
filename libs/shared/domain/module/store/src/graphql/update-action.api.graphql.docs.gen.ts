import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'

export const UpdateCodeActionsDocument = graphql(`
  mutation UpdateCodeActions(
    $update: CodeActionUpdateInput
    $where: CodeActionWhere
  ) {
    updateCodeActions(update: $update, where: $where) {
      actions: codeActions {
        id
      }
    }
  }
`)

export const UpdateApiActionsDocument = graphql(`
  mutation UpdateApiActions(
    $update: ApiActionUpdateInput
    $where: ApiActionWhere
  ) {
    updateApiActions(update: $update, where: $where) {
      actions: apiActions {
        id
      }
    }
  }
`)
