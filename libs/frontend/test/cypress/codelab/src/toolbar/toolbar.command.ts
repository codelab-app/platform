<<<<<<< HEAD
<<<<<<<< HEAD:libs/frontend/test/cypress/cui/src/toolbar/toolbar.command.ts
import { CY_DATA_SELECTOR } from '@codelab/frontend/application/shared/data'
import type { CypressElement } from '@codelab/frontend/test/cypress/utils'
========
import { CY_DATA_SELECTOR } from '@codelab/frontend/abstract/testing'
=======
import { CY_DATA_SELECTOR } from '@codelab/frontend/application/shared/data'
>>>>>>> 6a8128374 (wip: separate interface to application & domain layer)
import type { CypressElement } from '@codelab/frontend/test/cypress/command'
>>>>>>>> e4701781d (wip: update project tags):libs/frontend/test/cypress/codelab/src/toolbar/toolbar.command.ts
import type { Maybe } from '@codelab/shared/abstract/types'

export const getCuiToolbarItem = (
  subject: Maybe<CypressElement>,
  title: string,
) => {
  cy.log('getCuiToolbarItem', title)

  // Check if a subject exists (i.e., the command is chained)
  // https://stackoverflow.com/questions/58833459/cypresserror-timed-out-retrying-cy-click-failed-because-this-element-is-deta
  return subject
    ? cy
        .wrap(subject)
        .find(CY_DATA_SELECTOR.cuiToolbarItem(title), { log: false })
    : cy.get(CY_DATA_SELECTOR.cuiToolbarItem(title), { log: false })
}
