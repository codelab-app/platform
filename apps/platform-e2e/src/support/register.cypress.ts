import type { CypressBuilderCommands } from './builder/builder.register'
import type { CypressTagCommands } from './tags/tag.register'
import type { CypressTextEditorCommands } from './text-editor/text-editor.register'

/**
 * Merges with @testing-library/cypress, need to follow their global declare
 */
declare global {
  namespace Cypress {
    interface Chainable<Subject>
      extends CypressBuilderCommands,
        CypressTagCommands,
        CypressTextEditorCommands {}
  }
}
