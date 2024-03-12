import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { FIELD_TYPE } from '@codelab/frontend/test/cypress/antd'
import type { App, Component, Page } from '@codelab/shared/abstract/codegen'
import type {
  IAppDto,
  ICreateComponentData,
  ICreateElementData,
  ICreatePageDto,
  IPageDto,
} from '@codelab/shared/abstract/core'
import {
  IAtomType,
  IPageKind,
  IPageKindName,
} from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import { slugify } from '@codelab/shared/utils'
import { v4 } from 'uuid'
import type { ComponentChildData } from './components.data'
import {
  COMPONENT_NAME,
  componentChildren,
  spaceElement,
  spaceElementName,
  typographyTextElement,
} from './components.data'

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
      const createPageDto: ICreatePageDto = {
        app,
        id: v4(),
        kind: IPageKind.Regular,
        name: 'Test Page',
        url: 'test-page',
      }

      return cy
        .postApiRequest<Page>('/page/create-page', createPageDto)
        .then(({ body }) => {
          page = body
        })
        .as('cypressPage')
    })

    cy.get('@cypressPage')
      .then(() => {
        const createComponentData: ICreateComponentData = {
          id: v4(),
          name: COMPONENT_NAME,
        }

        return cy.postApiRequest(
          '/component/create-component',
          createComponentData,
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
    cy.visit(
      `/apps/cypress/${slugify(app.name)}/components/${slugify(
        COMPONENT_NAME,
      )}/builder?primarySidebarKey=explorer`,
    )

    cy.waitForSpinners()

    // editorjs fails internally without this, maybe some kind of initialization - Cannot read properties of undefined (reading 'contains')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000)

    cy.getCuiTreeItemByPrimaryTitle(spaceElementName).click({
      force: true,
    })
    cy.getCuiTreeItemByPrimaryTitle(typographyTextElement.name).click({
      force: true,
    })

    cy.typeIntoTextEditor(
      'text {{ componentProps.name ?? rootState.name ?? state.name }}',
    )

    cy.waitForApiCalls()

    cy.openPreview().contains('text undefined').should('exist')
    cy.openBuilder()

    // create a state variable inside the component
    cy.getCuiToolbarItem('Add Field').click()

    cy.waitForApiCalls()

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

    cy.findByText('Default values').should('exist')

    cy.setFormFieldValue({
      label: 'Default values',
      type: FIELD_TYPE.CODE_MIRROR,
      value: 'component state value',
    })

    cy.intercept('POST', 'api/graphql').as('action')
    cy.getCuiPopover(MODEL_ACTION.CreateField.key)
      .getCuiToolbarItem('Create')
      .click()
    cy.wait('@action')

    // FIXME: due to the caching of state in the store model, a new state is not being included
    // in the cached state, so we had to reload here for now
    // cy.reload()
    cy.openPreview().contains('text component state value').should('exist')

    // go to the provider page
    cy.visit(
      `/apps/cypress/${slugify(app.name)}/pages/${slugify(
        IPageKindName.Provider,
      )}/builder?primarySidebarKey=explorer`,
    )

    // select root now so we can update its child later
    // there is an issue with tree interaction
    // Increased timeout since builder may take longer to load
    cy.findByText(ROOT_ELEMENT_NAME, { timeout: 30000 })
      .should('be.visible')
      .click({ force: true })
  })

  /**
   * We'll keep the UI methods for state since we don't have other specs for state
   */
  it('should create a state variable in the provider page', () => {
    cy.get('[data-cy="cui-sidebar-view-header-State"]').click()
    cy.getCuiToolbarItem('Add Field').click()

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

    cy.findByText('Default values').should('exist')

    cy.setFormFieldValue({
      label: 'Default values',
      type: FIELD_TYPE.CODE_MIRROR,
      value: 'provider state value',
    })

    cy.intercept('POST', 'api/graphql').as('createState')
    cy.getCuiPopover(MODEL_ACTION.CreateField.key)
      .getCuiToolbarItem('Create')
      .click()
    cy.wait('@createState')
  })

  it("should respect provider state's precedence over component state", () => {
    // go to the regular page
    cy.visit(
      '/apps/cypress/codelab-app/pages/test-page/builder?primarySidebarKey=explorer',
    )
    // GetRenderedPageAndCommonAppData
    cy.waitForApiCalls()
    cy.waitForSpinners()

    cy.getCuiTreeItemByPrimaryTitle('Body').click({ force: true })

    const createElementData: ICreateElementData = {
      component: COMPONENT_NAME,
      id: v4(),
      name: COMPONENT_NAME,
      parentElement: { id: page.rootElement.id },
    }

    cy.postApiRequest(
      `element/${page.id}/create-element`,
      createElementData,
    ).as('cypressElement')

    // FIXME: due to the caching of state in the store model, a new state is not being included
    // in the cached state, so we had to reload here for now
    cy.get('@cypressElement').reload()
    cy.openPreview().contains('text provider state value').should('exist')
  })
})
