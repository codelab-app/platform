import auth0 from 'auth0-js'

export const webAuth = new auth0.WebAuth({
  clientID: Cypress.env('auth0ClientId'),
  domain: Cypress.env('auth0Domain'),
})

export const auth = new auth0.Authentication({
  clientID: Cypress.env('auth0ClientId'),
  domain: Cypress.env('auth0Domain'),
})
