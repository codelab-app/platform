import { CY_DATA_SELECTOR } from '@codelab/frontend/application/shared/data'

export const getCuiHeader = () => {
  cy.log('getCuiHeader')

  return cy.get(CY_DATA_SELECTOR.cuiHeader(), { log: false })
}
