import { v4 } from 'uuid'
import { createData, deleteData, updateData } from '../data/tag'
import { loginSession } from '../support/nextjs-auth0/commands/login'

describe('Tag CRUD', () => {
  before(() => {
    cy.resetDatabase()
    loginSession()

    cy.getCurrentUserId()
      .then((userId) => {
        if (!userId) {
          throw new Error('no user id')
        }

        cy.createTag({
          id: v4(),
          name: updateData.tag_0,
          owner: { connect: { where: { node: { auth0Id: userId } } } },
        })

        /**
         * Delete
         *
         * Parent 1 - Tag 1
         * Tag 2
         */
        cy.createTag({
          id: v4(),
          name: deleteData.table.tag_0,
          owner: { connect: { where: { node: { auth0Id: userId } } } },
        }).then((value) => {
          const parentId = value[0].id

          cy.createTag({
            id: v4(),
            name: deleteData.table.tag_0_0,
            parent: { connect: { where: { node: { id: parentId } } } },
            owner: { connect: { where: { node: { auth0Id: userId } } } },
          })
        })

        /**
         * Delete tag
         *
         * Tag-0 -> Tag-0_0
         * Tag-0_1
         */
        cy.createTag({
          id: v4(),
          name: deleteData.tree.tag_0,
          owner: { connect: { where: { node: { auth0Id: userId } } } },
        }).then((value) => {
          const parentId = value[0].id

          cy.createTag({
            id: v4(),
            name: deleteData.tree.tag_0_0,
            parent: { connect: { where: { node: { id: parentId } } } },
            owner: { connect: { where: { node: { auth0Id: userId } } } },
          })
        })

        cy.createTag({
          id: v4(),
          name: deleteData.table.tag_0_1,
          owner: { connect: { where: { node: { auth0Id: userId } } } },
        })

        cy.createTag({
          id: v4(),
          name: deleteData.tree.tag_1,
          owner: { connect: { where: { node: { auth0Id: userId } } } },
        }).then((value) => {
          const parentId = value[0].id

          cy.createTag({
            id: v4(),
            name: deleteData.tree.tag_1_0,
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
      cy.createTagByUI(createData.tag_0)
      testCreate(createData.tag_0)
    })

    it('should be able to create a tag with parent', () => {
      cy.createTagByUI(
        createData.tag_0_0,
        // createData.parentTagName1
      )
      testCreate(createData.tag_0_0, createData.tag_0)
    })
  })

  describe('update', () => {
    it('should be able to update tag name using edit button in the table', () => {
      cy.searchTableRow({
        header: 'Name',
        row: new RegExp(`^${updateData.tag_0}$`),
      })
        .getButton({ icon: 'edit' })
        .click()
      cy.getModal()
        .findByLabelText('Name')
        .should('have.value', updateData.tag_0)
      cy.getModal()
        .findByLabelText('Name')
        .clear()
        .type(updateData.updated_tag_0)
      cy.getModal()
        .getModalAction(/Update Tag/)
        .click()

      cy.getModal().should('not.exist')

      cy.getTable().findByText(updateData.tag_0).should('not.exist')
      cy.getTable().findByText(updateData.updated_tag_0).should('exist')
    })
  })

  describe('delete', () => {
    describe('table', () => {
      it('should be able to delete a tag with parent', () => {
        cy.getTable().findAllByText(deleteData.table.tag_0_0).should('exist')
        cy.deleteTagInTableByUI(deleteData.table.tag_0)

        cy.getTable()
          .findAllByText(deleteData.table.tag_0_0)
          .should('not.exist')
      })

      it('should be able to delete a tag', () => {
        cy.deleteTagInTableByUI(deleteData.table.tag_0_1)
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
        cy.toggleTreeNodeSwitcher(deleteData.tree.tag_0)
        cy.getTreeNode(deleteData.tree.tag_0_0).should('exist')
        deleteTagNodeInTree(deleteData.tree.tag_0_0)
      })

      it('should be able to delete a tag', () => {
        deleteTagNodeInTree(deleteData.tree.tag_0)
      })

      it('should be able to delete a tag with parent', () => {
        cy.toggleTreeNodeSwitcher(deleteData.tree.tag_1)
        cy.getTreeNode(deleteData.tree.tag_1).should('exist')
        cy.getTreeNode(deleteData.tree.tag_1_0).should('exist')
        deleteTagNodeInTree(deleteData.tree.tag_1)
        cy.getTreeNode(deleteData.tree.tag_1_0).should('not.exist')
      })
    })
  })
})
