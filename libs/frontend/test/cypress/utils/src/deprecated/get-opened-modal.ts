import { domClasses } from '../utils/dom-classes'
import type { CypressElement } from '../utils/types'
import { wrapSubject } from '../utils/utils'

export const getOpenedModal = (
  subject?: any,
  options?: Parameters<typeof cy.get>[1],
): CypressElement => wrapSubject(subject).get(domClasses.modal, options)
