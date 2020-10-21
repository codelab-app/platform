import {
  NodeA,
  NodeI,
  NodeReactA,
  NodeReactI,
  ReactTypeEnum,
} from '@codelab/shared/interface/node'

export const isReactNode = (
  node: NodeI | NodeA,
): node is NodeReactI | NodeReactA => {
  return node?.type in ReactTypeEnum
}

export const isReactNodeArray = (
  nodes: Array<NodeReactI | NodeReactA> = [],
): nodes is Array<NodeReactI | NodeReactA> => {
  if (!Array.isArray(nodes) || nodes.length === 0) return false

  return nodes.filter((node) => !isReactNode(node)).length === 0
}
