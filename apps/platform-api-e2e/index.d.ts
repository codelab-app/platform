import { CypressCodelabUICommands } from '@codelab/testing/cypress/codelab'
import { CypressDatabaseCommands } from '@codelab/testing/cypress/command'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable<Subject>
      extends CypressCodelabUICommands,
        CypressDatabaseCommands {}
  }
}
