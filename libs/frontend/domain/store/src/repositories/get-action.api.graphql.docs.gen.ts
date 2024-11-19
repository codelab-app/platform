import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { ActionFragmentDoc } from '@codelab/shared/infra/gql'

export const GetActionsDocument = graphql(`
  query GetActions(
    $codeActionWhere: CodeActionWhere
    $apiActionWhere: ApiActionWhere
  ) {
    apiActions(where: $apiActionWhere) {
      ...Action
    }
    codeActions(where: $codeActionWhere) {
      ...Action
    }
  }
`)
