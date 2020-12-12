import { NodeType } from '../enums'
import { Props } from '@codelab/alpha/shared/interface/props'

export interface NodeI<T extends NodeType = NodeType, P extends Props = Props> {
  id?: string
  type: T
  props?: P
  children?: Array<NodeI<T, P>>
}

export interface NodeA<T extends NodeType = NodeType, P extends Props = Props> {
  id: string
  type: T
  props: P
  children: Array<NodeA<T, P>>
}
