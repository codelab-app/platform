import auth from '../utils/auth'

export const getUserInfo = (accessToken: string) => {
  return new Cypress.Promise((resolve, reject) => {
    auth.client.userInfo(accessToken, (err: unknown, user: unknown) => {
      if (err) {
        reject(err)
      }

      resolve(user)
    })
  })
}
