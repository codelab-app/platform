import type { CypressAuth0Commands } from '@codelab/testing/cypress/command'
import type { CypressNextjsAuth0Commands } from '@codelab/testing/cypress/nextjs-auth0'
import type { CypressBuilderCommands } from './builder'
import type { CypressDatabaseCommands } from './database'
import type { CypressUICommands } from './entities'
import type { CypressHelpersCommands } from './helpers'
import type { CypressNextjsAuth0Commands } from './nextjs-auth0/nextjs-auth0.register'
import type { CypressTextEditorCommands } from './text-editor/text-editor.register'

/**
 * Merges with @testing-library/cypress, need to follow their global declare
 */
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable<Subject>
      extends CypressDatabaseCommands,
        CypressBuilderCommands,
        CypressNextjsAuth0Commands,
        CypressUICommands,
        CypressAuth0Commands,
        CypressTextEditorCommands,
        CypressHelpersCommands {}
  }
}
