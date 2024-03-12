import type { ModelActionKey } from '@codelab/frontend/abstract/types'
import { CY_DATA_SELECTOR } from '@codelab/frontend/application/shared/data'

export const getCuiPopover = (key: ModelActionKey) => {
  Cypress.log({ message: key, name: 'getCuiPopover' })

  return cy.get(CY_DATA_SELECTOR.cuiPopover(key), {
    log: false,
  })
}
