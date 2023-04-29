import type { IAppDTO } from '@codelab/frontend/abstract/core'
import { IAtomType, IPrimitiveTypeKind } from '@codelab/shared/abstract/core'
import { FIELD_TYPE } from '../support/antd/form'
import { loginSession } from '../support/nextjs-auth0/commands/login'

const COMPONENT_NAME = 'New Component'
const COMPONENT_INSTANCE_NAME = 'Component Instance'
const COMPONENT_PROP_NAME = 'component_prop'
const COMPONENT_PROP_VALUE = 'component_prop_value'
const COMPONENT_CHILD_SPACE = 'Space'
const COMPONENT_CHILD_TYPOGRAPHY = 'Typography'
const COMPONENT_CHILD_TEXT = `text {{this.${COMPONENT_PROP_NAME}}}`
const COMPONENT_INSTANCE_TEXT = 'Instance Text'

interface ComponentChildData {
  atom: string
  name: string
}

const componentChildren: Array<ComponentChildData> = [
  { atom: IAtomType.AntDesignSpace, name: COMPONENT_CHILD_SPACE },
  { atom: IAtomType.AntDesignTypographyText, name: COMPONENT_CHILD_TYPOGRAPHY },
]

const setElementNameInModal = (value: string) => {
  cy.getModal()
    .getFormField({
      label: 'Name',
    })
    .within(() => {
      // Need to wait for the name to automatically be set first (after the
      // atom is set) because it would override the name otherwise
      cy.get('input')
        .should('not.have.value', '')
        .getModal()
        .setFormFieldValue({
          label: 'Name',
          type: FIELD_TYPE.INPUT,
          value,
        })
    })
}

let testApp: any
describe('Component CRUD', () => {
  before(() => {
    cy.resetDatabase()
    loginSession()

    cy.request('/api/cypress/type')

    cy.request('/api/cypress/atom')
      .then(() => {
        return cy.request<IAppDTO>('/api/cypress/app')
      })
      .then((apps) => {
        testApp = apps

        const app = apps.body
        const pageId = app.pages?.[0]?.id
        cy.visit(`/apps/${app.id}/pages/${pageId}/builder`)
        cy.getSpinner().should('not.exist')
      })
  })

  describe('Add component', () => {
    it('should be able to add a new component', () => {
      cy.log('my app', JSON.stringify(testApp, null, 2))
      cy.getSider().getButton({ icon: 'plus' }).eq(1).click()
      cy.getModal().findByLabelText('Name').type(COMPONENT_NAME)
      cy.getModal()
        .getModalAction(/Create/)
        .click()
      cy.getModal().should('not.exist', { timeout: 10000 })
      cy.get('[title="Components"]')
        .parent()
        .find('.ant-tree-switcher_close')
        .click()
      cy.findByText(COMPONENT_NAME).should('exist')
    })

    it('should be able to define property on component', () => {
      cy.get(`[title="${COMPONENT_NAME}"]`).click({ force: true })
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
      cy.get(`.ant-tree-node-content-wrapper[title="${COMPONENT_NAME}"]`)
        .eq(1)
        .click({ force: true })

      cy.get(`.ant-tree-node-content-wrapper[title="${COMPONENT_NAME}"]`)
        .eq(1)
        .trigger('contextmenu')

      /**
       * TODO(@nx/cypress): Nesting Cypress commands in a should assertion now throws.
       * You should use .then() to chain commands instead.
       * More Info: https://docs.cypress.io/guides/references/migration-guide#-should
       * */
      cy.wrap(componentChildren)
        .each((child: ComponentChildData) => {
          cy.contains(/Add child/).click({ force: true })

          cy.getModal().setFormFieldValue({
            label: 'Render Type',
            type: FIELD_TYPE.SELECT,
            value: 'Atom',
          })
          cy.getModal().setFormFieldValue({
            label: 'Atom',
            type: FIELD_TYPE.SELECT,
            value: child.atom,
          })

          setElementNameInModal(child.name)

          cy.getModal()
            .getModalAction(/Create/)
            .click()
          cy.getModal().should('not.exist', { timeout: 10000 })
          cy.get(`[title="${child.name}"]`).click({ force: true })
        })
        .then(() => {
          cy.get(`.ant-tabs [aria-label="setting"]`).click()
          cy.get('.ant-tabs-tabpane-active form .ql-editor').type(
            COMPONENT_CHILD_TEXT,
            { parseSpecialCharSequences: false },
          )

          cy.get('#Builder').findByText('text null').should('exist')
        })
    })

    it('should be able to specify where to render component children', () => {
      cy.get(`.ant-tree-node-content-wrapper[title="${COMPONENT_NAME}"]`)
        .eq(0)
        .click({ force: true })
      cy.get(`.ant-tabs [aria-label="node-index"]`).click()
      cy.get('.ant-tabs-tabpane-active form').setFormFieldValue({
        label: 'Container for component children',
        type: FIELD_TYPE.SELECT,
        value: COMPONENT_CHILD_SPACE,
      })
    })

    it('should be able to create an instance of the component', () => {
      cy.get(`[title="Body"]`).click({ force: true })

      cy.getSider()
        .find('.ant-page-header-heading')
        .getButton({ icon: 'plus' })
        .click()

      cy.getModal().setFormFieldValue({
        label: 'Render Type',
        type: FIELD_TYPE.SELECT,
        value: 'Component',
      })
      cy.getModal().setFormFieldValue({
        label: 'Component',
        type: FIELD_TYPE.SELECT,
        value: COMPONENT_NAME,
      })

      setElementNameInModal(COMPONENT_INSTANCE_NAME)

      cy.getModal()
        .getModalAction(/Create/)
        .click()
      cy.getModal().should('not.exist', { timeout: 10000 })
    })

    it('should be able to set props on an instance of the component', () => {
      cy.get(`[title="${COMPONENT_INSTANCE_NAME}"]`).click({ force: true })
      cy.get(`.ant-tabs [aria-label="setting"]`).click()
      cy.getSpinner().should('not.exist')
      cy.get('.ant-tabs-tabpane-active form').setFormFieldValue({
        label: 'Component_prop',
        type: FIELD_TYPE.CODE_MIRROR,
        value: COMPONENT_PROP_VALUE,
      })
    })

    it('should be able to add children to component instance', () => {
      cy.getSider()
        .find('.ant-page-header-heading')
        .getButton({ icon: 'plus' })
        .click()

      cy.getModal().setFormFieldValue({
        label: 'Render Type',
        type: FIELD_TYPE.SELECT,
        value: 'Atom',
      })
      cy.getModal().setFormFieldValue({
        label: 'Atom',
        type: FIELD_TYPE.SELECT,
        value: IAtomType.AntDesignTypographyText,
      })

      setElementNameInModal(COMPONENT_INSTANCE_TEXT)

      cy.getModal()
        .getModalAction(/Create/)
        .click()
      cy.getModal().should('not.exist', { timeout: 10000 })
      cy.get(`[title="${COMPONENT_INSTANCE_TEXT}"]`).click({ force: true })
      cy.get(`.ant-tabs [aria-label="setting"]`).click()
      cy.get('.ant-tabs-tabpane-active form .ql-editor').type(
        COMPONENT_INSTANCE_TEXT,
      )

      cy.get('#Builder')
        .findByText(`text ${COMPONENT_PROP_VALUE}`)
        .should('exist')
      cy.get('#Builder').findByText(COMPONENT_INSTANCE_TEXT).should('exist')
    })
  })
})
