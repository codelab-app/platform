import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlFetch } from '@codelab/shared/infra/fetch'
import { ActionFragmentDoc } from '@codelab/shared/infra/gql'

import { type GetActionsQueryVariables } from '@codelab/shared/infra/gql'
import { GetActionsDocument } from './get-action.api.documents.graphql.gen'

export const GetActions = (
  variables: GetActionsQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetActionsDocument.toString(), variables, next)
