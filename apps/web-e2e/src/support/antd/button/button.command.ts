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
    return wrapSubject(subject)
      .find(`button.ant-btn .anticon.anticon-${icon}`)
      .closest('button.ant-btn')
  }

  if (label) {
    return wrapSubject(subject).contains('button.ant-btn', label, options)
  }

  throw new Error(
    'Button not found, must only specify either "label" or "icon"',
  )
}
