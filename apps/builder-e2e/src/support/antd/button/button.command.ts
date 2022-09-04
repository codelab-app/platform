import { CypressElement } from '../../deprecated/types'
import { wrapSubject } from '../../deprecated/utils'
import { Label } from '../types'

interface ButtonSelector {
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
  // Cypress.log({
  //   displayName: 'Get Button',
  //   // message: name,
  //   name: 'Add new board',
  // })

  if (icon) {
    console.log(subject)

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
