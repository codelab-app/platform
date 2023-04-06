import { webAuth } from '../utils/auth'

const defaultCredentials = {
  password: Cypress.env('auth0Password'),
  username: Cypress.env('auth0Username'),
}

export const getUserTokens = (credentials = defaultCredentials) => {
  const { password, username } = credentials

  return new Cypress.Promise((resolve, reject) => {
    webAuth.client.loginWithDefaultDirectory(
      {
        audience: Cypress.env('auth0Audience'),
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
