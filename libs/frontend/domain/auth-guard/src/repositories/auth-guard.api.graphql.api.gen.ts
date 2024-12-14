import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlRequest } from '@codelab/shared/infra/fetch'
import { AuthGuardFragmentDoc } from '@codelab/shared/infra/gql'

import {
  type GetAuthGuardsQueryVariables,
  type CreateAuthGuardsMutationVariables,
  type UpdateAuthGuardMutationVariables,
  type DeleteAuthGuardsMutationVariables,
} from '@codelab/shared/infra/gql'
import {
  GetAuthGuardsDocument,
  CreateAuthGuardsDocument,
  UpdateAuthGuardDocument,
  DeleteAuthGuardsDocument,
} from './auth-guard.api.graphql.docs.gen'
import { GraphQLClient } from 'graphql-request'

export const getSdk = (client: GraphQLClient) => ({
  GetAuthGuards: (variables: GetAuthGuardsQueryVariables) =>
    gqlRequest(client, GetAuthGuardsDocument.toString(), variables),
  CreateAuthGuards: (variables: CreateAuthGuardsMutationVariables) =>
    gqlRequest(client, CreateAuthGuardsDocument.toString(), variables),
  UpdateAuthGuard: (variables: UpdateAuthGuardMutationVariables) =>
    gqlRequest(client, UpdateAuthGuardDocument.toString(), variables),
  DeleteAuthGuards: (variables: DeleteAuthGuardsMutationVariables) =>
    gqlRequest(client, DeleteAuthGuardsDocument.toString(), variables),
})
