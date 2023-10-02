import type { CypressCommand } from '@codelab/frontend/test/cypress/shared'
import {
  resetDatabase,
  resetDatabaseExceptForUserAndAtom,
} from './database.command'

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