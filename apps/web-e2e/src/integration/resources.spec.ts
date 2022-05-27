import { ResourceType } from '@codelab/shared/abstract/codegen'
import { FIELD_TYPE } from '../support/antd/form'
import {
  resourceName,
  resourcesUrl,
  updatedResourceName,
} from './resource.data'

describe('Resource CRUD', () => {
  before(() => {
    cy.resetDatabase().then(() => {
      cy.login().then(() => {
        cy.visit('/resources')
        cy.getSpinner().should('not.exist')
      })
    })
  })

  describe('create', () => {
    it('should be able to create resource', () => {
      cy.findAllByText(resourceName).should('not.exist')

      cy.getButton({ icon: 'plus' }).click()

      cy.getModal().setFormFieldValue({ label: 'Name', value: resourceName })
      cy.getModal().setFormFieldValue({
        label: 'Type',
        value: ResourceType.GraphQL,
        type: FIELD_TYPE.SELECT,
      })
      cy.getModal().setFormFieldValue({ label: 'Url', value: resourcesUrl })

      cy.getModal()
        .getModalAction(/Create Resource/)
        .click()

      cy.getModal().should('not.exist')
      cy.findByText(resourceName).should('exist')
    })
  })

  describe('update', () => {
    it('should be able to update resource name', () => {
      cy.getListItem(resourceName).getButton({ icon: 'edit' }).click()
      cy.getSpinner().should('not.exist')

      cy.getModal().setFormFieldValue({
        label: 'Name',
        value: updatedResourceName,
      })

      cy.getModal()
        .getModalAction(/Update Resource/)
        .click()

      cy.getModal().should('not.exist')

      cy.findByText(resourceName).should('not.exist')
      cy.findByText(updatedResourceName).should('exist')
    })
  })

  describe('delete', () => {
    it('should be able to delete resource', () => {
      cy.getListItem(updatedResourceName).getButton({ icon: 'delete' }).click()

      cy.getSpinner().should('not.exist')

      cy.getModal()
        .getModalAction(/Delete Resource/)
        .click()
      cy.getModal().should('not.exist')

      cy.findAllByText(updatedResourceName).should('not.exist')
    })
  })
})
