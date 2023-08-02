import type { CypressCommand } from '../command.interface'
import { getCurrentOwner } from './user'

export interface CypressUserCommands {
  getCurrentOwner: typeof getCurrentOwner
}

export const userCommands: Array<CypressCommand> = [
  { fn: getCurrentOwner, name: 'getCurrentOwner' },
]
