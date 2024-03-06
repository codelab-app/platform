import { graphqlClient } from '@codelab/frontend/infra/graphql'
import { getSdk } from './field.endpoints.graphql.gen'

export const fieldApi = getSdk(graphqlClient)
