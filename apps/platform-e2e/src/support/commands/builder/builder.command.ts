import { MODEL_ACTION, MODEL_UI } from '@codelab/frontend/abstract/types'
import { customTextInjectionWhiteList } from '@codelab/frontend/shared/utils'
import { FIELD_TYPE } from '@codelab/frontend/test/cypress/antd'
import { NETWORK_IDLE_TIME } from '@codelab/frontend/test/cypress/shared'
import type { ICreateCypressElementData } from '@codelab/shared/abstract/core'

export const NEW_ELEMENT_ID_NAME = 'elementId'

export const createElementTree = (
  elements: Array<ICreateCypressElementData>,
) => {
  Cypress.log({
    message: elements,
    name: 'createElementTree',
  })

  return cy
    .wrap(elements)
    .each(
      ({ atom, name, parentElement, propsData }: ICreateCypressElementData) => {
        cy.getCuiSidebar(MODEL_UI.SidebarBuilder.key)
          .getCuiSkeleton()
          .should('not.be.visible')
        cy.getCuiSidebar(MODEL_UI.SidebarBuilder.key)
          .getCuiToolbarItem(MODEL_ACTION.CreateElement.key)
          .click()

        cy.getCuiForm(MODEL_ACTION.CreateElement.key).setFormFieldValue({
          label: 'Parent element',
          type: FIELD_TYPE.SELECT,
          value: parentElement,
        })

        if (!atom) {
          throw new Error('Missing atom')
        }

        cy.getCuiForm(MODEL_ACTION.CreateElement.key).setFormFieldValue({
          label: 'Atom',
          type: FIELD_TYPE.SELECT,
          value: atom,
        })

        if (propsData) {
          cy.getCuiForm(MODEL_ACTION.CreateElement.key).setFormFieldValue({
            label: 'Props Data',
            type: FIELD_TYPE.INPUT,
            value: JSON.stringify(propsData),
          })
        }

        cy.getCuiForm(MODEL_ACTION.CreateElement.key)
          .getFormField({
            label: 'Name',
          })
          .within(() => {
            // Need to wait for the name to automatically be set first (after the
            // atom is set) because it would override the name otherwise
            cy.get('input').should('not.have.value', '')
          })

        cy.getCuiForm(MODEL_ACTION.CreateElement.key).setFormFieldValue({
          label: 'Name',
          type: FIELD_TYPE.INPUT,
          value: name,
        })

        cy.getCuiPopover(MODEL_ACTION.CreateElement.key)
          .getCuiToolbarItem(MODEL_ACTION.CreateElement.key)
          .click({ force: true })
        cy.waitForNetworkIdle(NETWORK_IDLE_TIME)

        cy.getCuiForm(MODEL_ACTION.CreateElement.key).should('not.exist', {
          timeout: 15000,
        })

        cy.getCuiSidebar(MODEL_UI.SidebarBuilder.key)
          .getCuiTreeItemByPrimaryTitle(name)
          .should('exist')
          .click()
      },
    )
}

export const openPreview = () => {
  Cypress.log({
    name: 'open preview',
  })

  cy.getCuiToolbarItem(MODEL_ACTION.OpenPreviewBuilder.key)
    .find('button')
    .click()
  cy.waitForNetworkIdle(NETWORK_IDLE_TIME)

  cy.getCuiToolbarItem(MODEL_ACTION.OpenBuilderBuilder.key)
    .find('button')
    .should('be.visible')

  cy.waitForSpinners()

  return cy.get('#render-root')
}

export const openBuilder = () => {
  Cypress.log({
    name: 'open builder',
  })

  cy.getCuiToolbarItem(MODEL_ACTION.OpenBuilderBuilder.key)
    .find('button')
    .click()
  cy.getCuiToolbarItem(MODEL_ACTION.OpenPreviewBuilder.key)
    .find('button')
    .should('be.visible')

  cy.waitForSpinners()
}

/**
 * Creates an alias, with name {@link NEW_ELEMENT_ID_NAME}, for the new element id.
 * This should be called only when the create element form is open.
 */
export const createElementAndStoreId = () => {
  cy.intercept('POST', 'api/graphql').as('graphqlRequest')
  cy.getCuiPopover(MODEL_ACTION.CreateElement.key)
    .getCuiToolbarItem(MODEL_ACTION.CreateElement.key)
    .click()
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
