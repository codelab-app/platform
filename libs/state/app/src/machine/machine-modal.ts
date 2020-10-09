import { Machine, assign } from 'xstate'

export const machineModal = Machine(
  {
    id: 'modal',
    initial: 'inactive',
    context: {
      visible: false,
    },
    states: {
      inactive: {
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
      active: {
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
