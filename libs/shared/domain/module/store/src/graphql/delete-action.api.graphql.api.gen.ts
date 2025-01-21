import * as Types from '@codelab/shared/infra/gqlgen'

import { graphql } from '@codelab/shared/infra/gqlgen'
import { gqlRequest } from '@codelab/shared/infra/fetch'

import {
  type DeleteCodeActionsMutationVariables,
  type DeleteApiActionsMutationVariables,
} from '@codelab/shared/infra/gqlgen'
import {
  DeleteCodeActionsDocument,
  DeleteApiActionsDocument,
} from './delete-action.api.graphql.docs.gen'
import { GraphQLClient } from 'graphql-request'

export const getSdk = (client: GraphQLClient) => ({
  DeleteCodeActions: (variables: DeleteCodeActionsMutationVariables) =>
    gqlRequest(client, DeleteCodeActionsDocument.toString(), variables),
  DeleteApiActions: (variables: DeleteApiActionsMutationVariables) =>
    gqlRequest(client, DeleteApiActionsDocument.toString(), variables),
})
