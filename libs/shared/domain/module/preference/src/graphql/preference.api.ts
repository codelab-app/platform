import { graphqlClient } from '@codelab/shared/infra/gql-client'

import { getSdk } from './preference.api.graphql.api.gen'

export const preferenceApi = () => getSdk(graphqlClient)

export const preferenceServerActions = () =>
  import('./preference.api.graphql.web.gen')
