import type { CypressCommand } from '../command.interface'
import { resetDatabase } from './database'

export interface CypressDatabaseCommands {
  resetDatabase: typeof resetDatabase
}

export const databaseCommands: Array<CypressCommand> = [
  { fn: resetDatabase, name: 'resetDatabase' },
]
