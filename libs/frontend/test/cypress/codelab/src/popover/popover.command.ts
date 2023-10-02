import { CY_DATA_SELECTOR } from '@codelab/frontend/abstract/testing'

export const getCuiPopover = (title: string) => {
  cy.log('getCuiPopover', title)

  return cy.get(CY_DATA_SELECTOR.cuiPopover(title), {
    log: false,
  })
}
