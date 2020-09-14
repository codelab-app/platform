import { ReactNodeI } from './node-react'
import { NodeTypeEnum } from '../../node--enum'

export const isReactNode = (node: any): node is ReactNodeI => {
  return node?.nodeType === NodeTypeEnum.React && node.type
}

export const isReactNodeArray = (
  nodes: Array<any>,
): nodes is Array<ReactNodeI> => {
  if (!Array.isArray(nodes)) return false

  if (nodes.length === 0) return false

  return nodes.filter((node) => !isReactNode(node)).length === 0
}
