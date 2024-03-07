import { graphqlClient } from '@codelab/frontend/infra/graphql'
import { getSdk } from './tag.endpoints.graphql.gen'

export const tagApi = getSdk(graphqlClient)
