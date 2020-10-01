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

export const findInputByLabel = (
  text: Matcher,
  options?: SelectorMatcherOptions,
): Cypress.Chainable<JQuery> => {
  return cy
    .findByText(text, { exact: true, timeout: 7000, ...options })
    .invoke('attr', 'for')
    .then((idOfInput) => {
      return cy.get(`#${idOfInput}`)
    })
}

Cypress.Commands.add('findInputByLabel', findInputByLabel)

export const openSelectByLabel = (
  text: Matcher,
  options?: SelectorMatcherOptions,
): Cypress.Chainable<JQuery> => {
  return findInputByLabel(text, options).closest('.ant-select').click()
}

Cypress.Commands.add('openSelectByLabel', openSelectByLabel)

export const getSelectDropdownByLabel = (
  text: Matcher,
  options?: SelectorMatcherOptions,
): Cypress.Chainable<JQuery> => {
  // NOTE: the list appears in DOM only after first
  return findInputByLabel(text, options)
    .invoke('attr', 'aria-owns')
    .then((optionsListId) => cy.get(`#${optionsListId}`))
    .closest('.ant-select-dropdown')
}

Cypress.Commands.add('getSelectDropdownByLabel', getSelectDropdownByLabel)

export const getSelectedOptionByLabel = (
  text: Matcher,
  options?: SelectorMatcherOptions,
): Cypress.Chainable<JQuery> => {
  // NOTE: the list appears in DOM only after first
  return findInputByLabel(text, options)
    .closest('.ant-select-selector')
    .find('.ant-select-selection-item')
}

Cypress.Commands.add('getSelectedOptionByLabel', getSelectedOptionByLabel)
