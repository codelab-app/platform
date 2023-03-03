import jwt_decode from 'jwt-decode'

const username = Cypress.env('auth0Username')
const password = Cypress.env('auth0Password')

export const loginByAuth0Api = () => {
  cy.log(`Logging in as ${username}`)

  const client_id = Cypress.env('auth0ClientId')
  const client_secret = Cypress.env('auth0ClientSecret')
  const audience = Cypress.env('auth0Audience')
  const scope = Cypress.env('auth0Scope')

  // console.log(new URL('oauth/token', Cypress.env('auth0_domain')).href)

  cy.session(`auth0-${username}`, () => {
    /**
     * https://auth0.com/docs/api/authentication#get-token
     */
    cy.request({
      body: {
        audience,
        client_id,
        client_secret,
        grant_type: 'password',
        password,
        scope,
        username,
      },
      method: 'POST',
      url: `${Cypress.env('auth0Domain')}oauth/token`,
    }).then(({ body }) => {
      const claims = jwt_decode<any>(body.id_token)

      const {
        nickname,
        name,
        picture,
        updated_at,
        email,
        email_verified,
        sub,
        exp,
      } = claims

      const item = {
        body: {
          ...body,
          decodedToken: {
            audience,
            claims,
            client_id,
            user: {
              email,
              email_verified,
              name,
              nickname,
              picture,
              sub,
              updated_at,
            },
          },
        },
        expiresAt: exp,
      }

      window.localStorage.setItem('auth0Cypress', JSON.stringify(item))

      console.log(item)
    })

    cy.visit('/apps')
  })
}

export const loginToAuth0 = () => {
  const log = Cypress.log({
    autoEnd: false,
    displayName: 'AUTH0 LOGIN',
    message: [`🔐 Authenticating | ${username}`],
  })

  log.snapshot('before')

  // loginViaAuth0Ui()

  cy.session(
    `auth0-${username}`,
    () => {
      loginViaAuth0Ui()
    },
    {
      validate: () => {
        cy.getCookies()
        // Validate presence of access token in localStorage.
        // cy.wrap(localStorage)
        //   .invoke('getItem', 'authAccessToken')
        //   .should('exist')
      },
    },
  )

  log.snapshot('after')
  log.end()
}

export const loginViaAuth0Ui = () => {
  // App landing page redirects to Auth0.
  cy.visit('/apps')

  // const origin = 'http://127.0.0.1:3001'
  const origin = 'https://codelab-app-dev.us.auth0.com/'

  // cy.origin(origin, () => {
  //   cy.get('input#username').type('cypress@codelab.app')
  //   cy.get('input#password').type('Qd8Y4mxNYepVhU', { log: false })
  //   cy.contains('button[value=default]', 'Continue').click()
  // })

  cy.get('input#username').type(username)
  cy.get('input#password').type(password, { log: false })
  cy.contains('button[value=default]', 'Continue').click()

  // Ensure Auth0 has redirected us back to the RWA.
  cy.url().should('equal', '/apps')
}
