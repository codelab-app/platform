import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import type { IApp } from '@codelab/shared/abstract/core'
import { IPageKindName } from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import { pageName, updatedPageName } from '../data/app.data'

describe('Pages CRUD', () => {
  let app: IApp

  before(() => {
    cy.postApiRequest<IApp>('/app/seed-cypress-app').then(
      ({ body }) => (app = body),
    )
  })

  describe('create', () => {
    it('should be able to create page', () => {
      cy.visit(
        `/apps/cypress/${app.slug}/pages/_app/builder?primarySidebarKey=pageList`,
      )

      cy.findAllByText(IPageKindName.Provider).should('exist')
      cy.findAllByText(IPageKindName.NotFound).should('exist')
      cy.findAllByText(IPageKindName.InternalServerError).should('exist')

      cy.waitForSpinners()

      cy.findAllByText(pageName).should('not.exist')

      cy.getCuiSidebar('Pages')
        .getCuiToolbarItem(MODEL_ACTION.CreatePage.key)
        .click()

      cy.findByTestId('create-page-form').findByLabelText('Name').type(pageName)

      cy.getCuiPopover(MODEL_ACTION.CreatePage.key)
        .getCuiToolbarItem(MODEL_ACTION.CreatePage.key)
        .click()
    })

    it('should have accessible page link on sidebar', () => {
      cy.findByText(pageName).should('exist')
      cy.getCuiTreeItemByPrimaryTitle(pageName).click()
      cy.getCuiTreeItemByPrimaryTitle(pageName)
        .getCuiTreeItemToolbar()
        .getCuiToolbarItem(MODEL_ACTION.OpenBuilder.key)
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
        .getCuiToolbarItem(MODEL_ACTION.UpdatePage.key)
        .click()

      cy.waitForSpinners()

      cy.findByTestId('update-page-form').findByLabelText('Name').clear()
      cy.findByTestId('update-page-form')
        .findByLabelText('Name')
        .type(updatedPageName)
      cy.getCuiPopover(MODEL_ACTION.UpdatePage.key)
        .getCuiToolbarItem(MODEL_ACTION.UpdatePage.key)
        .click()
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
        .getCuiToolbarItem(MODEL_ACTION.DeletePage.key)
        .click()

      cy.waitForSpinners()

      cy.getModal()
        .getModalAction(/Delete Page/)
        .click()
      cy.getModal().should('not.exist')

      cy.findAllByText(updatedPageName).should('not.exist')
    })
  })
})
