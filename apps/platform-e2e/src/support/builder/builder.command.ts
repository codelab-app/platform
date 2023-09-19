import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import { customTextInjectionWhiteList } from '@codelab/frontend/shared/utils'
import type { IAtomType } from '@codelab/shared/abstract/core'
import { FIELD_TYPE } from '@codelab/testing/cypress/antd'

export const NEW_ELEMENT_ID_NAME = 'elementId'
export interface ElementData {
  atom?: IAtomType
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
      // need to wait for the code to put the autocomputed name before typing
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1000)

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

    cy.findByTestId('create-element-form').should('not.exist', {
      timeout: 10000,
    })

    if (atom && customTextInjectionWhiteList.includes(atom)) {
      // editorjs fails internally without this, maybe some kind of initialisation
      // fails mostly on elements that can have text editor like typography text
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(2000)
    }

    cy.getCuiSidebar('Explorer').findByText(name).should('exist').click()
  })
}

export const openPreview = () => {
  // wait for api calls if theres any e.g. actual saving in the database
  // this is just the simplest way, we should improve this
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(1000)
  cy.get('[data-cy="codelabui-toolbar-item-Preview"] button').click()
  // wait for the multiple api calls
  // this is just the simplest way, we should improve this
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(1000)

  return
}

export const openBuilder = () => {
  cy.get('[data-cy="codelabui-toolbar-item-Builder"] button').click()
  // wait for the multiple api calls
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(1000)

  return
}

/**
 * Creates an alias, with name {@link NEW_ELEMENT_ID_NAME}, for the new element id.
 * This should be called only when the create element form is open.
 */
export const createElementAndStoreId = () => {
  cy.intercept('POST', `api/graphql`).as('graphqlRequest')
  cy.getCuiPopover('Create Element').within(() => {
    cy.getToolbarItem('Create').click()
  })
  cy.wait('@graphqlRequest').then(({ response }) => {
    cy.wrap(response?.body.data.createElements.elements[0].id).as(
      NEW_ELEMENT_ID_NAME,
    )
  })
}

/**
 * Gets the new element id from the alias {@link NEW_ELEMENT_ID_NAME}.
 */
export const getNewElementId = () => {
  return cy.get<string>(`@${NEW_ELEMENT_ID_NAME}`).then((id) => id)
}

export const preventDefaultOnClick = (identifier: string) => {
  cy.get(identifier).then((el) => {
    el.on('click', (event) => event.preventDefault())
  })
}

export const removePreventDefaultOnClick = (identifier: string) => {
  cy.get(identifier).then((el) => {
    el.off('click')
  })
}
