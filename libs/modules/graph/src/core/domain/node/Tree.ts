import { VertexType } from '@prisma/client'

export interface Node {
  type: VertexType
  children: Array<Node>
  props: object
}

export interface NodeA extends Node {
  id: string
}
