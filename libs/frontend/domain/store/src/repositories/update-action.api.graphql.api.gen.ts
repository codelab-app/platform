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
import { GraphQLClient } from 'graphql-request'

export const getSdk = (client: GraphQLClient) => ({
  UpdateCodeActions: (variables: UpdateCodeActionsMutationVariables) =>
    gqlRequest(client, UpdateCodeActionsDocument.toString(), variables),
  UpdateApiActions: (variables: UpdateApiActionsMutationVariables) =>
    gqlRequest(client, UpdateApiActionsDocument.toString(), variables),
})
