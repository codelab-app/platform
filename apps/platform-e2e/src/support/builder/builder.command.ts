import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import { FIELD_TYPE } from '../antd/form'

export interface ElementData {
  atom?: string
  name: string
  parentElement: string
  propsData?: object
}

export const createElementTree = (elements: Array<ElementData>) => {
  return cy.wrap(elements).each((element: ElementData) => {
    const { atom, name, parentElement, propsData } = element

    cy.getCuiSidebar('Explorer').getCuiSkeleton().should('not.be.visible')
    cy.getCuiSidebar('Explorer').getToolbarItem('Add Element').first().click()

    /**
     * We skip this if parent element is root, since it is disabled and can't be accessed
     */
    if (parentElement !== ROOT_ELEMENT_NAME) {
      cy.findByTestId('create-element-form').setFormFieldValue({
        label: 'Parent element',
        type: FIELD_TYPE.SELECT,
        value: parentElement,
      })
    }

    if (atom) {
      cy.findByTestId('create-element-form').setFormFieldValue({
        label: 'Render Type',
        type: FIELD_TYPE.SELECT,
        value: 'Atom',
      })
      cy.findByTestId('create-element-form').setFormFieldValue({
        label: 'Atom',
        type: FIELD_TYPE.SELECT,
        value: atom,
      })

      if (propsData) {
        cy.findByTestId('create-element-form').setFormFieldValue({
          label: 'Props Data',
          type: FIELD_TYPE.INPUT,
          value: JSON.stringify(propsData),
        })
      }

      cy.findByTestId('create-element-form')
        .getFormField({
          label: 'Name',
        })
        .within(() => {
          // Need to wait for the name to automatically be set first (after the
          // atom is set) because it would override the name otherwise
          cy.get('input').should('not.have.value', '')
        })
      cy.findByTestId('create-element-form').setFormFieldValue({
        label: 'Name',
        type: FIELD_TYPE.INPUT,
        value: name,
      })
    } else {
      cy.findByTestId('create-element-form').setFormFieldValue({
        label: 'Name',
        type: FIELD_TYPE.INPUT,
        value: name,
      })
    }

    cy.getCuiPopover('Create Element').within(() => {
      cy.getToolbarItem('Create').click()
    })

    cy.findByText(name).should('exist').click()
  })
}
