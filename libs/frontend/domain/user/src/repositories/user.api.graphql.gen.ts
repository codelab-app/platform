import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import { UserFragmentDoc } from '@codelab/shared/infra/gql'

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

import {
  type GetUsersQueryVariables,
  type CreateUserMutationVariables,
} from '@codelab/shared/infra/gql'

export const GetUsers = (
  variables: GetUsersQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetUsersDocument.toString(), variables, next)

export const CreateUser = (
  variables: CreateUserMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateUserDocument.toString(), variables, next)
