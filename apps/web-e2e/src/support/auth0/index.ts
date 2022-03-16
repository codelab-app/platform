type CyElement = Cypress.Chainable<Element>

export interface CypressAuth0Commands {
  // Copied from https://github.com/sir-dunxalot/cypress-nextjs-auth0/blob/main/types/index.d.ts
  // declaration merging not working
  /**
   * Logs in a user with the given credentials (via Cypress.env)
   * or overwrite the credentials with new credentials.
   */
  login(options?: { username?: string; password?: string }): CyElement

  /**
   * Logs the logged in user out. One can add a custom returnTo URL.
   */
  logout(returnTo?: string): CyElement

  /**
   * Clears all existing (splitted or not) Auth0 cookies
   *
   * ## Docs
   * @see https://docs.cypress.io/api/commands/clearcookie
   * @see https://docs.cypress.io/api/commands/clearcookies
   */
  clearAuth0Cookies(): CyElement

  /**
   * Preserves cookies through multiple tests. It's best used in the
   * `beforeEach` hook.
   *
   * ## Docs
   * @see https://docs.cypress.io/api/cypress-api/cookies#Preserve-Once
   */
  preserveAuth0Cookies(): CyElement
}
