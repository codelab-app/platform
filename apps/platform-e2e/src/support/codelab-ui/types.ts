import type { CypressAuth0Commands } from '../auth0'
import type { CodelabUIHeaderToolbarCommands } from './header-toolbar'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable<Subject>
      extends CodelabUIHeaderToolbarCommands,
        CypressAuth0Commands {}
  }
}
