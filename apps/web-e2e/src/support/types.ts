import '@testing-library/cypress/add-commands'
import { CypressAuth0Commands } from './auth0'
import { CypressDatabaseCommands } from './database'
import { CypressUICommands } from './entities'
import { CypressHelpersCommands } from './helpers'

export type CypressCommand = {
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
        CypressUICommands,
        CypressAuth0Commands,
        // CypressSelectorsCommands,
        CypressHelpersCommands {}
  }
}
