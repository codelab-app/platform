import type { Label } from '@codelab/frontend/test/cypress/shared'

export const getListItem = (label: Label) => {
  return cy.contains('.ant-list-item', label)
}
