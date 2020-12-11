import { useMachine } from '@xstate/react'
import { atom, useRecoilValue } from 'recoil'
import { Machine } from 'xstate'

export const appMachine = Machine({
  id: 'app',
  // entry: assign({
  //   // modal: () => spawn(modalMachine),
  //   // sidebar: () => spawn(layoutMachine),
  // }),
  initial: 'idle',
  states: {
    idle: {},
  },
})

export const appMachineAtom = atom({
  key: 'appMachine',
  default: appMachine,
})

export const useAppMachine = () => {
  const app = useRecoilValue(appMachineAtom)
  const machine = useMachine(app)

  return machine
  // selector({
  //   key: 'createdAppMachine',
  //   get: ({ get }) => {
  //     const store = get(appStore)

  //     return useMachine(store)
  //   },
  // })
}
