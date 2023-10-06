import * as jwt from 'jsonwebtoken'

const loginByAuth0Api = (username: string, password: string) => {
  cy.log(`Logging in as ${username}`)

  const client_id = Cypress.env('auth0_client_id')
  const client_secret = Cypress.env('auth0_client_secret')
  const audience = Cypress.env('auth0_audience')
  const scope = Cypress.env('auth0_scope')

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
    url: `https://${Cypress.env('auth0_domain')}/oauth/token`,
  }).then(({ body }) => {
    const claims = jwt.decode(body.id_token)

    const {
      email,
      email_verified,
      exp,
      name,
      nickname,
      picture,
      sub,
      updated_at,
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

    cy.visit('/')
  })
}
