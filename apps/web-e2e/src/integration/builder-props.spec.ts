let appId: string
const pageName = 'Home Page'

const buttonComponent = {
  name: 'Button',
  atom: 'Ant Design Button',
  parentElement: 'Root element',
}

const formToggleButtons = ['Block', 'Danger', 'Disabled', 'Ghost']

const cyFormToggleButton = (text: string) =>
  cy
    .get(
      `.ant-tabs-content-holder .ant-row.ant-form-item:has(span:contains("${text}"))`,
    )
    .find('button')

const formTextInputs = [
  { text: 'Href', input: 'http://google.com' },
  { text: 'Html Type', input: 'Html Type' },
  { text: 'Target', input: '_blank' },
  { text: 'Type', input: 'Type' },
]

const selectApp = () => {
  cy.visit(`/apps/${appId}/pages`)
  cy.getSpinner().should('not.exist')
}

const selectPage = () => {
  cy.findByText(pageName).click()
  cy.contains(/Root element/)
}

const selectPropsTab = () => {
  cy.get(`[data-cy='atom-${buttonComponent.parentElement}']`).click()
  cy.get(`[data-cy='atom-${buttonComponent.name}']`).should('be.visible')
  // Event button is visible, somehow it is still unclickable without this timeout
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(1000)
  cy.get(`[data-cy='atom-${buttonComponent.name}']`).click()
  cy.get('.ant-tabs-tab-btn').contains('Props').click()
}

describe('Builder Props', () => {
  before(() => {
    cy.resetDgraphData().then(() => {
      cy.runSeeder()
      cy.login().then(() => {
        cy.preserveAuthCookies()
        cy.createApp().then((app: any) => {
          appId = app.id

          cy.createPage({
            appId,
            name: pageName,
          })
        })
      })
    })
  })

  beforeEach(() => {
    cy.preserveAuthCookies()
  })

  describe('update props', () => {
    before(() => {
      selectApp()
      selectPage()
    })

    it.only('should be able to update Props', () => {
      // Add Button component
      cy.findByRole('button', { name: /plus/ }).click()

      cy.getOpenedModal().findByLabelText('Name').type(buttonComponent.name)
      cy.getOpenedModal().findByLabelText('Atom').type(buttonComponent.atom)
      cy.getOpenedModal().getOptionItem(buttonComponent.atom).first().click()
      cy.getOpenedModal()
        .findByLabelText('Parent element')
        .type(buttonComponent.parentElement)
      cy.getOpenedModal()
        .getOptionItem(buttonComponent.parentElement)
        .first()
        .click()

      cy.getOpenedModal()
        .findByButtonText(/Create/)
        .click()

      cy.getOpenedModal().should('not.exist')

      // Select button props tab
      selectPropsTab()

      // Update button props
      formToggleButtons.forEach((btn) => {
        cyFormToggleButton(btn).click()
      })
      formTextInputs.forEach((item) => {
        cy.findByLabelText(item.text).type(item.input)
      })
      cy.findByButtonText(/Submit/).click()
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1000)

      // Reload page
      selectApp()
      selectPage()
      selectPropsTab()

      // Assert button props updated
      formToggleButtons.forEach((btn) => {
        cyFormToggleButton(btn).should('have.class', 'ant-switch-checked')
      })
      formTextInputs.forEach((item) => {
        cy.findByLabelText(item.text).should('have.value', item.input)
      })
    })
  })
})
