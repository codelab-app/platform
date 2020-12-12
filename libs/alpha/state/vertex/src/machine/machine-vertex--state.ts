import { StateSchema } from 'xstate'
import { ContextVertex } from './machine-vertex--context'

export enum StateNameVertex {
  IDLE = 'IDLE',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface StateSchemaVertex<T = ContextVertex> extends StateSchema<T> {
  states: {
    [StateNameVertex.IDLE]: StateSchema<T>
    [StateNameVertex.SUCCESS]: StateSchema<T>
    [StateNameVertex.ERROR]: StateSchema<T>
  }
}
