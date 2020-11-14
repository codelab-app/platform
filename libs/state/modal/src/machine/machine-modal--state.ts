import { StateSchema } from 'xstate'
import { ContextModal } from './machine-modal--context'
import { StateNameEntity } from '@codelab/shared/interface/entity'

export enum StateNameModal {
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE',
}

export interface StateSchemaModal<T = ContextModal> extends StateSchema<T> {
  states: {
    [StateNameModal.INACTIVE]: StateSchemaModalCrud<T>
    [StateNameModal.ACTIVE]: StateSchemaModalCrud<T>
  }
}

export interface StateSchemaModalCrud<T = ContextModal> extends StateSchema<T> {
  states: {
    [StateNameEntity.IDLE]: StateSchemaModal<T>
    [StateNameEntity.CREATING]: StateSchemaModal<T>
    [StateNameEntity.EDITING]: StateSchemaModal<T>
  }
}
