import { graphqlClient } from '@codelab/shared/infra/gql-client'

import { getSdk } from './atom.api.graphql.api.gen'

export const atomApi = getSdk(graphqlClient)

export const atomServerActions = () => require('./atom.api.graphql.web.gen')
