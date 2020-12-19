import { ValueObject } from '@codelab/backend'

export interface EdgeTargetProps {
  value: string
}

export class EdgeTarget extends ValueObject<EdgeTargetProps> {
  declare value: string
}
