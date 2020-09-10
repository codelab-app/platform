import { Props } from '@codelab/shared/interface/props'
import { NodeID, WithNodeType } from '../../node--enum'

export interface ReactNodeI<P extends Props = any> extends WithNodeType {
  type: string
  nodeType: 'React'
  props?: P
  children?: Array<ReactNodeI<P>>
}

export interface ReactNodeA<P extends Props = any> extends WithNodeType {
  id: NodeID
  type: string
  nodeType: 'React'
  props: P
  children: Array<ReactNodeA<P>>
}
