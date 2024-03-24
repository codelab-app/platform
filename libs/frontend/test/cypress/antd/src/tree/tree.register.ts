import type { CypressCommand } from '@codelab/frontend/test/cypress/shared'
import { getTree, getTreeNode, getTreeNodes } from './tree.command'

export interface AntTreeCommands {
  getTree: typeof getTree
  getTreeNode: typeof getTreeNode
  getTreeNodes: typeof getTreeNodes
}

export const antTreeCommands: Array<CypressCommand> = [
  {
    fn: getTreeNodes,
  },
  {
    fn: getTreeNode,
  },
  {
    fn: getTree,
  },
]
