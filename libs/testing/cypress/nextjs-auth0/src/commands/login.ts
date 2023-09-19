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
    },
    {
      cacheAcrossSpecs: false,
      validate: () => {
        // cy.get('@upsertUser.all').should('not.have.length', 0)
      },
    },
  )

  cy.request({
    method: 'POST',
    timeout: 10000,
    url: '/api/data/user/setup-e2e',
  })
}

export const login = ({
  password = Cypress.env('auth0Password'),
  username = Cypress.env('auth0Username'),
}: LoginCredentials = {}) => {
  /* https://github.com/auth0/nextjs-auth0/blob/master/src/handlers/login.ts#L70 */

  try {
    return cy.getUserTokens({ password, username }).then((response: any) => {
      const { accessToken, expiresIn, idToken, scope } = response

      return cy.getUserInfo(accessToken).then((user) => {
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
          cy.setCookie('access_token', accessToken)
          cy.setCookie('id_token', idToken)
          cy.setCookie('user', JSON.stringify(user))
          cy._setAuth0Cookie(encryptedSession as string)
        })

        return Promise.resolve({ accessToken, user })
      })
    })
  } catch (error) {
    console.error(error)
    throw new Error()
  }
}
