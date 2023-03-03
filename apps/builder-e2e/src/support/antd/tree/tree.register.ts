import type { CypressCommand } from '../../types'
import {
  getTree,
  getTreeNode,
  getTreeNodes,
  toggleTreeNodeChk,
  toggleTreeNodeSwitcher,
} from './tree.command'

export interface AntTreeCommands {
  toggleTreeNodeSwitcher: typeof toggleTreeNodeSwitcher
  getTreeNode: typeof getTreeNode
  getTree: typeof getTree
  toggleTreeNodeChk: typeof toggleTreeNodeChk
  getTreeNodes: typeof getTreeNodes
}

export const antTreeCommands: Array<CypressCommand> = [
  {
    fn: getTreeNodes,
    name: 'getTreeNodes',
  },
  {
    fn: toggleTreeNodeChk,
    name: 'toggleTreeNodeChk',
  },
  {
    fn: getTreeNode,
    name: 'getTreeNode',
  },
  {
    fn: toggleTreeNodeSwitcher,
    name: 'toggleTreeNodeSwitcher',
  },
  {
    fn: getTree,
    name: 'getTree',
  },
]
