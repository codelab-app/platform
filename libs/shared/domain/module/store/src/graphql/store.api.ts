import { graphqlClient } from '@codelab/shared/infra/gql-client'

import { getSdk } from './store.api.graphql.api.gen'

export const storeApi = getSdk(graphqlClient)

export const storeServerActions = () => import('./store.api.graphql.web.gen')
