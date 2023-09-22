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
        .find(`[data-cy="codelabui-toolbar-item-${title}"]`, { log: false })
    : cy.get(`[data-cy="codelabui-toolbar-item-${title}"]`, { log: false })
}
