import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { ActionFragmentDoc } from '@codelab/shared/infra/gql'

import { type GetActionsQueryVariables } from '@codelab/shared/infra/gql'
import { GetActionsDocument } from './get-action.api.graphql.docs.gen'

export const GetActions = (
  variables: GetActionsQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(GetActionsDocument.toString(), variables, next)
