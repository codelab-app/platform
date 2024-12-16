import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlRequest } from '@codelab/shared/infra/fetch'
import { UserFragmentDoc } from '@codelab/shared/infra/gql'

import {
  type GetUsersQueryVariables,
  type CreateUserMutationVariables,
  type DeleteUsersMutationVariables,
  type UpdateUsersMutationVariables,
} from '@codelab/shared/infra/gql'
import {
  GetUsersDocument,
  CreateUserDocument,
  DeleteUsersDocument,
  UpdateUsersDocument,
} from './user.api.graphql.docs.gen'
import { GraphQLClient } from 'graphql-request'

export const getSdk = (client: GraphQLClient) => ({
  GetUsers: (variables: GetUsersQueryVariables) =>
    gqlRequest(client, GetUsersDocument.toString(), variables),
  CreateUser: (variables: CreateUserMutationVariables) =>
    gqlRequest(client, CreateUserDocument.toString(), variables),
  DeleteUsers: (variables: DeleteUsersMutationVariables) =>
    gqlRequest(client, DeleteUsersDocument.toString(), variables),
  UpdateUsers: (variables: UpdateUsersMutationVariables) =>
    gqlRequest(client, UpdateUsersDocument.toString(), variables),
})
