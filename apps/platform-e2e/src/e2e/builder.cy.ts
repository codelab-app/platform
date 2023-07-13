import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import type { IAppDTO } from '@codelab/shared/abstract/core'
import { IAtomType, IPageKindName } from '@codelab/shared/abstract/core'
import { slugify } from '@codelab/shared/utils'
import { FIELD_TYPE } from '../support/antd/form'
import { loginSession } from '../support/nextjs-auth0/commands/login'

const COMPONENT_NAME = 'Component Name'
const ELEMENT_CONTAINER = 'Container'
const ELEMENT_ROW = 'Row'
const ELEMENT_COL_A = 'Col A'
const ELEMENT_COL_B = 'Col B'
const ELEMENT_TEXT_1 = 'Text 1'
const ELEMENT_TEXT_2 = 'Text 2'
const ELEMENT_BUTTON = 'Button'

const elements = [
  {
    name: ELEMENT_CONTAINER,
    parentElement: ROOT_ELEMENT_NAME,
  },
  {
    name: ELEMENT_ROW,
    parentElement: ELEMENT_CONTAINER,
  },
  {
    atom: IAtomType.AntDesignGridCol,
    name: ELEMENT_COL_A,
    parentElement: ELEMENT_ROW,
  },
  {
    atom: IAtomType.AntDesignGridCol,
    name: ELEMENT_COL_B,
    parentElement: ELEMENT_ROW,
  },
  {
    atom: IAtomType.AntDesignTypographyText,
    name: ELEMENT_TEXT_1,
    parentElement: ELEMENT_COL_A,
  },
  {
    atom: IAtomType.AntDesignButton,
    name: ELEMENT_BUTTON,
    parentElement: ELEMENT_COL_B,
  },
  {
    atom: IAtomType.AntDesignTypographyText,
    name: ELEMENT_TEXT_2,
    parentElement: ELEMENT_BUTTON,
  },
]

const updatedElementName = 'Container Updated'

describe('Elements CRUD', () => {
  before(() => {
    cy.resetDatabase()
    loginSession()

    cy.request('/api/cypress/atom')
      .then(() => cy.request<IAppDTO>('/api/cypress/app'))
      .then((apps) => {
        const app = apps.body
        cy.visit(
          `/apps/cypress/${slugify(app.name)}/pages/${slugify(
            IPageKindName.Provider,
          )}/builder`,
        )
        cy.getSpinner().should('not.exist')

        // select root now so we can update its child later
        // there is an issue with tree interaction
        // Increased timeout since builder may take longer to load
        cy.findByText(ROOT_ELEMENT_NAME, { timeout: 30000 })
          .should('be.visible')
          .click({ force: true })
      })
  })

  describe('create', () => {
    it('should be able to create elements', () => {
      cy.createElementTree(elements)
    })

    it.skip('should be able to view props', () => {
      cy.getCuiSidebar('Explorer').getToolbarItem('Add Element').click()

      cy.findByTestId('create-element-form')
        .findByLabelText('Name')
        .type(ELEMENT_TEXT_1)

      cy.findByTestId('create-element-form').setFormFieldValue({
        label: 'Parent element',
        type: FIELD_TYPE.SELECT,
        value: ROOT_ELEMENT_NAME,
      })

      cy.findByTestId('create-element-form').setFormFieldValue({
        label: 'Atom',
        type: FIELD_TYPE.SELECT,
        value: IAtomType.AntDesignTypographyText,
      })

      cy.findByTestId('create-element-form')
        .getButton({ label: 'Create Element' })
        .click()
      cy.findByTestId('create-element-form').should('not.exist', {
        timeout: 10000,
      })

      cy.contains(/Text.*/).click()

      cy.get(`[aria-label="setting"]`).click()

      cy.findByText('Custom Text').should('exist')
      cy.findByText(/Edit.*API/).should('exist')
    })
  })

  describe('update', () => {
    it(`should be able to update element`, () => {
      cy.findByText(ELEMENT_CONTAINER).click()
      cy.findByLabelText('Name').clear()
      cy.findByLabelText('Name').type(updatedElementName)
      cy.findByText(updatedElementName).should('exist')
    })
  })

  describe('delete', () => {
    it(`should be able to delete element sub tree`, () => {
      cy.findByText(updatedElementName).rightclick()
      cy.contains(/Delete/).click({ force: true })
      cy.getSpinner().should('not.exist')

      cy.getModal()
        .getModalAction(/Delete/)
        .click()
      cy.getModal().should('not.exist')

      cy.findByText(updatedElementName).should('not.exist')
    })
  })
})

describe('Element Child Mapper', () => {
  before(() => {
    cy.resetDatabase()
    loginSession()

    cy.request('/api/cypress/type')

    cy.request('/api/cypress/atom')
      .then(() => cy.request<IAppDTO>('/api/cypress/app'))
      .then((apps) => {
        const app = apps.body
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

        cy.getCuiSidebar('Components').getToolbarItem('Add Component').click()
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
        cy.visit(
          `/apps/cypress/${slugify(app.name)}/pages/${slugify(
            IPageKindName.Provider,
          )}/builder?primarySidebarKey=explorer`,
        )
        cy.getSpinner().should('not.exist')

        // select root now so we can update its child later
        // there is an issue with tree interaction
        // Increased timeout since builder may take longer to load
        cy.findByText(ROOT_ELEMENT_NAME, { timeout: 30000 })
          .should('be.visible')
          .click({ force: true })
      })
  })

  it('should create an AntDesignRow element and add child mapper data', () => {
    cy.createElementTree([
      {
        name: ELEMENT_ROW,
        parentElement: ROOT_ELEMENT_NAME,
      },
    ])
    cy.findByText(ELEMENT_ROW).click()
    cy.findByText('Child Mapper').click()
    cy.get('.ant-collapse').setFormFieldValue({
      label: 'Component',
      type: FIELD_TYPE.SELECT,
      value: COMPONENT_NAME,
    })
    cy.get('.ant-collapse').findByRole('button', { name: 'JS' }).click()
    cy.get('.ant-collapse').setFormFieldValue({
      // label: 'Prop Key',
      type: FIELD_TYPE.CODE_MIRROR,
      value: '{{state.arrayProp}}',
    })
    // cy.findByText(updatedElementName).should('exist')
  })
})
