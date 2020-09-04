import { Props } from '@codelab/props'
import { WithNodeType, NodeTypeEnum } from '../../codec/Node--type.i'
import { ModelProps } from './Node-model--props'

export interface ModelNodeI<P extends Props = any> extends WithNodeType {
  nodeType: NodeTypeEnum.Model
  props?: ModelProps
  children?: Array<ModelNodeI<P>>
}

export const isModelNode = (node: any): node is ModelNodeI => {
  return node.nodeType === NodeTypeEnum.Model
}
