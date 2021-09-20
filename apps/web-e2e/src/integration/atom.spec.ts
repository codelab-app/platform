import { AtomType } from '@codelab/shared/abstract/core'

const atomName = 'Row'
const atomType = AtomType.AntDesignButton
const updatedAtomName = 'Row updated'

describe('Atoms', () => {
  const findEditButtonByAtomName = (text: string) =>
    cy
      .findByText(text, { exact: true, timeout: 0 })
      .closest('.ant-table-row')
      .find('.anticon-edit')
      .closest('button')

  const findDeleteButtonByAtomName = (text: string) =>
    cy
      .findByText(text, { exact: true, timeout: 0 })
      .closest('.ant-table-row')
      .find('.anticon-delete')
      .closest('button')

  before(() => {
    cy.resetDgraphData().then(() => {
      cy.login().then(() => {
        cy.preserveAuthCookies()
      })
    })
  })

  beforeEach(() => {
    cy.preserveAuthCookies()
  })

  describe('create', () => {
    before(() => {
      cy.visit(`/atoms`)
    })

    it('should be able to create atom', () => {
      cy.findAllByText(atomName, { exact: true, timeout: 0 }).should(
        'not.exist',
      )

      cy.findByRole('button', { name: /plus/ }).click()

      cy.getOpenedModal().findByLabelText('Name').type(atomName)
      cy.getOpenedModal().findByLabelText('Type').type(atomType)
      cy.getSelectOptionItemByValue(atomType).first().click()
      cy.getOpenedModal()
        .findByButtonText(/Create Atom/)
        .click()

      cy.getOpenedModal().should('not.exist')
      cy.findByText(atomName).should('exist')
    })
  })

  describe('update', () => {
    it('should be able to update atom name', () => {
      findEditButtonByAtomName(atomName).click()

      cy.getSpinner().should('not.exist')
      cy.getOpenedModal().findByLabelText('Name').clear().type(updatedAtomName)

      cy.getOpenedModal()
        .findByButtonText(/Update Atom/)
        .click()

      cy.getOpenedModal().should('not.exist')
      cy.findByText(atomName).should('not.exist')
      cy.findByText(updatedAtomName).should('exist')
    })
  })

  describe('delete', () => {
    it('should be able to delete page', () => {
      findDeleteButtonByAtomName(updatedAtomName).click()

      cy.getSpinner().should('not.exist')
      cy.getOpenedModal()
        .findByButtonText(/Delete Atom/)
        .click()

      cy.findAllByText(updatedAtomName).should('not.exist')
    })
  })
})
