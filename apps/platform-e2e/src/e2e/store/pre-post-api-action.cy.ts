import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { FIELD_TYPE } from '@codelab/frontend/test/cypress/antd'
import type { IAppDto, IPageDto } from '@codelab/shared/abstract/core'
import { IPageKindName } from '@codelab/shared/abstract/core'
import { slugify } from '@codelab/shared/utils'
import { createResourceData } from '../preview/resource.data'
import {
  postRenderApiActionUrlSegment,
  preRenderApiActionUrlSegment,
  providerPageElement,
  stateKeyPostRender,
  stateKeyPreRender,
} from './pre-post-api-action.data'
import { setupTest } from './pre-post-api-action.setup'

describe('Running API actions that updates state via element pre-render and post-render', () => {
  let app: IAppDto
  let page: IPageDto

  before(() => {
    setupTest()
    cy.get<{ app: IAppDto; page: IPageDto }>('@createdApp').then((res) => {
      app = res.app
      page = res.page
    })
  })

  it('should add the state variables where the api responses will be stored to', () => {
    cy.visit(
      `/apps/cypress/${slugify(app!.name)}/pages/${slugify(
        IPageKindName.Provider,
      )}/builder`,
    )
    cy.getCuiSidebarViewHeader('State').should('exist').click()
    cy.waitForSpinners()

    for (const stateKey of [stateKeyPreRender, stateKeyPostRender]) {
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

  it('should run the pre-render and post-render actions upon reload of the page', () => {
    const preRenderResponse = 'i am from pre-render'
    const postRenderResponse = 'i am from post-render'

    // create the element that will have the hook actions
    cy.postApiRequest<Element>(
      `element/${page.rootElement.id}/create-element`,
      providerPageElement(page),
    ).as('createdProviderElement')
    cy.get('@createdProviderElement')

    cy.intercept(
      `${createResourceData.config.url}${preRenderApiActionUrlSegment}`,
      preRenderResponse,
    ).as('preRenderAction')
    cy.intercept(
      `${createResourceData.config.url}${postRenderApiActionUrlSegment}`,
      postRenderResponse,
    ).as('postRenderAction')

    cy.visit(
      `/apps/cypress/${slugify(app.name)}/pages/${slugify(
        IPageKindName.Provider,
      )}`,
    )

    cy.wait('@preRenderAction').wait('@postRenderAction')
    cy.get('#render-root')
      .contains(
        `pre-render response: "${preRenderResponse}", post-render response: "${postRenderResponse}"`,
      )
      .should('exist')
  })
})
