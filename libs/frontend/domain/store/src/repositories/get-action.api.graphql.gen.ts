import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
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

import { type GetActionsQueryVariables } from '@codelab/shared/infra/gql'

export const GetActions = (
  variables: GetActionsQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetActionsDocument.toString(), variables, next)
