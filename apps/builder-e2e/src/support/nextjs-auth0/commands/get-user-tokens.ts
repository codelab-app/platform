import auth from '../utils/auth'

const defaultCredentials = {
  password: Cypress.env('auth0Password'),
  username: Cypress.env('auth0Username'),
}

export const getUserTokens = (credentials = defaultCredentials) => {
  const { username, password } = credentials

  return new Cypress.Promise((resolve, reject) => {
    auth.client.loginWithDefaultDirectory(
      {
        audience: Cypress.env('auth0Audience'),
        client_secret: Cypress.env('auth0ClientSecret'),
        password,
        scope: Cypress.env('auth0Scope'),
        username,
      },
      (err: unknown, response: unknown) => {
        if (err) {
          reject(err)
        } else {
          resolve(response)
        }
      },
    )
  })
}
