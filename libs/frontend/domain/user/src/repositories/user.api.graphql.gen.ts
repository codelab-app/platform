import * as Types from '@codelab/frontend/infra/gql'

import { graphql } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import { UserFragmentDoc } from '@codelab/frontend/infra/gql'

export const GetUsersDocument = graphql(`
  query GetUsers($where: UserWhere) {
    users(where: $where) {
      ...User
    }
  }
`)

export const CreateUserDocument = graphql(`
  mutation CreateUser($input: [UserCreateInput!]!) {
    createUsers(input: $input) {
      users {
        email
        id
      }
    }
  }
`)

export const UpdateUserDocument = graphql(`
  mutation UpdateUser($where: UserWhere, $update: UserUpdateInput!) {
    updateUsers(update: $update, where: $where) {
      users {
        preferences
      }
    }
  }
`)

import {
  type GetUsersQueryVariables,
  type CreateUserMutationVariables,
  type UpdateUserMutationVariables,
} from '@codelab/frontend/infra/gql'

export const GetUsers = (
  variables: GetUsersQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetUsersDocument.toString(), variables, next)

export const CreateUser = (
  variables: CreateUserMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateUserDocument.toString(), variables, next)

export const UpdateUser = (
  variables: UpdateUserMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateUserDocument.toString(), variables, next)
