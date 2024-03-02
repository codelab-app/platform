import type { CypressBuilderCommands } from './builder/builder.register'
import type { CypressMobxCommands } from './mobx/mobx.register'
import type { CypressTagCommands } from './tags/tag.register'

declare global {
  namespace Cypress {
    interface Chainable<Subject>
      extends CypressTagCommands,
        CypressBuilderCommands,
        CypressMobxCommands {}
  }
}
