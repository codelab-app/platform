<<<<<<< HEAD
=======
/* eslint-disable @typescript-eslint/naming-convention */
import type {
  _clearAuth0Cookie,
  _clearAuth0SplittedCookies,
  clearAuth0Cookies,
} from './commands/clear-auth0-cookie'
import type { getUserInfo } from './commands/get-user-info'
import type { getUserTokens } from './commands/get-user-tokens'
import type { login } from './commands/login'
import type { logout } from './commands/logout'
import type { _setAuth0Cookie } from './commands/set-auth0-cookie'
>>>>>>> eb2460d7a (ci: fix cypress after upgrade)
import type { loginToAuth0 } from './official/login-vai-auth0-ui'

declare global {
  namespace Cypress {
    interface Chainable<Subject> extends CypressNextjsAuth0Commands {}
  }
}

export interface CypressNextjsAuth0Commands {
<<<<<<< HEAD
  loginToAuth0: typeof loginToAuth0
=======
  // clear-auth0-cookie
  _clearAuth0Cookie: typeof _clearAuth0Cookie
  _clearAuth0SplittedCookies: typeof _clearAuth0SplittedCookies
  // preserve-auth0-cookies-once
  // preserveAuth0CookiesOnce: typeof preserveAuth0CookiesOnce
  // encrypt: typeof encrypt
  // set-auth0-cookie
  _setAuth0Cookie: typeof _setAuth0Cookie
  clearAuth0Cookies: typeof clearAuth0Cookies
  // get-user-info
  getUserInfo: typeof getUserInfo
  // get-user-token
  getUserTokens: typeof getUserTokens
  // login
  login: typeof login
  loginToAuth0: typeof loginToAuth0
  // logout
  logout: typeof logout
>>>>>>> eb2460d7a (ci: fix cypress after upgrade)
}
