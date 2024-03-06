import type { CypressAntdCommands } from './src'

// Need this for IDE typing
import type cypress from 'cypress'

declare global {
  namespace Cypress {
    interface Chainable<Subject> extends CypressAntdCommands {}
  }
}
