import { ValueObject } from '@codelab/backend'

export interface EdgeSourceProps {
  value: string
}

export class EdgeSource extends ValueObject<EdgeSourceProps> {
  declare value: string
}
