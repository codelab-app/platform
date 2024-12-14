import { graphqlClient } from '@codelab/shared/infra/gql-client'

import { getSdk } from './resource.api.graphql.api.gen'

export const resourceApi = getSdk(graphqlClient)

export const resourceServerActions = () =>
  require('./resource.api.graphql.web.gen')
