import * as Types from '@codelab/shared/infra/gqlgen'

import { graphql } from '@codelab/shared/infra/gqlgen'
import { ActionFragmentDoc } from '@codelab/shared/infra/gqlgen'

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
