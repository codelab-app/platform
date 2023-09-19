import { IAtomType } from '@codelab/shared/abstract/core'
import { FIELD_TYPE } from '@codelab/testing/cypress/antd'
import { loginAndResetDatabase } from '@codelab/testing/cypress/nextjs-auth0'

const atomName = 'Button'
const atomType = IAtomType.AntDesignButton
const updatedAtomName = 'Updated Button'

describe('Atoms CRUD', () => {
  before(() => {
    loginSession()
    cy.resetDatabaseExceptForUserAndAtom()
    cy.visit('/atoms')
  })

  describe('create', () => {
    it('should be able to create atom', () => {
      cy.findAllByText(atomName, { exact: true, timeout: 0 }).should(
        'not.exist',
      )

      cy.getHeaderToolbarItem('Create Atom').click()

      cy.setFormFieldValue({ label: 'Name', value: atomName })

      cy.setFormFieldValue({
        label: 'Type',
        type: FIELD_TYPE.SELECT,
        value: atomType,
      })

      cy.getCuiPopover('Create Atom').within(() => {
        cy.getToolbarItem('Create').click()
      })

      cy.findByText(atomName).should('exist')
    })
  })

  describe('update', () => {
    it('should be able to update atom name', () => {
      cy.getCuiTreeItemBySecondaryTitle(atomName).click()
      cy.getSpinner().should('not.exist')

      cy.setFormFieldValue({ label: 'Name', value: updatedAtomName })

      cy.getButton({ label: 'Update Atom' }).click()

      cy.getCuiTreeItemBySecondaryTitle(atomName).should('not.exist')
      cy.getCuiTreeItemBySecondaryTitle(updatedAtomName).should('exist')
    })
  })

  describe('delete', () => {
    it('should be able to delete an atom', () => {
      cy.getCuiTreeItemBySecondaryTitle(updatedAtomName).within(() => {
        cy.getCuiTreeItemToolbar()
          .getToolbarItem('Delete atom')
          .should('be.visible')
          .click()
      })
      cy.getSpinner().should('not.exist')

      cy.getModal()
        .getModalAction(/Delete Atom/)
        .click()
      cy.getModal().should('not.exist')

      cy.findAllByText(updatedAtomName).should('not.exist')
    })
  })
})
