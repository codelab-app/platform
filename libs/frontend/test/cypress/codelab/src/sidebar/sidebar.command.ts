<<<<<<< HEAD
<<<<<<<< HEAD:libs/frontend/test/cypress/cui/src/sidebar/sidebar.command.ts
import { CY_DATA_SELECTOR } from '@codelab/frontend/application/shared/data'
import type { CypressElement } from '@codelab/frontend/test/cypress/utils'
========
import { CY_DATA_SELECTOR } from '@codelab/frontend/abstract/testing'
=======
import { CY_DATA_SELECTOR } from '@codelab/frontend/application/shared/data'
>>>>>>> 6a8128374 (wip: separate interface to application & domain layer)
import type { CypressElement } from '@codelab/frontend/test/cypress/command'
>>>>>>>> e4701781d (wip: update project tags):libs/frontend/test/cypress/codelab/src/sidebar/sidebar.command.ts
import type { Maybe } from '@codelab/shared/abstract/types'

export const getCuiSidebar = (label: string) => {
  cy.log('getCuiSidebar', label)

  return cy.get(CY_DATA_SELECTOR.cuiSidebar(label), { log: false })
}

export const getCuiSidebarViewHeader = (label: string) => {
  cy.log('getCuiSidebarViewHeader', label)

  return cy.get(CY_DATA_SELECTOR.cuiSidebarViewHeader(label), {
    log: false,
  })
}

export const getCuiSidebarViewContent = (label: string) => {
  cy.log('getCuiSidebarViewContent', label)

  return cy.get(CY_DATA_SELECTOR.cuiSidebarViewContent(label), {
    log: false,
  })
}

export const getCuiSidebarHeader = (subject: Maybe<CypressElement>) => {
  cy.log('getCuiSidebarHeader')

  return subject
    ? cy.wrap(subject).find(CY_DATA_SELECTOR.cuiSidebarHeader(), {
        log: false,
      })
    : cy.get(CY_DATA_SELECTOR.cuiSidebarHeader(), {
        log: false,
      })
}
