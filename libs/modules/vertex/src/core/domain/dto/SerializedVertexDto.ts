import { NodeType } from '@codelab/alpha/shared/interface/node'

export interface SerializedVertexDto {
  id?: string
  type: NodeType
  props?: any
}
