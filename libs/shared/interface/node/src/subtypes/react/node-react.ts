import { Props } from '@codelab/shared/interface/props'
import { NodeID, WithNodeType } from '../../node--enum'
import { NodeReactType } from './node-react--enum'

export interface ReactNodeI<P extends Props = any> extends WithNodeType {
  type: NodeReactType
  nodeType: 'React'
  props?: P
  children?: Array<ReactNodeI<P>>
}

export interface ReactNodeA<P extends Props = any> extends WithNodeType {
  id: NodeID
  type: NodeReactType
  nodeType: 'React'
  props: P
  children: Array<ReactNodeA<P>>
}
