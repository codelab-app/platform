import { CypressElement } from '../../selectors/types'
import { wrapSubject } from '../../selectors/utils'
import { Label } from '../types'

type ButtonSelector = {
  label?: Label
  icon?: string
}

export const getButton = (
  subject: any,
  { label, icon }: ButtonSelector,
  options?: Partial<
    Cypress.Loggable &
      Cypress.Timeoutable &
      Cypress.CaseMatchable &
      Cypress.Shadow
  >,
): CypressElement => {
  if (icon) {
    return wrapSubject(subject).find(`.ant-btn .anticon.anticon-${icon}`)
  }

  if (label) {
    return wrapSubject(subject).contains('.ant-btn', label, options)
  }

  throw new Error(
    'Button not found, must only specify either "label" or "icon"',
  )
}
