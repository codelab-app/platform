import type { Label } from '../types'

export const getListItem = (label: Label) => {
  return cy.contains('.ant-list-item', label)
}
