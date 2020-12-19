import { ValueObject } from '@codelab/backend'

export interface IEdgeOrder {
  value: number
}

export class EdgeOrder extends ValueObject<IEdgeOrder> {
  declare value: number
}
