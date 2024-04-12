import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { FIELD_TYPE } from '@codelab/frontend/test/cypress/antd'
import type { IAppDto } from '@codelab/shared/abstract/core'
import { IPageKindName } from '@codelab/shared/abstract/core'
import { slugify } from '@codelab/shared/utils'
import { stateKey1, stateKey2 } from './actions-inside-code-actions.data'
import { setupTest } from './actions-inside-code-actions.setup'
import { createResourceData, urlSegment } from './resource.data'

describe('Running actions inside code action with arguments', () => {
  let app: IAppDto

  before(() => {
    setupTest()
    cy.get<{ app: IAppDto }>('@setupComplete').then((res) => {
      app = res.app
    })
  })

  it('should create states', () => {
    cy.visit(
      `/apps/cypress/${slugify(app.name)}/pages/${slugify(
        IPageKindName.Provider,
      )}/builder`,
    )
    cy.getCuiSidebarViewHeader('State').should('exist').click()
    cy.waitForSpinners()

    for (const stateKey of [stateKey1, stateKey2]) {
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

      cy.intercept('POST', 'api/graphql').as(`create${stateKey}`)
      cy.getCuiPopover(MODEL_ACTION.CreateField.key)
        .getCuiToolbarItem(MODEL_ACTION.CreateField.key)
        .click()
      cy.wait(`@create${stateKey}`)
    }
  })

  it('should run the code action that calls another code action and an API action with arguments when the button is clicked', () => {
    cy.intercept('POST', `${createResourceData.config.url}${urlSegment}`, {
      statusCode: 200,
    }).as('apiAction')

    cy.visit(
      `/apps/cypress/${slugify(app.name)}/pages/${slugify(
        IPageKindName.Provider,
      )}`,
    )

    cy.get('#render-root').findByText('Click button to run actions').click()

    cy.wait('@apiAction').its('request.body').should('deep.equal', {
      firstArg: 'yo',
      secondArg: 456,
    })

    cy.get('#render-root').contains(`${stateKey1} - hey, ${stateKey2} - 123`)
  })
})
