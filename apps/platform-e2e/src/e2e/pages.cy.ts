import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import type { IAppDTO } from '@codelab/shared/abstract/core'
import { IPageKindName } from '@codelab/shared/abstract/core'
import { loginSession } from '../support/nextjs-auth0/commands/login'
import { pageName, updatedPageName } from './apps/app.data'

describe('Pages CRUD', () => {
  before(() => {
    cy.resetDatabase()
    loginSession()

    cy.request<IAppDTO>('/api/cypress/app').then((res) => {
      const app = res.body

      cy.visit(`/apps/${app.id}/pages`)
      cy.getSpinner().should('not.exist')
      cy.findAllByText(IPageKindName.Provider).should('exist')
      cy.findAllByText(IPageKindName.NotFound).should('exist')
      cy.findAllByText(IPageKindName.InternalServerError).should('exist')
    })
  })

  describe('create', () => {
    it('should be able to create page', () => {
      cy.findAllByText(pageName).should('not.exist')

      cy.getSider().getButton({ icon: 'plus' }).click()

      cy.findByTestId('create-page-form').findByLabelText('Name').type(pageName)
      cy.findByTestId('create-page-form')
        .getButton({ label: 'Create Page' })
        .click()
    })

    it('should have accessible page link on sidebar', () => {
      cy.findByText(pageName).should('exist')
      cy.findByTestId('page-explorer-pane').findByText(pageName).click()
      cy.findByText(ROOT_ELEMENT_NAME).should('be.visible')
      cy.go('back')
    })
  })

  describe('update', () => {
    it('should be able to update page name', () => {
      cy.getListItem(pageName)
        .getButton({
          icon: 'edit',
        })
        .click()
      cy.getSpinner().should('not.exist')

      cy.findByTestId('update-page-form').findByLabelText('Name').clear()
      cy.findByTestId('update-page-form')
        .findByLabelText('Name')
        .type(updatedPageName)
      cy.findByTestId('update-page-form')
        .getButton({ label: 'Update Page' })
        .click()

      cy.findByTestId('update-page-form').should('not.exist')

      cy.findByText(pageName).should('not.exist')
      cy.findByText(updatedPageName).should('exist')
    })
  })

  describe('delete', () => {
    it('should be able to delete page', () => {
      cy.getListItem(updatedPageName)
        .getButton({
          icon: 'delete',
        })
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
