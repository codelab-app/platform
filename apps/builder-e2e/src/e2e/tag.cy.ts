import { v4 } from 'uuid'
import { createData, deleteData, updateData } from '../data/tag'

describe('Tag CRUD', () => {
  before(() => {
    cy.resetDatabase().then(() => {
      cy.login()
    })

    cy.getCurrentUserId()
      .then((userId) => {
        if (!userId) {
          throw new Error('no user id')
        }

        cy.createTag({
          id: v4(),
          name: updateData.tagName1,
          owner: { connect: { where: { node: { auth0Id: userId } } } },
        })

        cy.createTag({
          id: v4(),
          name: deleteData.table.tagName2,
          owner: { connect: { where: { node: { auth0Id: userId } } } },
        })

        cy.createTag({
          id: v4(),
          name: deleteData.table.parentTagName1,
          owner: { connect: { where: { node: { auth0Id: userId } } } },
        }).then((value) => {
          const parentId = value[0].id

          cy.createTag({
            id: v4(),
            name: deleteData.table.tagName1,
            parent: { connect: { where: { node: { id: parentId } } } },
            owner: { connect: { where: { node: { auth0Id: userId } } } },
          })
        })

        cy.createTag({
          id: v4(),
          name: deleteData.tree.parentTagName1,
          owner: { connect: { where: { node: { auth0Id: userId } } } },
        }).then((value) => {
          const parentId = value[0].id

          cy.createTag({
            id: v4(),
            name: deleteData.tree.tagName1,
            parent: { connect: { where: { node: { id: parentId } } } },
            owner: { connect: { where: { node: { auth0Id: userId } } } },
          })
        })

        cy.createTag({
          id: v4(),
          name: deleteData.tree.parentTagName2,
          owner: { connect: { where: { node: { auth0Id: userId } } } },
        }).then((value) => {
          const parentId = value[0].id

          cy.createTag({
            id: v4(),
            name: deleteData.tree.tagName2,
            parent: { connect: { where: { node: { id: parentId } } } },
            owner: { connect: { where: { node: { auth0Id: userId } } } },
          })
        })
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
      cy.createTagByUI(createData.parentTagName1)
      testCreate(createData.parentTagName1)
    })

    it('should be able to create a tag with parent', () => {
      cy.createTagByUI(
        createData.tagName1,
        // createData.parentTagName1
      )
      testCreate(createData.tagName1, createData.parentTagName1)
    })
  })

  describe('update', () => {
    it('should be able to update tag name using edit button in the table', () => {
      cy.searchTableRow({
        header: 'Name',
        row: new RegExp(`^${updateData.tagName1}$`),
      })
        .getButton({ icon: 'edit' })
        .click()
      cy.getModal()
        .findByLabelText('Name')
        .should('have.value', updateData.tagName1)
      cy.getModal()
        .findByLabelText('Name')
        .clear()
        .type(updateData.updatedTagName1)
      cy.getModal()
        .getModalAction(/Update Tag/)
        .click()

      cy.getModal().should('not.exist')

      cy.getTable().findByText(updateData.tagName1).should('not.exist')
      cy.getTable().findByText(updateData.updatedTagName1).should('exist')
    })
  })

  describe('delete', () => {
    describe('table', () => {
      it('should be able to delete a tag with parent', () => {
        cy.getTable().findAllByText(deleteData.table.tagName1).should('exist')
        cy.deleteTagInTableByUI(deleteData.table.parentTagName1)

        cy.getTable()
          .findAllByText(deleteData.table.tagName1)
          .should('not.exist')
      })

      it('should be able to delete a tag', () => {
        cy.deleteTagInTableByUI(deleteData.table.tagName2)
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
        cy.toggleTreeNodeSwitcher(deleteData.tree.parentTagName1)
        cy.getTreeNode(deleteData.tree.tagName1).should('exist')
        deleteTagNodeInTree(deleteData.tree.tagName1)
      })

      it('should be able to delete a tag', () => {
        deleteTagNodeInTree(deleteData.tree.parentTagName1)
      })

      it('should be able to delete a tag with parent', () => {
        cy.toggleTreeNodeSwitcher(deleteData.tree.parentTagName2)
        cy.getTreeNode(deleteData.tree.parentTagName2).should('exist')
        cy.getTreeNode(deleteData.tree.tagName2).should('exist')
        deleteTagNodeInTree(deleteData.tree.parentTagName2)
        cy.getTreeNode(deleteData.tree.tagName2).should('not.exist')
      })
    })
  })
})
