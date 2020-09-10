import { ModelNodeI } from './node-model'
import { NodeTypeEnum } from '../../node--enum'

export const isModelNode = (node: any): node is ModelNodeI => {
  return node.nodeType === NodeTypeEnum.Model
}
