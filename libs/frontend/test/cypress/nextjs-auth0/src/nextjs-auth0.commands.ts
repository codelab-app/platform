import type { CypressCommand } from '@codelab/frontend/test/cypress/shared'
import { loginToAuth0 } from './official/login-vai-auth0-ui'

export const nextjsAuth0Commands: Array<CypressCommand> = [
  {
    fn: loginToAuth0,
    name: 'loginToAuth0',
  }
]
