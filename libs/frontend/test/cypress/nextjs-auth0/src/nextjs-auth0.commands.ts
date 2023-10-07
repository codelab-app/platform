<<<<<<< HEAD
<<<<<<< HEAD
import type { CypressCommand } from '@codelab/frontend/test/cypress/shared'
=======
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
>>>>>>> eb2460d7a (ci: fix cypress after upgrade)
=======
import type { CypressCommand } from '@codelab/frontend/test/cypress/shared'
>>>>>>> 9419b16fe (ci: change cypress auth0)
import { loginToAuth0 } from './official/login-vai-auth0-ui'

export const nextjsAuth0Commands: Array<CypressCommand> = [
  {
<<<<<<< HEAD
    fn: loginToAuth0,
    name: 'loginToAuth0',
  },
  {
=======
>>>>>>> 9419b16fe (ci: change cypress auth0)
    fn: loginToAuth0,
    name: 'loginToAuth0',
  },
]
