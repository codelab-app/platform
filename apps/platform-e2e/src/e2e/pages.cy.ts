import { loginAndSetupData } from '@codelab/frontend/test/cypress/nextjs-auth0'
import type { IApp } from '@codelab/shared/abstract/core'
import { IPageKindName } from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import { pageName, updatedPageName } from './apps/app.data'

describe('Pages CRUD', () => {
  let app: IApp

  before(() => {
    loginAndSetupData()
    cy.postApiRequest<IApp>('/api/data/app/seed-cypress-app').then((apps) => {
      app = apps.body
    })
  })

  describe('create', () => {
    it('should be able to create page', () => {
      cy.visit(
        `/apps/cypress/${app.slug}/pages/_app/builder?primarySidebarKey=pageList`,
      )
      cy.getSpinner().should('not.exist')
      cy.findAllByText(IPageKindName.Provider).should('exist')
      cy.findAllByText(IPageKindName.NotFound).should('exist')
      cy.findAllByText(IPageKindName.InternalServerError).should('exist')

describe('Pages CRUD', () => {
  let app: IApp

  before(() => {
    loginAndSetupData()
    cy.postApiRequest<IApp>('/app/seed-cypress-app').then((apps) => {
      app = apps.body
    })
  })

  describe('create', () => {
    it('should be able to create page', () => {
      cy.visit(
        `/apps/cypress/${app.slug}/pages/_app/builder?primarySidebarKey=pageList`,
      )
      cy.getSpinner().should('not.exist')
      cy.findAllByText(IPageKindName.Provider).should('exist')
      cy.findAllByText(IPageKindName.NotFound).should('exist')
      cy.findAllByText(IPageKindName.InternalServerError).should('exist')

      cy.findAllByText(pageName).should('not.exist')

      cy.getCuiSidebar('Pages').getCuiToolbarItem('Create Page').click()

      cy.findByTestId('create-page-form').findByLabelText('Name').type(pageName)
      cy.getCuiPopover('Create Page').getCuiToolbarItem('Create').click()
    })

    it('should have accessible page link on sidebar', () => {
      cy.findByText(pageName).should('exist')
      cy.getCuiTreeItemByPrimaryTitle(pageName).click()
      cy.getCuiTreeItemByPrimaryTitle(pageName)
        .getCuiTreeItemToolbar()
        .getCuiToolbarItem('Open Builder')
        .click()

      cy.findByText(ROOT_ELEMENT_NAME).should('be.visible')
      cy.getCuiNavigationBarItem('Pages').click()
    })
  })

  describe('update', () => {
    it('should be able to update page name', () => {
      cy.getCuiTreeItemByPrimaryTitle(pageName).should('exist')
      cy.getCuiTreeItemByPrimaryTitle(pageName).click()
      cy.getCuiTreeItemByPrimaryTitle(pageName)
        .getCuiTreeItemToolbar()
        .getCuiToolbarItem('Edit')
        .click()

      cy.getSpinner().should('not.exist')

      cy.findByTestId('update-page-form').findByLabelText('Name').clear()
      cy.findByTestId('update-page-form')
        .findByLabelText('Name')
        .type(updatedPageName)
      cy.getCuiPopover('Update Page').getCuiToolbarItem('Update').click()
      cy.findByTestId('update-page-form').should('not.exist')

      cy.getCuiTreeItemByPrimaryTitle(pageName).should('not.exist')
      cy.getCuiTreeItemByPrimaryTitle(updatedPageName).should('exist')
    })
  })

  describe('delete', () => {
    it('should be able to delete page', () => {
      cy.getCuiTreeItemByPrimaryTitle(updatedPageName).click()
      cy.getCuiTreeItemByPrimaryTitle(updatedPageName)
        .getCuiTreeItemToolbar()
        .getCuiToolbarItem('Delete')
        .click()

      cy.getSpinner().should('not.exist')

      cy.getModal()
        .getModalAction(/Delete Page/)
        .click()
      cy.getModal().should('not.exist')

      cy.findAllByText(updatedPageName).should('not.exist')
    })
  })
})
