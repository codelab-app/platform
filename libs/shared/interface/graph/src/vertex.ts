import { NodeType } from '@codelab/shared/interface/node'

export type VertexProps = {
  id: string
}

export interface Vertex {
  id: string
}

export enum VertexType {
  REACT_BUTTON = 'REACT_BUTTON',
  REACT_TEXT = 'REACT_TEXT',
}

export interface DeleteVertexDTO {
  id: string
}

export interface CreateVertexDTO {
  type: NodeType
}
