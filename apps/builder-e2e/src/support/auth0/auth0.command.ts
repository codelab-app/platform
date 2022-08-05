import jwt_decode from 'jwt-decode'

export const loginByAuth0Api = () => {
  const username = Cypress.env('auth0Username')
  const password = Cypress.env('auth0Password')

  cy.log(`Logging in as ${username}`)

  const client_id = Cypress.env('auth0ClientId')
  const client_secret = Cypress.env('auth0ClientSecret')
  const audience = Cypress.env('auth0Audience')
  const scope = Cypress.env('auth0Scope')

  // console.log(new URL('oauth/token', Cypress.env('auth0_domain')).href)

  cy.request({
    method: 'POST',
    url: `${Cypress.env('auth0Domain')}oauth/token`,
    body: {
      grant_type: 'password',
      username,
      password,
      audience,
      scope,
      client_id,
      client_secret,
    },
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
          claims,
          user: {
            nickname,
            name,
            picture,
            updated_at,
            email,
            email_verified,
            sub,
          },
          audience,
          client_id,
        },
      },
      expiresAt: exp,
    }

    window.localStorage.setItem('auth0Cypress', JSON.stringify(item))

    cy.visit('/')
  })
}
