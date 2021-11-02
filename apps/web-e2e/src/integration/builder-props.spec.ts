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

before(() => {
  cy.resetDgraphData().then(() => {
    cy.runSeeder().then(() => {
      cy.login().then(() => {
        cy.preserveAuthCookies()
        cy.createApp().then((app: any) => {
          appId = app.id

          cy.createPage({
            appId,
            name: pageName,
          })

          selectApp()
          selectPage()
        })
      })
    })
  })
})

beforeEach(() => {
  cy.preserveAuthCookies()
})

describe('Update props', () => {
  it('should create element', () => {
    // Add Button component
    cy.findByRole('button', { name: /plus/ }).click()

    cy.getOpenedModal().then((modal: JQuery) => {
      cy.wrap(modal).findByLabelText('Name').type(buttonComponent.name)
      cy.wrap(modal).findByLabelText('Atom').type(buttonComponent.atom)
      cy.wrap(modal).getOptionItem(buttonComponent.atom).first().click()
      cy.wrap(modal)
        .findByLabelText('Parent element')
        .type(buttonComponent.parentElement)
      cy.wrap(modal)
        .getOptionItem(buttonComponent.parentElement)
        .first()
        .click()

      cy.wrap(modal)
        .findByButtonText(/Create/)
        .click()

      cy.getOpenedModal().should('not.exist')
    })
  })

  describe('Update elements props', () => {
    before(() => {
      // Select button props tab
      selectPropsTab()
    })

    // Update button props
    formToggleButtons.forEach((btn) => {
      it(`should update props for button ${btn} `, () => {
        cyFormToggleButton(btn).click()
      })
    })

    formTextInputs.forEach((item) => {
      it(`should update props for item ${item.text} `, () => {
        cy.findByLabelText(item.text).type(item.input)
      })
    })

    it('should submit the update', () => {
      cy.findByButtonText(/Submit/).click()
    })
  })
})

describe('Render updated props', () => {
  before(() => {
    // Reload page
    selectApp()
    selectPage()
    selectPropsTab()
  })

  formToggleButtons.forEach((btn) => {
    it(`should render props for button ${btn} `, () => {
      cyFormToggleButton(btn).should('have.class', 'ant-switch-checked')
    })
  })

  formTextInputs.forEach((item) => {
    it(`should render props for item ${item.text} `, () => {
      // Assert button props updated
      cy.findByLabelText(item.text).should('have.value', item.input)
    })
  })
})
