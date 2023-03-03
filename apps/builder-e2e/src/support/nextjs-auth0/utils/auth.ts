import auth0 from 'auth0-js'

const auth = new auth0.WebAuth({
  clientID: Cypress.env('auth0ClientId'),
  domain: Cypress.env('auth0Domain'),
})

export default auth
