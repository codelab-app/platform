import { ValueObject } from '@codelab/backend'

export interface VertexPropsProps {
  value: any
}

export class VertexProps extends ValueObject<VertexPropsProps> {
  declare value: any
}
