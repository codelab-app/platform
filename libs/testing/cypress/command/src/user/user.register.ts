import type { CypressCommand } from '../command.interface'
import { getCurrentUser } from './user'

export interface CypressUserCommands {
  getCurrentUser: typeof getCurrentUser
}

export const userCommands: Array<CypressCommand> = [
  { fn: getCurrentUser, name: 'getCurrentUser' },
]
