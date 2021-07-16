import { Entity } from '../entity/entity'

export interface NodeLike<TChild extends NodeLike<TChild>> {
  children: Array<TChild>
}

export interface Node<TData> extends Entity, NodeLike<Node<TData>> {
  children: Array<Node<TData>>
  data: TData
}
