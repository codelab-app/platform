import { FIELD_TYPE } from '../support/antd/form'
import {
  operationName,
  operationQuery,
  updatedOperationName,
} from './operation.data'

describe('Operation CRUD', () => {
  before(() => {
    cy.resetDatabase().then(() => {
      cy.login().then(() => {
        cy.createResource().then(([resource]) => {
          cy.visit(`/resources/${resource.id}/`)
          cy.getSpinner().should('not.exist')
        })
      })
    })
  })

  describe('create', () => {
    it('should be able to create operation', () => {
      // check that we don't have operation with test-name
      cy.findAllByText(operationName, { exact: true, timeout: 0 }).should(
        'not.exist',
      )

      cy.getButton({ label: 'Create Operation' }).click()

      cy.getModal().setFormFieldValue({ label: 'Name', value: operationName })
      cy.getModal().setFormFieldValue({
        label: 'Query',
        value: operationQuery,
        type: FIELD_TYPE.MONACO,
      })

      cy.getModal()
        .getModalAction(/Create Operation/)
        .click()

      cy.getModal().should('not.exist')

      cy.findByText(operationName).should('exist')
    })
  })

  describe('update', () => {
    it('should be able to update operation name', () => {
      cy.searchTableRow({
        header: 'Name',
        row: operationName,
      })
        .getButton({
          icon: 'edit',
        })
        .click()
      cy.getSpinner().should('not.exist')

      cy.getModal().setFormFieldValue({
        label: 'Name',
        value: updatedOperationName,
      })

      cy.getModal()
        .getModalAction(/Update Operation/)
        .click()
      cy.getModal().should('not.exist')

      cy.findByText(operationName).should('not.exist')
      cy.findByText(updatedOperationName).should('exist')
    })
  })

  describe('delete', () => {
    it('should be able to delete an operation', () => {
      cy.searchTableRow({
        header: 'Name',
        row: updatedOperationName,
      })
        .getButton({ icon: 'delete' })
        .click()
      cy.getSpinner().should('not.exist')

      cy.getModal()
        .getModalAction(/Delete Operation/)
        .click()
      cy.getModal().should('not.exist')

      cy.findAllByText(updatedOperationName).should('not.exist')
    })
  })
})
