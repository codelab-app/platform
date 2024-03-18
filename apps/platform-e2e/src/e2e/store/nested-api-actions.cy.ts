import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { FIELD_TYPE } from '@codelab/frontend/test/cypress/antd'
import type { IAppDto } from '@codelab/shared/abstract/core'
import { IPageKindName } from '@codelab/shared/abstract/core'
import { slugify } from '@codelab/shared/utils'
import {
  apiGetActionUrlSegment,
  apiPostActionUrlSegment,
  stateKey,
} from './nested-api-actions.data'
import { setupTest } from './nested-api-actions.setup'
import { createResourceData } from './resource.data'

describe('Running nested API and code actions', () => {
  let app: IAppDto

  before(() => {
    setupTest()
    cy.get<{ app: IAppDto }>('@setupComplete').then((res) => {
      app = res.app
    })
  })

  it('should create a state that will be updated by the success/error code action', () => {
    cy.visit(
      `/apps/cypress/${slugify(app.name)}/pages/${slugify(
        IPageKindName.Provider,
      )}/builder`,
    )
    cy.getCuiSidebarViewHeader('State').should('exist').click()
    cy.waitForSpinners()

    cy.getCuiSidebarViewHeader('State')
      .getCuiToolbarItem(MODEL_ACTION.CreateField.key)
      .click()

    cy.setFormFieldValue({
      label: 'Key',
      type: FIELD_TYPE.INPUT,
      value: stateKey,
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

  it('should run the POST api, GET api, and success code action when the button is clicked', () => {
    cy.visit(
      `/apps/cypress/${slugify(app.name)}/pages/${slugify(
        IPageKindName.Provider,
      )}`,
    )
    cy.get('#render-root')
      .contains('response from api - undefined')
      .should('exist')

    cy.intercept(
      'POST',
      `${createResourceData.config.url}${apiPostActionUrlSegment}`,
      {
        statusCode: 200,
      },
    ).as('createData')
    cy.intercept(
      'GET',
      `${createResourceData.config.url}${apiGetActionUrlSegment}`,
      {
        statusCode: 200,
      },
    ).as('getData')

    cy.get('#render-root')
      .findByText('Click button to post')
      .click({ force: true })

    cy.wait('@createData')
    cy.wait('@getData')

    cy.get('#render-root')
      .contains('response from api - success')
      .should('exist')
  })

  it('should run the error code action when the GET api fails', () => {
    cy.intercept(
      'POST',
      `${createResourceData.config.url}${apiPostActionUrlSegment}`,
      {
        statusCode: 200,
      },
    ).as('createData')
    cy.intercept(
      'GET',
      `${createResourceData.config.url}${apiGetActionUrlSegment}`,
      {
        statusCode: 400,
      },
    ).as('getData')

    // cy.intercept('POST', `${createResourceData.config.url}${urlPostSegment}`, {
    //   statusCode: 200,
    // }).as('updateData')

    // cy.intercept(
    //   'GET',
    //   `${createResourceData.config.url}${urlGetSegment}`,
    //   mockGetResponse,
    // ).as('getData')

    cy.get('#render-root')
      .findByText('Click button to post')
      .click({ force: true })

    cy.wait('@createData')
    cy.wait('@getData')

    cy.get('#render-root').contains('response from api - error').should('exist')
  })
})
