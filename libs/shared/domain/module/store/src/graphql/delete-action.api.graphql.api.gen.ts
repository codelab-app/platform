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
import { GraphQLClient } from 'graphql-request'

export const getSdk = (client: GraphQLClient) => ({
  DeleteCodeActions: (variables: DeleteCodeActionsMutationVariables) =>
    gqlRequest(client, DeleteCodeActionsDocument.toString(), variables),
  DeleteApiActions: (variables: DeleteApiActionsMutationVariables) =>
    gqlRequest(client, DeleteApiActionsDocument.toString(), variables),
})
