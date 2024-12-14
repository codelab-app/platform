import { graphqlClient } from '@codelab/shared/infra/gql-client'

import { getSdk } from './auth-guard.api.graphql.api.gen'

export const authGuardApi = getSdk(graphqlClient)

export const authGuardServerActions = () =>
  require('./auth-guard.api.graphql.web.gen')
