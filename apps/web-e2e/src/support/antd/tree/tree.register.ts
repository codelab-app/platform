import { CypressCommand } from '../../types'
import { getTreeNode } from './tree.command'

export interface AntTreeCommands {
  getTreeNode: typeof getTreeNode
}

export const antTreeCommands: Array<CypressCommand> = [
  {
    name: 'getTreeNode',
    fn: getTreeNode,
  },
]
