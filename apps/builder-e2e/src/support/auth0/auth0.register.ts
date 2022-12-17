import type { CypressCommand } from '../types'
import { loginByAuth0Api } from './auth0.command'

export interface Auth0Commands {
  loginByAuth0Api: typeof loginByAuth0Api
}

export const auth0Commands: Array<CypressCommand> = [
  {
    name: 'loginByAuth0Api',
    fn: loginByAuth0Api,
  },
]
