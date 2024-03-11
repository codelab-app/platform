import { FIELD_TYPE } from '@codelab/frontend/test/cypress/antd'
import type { App, Resource } from '@codelab/shared/abstract/codegen'
import type { IAppDto } from '@codelab/shared/abstract/core'
import {
  IActionKind,
  IPageKindName,
  IPrimitiveTypeKind,
} from '@codelab/shared/abstract/core'
import { slugify } from '@codelab/shared/utils'
import {
  actionBody,
  actionName,
  stateVarName,
  updatedActionName,
  updatedStateVarName,
} from '../data/store.data'
import { createResourceData } from './store/resource.data'

describe('Store', () => {
  let app: IAppDto

  before(() => {
    cy.postApiRequest<App>('/app/seed-cypress-app')
      .then(({ body }) => (app = body))
      .as('cypressApp')

    cy.get('@cypressApp')
      .then(() =>
        cy
          .postApiRequest<Resource>('/resource/create', createResourceData)
          .then(({ body }) => body),
      )
      .as('cypressResource')

    cy.get('@cypressResource').then(() => {
      cy.visit(
        `/apps/cypress/${slugify(app.name)}/pages/${slugify(
          IPageKindName.Provider,
        )}/builder`,
      )

      cy.waitForApiCalls()
      cy.waitForSpinners()
    })
  })

  describe('State CRUD', () => {
    it.only('should be able to create state variable', () => {
      cy.getCuiSidebarViewHeader('State').click()
      cy.getCuiSidebarViewHeader('State').getCuiToolbarItem('Add Field').click()

      cy.setFormFieldValue({ label: 'Key', value: stateVarName })
      cy.setFormFieldValue({ label: 'Name', value: stateVarName })
      cy.setFormFieldValue({
        label: 'Type',
        type: FIELD_TYPE.SELECT,
        value: IPrimitiveTypeKind.Integer,
      })
      cy.getCuiPopover('Create Field').getCuiToolbarItem('Create').click()
      cy.getCuiSidebarViewContent('State')
        .findByText(stateVarName)
        .should('exist')
    })

    it.only('should be able to update state variable name', () => {
      cy.getCuiSidebarViewContent('State')
        .getCuiTreeItemByPrimaryTitle(stateVarName)
        .closestCuiTreeItem()
        .click()

      cy.getCuiSidebarViewContent('State')
        .getCuiTreeItemByPrimaryTitle(stateVarName)
        .closestCuiTreeItem()
        .getCuiToolbarItem('Edit field')
        .click()

      cy.setFormFieldValue({
        label: 'Name',
        value: updatedStateVarName,
      })

      cy.getCuiPopover('Update Field').getCuiToolbarItem('Update').click()

      cy.getCuiSidebarViewContent('State')
        .findByText(stateVarName)
        .should('not.exist')
      cy.getCuiSidebarViewContent('State')
        .findByText(updatedStateVarName)
        .should('not.exist')
    })

    it('should be able to delete state variable', () => {
      cy.getListItem(updatedStateVarName).getButton({ icon: 'delete' }).click()
      cy.waitForSpinners()

      cy.getModal()
        .getModalAction(/Delete/)
        .click()
      cy.getModal().should('not.exist')

      cy.findByTitle(updatedStateVarName).should('not.exist')
    })
  })

  describe('Action CRUD', () => {
    it('should be able to create action', () => {
      cy.findByTitle('Create Action').click({ force: true })

      cy.getModal().setFormFieldValue({ label: 'Name', value: actionName })

      cy.getModal().setFormFieldValue({ label: 'Name', value: actionName })

      cy.getModal().setFormFieldValue({
        label: 'Type',
        type: FIELD_TYPE.SELECT,
        value: IActionKind.CodeAction,
      })

      cy.getModal().setFormFieldValue({
        label: 'Action code',
        type: FIELD_TYPE.CODE_MIRROR,
        value: actionBody,
      })

      cy.getModal()
        .getModalAction(/Create Action/)
        .click()

      cy.getModal().should('not.exist')

      cy.findByText(actionName).should('exist')
    })

    it('should be able to update action name', () => {
      cy.getListItem(actionName)
        .getButton({
          icon: 'edit',
        })
        .click()
      cy.waitForSpinners()

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

    it('should be able to delete action', () => {
      cy.getListItem(actionName)
        .getButton({
          icon: 'delete',
        })
        .click()
      cy.waitForSpinners()

      cy.getModal()
        .getModalAction(/Delete Action/)
        .click()
      cy.getModal().should('not.exist')

      cy.findAllByText(updatedActionName).should('not.exist')
    })
  })
})
