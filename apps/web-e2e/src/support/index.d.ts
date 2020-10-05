import {
  findByButtonText,
  findByModalTitle,
  getSelectDropdownByLabel,
  openSelectByLabel,
  getSelectedOptionByLabel,
  getSelectOptionsContentByLabel,
} from './commands'

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      login(email: string, password: string): void
      findByButtonText: typeof findByButtonText
      findByModalTitle: typeof findByModalTitle
      getSelectDropdownByLabel: typeof getSelectDropdownByLabel
      openSelectByLabel: typeof openSelectByLabel
      getSelectedOptionByLabel: typeof getSelectedOptionByLabel
      getSelectOptionsContentByLabel: typeof getSelectOptionsContentByLabel
    }
  }
}
