import type { Session } from '@auth0/nextjs-auth0'
import type { TokenEndpointResponse } from '@auth0/nextjs-auth0/dist/auth0-session'

interface LoginCredentials {
  password?: string
  username?: string
}

export const loginAndSetupData = () => {
  cy.session(
    ['auth0-session'],
    () => {
      cy.loginToAuth0(
        Cypress.env('auth0Username'),
        Cypress.env('auth0Password'),
      )
      // login()
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
  //
  // return cy.postApiRequest('/api/data/admin/setup-e2e')
  // return cy.postApiRequest('/api/login-session', {
  //   password: Cypress.env('auth0Password'),
  //   username: Cypress.env('auth0Username'),
  // })
}

export const login = ({
  password = Cypress.env('auth0Password'),
  username = Cypress.env('auth0Username'),
}: LoginCredentials = {}) => {
  /* https://github.com/auth0/nextjs-auth0/blob/master/src/handlers/login.ts#L70 */

  try {
    return cy.getUserTokens({ password, username }).then((response: any) => {
      const {
        accessToken,
        expiresIn,
        idToken,
        refreshToken,
        scope,
        tokenType,
      } = response

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

        const tokenEndpointResponse: TokenEndpointResponse = {
          access_token: accessToken,
          expires_in: expiresIn,
          id_token: idToken,
          refresh_token: refreshToken,
          scope,
          secret: Cypress.env('auth0CookieSecret'),
          token_type: tokenType,
          user,
        }

        /* https://github.com/auth0/nextjs-auth0/blob/master/src/session/cookie-store/index.ts#L73 */

        // cy.setCookie('access_token', accessToken)
        // cy.setCookie('id_token', idToken)
        // cy.setCookie('payload', JSON.stringify(payload))

        // return generateSessionCookie(payload, {
        //   secret: Cypress.env('auth0CookieSecret'),
        // }).then((appSession) => {
        //   console.log(appSession)
        //   cy.setCookie('appSession', appSession)

        //   return Promise.resolve(payload)
        // })
        // sessionCache.create(req, res, mySession)
        cy.task('sessionFromToken', tokenEndpointResponse).then((session) => {
          console.log('session', session)
          cy.setCookie('app_session', JSON.stringify(session))
          // cy.setCookie('access_token', accessToken)
          // cy.setCookie('id_token', idToken)
        })

        // cy.task('encrypt', payload).then((encryptedSession) => {
        //   // cy.setCookie('access_token', accessToken)
        //   // cy.setCookie('id_token', idToken)
        //   // cy._setAuth0Cookie(encryptedSession as string)
        // })
      })
    })
  } catch (error) {
    console.error(error)
    throw new Error()
  }
}
