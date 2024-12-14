import { graphqlClient } from '@codelab/shared/infra/gql-client'

import { getSdk } from './component.api.graphql.api.gen'

export const componentApi = getSdk(graphqlClient)

export const componentServerActions = () =>
  require('./component.api.graphql.web.gen')
