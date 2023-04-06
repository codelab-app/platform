import type { CypressCommand } from '../types'
import { resetDatabase } from './admin'
import { getCurrentOwner } from './user'

export interface CypressDatabaseCommands {
  getCurrentOwner: typeof getCurrentOwner

  /** admin model */
  resetDatabase: typeof resetDatabase
}

export const databaseCommands: Array<CypressCommand> = [
  { fn: resetDatabase, name: 'resetDatabase' },
  { fn: getCurrentOwner, name: 'getCurrentOwner' },
]
