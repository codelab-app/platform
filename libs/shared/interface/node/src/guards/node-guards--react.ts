import {
  NodeA,
  NodeI,
  NodeReactA,
  NodeReactI,
} from '@codelab/shared/interface/node'

export const isReactNode = (
  node: NodeI | NodeA,
): node is NodeReactI | NodeReactA => {
  if (typeof node?.type !== 'string') {
    return false
  }

  return node?.type.includes('React.')
}

export const isReactNodeArray = (
  nodes: Array<NodeReactI | NodeReactA> = [],
): nodes is Array<NodeReactI | NodeReactA> => {
  if (!Array.isArray(nodes) || nodes.length === 0) return false

  return nodes.filter((node) => !isReactNode(node)).length === 0
}
