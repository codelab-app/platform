import { Props } from '@codelab/shared/interface/props'
import { WithNodeType } from '../../node--enum'
import { ModelProps } from './node-model--props'

export interface ModelNodeI<P extends Props = any> extends WithNodeType {
  nodeType: 'Model'
  props?: ModelProps
  children?: Array<ModelNodeI<P>>
}
