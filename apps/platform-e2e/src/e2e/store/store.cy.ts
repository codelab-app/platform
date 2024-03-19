import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { FIELD_TYPE } from '@codelab/frontend/test/cypress/antd'
import type { App, Resource } from '@codelab/shared/abstract/codegen'
import type { IAppDto } from '@codelab/shared/abstract/core'
import {
  IPageKindName,
  IPrimitiveTypeKind,
} from '@codelab/shared/abstract/core'
import { slugify } from '@codelab/shared/utils'
import { stateVarName, updatedStateVarName } from '../../data/store.data'
import { createResourceData } from './resource.data'

describe('Store field CRUD', () => {
  let app: IAppDto

  before(() => {
    cy.postApiRequest<App>('/app/seed-cypress-app')
      .then(({ body }) => (app = body))
      .as('cypressApp')

    cy.get('@cypressApp')
      .then(() =>
        cy.postApiRequest<Resource>(
          '/resource/create-resource',
          createResourceData,
        ),
      )
      .as('cypressResource')

    cy.get('@cypressResource').then(() => {
      cy.waitForApiCalls(() =>
        cy.visit(
          `/apps/cypress/${slugify(app.name)}/pages/${slugify(
            IPageKindName.Provider,
          )}/builder`,
        ),
      )
    })
  })

  it('should be able to create state variable', () => {
    cy.waitForSpinners()

    cy.getCuiSidebarViewHeader('State').click()
    cy.getCuiSidebarViewHeader('State')
      .getCuiToolbarItem(MODEL_ACTION.CreateField.key)
      .click()

    cy.getCuiForm(MODEL_ACTION.CreateField.key).should('be.visible')

    cy.setFormFieldValue({ label: 'Key', value: stateVarName })
    cy.setFormFieldValue({ label: 'Name', value: stateVarName })
    cy.setFormFieldValue({
      label: 'Type',
      type: FIELD_TYPE.SELECT,
      value: IPrimitiveTypeKind.Integer,
    })

    cy.waitForApiCalls(() =>
      cy
        .getCuiPopover(MODEL_ACTION.CreateField.key)
        .getCuiToolbarItem(MODEL_ACTION.CreateField.key)
        .click(),
    )

    cy.getCuiSidebarViewContent('State')
      .findByText(stateVarName)
      .should('exist')
  })

  it('should be able to update state variable name', () => {
    cy.getCuiSidebarViewContent('State')
      .getCuiTreeItemByPrimaryTitle(stateVarName)
      .closestCuiTreeNode()
      .click()

    cy.getCuiSidebarViewContent('State')
      .getCuiTreeItemByPrimaryTitle(stateVarName)
      .closestCuiTreeNode()
      .getCuiToolbarItem(MODEL_ACTION.UpdateField.key)
      .click()

    cy.setFormFieldValue({
      label: 'Key',
      value: updatedStateVarName,
    })

    cy.waitForApiCalls(() =>
      cy
        .getCuiPopover(MODEL_ACTION.UpdateField.key)
        .getCuiToolbarItem(MODEL_ACTION.UpdateField.key)
        .click(),
    )

    cy.getCuiSidebarViewContent('State')
      .findByText(new RegExp(/`^${stateVarName}`$/))
      .should('not.exist')
    cy.getCuiSidebarViewContent('State')
      .findByText(updatedStateVarName)
      .should('exist')
  })

  it('should be able to delete state variable', () => {
    cy.getCuiSidebarViewContent('State')
      .getCuiTreeItemByPrimaryTitle(updatedStateVarName)
      .closestCuiTreeNode()
      .getCuiToolbarItem(MODEL_ACTION.DeleteField.key)
      .click()

    cy.waitForApiCalls(() => cy.getModal().getModalAction('Delete').click())

    cy.getModal().should('not.exist')

    cy.getCuiSidebarViewContent('State')
      .getCuiTreeItemByPrimaryTitle(updatedStateVarName)
      .should('not.exist')
  })
})
