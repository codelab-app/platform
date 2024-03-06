import { graphqlClient } from '@codelab/frontend/infra/graphql'
import { getSdk } from './element.endpoints.graphql.gen'

export const elementApi = getSdk(graphqlClient)
