import { EdgeType } from '../inputTypes/EdgeType'

export class MoveNodeRequest {
  declare graphId: string

  declare type: EdgeType
}
