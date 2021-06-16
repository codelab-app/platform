describe('Pages', () => {
  let appId: string
  let pageId: string

  const openPagesTab = () => {
    cy.getPaneMain().findByTitle('Pages').click()
  }

  before(() => {
    cy.clearCookies()
    cy.login().then(() => {
      cy.createApp().then((app: any) => {
        appId = app.id
        pageId = app.pages[0].id
      })
    })
  })

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('appSession')
    cy.getSpinner().should('not.exist')
  })

  describe('create', () => {
    before(() => {
      cy.visit(`/apps/${appId}/pages/${pageId}`)
      openPagesTab()
    })

    it('should be able to create page', () => {
      const pageName = 'new useful page'
      cy.findAllByText(pageName, { exact: true, timeout: 0 }).should(
        'not.exist',
      )

      cy.findByRole('button', { name: /plus/i }).click()

      cy.getOpenedModal().findByLabelText('Name').type(pageName)
      cy.getOpenedModal()
        .findByButtonText(/create page/i)
        .click()

      cy.getOpenedModal().should('not.exist')
      cy.findByText(pageName).should('exist')
    })
  })

  describe('update', () => {
    const pageName = 'page for update'
    before(() => {
      cy.createPage(appId, pageName)
      cy.visit(`/apps/${appId}/pages/${pageId}`)
      openPagesTab()
    })

    const updatedPageName = 'updated page'

    it('should be able to update page name', () => {
      cy.findMainPaneButtonByItemName(pageName, 'Settings', {
        timeout: 2000,
      }).click()

      cy.getSpinner().should('not.exist')
      cy.getOpenedModal().findByLabelText('Name').clear().type(updatedPageName)

      cy.getOpenedModal()
        .findByButtonText(/update page/i)
        .click()

      cy.getOpenedModal().should('not.exist')
      cy.findByText(pageName).should('not.exist')
      cy.findByText(updatedPageName).should('exist')
    })
  })

  describe('delete', () => {
    const pageName = 'page for delete'
    before(() => {
      cy.createPage(appId, pageName)
      cy.visit(`/apps/${appId}/pages/${pageId}`)
      openPagesTab()
    })

    it('should be able to delete page', () => {
      cy.findMainPaneButtonByItemName(pageName, 'Delete', {
        timeout: 2000,
      }).click()

      cy.getSpinner().should('not.exist')
      cy.getOpenedModal()
        .findByButtonText(/delete page/i)
        .click()

      cy.findAllByText(pageName).should('not.exist')
    })
  })
  // describe('update', () => {})
})
