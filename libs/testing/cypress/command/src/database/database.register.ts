import type { CypressCommand } from '../command.interface'
import { resetDatabaseExceptForUserAndAtom } from './database'

export interface CypressDatabaseCommands {
  resetDatabaseExceptForUserAndAtom: typeof resetDatabaseExceptForUserAndAtom
}

export const databaseCommands: Array<CypressCommand> = [
  {
    fn: resetDatabaseExceptForUserAndAtom,
    name: 'resetDatabaseExceptForUserAndAtom',
  },
]
