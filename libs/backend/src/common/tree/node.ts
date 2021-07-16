import { Entity } from '../entity/entity'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Node<TData> extends Entity {
  children: Array<Node<TData>>
  data: TData
}
