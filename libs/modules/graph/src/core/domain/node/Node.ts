import { VertexType } from '@prisma/client'

export interface NodeI {
  id?: string
  type: VertexType
  children: Array<NodeI>
  props: object
}

export interface NodeA {
  id: string
  type: VertexType
  children: Array<NodeA>
  props: object
  parent?: NodeA
}
