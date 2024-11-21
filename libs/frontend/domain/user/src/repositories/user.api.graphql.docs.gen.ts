import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { UserFragmentDoc } from '@codelab/shared/infra/gql'

export const GetUsersDocument = graphql(`
  query GetUsers($where: UserWhere) {
    aggregate: usersAggregate(where: $where) {
      count
    }
    items: users(where: $where) {
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

export const DeleteUsersDocument = graphql(`
  mutation DeleteUsers($where: UserWhere!) {
    deleteUsers(where: $where) {
      nodesDeleted
    }
  }
`)
