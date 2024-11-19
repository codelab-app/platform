import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlRequest } from '@codelab/shared/infra/fetch'
import { ActionFragmentDoc } from '@codelab/shared/infra/gql'

import { type GetActionsQueryVariables } from '@codelab/shared/infra/gql'
import { GetActionsDocument } from './get-action.api.graphql.docs.gen'

export const getSdk = () => ({
  GetActions: (variables: GetActionsQueryVariables) =>
    gqlRequest(GetActionsDocument.toString(), variables),
})
