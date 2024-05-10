import { graphqlClient } from '@codelab/backend/infra/adapter/graphql'
import { getSdk } from './domain.subscription.graphql.gen'

export const domainApi = getSdk(graphqlClient)
