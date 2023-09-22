import { ResourceType } from '@codelab/shared/abstract/codegen'
import { FIELD_TYPE } from '@codelab/testing/cypress/antd'
import { loginAndSetupData } from '@codelab/testing/cypress/nextjs-auth0'
import {
  resourceName,
  resourcesUrl,
  updatedResourceName,
} from './resource.data'

describe('Resource CRUD', () => {
  before(() => {
    loginAndSetupData()
    cy.visit('/resources')
    cy.getSpinner().should('not.exist')
  })

  describe('create', () => {
    it('should be able to create resource', () => {
      cy.findAllByText(resourceName).should('not.exist')

      cy.getCuiSidebar('Resources').getCuiToolbarItem('Add a Resource').click()

      cy.setFormFieldValue({ label: 'Name', value: resourceName })
      cy.setFormFieldValue({
        label: 'Type',
        type: FIELD_TYPE.SELECT,
        value: ResourceType.GraphQL,
      })
      cy.setFormFieldValue({ label: 'Url', value: resourcesUrl })

      cy.getCuiPopover('Create Resource').getCuiToolbarItem('Create').click()

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
        cy.getCuiToolbarItem('Delete').click()
      })

      cy.getModalAction(/Delete Resource/).click()

      cy.findAllByText(updatedResourceName).should('not.exist')
    })
  })
})
