import { chooseSelectDropdownOption } from '../form/form.commands'
import { logAndMute } from '../utils'

export const selectPageSize = (
  size: number | string,
  options?: Partial<Cypress.Loggable>,
) => {
  const opts = logAndMute('selectPageSize', size.toString(), options)
  cy.get('.ant-pagination-options-size-changer', opts).click(opts)
  chooseSelectDropdownOption(`${size} / page`, opts)
}

export const selectPage = (
  page: number | string,
  options?: Partial<Cypress.Loggable>,
) => {
  const opts = logAndMute('selectPage', page.toString(), options)
  cy.contains('.ant-pagination-item', page, opts).click(opts)
}

export const selectPrevPage = (options?: Partial<Cypress.Loggable>) => {
  const opts = logAndMute('selectPrevPage', '', options)
  cy.get('.ant-pagination-prev', opts).click(opts)
}

export const selectNextPage = (options?: Partial<Cypress.Loggable>) => {
  const opts = logAndMute('selectNextPage', '', options)
  cy.get('.ant-pagination-next', opts).click(opts)
}
