import { NodeTypeEnum } from '../../codec'
import { ModelNodeI } from './Node-model'

export const isModelNode = (node: any): node is ModelNodeI => {
  return node.nodeType === NodeTypeEnum.Model
}
