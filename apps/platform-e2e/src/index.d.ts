import { CypressUtilsCommands } from '@codelab/frontend/test/cypress/utils'

declare global {
  namespace Cypress {
    interface Chainable<Subject> extends CypressUtilsCommands {}
  }
}
