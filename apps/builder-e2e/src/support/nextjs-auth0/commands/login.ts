/* eslint-disable @typescript-eslint/no-floating-promises */
let cachedUsername: string

interface LoginCredentials {
  username?: string
  password?: string
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
      cy.wait('@upsertUser')
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
  username = Cypress.env('auth0Username'),
  password = Cypress.env('auth0Password'),
}: LoginCredentials = {}) => {
  /* https://github.com/auth0/nextjs-auth0/blob/master/src/handlers/login.ts#L70 */

  try {
    cy.getUserTokens({ username, password }).then((response: any) => {
      const { accessToken, expiresIn, idToken, scope } = response

      cy.getUserInfo(accessToken).then((user) => {
        /* https://github.com/auth0/nextjs-auth0/blob/master/src/handlers/callback.ts#L44 */
        /* https://github.com/auth0/nextjs-auth0/blob/master/src/handlers/callback.ts#L47 */
        /* https://github.com/auth0/nextjs-auth0/blob/master/src/session/cookie-store/index.ts#L57 */

        const payload = {
          secret: Cypress.env('auth0CookieSecret'),
          user,
          idToken,
          accessToken,
          accessTokenScope: scope,
          accessTokenExpiresAt: Date.now() + expiresIn,
          createdAt: Date.now(),
        }

        console.log(payload)

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
