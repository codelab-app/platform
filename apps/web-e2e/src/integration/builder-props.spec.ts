//
// Ignored because of a cypress issue https://github.com/codelab-ai/codelab.ai/issues/1172
//

import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'

const pageName = 'Home Page'

const buttonComponent = {
  name: 'AntDesignButton',
  atom: 'Ant Design Button',
  parentElement: ROOT_ELEMENT_NAME,
}

const formToggleButtons = ['Block', 'Danger', 'Disabled', 'Ghost']

const formTextInputs = [
  { text: 'Href', input: 'http://google.com' },
  { text: 'Html Type', input: 'Html Type' },
  { text: 'Target', input: '_blank' },
  { text: 'Type', input: 'primary' },
]

const selectApp = () => {
  return cy.get('@appId').then((appId) => {
    cy.visit(`/apps/${appId}/pages`)

    cy.getSpinner().should('not.exist')
  })
}

const selectPage = () => {
  cy.findByText(pageName).click()
  cy.contains(/Root element/)
}

const selectPropsTab = () => {
  cy.get('.ant-dropdown-trigger')
    .contains(buttonComponent.parentElement)
    .click()
  cy.findByText(buttonComponent.name).should('be.visible')

  cy.findByText(buttonComponent.name).click()

  // Event button is visible, somehow it is still unclickable without this timeout
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(1000)

  cy.get('.ant-tabs-tab-btn').contains('Props').click()
}

before(() => {
  cy.resetDgraphData().then(() => {
    cy.runSeeder().then(() => {
      cy.login().then(() => {
        cy.createApp().then((app: any) => {
          cy.wrap(app.id).as('appId')
          cy.createPage({
            appId: app.id,
            name: pageName,
          })

          selectApp()
          selectPage()

          // Add Button component
          cy.findByRole('button', { name: /plus/ }).click()

          cy.getOpenedModal().then((modal: JQuery) => {
            cy.wrap(modal).findByLabelText('Name').type(buttonComponent.name)
            cy.wrap(modal).findByLabelText('Atom').type(buttonComponent.atom)
            cy.getOptionItem(buttonComponent.atom).first().click()

            cy.wrap(modal)
              .findByButtonText(/Create/)
              .click()

            cy.getOpenedModal().should('not.exist')
          })
        })
      })
    })
  })
})

describe('Update props', () => {
  it(`should update props `, () => {
    // Select button props tab
    selectPropsTab()

    // Update button props
    cy.wrap(formToggleButtons).each((btn: string) => {
      cy.findByLabelText(btn).click()
    })

    cy.wrap(formTextInputs).each((item: { input: string; text: string }) => {
      cy.findByLabelText(item.text).type(item.input)
    })

    cy.findByButtonText(/Submit/).click()

    // For some reason it gets an element right before re-rendering and then causes an error for it being detached
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000)

    selectPropsTab()

    cy.wrap(formToggleButtons).each((btn: string) => {
      cy.findByLabelText(btn).should('have.class', 'ant-switch-checked')
    })

    cy.wrap(formTextInputs).each((item: { input: string; text: string }) => {
      // Assert button props updated
      cy.findByLabelText(item.text).should('have.value', item.input)
    })
  })
})
