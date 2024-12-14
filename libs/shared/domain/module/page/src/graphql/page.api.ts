import { graphqlClient } from '@codelab/shared/infra/gql-client'

import { getSdk } from './page.api.graphql.api.gen'

export const pageApi = getSdk(graphqlClient)

export const pageServerActions = () => require('./page.api.graphql.web.gen')
