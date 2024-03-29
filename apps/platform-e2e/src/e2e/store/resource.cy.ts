import { MODEL_ACTION, MODEL_UI } from '@codelab/frontend/abstract/types'
import { FIELD_TYPE } from '@codelab/frontend/test/cypress/antd'
import type { App } from '@codelab/shared/abstract/codegen'
import { IResourceType } from '@codelab/shared/abstract/core'
import { createResourceData } from './resource.data'

/**
 * Here we just create resources and see they are there, but we can't do much testing until we use the resource by binding to an action in the UI.
 *
 * We test the UI for resource here, but will seed it in other specs to continue the testing
 */
describe('API Resource', () => {
  before(() => {
    cy.postApiRequest<App>('/app/seed-cypress-app')
      .then(({ body }) => body)
      .as('cypressApp')

    cy.visit('resources')
    cy.waitForSpinners()
  })

  describe('Rest resource', () => {
    it('can create an API resource', () => {
      cy.visit('/resources')
      cy.waitForSpinners()

      // Create the API resource we will use for the API action
      cy.getCuiSidebar(MODEL_UI.SidebarResource.key)
        .getCuiToolbarItem(MODEL_ACTION.CreateResource.key)
        .click()

      cy.setFormFieldValue({ label: 'Name', value: createResourceData.name })
      cy.setFormFieldValue({
        label: 'Url',
        value: createResourceData.config.url,
      })

      cy.setFormFieldValue({
        label: 'Type',
        type: FIELD_TYPE.SELECT,
        value: IResourceType.Rest,
      })

      cy.getCuiPopover(MODEL_ACTION.CreateResource.key)
        .getCuiToolbarItem(MODEL_ACTION.CreateResource.key)
        .click()

      cy.getCuiTreeItemByPrimaryTitle(createResourceData.name).should('exist')
    })
  })

  // describe('Code resource', () => {
  //   it('can create a code resource', () => {
  //     //
  //   })
  // })
})
