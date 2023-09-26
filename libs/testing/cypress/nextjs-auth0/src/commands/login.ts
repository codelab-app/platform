/* eslint-disable @typescript-eslint/no-floating-promises */
import type { Session } from '@auth0/nextjs-auth0'
import { generateSessionCookie } from '@auth0/nextjs-auth0/testing'
import { auth0Instance } from '@codelab/frontend/infra/auth0'

interface LoginCredentials {
  password?: string
  username?: string
}

export const loginAndSetupData = () => {
  cy.session(
    ['auth0-session-1'],
    () => {
      login()
    },
    {
      cacheAcrossSpecs: true,
      validate: () => {
        // cy.get('@upsertUser.all').should('not.have.length', 0)
      },
    },
  )

  /**
   * Reset database, seed user & react fragment
   */
  return cy.postApiRequest('/api/data/user/setup-e2e')
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

        const payload: Session = {
          accessToken,
          accessTokenExpiresAt: Date.now() + expiresIn,
          accessTokenScope: scope,
          createdAt: Date.now(),
          idToken,
          secret: Cypress.env('auth0CookieSecret'),
          user,
        }

        /* https://github.com/auth0/nextjs-auth0/blob/master/src/session/cookie-store/index.ts#L73 */

        cy.setCookie('access_token', accessToken)
        cy.setCookie('id_token', idToken)
        // cy.setCookie('payload', JSON.stringify(payload))

        // return generateSessionCookie(payload, {
        //   secret: Cypress.env('auth0CookieSecret'),
        // }).then((appSession) => {
        //   console.log(appSession)
        //   cy.setCookie('appSession', appSession)

        //   return Promise.resolve(payload)
        // })

        cy.task('encrypt', payload).then((encryptedSession) => {
          cy._setAuth0Cookie(encryptedSession as string)
          console.log(encryptedSession)
        })
      })
    })
  } catch (error) {
    console.error(error)
    throw new Error()
  }
}
