import { ResourceType } from '@codelab/shared/abstract/codegen'
import { FIELD_TYPE } from '../support/antd/form'
import { loginSession } from '../support/nextjs-auth0/commands/login'
import {
  resourceName,
  resourcesUrl,
  updatedResourceName,
} from './resource.data'

describe('Resource CRUD', () => {
  before(() => {
    cy.resetDatabase()
    loginSession()
    cy.visit('/resources')
    cy.getSpinner().should('not.exist')
  })

  describe('create', () => {
    it('should be able to create resource', () => {
      cy.findAllByText(resourceName).should('not.exist')

      cy.getCuiSidebar('Resources')
        .getToolbarItem('Add GraphQL Resource')
        .click()

      cy.getModal().setFormFieldValue({ label: 'Name', value: resourceName })
      cy.getModal().setFormFieldValue({
        label: 'Type',
        type: FIELD_TYPE.SELECT,
        value: ResourceType.GraphQL,
      })
      cy.getModal().setFormFieldValue({ label: 'Url', value: resourcesUrl })

      cy.getModal()
        .getModalAction(/Create Resource/)
        .click()

      cy.getModal().should('not.exist')
      cy.getCuiTreeItemByPrimaryTitle(resourceName).should('exist')
    })
  })

  describe('update', () => {
    it('should be able to update resource name', () => {
      cy.getCuiTreeItemByPrimaryTitle(resourceName).click()

      cy.setFormFieldValue({
        label: 'Name',
        value: updatedResourceName,
      })

      cy.getButton({ label: 'Update Resource' }).click()

      cy.getCuiTreeItemByPrimaryTitle(resourceName).should('not.exist')
      cy.getCuiTreeItemByPrimaryTitle(updatedResourceName).should('exist')
    })
  })

  describe('delete', () => {
    it('should be able to delete resource', () => {
      cy.getCuiTreeItemByPrimaryTitle(updatedResourceName).within(() => {
        cy.getToolbarItem('Delete').click()
      })

      cy.getModal()
        .getModalAction(/Delete Resource/)
        .click()
      cy.getModal().should('not.exist')

      cy.findAllByText(updatedResourceName).should('not.exist')
    })
  })
})
