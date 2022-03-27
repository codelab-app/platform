import { Label } from '../types'

export const getListItem = (label: Label) => {
  return cy.contains('.ant-list-item', label).closest('.ant-list')
}
