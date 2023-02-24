// ignore because we need to seed Button.csv first
import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'

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

// TODO: ignored e2e test. Fix types later if requires
// before(() => {
//   cy.resetDatabase().then(() => {
//     loginSession().then(() => {
//       cy.createPageFromScratch().then((data: any) => {
//         // create Button element
//         cy.createElement({
//           name: buttonComponent.name,
//           atom: {
//             connect: { where: { node: { name: buttonComponent.atom } } },
//           },
//           parentElement: {
//             connect: { where: { node: { id: data.rootElementIdt } } },
//           },
//         })
//       })
//     })
//   })
// })

describe('Update props', () => {
  it(`should update props`, () => {
    // Select button props tab
    selectPropsTab()

    // Update button props
    cy.wrap(formToggleButtons).each((btn: string) => {
      cy.findByLabelText(btn).click()
    })

    cy.wrap(formTextInputs).each((item: { input: string; text: string }) => {
      cy.findByLabelText(item.text).type(item.input)
    })

    // cy.findByButtonText(/Submit/).click()

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
