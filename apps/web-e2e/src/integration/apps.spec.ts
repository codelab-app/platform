import { gql } from '@apollo/client'
import { print } from 'graphql'

const createApp = (appName: string) =>
  cy.createApp({
    name: appName,
    pages: {
      data: [
        {
          name: 'Test Page',
        },
      ],
    },
  })
export const DeleteAppsByUserGql = gql`
  mutation DeleteUserApps($userId: String!) {
    delete_app(where: { user_id: { _eq: $userId } }) {
      affected_rows
    }
  }
`
describe('Apps CRUD', () => {
  before(() => {
    cy.login()
    // delete all apps afor current user
    cy.getCurrentUserId().then((userId) => {
      cy.hasuraAdminRequest({
        query: print(DeleteAppsByUserGql),
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

  describe('create usecase', () => {
    it('should be able to cancel app creation', () => {
      cy.findByButtonText('Create App').click()

      cy.findByLabelText('Name').type('some test input')

      cy.getOpenedModal().findByButtonText('Cancel').click()
      cy.findByButtonText('Create App').click()

      cy.getOpenedModal()
        .findByLabelText('Name')
        .invoke('val')
        .should('equal', '')

      // close modal
      cy.getOpenedModal().findByButtonText('Cancel').click()
    })

    it('should be able to create app', () => {
      const appName = 'new gorgeous app'
      // check that we don't have app with test-name
      cy.findAllByText(appName, { exact: true, timeout: 0 }).should('not.exist')

      // open creation form
      cy.findByButtonText('Create App').should('exist').click()

      cy.getOpenedModal().findByLabelText('Name').type(appName)
      cy.getOpenedModal().findByButtonText('Create App').click()

      cy.getOpenedModal().should('not.exist')
      cy.findByText(appName).should('exist')
    })
  })

  describe('update usecase', () => {
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
      cy.getOpenedModal().findByButtonText('Update App').click()

      cy.getOpenedModal().should('not.exist')
      cy.findByText(appName).should('not.exist')
      cy.findByText(updatedAppName).should('exist')
    })
  })

  describe('delete usecase', () => {
    const appName = 'app for update'

    before(() => {
      createApp(appName)
      cy.visit('/apps')
    })
    it('should be able to delete app', () => {
      cy.findSettingsButtonByAppName(appName).click()
      cy.getOpenedDropdownMenu().findByText('Delete').click()

      cy.getSpinner().should('not.exist')
      cy.getOpenedModal().findByButtonText('Delete App').click()

      cy.findAllByText(appName).should('not.exist')
    })
  })
})
