import type { CypressApiCommands } from './api/api.register'
import type { CypressDatabaseCommands } from './database/database.register'
import type { CypressSelectorsCommands } from './deprecated'
import type { CypressGraphQLCommands } from './graphql/graphql.register'
import type { CypressUserCommands } from './user/user.register'

declare global {
  namespace Cypress {
    interface Chainable<Subject>
      extends CypressSelectorsCommands,
        CypressApiCommands,
        CypressUserCommands,
        CypressGraphQLCommands,
        CypressDatabaseCommands {}
  }
}
