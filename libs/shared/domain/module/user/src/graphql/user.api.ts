import { graphqlClient } from '@codelab/shared/infra/gql-client'

import { getSdk } from './user.api.graphql.api.gen'

export const userApi = getSdk(graphqlClient)

export const userServerActions = () => import('./user.api.graphql.web.gen')
