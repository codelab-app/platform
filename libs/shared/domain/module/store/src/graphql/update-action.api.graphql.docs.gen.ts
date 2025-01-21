import * as Types from '@codelab/shared/infra/gqlgen'

import { graphql } from '@codelab/shared/infra/gqlgen'

export const UpdateCodeActionsDocument = graphql(`
  mutation UpdateCodeActions(
    $update: CodeActionUpdateInput
    $where: CodeActionWhere
  ) {
    updateCodeActions(update: $update, where: $where) {
      codeActions {
        __typename
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
      apiActions {
        __typename
        id
      }
    }
  }
`)
