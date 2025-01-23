import * as Types from '@codelab/shared/infra/gqlgen'

import { graphql } from '@codelab/shared/infra/gqlgen'
import { gqlRequest } from '@codelab/shared/infra/fetch'

import {
  type UpdateCodeActionsMutationVariables,
  type UpdateApiActionsMutationVariables,
} from '@codelab/shared/infra/gqlgen'
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
