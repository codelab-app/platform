import { IAtomType } from '@codelab/shared/abstract/core'
import { FIELD_TYPE } from '../../support/antd/form'

const NEW_COMP_NAME = 'new component'
const UPDATED_COMP_NAME = 'updated component'
const CHILD_BUTTON = 'Button'
const CHILD_TEXT = 'Text'

type ComponentChildData = { name: string; atom: string }

const componentChildren: Array<ComponentChildData> = [
  { name: CHILD_BUTTON, atom: IAtomType.AntDesignButton },
  { name: CHILD_TEXT, atom: IAtomType.AntDesignTypographyText },
]

describe('Component CRUD', () => {
  describe('Add component', () => {
    it('should be able to add a new component', () => {
      cy.getSider().getButton({ icon: 'plus' }).eq(1).click()

      cy.getModal().findByLabelText('Name').type(NEW_COMP_NAME)

      cy.getModal()
        .getModalAction(/Create/)
        .click()
      cy.getModal().should('not.exist', { timeout: 10000 })

      cy.get('[title="Components"]')
        .parent()
        .find('.ant-tree-switcher_close')
        .click()

      cy.findByText(NEW_COMP_NAME).should('exist')
    })
  })

  describe('Add elements to component', () => {
    it('should be able to add elements to the component', () => {
      // Have tried to force click it, but it has no effect on the UI
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(500)
      cy.get(`[title="${NEW_COMP_NAME}"]`)
        .parent()
        .get('.ant-tree-switcher_close')
        .eq(1)
        .click()

      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(500)
      cy.wrap(componentChildren)
        .each((child: ComponentChildData) => {
          const { name, atom } = child

          cy.get(`[title="${NEW_COMP_NAME}"]`).eq(1).rightclick()
          cy.contains(/Add child/).click()

          cy.getModal().setFormFieldValue({
            label: 'Name',
            value: name,
          })

          cy.getModal().setFormFieldValue({
            label: 'Atom',
            value: atom,
            type: FIELD_TYPE.SELECT,
          })

          cy.getModal()
            .getModalAction(/Create/)
            .click()
          cy.getModal().should('not.exist', { timeout: 10000 })
        })
        .then(() => {
          // check if the elements exist in the render root
          cy.get('#Builder').find('button').should('exist')
          cy.get('#Builder').find('.ant-typography').should('exist')
        })
    })
  })

  describe('Update component', () => {
    it('should be able to update the component', () => {
      cy.get(`[title="${NEW_COMP_NAME}"]`).eq(0).click()
      cy.findByLabelText('Name').clear().type(UPDATED_COMP_NAME)

      cy.findByText(UPDATED_COMP_NAME).should('exist')
    })
  })

  describe('Remove component', () => {
    it('should be able to remove the component', () => {
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(500)
      cy.get(`[title="${UPDATED_COMP_NAME}"]`).rightclick()
      cy.contains(/Delete/).click()
      cy.getModal()
        .getModalAction(/Delete/)
        .click()
      cy.findByText(UPDATED_COMP_NAME).should('not.exist')
    })
  })
})
