import { graphqlClient } from '@codelab/shared/infra/gql-client'

import { getSdk } from './auth-guard.api.graphql.api.gen'

export const authGuardApi = () => getSdk(graphqlClient)

import {
  CreateAuthGuards,
  DeleteAuthGuards,
  GetAuthGuards,
  UpdateAuthGuard,
} from './auth-guard.api.graphql.web.gen'

export const authGuardServerActions = {
  CreateAuthGuards,
  DeleteAuthGuards,
  GetAuthGuards,
  UpdateAuthGuard,
}
