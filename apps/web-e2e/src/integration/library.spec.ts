import { DeleteUserLibrariesGql } from '@codelab/hasura'
import { print } from 'graphql'

describe('Library', () => {
  let appId: string
  let pageId: string

  const openLibrariesTab = () => {
    cy.getPaneMain().findByTitle('Library').click()
  }

  before(() => {
    cy.clearCookies()
    cy.login()

    // delete all apps afor current user
    cy.getCurrentUserId().then((userId) => {
      cy.hasuraAdminRequest({
        query: print(DeleteUserLibrariesGql),
        variables: {
          userId,
        },
      })
    })

    cy.createApp().then((app) => {
      appId = app.id
      pageId = app.pages[0].id
    })
  })

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('appSession')
    cy.getSpinner().should('not.exist')
  })

  describe('create', () => {
    before(() => {
      cy.visit(`/apps/${appId}/pages/${pageId}`)
      openLibrariesTab()
    })
    it('should be able to create library', () => {
      const libraryName = 'library for test creation'
      cy.findAllByText(libraryName, { exact: true, timeout: 0 }).should(
        'not.exist',
      )

      cy.findByRole('button', { name: /plus/i }).click()

      cy.getOpenedModal().findByLabelText('Name').type(libraryName)
      cy.getOpenedModal()
        .findByButtonText(/create library/i)
        .click()

      cy.getOpenedModal().should('not.exist')
      cy.findByText(libraryName).should('exist')
    })
  })

  describe('update', () => {
    const libraryName = 'library for test update'
    before(() => {
      cy.createLibrary({ name: libraryName })
      cy.visit(`/apps/${appId}/pages/${pageId}`)
      openLibrariesTab()
    })

    const updatedLibraryName = 'updated library'

    it('should be able to update page name', () => {
      cy.findMainPaneButtonByItemName(libraryName, 'Settings', {
        timeout: 2000,
      }).click()

      cy.getSpinner().should('not.exist')
      cy.getOpenedModal()
        .findByLabelText('Name')
        .clear()
        .type(updatedLibraryName)

      cy.getOpenedModal()
        .findByButtonText(/update library/i)
        .click()

      cy.getOpenedModal().should('not.exist')
      cy.findByText(libraryName).should('not.exist')
      cy.findByText(updatedLibraryName).should('exist')
    })
  })
  describe('delete', () => {
    const libraryName = 'library for delete'
    before(() => {
      cy.createLibrary({ name: libraryName })
      cy.visit(`/apps/${appId}/pages/${pageId}`)
      openLibrariesTab()
    })

    it('should be able to delete page', () => {
      cy.findMainPaneButtonByItemName(libraryName, 'Delete', {
        timeout: 2000,
      }).click()

      cy.getSpinner().should('not.exist')
      cy.getOpenedModal()
        .findByButtonText(/delete library/i)
        .click()

      cy.findAllByText(libraryName).should('not.exist')
    })
  })
})
