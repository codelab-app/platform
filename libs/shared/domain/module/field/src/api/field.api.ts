import { graphqlClient } from '@codelab/shared/infra/gql-client'

import { getSdk } from './field.api.graphql.api.gen'

export const fieldApi = () => getSdk(graphqlClient)

export const fieldServerActions = () => import('./field.api.graphql.web.gen')
