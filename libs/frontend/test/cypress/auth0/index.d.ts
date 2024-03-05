import { CypressAuth0Commands } from './src/auth0.command'
import { CypressUtilsCommands } from '@codelab/frontend/test/cypress/utils'

// Need this for IDE typing
import type cypress from 'cypress'

declare global {
  namespace Cypress {
    interface Chainable<Subject>
      extends CypressAuth0Commands,
        CypressUtilsCommands {}
  }
}
