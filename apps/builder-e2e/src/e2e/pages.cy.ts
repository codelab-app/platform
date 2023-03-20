import type { IAppDTO } from '@codelab/frontend/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import { loginSession } from '../support/nextjs-auth0/commands/login'
import { pageName, updatedPageName } from './apps/app.data'

describe('Pages CRUD', () => {
  before(() => {
    cy.resetDatabase()
    loginSession()

    cy.getCurrentOwner()
      .then((owner) => {
        return cy.request<IAppDTO>('/api/cypress/app')
      })
      .then((res) => {
        const app = res.body

        console.log(app)

        cy.visit(`/apps/${app.id}/pages`)
        cy.getSpinner().should('not.exist')
      })
  })

  describe('create', () => {
    it('should be able to create page', () => {
      cy.findAllByText(pageName).should('not.exist')

      cy.getSider().getButton({ icon: 'plus' }).click()

      cy.getModal().findByLabelText('Name').type(pageName)
      cy.getModal()
        .getModalAction(/Create Page/)
        .click()

      cy.getModal().should('not.exist')
    })

    it('should have accessible page link on sidebar', () => {
      cy.findByText(pageName).click()
      cy.getSpinner().should('not.exist')
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

      cy.getModal().findByLabelText('Name').clear().type(updatedPageName)

      cy.getModal()
        .getModalAction(/Update Page/)
        .click()
      cy.getModal().should('not.exist')

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
