import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import type { IAppDTO } from '@codelab/shared/abstract/core'
import { IAtomType, IPageKindName } from '@codelab/shared/abstract/core'
import { slugify } from '@codelab/shared/utils'
import { FIELD_TYPE } from '../support/antd/form'
import { loginSession } from '../support/nextjs-auth0/commands/login'

interface ComponentChildData {
  atom: string
  name: string
}

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

const componentChildren = [
  { atom: IAtomType.AntDesignSpace, name: 'Space' },
  { atom: IAtomType.AntDesignTypographyText, name: 'Typography' },
]

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

        // Should run after each
        cy.get(`.ant-tabs [aria-label="setting"]`).click()
        cy.get('.ant-tabs-tabpane-active form .ql-editor').type(
          'text {{ props.name }}',
          { parseSpecialCharSequences: false },
        )
        cy.get('#render-root').findByText('text undefined').should('exist')

        // go to builder
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
      {
        name: 'Child 1',
        parentElement: ELEMENT_ROW,
      },
      {
        name: 'Child 2',
        parentElement: ELEMENT_ROW,
      },
    ])
    cy.findAllByText(ELEMENT_ROW).first().click()
    cy.findByText('Child Mapper').click()
    cy.get('.ant-collapse').setFormFieldValue({
      label: 'Render next to',
      type: FIELD_TYPE.SELECT,
      value: 'Child 2',
    })
    cy.get('.ant-collapse').findByRole('button', { name: 'JS' }).click()
    cy.get('.ant-collapse').setFormFieldValue({
      type: FIELD_TYPE.CODE_MIRROR,
      value: '{{[{ name: "test 1" }, { name: "test 2" }]}}',
    })
    cy.get('.ant-collapse').setFormFieldValue({
      label: 'Component',
      type: FIELD_TYPE.SELECT,
      value: COMPONENT_NAME,
    })
  })

  it('should render the component instances with props values from array', () => {
    cy.get('#render-root').findByText('text test 1').should('exist')
    cy.get('#render-root').findByText('text test 2').should('exist')
  })

  it('should render the component instances n times and next to the selected previous sibling', () => {
    cy.get('.ant-tree-treenode-draggable:nth-child(3)')
      .findByText('Child 2')
      .should('exist')
    cy.get('.ant-tree-treenode-draggable:nth-child(4)')
      .findByText(`${COMPONENT_NAME} 0`)
      .should('exist')
    cy.get('.ant-tree-treenode-draggable:nth-child(5)')
      .findByText(`${COMPONENT_NAME} 1`)
      .should('exist')
    cy.get('.ant-tree-treenode-draggable:nth-child(6)')
      .findByText('Child 1')
      .should('exist')
  })

  it('should update the rendered instances when props values from array and previous sibling is updated', () => {
    cy.get('.ant-collapse').setFormFieldValue({
      label: 'Render next to',
      type: FIELD_TYPE.SELECT,
      value: 'Child 1',
    })
    cy.get('.ant-collapse').setFormFieldValue({
      type: FIELD_TYPE.CODE_MIRROR,
      value: '{{[{ name: "updated test 1" }, { name: "updated test 2" }]}}',
    })

    // changed props
    cy.get('#render-root').findByText('text updated test 1').should('exist')
    cy.get('#render-root').findByText('text updated test 2').should('exist')

    // For some reason, when the prop is auto updated from the form, theres some delay in the tree view changes
    // and the element node being queried still has the old value
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000)

    // changed order
    cy.get('.ant-tree-treenode-draggable:nth-child(3)')
      .findByText('Child 2')
      .should('exist')
    cy.get('.ant-tree-treenode-draggable:nth-child(4)')
      .findByText('Child 1')
      .should('exist')
    cy.get('.ant-tree-treenode-draggable:nth-child(5)')
      .findByText(`${COMPONENT_NAME} 0`)
      .should('exist')
    cy.get('.ant-tree-treenode-draggable:nth-child(6)')
      .findByText(`${COMPONENT_NAME} 1`)
      .should('exist')
  })

  it('should not render instances when the prop arrary is empty', () => {
    cy.get('.ant-collapse').setFormFieldValue({
      type: FIELD_TYPE.CODE_MIRROR,
      value: '{{[]}}',
    })

    // rendered instances are removed
    cy.get('.ant-tree-treenode-draggable').should('have.length', 4)

    // changed props
    cy.get('#render-root').findByText('text updated test 1').should('not.exist')
    cy.get('#render-root').findByText('text updated test 2').should('not.exist')
  })

  it('should not render instances when the prop is not an array', () => {
    cy.get('.ant-collapse').setFormFieldValue({
      type: FIELD_TYPE.CODE_MIRROR,
      value: '{{false}}',
    })

    // rendered instances are removed
    cy.get('.ant-tree-treenode-draggable').should('have.length', 4)

    // changed props
    cy.get('#render-root').findByText('text updated test 1').should('not.exist')
    cy.get('#render-root').findByText('text updated test 2').should('not.exist')
  })
})
