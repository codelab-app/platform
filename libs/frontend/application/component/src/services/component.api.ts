import { graphqlClient } from '@codelab/frontend/infra/graphql'
import { getSdk } from '../graphql/component.endpoints.graphql.gen'

export const componentApi = getSdk(graphqlClient)
