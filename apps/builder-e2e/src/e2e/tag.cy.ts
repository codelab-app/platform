import { createData, deleteData, updateData } from '@codelab/shared/data/test'
import { loginSession } from '../support/nextjs-auth0/commands/login'

describe('Tag CRUD', () => {
  before(() => {
    cy.resetDatabase()
    loginSession()

    cy.getCurrentOwner()
      .then((owner) => {
        cy.request('/api/cypress/tag')
      })
      .then(() => {
        cy.visit('/tags')
      })
  })

  describe('create', () => {
    const testCreate = (name: string, parentName?: string) => {
      cy.getTable().findByText(name).should('exist')

      if (parentName) {
        cy.toggleTreeNodeSwitcher(parentName)
      }

      cy.getTree().findByText(name).should('exist')
    }

    it('should be able to create a tag', () => {
      cy.createTagByUI(createData.tag_0!.name)
      testCreate(createData.tag_0!.name)
    })

    it('should be able to create a tag with parent', () => {
      cy.createTagByUI(
        createData.tag_0_0!.name,
        // createData.parentTagName1
      )
      testCreate(createData.tag_0_0!.name, createData.tag_0!.name)
    })
  })

  describe('update', () => {
    it('should be able to update tag name using edit button in the table', () => {
      cy.searchTableRow({
        header: 'Name',
        row: new RegExp(`^${updateData.tag_0!.name}$`),
      })
        .getButton({ icon: 'edit' })
        .click()
      cy.getModal()
        .findByLabelText('Name')
        .should('have.value', updateData.tag_0!.name)
      cy.getModal()
        .findByLabelText('Name')
        .clear()
        .type(updateData.updated_tag_0!.name)
      cy.getModal()
        .getModalAction(/Update Tag/)
        .click()

      cy.getModal().should('not.exist')

      cy.getTable().findByText(updateData.tag_0!.name).should('not.exist')
      cy.getTable().findByText(updateData.updated_tag_0!.name).should('exist')
    })
  })

  describe('delete', () => {
    describe('table', () => {
      it('should be able to delete a tag with parent', () => {
        cy.getTable()
          .findAllByText(deleteData.table!.tag_0_0!.name)
          .should('exist')
        cy.deleteTagInTableByUI(deleteData.table!.tag_0!.name)

        cy.getTable()
          .findAllByText(deleteData.table!.tag_0_0!.name)
          .should('not.exist')
      })

      it('should be able to delete a tag', () => {
        cy.deleteTagInTableByUI(deleteData.table!.tag_0_1!.name)
      })
    })

    describe('tree', () => {
      const deleteTagNodeInTree = (tagName: string) => {
        cy.toggleTreeNodeChk(tagName)
        cy.findByText(/Delete Tags/).click()
        cy.getModal().findByText(`Are you sure you want to delete ${tagName}?`)
        cy.getModal()
          .getModalAction(/Delete Tags/)
          .click()
        cy.getModal().should('not.exist')
        cy.getTreeNode(tagName).should('not.exist')
      }

      it('should be able to delete a tag inside its parent', () => {
        cy.toggleTreeNodeSwitcher(deleteData.tree!.tag_0!.name)
        cy.getTreeNode(deleteData.tree!.tag_0_0!.name).should('exist')
        deleteTagNodeInTree(deleteData.tree!.tag_0_0!.name)
      })

      it('should be able to delete a tag', () => {
        deleteTagNodeInTree(deleteData.tree!.tag_0!.name)
      })

      it('should be able to delete a tag with parent', () => {
        cy.toggleTreeNodeSwitcher(deleteData.tree!.tag_1!.name)
        cy.getTreeNode(deleteData.tree!.tag_1!.name).should('exist')
        cy.getTreeNode(deleteData.tree!.tag_1_0!.name).should('exist')
        deleteTagNodeInTree(deleteData.tree!.tag_1!.name)
        cy.getTreeNode(deleteData.tree!.tag_1_0!.name).should('not.exist')
      })
    })
  })
})
