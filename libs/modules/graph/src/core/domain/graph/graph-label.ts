import { ValueObject } from '@codelab/backend'

export interface IGraphLabel {
  value: string
}

export class GraphLabel extends ValueObject<IGraphLabel> {
  declare value: string
}
