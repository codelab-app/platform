import type { CypressCommand } from '@codelab/frontend/test/cypress/shared'
import { graphqlRequest, waitForApiCalls } from './graphql.commands'

export interface GraphQLCommands {
  graphqlRequest: typeof graphqlRequest
  waitForApiCalls: typeof waitForApiCalls
}

export const graphQLCommands: Array<CypressCommand> = [
  { fn: graphqlRequest },
  { fn: waitForApiCalls },
]
