import { graphqlClient } from '@codelab/shared/infra/gql-client'

import { getSdk } from './tag.api.graphql.api.gen'

export const tagApi = () => getSdk(graphqlClient)

export const tagServerActions = () => import('./tag.api.graphql.web.gen')
