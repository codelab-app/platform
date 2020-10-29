import { StateSchema } from 'xstate'
import { ContextModal } from './machine-modal--context'

export enum StateNameModal {
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE',
}

export interface StateSchemaModal<T = ContextModal> extends StateSchema<T> {
  states: {
    [StateNameModal.INACTIVE]: StateSchema<T>
    [StateNameModal.ACTIVE]: StateSchema<T>
  }
}
