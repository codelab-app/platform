import { graphqlClient } from '@codelab/shared/infra/gql-client'

import { getSdk } from './app.api.graphql.api.gen'

export const appApi = getSdk(graphqlClient)
