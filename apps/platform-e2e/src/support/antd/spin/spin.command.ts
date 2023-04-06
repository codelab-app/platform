import { domClasses } from '../../deprecated/domClasses'
import type { CypressElement } from '../../deprecated/types'

export const getSpinner = (subject: any): CypressElement =>
  subject
    ? cy.wrap(subject).find(domClasses.spinner)
    : cy.get(domClasses.spinner)
