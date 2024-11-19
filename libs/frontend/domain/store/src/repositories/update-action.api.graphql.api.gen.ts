import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlRequest } from '@codelab/shared/infra/fetch'

import {
  type UpdateCodeActionsMutationVariables,
  type UpdateApiActionsMutationVariables,
} from '@codelab/shared/infra/gql'
import {
  UpdateCodeActionsDocument,
  UpdateApiActionsDocument,
} from './update-action.api.graphql.docs.gen'

export const getSdk = () => ({
  UpdateCodeActions: (variables: UpdateCodeActionsMutationVariables) =>
    gqlRequest(UpdateCodeActionsDocument.toString(), variables),
  UpdateApiActions: (variables: UpdateApiActionsMutationVariables) =>
    gqlRequest(UpdateApiActionsDocument.toString(), variables),
})
