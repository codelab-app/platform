import { graphqlClient } from '@codelab/shared/infra/gql-client'

import { getSdk } from './prop.api.graphql.api.gen'

export const propApi = getSdk(graphqlClient)

export const propServerActions = () => import('./prop.api.graphql.web.gen')
