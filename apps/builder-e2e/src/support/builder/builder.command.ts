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
    const { atom, name, parentElement, slug } = element

    cy.getSider()
      .find('.ant-page-header-heading')
      .getButton({ icon: 'plus' })
      .click()

    cy.getModal().findByLabelText('Name').type(name)

    cy.getModal().findByLabelText('Slug').type(slug)

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
        label: 'Atom',
        value: atom,
        type: FIELD_TYPE.SELECT,
      })
    }

    cy.getModal()
      .getModalAction(/Create/)
      .click()
    cy.getModal().should('not.exist', { timeout: 10000 })
  })
}
