import { CY_DATA } from '@codelab/frontend/application/shared/data'
import type {
  CommonOptions,
  Label,
} from '@codelab/frontend/test/cypress/shared'
import type { CypressElement } from '@codelab/frontend/test/cypress/utils'
import type { Maybe } from '@codelab/shared/abstract/types'

export const getTree = (options?: CommonOptions) => {
  return cy.get('.ant-tree', options)
}

export const getTreeNodes = () => {
  return cy.getTree().find('.ant-tree-treenode:not([aria-hidden="true"])')
}

export const getTreeNode = (label: Label) => {
  return cy.getTree().contains('.ant-tree-treenode:not([aria-hidden])', label)
}
