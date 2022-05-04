import { FIELD_TYPE } from '../support/antd/form'
import {
  parentStoreInput,
  parentStoreName,
  storeName,
  updateStoreName,
} from './store.data'

describe('Store CRUD', () => {
  before(() => {
    cy.resetDatabase().then(() => {
      cy.login().then(() => {
        cy.getCurrentUserId().then((userId) => {
          cy.createStore(parentStoreInput(userId)).then(() => {
            cy.visit('/stores')
            cy.getSpinner().should('not.exist')
          })
        })
      })
    })
  })

  describe('create', () => {
    it('should be able to create store', () => {
      // check that we don't have store with test-name
      cy.findAllByText(storeName, { exact: true, timeout: 0 }).should(
        'not.exist',
      )

      cy.getButton({ label: 'Create Store' }).click()

      cy.getModal().setFormFieldValue({ label: 'Name', value: storeName })

      cy.getModal().setFormFieldValue({
        label: 'Parent Store',
        value: parentStoreName,
        type: FIELD_TYPE.SELECT,
      })

      cy.getModal().setFormFieldValue({ label: 'Store Key', value: 'subStore' })

      cy.getModal()
        .getModalAction(/Create Store/)
        .click()

      cy.getModal().should('not.exist')

      cy.findByText(storeName).should('exist')
    })
  })

  describe('update', () => {
    it('should be able to update store name', () => {
      cy.getTreeNode(storeName).getButton({ icon: 'edit' }).click()

      cy.getSpinner().should('not.exist')

      cy.getModal().findByLabelText('Name').clear().type(updateStoreName)

      cy.getModal()
        .getModalAction(/Update Store/)
        .click()
      cy.getModal().should('not.exist')

      cy.findByText(storeName).should('not.exist')
      cy.findByText(updateStoreName).should('exist')
    })
  })

  describe('delete', () => {
    it('should be able to update store name', () => {
      cy.getTreeNode(updateStoreName).getButton({ icon: 'delete' }).click()

      cy.getSpinner().should('not.exist')

      cy.getModal()
        .getModalAction(/Delete/)
        .click()

      cy.getModal().should('not.exist')

      cy.findByText(updateStoreName).should('not.exist')
    })
  })
})
