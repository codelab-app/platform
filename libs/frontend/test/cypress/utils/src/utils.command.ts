import type { CypressCommand } from '@codelab/frontend/test/cypress/shared'
import type { ApiCommands } from './api/api.register'
import { apiCommands } from './api/api.register'
import type { DatabaseCommands } from './database/database.register'
import { databaseCommands } from './database/database.register'
import { selectorCommands, type SelectorsCommands } from './deprecated'
import type { TextEditorCommands } from './text-editor/text-editor.register'
import { textEditorCommands } from './text-editor/text-editor.register'
import type { UserCommands } from './user/user.register'
import { userCommands } from './user/user.register'

export type CypressUtilsCommands = ApiCommands &
  DatabaseCommands &
  SelectorsCommands &
  TextEditorCommands &
  UserCommands

export const utilsCommands: Array<CypressCommand> = [
  ...apiCommands,
  ...textEditorCommands,
  ...databaseCommands,
  ...userCommands,
  ...selectorCommands,
]
