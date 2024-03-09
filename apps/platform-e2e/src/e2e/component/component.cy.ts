import { FIELD_TYPE } from '@codelab/frontend/test/cypress/antd'
import type { IAppDto } from '@codelab/shared/abstract/core'
import { IAtomType, IPrimitiveTypeKind } from '@codelab/shared/abstract/core'
import { prettifyForConsole, slugify } from '@codelab/shared/utils'

const COMPONENT_NAME = 'Component Name'
const COMPONENT_INSTANCE_NAME = 'Component Instance'
const COMPONENT_PROP_NAME = 'component_prop'
const COMPONENT_PROP_VALUE = 'component_prop_value'
const COMPONENT_CHILD_SPACE = 'Space'
const COMPONENT_CHILD_TYPOGRAPHY = 'Typography'
const COMPONENT_CHILD_TEXT = `text {{this.${COMPONENT_PROP_NAME}}}`
const COMPONENT_INSTANCE_TEXT = 'Instance Text'
const PAGE_NAME = '_app'

interface ComponentChildData {
  atom: string
  name: string
}

const componentChildren: Array<ComponentChildData> = [
  { atom: IAtomType.AntDesignSpace, name: COMPONENT_CHILD_SPACE },
  { atom: IAtomType.AntDesignTypographyText, name: COMPONENT_CHILD_TYPOGRAPHY },
]

let testApp: any
let app: IAppDto

describe('Component CRUD', () => {
  describe('Add component', () => {
    before(() => {
      cy.postApiRequest<IAppDto>('/app/seed-cypress-app').then((apps) => {
        app = apps.body
      })
    })
    it('should be able to add a new component', () => {
      cy.visit(
        `/apps/cypress/${slugify(app.name)}/pages/${slugify(
          PAGE_NAME,
        )}/builder?primarySidebarKey=components`,
      )
      // GetRenderedPageAndCommonAppData
      cy.waitForApiCalls()
      cy.waitForSpinners()

      // GetAtoms
      // GetComponents
      cy.waitForApiCalls()
      cy.waitForSpinners()

      cy.log('my app', prettifyForConsole(testApp))
      cy.getCuiSidebar('Components').getCuiToolbarItem('Add Component').click()
      cy.findByTestId('create-component-form')
        .findByLabelText('Name')
        .type(COMPONENT_NAME)
      cy.intercept('POST', `api/graphql`).as('createComponent')
      cy.getCuiPopover('Create Component').getCuiToolbarItem('Create').click()
      cy.wait('@createComponent')
      cy.findByTestId('create-component-form').should('not.exist', {
        timeout: 10000,
      })
      cy.findByText(COMPONENT_NAME).should('exist')
    })

    it('should be able to define property on component', () => {
      cy.getSider().getButton({ icon: 'edit' }).click()
      cy.getCuiTreeItemByPrimaryTitle(`${COMPONENT_NAME} Root`).should(
        'be.visible',
      )
      cy.waitForSpinners()
      cy.get(`.ant-tabs [aria-label="setting"]`).click()
      cy.get('.ant-tabs-tabpane-active').contains(/Add/).click()
      cy.getModal().setFormFieldValue({
        label: 'Key',
        value: COMPONENT_PROP_NAME,
      })
      cy.getModal().setFormFieldValue({
        label: 'Type',
        type: FIELD_TYPE.SELECT,
        value: IPrimitiveTypeKind.String,
      })
      cy.getModal().setFormFieldValue({
        label: 'Nullable',
        type: FIELD_TYPE.TOGGLE,
        value: true,
      })
      cy.getModal()
        .getModalAction(/Create/)
        .click()
      cy.getModal().should('not.exist', { timeout: 10000 })
    })

    it('should be able to add elements to the component', () => {
      /**
       * TODO(@nx/cypress): Nesting Cypress commands in a should assertion now throws.
       * You should use .then() to chain commands instead.
       * More Info: https://docs.cypress.io/guides/references/migration-guide#-should
       * */
      cy.wrap(componentChildren).each((child: ComponentChildData) => {
        cy.getCuiTreeItemByPrimaryTitle(`${COMPONENT_NAME} Root`).click()
        cy.getCuiTreeItemByPrimaryTitle(`${COMPONENT_NAME} Root`)
          .getCuiTreeItemToolbar()
          .getCuiToolbarItem('Add Child')
          .click()

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

        // editorjs fails internally without this, maybe some kind of initialization - Cannot read properties of undefined (reading 'contains')
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(2000)
        cy.getCuiTreeItemByPrimaryTitle(child.name).click({ force: true })
      })

      cy.typeIntoTextEditor(COMPONENT_CHILD_TEXT)

      cy.waitForApiCalls()

      cy.openPreview()
      cy.get('#render-root').contains('text undefined').should('exist')
    })

    it('should be able to specify where to render component children', () => {
      cy.visit(
        `/apps/cypress/${slugify(app.name)}/pages/${slugify(
          PAGE_NAME,
        )}/builder?primarySidebarKey=components`,
      )
      // GetRenderedPageAndCommonAppData
      cy.waitForApiCalls()
      cy.waitForSpinners()

      // GetAtoms
      cy.waitForApiCalls()
      cy.waitForSpinners()

      cy.findByText(COMPONENT_NAME).click({ force: true })
      cy.get(`.ant-tabs [aria-label="node-index"]`).click()
      cy.get('.ant-tabs-tabpane-active form').setFormFieldValue({
        label: 'Container for component children',
        type: FIELD_TYPE.SELECT,
        value: COMPONENT_CHILD_SPACE,
      })
    })

    it('should be able to create an instance of the component', () => {
      cy.visit(
        `/apps/cypress/${slugify(app.name)}/pages/${slugify(
          PAGE_NAME,
        )}/builder?primarySidebarKey=explorer`,
      )

      cy.getCuiTreeItemByPrimaryTitle('Body').click({ force: true })

      cy.getCuiSidebar('Explorer').getCuiToolbarItem('Add Element').click()

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
        value: COMPONENT_INSTANCE_NAME,
      })

      cy.getCuiPopover('Create Element').getCuiToolbarItem('Create').click()

      cy.findByTestId('create-element-form').should('not.exist', {
        timeout: 10000,
      })
      // editorjs fails internally without this, maybe some kind of initialization - Cannot read properties of undefined (reading 'contains')
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(2000)
    })

    it('should be able to set props on an instance of the component', () => {
      cy.getCuiTreeItemByPrimaryTitle(COMPONENT_INSTANCE_NAME).click({
        force: true,
      })
      cy.get(`.ant-tabs [aria-label="setting"]`).click()
      cy.waitForSpinners()
      cy.get('.ant-tabs-tabpane-active form').setFormFieldValue({
        label: 'Component_prop',
        type: FIELD_TYPE.CODE_MIRROR,
        value: COMPONENT_PROP_VALUE,
      })
    })

    it('should be able to add children to component instance', () => {
      // Expand the children container
      cy.getCuiTreeItemByPrimaryTitle(`${COMPONENT_NAME} Root`).click()

      cy.getCuiSidebar('Explorer').getCuiToolbarItem('Add Element').click()

      cy.findByTestId('create-element-form').setFormFieldValue({
        label: 'Atom',
        type: FIELD_TYPE.SELECT,
        value: IAtomType.AntDesignTypographyText,
      })

      // need to wait for the code to put the autocomputed name before typing
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1000)

      cy.findByTestId('create-element-form').setFormFieldValue({
        label: 'Name',
        type: FIELD_TYPE.INPUT,
        value: COMPONENT_INSTANCE_TEXT,
      })

      cy.createElementAndStoreId()

      cy.findByTestId('create-element-form').should('not.exist', {
        timeout: 10000,
      })

      // editorjs fails internally without this, maybe some kind of initialization - Cannot read properties of undefined (reading 'contains')
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(2000)

      cy.getCuiTreeItemByPrimaryTitle(COMPONENT_INSTANCE_TEXT).click({
        force: true,
      })

      cy.getNewElementId().then((newElementId) => {
        cy.typeIntoTextEditor(COMPONENT_INSTANCE_TEXT, newElementId)
      })

      cy.openPreview()
      cy.get('#render-root').contains(COMPONENT_INSTANCE_TEXT).should('exist')
    })
  })
})
