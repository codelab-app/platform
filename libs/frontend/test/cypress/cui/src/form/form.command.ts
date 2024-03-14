import type { ModelActionKey } from '@codelab/frontend/abstract/types'
import { CY_DATA_SELECTOR } from '@codelab/frontend/application/shared/data'

export const getCuiForm = (key: ModelActionKey) => {
  Cypress.log({
    message: key,
    name: 'getCuiForm',
  })

  return cy.get(CY_DATA_SELECTOR.cuiForm(key))
}
