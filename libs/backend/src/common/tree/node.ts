import { Entity } from '../entity/entity'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Node extends Entity {
  children: Array<Node>
  data: any
}
