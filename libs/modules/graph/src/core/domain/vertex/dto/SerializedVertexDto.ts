import { NodeType } from '@codelab/alpha/shared/interface/node'

export interface SerializedVertexDto {
  id?: string
  type?: NodeType
  parent?: string
  props?: any
}
