import { graphqlClient } from '@codelab/shared/infra/gql-client'

import { getSdk } from './user.api.graphql.api.gen'

export const userApi = () => getSdk(graphqlClient)

import {
  CreateUser,
  DeleteUsers,
  GetUsers,
} from './user.api.graphql.web.gen'

export const userServerActions = {
  CreateUser,
  DeleteUsers,
  GetUsers,
}
