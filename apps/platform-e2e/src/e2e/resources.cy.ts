import { FIELD_TYPE } from '@codelab/frontend/test/cypress/antd'
import { loginAndSetupData } from '@codelab/frontend/test/cypress/nextjs-auth0'
import {
  resourceName,
  resourcesUrl,
  updatedResourceName,
} from './resource.data'
import { IResourceType } from '@codelab/shared/abstract/core'

describe('Resource CRUD', () => {
  before(() => {
    loginAndSetupData()
  })

  describe('create', () => {
    it('should be able to create resource', () => {
      cy.visit('/resources')
      cy.getSpinner().should('not.exist')
      cy.findAllByText(resourceName).should('not.exist')

      cy.getCuiSidebar('Resources').getCuiToolbarItem('Add a Resource').click()

      cy.setFormFieldValue({ label: 'Name', value: resourceName })
      cy.setFormFieldValue({
        label: 'Type',
        type: FIELD_TYPE.SELECT,
        value: IResourceType.GraphQl,
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
      cy.getCuiTreeItemByPrimaryTitle(updatedResourceName)
        .getCuiTreeItemToolbar()
        .getCuiToolbarItem('Delete')
        .click()

      cy.getModalAction(/Delete Resource/).click()

      cy.findAllByText(updatedResourceName).should('not.exist')
    })
  })
})
