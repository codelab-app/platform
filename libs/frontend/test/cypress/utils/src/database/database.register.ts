import type { CypressCommand } from '@codelab/frontend/test/cypress/shared'
import {
  resetDatabase,
  resetDatabaseExceptForUserAndAtom,
} from './database.command'

export interface DatabaseCommands {
  resetDatabase: typeof resetDatabase
  resetDatabaseExceptForUserAndAtom: typeof resetDatabaseExceptForUserAndAtom
}

export const databaseCommands: Array<CypressCommand> = [
  {
    fn: resetDatabaseExceptForUserAndAtom,
  },
  {
    fn: resetDatabase,
  },
]
