import { graphqlClient } from '@codelab/shared/infra/gql-client'

import { getSdk } from './domain.api.graphql.api.gen'

export const domainApi = getSdk(graphqlClient)

export const domainServerActions = () => import('./domain.api.graphql.web.gen')
