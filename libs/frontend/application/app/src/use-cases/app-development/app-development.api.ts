import { graphqlClient } from '@codelab/frontend/infra/graphql'
import { getSdk } from './app-development.endpoints.graphql.gen'

export const appDevelopmentApi = getSdk(graphqlClient)
