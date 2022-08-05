import { CypressElement } from '../../deprecated/types'
import { wrapSubject } from '../../deprecated/utils'

export const getIcon = (
  subject: any,
  name: string,
  options?: Partial<
    Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow
  >,
): CypressElement => {
  return wrapSubject(subject).find(`.anticon-${name}`, options)
}
