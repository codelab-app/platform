import { CY_DATA_SELECTOR } from '@codelab/frontend/abstract/testing'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { CypressElement } from '@codelab/testing/cypress/command'

export const getCuiToolbarItem = (
  subject: Maybe<CypressElement>,
  title: string,
) => {
  cy.log('getCuiToolbarItem', title)

  // Check if a subject exists (i.e., the command is chained)
  return subject
    ? cy
        .wrap(subject)
        .find(CY_DATA_SELECTOR.cuiToolbarItem(title), { log: false })
    : cy.get(CY_DATA_SELECTOR.cuiToolbarItem(title), { log: false })
}
