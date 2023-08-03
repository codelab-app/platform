import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import type { IAppDTO } from '@codelab/shared/abstract/core'
import { IAtomType, IPageKindName } from '@codelab/shared/abstract/core'
import { slugify } from '@codelab/shared/utils'
import { FIELD_TYPE } from '../../support/antd/form'
import { loginSession } from '../../support/nextjs-auth0/commands/login'

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
  before(() => {
    cy.resetDatabase()
    loginSession()

    cy.request('/api/cypress/type')

    cy.request('/api/cypress/atom')
      .then(() => cy.request<IAppDTO>('/api/cypress/app'))
      .then((apps) => {
        const app = apps.body

        // create regular page where we will test the shared state
        cy.visit(
          `/apps/cypress/${slugify(app.name)}/pages/${slugify(
            IPageKindName.Provider,
          )}/builder?primarySidebarKey=pageList`,
        )
        // GetRenderedPageAndCommonAppData
        cy.waitForApiCalls()
        cy.getSpinner().should('not.exist')

        cy.getCuiSidebar('Pages').getToolbarItem('Create Page').first().click()

        cy.findByTestId('create-page-form')
          .findByLabelText('Name')
          .type('Testpage')
        cy.findByTestId('create-page-form')
          .getButton({ label: 'Create Page' })
          .click()

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
          .getToolbarItem('Add Component')
          .first()
          .click()
        cy.findByTestId('create-component-form')
          .findByLabelText('Name')
          .type(COMPONENT_NAME)
        cy.findByTestId('create-component-form')
          .getButton({ label: 'Create Component' })
          .click()
        cy.findByTestId('create-component-form').should('not.exist', {
          timeout: 10000,
        })
        cy.findByText(COMPONENT_NAME).should('exist')

        // add element to component
        cy.getSider().getButton({ icon: 'edit' }).click()
        cy.wrap(componentChildren).each((child: ComponentChildData) => {
          cy.getCuiTreeItemByPrimaryTitle(COMPONENT_NAME).trigger('contextmenu')

          cy.contains(/Add child/).click({ force: true })
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
          cy.findByTestId('create-element-form').setFormFieldValue({
            label: 'Name',
            type: FIELD_TYPE.INPUT,
            value: child.name,
          })
          cy.findByTestId('create-element-form')
            .getButton({ label: 'Create Element' })
            .click()
          cy.findByTestId('create-element-form').should('not.exist', {
            timeout: 10000,
          })
          cy.getCuiTreeItemByPrimaryTitle(child.name).click({ force: true })
        })

        cy.get(`.ant-tabs [aria-label="setting"]`).click()
        cy.get('.ant-tabs-tabpane-active form .ql-editor').type(
          'text {{ props.name ?? rootState.name ?? state.name }}',
          { parseSpecialCharSequences: false },
        )

        cy.get('#render-root').findByText('text undefined').should('exist')

        // create a state variable inside the component
        cy.get('[data-cy="codelabui-sidebar-view-header-State"]').click()
        cy.get('[data-cy="codelabui-toolbar-item-Add Field"]').click()

        cy.get(
          '[data-cy="codelabui-sidebar-view-content-State"]',
        ).setFormFieldValue({
          label: 'Key',
          type: FIELD_TYPE.INPUT,
          value: 'name',
        })

        cy.get(
          '[data-cy="codelabui-sidebar-view-content-State"]',
        ).setFormFieldValue({
          label: 'Type',
          type: FIELD_TYPE.SELECT,
          value: 'String',
        })

        cy.findByText('Default values').should('exist')

        cy.get(
          '[data-cy="codelabui-sidebar-view-content-State"]',
        ).setFormFieldValue({
          label: 'Default values',
          type: FIELD_TYPE.CODE_MIRROR,
          value: 'component state value',
        })

        cy.get('[data-cy="codelabui-sidebar-view-content-State"]')
          .getButton({ label: 'Create Field' })
          .click()

        cy.get('#render-root')
          .findByText('text component state value')
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
  })

  it('should create a state variable in the provider page', () => {
    cy.get('[data-cy="codelabui-sidebar-view-header-State"]').click()
    cy.get('[data-cy="codelabui-toolbar-item-Add Field"]').click()

    cy.get(
      '[data-cy="codelabui-sidebar-view-content-State"]',
    ).setFormFieldValue({
      label: 'Key',
      type: FIELD_TYPE.INPUT,
      value: 'name',
    })

    cy.get(
      '[data-cy="codelabui-sidebar-view-content-State"]',
    ).setFormFieldValue({
      label: 'Type',
      type: FIELD_TYPE.SELECT,
      value: 'String',
    })

    cy.get(
      '[data-cy="codelabui-sidebar-view-content-State"]',
    ).setFormFieldValue({
      label: 'Default values',
      type: FIELD_TYPE.CODE_MIRROR,
      value: 'provider state value',
    })

    cy.get('[data-cy="codelabui-sidebar-view-content-State"]')
      .getButton({ label: 'Create Field' })
      .click()
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

    cy.getCuiSidebar('Explorer').getToolbarItem('Add Element').first().click()

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

    cy.findByTestId('create-element-form').setFormFieldValue({
      label: 'Name',
      type: FIELD_TYPE.INPUT,
      value: COMPONENT_NAME,
    })

    cy.findByTestId('create-element-form')
      .getButton({ label: 'Create Element' })
      .click()

    cy.findByTestId('create-element-form').should('not.exist', {
      timeout: 10000,
    })

    cy.get('#render-root')
      .findByText('text provider state value')
      .should('exist')
  })
})
