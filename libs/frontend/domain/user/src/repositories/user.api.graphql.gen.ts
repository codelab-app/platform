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

const GetUsers = (
  variables: GetUsersQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetUsersDocument, variables, next)

const CreateUser = (
  variables: CreateUserMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateUserDocument, variables, next)

const UpdateUser = (
  variables: UpdateUserMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateUserDocument, variables, next)

export const getSdk = () => ({ GetUsers, CreateUser, UpdateUser })
