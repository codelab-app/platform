/* eslint-disable @typescript-eslint/no-floating-promises */

interface LoginCredentials {
  password?: string
  username?: string
}

export const loginSession = () => {
  cy.session(
    ['auth0-session'],
    () => {
      login()
      // Needs to visit the page where the user data will get upserted
      // so that there will be no forbidden errors when doing mutations
      // because the roles are needed
      cy.visit('/apps')
      cy.getSpinner().should('not.exist')
      cy.intercept('GET', '/api/upsert-user').as('upsertUser')
      cy.wait('@upsertUser', { timeout: 10000 })
    },
    {
      cacheAcrossSpecs: true,
      validate: () => {
        cy.get('@upsertUser.all').should('not.have.length', 0)
      },
    },
  )
}

export const login = ({
  password = Cypress.env('auth0Password'),
  username = Cypress.env('auth0Username'),
}: LoginCredentials = {}) => {
  /* https://github.com/auth0/nextjs-auth0/blob/master/src/handlers/login.ts#L70 */

  try {
    cy.getUserTokens({ password, username }).then((response: any) => {
      const { accessToken, expiresIn, idToken, scope } = response

      cy.getUserInfo(accessToken).then((user) => {
        /* https://github.com/auth0/nextjs-auth0/blob/master/src/handlers/callback.ts#L44 */
        /* https://github.com/auth0/nextjs-auth0/blob/master/src/handlers/callback.ts#L47 */
        /* https://github.com/auth0/nextjs-auth0/blob/master/src/session/cookie-store/index.ts#L57 */

        const payload = {
          accessToken,
          accessTokenExpiresAt: Date.now() + expiresIn,
          accessTokenScope: scope,
          createdAt: Date.now(),
          idToken,
          secret: Cypress.env('auth0CookieSecret'),
          user,
        }

        /* https://github.com/auth0/nextjs-auth0/blob/master/src/session/cookie-store/index.ts#L73 */
        cy.task('encrypt', payload).then((encryptedSession) => {
          cy._setAuth0Cookie(encryptedSession as string)
        })
      })
    })
  } catch (error) {
    // throw new Error(error);
  }
}
