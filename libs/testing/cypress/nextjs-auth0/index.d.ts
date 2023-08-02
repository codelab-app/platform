import type { CypressNextjsAuth0Commands } from './src/register'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable<Subject> extends CypressNextjsAuth0Commands {}
  }
}
