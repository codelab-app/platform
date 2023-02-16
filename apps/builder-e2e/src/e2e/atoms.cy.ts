import { IAtomType } from '@codelab/shared/abstract/core'
import { FIELD_TYPE } from '../support/antd/form'

const atomName = 'Button'
const atomType = IAtomType.AntDesignButton
const updatedAtomName = 'Button updated'

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

      cy.getModal().setFormFieldValue({ label: 'Name', value: atomName })

      cy.getModal().setFormFieldValue({
        label: 'Type',
        value: atomType,
        type: FIELD_TYPE.SELECT,
      })

      cy.getModal()
        .getModalAction(/Create Atom/)
        .click()
      cy.getModal().should('not.exist')

      cy.findByText(atomName).should('exist')
    })
  })

  describe('update', () => {
    it('should be able to update atom name', () => {
      cy.searchTableRow({
        header: 'Name',
        row: atomName,
      })
        .getButton({
          icon: 'edit',
        })
        .click()
      cy.getSpinner().should('not.exist')

      cy.getModal().setFormFieldValue({ label: 'Name', value: updatedAtomName })

      cy.getModal()
        .getModalAction(/Update Atom/)
        .click()
      cy.getModal().should('not.exist')

      cy.findByText(atomName).should('not.exist')
      cy.findByText(updatedAtomName).should('exist')
    })
  })

  describe('delete', () => {
    it('should be able to delete an atom', () => {
      cy.searchTableRow({
        header: 'Name',
        row: updatedAtomName,
      })
        .getButton({ icon: 'delete' })
        .click()
      cy.getSpinner().should('not.exist')

      cy.getModal()
        .getModalAction(/Delete Atom/)
        .click()
      cy.getModal().should('not.exist')

      cy.findAllByText(updatedAtomName).should('not.exist')
    })
  })
})
