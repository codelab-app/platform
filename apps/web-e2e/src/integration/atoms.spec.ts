import { AtomType } from '@codelab/shared/abstract/core'
import { domClasses } from '../support/selectors/domClasses'

const atomName = 'Row'
const atomType = AtomType.AntDesignButton
const updatedAtomName = 'Row updated'

describe('Atoms CRUD', () => {
  before(() => {
    cy.resetDatabase().then(() => {
      cy.login()
    })
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
      cy.selectOptionItem('Type', atomType)

      cy.getOpenedModal()
        .findByButtonText(/Create Atom/)
        .click()

      cy.getOpenedModal().should('not.exist')
      cy.findByText(atomName).should('exist')
    })
  })

  describe('update', () => {
    it('should be able to update atom name', () => {
      cy.findButtonByItemText(
        atomName,
        domClasses.buttons.edit,
        domClasses.tableRow,
      ).click()

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
    it('should be able to delete an atom', () => {
      cy.findButtonByItemText(
        updatedAtomName,
        domClasses.buttons.delete,
        domClasses.tableRow,
      ).click()

      cy.getSpinner().should('not.exist')
      cy.getOpenedModal()
        .findByButtonText(/Delete Atom/)
        .click()

      cy.getOpenedModal().should('not.exist')
      cy.findAllByText(updatedAtomName).should('not.exist')
    })
  })
})
