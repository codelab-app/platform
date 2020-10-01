import {
  findByButtonText,
  findByModalTitle,
  findInputByLabel,
  getSelectDropdownByLabel,
  openSelectByLabel,
  getSelectedOptionByLabel,
} from './commands'

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      login(email: string, password: string): void
      findByButtonText: typeof findByButtonText
      findByModalTitle: typeof findByModalTitle
      findInputByLabel: typeof findInputByLabel
      getSelectDropdownByLabel: typeof getSelectDropdownByLabel
      openSelectByLabel: typeof openSelectByLabel
      getSelectedOptionByLabel: typeof getSelectedOptionByLabel
    }
  }
}
