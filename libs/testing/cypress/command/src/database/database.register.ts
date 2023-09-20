import type { CypressCommand } from '../command.interface'
import { resetDatabase, resetDatabaseExceptForUserAndAtom } from './database'

export interface CypressDatabaseCommands {
  resetDatabase: typeof resetDatabase
  resetDatabaseExceptForUserAndAtom: typeof resetDatabaseExceptForUserAndAtom
}

export const databaseCommands: Array<CypressCommand> = [
  {
    fn: resetDatabaseExceptForUserAndAtom,
    name: 'resetDatabaseExceptForUserAndAtom',
  },
  {
    fn: resetDatabase,
    name: 'resetDatabase',
  },
]
