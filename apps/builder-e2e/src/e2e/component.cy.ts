import {
  IAtomType,
  IPrimitiveTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { connectOwner } from '@codelab/shared/data'
import { v4 } from 'uuid'
import { FIELD_TYPE } from '../support/antd/form'
import { createAppInput } from '../support/database/app'

const COMPONENT_NAME = 'new component'
const COMPONENT_INSTANCE_NAME = 'component instance'
const COMPONENT_PROP_NAME = 'component_prop'
const COMPONENT_PROP_VALUE = 'component_prop_value'
const COMPONENT_CHILD_SPACE = 'space'
const COMPONENT_CHILD_TYPOGRAPHY = 'typography'
const COMPONENT_CHILD_TEXT = `text {{this.${COMPONENT_PROP_NAME}}}`
const COMPONENT_INSTANCE_TEXT = 'instance text'

interface ComponentChildData {
  name: string
  atom: string
}

const componentChildren: Array<ComponentChildData> = [
  { name: COMPONENT_CHILD_SPACE, atom: IAtomType.AntDesignSpace },
  { name: COMPONENT_CHILD_TYPOGRAPHY, atom: IAtomType.AntDesignTypographyText },
]

let testApp: any
describe('Component CRUD', () => {
  before(() => {
    cy.resetDatabase()
    cy.login()
    cy.getCurrentUserId()
      .then((userId) => {
        cy.createType(
          {
            PrimitiveType: {
              id: v4(),
              name: IPrimitiveTypeKind.String,
              primitiveKind: IPrimitiveTypeKind.String,
              kind: ITypeKind.PrimitiveType,
              owner: connectOwner(userId),
            },
          },
          ITypeKind.PrimitiveType,
        )
        cy.createAtom([
          {
            name: IAtomType.AntDesignSpace,
            type: IAtomType.AntDesignSpace,
            id: v4(),
            api: {
              create: {
                node: {
                  id: v4(),
                  name: `${IAtomType.AntDesignSpace} API`,
                  owner: connectOwner(userId),
                },
              },
            },
          },
          {
            name: IAtomType.AntDesignTypographyText,
            type: IAtomType.AntDesignTypographyText,
            id: v4(),
            api: {
              create: {
                node: {
                  id: v4(),
                  name: `${IAtomType.AntDesignTypographyText} API`,
                  owner: connectOwner(userId),
                },
              },
            },
          },
        ])

        return cy.createApp(createAppInput(userId))
      })
      .then((apps) => {
        testApp = apps

        const app = apps[0]
        const pageId = app?.pages[0]?.id
        cy.visit(`/apps/${app?.id}/pages/${pageId}/builder`)
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
        value: IPrimitiveTypeKind.String,
        type: FIELD_TYPE.SELECT,
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
        .trigger('contextmenu')

      cy.wrap(componentChildren)
        .each((child: ComponentChildData) => {
          cy.contains(/Add child/).click({ force: true })

          cy.getModal().setFormFieldValue({
            label: 'Render Type',
            value: 'Atom',
            type: FIELD_TYPE.SELECT,
          })
          cy.getModal().setFormFieldValue({
            label: 'Atom',
            value: child.atom,
            type: FIELD_TYPE.SELECT,
          })
          cy.getModal().setFormFieldValue({
            label: 'Name',
            value: child.name,
          })

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
        value: COMPONENT_CHILD_SPACE,
        type: FIELD_TYPE.SELECT,
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
        value: 'Component',
        type: FIELD_TYPE.SELECT,
      })
      cy.getModal().setFormFieldValue({
        label: 'Component',
        value: COMPONENT_NAME,
        type: FIELD_TYPE.SELECT,
      })
      cy.getModal().setFormFieldValue({
        label: 'Name',
        value: COMPONENT_INSTANCE_NAME,
      })

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
        value: COMPONENT_PROP_VALUE,
        type: FIELD_TYPE.CODE_MIRROR,
      })
    })

    it('should be able to add children to component instance', () => {
      cy.getSider()
        .find('.ant-page-header-heading')
        .getButton({ icon: 'plus' })
        .click()

      cy.getModal().setFormFieldValue({
        label: 'Render Type',
        value: 'Atom',
        type: FIELD_TYPE.SELECT,
      })
      cy.getModal().setFormFieldValue({
        label: 'Atom',
        value: IAtomType.AntDesignTypographyText,
        type: FIELD_TYPE.SELECT,
      })
      cy.getModal().setFormFieldValue({
        label: 'Name',
        value: COMPONENT_INSTANCE_TEXT,
      })

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
