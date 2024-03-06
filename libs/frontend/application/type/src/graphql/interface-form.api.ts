import { graphqlClient } from '@codelab/frontend/infra/graphql'
import { getSdk } from './interface-form.endpoints.graphql.gen'

export const interfaceFormApi = getSdk(graphqlClient)
