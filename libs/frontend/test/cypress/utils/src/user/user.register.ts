import type { CypressCommand } from '@codelab/frontend/test/cypress/shared'
import { getCurrentUser } from './user.command'

export interface UserCommands {
  getCurrentUser: typeof getCurrentUser
}

export const userCommands: Array<CypressCommand> = [{ fn: getCurrentUser }]
