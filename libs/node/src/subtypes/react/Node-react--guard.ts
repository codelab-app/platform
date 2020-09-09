import { NodeTypeEnum } from '../../codec'
import { ReactNodeI } from './Node-react'

export const isReactNode = (node: any): node is ReactNodeI => {
  return node?.nodeType === NodeTypeEnum.React && node.type
}
