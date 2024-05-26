import type { ModelActionKey } from '@codelab/frontend/abstract/types'
import type { CypressElement } from '@codelab/frontend/test/cypress/utils'
import { CY_DATA } from '@codelab/frontend-application-shared-data'
import type { Maybe } from '@codelab/shared/abstract/types'

export const getCuiToolbarItem = (
  subject: Maybe<CypressElement>,
  key: ModelActionKey,
) => {
  Cypress.log({ message: key, name: 'getCuiToolbarItem' })

  // Check if a subject exists (i.e., the command is chained)
  // https://stackoverflow.com/questions/58833459/cypresserror-timed-out-retrying-cy-click-failed-because-this-element-is-deta
  return subject
    ? cy
        .wrap(subject, { log: false })
        .find(CY_DATA.cuiToolbarItem(key).cySelector, { log: true })
    : cy.get(CY_DATA.cuiToolbarItem(key).cySelector, { log: true })
}
