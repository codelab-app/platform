import { pageName, updatedAppName, updatedPageName } from './app.data'

describe('Page CRUD', () => {
  describe('create', () => {
    before(() => {
      cy.getCard({ title: updatedAppName }).find('a').click()

      cy.url({ timeout: 5000 }).should('include', 'pages')
    })

    it('should be able to create page', () => {
      cy.findAllByText(pageName).should('not.exist')

      cy.findByRole('button', { name: /plus/ }).click()

      cy.getModal().findByLabelText('Name').type(pageName)
      cy.getModal()
        .getModalAction(/Create Page/)
        .click()

      cy.getModal().should('not.exist')
      cy.findByText(pageName).should('exist')
    })
  })

  describe('update', () => {
    it('should be able to update page name', () => {
      cy.getListItem(pageName)
        .getButton({
          icon: 'edit',
        })
        .click()
      cy.getSpinner().should('not.exist')

      cy.getModal().findByLabelText('Name').clear().type(updatedPageName)

      cy.getModal()
        .getModalAction(/Update Page/)
        .click()
      cy.getModal().should('not.exist')

      cy.findByText(pageName).should('not.exist')
      cy.findByText(updatedPageName).should('exist')
    })
  })

  // Run builder spec here
  require('./builder.spec.required')

  describe('delete', () => {
    before(() => {
      cy.go('back')
    })

    it('should be able to delete page', () => {
      cy.getListItem(updatedPageName)
        .getButton({
          icon: 'delete',
        })
        .click()
      cy.getSpinner().should('not.exist')

      cy.getModal()
        .getModalAction(/Delete Page/)
        .click()
      cy.getModal().should('not.exist')

      cy.findAllByText(updatedPageName).should('not.exist')
    })
  })
})
