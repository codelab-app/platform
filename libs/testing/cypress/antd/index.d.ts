import { CypressAuth0Commands } from './src'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable<Subject> extends CypressAuth0Commands {}
  }
}
