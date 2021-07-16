describe('Apps CRUD', () => {
  before(() => {
    // cy.clearCookies()
    cy.login().then(() => {
      // delete all apps for current user
      cy.getCurrentUserId().then((userId) => {
        // FIXME
        // cy.dGraphGraphqlRequest({
        //   query: print(DeleteUserAppsGql),
        //   variables: {
        //     userId,
        //   },
        // })
      })
    })
  })

  beforeEach(() => {
    cy.login().then(() => {
      cy.visit('/apps')
      // Cypress.Cookies.preserveOnce('appSession')
      cy.getSpinner().should('not.exist')
    })
  })

  const appName = 'new app'
  const updatedAppName = 'updated app'

  describe('create', () => {
    it('should be able to create app', () => {
      // check that we don't have app with test-name
      cy.findAllByText(appName, { exact: true, timeout: 0 }).should('not.exist')

      cy.findByButtonText(/create app/i).click()

      cy.getOpenedModal().findByLabelText('Name').type(appName)
      cy.getOpenedModal()
        .findByButtonText(/create app/i)
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
        .findByButtonText(/update app/i)
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
        .findByButtonText(/delete app/i)
        .click()

      cy.findAllByText(appName).should('not.exist')
    })
  })
})
