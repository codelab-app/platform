import type { CypressElement } from '../../deprecated/types'
import { wrapSubject } from '../../deprecated/utils'
import type { Label } from '../types'

interface ButtonSelector {
  icon?: string
  label?: Label
}

export const getButton = (
  subject: any,
  { icon, label }: ButtonSelector,
  options?: Partial<
    Cypress.CaseMatchable &
      Cypress.Loggable &
      Cypress.Shadow &
      Cypress.Timeoutable
  >,
): CypressElement => {
  // Cypress.log({
  //   displayName: 'Get Button',
  //   // message: name,
  //   name: 'Add new board',
  // })

  if (icon) {
    return subject
      ? cy
          .wrap(subject)
          .find(`button.ant-btn .anticon.anticon-${icon}`)
          .closest('button.ant-btn')
      : cy
          .get(`button.ant-btn .anticon.anticon-${icon}`)
          .closest('button.ant-btn')
  }

  if (label) {
    return wrapSubject(subject).contains('button.ant-btn', label, options)
  }

  throw new Error(
    'Button not found, must only specify either "label" or "icon"',
  )
}
