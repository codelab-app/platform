import { NodeType, ValueObject } from '@codelab/backend'

export interface VertexTypeProps {
  value: NodeType
}

export class VertexType extends ValueObject<VertexTypeProps> {
  declare value: NodeType
}
