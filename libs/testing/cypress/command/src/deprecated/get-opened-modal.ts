import { domClasses } from './dom-classes'
import type { CypressElement } from './types'
import { wrapSubject } from './utils'

export const getOpenedModal = (
  subject?: any,
  options?: Parameters<typeof cy.get>[1],
): CypressElement => wrapSubject(subject).get(domClasses.modal, options)
