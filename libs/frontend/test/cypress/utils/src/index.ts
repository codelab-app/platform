import type cypress from 'cypress'
/* eslint-disable @typescript-eslint/no-namespace */
import type { CypressApiCommands } from './api/api.register'
import type { CypressDatabaseCommands } from './database/database.register'
import type { CypressSelectorsCommands } from './deprecated'
import type { CypressGraphQLCommands } from './graphql/graphql.register'
import type { CypressTextEditorCommands } from './text-editor/text-editor.register'
import type { CypressUserCommands } from './user/user.register'

// Dummy declaration so eslint doesn't remove
type C = typeof cypress

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

export * from './deprecated'
export * from './utils.command'
