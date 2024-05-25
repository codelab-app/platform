import { graphqlClient } from '@codelab/frontend/infra/graphql'
import { getSdk } from './component-development.endpoints.graphql.gen'

export const componentDevelopmentApi = getSdk(graphqlClient)
