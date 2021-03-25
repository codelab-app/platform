import { NodeA, NodeI } from '@codelab/frontend'

export const isReactNode = (node: NodeI | NodeA): node is NodeI | NodeA => {
  if (typeof node?.type !== 'string') {
    return false
  }

  return node?.type.includes('React_')
}

export const isReactNodeArray = (
  nodes: Array<NodeI | NodeA> = [],
): nodes is Array<NodeI | NodeA> => {
  if (!Array.isArray(nodes) || nodes.length === 0) {
    return false
  }

  return nodes.filter((node) => !isReactNode(node)).length === 0
}
