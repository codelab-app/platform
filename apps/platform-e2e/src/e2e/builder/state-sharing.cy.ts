import { FIELD_TYPE } from '@codelab/frontend/test/cypress/antd'
import type { Component } from '@codelab/shared/abstract/codegen'
import type {
  IAppDto,
  ICreateComponentData,
  ICreatePageDto,
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

  before(() => {
    cy.postApiRequest<IAppDto>('/app/seed-cypress-app')
      .then((apps) => {
        app = apps.body
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
        .postApiRequest('/page/create-page', createPageDto)
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

    // Deselect from Editorjs
    cy.getCuiTreeItemByPrimaryTitle('Body').click({
      force: true,
    })
    cy.waitForApiCalls()

    cy.openPreview()
    cy.get('#render-root').contains('text undefined').should('exist')
    cy.openBuilder()

    // create a state variable inside the component
    // cy.get('[data-cy="cui-sidebar-view-header-State"]').click()
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
    cy.getCuiPopover('Create Field').getCuiToolbarItem('Create').click()
    cy.wait('@action')

    // FIXME: due to the caching of state in the store model, a new state is not being included
    // in the cached state, so we had to reload here for now
    // cy.reload()
    cy.openPreview()
    cy.get('#render-root')
      .contains('text component state value')
      .should('exist')

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

    cy.intercept('POST', `api/graphql`).as('createState')
    cy.getCuiPopover('Create Field').getCuiToolbarItem('Create').click()
    cy.wait('@createState')
  })

  it.skip('should be able to use the state from the provider page', () => {
    // go to the regular page
    cy.visit(
      `/apps/cypress/codelab-app/pages/testpage/builder?primarySidebarKey=explorer`,
    )
    // GetRenderedPageAndCommonAppData
    cy.waitForApiCalls()
    cy.waitForSpinners()

    cy.getCuiTreeItemByPrimaryTitle('Body').click({ force: true })

    cy.getCuiSidebar('Explorer')
      .getCuiToolbarItem('Add Element')
      .first()
      .click()

    cy.findByTestId('create-element-form').setFormFieldValue({
      label: 'Render Type',
      type: FIELD_TYPE.SELECT,
      value: 'Component',
    })
    cy.findByTestId('create-element-form').setFormFieldValue({
      label: 'Component',
      type: FIELD_TYPE.SELECT,
      value: COMPONENT_NAME,
    })
    // need to wait for the code to put the autocomputed name before typing
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000)

    cy.findByTestId('create-element-form').setFormFieldValue({
      label: 'Name',
      type: FIELD_TYPE.INPUT,
      value: COMPONENT_NAME,
    })

    cy.intercept('POST', `api/graphql`).as('createElement')
    cy.getCuiPopover('Create Element').getCuiToolbarItem('Create').click()
    cy.wait('@createElement')

    cy.findByTestId('create-element-form').should('not.exist', {
      timeout: 10000,
    })

    // FIXME: due to the caching of state in the store model, a new state is not being included
    // in the cached state, so we had to reload here for now
    cy.reload()
    cy.openPreview()
    cy.get('#render-root').contains('text provider state value').should('exist')
  })
})
