import { SelectorMatcherOptions } from '@testing-library/cypress'
import { Matcher } from '@testing-library/dom'
import * as JQuery from 'jquery'
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

/**
 * Merges with @testing-library/cypress, need to follow their global declare
 */
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
const login = (email: string, password: string) => {
  console.log('Custom command example: Login', email, password)
}
//
// -- This is a parent command --

Cypress.Commands.add('login', login)

export const findByButtonText = (
  text: Matcher,
  options?: SelectorMatcherOptions,
): Cypress.Chainable<JQuery<HTMLButtonElement>> => {
  return cy
    .findByText(text, { exact: true, timeout: 5000, ...options })
    .closest('button')
}

Cypress.Commands.add('findByButtonText', findByButtonText)

export const findByModalTitle = (
  text: Matcher,
  options?: SelectorMatcherOptions,
): Cypress.Chainable<JQuery<HTMLElement>> => {
  return cy
    .findByText(text, { exact: true, timeout: 5000, ...options })
    .closest('.ant-modal-wrap ')
}

Cypress.Commands.add('findByModalTitle', findByModalTitle)

export const openSelectByLabel = (
  text: Matcher,
  options?: SelectorMatcherOptions,
): Cypress.Chainable<JQuery<HTMLElement>> => {
  return cy.findByLabelText(text, options).closest('.ant-select').click()
}

Cypress.Commands.add('openSelectByLabel', openSelectByLabel)

export const getSelectDropdown = () => {
  // NOTE: the list appears in DOM only after first
  return cy.get('.ant-select-dropdown:not(.ant-select-dropdown-hidden)')
}

Cypress.Commands.add('getSelectDropdown', getSelectDropdown)

export const getSelectedOptionByLabel = (
  text: Matcher,
  options?: SelectorMatcherOptions,
): Cypress.Chainable<JQuery<HTMLElement>> => {
  // NOTE: the list appears in DOM only after first
  return cy
    .findByLabelText(text, options)
    .closest('.ant-select-selector')
    .find('.ant-select-selection-item')
}

Cypress.Commands.add('getSelectedOptionByLabel', getSelectedOptionByLabel)

export const getSelectOptionsContent = (): Cypress.Chainable<
  JQuery<HTMLElement>
> => {
  // NOTE: the list appears in DOM only after first
  return getSelectDropdown().find('.ant-select-item-option-content')
}

Cypress.Commands.add('getSelectOptionsContent', getSelectOptionsContent)

export const getSelectOptionItemByValue = (
  value: Matcher,
): Cypress.Chainable<JQuery<HTMLElement>> => {
  return cy
    .getSelectDropdown()
    .find('.rc-virtual-list')
    .findByText(value)
    .closest('.ant-select-item')
}

Cypress.Commands.add('getSelectOptionItemByValue', getSelectOptionItemByValue)
