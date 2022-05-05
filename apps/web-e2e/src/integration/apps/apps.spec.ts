import { appName, updatedAppName } from './app.data'

describe('Apps CRUD', () => {
  before(() => {
    cy.resetDatabase().then(() => {
      cy.login().then(() => {
        cy.visit('/apps')
        cy.getSpinner().should('not.exist')
      })
    })
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
      cy.getSpinner().should('not.exist')

      cy.getModal().setFormFieldValue({ label: 'Name', value: updatedAppName })
      cy.getModal()
        .getModalAction(/Update App/)
        .click()
      cy.getModal().should('not.exist')

      cy.findByText(appName).should('not.exist')
      cy.findByText(updatedAppName).should('exist')
    })
  })

  // Insert page test here
  require('./pages.spec.required')

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
      cy.getSpinner().should('not.exist')

      cy.getModal()
        .getModalAction(/Delete App/)
        .click()
      cy.getModal().should('not.exist')

      cy.findAllByText(updatedAppName).should('not.exist')
    })
  })
})
