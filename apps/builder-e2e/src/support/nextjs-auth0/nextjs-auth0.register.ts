import type { CypressCommand } from '../types'
import {
  _clearAuth0Cookie,
  _clearAuth0SplittedCookies,
  clearAuth0Cookies,
} from './commands/clear-auth0-cookie'
import { getUserInfo } from './commands/get-user-info'
import { getUserTokens } from './commands/get-user-tokens'
import { login } from './commands/login'
import { logout } from './commands/logout'
// import { preserveAuth0CookiesOnce } from './commands/preserve-auth0-cookies-once'
import { _setAuth0Cookie } from './commands/set-auth0-cookie'

export interface CypressNextjsAuth0Commands {
  // clear-auth0-cookie
  _clearAuth0Cookie: typeof _clearAuth0Cookie
  _clearAuth0SplittedCookies: typeof _clearAuth0SplittedCookies
  clearAuth0Cookies: typeof clearAuth0Cookies

  // get-user-info
  getUserInfo: typeof getUserInfo

  // get-user-token
  getUserTokens: typeof getUserTokens

  // login
  login: typeof login

  // logout
  logout: typeof logout

  // preserve-auth0-cookies-once
  // preserveAuth0CookiesOnce: typeof preserveAuth0CookiesOnce
  // encrypt: typeof encrypt

  // set-auth0-cookie
  _setAuth0Cookie: typeof _setAuth0Cookie
}

export const nextjsAuth0Commands: Array<CypressCommand> = [
  {
    name: '_clearAuth0Cookie',
    fn: _clearAuth0Cookie,
  },
  {
    name: '_clearAuth0SplittedCookies',
    fn: _clearAuth0SplittedCookies,
  },
  {
    name: 'clearAuth0Cookies',
    fn: clearAuth0Cookies,
  },
  {
    name: 'getUserInfo',
    fn: getUserInfo,
  },
  {
    name: 'getUserTokens',
    fn: getUserTokens,
  },
  {
    name: 'login',
    fn: login,
  },
  {
    name: 'logout',
    fn: logout,
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
    name: '_setAuth0Cookie',
    fn: _setAuth0Cookie,
  },
]
