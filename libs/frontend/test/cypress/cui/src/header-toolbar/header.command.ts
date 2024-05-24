import { CY_DATA } from '@codelab/frontend-application-shared-data/cy-data'

export const getCuiHeader = () => {
  cy.log('getCuiHeader')

  return cy.get(CY_DATA.cuiHeader().cySelector, { log: false })
}
