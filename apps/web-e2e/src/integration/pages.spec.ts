import { TIMEOUT } from '../support/timeout'

describe('Pages', () => {
  let appId: string
  const pageName = 'new useful page'
  const updatedPageName = 'updated page'

  before(() => {
    cy.resetDgraphData()
    cy.login().then(() => {
      cy.createApp().then((app: any) => {
        appId = app.id
      })
    })
  })

  beforeEach(() => {
    cy.preserveAuthCookies()
  })

  describe('create', () => {
    before(() => {
      cy.visit(`/apps/${appId}/pages`)
    })

    it('should be able to create page', () => {
      cy.findAllByText(pageName, { exact: true, timeout: TIMEOUT }).should(
        'not.exist',
      )

      cy.findByRole('button', { name: /plus/ }).click()

      cy.getOpenedModal().findByLabelText('Name').type(pageName)
      cy.getOpenedModal()
        .findByButtonText(/Create Page/)
        .click()

      cy.getOpenedModal().should('not.exist')
      cy.findByText(pageName).should('exist')
    })
  })

  describe('update', () => {
    it('should be able to update page name', () => {
      cy.findEditButtonByPageName(pageName).click()

      cy.getSpinner().should('not.exist')
      cy.getOpenedModal().findByLabelText('Name').clear().type(updatedPageName)

      cy.getOpenedModal()
        .findByButtonText(/Update Page/)
        .click()

      cy.getOpenedModal().should('not.exist')
      cy.findByText(pageName).should('not.exist')
      cy.findByText(updatedPageName).should('exist')
    })
  })

  describe('delete', () => {
    it('should be able to delete page', () => {
      cy.findDeleteButtonByPageName(updatedPageName).click()

      cy.getSpinner().should('not.exist')
      cy.getOpenedModal()
        .findByButtonText(/Delete Page/)
        .click()

      cy.findAllByText(updatedPageName).should('not.exist')
    })
  })
})
