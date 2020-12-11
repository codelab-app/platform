import { useActor, useMachine } from '@xstate/react'
import { atom, useRecoilValue } from 'recoil'
import { Machine, assign, spawn } from 'xstate'
import { layoutMachine } from '@codelab/ddd/modules/layout-stories'

export const appMachine = Machine<{ layout: any }>({
  id: 'app',
  entry: assign({
    layout: () => spawn(layoutMachine),
  }),
  initial: 'idle',
  states: {
    idle: {},
  },
})

export const appMachineState = atom({
  key: 'appMachine',
  default: appMachine,
})

export const useLayoutActor = (): any => {
  const appAtom = useRecoilValue(appMachineState)
  const [appState] = useMachine(appAtom)
  const [state, send] = useActor(appState.context.layout)

  return {
    state,
    send,
  }
}

// export const useAppMachine = () => {
//   const appAtom = useRecoilValue(appMachineState)
//   const [state, send] = useMachine(appAtom)

//   return { state, send }
// }
