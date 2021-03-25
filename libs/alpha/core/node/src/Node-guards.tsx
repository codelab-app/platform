import { NodeI } from '@codelab/frontend'

export const isReactNode = (node: NodeI): node is NodeI => {
  if (typeof node?.type !== 'string') {
    return false
  }

  return node?.type.includes('React_')
}

export const isReactNodeArray = (
  nodes: Array<NodeI> = [],
): nodes is Array<NodeI> => {
  if (!Array.isArray(nodes) || nodes.length === 0) {
    return false
  }

  return nodes.filter((node) => !isReactNode(node)).length === 0
}
