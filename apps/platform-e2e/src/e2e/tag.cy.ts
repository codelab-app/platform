import {
  CreateData,
  DeleteTreeData,
  UpdateData,
} from '@codelab/shared/data/test'
import { loginSession } from '../support/nextjs-auth0/commands/login'

describe('Tag CRUD', () => {
  before(() => {
    cy.resetDatabase()
    loginSession()

    cy.request('/api/cypress/tag').then(() => {
      cy.visit('/tags')
    })
  })

  describe('create', () => {
    const testCreate = (name: string, parentName?: string) => {
      cy.getCuiTreeItemByPrimaryTitle(name).should('exist')

      if (parentName) {
        cy.toggleTreeNodeSwitcher(parentName)
      }

      cy.getTree().findByText(name).should('exist')
    }

    it('should be able to create a tag', () => {
      cy.createTagByUI(CreateData.tag_0)
      testCreate(CreateData.tag_0)
    })

    it('should be able to create a tag with parent', () => {
      cy.createTagByUI(
        CreateData.tag_0_0,
        // CreateData.parentTagName1
      )
      testCreate(CreateData.tag_0_0, CreateData.tag_0)
    })
  })

  describe('update', () => {
    it('should be able to update tag name using edit button in the table', () => {
      cy.getCuiTreeItemByPrimaryTitle(UpdateData.tag_0).click()

      cy.findByLabelText('Name').should('have.value', UpdateData.tag_0)
      cy.findByLabelText('Name').clear()
      cy.findByLabelText('Name').type(UpdateData.updated_tag_0)
      cy.getButton({ label: /Update Tag/ }).click()

      cy.getCuiTreeItemByPrimaryTitle(UpdateData.tag_0).should('not.exist')
      cy.getCuiTreeItemByPrimaryTitle(UpdateData.updated_tag_0).should('exist')
    })
  })

  describe('delete', () => {
    const deleteTagNodeInTree = (tagName: string) => {
      cy.toggleTreeNodeChk(tagName)
      cy.getCuiSidebar('Tags').getToolbarItem('Delete Tag').click()
      cy.getModal().findByText(`Are you sure you want to delete ${tagName}?`)
      cy.getModal()
        .getModalAction(/Delete Tags/)
        .click()
      cy.getModal().should('not.exist')

      cy.getCuiTreeItemByPrimaryTitle(tagName).should('not.exist')
    }

    it('should be able to delete a tag inside its parent', () => {
      cy.toggleTreeNodeSwitcher(DeleteTreeData.tag_0)
      cy.getCuiTreeItemByPrimaryTitle(DeleteTreeData.tag_0_0).should('exist')
      deleteTagNodeInTree(DeleteTreeData.tag_0_0)
    })

    it('should be able to delete a tag', () => {
      deleteTagNodeInTree(DeleteTreeData.tag_0)
    })

    it('should be able to delete a tag with parent', () => {
      cy.toggleTreeNodeSwitcher(DeleteTreeData.tag_1)
      cy.getCuiTreeItemByPrimaryTitle(DeleteTreeData.tag_1).should('exist')
      cy.getCuiTreeItemByPrimaryTitle(DeleteTreeData.tag_1_0).should('exist')
      deleteTagNodeInTree(DeleteTreeData.tag_1)
    })
  })
})
