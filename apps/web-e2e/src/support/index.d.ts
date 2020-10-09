import {
  findByButtonText,
  findByModalTitle,
  openSelectByLabel,
  getSelectedOptionByLabel,
  getSelectOptionsContent,
  getSelectDropdown,
  getSelectOptionItemByValue,
} from './commands'

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      login(email: string, password: string): void
      findByButtonText: typeof findByButtonText
      findByModalTitle: typeof findByModalTitle
      openSelectByLabel: typeof openSelectByLabel
      getSelectedOptionByLabel: typeof getSelectedOptionByLabel
      getSelectOptionsContent: typeof getSelectOptionsContent
      getSelectDropdown: typeof getSelectDropdown
      getSelectOptionItemByValue: typeof getSelectOptionItemByValue
    }
  }
}
