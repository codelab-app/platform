import type { Auth0IdToken } from '@codelab/shared/abstract/core'
import { webAuth } from '../utils/auth'

export const getUserInfo = (accessToken: string) => {
  return new Promise<Auth0IdToken>((resolve, reject) => {
    webAuth.client.userInfo(accessToken, (err: unknown, user: unknown) => {
      if (err) {
        reject(err)
      }

      resolve(user as Auth0IdToken)
    })
  })
}
