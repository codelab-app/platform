import { SelectorMatcherOptions } from '@testing-library/cypress'
import { Matcher } from '@testing-library/dom'
import '@testing-library/cypress/add-commands'

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
// eslint-disable-next-line @typescript-eslint/no-namespace

//
// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
  console.log('Custom command example: Login', email, password)
})
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

export const findByButtonText = (
  text: Matcher,
  options?: SelectorMatcherOptions,
): Cypress.Chainable<JQuery> => {
  return cy
    .findByText(text, { exact: true, timeout: 7000, ...options })
    .closest('button')
}

Cypress.Commands.add('findByButtonText', findByButtonText)

export const findByModalTitle = (
  text: Matcher,
  options?: SelectorMatcherOptions,
): Cypress.Chainable<JQuery> => {
  return cy
    .findByText(text, { exact: true, timeout: 7000, ...options })
    .closest('.ant-modal-wrap ')
}

Cypress.Commands.add('findByModalTitle', findByModalTitle)

export const openSelectByLabel = (
  text: Matcher,
  options?: SelectorMatcherOptions,
): Cypress.Chainable<JQuery> => {
  return cy.findByLabelText(text, options).closest('.ant-select').click()
}

Cypress.Commands.add('openSelectByLabel', openSelectByLabel)

export const getSelectDropdown = (): Cypress.Chainable<JQuery> => {
  // NOTE: the list appears in DOM only after first
  return cy.get('.ant-select-dropdown:not(.ant-select-dropdown-hidden)')
}
Cypress.Commands.add('getSelectDropdown', getSelectDropdown)

export const getSelectedOptionByLabel = (
  text: Matcher,
  options?: SelectorMatcherOptions,
): Cypress.Chainable<JQuery> => {
  // NOTE: the list appears in DOM only after first
  return cy
    .findByLabelText(text, options)
    .closest('.ant-select-selector')
    .find('.ant-select-selection-item')
}

Cypress.Commands.add('getSelectedOptionByLabel', getSelectedOptionByLabel)

export const getSelectOptionsContent = (): Cypress.Chainable<JQuery> => {
  // NOTE: the list appears in DOM only after first
  return getSelectDropdown().find('.ant-select-item-option-content')
}

Cypress.Commands.add('getSelectOptionsContent', getSelectOptionsContent)

export const getSelectOptionItemByValue = (
  value: Matcher,
): Cypress.Chainable<JQuery> => {
  return cy
    .getSelectDropdown()
    .find('.rc-virtual-list')
    .findByText(value)
    .closest('.ant-select-item')
}

Cypress.Commands.add('getSelectOptionItemByValue', getSelectOptionItemByValue)
