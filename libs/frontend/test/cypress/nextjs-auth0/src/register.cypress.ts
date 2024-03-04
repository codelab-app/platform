import type { loginToAuth0 } from './official/login-via-auth0-ui'

declare global {
  namespace Cypress {
    interface Chainable<Subject> extends CypressNextjsAuth0Commands {}
  }
}

export interface CypressNextjsAuth0Commands {
  loginToAuth0: typeof loginToAuth0
}
