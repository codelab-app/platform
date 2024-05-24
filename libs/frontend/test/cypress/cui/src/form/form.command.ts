import type { ModelActionKey } from '@codelab/frontend/abstract/types'
import { CY_DATA } from '@codelab/frontend-application-shared-data/cy-data'

export const getCuiForm = (key: ModelActionKey) => {
  Cypress.log({
    message: key,
    name: 'getCuiForm',
  })

  return cy.get(CY_DATA.cuiForm(key).cySelector, { log: false, timeout: 20000 })
}
