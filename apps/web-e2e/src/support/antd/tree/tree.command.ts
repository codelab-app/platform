import { Label } from '../types'

export const getTreeNode = (label: Label) => {
  return cy.contains('.ant-tree-treenode', label)
}
