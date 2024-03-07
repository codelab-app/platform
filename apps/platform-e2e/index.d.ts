import { CypressUtilsCommands } from '@codelab/frontend/test/cypress/utils'
import { CypressAntdCommands } from '@codelab/frontend/test/cypress/antd'
import { CypressAuth0Commands } from '@codelab/frontend/test/cypress/auth0'
import { CypressCuiCommands } from '@codelab/frontend/test/cypress/cui'

declare global {
  namespace Cypress {
    interface Chainable<Subject>
      extends CypressAntdCommands,
        CypressUtilsCommands,
        CypressAuth0Commands,
        CypressCuiCommands {}
  }
}
