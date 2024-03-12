import type { Label } from '@codelab/frontend/test/cypress/shared'
import type { CypressElement } from '@codelab/frontend/test/cypress/utils'
import { wrapSubject } from '@codelab/frontend/test/cypress/utils'

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
  Cypress.log({
    displayName: 'get Button',
    // message: name,
  })

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
