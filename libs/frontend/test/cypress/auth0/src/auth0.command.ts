import type { CypressCommand } from '@codelab/frontend/test/cypress/shared'
import { loginAndSetupE2eData } from './login/login-and-setup-e2e-data'
import { loginToAuth0 } from './login/login-via-auth0-ui'

export interface CypressAuth0Commands {
  // loginAndSetupE2eData: typeof loginAndSetupE2eData
  loginToAuth0: typeof loginToAuth0
}

export const auth0Commands: Array<CypressCommand> = [
  {
    fn: loginToAuth0,
    name: 'loginToAuth0',
  },
  // {
  //   fn: loginAndSetupE2eData,
  //   name: 'loginAndSetupE2eData',
  // },
]
