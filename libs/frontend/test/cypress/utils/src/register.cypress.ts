import type { CypressCommand } from '@codelab/frontend/test/cypress/shared'
import type { CypressApiCommands } from './api/api.register'
import { apiCommands } from './api/api.register'
import type { CypressDatabaseCommands } from './database/database.register'
import { databaseCommands } from './database/database.register'
import type { CypressSelectorsCommands } from './deprecated'
import type { CypressGraphQLCommands } from './graphql/graphql.register'
import { graphQLCommands } from './graphql/graphql.register'
import type { CypressTextEditorCommands } from './text-editor/text-editor.register'
import { textEditorCommands } from './text-editor/text-editor.register'
import type { CypressUserCommands } from './user/user.register'
import { userCommands } from './user/user.register'

declare global {
  namespace Cypress {
    interface Chainable<Subject>
      extends CypressSelectorsCommands,
        CypressApiCommands,
        CypressUserCommands,
        CypressGraphQLCommands,
        CypressDatabaseCommands,
        CypressTextEditorCommands {}
  }
}

export const utilsCommands: Array<CypressCommand> = [
  ...apiCommands,
  ...textEditorCommands,
  ...databaseCommands,
  ...graphQLCommands,
  ...userCommands,
]
