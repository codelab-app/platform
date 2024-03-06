import { graphqlClient } from '@codelab/frontend/infra/graphql'
import { getSdk } from '../graphql/auth-guard.endpoints.graphql.gen'

export const authGuardApi = getSdk(graphqlClient)
