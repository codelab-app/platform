import type { CypressAuth0Commands } from './auth0'
import type { CypressBuilderCommands } from './builder'
import type { CypressDatabaseCommands } from './database'
import type { CypressUICommands } from './entities'
import type { CypressHelpersCommands } from './helpers'
import type { CypressNextjsAuth0Commands } from './nextjs-auth0/nextjs-auth0.register'

export interface CypressCommand {
  name: keyof Cypress.Chainable<any>
  options?: Cypress.CommandOptions & { prevSubject: false }
  fn: any
}

/**
 * Merges with @testing-library/cypress, need to follow their global declare
 */
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable<Subject>
      extends CypressDatabaseCommands,
        CypressBuilderCommands,
        CypressNextjsAuth0Commands,
        CypressUICommands,
        CypressAuth0Commands,
        CypressHelpersCommands {}
  }
}
