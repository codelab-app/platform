import { CY_DATA_SELECTOR } from '@codelab/frontend/abstract/testing'

export const getCuiSkeleton = () => {
  cy.log('getCuiSkeleton')

  return cy.get(CY_DATA_SELECTOR.cuiSkeleton(), { log: false })
}
