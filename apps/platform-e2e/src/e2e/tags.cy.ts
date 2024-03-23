import { MODEL_ACTION, MODEL_UI } from '@codelab/frontend/abstract/types'
import { CreateData, UpdateData } from '@codelab/shared/data/test'

describe('Tag CRUD', () => {
  before(() => {
    // cy.postApiRequest('/tag/seed-cypress-tag').as('cypressTag')
    // cy.get('@cypressTag').then(() => cy.visit('/tags'))

    cy.visit('/tags')
  })

  describe('create', () => {
    it('should be able to create tags', () => {
      cy.createTagByUI(CreateData.tag_0)
      cy.createTagByUI(CreateData.tag_1)
    })

    it('should be able to create a tag with parent', () => {
      cy.createTagByUI(CreateData.tag_0_0, CreateData.tag_0)
      cy.createTagByUI(CreateData.tag_1_0, CreateData.tag_1)

      cy.getCuiTreeItemByPrimaryTitle(CreateData.tag_0).should('be.visible')
      cy.getCuiTreeItemByPrimaryTitle(CreateData.tag_0_0).should('be.visible')
      cy.getCuiTreeItemByPrimaryTitle(CreateData.tag_1).should('be.visible')
      cy.getCuiTreeItemByPrimaryTitle(CreateData.tag_1_0).should('be.visible')
    })
  })

  describe('update', () => {
    it('should be able to update tag name using edit button in the table', () => {
      cy.getCuiTreeItemByPrimaryTitle(CreateData.tag_0).click()

      cy.findByLabelText('Name').should('have.value', CreateData.tag_0)
      cy.findByLabelText('Name').clear()
      cy.findByLabelText('Name').type(UpdateData.tag_0)
      cy.getButton({ label: /Update Tag/ }).click()

      cy.getCuiTreeItemByPrimaryTitle(CreateData.tag_0).should('not.exist')
      cy.getCuiTreeItemByPrimaryTitle(UpdateData.tag_0).should('exist')
    })
  })

  describe('delete', () => {
    const deleteTagNodeInTree = (tagName: string) => {
      cy.getCuiTreeItemByPrimaryTitle(tagName)
        .closestCuiTreeNode()
        .trigger('mouseover')

      cy.getCuiTreeItemByPrimaryTitle(tagName)
        .closestCuiTreeNode()
        .getCuiToolbarItem(MODEL_ACTION.DeleteTag.key)
        .click()

      cy.getModal().findByText(`Are you sure you want to delete ${tagName}?`)
      cy.getModal()
        .getModalAction(/Delete Tags/)
        .click()
      cy.getModal().should('not.exist')

      cy.getCuiTreeItemByPrimaryTitle(tagName).should('not.exist')
    }

    it('should be able to delete a tag inside its parent', () => {
      // cy.toggleCuiTreeNodeCheckbox(UpdateData.tag_0)
      // cy.getCuiTreeItemByPrimaryTitle(CreateData.tag_0_0).should('exist')
      deleteTagNodeInTree(CreateData.tag_0_0)

      cy.getCuiTreeItemByPrimaryTitle(CreateData.tag_0_0).should('not.exist')
    })

    it('should be able to delete a tag', () => {
      deleteTagNodeInTree(UpdateData.tag_0)
      cy.getCuiTreeItemByPrimaryTitle(UpdateData.tag_0).should('not.exist')
    })

    it('should be able to delete a tag with parent', () => {
      deleteTagNodeInTree(CreateData.tag_1)
      cy.getCuiTreeItemByPrimaryTitle(CreateData.tag_1).should('not.exist')
    })
  })
})
