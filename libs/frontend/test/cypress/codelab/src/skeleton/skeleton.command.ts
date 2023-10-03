import { CY_DATA_SELECTOR } from '@codelab/frontend/application/shared/data'

export const getCuiSkeleton = () => {
  cy.log('getCuiSkeleton')

  return cy.get(CY_DATA_SELECTOR.cuiSkeleton(), { log: false })
}
