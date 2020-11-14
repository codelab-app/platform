import { Machine, MachineConfig, assign } from 'xstate'
import { modalActions } from './machine-modal--actions'
import { ContextModal } from './machine-modal--context'
import { EventModal, EventNameModal } from './machine-modal--event'
import {
  StateNameModal,
  StateSchemaModal,
  StateSchemaModalCrud,
} from './machine-modal--state'
import { StateNameEntity } from '@codelab/shared/interface/entity'

const stateModalCrud: MachineConfig<
  ContextModal,
  StateSchemaModalCrud,
  EventModal
> = {
  initial: StateNameEntity.IDLE,
  states: {
    [StateNameEntity.IDLE]: {
      on: {
        [EventNameModal.OPEN]: {},
      },
    },
    [StateNameEntity.CREATING]: {
      on: {
        [EventNameModal.OK]: {},
        [EventNameModal.CLOSE]: {},
      },
    },
    [StateNameEntity.EDITING]: {
      on: {
        [EventNameModal.OK]: {},
        [EventNameModal.CLOSE]: {},
      },
    },
  },
}

export const machineModalCrud = Machine<
  ContextModal,
  StateSchemaModal,
  EventModal
>({
  id: 'modal',
  initial: StateNameModal.INACTIVE,
  context: {
    visible: false,
  },
  states: {
    [StateNameModal.INACTIVE]: {
      entry: assign<ContextModal, EventModal>({
        visible: false,
      }),
      on: {
        [EventNameModal.OPEN]: {
          target: StateNameModal.ACTIVE,
        },
      },
    },
    [StateNameModal.ACTIVE]: stateModalCrud,
  },
}).withConfig({
  actions: modalActions,
})
