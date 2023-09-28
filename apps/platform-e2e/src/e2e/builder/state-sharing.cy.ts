import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import type { IAppDTO } from '@codelab/shared/abstract/core'
import { IAtomType, IPageKindName } from '@codelab/shared/abstract/core'
import { slugify } from '@codelab/shared/utils'
import { FIELD_TYPE } from '@codelab/testing/cypress/antd'
import { loginAndSetupData } from '@codelab/testing/cypress/nextjs-auth0'

interface ComponentChildData {
  atom: string
  name: string
}

const COMPONENT_NAME = 'Component Name'

const componentChildren = [
  { atom: IAtomType.AntDesignSpace, name: 'Space' },
  { atom: IAtomType.AntDesignTypographyText, name: 'Typography' },
]

describe('State variables sharing between pages', () => {
  let app: IAppDTO
  before(() => {
    loginAndSetupData()

    cy.request('/api/data/type/seed-cypress-type')

    cy.request('/api/data/atom/seed-cypress-atom')
      .then(() => cy.request<IAppDTO>('/api/data/app/seed-cypress-app'))
      .then((apps) => {
        app = apps.body
      })
  })
  it('should setup the pages that will share states', () => {
    // create regular page where we will test the shared state
    cy.visit(
      `/apps/cypress/${slugify(app.name)}/pages/${slugify(
        IPageKindName.Provider,
      )}/builder?primarySidebarKey=pageList`,
    )
    // GetRenderedPageAndCommonAppData
    cy.waitForApiCalls()
    cy.getSpinner().should('not.exist')

    cy.getCuiSidebar('Pages').getCuiToolbarItem('Create Page').first().click()

    cy.findByTestId('create-page-form').findByLabelText('Name').type('Testpage')

    cy.getCuiPopover('Create Page').getCuiToolbarItem('Create').click()

    // create a component
    cy.visit(
      `/apps/cypress/${slugify(app.name)}/pages/${slugify(
        IPageKindName.Provider,
      )}/builder?primarySidebarKey=components`,
    )
    // GetRenderedPageAndCommonAppData
    cy.waitForApiCalls()
    cy.getSpinner().should('not.exist')

    // GetAtoms
    // GetComponents
    cy.waitForApiCalls()
    cy.getSpinner().should('not.exist')

    cy.getCuiSidebar('Components')
      .getCuiToolbarItem('Add Component')
      .first()
      .click()
    cy.findByTestId('create-component-form')
      .findByLabelText('Name')
      .type(COMPONENT_NAME)

    cy.getCuiPopover('Create Component').getCuiToolbarItem('Create').click()

    cy.findByTestId('create-component-form').should('not.exist', {
      timeout: 10000,
    })
    cy.findByText(COMPONENT_NAME).should('exist')

    // add element to component
    cy.getSider().getButton({ icon: 'edit' }).click()
    cy.wrap(componentChildren).each((child: ComponentChildData) => {
      cy.getCuiTreeItemByPrimaryTitle(`${COMPONENT_NAME} Root`).click()
      cy.getCuiTreeItemByPrimaryTitle(`${COMPONENT_NAME} Root`)
        .getCuiTreeItemToolbar()
        .getCuiToolbarItem('Add Child')
        .click()

      cy.findByTestId('create-element-form').setFormFieldValue({
        label: 'Render Type',
        type: FIELD_TYPE.SELECT,
        value: 'Atom',
      })
      cy.findByTestId('create-element-form').setFormFieldValue({
        label: 'Atom',
        type: FIELD_TYPE.SELECT,
        value: child.atom,
      })
      // need to wait for the code to put the autocomputed name before typing
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1000)
      cy.findByTestId('create-element-form').setFormFieldValue({
        label: 'Name',
        type: FIELD_TYPE.INPUT,
        value: child.name,
      })

      cy.getCuiPopover('Create Element').getCuiToolbarItem('Create').click()

      cy.findByTestId('create-element-form').should('not.exist', {
        timeout: 10000,
      })

      // editorjs fails internally without this, maybe some kind of initialisation - Cannot read properties of undefined (reading 'contains')
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(2000)

      cy.getCuiTreeItemByPrimaryTitle(child.name).click({ force: true })
    })

    cy.typeIntoTextEditor(
      'text {{ componentProps.name ?? rootState.name ?? state.name }}',
    )

    cy.waitForApiCalls()

    cy.openPreview()
    cy.get('#render-root').contains('text undefined').should('exist')
    cy.openBuilder()

    // create a state variable inside the component
    cy.get('[data-cy="codelabui-sidebar-view-header-State"]').click()
    cy.get('[data-cy="codelabui-toolbar-item-Add Field"]').click()

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

    cy.intercept('POST', `api/graphql`).as('action')
    cy.getCuiPopover('Create Field').getCuiToolbarItem('Create').click()
    cy.wait('@action')

    // FIXME: due to the caching of state in the store model, a new state is not being included
    // in the cached state, so we had to reload here for now
    cy.reload()
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
    cy.get('[data-cy="codelabui-sidebar-view-header-State"]').click()
    cy.get('[data-cy="codelabui-toolbar-item-Add Field"]').click()

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

  it('should be able to use the state from the provider page', () => {
    // go to the regular page
    cy.visit(
      `/apps/cypress/codelab-app/pages/testpage/builder?primarySidebarKey=explorer`,
    )
    // GetRenderedPageAndCommonAppData
    cy.waitForApiCalls()
    cy.getSpinner().should('not.exist')

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
