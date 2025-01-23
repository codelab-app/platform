import * as Types from '@codelab/shared/infra/gqlgen'

import { graphql } from '@codelab/shared/infra/gqlgen'
import { gqlRequest } from '@codelab/shared/infra/fetch'

import {
  type CreateCodeActionsMutationVariables,
  type CreateApiActionsMutationVariables,
} from '@codelab/shared/infra/gqlgen'
import {
  CreateCodeActionsDocument,
  CreateApiActionsDocument,
} from './create-action.api.graphql.docs.gen'
import { GraphQLClient } from 'graphql-request'

export const getSdk = (client: GraphQLClient) => ({
  CreateCodeActions: (variables: CreateCodeActionsMutationVariables) =>
    gqlRequest(client, CreateCodeActionsDocument.toString(), variables),
  CreateApiActions: (variables: CreateApiActionsMutationVariables) =>
    gqlRequest(client, CreateApiActionsDocument.toString(), variables),
})
