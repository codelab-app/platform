import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { FIELD_TYPE } from '@codelab/frontend/test/cypress/antd'
import type { App, Resource } from '@codelab/shared/abstract/codegen'
import type { IAppDto } from '@codelab/shared/abstract/core'
import { IPageKindName } from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import { slugify } from '@codelab/shared/utils'
import { v4 } from 'uuid'
import { createResourceData } from './resource.data'
import { storeDescriptionFieldDto, storeTitleFieldDto } from './store.data'

describe('Store', () => {
  let app: IAppDto

  before(() => {
    cy.postApiRequest<App>('/app/seed-cypress-app').then(
      ({ body }) => (app = body),
    )

    cy.postApiRequest<Resource>('/resource/create', createResourceData).then(
      ({ body }) => body,
    )
  })

  it('should add fields to a page store as state', () => {
    cy.visit(
      `/apps/cypress/${slugify(app.name)}/pages/${slugify(
        IPageKindName.Provider,
      )}/builder`,
    )
    cy.waitForSpinners()

    // select root now so we can update its child later
    // there is an issue with tree interaction
    // Increased timeout since builder may take longer to load
    cy.findByText(ROOT_ELEMENT_NAME, { timeout: 30000 })
      .should('be.visible')
      .click({ force: true })

    cy.getCuiSidebarViewHeader('State').click()
    cy.getCuiSidebarViewHeader('State')
      .getCuiToolbarItem(MODEL_ACTION.CreateField.key)
      .click()

    const storeApiId = v4()
    const storeField = storeTitleFieldDto({ id: storeApiId })

    cy.setFormFieldValue({
      label: 'Key',
      type: FIELD_TYPE.INPUT,
      value: storeField.key,
    })

    cy.setFormFieldValue({
      label: 'Type',
      type: FIELD_TYPE.SELECT,
      value: 'String',
    })

    cy.findByText('Default values').should('exist')

    cy.setFormFieldValue({
      label: 'Nullable',
      type: FIELD_TYPE.TOGGLE,
      value: true,
    })

    cy.getCuiPopover(MODEL_ACTION.CreateField.key)
      .getCuiToolbarItem(MODEL_ACTION.CreateField.key)
      .click()

    cy.getCuiSidebarViewHeader('State')
      .getCuiToolbarItem(MODEL_ACTION.CreateField.key)
      .click()

    cy.setFormFieldValue({
      label: 'Key',
      type: FIELD_TYPE.INPUT,
      value: storeDescriptionFieldDto({ id: storeApiId }).key,
    })

    cy.setFormFieldValue({
      label: 'Type',
      type: FIELD_TYPE.SELECT,
      value: 'String',
    })

    cy.findByText('Default values').should('exist')

    cy.setFormFieldValue({
      label: 'Nullable',
      type: FIELD_TYPE.TOGGLE,
      value: true,
    })

    cy.getCuiPopover(MODEL_ACTION.CreateField.key)
      .getCuiToolbarItem(MODEL_ACTION.CreateField.key)
      .click()
  })
})
