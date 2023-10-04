import type { CypressCommand } from '@codelab/frontend/test/cypress/utils'
import {
  _clearAuth0Cookie,
  _clearAuth0SplittedCookies,
  clearAuth0Cookies,
} from './commands/clear-auth0-cookie'
import { getUserInfo } from './commands/get-user-info'
import { getUserTokens } from './commands/get-user-tokens'
import { login } from './commands/login'
import { logout } from './commands/logout'
import { _setAuth0Cookie } from './commands/set-auth0-cookie'
import { loginToAuth0 } from './official/login-vai-auth0-ui'

export const nextjsAuth0Commands: Array<CypressCommand> = [
  {
    fn: _clearAuth0Cookie,
    name: '_clearAuth0Cookie',
  },
  {
    fn: _clearAuth0SplittedCookies,
    name: '_clearAuth0SplittedCookies',
  },
  {
    fn: clearAuth0Cookies,
    name: 'clearAuth0Cookies',
  },
  {
    fn: getUserInfo,
    name: 'getUserInfo',
  },
  {
    fn: getUserTokens,
    name: 'getUserTokens',
  },
  {
    fn: login,
    name: 'login',
  },
  {
    fn: logout,
    name: 'logout',
  },
  // {
  //   name: 'preserveAuth0CookiesOnce',
  //   fn: preserveAuth0CookiesOnce,
  // },
  // {
  //   name: 'encrypt',
  //   fn: encrypt,
  // },
  {
    fn: _setAuth0Cookie,
    name: '_setAuth0Cookie',
  },
  {
    fn: loginToAuth0,
    name: 'loginToAuth0',
  },
]