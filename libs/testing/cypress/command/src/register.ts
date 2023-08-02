import type { CypressCommand } from './command.interface'
import type { CypressDatabaseCommands } from './database/database.register'
import type { CypressSelectorsCommands } from './deprecated'
import type { CypressGraphQLCommands } from './graphql/graphql.register'
import type { CypressUserCommands } from './user/user.register'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable<Subject>
      extends CypressSelectorsCommands,
        CypressUserCommands,
        CypressGraphQLCommands,
        CypressDatabaseCommands {}
  }
}

export const registerCommands = (commands: Array<CypressCommand>) => {
  for (const cmd of commands) {
    cmd.options
      ? Cypress.Commands.add(cmd.name, cmd.options, cmd.fn)
      : Cypress.Commands.add(cmd.name, cmd.fn)
  }
}
