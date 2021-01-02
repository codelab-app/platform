import { ValueObject } from '@codelab/backend'

export interface VertexParentProps {
  value: string
}

export class VertexParent extends ValueObject<VertexParentProps> {
  declare value: string
}
