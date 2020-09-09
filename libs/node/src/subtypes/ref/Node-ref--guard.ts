import { NodeTypeEnum } from '../../codec'
import { RefNodeI } from './Node-ref'

export const isRefNode = (node: any): node is RefNodeI => {
  return node.nodeType === NodeTypeEnum.Ref
}
