import type { CypressCommand } from '../utils/command.interface'
import { getCurrentUser } from './user.command'

export interface CypressUserCommands {
  getCurrentUser: typeof getCurrentUser
}

export const userCommands: Array<CypressCommand> = [
  { fn: getCurrentUser, name: 'getCurrentUser' },
]
