import { graphqlClient } from '@codelab/frontend/infra/graphql'
import { getSdk } from '../graphql/resource.endpoints.graphql.gen'

export const resourceApi = getSdk(graphqlClient)
