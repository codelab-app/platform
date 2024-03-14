import { CY_DATA, wrapCyData } from '@codelab/frontend/application/shared/data'

export const getCuiHeader = () => {
  cy.log('getCuiHeader')

  return cy.get(wrapCyData(CY_DATA.cuiHeader()), { log: false })
}
