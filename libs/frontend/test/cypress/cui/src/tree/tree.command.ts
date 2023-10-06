<<<<<<< HEAD
<<<<<<<< HEAD:libs/frontend/test/cypress/cui/src/tree/tree.command.ts
import { CY_DATA_SELECTOR } from '@codelab/frontend/application/shared/data'
import type { CypressElement } from '@codelab/frontend/test/cypress/utils'
========
import { CY_DATA_SELECTOR } from '@codelab/frontend/abstract/testing'
import type { CypressElement } from '@codelab/frontend/test/cypress/command'
>>>>>>>> e4701781d (wip: update project tags):libs/frontend/test/cypress/codelab/src/tree/tree.command.ts
=======
import { CY_DATA_SELECTOR } from '@codelab/frontend/application/shared/data'
import type { CypressElement } from '@codelab/frontend/test/cypress/utils'
<<<<<<<< HEAD:libs/frontend/test/cypress/codelab/src/tree/tree.command.ts
import { CY_DATA_SELECTOR } from '@codelab/frontend/application/shared/data'
========
>>>>>>>> eb2460d7a (ci: fix cypress after upgrade):libs/frontend/test/cypress/cui/src/tree/tree.command.ts
>>>>>>> eb2460d7a (ci: fix cypress after upgrade)
import type { Maybe } from '@codelab/shared/abstract/types'

export const getCuiTreeItem = () => {
  cy.log('getCuiTreeItem')

  return cy.get(CY_DATA_SELECTOR.cuiTreeItem(), { log: false })
}

export const getCuiTreeItemByPrimaryTitle = (
  subject: Maybe<CypressElement>,
  primaryTitle: string,
) => {
  cy.log('getCuiTreeItemByPrimaryTitle', primaryTitle)

  return subject
    ? cy
        .wrap(subject)
        .find(CY_DATA_SELECTOR.cuiTreeItemPrimaryTitle(primaryTitle), {
          log: false,
        })
    : cy.get(CY_DATA_SELECTOR.cuiTreeItemPrimaryTitle(primaryTitle), {
        log: false,
      })
}

export const getCuiTreeItemBySecondaryTitle = (
  subject: Maybe<CypressElement>,
  secondaryTitle: string,
) => {
  cy.log('getCuiTreeItemBySecondaryTitle')

  return subject
    ? cy
        .wrap(subject)
        .find(CY_DATA_SELECTOR.cuiTreeItemSecondaryTitle(secondaryTitle), {
          log: false,
        })
    : cy.get(CY_DATA_SELECTOR.cuiTreeItemSecondaryTitle(secondaryTitle), {
        log: false,
      })
}

export const getCuiTreeItemToolbar = (subject: Maybe<CypressElement>) => {
  cy.log('getCuiTreeItemToolbar')

  return cy
    .wrap(subject)
    .closest(CY_DATA_SELECTOR.cuiTreeItem(), { log: false })
    .find(CY_DATA_SELECTOR.cuiTreeItemToolbar(), { log: false })
}
