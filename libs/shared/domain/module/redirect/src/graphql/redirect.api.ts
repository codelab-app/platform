import { graphqlClient } from '@codelab/shared/infra/gql-client'

import { getSdk } from './redirect.api.graphql.api.gen'

export const redirectApi = () => getSdk(graphqlClient)

export const redirectServerActions = () =>
  import('./redirect.api.graphql.web.gen')
