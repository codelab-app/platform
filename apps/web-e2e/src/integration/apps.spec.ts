import { DeleteUserAppsGql } from '@codelab/dgraph'
import { print } from 'graphql'

const createApp = (appName: string) =>
  cy.createApp({
    name: appName,
  })

describe('Apps CRUD', () => {
  before(() => {
    cy.clearCookies()
    cy.login()

    // delete all apps for current user
    cy.getCurrentUserId().then((userId) => {
      cy.dGraphGraphqlRequest({
        query: print(DeleteUserAppsGql),
        variables: {
          userId,
        },
      })
    })
    cy.visit('/apps')
  })

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('appSession')
    cy.getSpinner().should('not.exist')
  })

  describe('create', () => {
    it('should be able to cancel app creation', () => {
      cy.findByButtonText(/create app/i).click()

      cy.findByLabelText('Name').type('some test input')

      cy.getOpenedModal().findByButtonText('Cancel').click()
      cy.findByButtonText(/create app/i).click()

      cy.getOpenedModal()
        .findByLabelText('Name')
        .invoke('val')
        .should('equal', '')

      // close modal
      cy.getOpenedModal().findByButtonText('Cancel').click()
      cy.getOpenedModal().should('not.exist')
    })

    it('should be able to create app', () => {
      const appName = 'new gorgeous app'
      // check that we don't have app with test-name
      cy.findAllByText(appName, { exact: true, timeout: 0 }).should('not.exist')

      // open creation form
      cy.findByButtonText(/create app/i).click()

      cy.getOpenedModal().findByLabelText('Name').type(appName)
      cy.getOpenedModal()
        .findByButtonText(/create app/i)
        .click()

      cy.getOpenedModal().should('not.exist')
      cy.findByText(appName).should('exist')
    })
  })

  describe('update', () => {
    const appName = 'app for update'
    before(() => {
      createApp(appName)
      cy.visit('/apps')
    })

    const updatedAppName = 'updated app'

    it('should be able to update app name', () => {
      cy.findSettingsButtonByAppName(appName).click()
      cy.getOpenedDropdownMenu().findByText('Edit').click()

      cy.getOpenedModal().findByLabelText('Name').clear().type(updatedAppName)
      cy.getSpinner().should('not.exist')
      cy.getOpenedModal()
        .findByButtonText(/update app/i)
        .click()

      cy.getOpenedModal().should('not.exist')
      cy.findByText(appName).should('not.exist')
      cy.findByText(updatedAppName).should('exist')
    })
  })

  describe('delete', () => {
    const appName = 'app for delete'

    before(() => {
      createApp(appName)
      cy.visit('/apps')
    })

    it('should be able to delete app', () => {
      cy.findSettingsButtonByAppName(appName).click()
      cy.getOpenedDropdownMenu().findByText('Delete').click()

      cy.getSpinner().should('not.exist')
      cy.getOpenedModal()
        .findByButtonText(/delete app/i)
        .click()

      cy.findAllByText(appName).should('not.exist')
    })
  })
})
