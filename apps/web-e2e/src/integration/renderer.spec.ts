describe('Renderer', () => {
  before(() => {
    cy.resetDgraphData()

    cy.intercept('POST', '/api/graphql', {
      fixture: 'page.json',
    }).as('pageData')

    cy.login().then(() => {
      cy.preserveAuthCookies()
      cy.visit(`/apps/0x01/pages/0x01/builder`)
    })
  })

  beforeEach(() => {
    cy.preserveAuthCookies()
  })

  describe('Page', () => {
    it('renders a page with a button', () => {
      cy.wait('@pageData')
      cy.findByButtonText('Click Me')
    })
  })
})
