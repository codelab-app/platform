import { graphqlClient } from '@codelab/shared/infra/gql-client'

import { getSdk } from './component.api.graphql.api.gen'

export const componentApi = () => getSdk(graphqlClient)

export const componentServerActions = () =>
  import('./component.api.graphql.web.gen')
