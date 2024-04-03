import { MODEL_ACTION, MODEL_UI } from '@codelab/frontend/abstract/types'
import { FIELD_TYPE } from '@codelab/frontend/test/cypress/antd'
import { IAtomType } from '@codelab/shared/abstract/core'

const atomName = 'Button'
const atomType = IAtomType.AntDesignButton
const updatedAtomName = 'Updated Button'

describe('Atoms CRUD', () => {
  before(() => {
    cy.visit('/atoms')
    cy.waitForSpinners()
  })

  describe('create', () => {
    it('should be able to create atom', () => {
      cy.findAllByText(atomName, { exact: true, timeout: 0 }).should(
        'not.exist',
      )

      cy.getCuiSidebar(MODEL_UI.SidebarAtom.key)
        .getCuiSidebarHeader()
        .getCuiToolbarItem(MODEL_ACTION.CreateAtom.key)
        .click()

      cy.setFormFieldValue({ label: 'Name', value: atomName })

      cy.setFormFieldValue({
        label: 'Type',
        type: FIELD_TYPE.SELECT,
        value: atomType,
      })

      cy.getCuiPopover(MODEL_ACTION.CreateAtom.key)
        .getCuiToolbarItem(MODEL_ACTION.CreateAtom.key)
        .click()

      cy.findByText(atomName).should('exist')
    })
  })

  describe('update', () => {
    it('should be able to update atom name', () => {
      cy.getCuiTreeItemBySecondaryTitle(atomName).click()
      cy.waitForSpinners()

      cy.setFormFieldValue({ label: 'Name', value: updatedAtomName })

      cy.getButton({ label: 'Update Atom' }).click()

      cy.getCuiTreeItemBySecondaryTitle(atomName).should('not.exist')
      cy.getCuiTreeItemBySecondaryTitle(updatedAtomName).should('exist')
    })
  })

  describe('delete', () => {
    it('should be able to delete an atom', () => {
      cy.getCuiTreeItemBySecondaryTitle(updatedAtomName)
        .getCuiTreeItemToolbar()
        .getCuiToolbarItem(MODEL_ACTION.DeleteAtom.key)
        .should('be.visible')
        .click()
      cy.waitForSpinners()

      cy.getModal()
        .getModalAction(/Delete Atom/)
        .click()
      cy.getModal().should('not.exist')

      cy.findAllByText(updatedAtomName).should('not.exist')
    })
  })
})
