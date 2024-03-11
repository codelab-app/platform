import { CY_DATA_SELECTOR } from '@codelab/frontend/application/shared/data'
import type { CypressElement } from '@codelab/frontend/test/cypress/utils'
import type { Maybe } from '@codelab/shared/abstract/types'

export const getCuiToolbarItem = (
  subject: Maybe<CypressElement>,
  title: string,
) => {
  Cypress.log({ message: title, name: 'getCuiToolbarItem' })

  // Check if a subject exists (i.e., the command is chained)
  // https://stackoverflow.com/questions/58833459/cypresserror-timed-out-retrying-cy-click-failed-because-this-element-is-deta
  return subject
    ? cy
        .wrap(subject, { log: false })
        .find(CY_DATA_SELECTOR.cuiToolbarItem(title), { log: false })
    : cy.get(CY_DATA_SELECTOR.cuiToolbarItem(title), { log: false })
}
