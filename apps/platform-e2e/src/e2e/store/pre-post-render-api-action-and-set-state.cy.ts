import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { FIELD_TYPE } from '@codelab/frontend/test/cypress/antd'
import type { App } from '@codelab/shared/abstract/codegen'
import type {
  IApiActionDto,
  IAppDto,
  ICodeActionDto,
  IPageDto,
  IResourceDto,
} from '@codelab/shared/abstract/core'
import { IPageKind, IPageKindName } from '@codelab/shared/abstract/core'
import { findOrFail, slugify } from '@codelab/shared/utils'
import { createResourceData } from '../preview/resource.data'
import {
  postRenderApiActionCreateData,
  postRenderApiActionUrlSegment,
  postRenderCodeActionCreateData,
  preRenderApiActionCreateData,
  preRenderApiActionUrlSegment,
  preRenderCodeActionCreateData,
  providerPageElement,
  stateKeyPostRender,
  stateKeyPreRender,
} from './pre-post-render-api-action-and-set-state.data'

let app: IAppDto
let page: IPageDto

const setupTest = () => {
  cy.postApiRequest<App>('/app/seed-cypress-app')
    .then(({ body }) => {
      app = body
      page = findOrFail(app.pages, (_page) => _page.kind === IPageKind.Provider)

      cy.wrap(page).should('have.property', 'store')

      return cy.wrap(app)
    })
    .as('createdApp')

  cy.get('@createdApp').then(() =>
    cy
      .postApiRequest<IResourceDto>(
        '/resource/create-resource',
        createResourceData,
      )
      .as('createdResource'),
  )

  cy.get('@createdResource')
    .then(() =>
      cy.postApiRequest<ICodeActionDto>(
        '/action/create-action',
        preRenderCodeActionCreateData(page),
      ),
    )
    .as('createdPreRenderCodeAction')

  cy.get('@createdPreRenderCodeAction')
    .then(() =>
      cy.postApiRequest<IApiActionDto>(
        '/action/create-action',
        preRenderApiActionCreateData(page),
      ),
    )
    .as('createdPreRenderApiAction')

  cy.get('@createdPreRenderApiAction')
    .then(() =>
      cy.postApiRequest<ICodeActionDto>(
        '/action/create-action',
        postRenderCodeActionCreateData(page),
      ),
    )
    .as('createdPostRenderCodeAction')

  cy.get('@createdPostRenderCodeAction')
    .then(() =>
      cy.postApiRequest<IApiActionDto>(
        '/action/create-action',
        postRenderApiActionCreateData(page),
      ),
    )
    .as('createdPostRenderApiAction')

  cy.get('@createdPostRenderApiAction').then(() =>
    cy.visit(
      `/apps/cypress/${slugify(app.name)}/pages/${slugify(
        IPageKindName.Provider,
      )}/builder`,
    ),
  )
}

describe('Running API actions that updates state via element pre-render and post-render', () => {
  before(() => {
    setupTest()
  })

  it('should add the state variables where the api responses will be stored to', () => {
    cy.getCuiSidebarViewHeader('State').should('exist').click()
    cy.waitForSpinners()

    for (const stateKey of [stateKeyPreRender, stateKeyPostRender]) {
      cy.getCuiSidebarViewHeader('State').getCuiToolbarItem('Add Field').click()

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
        .getCuiToolbarItem('Create')
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
