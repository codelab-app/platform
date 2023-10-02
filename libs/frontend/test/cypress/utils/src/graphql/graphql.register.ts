import type { CypressCommand } from '@codelab/frontend/test/cypress/shared'
import {
  graphqlRequest,
  interceptGraphQL,
  waitForApiCalls,
} from './graphql.commands'

export interface CypressGraphQLCommands {
  graphqlRequest: typeof graphqlRequest
  interceptGraphQL: typeof interceptGraphQL
  waitForApiCalls: typeof waitForApiCalls
}

export const graphQLCommands: Array<CypressCommand> = [
  { fn: interceptGraphQL, name: 'interceptGraphQL' },
  { fn: graphqlRequest, name: 'graphqlRequest' },
  { fn: waitForApiCalls, name: 'waitForApiCalls' },
]