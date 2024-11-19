import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
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
