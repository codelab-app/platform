import * as Types from '@codelab/frontend/infra/gql'

import { graphql } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import { ActionFragmentDoc } from '@codelab/frontend/infra/gql'

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
import { type GetActionsQueryVariables } from '@codelab/frontend/infra/gql'

const GetActions = (
  variables: GetActionsQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetActionsDocument, variables, next)

export const getSdk = () => ({ GetActions })
