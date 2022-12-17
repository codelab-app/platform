import type { CommonOptions, Label } from '../types'

export const getTree = (options?: CommonOptions) => {
  return cy.get('.ant-tree', options)
}

export const getTreeNodes = () => {
  return cy.getTree().find('.ant-tree-treenode:not([aria-hidden="true"])')
}

export const getTreeNode = (label: Label) => {
  return cy.getTree().contains('.ant-tree-treenode:not([aria-hidden])', label)
}

export const toggleTreeNodeChk = (label: Label) => {
  return cy
    .getTreeNode(label)
    .children('.ant-tree-checkbox')
    .click({ force: true })
}

export const toggleTreeNodeSwitcher = (label: Label) => {
  return cy.getTreeNode(label).children('.ant-tree-switcher').click()
}
