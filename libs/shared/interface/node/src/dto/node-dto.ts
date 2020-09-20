import { NodeType } from '../enums/node-enum'
import { Props } from '@codelab/shared/interface/props'

export interface NodeDtoI<T extends NodeType = NodeType, P extends Props = {}> {
  id?: string
  type: NodeType
  props?: P
  children?: Array<NodeDtoI<T, P>>
}

export interface NodeDtoA<T extends NodeType = NodeType, P extends Props = {}> {
  id: string
  type: T
  props: P
  children: Array<NodeDtoA<T, P>>
}
