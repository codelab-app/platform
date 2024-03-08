import type { CypressCommand } from '@codelab/frontend/test/cypress/shared'
import type { ApiCommands } from './api/api.register'
import { apiCommands } from './api/api.register'
import type { DatabaseCommands } from './database/database.register'
import { databaseCommands } from './database/database.register'
import { selectorCommands, type SelectorsCommands } from './deprecated'
import type { GraphQLCommands } from './graphql/graphql.register'
import { graphQLCommands } from './graphql/graphql.register'
import type { MiscCommands } from './misc/misc.commands'
import { miscCommands } from './misc/misc.commands'
import type { TextEditorCommands } from './text-editor/text-editor.register'
import { textEditorCommands } from './text-editor/text-editor.register'
import type { UserCommands } from './user/user.register'
import { userCommands } from './user/user.register'

export type CypressUtilsCommands = ApiCommands &
  DatabaseCommands &
  GraphQLCommands &
  MiscCommands &
  SelectorsCommands &
  TextEditorCommands &
  UserCommands

export const utilsCommands: Array<CypressCommand> = [
  ...apiCommands,
  ...miscCommands,
  ...textEditorCommands,
  ...databaseCommands,
  ...graphQLCommands,
  ...userCommands,
  ...selectorCommands,
]
