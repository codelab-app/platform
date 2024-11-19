import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlRequest } from '@codelab/shared/infra/fetch'

import {
  type CreateCodeActionsMutationVariables,
  type CreateApiActionsMutationVariables,
} from '@codelab/shared/infra/gql'
import {
  CreateCodeActionsDocument,
  CreateApiActionsDocument,
} from './create-action.api.graphql.docs.gen'

export const getSdk = () => ({
  CreateCodeActions: (variables: CreateCodeActionsMutationVariables) =>
    gqlRequest(CreateCodeActionsDocument.toString(), variables),
  CreateApiActions: (variables: CreateApiActionsMutationVariables) =>
    gqlRequest(CreateApiActionsDocument.toString(), variables),
})
