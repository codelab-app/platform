import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { FIELD_TYPE } from '@codelab/frontend/test/cypress/antd'
import type { App } from '@codelab/shared/abstract/codegen'
import type { IAppDto } from '@codelab/shared/abstract/core'
import { IActionKind, IPageKindName } from '@codelab/shared/abstract/core'
import { slugify } from '@codelab/shared/utils'
import {
  actionBody,
  actionName,
  updatedActionName,
} from '../../data/store.data'

describe('Action CRUD', () => {
  let app: IAppDto

  before(() => {
    cy.postApiRequest<App>('/app/seed-cypress-app')
      .then(({ body }) => (app = body))
      .as('cypressApp')

    cy.get('@cypressApp').then(() => {
      cy.visit(
        `/apps/cypress/${slugify(app.name)}/pages/${slugify(
          IPageKindName.Provider,
        )}/builder`,
      )

      cy.waitForApiCalls()
      cy.waitForSpinners()
    })
  })

  it('should be able to create action', () => {
    cy.getCuiSidebarViewHeader('Actions').click()
    cy.getCuiSidebarViewHeader('Actions')
      .getCuiToolbarItem(MODEL_ACTION.CreateAction.key)
      .click()

    cy.setFormFieldValue({ label: 'Name', value: actionName })

    cy.setFormFieldValue({
      label: 'Type',
      type: FIELD_TYPE.SELECT,
      value: IActionKind.CodeAction,
    })

    cy.setFormFieldValue({
      label: 'Action code',
      type: FIELD_TYPE.CODE_MIRROR,
      value: actionBody,
    })

    cy.getCuiPopover(MODEL_ACTION.CreateAction.key)
      .getCuiToolbarItem(MODEL_ACTION.CreateAction.key)
      .click()

    cy.getCuiSidebarViewContent('Actions')
      .findByText(actionName)
      .should('exist')
  })

  it('should be able to update action name', () => {
    cy.getCuiSidebarViewContent('Actions')
      .getCuiTreeItemByPrimaryTitle(actionName)
      .closestCuiTreeItem()
      .click()

    cy.getCuiSidebarViewContent('Actions')
      .getCuiTreeItemByPrimaryTitle(actionName)
      .closestCuiTreeItem()
      .getCuiToolbarItem(MODEL_ACTION.UpdateAction.key)
      .click()

    cy.setFormFieldValue({
      label: 'Name',
      value: updatedActionName,
    })

    cy.getCuiPopover(MODEL_ACTION.UpdateAction.key)
      .getCuiToolbarItem(MODEL_ACTION.UpdateAction.key)
      .click()

    cy.getCuiSidebarViewContent('Actions')
      .findByText(new RegExp(/`^${actionName}`$/))
      .should('not.exist')
    cy.getCuiSidebarViewContent('Actions')
      .findByText(updatedActionName)
      .should('exist')
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
