import type { ModelActionKey } from '@codelab/frontend/abstract/types'
import { CY_DATA } from '@codelab/frontend/application/shared/data'

export const getCuiForm = (key: ModelActionKey) => {
  Cypress.log({
    message: key,
    name: 'getCuiForm',
  })

  return cy.get(wrapCyData(CY_DATA.cuiForm(key)))
}
