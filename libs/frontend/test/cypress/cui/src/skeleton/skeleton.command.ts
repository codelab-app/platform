import { CY_DATA } from '@codelab/frontend-application-shared-data/cy-data'

export const getCuiSkeleton = () => {
  Cypress.log({ name: 'getCuiSkeleton' })

  return cy.get(CY_DATA.cuiSkeleton().cySelector, { log: false })
}
