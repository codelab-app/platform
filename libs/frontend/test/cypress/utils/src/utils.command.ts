import type { CypressCommand } from '@codelab/frontend/test/cypress/shared'
import { apiCommands } from './api/api.register'
import { databaseCommands } from './database/database.register'
import { graphQLCommands } from './graphql/graphql.register'
import { textEditorCommands } from './text-editor/text-editor.register'
import { userCommands } from './user/user.register'

export const utilsCommands: Array<CypressCommand> = [
  ...apiCommands,
  ...textEditorCommands,
  ...databaseCommands,
  ...graphQLCommands,
  ...userCommands,
]
