import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import type { IAppDTO } from '@codelab/shared/abstract/core'
import { IPageKindName } from '@codelab/shared/abstract/core'
import { slugify } from '@codelab/shared/utils'
import { loginSession } from '../support/nextjs-auth0/commands/login'
import { pageName, updatedPageName } from './apps/app.data'

before(() => {
  cy.resetDatabase()

  loginSession()

  cy.request<IAppDTO>('/api/cypress/app').then((res) => {
    const app = res.body
    cy.visit(
      `/apps/cypress/${slugify(
        app.name,
      )}/pages/404/builder?primarySidebarKey=pageList`,
    )
    cy.getSpinner().should('not.exist')
    cy.findAllByText(IPageKindName.Provider).should('exist')
    cy.findAllByText(IPageKindName.NotFound).should('exist')
    cy.findAllByText(IPageKindName.InternalServerError).should('exist')
  })
})

describe('Pages CRUD', () => {
  describe('create', () => {
    it('should be able to create page', () => {
      cy.findAllByText(pageName).should('not.exist')

      cy.getCuiSidebar('Pages').getToolbarItem('Create Page').click()

      cy.findByTestId('create-page-form').findByLabelText('Name').type(pageName)
      cy.findByTestId('create-page-form')
        .getButton({ label: 'Create Page' })
        .click()
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
      cy.findByTestId('update-page-form')
        .getButton({ label: 'Update Page' })
        .click()

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
