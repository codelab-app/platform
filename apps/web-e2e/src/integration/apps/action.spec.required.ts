import { STORE_PAGE_NAME } from '@codelab/frontend/abstract/core'
import { FIELD_TYPE } from '../../support/antd/form'
import { actionBody, actionName, updatedActionName } from '../action.data'
import { updatedAppName } from './app.data'

describe('Action CRUD', () => {
  before(() => {
    cy.visit(`/apps`)
    cy.getCard({ title: updatedAppName }).find('a').click()
    cy.url({ timeout: 5000 }).should('include', 'pages')

    cy.findByText(STORE_PAGE_NAME).click()

    cy.url({ timeout: 5000 }).should('include', 'store')

    cy.getSpinner().should('not.exist')
  })

  describe('create', () => {
    it('should be able to create action', () => {
      // check that we don't have action with test-name
      cy.findAllByText(actionName, { exact: true, timeout: 0 }).should(
        'not.exist',
      )

      cy.getButton({ label: 'Create Action' }).click()

      cy.getModal().setFormFieldValue({ label: 'Name', value: actionName })
      cy.getModal().setFormFieldValue({
        label: 'Body',
        value: actionBody,
        type: FIELD_TYPE.MONACO,
      })

      cy.getModal()
        .getModalAction(/Create Action/)
        .click()

      cy.getModal().should('not.exist')

      cy.findByText(actionName).should('exist')
    })
  })

  describe('update', () => {
    it('should be able to update action name', () => {
      cy.searchTableRow({
        header: 'Name',
        row: actionName,
      })
        .getButton({
          icon: 'edit',
        })
        .click()
      cy.getSpinner().should('not.exist')

      cy.getModal().setFormFieldValue({
        label: 'Name',
        value: updatedActionName,
      })

      cy.getModal()
        .getModalAction(/Update Action/)
        .click()
      cy.getModal().should('not.exist')

      cy.findByText(actionName).should('not.exist')
      cy.findByText(updatedActionName).should('exist')
    })
  })

  describe('delete', () => {
    it('should be able to delete an action', () => {
      cy.searchTableRow({
        header: 'Name',
        row: updatedActionName,
      })
        .getButton({ icon: 'delete' })
        .click()
      cy.getSpinner().should('not.exist')

      cy.getModal()
        .getModalAction(/Delete Action/)
        .click()
      cy.getModal().should('not.exist')

      cy.findAllByText(updatedActionName).should('not.exist')
    })
  })
})
