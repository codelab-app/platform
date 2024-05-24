import type { ModelActionKey } from '@codelab/frontend/abstract/types'
import { CY_DATA } from '@codelab/frontend-application-shared-data/cy-data'

export const getCuiPopover = (key: ModelActionKey) => {
  Cypress.log({ message: key, name: 'getCuiPopover' })

  return cy.get(CY_DATA.cuiPopover(key).cySelector, {
    log: false,
  })
}
