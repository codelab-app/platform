import Cookie from 'js-cookie'
import { isServer } from './env'

export const AUTH_TOKEN_COOKIE = 'AUTH_JWT'

/**
 * @deprecated Used by Apollo link
 */
export const getAuthToken = () => {
  if (isServer) {
    return null
  }

  return Cookie.get(AUTH_TOKEN_COOKIE)
}

// export const storeAuthToken = (authToken: string) => {
//   if (isServer) {
//     return
//   }
//
//   Cookie.set(AUTH_TOKEN_COOKIE, authToken, {
//     sameSite: 'strict',
//   })
// }
//
// export const clearAuthToken = () => {
//   if (isServer) {
//     return
//   }
//
//   Cookie.remove(AUTH_TOKEN_COOKIE)
// }
