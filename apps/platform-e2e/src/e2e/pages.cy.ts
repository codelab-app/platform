import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import type { IApp, IAppDTO } from '@codelab/shared/abstract/core'
import { IPageKindName } from '@codelab/shared/abstract/core'
import { slugify } from '@codelab/shared/utils'
import { loginSession } from '@codelab/testing/cypress/nextjs-auth0'
import { pageName, updatedPageName } from './apps/app.data'

before(() => {
  loginSession()
  cy.resetDatabaseExceptForUserAndAtom()

  cy.request<IApp>('POST', '/api/data/app/seed-cypress-app').then(
    ({ body: app }) => {
      cy.visit(
        `/apps/cypress/${app.slug}/pages/404/builder?primarySidebarKey=pageList`,
      )
      cy.getSpinner().should('not.exist')
      cy.findAllByText(IPageKindName.Provider).should('exist')
      cy.findAllByText(IPageKindName.NotFound).should('exist')
      cy.findAllByText(IPageKindName.InternalServerError).should('exist')
    },
  )
})

describe('Pages CRUD', () => {
  describe('create', () => {
    it('should be able to create page', () => {
      cy.findAllByText(pageName).should('not.exist')

      cy.getCuiSidebar('Pages').getToolbarItem('Create Page').click()

      cy.findByTestId('create-page-form').findByLabelText('Name').type(pageName)
      cy.getCuiPopover('Create Page').within(() => {
        cy.getToolbarItem('Create').click()
      })
    })

    it('should have accessible page link on sidebar', () => {
      cy.findByText(pageName).should('exist')
      cy.getCuiTreeItemByPrimaryTitle(pageName).click()
      cy.getCuiTreeItemByPrimaryTitle(pageName).within(() => {
        cy.getToolbarItem('Open Builder').click()
      })

      cy.findByText(ROOT_ELEMENT_NAME).should('be.visible')
      cy.getCuiNavigationBarItem('Pages').click()
    })
  })

  describe('update', () => {
    it('should be able to update page name', () => {
      cy.getCuiTreeItemByPrimaryTitle(pageName).should('exist')
      cy.getCuiTreeItemByPrimaryTitle(pageName).click()
      cy.getCuiTreeItemByPrimaryTitle(pageName).within(() => {
        cy.getToolbarItem('Edit').click()
      })

      cy.getSpinner().should('not.exist')

      cy.findByTestId('update-page-form').findByLabelText('Name').clear()
      cy.findByTestId('update-page-form')
        .findByLabelText('Name')
        .type(updatedPageName)
      cy.getCuiPopover('Update Page').within(() => {
        cy.getToolbarItem('Update').click()
      })
      cy.findByTestId('update-page-form').should('not.exist')

      cy.getCuiTreeItemByPrimaryTitle(pageName).should('not.exist')
      cy.getCuiTreeItemByPrimaryTitle(updatedPageName).should('exist')
    })
  })

  describe('delete', () => {
    it('should be able to delete page', () => {
      cy.getCuiTreeItemByPrimaryTitle(updatedPageName).click()
      cy.getCuiTreeItemByPrimaryTitle(updatedPageName).within(() => {
        cy.getToolbarItem('Delete').click()
      })

      cy.getSpinner().should('not.exist')

      cy.getModal()
        .getModalAction(/Delete Page/)
        .click()
      cy.getModal().should('not.exist')

      cy.findAllByText(updatedPageName).should('not.exist')
    })
  })
})
