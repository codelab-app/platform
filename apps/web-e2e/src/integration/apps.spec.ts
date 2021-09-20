describe('Apps CRUD', () => {
  before(() => {
    cy.resetDgraphData().then(() => {
      cy.login().then(() => {
        cy.preserveAuthCookies()
        cy.visit('/apps')

        cy.getSpinner().should('not.exist')
      })
    })
  })

  beforeEach(() => {
    cy.preserveAuthCookies()
  })

  const appName = 'new app'
  const updatedAppName = 'updated app'

  describe('create', () => {
    it('should be able to create app', () => {
      // check that we don't have app with test-name
      cy.findAllByText(appName, { exact: true, timeout: 0 }).should('not.exist')

      cy.findByButtonText(/Create App/).click()

      cy.getOpenedModal().findByLabelText('Name').type(appName)
      cy.getOpenedModal()
        .findByButtonText(/Create App/)
        .click()

      cy.getOpenedModal().should('not.exist')
      cy.findByText(appName).should('exist')
    })
  })

  describe('update', () => {
    it('should be able to update app name', () => {
      cy.findSettingsButtonByAppName(appName).click()
      cy.getOpenedDropdownMenu().findByText('Edit').click()

      cy.getOpenedModal().findByLabelText('Name').clear().type(updatedAppName)
      cy.getSpinner().should('not.exist')
      cy.getOpenedModal()
        .findByButtonText(/Update App/)
        .click()

      cy.getOpenedModal().should('not.exist')
      cy.findByText(appName).should('not.exist')
      cy.findByText(updatedAppName).should('exist')
    })
  })

  describe('delete', () => {
    it('should be able to delete app', () => {
      cy.findSettingsButtonByAppName(updatedAppName).click()
      cy.getOpenedDropdownMenu().findByText('Delete').click()

      cy.getSpinner().should('not.exist')
      cy.getOpenedModal()
        .findByButtonText(/Delete App/)
        .click()

      cy.findAllByText(appName).should('not.exist')
    })
  })
})
