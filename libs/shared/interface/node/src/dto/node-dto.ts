import { Optional } from 'utility-types'
import { NodeType, NodeTypeEnum } from '../enums/node-enum'

export interface NodeDTO {
  id: string
  type: string
  props: any
  children: Array<NodeDTO>
}

export interface NodeDtoI<P extends object = {}> {
  id?: string
  type: NodeType
  props?: P
  children?: Array<NodeDtoI<P>>
}

export interface NodeDtoA<T extends NodeTypeEnum = NodeTypeEnum> {
  id: string
  type: T
  props: any
  children: Array<NodeDtoA<T>>
}

export type CreateNodeDTO = Optional<NodeDTO, 'id'> // using utility-types NPM
