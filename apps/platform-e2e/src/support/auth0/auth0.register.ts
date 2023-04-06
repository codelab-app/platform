import type { CypressCommand } from '../types'
import { loginByAuth0Api, loginToAuth0 } from './auth0.command'

export interface CypressAuth0Commands {
  loginByAuth0Api: typeof loginByAuth0Api
  loginToAuth0: typeof loginToAuth0
}

export const auth0Commands: Array<CypressCommand> = [
  {
    fn: loginByAuth0Api,
    name: 'loginByAuth0Api',
  },
  { fn: loginToAuth0, name: 'loginToAuth0' },
]
