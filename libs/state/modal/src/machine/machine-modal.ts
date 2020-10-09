import { Machine, assign } from 'xstate'
import { ContextModal } from './machine-modal--context'
import { EventModal } from './machine-modal--event'
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
        entry: ['enterInactive'],
        on: {
          OPEN: {
            target: 'active',
            actions: assign({
              visible: (context: any, event) => {
                console.log('OPEN')

                return true
              },
            }),
          },
        },
      },
      [StateNameModal.ACTIVE]: {
        on: {
          CLOSE: {
            target: 'inactive',
            actions: assign({
              visible: (context: any, event) => {
                console.log('CLOSE')

                return false
              },
            }),
          },
        },
      },
    },
  },
  {
    actions: {
      enterInactive: (context: any, event) => {
        console.log('enter inactive...')
      },
    },
  },
)
