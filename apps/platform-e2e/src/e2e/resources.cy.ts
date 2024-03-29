import { MODEL_ACTION, MODEL_UI } from '@codelab/frontend/abstract/types'
import { FIELD_TYPE } from '@codelab/frontend/test/cypress/antd'
import { IResourceType } from '@codelab/shared/abstract/core'
import {
  resourceName,
  resourcesUrl,
  updatedResourceName,
} from '../data/resource.data'

describe('Resource CRUD', () => {
  describe('create', () => {
    it('should be able to create resource', () => {
      cy.visit('/resources')
      cy.waitForSpinners()
      cy.findAllByText(resourceName).should('not.exist')

      cy.getCuiSidebar(MODEL_UI.SidebarResource.key)
        .getCuiToolbarItem(MODEL_ACTION.CreateResource.key)
        .click()

      cy.setFormFieldValue({ label: 'Name', value: resourceName })
      cy.setFormFieldValue({
        label: 'Type',
        type: FIELD_TYPE.SELECT,
        value: IResourceType.GraphQl,
      })
      cy.setFormFieldValue({ label: 'Url', value: resourcesUrl })

      cy.getCuiPopover(MODEL_ACTION.CreateResource.key)
        .getCuiToolbarItem(MODEL_ACTION.CreateResource.key)
        .click()

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
        .getCuiToolbarItem(MODEL_ACTION.DeleteResource.key)
        .click()

      cy.getModalAction(/Delete Resource/).click()

      cy.findAllByText(updatedResourceName).should('not.exist')
    })
  })
})
