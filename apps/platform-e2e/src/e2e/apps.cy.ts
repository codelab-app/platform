import { IPageKindName } from '@codelab/shared/abstract/core'
import { appName, updatedAppName } from '../data/app.data'

describe('Apps CRUD', () => {
  describe('create', () => {
    it('should be able to create app', () => {
      cy.visit('/apps')
      // check that we don't have app with test-name
      cy.findAllByText(appName, { exact: true, timeout: 0 }).should('not.exist')

      cy.getButton({ label: /Create Now/ }).click()

      cy.getModal().setFormFieldValue({ label: 'Name', value: appName })

      cy.getModal()
        .getModalAction(/Create App/)
        .click()

      cy.getModal().should('not.exist')

      cy.findByText(appName).should('exist')
    })

    it('should create _app, 404, and 500 page for the app', () => {
      cy.findByText(appName).click()
      cy.getCuiTreeItemByPrimaryTitle(IPageKindName.Provider).should(
        'be.visible',
      )
      cy.getCuiTreeItemByPrimaryTitle(IPageKindName.NotFound).should(
        'be.visible',
      )
      cy.getCuiTreeItemByPrimaryTitle(IPageKindName.InternalServerError).should(
        'be.visible',
      )
    })
  })

  describe('update', () => {
    it('should be able to update app name', () => {
      cy.visit('/apps')
      cy.getCard({ title: appName }).getButton({ icon: 'ellipsis' }).click()

      cy.getDropdownItem('Edit').click()

      cy.getModal().setFormFieldValue({ label: 'Name', value: updatedAppName })

      cy.getModal()
        .getModalAction(/Update App/)
        .click()

      cy.getModal().should('not.exist')

      cy.findByText(appName).should('not.exist')
      cy.findByText(updatedAppName).should('exist')
    })
  })

  describe('delete', () => {
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

      cy.getModal().should('not.exist')

      cy.findAllByText(updatedAppName).should('not.exist')
    })
  })
})
