import { ReactNodeI } from './node-react'
import { NodeTypeEnum } from '../../node--enum'

export const isReactNode = (node: any): node is ReactNodeI => {
  return node?.nodeType === NodeTypeEnum.React && node.type
}
