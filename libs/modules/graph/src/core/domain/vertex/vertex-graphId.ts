import { ValueObject } from '@codelab/backend'

export interface VertexGraphIdProps {
  value: string
}

export class VertexGraphId extends ValueObject<VertexGraphIdProps> {
  declare value: string
}
