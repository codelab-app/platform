import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlRequest } from '@codelab/shared/infra/fetch'
import { UserFragmentDoc } from '@codelab/shared/infra/gql'

import {
  type GetUsersQueryVariables,
  type CreateUserMutationVariables,
  type DeleteUsersMutationVariables,
} from '@codelab/shared/infra/gql'
import {
  GetUsersDocument,
  CreateUserDocument,
  DeleteUsersDocument,
} from './user.api.graphql.docs.gen'

export const getSdk = () => ({
  GetUsers: (variables: GetUsersQueryVariables) =>
    gqlRequest(GetUsersDocument.toString(), variables),
  CreateUser: (variables: CreateUserMutationVariables) =>
    gqlRequest(CreateUserDocument.toString(), variables),
  DeleteUsers: (variables: DeleteUsersMutationVariables) =>
    gqlRequest(DeleteUsersDocument.toString(), variables),
})
