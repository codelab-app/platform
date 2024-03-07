import { graphqlClient } from '@codelab/frontend/infra/graphql'
import { getSdk } from './app-production.endpoints.graphql.gen'

export const appProductionApi = getSdk(graphqlClient)
