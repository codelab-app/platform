import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import { FIELD_TYPE } from '../antd/form'

interface ElementData {
  name: string
  atom?: string
  parentElement: string
  slug: string
}

export const createElementTree = (elements: Array<ElementData>) => {
  return cy.wrap(elements).each((element: ElementData) => {
    const { atom, name, parentElement } = element

    cy.getSider()
      .find('.ant-page-header-heading')
      .getButton({ icon: 'plus' })
      .click()

    /**
     * We skip this if parent element is root, since it is disabled and can't be accessed
     */
    if (parentElement !== ROOT_ELEMENT_NAME) {
      cy.getModal().setFormFieldValue({
        label: 'Parent element',
        value: parentElement,
        type: FIELD_TYPE.SELECT,
      })
    }

    if (atom) {
      cy.getModal().setFormFieldValue({
        label: 'Render Type',
        value: 'Atom',
        type: FIELD_TYPE.SELECT,
      })
      cy.getModal().setFormFieldValue({
        label: 'Atom',
        value: atom,
        type: FIELD_TYPE.SELECT,
      })

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
              value: name,
              type: FIELD_TYPE.INPUT,
            })
        })
    } else {
      cy.getModal().setFormFieldValue({
        label: 'Name',
        value: name,
        type: FIELD_TYPE.INPUT,
      })
    }

    cy.getModal()
      .getModalAction(/Create/)
      .click()
    cy.getModal().should('not.exist', { timeout: 10000 })
  })
}
