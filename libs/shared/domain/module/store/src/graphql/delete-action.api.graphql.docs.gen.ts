import * as Types from '@codelab/shared/infra/gqlgen'

import { graphql } from '@codelab/shared/infra/gqlgen'

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
