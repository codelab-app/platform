import { graphqlClient } from '@codelab/shared/infra/gql-client'

import { getSdk } from './element.api.graphql.api.gen'

export const elementApi = () => getSdk(graphqlClient)

export const elementServerActions = () =>
  import('./element.api.graphql.web.gen')
