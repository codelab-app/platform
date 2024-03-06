import { graphqlClient } from '@codelab/frontend/infra/graphql'
import { getSdk } from '../graphql/store.endpoints.graphql.gen'

export const storeApi = getSdk(graphqlClient)
