import * as Types from '@codelab/shared-infra-gqlgen'

import { gqlRequest } from '@codelab/shared-infra-fetch'
import { GraphQLClient } from 'graphql-request'
import {
  GetUsersDocument,
  CreateUserDocument,
  DeleteUsersDocument,
  UpdateUsersDocument,
} from '@codelab/shared-infra-gqlgen'

export const getSdk = (client: GraphQLClient) => ({
  GetUsers: (variables: Types.GetUsersQueryVariables) =>
    gqlRequest(client, GetUsersDocument.toString(), variables),
  CreateUser: (variables: Types.CreateUserMutationVariables) =>
    gqlRequest(client, CreateUserDocument.toString(), variables),
  DeleteUsers: (variables: Types.DeleteUsersMutationVariables) =>
    gqlRequest(client, DeleteUsersDocument.toString(), variables),
  UpdateUsers: (variables: Types.UpdateUsersMutationVariables) =>
    gqlRequest(client, UpdateUsersDocument.toString(), variables),
})
