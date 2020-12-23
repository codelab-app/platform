import { ValueObject } from '@codelab/backend'

export interface IEdgeProps {
  value: any
}

export class EdgeProps extends ValueObject<IEdgeProps> {
  declare value: any
}
