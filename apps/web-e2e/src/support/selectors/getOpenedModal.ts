import { domClasses } from './domClasses'
import { CypressElement } from './types'
import { wrapSubject } from './utils'

export const getOpenedModal = (
  subject: any,
  options?: Parameters<typeof cy.get>[1],
): CypressElement => wrapSubject(subject).get(domClasses.modal, options)
