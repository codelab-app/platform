import { Machine, assign } from 'xstate'
import { ContextModal } from './machine-modal--context'
import { EventModal, EventNameModal } from './machine-modal--event'
import { StateNameModal, StateSchemaModal } from './machine-modal--state'

export const machineModal = Machine<ContextModal, StateSchemaModal, EventModal>(
  {
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
      [StateNameModal.ACTIVE]: {
        entry: assign<ContextModal, EventModal>({
          visible: true,
        }),
        on: {
          [EventNameModal.CLOSE]: {
            target: StateNameModal.INACTIVE,
          },
        },
      },
    },
  },
)
