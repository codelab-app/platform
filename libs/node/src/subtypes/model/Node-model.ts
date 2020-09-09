import { Props } from '@codelab/shared/interface'
import { WithNodeType } from '../../codec/Node--type.i'
import { ModelProps } from './Node-model--props'

export interface ModelNodeI<P extends Props = any> extends WithNodeType {
  nodeType: 'Model'
  props?: ModelProps
  children?: Array<ModelNodeI<P>>
}
