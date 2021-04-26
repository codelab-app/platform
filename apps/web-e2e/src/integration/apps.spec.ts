describe('Apps CRUD', () => {
  before(() => {
    cy.login()
    cy.visit('/apps')
  })
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('appSession')
  })
  it('should load existing apps', () => {
    cy.getSpinner().should('not.exist')
  })

  const nameOfCreatedApp = 'new gorgeous app'
  describe('create usecase', () => {
    it('should be able to cancel app creation', () => {
      cy.findByButtonText('Create App').click()

      cy.findByLabelText('Name').type('some test input')

      cy.getOpenedModal().findByButtonText('Cancel').click()
      cy.findByButtonText('Create App').click()

      cy.getOpenedModal()
        .findByLabelText('Name')
        .invoke('val')
        .should('equal', '')

      // close modal
      cy.getOpenedModal().findByButtonText('Cancel').click()
    })

    it('should be able to create app', () => {
      const nameOfCreatedApp = 'new gorgeous app'
      // check that we don't have app with test-name
      cy.findAllByText(nameOfCreatedApp, { exact: true, timeout: 0 }).should(
        'not.exist',
      )

      // open creation form
      cy.findByButtonText('Create App').should('exist').click()

      cy.getOpenedModal().findByLabelText('Name').type(nameOfCreatedApp)
      cy.getOpenedModal().findByButtonText('Create App').click()

      cy.getOpenedModal().should('not.exist')
      cy.findByText(nameOfCreatedApp).should('exist')
    })
  })

  const updatedAppName = 'new updated app'
  describe('update usecase', () => {
    it('should be able to update app name', () => {
      cy.findSettingsButtonByAppName(nameOfCreatedApp).click()
      cy.getOpenedDropdownMenu().findByText('Edit').click()

      cy.getOpenedModal().findByLabelText('Name').clear().type(updatedAppName)
      cy.getOpenedModal().findByButtonText('Update App').click()

      cy.getOpenedModal().should('not.exist')
      cy.findByText(nameOfCreatedApp).should('not.exist')
      cy.findByText(updatedAppName).should('exist')
    })
  })

  describe('delete usecase', () => {
    it('should be able to delete app', () => {
      cy.findSettingsButtonByAppName(updatedAppName).click()
      cy.getOpenedDropdownMenu().findByText('Delete').click()

      cy.getOpenedModal().findByButtonText('Delete App').click()

      cy.findAllByText(updatedAppName).should('not.exist')
    })
  })
})
