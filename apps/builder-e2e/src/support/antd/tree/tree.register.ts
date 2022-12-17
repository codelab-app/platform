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
    name: 'getTreeNodes',
    fn: getTreeNodes,
  },
  {
    name: 'toggleTreeNodeChk',
    fn: toggleTreeNodeChk,
  },
  {
    name: 'getTreeNode',
    fn: getTreeNode,
  },
  {
    name: 'toggleTreeNodeSwitcher',
    fn: toggleTreeNodeSwitcher,
  },
  {
    name: 'getTree',
    fn: getTree,
  },
]
