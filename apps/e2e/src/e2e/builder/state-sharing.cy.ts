import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { FIELD_TYPE } from '@codelab/frontend/test/cypress/antd'
import { NETWORK_IDLE_TIME } from '@codelab/frontend/test/cypress/shared'
import type { App, Component, Page } from '@codelab/shared/abstract/codegen'
import type { IAppDto, IPageDto } from '@codelab/shared/abstract/core'
import {
  IPageKindName,
  IPrimitiveTypeKind,
} from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import { slugify } from '@codelab/shared/utils'
import {
  COMPONENT_NAME,
  componentCreateData,
  regularPageCreateData,
  spaceElement,
  spaceElementName,
  typographyTextElement,
} from './state-sharing.data'

describe('State variables sharing between pages', () => {
  let app: IAppDto
  let page: IPageDto

  before(() => {
    cy.postApiRequest<App>('/app/seed-cypress-app')
      .then(({ body }) => {
        app = body
      })
      .as('cypressApp')

    cy.get('@cypressApp').then(() => {
      return cy
        .postApiRequest<Page>('/page/create-page', regularPageCreateData(app))
        .then(({ body }) => {
          page = body
        })
        .as('cypressPage')
    })

    cy.get('@cypressPage')
      .then(() => {
        return cy.postApiRequest(
          '/component/create-component',
          componentCreateData,
        )
      })
      .as('cypressComponent')

    cy.get<Cypress.Response<Component>>('@cypressComponent').then((result) => {
      const component = result.body

      return cy.postApiRequest(`/element/${component.id}/create-elements`, [
        spaceElement(component.rootElement),
        typographyTextElement,
      ])
    })
  })

  it('should setup the pages that will share states', () => {
    cy.visit(`/components/${slugify(COMPONENT_NAME)}/builder`)

    cy.waitForNetworkIdle(NETWORK_IDLE_TIME)
    cy.waitForSpinners()

    // The UI tree flickers, need this otherwise fails on CI
    cy.getCuiTreeItemByPrimaryTitle(`${COMPONENT_NAME} Root`).should('exist')
    cy.toggleCuiTreeNodeSwitcher(`${COMPONENT_NAME} Root`)

    cy.getCuiTreeItemByPrimaryTitle(spaceElementName).click({})
    cy.getCuiTreeItemByPrimaryTitle(typographyTextElement.name).click({})

    cy.typeIntoTextEditor(
      'text {{ componentProps.name ?? rootState.name ?? state.name }}',
    )

    cy.openPreview().contains('text undefined').should('exist')

    cy.openBuilder()

    // create a state variable inside the component
    cy.getCuiToolbarItem(MODEL_ACTION.CreateField.key).click()
    cy.waitForNetworkIdle(NETWORK_IDLE_TIME)

    cy.setFormFieldValue({
      label: 'Key',
      type: FIELD_TYPE.INPUT,
      value: 'name',
    })

    cy.setFormFieldValue({
      label: 'Type',
      type: FIELD_TYPE.SELECT,
      value: 'String',
    })

    cy.waitForNetworkIdle(NETWORK_IDLE_TIME)

    cy.findByText('Default values').should('exist')

    cy.setFormFieldValue({
      label: 'Default values',
      type: FIELD_TYPE.CODE_MIRROR,
      value: 'component state value',
    })

    cy.getCuiPopover(MODEL_ACTION.CreateField.key)
      .getCuiToolbarItem(MODEL_ACTION.CreateField.key)
      .click()

    cy.waitForNetworkIdle(NETWORK_IDLE_TIME)

    // FIXME: due to the caching of state in the store model, a new state is not being included
    // in the cached state, so we had to reload here for now
    // cy.reload()
    cy.openPreview().contains('text component state value').should('exist')
  })

  /**
   * We'll keep the UI methods for state since we don't have other specs for state
   */
  it('should create a state variable in the provider page', () => {
    // go to the provider page
    cy.visit(
      `/apps/cypress/${slugify(app.name)}/pages/${slugify(
        IPageKindName.Provider,
      )}/builder?primarySidebarKey=explorer`,
    )

    cy.waitForNetworkIdle(NETWORK_IDLE_TIME)

    // select root now so we can update its child later
    // there is an issue with tree interaction
    // Increased timeout since builder may take longer to load
    cy.findByText(ROOT_ELEMENT_NAME).should('be.visible').click({ force: true })

    cy.get('[data-cy="cui-sidebar-view-header-State"]').click()
    cy.getCuiToolbarItem(MODEL_ACTION.CreateField.key).click()

    cy.getCuiForm(MODEL_ACTION.CreateField.key).should('be.visible')

    cy.setFormFieldValue({
      label: 'Key',
      type: FIELD_TYPE.INPUT,
      value: 'name',
    })

    cy.setFormFieldValue({
      label: 'Type',
      type: FIELD_TYPE.SELECT,
      value: IPrimitiveTypeKind.String,
    })

    cy.findByText('Default values').should('exist')

    cy.setFormFieldValue({
      label: 'Default values',
      type: FIELD_TYPE.CODE_MIRROR,
      value: 'provider state value',
    })

    cy.intercept('POST', 'api/graphql').as('createState')
    cy.getCuiPopover(MODEL_ACTION.CreateField.key)
      .getCuiToolbarItem(MODEL_ACTION.CreateField.key)
      .click()
    cy.wait('@createState')
  })

  /**
   * Originally had this spec to use provider state, but component data should be bound and passed in, as opposed to accessing global state.
   */
  it('should use component state and not use provider state', () => {
    // go to the regular page
    // wait for GetRenderedPageAndCommonAppData
    cy.visit(
      '/apps/cypress/codelab-app/pages/test-page/builder?primarySidebarKey=explorer',
    )
    cy.waitForNetworkIdle(NETWORK_IDLE_TIME)

    cy.getCuiTreeItemByPrimaryTitle('Body').click({ force: true })

    cy.createElementTree([
      {
        component: COMPONENT_NAME,
        name: COMPONENT_NAME,
        parentElement: 'Body',
      },
    ])

    cy.waitForNetworkIdle(NETWORK_IDLE_TIME)

    cy.openPreview().contains('text component state value').should('exist')
  })
})
