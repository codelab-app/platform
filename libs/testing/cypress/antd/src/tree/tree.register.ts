import type { CypressCommand } from '../../types'
import {
  getTree,
  getTreeNode,
  getTreeNodes,
  toggleTreeNodeChk,
  toggleTreeNodeSwitcher,
} from './tree.command'

export interface AntTreeCommands {
  getTree: typeof getTree
  getTreeNode: typeof getTreeNode
  getTreeNodes: typeof getTreeNodes
  toggleTreeNodeChk: typeof toggleTreeNodeChk
  toggleTreeNodeSwitcher: typeof toggleTreeNodeSwitcher
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
