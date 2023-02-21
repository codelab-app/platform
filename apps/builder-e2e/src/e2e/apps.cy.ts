import { appName, updatedAppName } from './apps/app.data'

describe('Apps CRUD', () => {
  before(() => {
    cy.resetDatabase()
    cy.login()
    cy.visit('/apps')
    cy.getSpinner().should('not.exist')
  })

  describe('create', () => {
    it('should be able to create app', () => {
      // check that we don't have app with test-name
      cy.findAllByText(appName, { exact: true, timeout: 0 }).should('not.exist')

      cy.getButton({ label: /Create App/ }).click()

      cy.getModal().setFormFieldValue({ label: 'Name', value: appName })

      cy.getModal()
        .getModalAction(/Create App/)
        .click()
      cy.getModal().should('not.exist')

      cy.findByText(appName).should('exist')
    })
  })

  describe('update', () => {
    it('should be able to update app name', () => {
      cy.getCard({ title: appName }).getButton({ icon: 'ellipsis' }).click()

      cy.getDropdownItem('Edit').click()

      cy.getModal().setFormFieldValue({ label: 'Name', value: updatedAppName })

      cy.getModal()
        .getModalAction(/Update App/)
        .click()

      cy.getModal().getSpinner().should('not.exist')
      cy.getModal().should('not.exist')

      cy.findByText(appName).should('not.exist')
      cy.findByText(updatedAppName).should('exist')
    })
  })

  describe('delete', () => {
    before(() => {
      cy.visit('/apps')
    })

    it('should be able to delete app', () => {
      cy.getCard({
        title: updatedAppName,
      })
        .getButton({
          icon: 'ellipsis',
        })
        .click()

      cy.getDropdownItem('Delete').click()

      cy.getModal()
        .getModalAction(/Delete App/)
        .click()

      cy.getModal().getSpinner().should('not.exist')
      cy.getModal().should('not.exist')

      cy.findAllByText(updatedAppName).should('not.exist')
    })
  })
})
