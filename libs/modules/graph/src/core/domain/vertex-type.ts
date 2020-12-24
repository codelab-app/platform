import { ValueObject } from '@codelab/backend'

export interface VertexTypeProps {
  value: string
}

export class VertexType extends ValueObject<VertexTypeProps> {
  declare value: string
}
