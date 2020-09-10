import { RefNodeI } from './node-ref'
import { NodeTypeEnum } from '../../node--enum'

export const isRefNode = (node: any): node is RefNodeI => {
  return node.nodeType === NodeTypeEnum.Ref
}
