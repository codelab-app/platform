import { useActor, useMachine } from '@xstate/react'
import { Machine, assign, spawn } from 'xstate'
import { createGridMachine } from '@codelab/modules/grid-stories'
import { layoutMachine } from '@codelab/modules/layout-stories'
import { createUserMachine } from '@codelab/modules/user-stories'

export const rootMachine = Machine<any>({
  id: 'core',
  entry: assign({
    layout: () => spawn(layoutMachine, { sync: true }),
    user: () => spawn(createUserMachine(), { sync: false, autoForward: true }),
    grid: () => spawn(createGridMachine(), { sync: false, autoForward: true }),
  }),
  initial: 'idle',
  states: {
    idle: {
      on: {
        // ON_MODAL_CANCEL: {
        //   actions: () => {
        //     console.log('on modal cancel')
        //   },
        // },
        // ON_MODAL_OK: {
        //   actions: () => {
        //     console.log('on modal ok')
        //   },
        // },
      },
    },
  },
})

export const useLayout = (): any => {
  const [appState] = useMachine(rootMachine)
  const [state, send] = useActor(appState.context.layout)

  return {
    state,
    send,
  }
}
