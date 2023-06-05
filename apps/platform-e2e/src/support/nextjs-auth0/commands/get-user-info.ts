import { webAuth } from '../utils/auth'

export const getUserInfo = (accessToken: string) => {
  return new Cypress.Promise((resolve, reject) => {
    webAuth.client.userInfo(accessToken, (err: unknown, user: unknown) => {
      if (err) {
        console.error(err)
        reject(err)
      }

      resolve(user)
    })
  })
}
