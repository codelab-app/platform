import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlRequest } from '@codelab/shared/infra/fetch'

import {
  type DeleteCodeActionsMutationVariables,
  type DeleteApiActionsMutationVariables,
} from '@codelab/shared/infra/gql'
import {
  DeleteCodeActionsDocument,
  DeleteApiActionsDocument,
} from './delete-action.api.graphql.docs.gen'

export const getSdk = () => ({
  DeleteCodeActions: (variables: DeleteCodeActionsMutationVariables) =>
    gqlRequest(DeleteCodeActionsDocument.toString(), variables),
  DeleteApiActions: (variables: DeleteApiActionsMutationVariables) =>
    gqlRequest(DeleteApiActionsDocument.toString(), variables),
})
